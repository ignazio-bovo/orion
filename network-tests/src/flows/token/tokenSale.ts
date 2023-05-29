import { FlowProps } from '../../Flow'
import { extendDebug } from '../../Debugger'
import { FixtureRunner } from '../../Fixture'
import {
  FinalizeTokenSaleFixture,
  InitTokenSaleFixture,
  PurchaseTokensOnSaleFixture,
  UpdateUpcomingSaleFixture,
} from '../../fixtures/token'
import { expect } from 'chai'
import { Resource } from '../../Resources'
import { BN } from 'bn.js'
import { BuyMembershipHappyCaseFixture } from '../../fixtures/membership'
import { CREATOR_BALANCE, FIRST_HOLDER_BALANCE, SALE_ALLOCATION } from '../../consts'

export default async function saleFlow({ api, query, lock }: FlowProps): Promise<void> {
  const debug = extendDebug('flow:sale')
  debug('Started')
  api.enableDebugTxLogs()

  const nextTokenId = (await api.query.projectToken.nextTokenId()).toNumber()
  const tokenId = nextTokenId - 1
  const channelId = (await api.query.content.nextChannelId()).toNumber() - 1
  expect(nextTokenId).gte(1)
  expect(channelId).gte(1)
  expect(CREATOR_BALANCE > SALE_ALLOCATION.add(FIRST_HOLDER_BALANCE))

  // retrieve owner info
  const unlockCreatorAccess = await lock(Resource.Creator)
  const [creatorAddress, creatorMemberId] = api.creator
  unlockCreatorAccess()

  const unlockFirstHolderAccess = await lock(Resource.FirstHolder)
  const [firstHolderAddress, firstHolderId] = api.firstHolder
  unlockFirstHolderAccess()

  // sale params
  debug('issue token sale')
  const startsAt = (await api.getBestBlock()).addn(100)
  const saleParams = api.createType('PalletProjectTokenTokenSaleParams', {
    unitPrice: api.createType('u128', new BN(1)),
    upperBoundQuantity: api.createType('u128', SALE_ALLOCATION),
    duration: api.createType('u32', new BN(10)),
    capPerMember: api.createType('Option<u128>', SALE_ALLOCATION.divn(10)),
    startsAt,
  })
  const initTokenSaleFixture = new InitTokenSaleFixture(
    api,
    query,
    creatorAddress,
    creatorMemberId,
    channelId,
    saleParams
  )
  await initTokenSaleFixture.preExecHook()
  await new FixtureRunner(initTokenSaleFixture).runWithQueryNodeChecks()

  debug('update upcoming token sale')
  const newStartBlock = startsAt.subn(60).toNumber()
  const newDuration = 60
  const updateUpcomingSaleFixture = new UpdateUpcomingSaleFixture(
    api,
    query,
    creatorAddress,
    creatorMemberId,
    channelId,
    newStartBlock,
    newDuration
  )
  await new FixtureRunner(updateUpcomingSaleFixture).runWithQueryNodeChecks()

  debug('purchase tokens on sale')
  const purchaseAmount = SALE_ALLOCATION.divn(100)
  await api.treasuryTransferBalance(firstHolderAddress, SALE_ALLOCATION)
  const purchaseTokensOnSaleFixture = new PurchaseTokensOnSaleFixture(
    api,
    query,
    firstHolderAddress,
    firstHolderId,
    tokenId,
    purchaseAmount
  )
  await purchaseTokensOnSaleFixture.preExecHook()
  await new FixtureRunner(purchaseTokensOnSaleFixture).runWithQueryNodeChecks()

  debug('purchase tokens on sale with account creation')
  const secondHolderAddress = (await api.createKeyPairs(1)).map(({ key }) => key.address)[0]
  const buyMembershipsFixture = new BuyMembershipHappyCaseFixture(api, query, [secondHolderAddress])
  await new FixtureRunner(buyMembershipsFixture).run()
  const secondHolderMemberId = buyMembershipsFixture.getCreatedMembers()[0].toNumber()

  const unlockSecondHolderAccess = await lock(Resource.SecondHolder)
  api.setSecondHolder(secondHolderAddress, secondHolderMemberId)
  unlockSecondHolderAccess()

  await api.treasuryTransferBalance(secondHolderAddress, SALE_ALLOCATION)
  const purchaseTokensOnSaleFixtureWithAccountCreation = new PurchaseTokensOnSaleFixture(
    api,
    query,
    secondHolderAddress,
    secondHolderMemberId,
    tokenId,
    purchaseAmount
  )
  await purchaseTokensOnSaleFixtureWithAccountCreation.preExecHook()
  await new FixtureRunner(purchaseTokensOnSaleFixtureWithAccountCreation).runWithQueryNodeChecks()

  debug('finalize token sale')
  const finalizeTokenSaleFixture = new FinalizeTokenSaleFixture(
    api,
    query,
    creatorAddress,
    creatorMemberId,
    channelId
  )
  await finalizeTokenSaleFixture.preExecHook()
  await new FixtureRunner(finalizeTokenSaleFixture).runWithQueryNodeChecks()
}
