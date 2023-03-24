import { EventHandlerContext } from '../../utils/events'
import {
  Token,
  TokenAccount,
  TokenStatus,
  VestedAccount,
  VestingSchedule,
  TokenChannel,
  AmmCurve,
  Sale,
  RevenueShare,
  AmmTransaction,
  AmmTransactionType,
} from '../../model'
import { deleteTokenAccount, tokenAccountId } from './utils'

export async function processTokenIssuedEvent({
  overlay,
  block,
  event: {
    asV1000: [
      tokenId,
      { initialAllocation, symbol, transferPolicy, patronageRate, revenueSplitRate },
    ],
  },
}: EventHandlerContext<'ProjectToken.TokenIssued'>) {
  // create vesting schedules
  const vestingSchedules = initialAllocation.map(([, allocation]) => {
    var vestingSchedule
    if (allocation.vestingScheduleParams) {
      const { linearVestingDuration, blocksBeforeCliff, cliffAmountPercentage } =
        allocation.vestingScheduleParams
      const cliffBlock = block.height + blocksBeforeCliff
      const id =
        cliffBlock.toString() + linearVestingDuration.toString() + cliffAmountPercentage.toString()
      vestingSchedule = overlay.getRepository(VestingSchedule).new({
        id,
        cliffPercent: cliffAmountPercentage,
        vestingDurationBlocks: linearVestingDuration,
        cliffDurationBlocks: blocksBeforeCliff,
        endsAt: cliffBlock + linearVestingDuration,
        cliffBlock,
        totalAmount: allocation.amount,
      })
    }
    return vestingSchedule
  })

  // create token
  const accountsNum = initialAllocation.length
  const totalSupply = initialAllocation.reduce((acc, [_, allocation]) => {
    return acc + allocation.amount
  }, BigInt(0))
  overlay.getRepository(Token).new({
    id: tokenId.toString(),
    status: TokenStatus.IDLE,
    createdAt: new Date(block.timestamp),
    totalSupply,
    revenueShareRatioPercent: revenueSplitRate,
    symbol: symbol.toString(),
    annualCreatorReward: BigInt(patronageRate),
    isInviteOnly: transferPolicy.__kind == 'Permissioned',
    accountsNum,
  })

  //  create accounts
  initialAllocation.map(([memberId, allocation], i) => {
    if (vestingSchedules[i]) {
      overlay.getRepository(VestedAccount).new({
        id: vestingSchedules[i]!.id.toString() + memberId.toString(),
        accountId: memberId.toString(),
        vestingId: vestingSchedules[i]!.id.toString(),
      })
    }
    overlay.getRepository(TokenAccount).new({
      id: tokenId.toString() + memberId.toString(),
      memberId: memberId.toString(),
      stakedAmount: BigInt(0),
      totalAmount: allocation.amount,
    })
  })
}

export async function processCreatorTokenIssuedEvent({
  overlay,
  event: {
    asV1000: [, channelId, tokenId],
  },
}: EventHandlerContext<'Content.CreatorTokenIssued'>) {
  overlay.getRepository(TokenChannel).new({
    channelId: channelId.toString(),
    tokenId: tokenId.toString(),
  })
}

export async function processTokenAmountTransferredEvent({
  overlay,
  event: {
    asV1000: [tokenId, sourceMemberId, validatedTransfers],
  },
}: EventHandlerContext<'ProjectToken.TokenAmountTransferred'>) {
  const sourceAccount = await overlay
    .getRepository(TokenAccount)
    .getByIdOrFail(tokenAccountId(tokenId, sourceMemberId))
  sourceAccount.totalAmount -= validatedTransfers.reduce(
    (acc, [, validatedPayment]) => acc + validatedPayment.payment.amount,
    BigInt(0)
  )
  var accountsAdded = 0
  for (const [validatedMemberId, validatedPayment] of validatedTransfers) {
    if (validatedMemberId.__kind == 'Existing') {
      const destinationAccount = await overlay
        .getRepository(TokenAccount)
        .getByIdOrFail(tokenAccountId(tokenId, validatedMemberId.value))
      destinationAccount.totalAmount -= validatedPayment.payment.amount
    } else {
      overlay.getRepository(TokenAccount).new({
        id: tokenAccountId(tokenId, validatedMemberId.value),
        memberId: validatedMemberId.toString(),
        stakedAmount: BigInt(0),
        totalAmount: validatedPayment.payment.amount,
      })
      accountsAdded += 1
    }
  }
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.accountsNum += accountsAdded
}

export async function processTokenDeissuedEvent({
  overlay,
  event: { asV1000: tokenId },
}: EventHandlerContext<'ProjectToken.TokenDeissued'>) {
  const saleRepository = overlay.getRepository(Sale)
  const ammRepository = overlay.getRepository(AmmCurve)
  const revenueShareRepository = overlay.getRepository(RevenueShare)

  const salesForToken = await saleRepository.getManyByRelation('tokenId', tokenId.toString())
  const ammsForToken = await ammRepository.getManyByRelation('tokenId', tokenId.toString())
  const revenueSharesForToken = await revenueShareRepository.getManyByRelation(
    'tokenId',
    tokenId.toString()
  )

  saleRepository.remove(...salesForToken)
  ammRepository.remove(...ammsForToken)
  revenueShareRepository.remove(...revenueSharesForToken)

  overlay.getRepository(Token).remove(tokenId.toString())
}

export async function processAccountDustedByEvent({
  overlay,
  event: {
    asV1000: [tokenId, dustedAccountId, , ,],
  },
}: EventHandlerContext<'ProjectToken.AccountDustedBy'>) {
  await deleteTokenAccount(overlay, tokenId.toString(), dustedAccountId.toString())
}

export async function processAmmActivatedEvent({
  overlay,
  event: {
    asV2001: [tokenId, , { slope, intercept }],
  },
}: EventHandlerContext<'ProjectToken.AmmActivated'>) {
  const id = overlay.getRepository(AmmCurve).getNextIdNumber()
  overlay.getRepository(AmmCurve).new({
    burnedByAmm: BigInt(0),
    mintedByAmm: BigInt(0),
    tokenId: tokenId.toString(),
    id: id.toString(),
    ammSlopeParameter: BigInt(slope),
    ammInitPrice: BigInt(intercept),
    finalized: false,
  })
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.status = TokenStatus.MARKET
}

export async function processTokenSaleInitializedEvent({
  overlay,
  block,
  event: {
    asV1000: [tokenId, saleId, tokenSale, ,],
  },
}: EventHandlerContext<'ProjectToken.TokenSaleInitialized'>) {
  overlay.getRepository(Sale).new({
    id: tokenId.toString() + saleId.toString(),
    tokenId: tokenId.toString(),
    tokensSold: BigInt(0),
    createdIn: block.height,
    startBlock: tokenSale.startBlock,
    durationInBlocks: tokenSale.duration,
    endsAt: tokenSale.startBlock + tokenSale.duration,
    maxAmountPerMember: tokenSale.capPerMember,
    tokenSaleallocation: tokenSale.quantityLeft,
    pricePerUnit: tokenSale.unitPrice,
    finalized: false,
    termsAndConditions: '', // TODO Sale metadata
  })

  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.status = TokenStatus.SALE
}

export async function processPatronageRateDecreasedToEvent({
  overlay,
  event: {
    asV1000: [tokenId, newRate],
  },
}: EventHandlerContext<'ProjectToken.PatronageRateDecreasedTo'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.annualCreatorReward = newRate
}

export async function processPatronageCreditClaimedEvent({
  overlay,
  event: {
    asV1000: [
    tokenId,
    amount,
    memberId,
  ]
  }
}: EventHandlerContext<'ProjectToken.PatronageCreditClaimed'>) {
  const creator = await overlay.getRepository(TokenAccount).getByIdOrFail(tokenAccountId(tokenId, memberId))
  creator.totalAmount += amount

  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.totalSupply += amount
}

export async function processTokensBoughtOnAmmEvent({
  overlay,
  block,
  event: {
    asV2001: [
      tokenId,
      memberId,
      crtMinted,
      joyDeposited,
    ]
  }
}: EventHandlerContext<'ProjectToken.TokensBoughtOnAmm'>)
{
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.totalSupply += crtMinted

  const buyerAccount = await overlay.getRepository(TokenAccount).getByIdOrFail(tokenAccountId(tokenId, memberId))
  buyerAccount.totalAmount += crtMinted

  const ammId = overlay.getRepository(AmmCurve).getNextIdNumber() - 1
  const amm = await overlay.getRepository(AmmCurve).getByIdOrFail(ammId.toString())
  amm.mintedByAmm += crtMinted

  overlay.getRepository(AmmTransaction).new({
    ammId: ammId.toString(),
    accountId: tokenAccountId(tokenId, memberId),
    id: ammId.toString() + tokenAccountId(tokenId, memberId),
    transactionType: AmmTransactionType.BUY,
    createdIn: block.height,
    quantity: crtMinted,
    pricePaid: crtMinted / joyDeposited, // FIX(verify)
  })

}
