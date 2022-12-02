import type {Result, Option} from './support'

export type ContentActor = ContentActor_Curator | ContentActor_Member | ContentActor_Lead

export interface ContentActor_Curator {
  __kind: 'Curator'
  value: [bigint, bigint]
}

export interface ContentActor_Member {
  __kind: 'Member'
  value: bigint
}

export interface ContentActor_Lead {
  __kind: 'Lead'
}

export interface ChannelRecord {
  owner: ChannelOwner
  numVideos: bigint
  collaborators: [bigint, ChannelActionPermission[]][]
  cumulativeRewardClaimed: bigint
  privilegeLevel: number
  pausedFeatures: PausableChannelFeature[]
  transferStatus: ChannelTransferStatus
  dataObjects: bigint[]
  dailyNftLimit: LimitPerPeriod
  weeklyNftLimit: LimitPerPeriod
  dailyNftCounter: NftCounter
  weeklyNftCounter: NftCounter
  creatorTokenId: (bigint | undefined)
  channelStateBloatBond: RepayableBloatBond
}

export interface ChannelCreationParametersRecord {
  assets: (StorageAssetsRecord | undefined)
  meta: (Uint8Array | undefined)
  collaborators: [bigint, ChannelActionPermission[]][]
  storageBuckets: bigint[]
  distributionBuckets: DistributionBucketIdRecord[]
  expectedChannelStateBloatBond: bigint
  expectedDataObjectStateBloatBond: bigint
}

export interface ChannelUpdateParametersRecord {
  assetsToUpload: (StorageAssetsRecord | undefined)
  newMeta: (Uint8Array | undefined)
  assetsToRemove: bigint[]
  collaborators: ([bigint, ChannelActionPermission[]][] | undefined)
  expectedDataObjectStateBloatBond: bigint
  storageBucketsNumWitness: (number | undefined)
}

export interface VideoCreationParametersRecord {
  assets: (StorageAssetsRecord | undefined)
  meta: (Uint8Array | undefined)
  autoIssueNft: (NftIssuanceParametersRecord | undefined)
  expectedVideoStateBloatBond: bigint
  expectedDataObjectStateBloatBond: bigint
  storageBucketsNumWitness: number
}

export interface CreateMemberParameters {
  rootAccount: Uint8Array
  controllerAccount: Uint8Array
  handle: Uint8Array
  metadata: Uint8Array
  isFoundingMember: boolean
}

export interface InviteMembershipParameters {
  invitingMemberId: bigint
  rootAccount: Uint8Array
  controllerAccount: Uint8Array
  handle: (Uint8Array | undefined)
  metadata: Uint8Array
}

export interface BuyMembershipParameters {
  rootAccount: Uint8Array
  controllerAccount: Uint8Array
  handle: (Uint8Array | undefined)
  metadata: Uint8Array
  referrerId: (bigint | undefined)
}

export interface GiftMembershipParameters {
  rootAccount: Uint8Array
  controllerAccount: Uint8Array
  handle: (Uint8Array | undefined)
  metadata: Uint8Array
  creditControllerAccount: bigint
  applyControllerAccountInvitationLock: (bigint | undefined)
  creditRootAccount: bigint
  applyRootAccountInvitationLock: (bigint | undefined)
}

export type BagIdType = BagIdType_Static | BagIdType_Dynamic

export interface BagIdType_Static {
  __kind: 'Static'
  value: StaticBagId
}

export interface BagIdType_Dynamic {
  __kind: 'Dynamic'
  value: DynamicBagIdType
}

export interface UploadParametersRecord {
  bagId: BagIdType
  objectCreationList: DataObjectCreationParameters[]
  stateBloatBondSourceAccountId: Uint8Array
  expectedDataSizeFee: bigint
  expectedDataObjectStateBloatBond: bigint
}

export interface DistributionBucketIdRecord {
  distributionBucketFamilyId: bigint
  distributionBucketIndex: bigint
}

export interface DynBagCreationParametersRecord {
  bagId: DynamicBagIdType
  objectCreationList: DataObjectCreationParameters[]
  stateBloatBondSourceAccountId: Uint8Array
  expectedDataSizeFee: bigint
  expectedDataObjectStateBloatBond: bigint
  storageBuckets: bigint[]
  distributionBuckets: DistributionBucketIdRecord[]
}

export type DynamicBagIdType = DynamicBagIdType_Member | DynamicBagIdType_Channel

export interface DynamicBagIdType_Member {
  __kind: 'Member'
  value: bigint
}

export interface DynamicBagIdType_Channel {
  __kind: 'Channel'
  value: bigint
}

export interface Voucher {
  sizeLimit: bigint
  objectsLimit: bigint
  sizeUsed: bigint
  objectsUsed: bigint
}

export interface DispatchInfo {
  weight: bigint
  class: DispatchClass
  paysFee: Pays
}

export type ChannelOwner = ChannelOwner_Member | ChannelOwner_CuratorGroup

export interface ChannelOwner_Member {
  __kind: 'Member'
  value: bigint
}

export interface ChannelOwner_CuratorGroup {
  __kind: 'CuratorGroup'
  value: bigint
}

export type ChannelActionPermission = ChannelActionPermission_UpdateChannelMetadata | ChannelActionPermission_ManageNonVideoChannelAssets | ChannelActionPermission_ManageChannelCollaborators | ChannelActionPermission_UpdateVideoMetadata | ChannelActionPermission_AddVideo | ChannelActionPermission_ManageVideoAssets | ChannelActionPermission_DeleteChannel | ChannelActionPermission_DeleteVideo | ChannelActionPermission_ManageVideoNfts | ChannelActionPermission_AgentRemark | ChannelActionPermission_TransferChannel | ChannelActionPermission_ClaimChannelReward | ChannelActionPermission_WithdrawFromChannelBalance | ChannelActionPermission_IssueCreatorToken | ChannelActionPermission_ClaimCreatorTokenPatronage | ChannelActionPermission_InitAndManageCreatorTokenSale | ChannelActionPermission_CreatorTokenIssuerTransfer | ChannelActionPermission_MakeCreatorTokenPermissionless | ChannelActionPermission_ReduceCreatorTokenPatronageRate | ChannelActionPermission_ManageRevenueSplits | ChannelActionPermission_DeissueCreatorToken

export interface ChannelActionPermission_UpdateChannelMetadata {
  __kind: 'UpdateChannelMetadata'
}

export interface ChannelActionPermission_ManageNonVideoChannelAssets {
  __kind: 'ManageNonVideoChannelAssets'
}

export interface ChannelActionPermission_ManageChannelCollaborators {
  __kind: 'ManageChannelCollaborators'
}

export interface ChannelActionPermission_UpdateVideoMetadata {
  __kind: 'UpdateVideoMetadata'
}

export interface ChannelActionPermission_AddVideo {
  __kind: 'AddVideo'
}

export interface ChannelActionPermission_ManageVideoAssets {
  __kind: 'ManageVideoAssets'
}

export interface ChannelActionPermission_DeleteChannel {
  __kind: 'DeleteChannel'
}

export interface ChannelActionPermission_DeleteVideo {
  __kind: 'DeleteVideo'
}

export interface ChannelActionPermission_ManageVideoNfts {
  __kind: 'ManageVideoNfts'
}

export interface ChannelActionPermission_AgentRemark {
  __kind: 'AgentRemark'
}

export interface ChannelActionPermission_TransferChannel {
  __kind: 'TransferChannel'
}

export interface ChannelActionPermission_ClaimChannelReward {
  __kind: 'ClaimChannelReward'
}

export interface ChannelActionPermission_WithdrawFromChannelBalance {
  __kind: 'WithdrawFromChannelBalance'
}

export interface ChannelActionPermission_IssueCreatorToken {
  __kind: 'IssueCreatorToken'
}

export interface ChannelActionPermission_ClaimCreatorTokenPatronage {
  __kind: 'ClaimCreatorTokenPatronage'
}

export interface ChannelActionPermission_InitAndManageCreatorTokenSale {
  __kind: 'InitAndManageCreatorTokenSale'
}

export interface ChannelActionPermission_CreatorTokenIssuerTransfer {
  __kind: 'CreatorTokenIssuerTransfer'
}

export interface ChannelActionPermission_MakeCreatorTokenPermissionless {
  __kind: 'MakeCreatorTokenPermissionless'
}

export interface ChannelActionPermission_ReduceCreatorTokenPatronageRate {
  __kind: 'ReduceCreatorTokenPatronageRate'
}

export interface ChannelActionPermission_ManageRevenueSplits {
  __kind: 'ManageRevenueSplits'
}

export interface ChannelActionPermission_DeissueCreatorToken {
  __kind: 'DeissueCreatorToken'
}

export type PausableChannelFeature = PausableChannelFeature_ChannelFundsTransfer | PausableChannelFeature_CreatorCashout | PausableChannelFeature_VideoNftIssuance | PausableChannelFeature_VideoCreation | PausableChannelFeature_VideoUpdate | PausableChannelFeature_ChannelUpdate | PausableChannelFeature_CreatorTokenIssuance

export interface PausableChannelFeature_ChannelFundsTransfer {
  __kind: 'ChannelFundsTransfer'
}

export interface PausableChannelFeature_CreatorCashout {
  __kind: 'CreatorCashout'
}

export interface PausableChannelFeature_VideoNftIssuance {
  __kind: 'VideoNftIssuance'
}

export interface PausableChannelFeature_VideoCreation {
  __kind: 'VideoCreation'
}

export interface PausableChannelFeature_VideoUpdate {
  __kind: 'VideoUpdate'
}

export interface PausableChannelFeature_ChannelUpdate {
  __kind: 'ChannelUpdate'
}

export interface PausableChannelFeature_CreatorTokenIssuance {
  __kind: 'CreatorTokenIssuance'
}

export type ChannelTransferStatus = ChannelTransferStatus_NoActiveTransfer | ChannelTransferStatus_PendingTransfer

export interface ChannelTransferStatus_NoActiveTransfer {
  __kind: 'NoActiveTransfer'
}

export interface ChannelTransferStatus_PendingTransfer {
  __kind: 'PendingTransfer'
  value: PendingTransfer
}

export interface LimitPerPeriod {
  limit: bigint
  blockNumberPeriod: number
}

export interface NftCounter {
  counter: bigint
  lastUpdated: number
}

export interface RepayableBloatBond {
  repaymentRestrictedTo: (Uint8Array | undefined)
  amount: bigint
}

export interface StorageAssetsRecord {
  objectCreationList: DataObjectCreationParameters[]
  expectedDataSizeFee: bigint
}

export interface NftIssuanceParametersRecord {
  royalty: (number | undefined)
  nftMetadata: Uint8Array
  nonChannelOwner: (bigint | undefined)
  initTransactionalStatus: InitTransactionalStatusRecord
}

export type StaticBagId = StaticBagId_Council | StaticBagId_WorkingGroup

export interface StaticBagId_Council {
  __kind: 'Council'
}

export interface StaticBagId_WorkingGroup {
  __kind: 'WorkingGroup'
  value: WorkingGroup
}

export interface DataObjectCreationParameters {
  size: bigint
  ipfsContentId: Uint8Array
}

export type DispatchClass = DispatchClass_Normal | DispatchClass_Operational | DispatchClass_Mandatory

export interface DispatchClass_Normal {
  __kind: 'Normal'
}

export interface DispatchClass_Operational {
  __kind: 'Operational'
}

export interface DispatchClass_Mandatory {
  __kind: 'Mandatory'
}

export type Pays = Pays_Yes | Pays_No

export interface Pays_Yes {
  __kind: 'Yes'
}

export interface Pays_No {
  __kind: 'No'
}

export interface PendingTransfer {
  newOwner: ChannelOwner
  transferParams: TransferCommitmentParameters
}

export type InitTransactionalStatusRecord = InitTransactionalStatusRecord_Idle | InitTransactionalStatusRecord_BuyNow | InitTransactionalStatusRecord_InitiatedOfferToMember | InitTransactionalStatusRecord_EnglishAuction | InitTransactionalStatusRecord_OpenAuction

export interface InitTransactionalStatusRecord_Idle {
  __kind: 'Idle'
}

export interface InitTransactionalStatusRecord_BuyNow {
  __kind: 'BuyNow'
  value: bigint
}

export interface InitTransactionalStatusRecord_InitiatedOfferToMember {
  __kind: 'InitiatedOfferToMember'
  value: [bigint, (bigint | undefined)]
}

export interface InitTransactionalStatusRecord_EnglishAuction {
  __kind: 'EnglishAuction'
  value: EnglishAuctionParamsRecord
}

export interface InitTransactionalStatusRecord_OpenAuction {
  __kind: 'OpenAuction'
  value: OpenAuctionParamsRecord
}

export type WorkingGroup = WorkingGroup_Forum | WorkingGroup_Storage | WorkingGroup_Content | WorkingGroup_OperationsAlpha | WorkingGroup_App | WorkingGroup_Distribution | WorkingGroup_OperationsBeta | WorkingGroup_OperationsGamma | WorkingGroup_Membership

export interface WorkingGroup_Forum {
  __kind: 'Forum'
}

export interface WorkingGroup_Storage {
  __kind: 'Storage'
}

export interface WorkingGroup_Content {
  __kind: 'Content'
}

export interface WorkingGroup_OperationsAlpha {
  __kind: 'OperationsAlpha'
}

export interface WorkingGroup_App {
  __kind: 'App'
}

export interface WorkingGroup_Distribution {
  __kind: 'Distribution'
}

export interface WorkingGroup_OperationsBeta {
  __kind: 'OperationsBeta'
}

export interface WorkingGroup_OperationsGamma {
  __kind: 'OperationsGamma'
}

export interface WorkingGroup_Membership {
  __kind: 'Membership'
}

export interface TransferCommitmentParameters {
  newCollaborators: [bigint, ChannelActionPermission[]][]
  price: bigint
  transferId: bigint
}

export interface EnglishAuctionParamsRecord {
  startingPrice: bigint
  buyNowPrice: (bigint | undefined)
  whitelist: bigint[]
  startsAt: (number | undefined)
  duration: number
  extensionPeriod: number
  minBidStep: bigint
}

export interface OpenAuctionParamsRecord {
  startingPrice: bigint
  buyNowPrice: (bigint | undefined)
  startsAt: (number | undefined)
  whitelist: bigint[]
  bidLockDuration: number
}
