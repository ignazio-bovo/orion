import { EventHandlerContext } from '../../utils/events'
import {
  Token,
  TokenAccount,
  TokenStatus,
  VestingSchedule,
  TokenChannel,
  AmmCurve,
  Sale,
  SaleTransaction,
  RevenueShare,
  AmmTransaction,
  AmmTransactionType,
  VestedSale,
  RevenueShareParticipation,
  Benefit,
  TokenAvatarUri,
  Video,
  TrailerVideo,
  InitialIssuanceVestingSource,
  SaleVestingSource,
} from '../../model'
import {
  addVestingScheduleToAccount,
  burnFromVesting,
  createAccount,
  getTokenAccountByMemberByToken,
  getTokenAccountByMemberByTokenOrFail,
  processValidatedTransfers,
  VestingScheduleData,
} from './utils'
import { deserializeMetadata } from '../utils'
import { SaleMetadata, CreatorTokenIssuerRemarked } from '@joystream/metadata-protobuf'
import { isSet } from 'lodash'

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
  // create token
  const totalSupply = initialAllocation.reduce((acc, [_, allocation]) => {
    return acc + allocation.amount
  }, BigInt(0))

  const token = overlay.getRepository(Token).new({
    id: tokenId.toString(),
    status: TokenStatus.IDLE,
    createdAt: new Date(block.timestamp),
    totalSupply,
    revenueShareRatioPermill: revenueSplitRate,
    symbol: symbol.toString(),
    annualCreatorReward: patronageRate,
    isInviteOnly: transferPolicy.__kind === 'Permissioned',
    accountsNum: 0, // will be uptdated as account are added
    deissued: false,
    numberOfVestedTransferIssued: 0,
    numberOfRevenueShareActivations: 0,
  })

  // create accounts for allocation
  for (const [memberId, allocation] of initialAllocation) {
    const newAccount = createAccount(overlay, token, memberId, allocation.amount)
    if (allocation.vestingScheduleParams) {
      const vestingData = new VestingScheduleData(allocation.vestingScheduleParams, block.height)
      overlay.getRepository(VestingSchedule).new({
        id: vestingData.id,
        cliffBlock: vestingData.cliffBlock,
        cliffDurationBlocks: vestingData.cliffDuration,
        cliffPercent: vestingData.cliffPercent,
        endsAt: vestingData.endsAt,
        vestingDurationBlocks: vestingData.duration,
      })
      await addVestingScheduleToAccount(
        overlay,
        newAccount,
        vestingData.id,
        allocation.amount,
        new InitialIssuanceVestingSource()
      )
    }
  }
}

export async function processCreatorTokenIssuedEvent({
  overlay,
  event: {
    asV1000: [, channelId, tokenId],
  },
}: EventHandlerContext<'Content.CreatorTokenIssued'>) {
  overlay.getRepository(TokenChannel).new({
    id: overlay.getRepository(TokenChannel).getNewEntityId(),
    channelId: channelId.toString(),
    tokenId: tokenId.toString(),
  })
}

export async function processTokenAmountTransferredEvent({
  overlay,
  block,
  event: {
    asV1000: [tokenId, sourceMemberId, validatedTransfers],
  },
}: EventHandlerContext<'ProjectToken.TokenAmountTransferred'>) {
  // get sourceAccount by getManyByRelation with tokenId and memberId
  const sourceAccount = await getTokenAccountByMemberByTokenOrFail(overlay, sourceMemberId, tokenId)
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())

  await processValidatedTransfers(overlay, token, sourceAccount, validatedTransfers, block.height)
}

export async function processTokenAmountTransferredByIssuerEvent({
  overlay,
  block,
  event: {
    asV1000: [tokenId, sourceMemberId, validatedTransfers],
  },
}: EventHandlerContext<'ProjectToken.TokenAmountTransferredByIssuer'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  const sourceAccount = await getTokenAccountByMemberByTokenOrFail(overlay, sourceMemberId, tokenId)
  token.numberOfVestedTransferIssued += 1
  await processValidatedTransfers(overlay, token, sourceAccount, validatedTransfers, block.height)
}

export async function processTokenDeissuedEvent({
  overlay,
  event: { asV1000: tokenId },
}: EventHandlerContext<'ProjectToken.TokenDeissued'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.deissued = true
}

export async function processAccountDustedByEvent({
  overlay,
  event: {
    asV1000: [tokenId, dustedAccountId, , ,],
  },
}: EventHandlerContext<'ProjectToken.AccountDustedBy'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  const account = await getTokenAccountByMemberByTokenOrFail(overlay, dustedAccountId, tokenId)
  account.deleted = true
  token.accountsNum -= 1
}

export async function processAmmActivatedEvent({
  overlay,
  event: {
    asV2002: [tokenId, , { slope, intercept }],
  },
}: EventHandlerContext<'ProjectToken.AmmActivated'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.status = TokenStatus.MARKET
  const id = overlay.getRepository(AmmCurve).getNewEntityId()
  overlay.getRepository(AmmCurve).new({
    burnedByAmm: BigInt(0),
    mintedByAmm: BigInt(0),
    tokenId: tokenId.toString(),
    id,
    ammSlopeParameter: BigInt(slope),
    ammInitPrice: BigInt(intercept),
    finalized: false,
  })
  token.currentAmmSaleId = id
}

export async function processTokenSaleInitializedEvent({
  overlay,
  block,
  event: {
    asV1000: [tokenId, , tokenSale, metadataBytes],
  },
}: EventHandlerContext<'ProjectToken.TokenSaleInitialized'>) {
  const fundsSourceMemberId = tokenSale.tokensSource

  const sourceAccount = await getTokenAccountByMemberByTokenOrFail(
    overlay,
    fundsSourceMemberId,
    tokenId
  )
  sourceAccount.totalAmount -= tokenSale.quantityLeft

  const sale = overlay.getRepository(Sale).new({
    id: overlay.getRepository(Sale).getNewEntityId(),
    tokenId: tokenId.toString(),
    tokensSold: BigInt(0),
    createdIn: block.height,
    startBlock: tokenSale.startBlock,
    endsAt: tokenSale.startBlock + tokenSale.duration,
    maxAmountPerMember: tokenSale.capPerMember,
    tokenSaleAllocation: tokenSale.quantityLeft,
    pricePerUnit: tokenSale.unitPrice,
    finalized: false,
    termsAndConditions: '',
    fundsSourceAccountId: sourceAccount.id,
  })

  if (tokenSale.vestingScheduleParams !== undefined) {
    const vestingData = new VestingScheduleData(tokenSale.vestingScheduleParams, block.height)

    const vesting = overlay.getRepository(VestingSchedule).new({
      id: vestingData.id,
      endsAt: vestingData.endsAt,
      cliffBlock: vestingData.cliffBlock,
      vestingDurationBlocks: vestingData.duration,
      cliffPercent: vestingData.cliffPercent,
      cliffDurationBlocks: vestingData.cliffDuration,
    })

    overlay.getRepository(VestedSale).new({
      id: overlay.getRepository(VestedSale).getNewEntityId(),
      saleId: sale.id.toString(),
      vestingId: vesting.id,
    })
  }
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.status = TokenStatus.SALE
  token.currentSaleId = sale.id

  if (metadataBytes) {
    const metadata = deserializeMetadata(SaleMetadata, metadataBytes)
    if (metadata) {
      if (isSet(metadata.termsAndConditions)) {
        sale.termsAndConditions = metadata.termsAndConditions.toString()
      }
    }
  }
}

export async function processPatronageRateDecreasedToEvent({
  overlay,
  event,
}: EventHandlerContext<'ProjectToken.PatronageRateDecreasedTo'>) {
  const [tokenId, newRate] = event.isV1000 ? event.asV1000 : event.asV2002
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  if (typeof newRate === 'number') {
    token.annualCreatorReward = newRate
  } else {
    token.annualCreatorReward = Number(newRate.toString())
  }
}

export async function processPatronageCreditClaimedEvent({
  overlay,
  event: {
    asV1000: [tokenId, amount, memberId],
  },
}: EventHandlerContext<'ProjectToken.PatronageCreditClaimed'>) {
  const creator = await getTokenAccountByMemberByTokenOrFail(overlay, memberId, tokenId)
  creator.totalAmount += amount

  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.totalSupply += amount
}

export async function processTokensBoughtOnAmmEvent({
  overlay,
  block,
  event: {
    asV2002: [tokenId, memberId, crtMinted, joysDeposited],
  },
}: EventHandlerContext<'ProjectToken.TokensBoughtOnAmm'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.totalSupply += crtMinted

  let buyerAccount = await getTokenAccountByMemberByToken(overlay, memberId, tokenId)
  if (buyerAccount === undefined) {
    buyerAccount = createAccount(overlay, token, memberId, crtMinted)
  } else {
    buyerAccount.totalAmount += crtMinted
  }

  const activeAmm = await overlay.getRepository(AmmCurve).getByIdOrFail(token.currentAmmSaleId!)

  activeAmm.mintedByAmm += crtMinted
  overlay.getRepository(AmmTransaction).new({
    ammId: activeAmm.id,
    accountId: buyerAccount.id,
    id: overlay.getRepository(AmmTransaction).getNewEntityId(),
    transactionType: AmmTransactionType.BUY,
    createdIn: block.height,
    quantity: crtMinted,
    pricePaid: joysDeposited,
    pricePerUnit: joysDeposited / crtMinted, // truncates decimal values
  })
}

export async function processTokensSoldOnAmmEvent({
  overlay,
  block,
  event: {
    asV2002: [tokenId, memberId, crtBurned, joysRecovered],
  },
}: EventHandlerContext<'ProjectToken.TokensSoldOnAmm'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.totalSupply -= crtBurned
  const activeAmm = await overlay.getRepository(AmmCurve).getByIdOrFail(token.currentAmmSaleId!)
  const ammId = activeAmm.id

  const sellerAccount = await getTokenAccountByMemberByTokenOrFail(overlay, memberId, tokenId)
  sellerAccount.totalAmount -= crtBurned

  const amm = await overlay.getRepository(AmmCurve).getByIdOrFail(ammId)
  amm.burnedByAmm += crtBurned

  overlay.getRepository(AmmTransaction).new({
    ammId,
    accountId: sellerAccount.id,
    id: overlay.getRepository(AmmTransaction).getNewEntityId(),
    transactionType: AmmTransactionType.SELL,
    createdIn: block.height,
    quantity: crtBurned,
    pricePaid: joysRecovered,
    pricePerUnit: joysRecovered / crtBurned, // truncates decimal values
  })
}

export async function processTokensPurchasedOnSaleEvent({
  overlay,
  block,
  event: {
    asV1000: [tokenId, , amountPurchased, memberId],
  },
}: EventHandlerContext<'ProjectToken.TokensPurchasedOnSale'>) {
  let buyerAccount = await getTokenAccountByMemberByToken(overlay, memberId, tokenId)
  if (buyerAccount === undefined) {
    const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
    buyerAccount = createAccount(overlay, token, memberId, amountPurchased)
  } else {
    buyerAccount.totalAmount += amountPurchased
  }

  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  const sale = await overlay.getRepository(Sale).getByIdOrFail(token.currentSaleId!)
  sale.tokensSold += amountPurchased

  overlay.getRepository(SaleTransaction).new({
    id: overlay.getRepository(SaleTransaction).getNewEntityId(),
    quantity: amountPurchased,
    saleId: sale.id,
    accountId: buyerAccount.id,
    createdIn: block.height,
  })

  const vestingForSale = await overlay.getRepository(VestedSale).getOneByRelation('saleId', sale.id)

  if (vestingForSale !== undefined) {
    await addVestingScheduleToAccount(
      overlay,
      buyerAccount,
      vestingForSale.vestingId,
      amountPurchased,
      new SaleVestingSource()
    )
  }
}

export async function processUpcomingTokenSaleUpdatedEvent({
  overlay,
  event: {
    asV1000: [tokenId, , newStart, newDuration],
  },
}: EventHandlerContext<'ProjectToken.UpcomingTokenSaleUpdated'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  const sale = await overlay.getRepository(Sale).getByIdOrFail(token.currentSaleId!)

  if (newStart) {
    sale.startBlock = newStart
  }

  sale.endsAt = newDuration === undefined ? sale.endsAt : sale.startBlock + newDuration
}

export async function processRevenueSplitIssuedEvent({
  overlay,
  block,
  event: {
    asV1000: [tokenId, startBlock, duration, joyAllocation],
  },
}: EventHandlerContext<'ProjectToken.RevenueSplitIssued'>) {
  const endsAt = startBlock + duration
  const id = overlay.getRepository(RevenueShare).getNewEntityId()
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())

  overlay.getRepository(RevenueShare).new({
    id,
    allocation: joyAllocation,
    tokenId: tokenId.toString(),
    createdIn: block.height,
    participantsNum: 0,
    finalized: false,
    claimed: BigInt(0),
    startingAt: startBlock,
    endsAt,
  })

  token.currentRenvenueShareId = id
}

export async function processMemberJoinedWhitelistEvent({
  overlay,
  event: {
    asV1000: [tokenId, memberId],
  },
}: EventHandlerContext<'ProjectToken.MemberJoinedWhitelist'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  createAccount(overlay, token, memberId, BigInt(0))
}

export async function processAmmDeactivatedEvent({
  overlay,
  event: {
    asV2002: [tokenId, , burnedAmount],
  },
}: EventHandlerContext<'ProjectToken.AmmDeactivated'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.totalSupply -= burnedAmount
  token.status = TokenStatus.IDLE

  const activeAmm = await overlay.getRepository(AmmCurve).getByIdOrFail(token.currentAmmSaleId!)
  activeAmm.finalized = true

  token.currentAmmSaleId = null
}

export async function processTokensBurnedEvent({
  overlay,
  event: {
    asV1000: [tokenId, memberId, amountBurned],
  },
}: EventHandlerContext<'ProjectToken.TokensBurned'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.totalSupply -= amountBurned

  const account = await getTokenAccountByMemberByTokenOrFail(overlay, memberId, tokenId)
  if (account.stakedAmount > 0) {
    account.stakedAmount =
      account.stakedAmount > amountBurned ? account.stakedAmount - amountBurned : BigInt(0)
  }
  account.totalAmount -= amountBurned
  await burnFromVesting(overlay, account.id, amountBurned)
}

export async function processTransferPolicyChangedToPermissionlessEvent({
  overlay,
  event: { asV1000: tokenId },
}: EventHandlerContext<'ProjectToken.TransferPolicyChangedToPermissionless'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  token.isInviteOnly = false
}

export async function processTokenSaleFinalizedEvent({
  overlay,
  event: {
    asV1000: [tokenId, , quantityLeft, ,],
  },
}: EventHandlerContext<'ProjectToken.TokenSaleFinalized'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  const sale = await overlay.getRepository(Sale).getByIdOrFail(token.currentSaleId!)
  sale.finalized = true

  const sourceAccount = await overlay
    .getRepository(TokenAccount)
    .getByIdOrFail(sale.fundsSourceAccountId!)
  sourceAccount.totalAmount += quantityLeft

  token.status = TokenStatus.IDLE
  token.currentSaleId = null
}

export async function processRevenueSplitLeftEvent({
  overlay,
  event: {
    asV1000: [tokenId, memberId, unstakedAmount],
  },
}: EventHandlerContext<'ProjectToken.RevenueSplitLeft'>) {
  const account = await getTokenAccountByMemberByTokenOrFail(overlay, memberId, tokenId)
  account.stakedAmount -= unstakedAmount
}

export async function processRevenueSplitFinalizedEvent({
  overlay,
  event: {
    asV1000: [tokenId, ,], // leftover JOYs not processed in orion
  },
}: EventHandlerContext<'ProjectToken.RevenueSplitFinalized'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  const revenueShare = await overlay
    .getRepository(RevenueShare)
    .getByIdOrFail(token.currentRenvenueShareId!)
  revenueShare.finalized = true
  token.currentRenvenueShareId = null
}

export async function processUserParticipatedInSplitEvent({
  overlay,
  block,
  event: {
    asV1000: [tokenId, memberId, stakedAmount, joyDividend],
  },
}: EventHandlerContext<'ProjectToken.UserParticipatedInSplit'>) {
  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  const account = await getTokenAccountByMemberByTokenOrFail(overlay, memberId, tokenId)

  const revenueShare = await overlay
    .getRepository(RevenueShare)
    .getByIdOrFail(token.currentRenvenueShareId!)
  revenueShare.claimed += joyDividend
  revenueShare.participantsNum += 1

  overlay.getRepository(RevenueShareParticipation).new({
    id: overlay.getRepository(RevenueShareParticipation).getNewEntityId(),
    accountId: account.id,
    revenueShareId: revenueShare.id,
    stakedAmount,
    earnings: joyDividend,
    createdIn: block.height,
  })
  account.stakedAmount += stakedAmount
}

export async function processCreatorTokenIssuerRemarkedEvent({
  overlay,
  event: {
    asV2002: [tokenId, metadataBytes],
  },
}: EventHandlerContext<'Content.CreatorTokenIssuerRemarked'>) {
  const creatorRemarked = deserializeMetadata(CreatorTokenIssuerRemarked, metadataBytes)
  if (creatorRemarked === null) {
    return
  }
  const metadata = creatorRemarked.updateTokenMetadata
  if (metadata === null && metadata!.newMetadata === null) {
    return
  }

  const newMetadata = metadata!.newMetadata!

  const token = await overlay.getRepository(Token).getByIdOrFail(tokenId.toString())
  if (isSet(newMetadata.description)) {
    token.description = newMetadata.description
  }

  if (isSet(newMetadata.benefits)) {
    for (const benefit of newMetadata.benefits) {
      if (benefit.displayOrder !== null) {
        // remove existing benefit with the same display order (if exists)
        const existingBenefit = (
          await overlay.getRepository(Benefit).getManyByRelation('tokenId', token.id)
        ).find((b) => b.displayOrder === benefit.displayOrder)

        if (existingBenefit !== undefined) {
          overlay.getRepository(Benefit).remove(existingBenefit)
        }

        // if the benefit title is null, it means we want to remove the benefit
        if (benefit.title !== null) {
          overlay.getRepository(Benefit).new({
            id: overlay.getRepository(Benefit).getNewEntityId(),
            title: benefit.title,
            description: benefit.description,
            emojiCode: benefit.emoji,
            displayOrder: benefit.displayOrder,
            tokenId: token.id,
          })
        }
      }
    }
  }

  if (isSet(newMetadata.whitelistApplicationNote)) {
    token.whitelistApplicantNote = newMetadata.whitelistApplicationNote || null
  }

  if (isSet(newMetadata.whitelistApplicationApplyLink)) {
    token.whitelistApplicantLink = newMetadata.whitelistApplicationApplyLink || null
  }

  if (isSet(newMetadata.avatarUri)) {
    token.avatar = newMetadata.avatarUri
      ? new TokenAvatarUri({ avatarUri: newMetadata.avatarUri })
      : null
  }

  if (isSet(newMetadata.trailerVideoId)) {
    const video = await overlay.getRepository(Video).getById(newMetadata.trailerVideoId)
    if (video) {
      const trailerVideoRepository = overlay.getRepository(TrailerVideo)
      const oldTrailer = await trailerVideoRepository.getOneByRelationOrFail('tokenId', token.id)
      trailerVideoRepository.remove(oldTrailer)

      const id = overlay.getRepository(TrailerVideo).getNewEntityId()
      overlay.getRepository(TrailerVideo).new({
        id,
        tokenId: token.id,
        videoId: video.id,
      })
      token.trailerVideoId = id
    }
  }
}
