import { FlowProps } from '../../Flow'
import { extendDebug } from '../../Debugger'
import { FixtureRunner } from '../../Fixture'
import { IssueCreatorTokenFixture } from '../../fixtures/token'
import { expect } from 'chai'
import { BN } from 'bn.js'
import { blake2AsHex } from '@polkadot/util-crypto'
import { PalletContentPermissionsContentActor } from '@polkadot/types/lookup'
import { BuyMembershipHappyCaseFixture } from '../../fixtures/membership'
import { Resource } from '../../Resources'

export default async function issueCreatorToken({ api, query, lock }: FlowProps): Promise<void> {
  const debug = extendDebug('flow:issue-creatorToken')
  debug('Started')
  api.enableDebugTxLogs()

  const channelId = (await api.query.content.nextChannelId()).toNumber() - 1
  expect(channelId).gte(1)

  // retrieve owner info
  const channel = await api.query.content.channelById(new BN(channelId))

  // issuer membership
  const channelOwnerMemberId = channel.owner.asMember
  const channelOwnerMembership = await api.query.members.membershipById(channelOwnerMemberId)
  expect(channelOwnerMembership.isSome, 'Not possible to retrieve channel owner membership')
  const channelOwnerAddress = channelOwnerMembership.unwrap().controllerAccount.toString()

  // first holder membership
  const firstHolderBalance = new BN(100_000_000)
  const firstHolderAccountId = (await api.createKeyPairs(1)).map(({ key }) => key.address)[0]
  await api.treasuryTransferBalance(firstHolderAccountId, firstHolderBalance)
  const buyFirstHolderMembershipFixture = new BuyMembershipHappyCaseFixture(api, query, [firstHolderAccountId])
  await new FixtureRunner(buyFirstHolderMembershipFixture).run()
  const [firstHolderMemberId,] = buyFirstHolderMembershipFixture.getCreatedMembers()

  const initialAllocation = api.createType('BTreeMap<u64, PalletProjectTokenTokenAllocation>')
  initialAllocation.set(
    channelOwnerMemberId,
    api.createType('PalletProjectTokenTokenAllocation', {
      'amount': new BN(100000000),
    })
  )
  initialAllocation.set(
    firstHolderMemberId,
    api.createType('PalletProjectTokenTokenAllocation', {
      'amount': new BN(100000),
    })
  )
  const symbol = blake2AsHex('test')
  const transferPolicy = api.createType('PalletProjectTokenTransferPolicyParams', 'Permissioned')
  const revenueSplitRate = api.createType('Permill', new BN(10))
  const patronageRate = api.createType('Perquintill', new BN(10))
  const contentActor: PalletContentPermissionsContentActor = api.createType(
    'PalletContentPermissionsContentActor',
    { Member: channelOwnerMemberId }
  )

  // issue creator token
  const crtParams = api.createType('PalletProjectTokenTokenIssuanceParameters', {
    initialAllocation,
    symbol,
    transferPolicy,
    patronageRate,
    revenueSplitRate,
  })
  const issueCreatorTokenFixture = new IssueCreatorTokenFixture(
    api,
    query,
    channelOwnerAddress,
    contentActor,
    channelId,
    crtParams
  )
  await new FixtureRunner(issueCreatorTokenFixture).runWithQueryNodeChecks()

  const unlockCreatorAccess = await lock(Resource.Creator)
  api.setCreator(channelOwnerAddress, channelOwnerMemberId.toNumber())
  unlockCreatorAccess()

  const unlockFirstHolderAccess = await lock(Resource.FirstHolder)
  api.setFirstHolder(firstHolderAccountId, firstHolderMemberId.toNumber())
  unlockFirstHolderAccess()

  debug('Done')
}
