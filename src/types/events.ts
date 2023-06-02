import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v1000 from './v1000'
import * as v2002 from './v2002'
import * as v2001 from './v2001'

export class ContentAuctionBidCanceledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.AuctionBidCanceled')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.AuctionBidCanceled') === 'a07d31c2644106aa567962b0935daed493556b5253e00c77997c3b0e46966110'
    }

    get asV1000(): [bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentAuctionBidMadeEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.AuctionBidMade')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.AuctionBidMade') === 'bcafd0d37bce2fe783b98aaa33d1909e0c6e142b99bc7825473a4936f1475025'
    }

    get asV1000(): [bigint, bigint, bigint, (bigint | undefined)] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentAuctionCanceledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.AuctionCanceled')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.AuctionCanceled') === '48a22056559f8981366eaf63cf3efad925fd24c56f7d28d373458c2ebc4bb415'
    }

    get asV1000(): [v1000.ContentActor, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentBidMadeCompletingAuctionEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.BidMadeCompletingAuction')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.BidMadeCompletingAuction') === '91264357064d8d3d661b6fc1d1a98e7c18dae959a65f1e867909106e18a4a871'
    }

    get asV1000(): [bigint, bigint, (bigint | undefined)] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentBuyNowCanceledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.BuyNowCanceled')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.BuyNowCanceled') === '3b47d764c1ffe81d817bcba7109d633ce8a964e97cceeac157b2c951f61b001d'
    }

    get asV1000(): [bigint, v1000.ContentActor] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentBuyNowPriceUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.BuyNowPriceUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.BuyNowPriceUpdated') === 'cebfba3ae629656a1b23fba2233f6c98894c68c68b5cb558a92842730402fd44'
    }

    get asV1000(): [bigint, v1000.ContentActor, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentChannelAgentRemarkedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.ChannelAgentRemarked')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.ChannelAgentRemarked') === 'fa4d8d29128018b630ceab7a5e5b148d417929825da537a24b441dd6b1a0be8c'
    }

    get asV1000(): [v1000.ContentActor, bigint, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentChannelCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.ChannelCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.ChannelCreated') === '57e84db58223c8be367ced4c4a153fc227fa5099a2d8d8d9d5e1d28a8571b1d8'
    }

    get asV1000(): [bigint, v1000.ChannelRecord, v1000.ChannelCreationParametersRecord, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }

    get isV2002(): boolean {
        return this._chain.getEventHash('Content.ChannelCreated') === 'ed351930d72aa24b919921257fbdfbd245dfe2d7ceb5661947c33aad92fa0c6a'
    }

    get asV2002(): [bigint, v2002.ChannelRecord, v2002.ChannelCreationParametersRecord, Uint8Array] {
        assert(this.isV2002)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentChannelDeletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.ChannelDeleted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.ChannelDeleted') === '48a22056559f8981366eaf63cf3efad925fd24c56f7d28d373458c2ebc4bb415'
    }

    get asV1000(): [v1000.ContentActor, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentChannelDeletedByModeratorEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.ChannelDeletedByModerator')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.ChannelDeletedByModerator') === 'fa4d8d29128018b630ceab7a5e5b148d417929825da537a24b441dd6b1a0be8c'
    }

    get asV1000(): [v1000.ContentActor, bigint, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentChannelOwnerRemarkedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.ChannelOwnerRemarked')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Metaprotocols related event
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Content.ChannelOwnerRemarked') === '455000da2c8f650044c433ea0fc69e39c5cb2db11e7a81e15e0fcba6f0757e16'
    }

    /**
     * Metaprotocols related event
     */
    get asV1000(): [bigint, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentChannelUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.ChannelUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.ChannelUpdated') === 'c789826ee1aec5f7fb0f59e67414b4a392cc79d9e5c714b33aba6e123643f455'
    }

    get asV1000(): [v1000.ContentActor, bigint, v1000.ChannelUpdateParametersRecord, bigint[]] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }

    get isV2002(): boolean {
        return this._chain.getEventHash('Content.ChannelUpdated') === '1cdb63f013cbfd13d8b9de0a9b55c81a84b707ceba6a94c2e2a665281048a619'
    }

    get asV2002(): [v2002.ContentActor, bigint, v2002.ChannelUpdateParametersRecord, bigint[]] {
        assert(this.isV2002)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentChannelVisibilitySetByModeratorEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.ChannelVisibilitySetByModerator')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.ChannelVisibilitySetByModerator') === 'cf849322ba1879fc99d8b7a515af0b8d4459283258ace34216380100eb86e498'
    }

    get asV1000(): [v1000.ContentActor, bigint, boolean, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentCreatorTokenIssuedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.CreatorTokenIssued')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.CreatorTokenIssued') === 'a672a4ef0905fc0288a3489cc68b38efc29c7026390f5d28c3587695cb356d3d'
    }

    get asV1000(): [v1000.ContentActor, bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentCreatorTokenIssuerRemarkedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.CreatorTokenIssuerRemarked')
        this._chain = ctx._chain
        this.event = event
    }

    get isV2002(): boolean {
        return this._chain.getEventHash('Content.CreatorTokenIssuerRemarked') === '455000da2c8f650044c433ea0fc69e39c5cb2db11e7a81e15e0fcba6f0757e16'
    }

    get asV2002(): [bigint, Uint8Array] {
        assert(this.isV2002)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentEnglishAuctionSettledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.EnglishAuctionSettled')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.EnglishAuctionSettled') === '5e0eb9075960a18f82f813e13501ef4a17c375bbb914d5cd7d61bfccc134745a'
    }

    get asV1000(): [bigint, Uint8Array, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentEnglishAuctionStartedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.EnglishAuctionStarted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.EnglishAuctionStarted') === 'c9dbfde7fcc71c651d1bd1112b88993bba1c36783f97a23dbbe31a2cf82e3222'
    }

    get asV1000(): [v1000.ContentActor, bigint, v1000.EnglishAuctionParamsRecord] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentNftBoughtEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.NftBought')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.NftBought') === 'a07d31c2644106aa567962b0935daed493556b5253e00c77997c3b0e46966110'
    }

    get asV1000(): [bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentNftIssuedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.NftIssued')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.NftIssued') === '8a65dbd390f4bddd39c85cb6880eddd0c9195d763f1973d927795f1351874f8b'
    }

    get asV1000(): [v1000.ContentActor, bigint, v1000.NftIssuanceParametersRecord] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentNftSellOrderMadeEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.NftSellOrderMade')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.NftSellOrderMade') === 'cebfba3ae629656a1b23fba2233f6c98894c68c68b5cb558a92842730402fd44'
    }

    get asV1000(): [bigint, v1000.ContentActor, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentNftSlingedBackToTheOriginalArtistEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.NftSlingedBackToTheOriginalArtist')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.NftSlingedBackToTheOriginalArtist') === '3b47d764c1ffe81d817bcba7109d633ce8a964e97cceeac157b2c951f61b001d'
    }

    get asV1000(): [bigint, v1000.ContentActor] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentOfferAcceptedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.OfferAccepted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.OfferAccepted') === '0e1caef0df80727d2768bc480792261a4e7615b57b3e8182c7f664f06c96a08e'
    }

    get asV1000(): bigint {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentOfferCanceledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.OfferCanceled')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.OfferCanceled') === '3b47d764c1ffe81d817bcba7109d633ce8a964e97cceeac157b2c951f61b001d'
    }

    get asV1000(): [bigint, v1000.ContentActor] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentOfferStartedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.OfferStarted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.OfferStarted') === '78d6881bd7c7cc4612a401ffdb4c972bbc18693242ce246034d51b021d789614'
    }

    get asV1000(): [bigint, v1000.ContentActor, bigint, (bigint | undefined)] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentOpenAuctionBidAcceptedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.OpenAuctionBidAccepted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.OpenAuctionBidAccepted') === '815d65d68b303087f052b8eda6eea7379a258cfe398a9691efddb30c9d647a3a'
    }

    get asV1000(): [v1000.ContentActor, bigint, bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentOpenAuctionStartedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.OpenAuctionStarted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.OpenAuctionStarted') === 'fc7cf3f82d767a3293aaa31ad06b82bfc54ad134429f01c1b0b088369e34b7ee'
    }

    get asV1000(): [v1000.ContentActor, bigint, v1000.OpenAuctionParamsRecord, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentVideoCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.VideoCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.VideoCreated') === 'd76167e13d4e6e2436039344843e4cd10524033f21e76f03e30451fb62ea40d9'
    }

    get asV1000(): [v1000.ContentActor, bigint, bigint, v1000.VideoCreationParametersRecord, bigint[]] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentVideoDeletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.VideoDeleted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.VideoDeleted') === '48a22056559f8981366eaf63cf3efad925fd24c56f7d28d373458c2ebc4bb415'
    }

    get asV1000(): [v1000.ContentActor, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentVideoDeletedByModeratorEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.VideoDeletedByModerator')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.VideoDeletedByModerator') === 'fa4d8d29128018b630ceab7a5e5b148d417929825da537a24b441dd6b1a0be8c'
    }

    get asV1000(): [v1000.ContentActor, bigint, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentVideoUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.VideoUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.VideoUpdated') === '96ed5bbd21a4e24af6f21b01922119297ee1904daacc6e5aeed2be7e02ac7b60'
    }

    get asV1000(): [v1000.ContentActor, bigint, v1000.VideoUpdateParametersRecord, bigint[]] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ContentVideoVisibilitySetByModeratorEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Content.VideoVisibilitySetByModerator')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Content.VideoVisibilitySetByModerator') === 'cf849322ba1879fc99d8b7a515af0b8d4459283258ace34216380100eb86e498'
    }

    get asV1000(): [v1000.ContentActor, bigint, boolean, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class MembersMemberAccountsUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Members.MemberAccountsUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Members.MemberAccountsUpdated') === 'd695c224088eed4d558c9e154ea4a06c2f1e0716e32de4ca9440d61de41f49c5'
    }

    get asV1000(): [bigint, (Uint8Array | undefined), (Uint8Array | undefined)] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class MembersMemberCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Members.MemberCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Members.MemberCreated') === '751306aae13554af36cc495242806da01d33d1fb738cb688c0d978abb28b1a6e'
    }

    get asV1000(): [bigint, v1000.CreateMemberParameters, number] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class MembersMemberInvitedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Members.MemberInvited')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Members.MemberInvited') === '9d8f35b29ce26c064d2a68c9a2c691c6e8b59be690d469e1fdbbeb86d318c2ef'
    }

    get asV1000(): [bigint, v1000.InviteMembershipParameters] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }

    get isV2001(): boolean {
        return this._chain.getEventHash('Members.MemberInvited') === '2f40067e3af4b48461e4507b5e8d3f2cda085bea2ea03ea8114789c0589accfe'
    }

    get asV2001(): [bigint, v2001.InviteMembershipParameters, bigint] {
        assert(this.isV2001)
        return this._chain.decodeEvent(this.event)
    }
}

export class MembersMemberProfileUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Members.MemberProfileUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Members.MemberProfileUpdated') === '452c2e916d7f5dfaeb4259ee13f4a92e98d09dcd9bcc992ee5e6619e76c84d93'
    }

    get asV1000(): [bigint, (Uint8Array | undefined), (Uint8Array | undefined)] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class MembersMemberRemarkedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Members.MemberRemarked')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Members.MemberRemarked') === '455000da2c8f650044c433ea0fc69e39c5cb2db11e7a81e15e0fcba6f0757e16'
    }

    get asV1000(): [bigint, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }

    get isV2001(): boolean {
        return this._chain.getEventHash('Members.MemberRemarked') === '800e11437fa752c6c57a4245f54183c0c5c445b438324a6d5c2f2272b4bd0e2a'
    }

    get asV2001(): [bigint, Uint8Array, ([Uint8Array, bigint] | undefined)] {
        assert(this.isV2001)
        return this._chain.decodeEvent(this.event)
    }
}

export class MembersMembershipBoughtEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Members.MembershipBought')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Members.MembershipBought') === '8da963ab30c855bf7b92d704fdfce82f755dd6c3b96ca76c101412f271da61fb'
    }

    get asV1000(): [bigint, v1000.BuyMembershipParameters, number] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class MembersMembershipGiftedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Members.MembershipGifted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1000(): boolean {
        return this._chain.getEventHash('Members.MembershipGifted') === 'c392e4a758058424370088a9d121c415a25c88267c35b0376f23bf6ef1fce4f5'
    }

    get asV1000(): [bigint, v1000.GiftMembershipParameters] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenAccountDustedByEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.AccountDustedBy')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Account Dusted
     * Params:
     * - token identifier
     * - id of the dusted account owner member
     * - account that called the extrinsic
     * - ongoing policy
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.AccountDustedBy') === 'bd7819aa9cb613a462c11d1b30e1e4f8ca3b3f23bf36d559ec7960f4d05c931a'
    }

    /**
     * Account Dusted
     * Params:
     * - token identifier
     * - id of the dusted account owner member
     * - account that called the extrinsic
     * - ongoing policy
     */
    get asV1000(): [bigint, bigint, Uint8Array, v1000.TransferPolicy] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenAmmActivatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.AmmActivated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * AMM activated
     * Params:
     * - token id
     * - member id
     * - params for the bonding curve
     */
    get isV2002(): boolean {
        return this._chain.getEventHash('ProjectToken.AmmActivated') === '5d454faccb3c909f667f0fc5ebe8e60e00b95c937542ae2dc56162b62178426c'
    }

    /**
     * AMM activated
     * Params:
     * - token id
     * - member id
     * - params for the bonding curve
     */
    get asV2002(): [bigint, bigint, v2002.AmmCurve] {
        assert(this.isV2002)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenAmmDeactivatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.AmmDeactivated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * AMM deactivated
     * Params:
     * - token id
     * - member id
     * - amm treasury amount burned upon deactivation
     */
    get isV2002(): boolean {
        return this._chain.getEventHash('ProjectToken.AmmDeactivated') === '33de85887d3f9a3233944dd2ceb85209223f0c5a4fffc561bf8206aa91f86e34'
    }

    /**
     * AMM deactivated
     * Params:
     * - token id
     * - member id
     * - amm treasury amount burned upon deactivation
     */
    get asV2002(): [bigint, bigint, bigint] {
        assert(this.isV2002)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenMemberJoinedWhitelistEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.MemberJoinedWhitelist')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Member joined whitelist
     * Params:
     * - token identifier
     * - member id
     * - ongoing transfer policy
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.MemberJoinedWhitelist') === 'c09c271ffdc5a2121b272cead06fba3f54cd656c9ef296b4c15aae99dd890ce0'
    }

    /**
     * Member joined whitelist
     * Params:
     * - token identifier
     * - member id
     * - ongoing transfer policy
     */
    get asV1000(): [bigint, bigint, v1000.TransferPolicy] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenPatronageCreditClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.PatronageCreditClaimed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Patronage credit claimed by creator
     * Params:
     * - token identifier
     * - credit amount
     * - member id
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.PatronageCreditClaimed') === '5792ddfc0d221590d59e9ddb6ad7093547b5b1c6f60267c380976d9b8e6ead18'
    }

    /**
     * Patronage credit claimed by creator
     * Params:
     * - token identifier
     * - credit amount
     * - member id
     */
    get asV1000(): [bigint, bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenPatronageRateDecreasedToEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.PatronageRateDecreasedTo')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Patronage rate decreased
     * Params:
     * - token identifier
     * - new patronage rate
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.PatronageRateDecreasedTo') === 'a07d31c2644106aa567962b0935daed493556b5253e00c77997c3b0e46966110'
    }

    /**
     * Patronage rate decreased
     * Params:
     * - token identifier
     * - new patronage rate
     */
    get asV1000(): [bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Patronage rate decreased
     * Params:
     * - token identifier
     * - new patronage rate
     */
    get isV2002(): boolean {
        return this._chain.getEventHash('ProjectToken.PatronageRateDecreasedTo') === 'b57e136df7099b4d95c82d61169a7dca2b6b7da2952d6383cedc8494d541669a'
    }

    /**
     * Patronage rate decreased
     * Params:
     * - token identifier
     * - new patronage rate
     */
    get asV2002(): [bigint, number] {
        assert(this.isV2002)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenRevenueSplitFinalizedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.RevenueSplitFinalized')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Revenue Split finalized
     * Params:
     * - token identifier
     * - recovery account for the leftover funds
     * - leftover funds
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.RevenueSplitFinalized') === 'd357793d55b7a7f611ebd0d666a704245d42575af9ed4be93753feee425797a0'
    }

    /**
     * Revenue Split finalized
     * Params:
     * - token identifier
     * - recovery account for the leftover funds
     * - leftover funds
     */
    get asV1000(): [bigint, Uint8Array, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenRevenueSplitIssuedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.RevenueSplitIssued')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Revenue Split issued
     * Params:
     * - token identifier
     * - starting block for the split
     * - duration of the split
     * - JOY allocated for the split
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.RevenueSplitIssued') === '4dd4fa5df7b91356d41d12f44011c4dab6ec2f2fb1260ddd79dcfcb322a79aff'
    }

    /**
     * Revenue Split issued
     * Params:
     * - token identifier
     * - starting block for the split
     * - duration of the split
     * - JOY allocated for the split
     */
    get asV1000(): [bigint, number, number, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenRevenueSplitLeftEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.RevenueSplitLeft')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * User left revenue split
     * Params:
     * - token identifier
     * - ex-participant's member id
     * - amount unstaked
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.RevenueSplitLeft') === '33de85887d3f9a3233944dd2ceb85209223f0c5a4fffc561bf8206aa91f86e34'
    }

    /**
     * User left revenue split
     * Params:
     * - token identifier
     * - ex-participant's member id
     * - amount unstaked
     */
    get asV1000(): [bigint, bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenTokenAmountTransferredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.TokenAmountTransferred')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Token amount is transferred from src to dst
     * Params:
     * - token identifier
     * - source member id
     * - map containing validated outputs (amount indexed by (member_id + account existance))
     * - transfer's metadata
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.TokenAmountTransferred') === '9d196b09c3f88c818d0e262e552075081f2c4cae7df9158da5b67b311f426b3e'
    }

    /**
     * Token amount is transferred from src to dst
     * Params:
     * - token identifier
     * - source member id
     * - map containing validated outputs (amount indexed by (member_id + account existance))
     * - transfer's metadata
     */
    get asV1000(): [bigint, bigint, [v1000.Validated, v1000.ValidatedPayment][], Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenTokenAmountTransferredByIssuerEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.TokenAmountTransferredByIssuer')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Token amount transferred by issuer
     * Params:
     * - token identifier
     * - source (issuer) member id
     * - map containing validated outputs
     *   (amount, opt. vesting schedule, opt. vesting cleanup key) data indexed by
     *   (account_id + account existance)
     * - transfer's metadata
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.TokenAmountTransferredByIssuer') === '9d196b09c3f88c818d0e262e552075081f2c4cae7df9158da5b67b311f426b3e'
    }

    /**
     * Token amount transferred by issuer
     * Params:
     * - token identifier
     * - source (issuer) member id
     * - map containing validated outputs
     *   (amount, opt. vesting schedule, opt. vesting cleanup key) data indexed by
     *   (account_id + account existance)
     * - transfer's metadata
     */
    get asV1000(): [bigint, bigint, [v1000.Validated, v1000.ValidatedPayment][], Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenTokenDeissuedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.TokenDeissued')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Token Deissued
     * Params:
     * - token id
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.TokenDeissued') === '0e1caef0df80727d2768bc480792261a4e7615b57b3e8182c7f664f06c96a08e'
    }

    /**
     * Token Deissued
     * Params:
     * - token id
     */
    get asV1000(): bigint {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenTokenIssuedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.TokenIssued')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Token Issued
     * Params:
     * - token id
     * - token issuance parameters
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.TokenIssued') === '0d2a5dee57731c031d01091868b9e74002ca30efe12fe5ab126e1e3d4c577ea3'
    }

    /**
     * Token Issued
     * Params:
     * - token id
     * - token issuance parameters
     */
    get asV1000(): [bigint, v1000.TokenIssuanceParameters] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenTokenSaleFinalizedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.TokenSaleFinalized')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Token Sale Finalized
     * Params:
     * - token id
     * - token sale id
     * - amount of unsold tokens recovered
     * - amount of JOY collected
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.TokenSaleFinalized') === '20a6879659a2408a98478ee2bd082c527aabc59003327071c30013c5ecc845d6'
    }

    /**
     * Token Sale Finalized
     * Params:
     * - token id
     * - token sale id
     * - amount of unsold tokens recovered
     * - amount of JOY collected
     */
    get asV1000(): [bigint, number, bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenTokenSaleInitializedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.TokenSaleInitialized')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Toke Sale was Initialized
     * Params:
     * - token id
     * - token sale id
     * - token sale data
     * - token sale metadata
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.TokenSaleInitialized') === '92600f26531f83a50a07d578185c94d20151a4a60cc21a5af3bdcc7d2ed7a37b'
    }

    /**
     * Toke Sale was Initialized
     * Params:
     * - token id
     * - token sale id
     * - token sale data
     * - token sale metadata
     */
    get asV1000(): [bigint, number, v1000.TokenSale, (Uint8Array | undefined)] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Toke Sale was Initialized
     * Params:
     * - token id
     * - token sale id
     * - funds source member id
     * - token sale data
     * - token sale metadata
     */
    get isV2002(): boolean {
        return this._chain.getEventHash('ProjectToken.TokenSaleInitialized') === '67bdd3b5a8607e0a3478ca1e5e8997e2e8dc15f6bd04822216fdfcd252ab84a0'
    }

    /**
     * Toke Sale was Initialized
     * Params:
     * - token id
     * - token sale id
     * - funds source member id
     * - token sale data
     * - token sale metadata
     */
    get asV2002(): [bigint, number, bigint, v2002.TokenSale, (Uint8Array | undefined)] {
        assert(this.isV2002)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenTokensBoughtOnAmmEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.TokensBoughtOnAmm')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Tokens Bought on AMM
     * Params:
     * - token id
     * - member id
     * - amount of CRT minted
     * - amount of JOY deposited into curve treasury
     */
    get isV2002(): boolean {
        return this._chain.getEventHash('ProjectToken.TokensBoughtOnAmm') === '19ca6ee8db29c40d73d2efe5bbc576567dc1aee84c29317caf9938cbad37db27'
    }

    /**
     * Tokens Bought on AMM
     * Params:
     * - token id
     * - member id
     * - amount of CRT minted
     * - amount of JOY deposited into curve treasury
     */
    get asV2002(): [bigint, bigint, bigint, bigint] {
        assert(this.isV2002)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenTokensBurnedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.TokensBurned')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Tokens Burned
     * Params:
     * - token id
     * - member id
     * - number of tokens burned
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.TokensBurned') === '33de85887d3f9a3233944dd2ceb85209223f0c5a4fffc561bf8206aa91f86e34'
    }

    /**
     * Tokens Burned
     * Params:
     * - token id
     * - member id
     * - number of tokens burned
     */
    get asV1000(): [bigint, bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenTokensPurchasedOnSaleEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.TokensPurchasedOnSale')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Tokens Purchased On Sale
     * Params:
     * - token id
     * - token sale id
     * - amount of tokens purchased
     * - buyer's member id
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.TokensPurchasedOnSale') === '35be0a430d22bae9cd8d123e52145446d7f56504d86e1b1fb6c19b8dc28a4ec8'
    }

    /**
     * Tokens Purchased On Sale
     * Params:
     * - token id
     * - token sale id
     * - amount of tokens purchased
     * - buyer's member id
     */
    get asV1000(): [bigint, number, bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenTokensSoldOnAmmEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.TokensSoldOnAmm')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Tokens Sold on AMM
     * Params:
     * - token id
     * - member id
     * - amount of CRT burned
     * - amount of JOY withdrawn from curve treasury
     */
    get isV2002(): boolean {
        return this._chain.getEventHash('ProjectToken.TokensSoldOnAmm') === '19ca6ee8db29c40d73d2efe5bbc576567dc1aee84c29317caf9938cbad37db27'
    }

    /**
     * Tokens Sold on AMM
     * Params:
     * - token id
     * - member id
     * - amount of CRT burned
     * - amount of JOY withdrawn from curve treasury
     */
    get asV2002(): [bigint, bigint, bigint, bigint] {
        assert(this.isV2002)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenTransferPolicyChangedToPermissionlessEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.TransferPolicyChangedToPermissionless')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Transfer Policy Changed To Permissionless
     * Params:
     * - token id
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.TransferPolicyChangedToPermissionless') === '0e1caef0df80727d2768bc480792261a4e7615b57b3e8182c7f664f06c96a08e'
    }

    /**
     * Transfer Policy Changed To Permissionless
     * Params:
     * - token id
     */
    get asV1000(): bigint {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenUpcomingTokenSaleUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.UpcomingTokenSaleUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Upcoming Token Sale was Updated
     * Params:
     * - token id
     * - token sale id
     * - new sale start block
     * - new sale duration
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.UpcomingTokenSaleUpdated') === '9b2c6e991f6712cb1dddef8f50d6ecdc4dacdf84868eaaf07c13639fbd2b875f'
    }

    /**
     * Upcoming Token Sale was Updated
     * Params:
     * - token id
     * - token sale id
     * - new sale start block
     * - new sale duration
     */
    get asV1000(): [bigint, number, (number | undefined), (number | undefined)] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class ProjectTokenUserParticipatedInSplitEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ProjectToken.UserParticipatedInSplit')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * User partipated in a revenue split
     * Params:
     * - token identifier
     * - participant's member id
     * - user allocated staked balance
     * - dividend amount (JOY) granted
     * - revenue split identifier
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('ProjectToken.UserParticipatedInSplit') === '8a0d561307672bbffb736d353518b182ab4b04170d9031a8eb90d1b7d594123d'
    }

    /**
     * User partipated in a revenue split
     * Params:
     * - token identifier
     * - participant's member id
     * - user allocated staked balance
     * - dividend amount (JOY) granted
     * - revenue split identifier
     */
    get asV1000(): [bigint, bigint, bigint, bigint, number] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDataObjectsDeletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DataObjectsDeleted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on data objects deletion from bags.
     * Params
     * - account ID for the state bloat bond
     * - bag ID
     * - data object IDs
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DataObjectsDeleted') === '089fda898662ac18f06352e2f758f12f2374c2bc61e9658a1dcdd199134cd4cd'
    }

    /**
     * Emits on data objects deletion from bags.
     * Params
     * - account ID for the state bloat bond
     * - bag ID
     * - data object IDs
     */
    get asV1000(): [Uint8Array, v1000.BagIdType, bigint[]] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDataObjectsMovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DataObjectsMoved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on moving data objects between bags.
     * Params
     * - source bag ID
     * - destination bag ID
     * - data object IDs
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DataObjectsMoved') === '51897f8342fc98ab8ea5716cf49ff2ec20cbd66aa7b729636b84afcd170d3227'
    }

    /**
     * Emits on moving data objects between bags.
     * Params
     * - source bag ID
     * - destination bag ID
     * - data object IDs
     */
    get asV1000(): [v1000.BagIdType, v1000.BagIdType, bigint[]] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDataObjectsUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DataObjectsUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on storage assets being uploaded and deleted at the same time
     * Params
     * - UploadParameters
     * - Ids of the uploaded objects
     * - Ids of the removed objects
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DataObjectsUpdated') === 'f92dd7eaf7cf23e34b451220470369fdad47712c5fc0d913ea3ea5fbbb17f146'
    }

    /**
     * Emits on storage assets being uploaded and deleted at the same time
     * Params
     * - UploadParameters
     * - Ids of the uploaded objects
     * - Ids of the removed objects
     */
    get asV1000(): [v1000.UploadParametersRecord, bigint[], bigint[]] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDataObjectsUploadedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DataObjectsUploaded')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on uploading data objects.
     * Params
     * - data objects IDs
     * - initial uploading parameters
     * - state bloat bond for objects
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DataObjectsUploaded') === '51ab5b7cd03619066e4736096d30e22c7ed970e371d187c2f79fcd80b1079cbe'
    }

    /**
     * Emits on uploading data objects.
     * Params
     * - data objects IDs
     * - initial uploading parameters
     * - state bloat bond for objects
     */
    get asV1000(): [bigint[], v1000.UploadParametersRecord, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketCreated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on creating distribution bucket.
     * Params
     * - distribution bucket family ID
     * - accepting new bags
     * - distribution bucket ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketCreated') === '54956f7b7836f3084b9468e6dea07b31ef1b8f8eb925bbbc6e3dd0d2721aa4db'
    }

    /**
     * Emits on creating distribution bucket.
     * Params
     * - distribution bucket family ID
     * - accepting new bags
     * - distribution bucket ID
     */
    get asV1000(): [bigint, boolean, v1000.DistributionBucketIdRecord] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketDeletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketDeleted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on deleting distribution bucket.
     * Params
     * - distribution bucket ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketDeleted') === '83299eeb2921cc018b349f5fd5743ea5c672fd4b8ae6135a7cae3eee869c019a'
    }

    /**
     * Emits on deleting distribution bucket.
     * Params
     * - distribution bucket ID
     */
    get asV1000(): v1000.DistributionBucketIdRecord {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketFamilyCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketFamilyCreated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on creating distribution bucket family.
     * Params
     * - distribution family bucket ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketFamilyCreated') === '0e1caef0df80727d2768bc480792261a4e7615b57b3e8182c7f664f06c96a08e'
    }

    /**
     * Emits on creating distribution bucket family.
     * Params
     * - distribution family bucket ID
     */
    get asV1000(): bigint {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketFamilyDeletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketFamilyDeleted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on deleting distribution bucket family.
     * Params
     * - distribution family bucket ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketFamilyDeleted') === '0e1caef0df80727d2768bc480792261a4e7615b57b3e8182c7f664f06c96a08e'
    }

    /**
     * Emits on deleting distribution bucket family.
     * Params
     * - distribution family bucket ID
     */
    get asV1000(): bigint {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketFamilyMetadataSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketFamilyMetadataSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on setting the metadata by a distribution bucket family.
     * Params
     * - distribution bucket family ID
     * - metadata
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketFamilyMetadataSet') === '455000da2c8f650044c433ea0fc69e39c5cb2db11e7a81e15e0fcba6f0757e16'
    }

    /**
     * Emits on setting the metadata by a distribution bucket family.
     * Params
     * - distribution bucket family ID
     * - metadata
     */
    get asV1000(): [bigint, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketInvitationAcceptedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketInvitationAccepted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on accepting a distribution bucket invitation for the operator.
     * Params
     * - worker ID
     * - distribution bucket ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketInvitationAccepted') === '292bf26e5d1a7833ffa5a7bfc6c478c38e2f26e9b6a76ac99098d20edc49c841'
    }

    /**
     * Emits on accepting a distribution bucket invitation for the operator.
     * Params
     * - worker ID
     * - distribution bucket ID
     */
    get asV1000(): [bigint, v1000.DistributionBucketIdRecord] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketInvitationCancelledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketInvitationCancelled')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on canceling a distribution bucket invitation for the operator.
     * Params
     * - distribution bucket ID
     * - operator worker ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketInvitationCancelled') === '4564625b8e17a286b9ea188e034d4d50935ea20156e9d5e6663262cebba8b657'
    }

    /**
     * Emits on canceling a distribution bucket invitation for the operator.
     * Params
     * - distribution bucket ID
     * - operator worker ID
     */
    get asV1000(): [v1000.DistributionBucketIdRecord, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketMetadataSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketMetadataSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on setting the metadata by a distribution bucket operator.
     * Params
     * - worker ID
     * - distribution bucket ID
     * - metadata
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketMetadataSet') === 'a2c8f4494a55130d76bb916a8ee87b52fc38ef4aa1b7014c55c5ee98b5e889a1'
    }

    /**
     * Emits on setting the metadata by a distribution bucket operator.
     * Params
     * - worker ID
     * - distribution bucket ID
     * - metadata
     */
    get asV1000(): [bigint, v1000.DistributionBucketIdRecord, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketModeUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketModeUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on storage bucket mode update (distributing flag).
     * Params
     * - distribution bucket ID
     * - distributing
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketModeUpdated') === '4096b467ec8fba7d644572a0158390d5407e5cfbf96734b3cc48b4015a3e5403'
    }

    /**
     * Emits on storage bucket mode update (distributing flag).
     * Params
     * - distribution bucket ID
     * - distributing
     */
    get asV1000(): [v1000.DistributionBucketIdRecord, boolean] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketOperatorInvitedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketOperatorInvited')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on creating a distribution bucket invitation for the operator.
     * Params
     * - distribution bucket ID
     * - worker ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketOperatorInvited') === '4564625b8e17a286b9ea188e034d4d50935ea20156e9d5e6663262cebba8b657'
    }

    /**
     * Emits on creating a distribution bucket invitation for the operator.
     * Params
     * - distribution bucket ID
     * - worker ID
     */
    get asV1000(): [v1000.DistributionBucketIdRecord, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketOperatorRemovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketOperatorRemoved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on the distribution bucket operator removal.
     * Params
     * - distribution bucket ID
     * - distribution bucket operator ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketOperatorRemoved') === '4564625b8e17a286b9ea188e034d4d50935ea20156e9d5e6663262cebba8b657'
    }

    /**
     * Emits on the distribution bucket operator removal.
     * Params
     * - distribution bucket ID
     * - distribution bucket operator ID
     */
    get asV1000(): [v1000.DistributionBucketIdRecord, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketStatusUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketStatusUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on storage bucket status update (accepting new bags).
     * Params
     * - distribution bucket ID
     * - new status (accepting new bags)
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketStatusUpdated') === '4096b467ec8fba7d644572a0158390d5407e5cfbf96734b3cc48b4015a3e5403'
    }

    /**
     * Emits on storage bucket status update (accepting new bags).
     * Params
     * - distribution bucket ID
     * - new status (accepting new bags)
     */
    get asV1000(): [v1000.DistributionBucketIdRecord, boolean] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDistributionBucketsUpdatedForBagEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DistributionBucketsUpdatedForBag')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on updating distribution buckets for bag.
     * Params
     * - bag ID
     * - storage buckets to add ID collection
     * - storage buckets to remove ID collection
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DistributionBucketsUpdatedForBag') === 'd853874d4930d916ef00b4f2c33dd7f9bae2253205432a54d0cc17ff2eb5ab7f'
    }

    /**
     * Emits on updating distribution buckets for bag.
     * Params
     * - bag ID
     * - storage buckets to add ID collection
     * - storage buckets to remove ID collection
     */
    get asV1000(): [v1000.BagIdType, bigint, bigint[], bigint[]] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDynamicBagCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DynamicBagCreated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on creating a dynamic bag.
     * Params
     * - dynamic bag creation parameters
     * - uploaded data objects ids
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DynamicBagCreated') === '59b9634e37a32af8eabf0878d6e944494bf786658b941e19f3c43a98fe42b393'
    }

    /**
     * Emits on creating a dynamic bag.
     * Params
     * - dynamic bag creation parameters
     * - uploaded data objects ids
     */
    get asV1000(): [v1000.DynBagCreationParametersRecord, bigint[]] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageDynamicBagDeletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.DynamicBagDeleted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on deleting a dynamic bag.
     * Params
     * - dynamic bag ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.DynamicBagDeleted') === 'e8ad511a7b8d90054f7e62cdb916ae4023a775b325f68c7ea40b11a8f7be8cfe'
    }

    /**
     * Emits on deleting a dynamic bag.
     * Params
     * - dynamic bag ID
     */
    get asV1000(): v1000.DynamicBagIdType {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StoragePendingDataObjectsAcceptedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.PendingDataObjectsAccepted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on accepting pending data objects.
     * Params
     * - storage bucket ID
     * - worker ID (storage provider ID)
     * - bag ID
     * - pending data objects
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.PendingDataObjectsAccepted') === '9181f49261c1939916fe85ff51eafca214e89f25eaf000f650f96c58be862e9b'
    }

    /**
     * Emits on accepting pending data objects.
     * Params
     * - storage bucket ID
     * - worker ID (storage provider ID)
     * - bag ID
     * - pending data objects
     */
    get asV1000(): [bigint, bigint, v1000.BagIdType, bigint[]] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageStorageBucketCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.StorageBucketCreated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on creating the storage bucket.
     * Params
     * - storage bucket ID
     * - invited worker
     * - flag "accepting_new_bags"
     * - size limit for voucher,
     * - objects limit for voucher,
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.StorageBucketCreated') === '7afe7e6fead6347c347e4c0cb809937c5f974a190bb32b74aa03fc4e9256de8e'
    }

    /**
     * Emits on creating the storage bucket.
     * Params
     * - storage bucket ID
     * - invited worker
     * - flag "accepting_new_bags"
     * - size limit for voucher,
     * - objects limit for voucher,
     */
    get asV1000(): [bigint, (bigint | undefined), boolean, bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageStorageBucketDeletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.StorageBucketDeleted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on storage bucket deleting.
     * Params
     * - storage bucket ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.StorageBucketDeleted') === '0e1caef0df80727d2768bc480792261a4e7615b57b3e8182c7f664f06c96a08e'
    }

    /**
     * Emits on storage bucket deleting.
     * Params
     * - storage bucket ID
     */
    get asV1000(): bigint {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageStorageBucketInvitationAcceptedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.StorageBucketInvitationAccepted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on accepting the storage bucket invitation.
     * Params
     * - storage bucket ID
     * - invited worker ID
     * - transactor account ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.StorageBucketInvitationAccepted') === '3748537e4a3b2405abdbc6f66010bc29ca59a01e8fa9fbfffad8d55a0880ec92'
    }

    /**
     * Emits on accepting the storage bucket invitation.
     * Params
     * - storage bucket ID
     * - invited worker ID
     * - transactor account ID
     */
    get asV1000(): [bigint, bigint, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageStorageBucketInvitationCancelledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.StorageBucketInvitationCancelled')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on cancelling the storage bucket invitation.
     * Params
     * - storage bucket ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.StorageBucketInvitationCancelled') === '0e1caef0df80727d2768bc480792261a4e7615b57b3e8182c7f664f06c96a08e'
    }

    /**
     * Emits on cancelling the storage bucket invitation.
     * Params
     * - storage bucket ID
     */
    get asV1000(): bigint {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageStorageBucketOperatorInvitedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.StorageBucketOperatorInvited')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on the storage bucket operator invitation.
     * Params
     * - storage bucket ID
     * - operator worker ID (storage provider ID)
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.StorageBucketOperatorInvited') === 'a07d31c2644106aa567962b0935daed493556b5253e00c77997c3b0e46966110'
    }

    /**
     * Emits on the storage bucket operator invitation.
     * Params
     * - storage bucket ID
     * - operator worker ID (storage provider ID)
     */
    get asV1000(): [bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageStorageBucketOperatorRemovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.StorageBucketOperatorRemoved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on the storage bucket operator removal.
     * Params
     * - storage bucket ID
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.StorageBucketOperatorRemoved') === '0e1caef0df80727d2768bc480792261a4e7615b57b3e8182c7f664f06c96a08e'
    }

    /**
     * Emits on the storage bucket operator removal.
     * Params
     * - storage bucket ID
     */
    get asV1000(): bigint {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageStorageBucketStatusUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.StorageBucketStatusUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on storage bucket status update.
     * Params
     * - storage bucket ID
     * - new status
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.StorageBucketStatusUpdated') === '840ac8d292e1374dbb168d73165f148f05f011c240521661b812cf877cec0614'
    }

    /**
     * Emits on storage bucket status update.
     * Params
     * - storage bucket ID
     * - new status
     */
    get asV1000(): [bigint, boolean] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageStorageBucketVoucherLimitsSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.StorageBucketVoucherLimitsSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on setting the storage bucket voucher limits.
     * Params
     * - storage bucket ID
     * - new total objects size limit
     * - new total objects number limit
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.StorageBucketVoucherLimitsSet') === '258d4f9d58528447eb0c3aa76dc96771fc911f4d37cac94534ebdfb0a4e962ae'
    }

    /**
     * Emits on setting the storage bucket voucher limits.
     * Params
     * - storage bucket ID
     * - new total objects size limit
     * - new total objects number limit
     */
    get asV1000(): [bigint, bigint, bigint] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageStorageBucketsUpdatedForBagEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.StorageBucketsUpdatedForBag')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on updating storage buckets for bag.
     * Params
     * - bag ID
     * - storage buckets to add ID collection
     * - storage buckets to remove ID collection
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.StorageBucketsUpdatedForBag') === '0eb807c40b96b7a35546726529576be0826c77024b06d453aba14904d28ed7f7'
    }

    /**
     * Emits on updating storage buckets for bag.
     * Params
     * - bag ID
     * - storage buckets to add ID collection
     * - storage buckets to remove ID collection
     */
    get asV1000(): [v1000.BagIdType, bigint[], bigint[]] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageStorageOperatorMetadataSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.StorageOperatorMetadataSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on setting the storage operator metadata.
     * Params
     * - storage bucket ID
     * - invited worker ID
     * - metadata
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.StorageOperatorMetadataSet') === '582c390b8c641f5fc98a7855175e82d670fb7a9f362dbd16a6f8a9b6db2b0edc'
    }

    /**
     * Emits on setting the storage operator metadata.
     * Params
     * - storage bucket ID
     * - invited worker ID
     * - metadata
     */
    get asV1000(): [bigint, bigint, Uint8Array] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}

export class StorageVoucherChangedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Storage.VoucherChanged')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits on changing the voucher for a storage bucket.
     * Params
     * - storage bucket ID
     * - new voucher
     */
    get isV1000(): boolean {
        return this._chain.getEventHash('Storage.VoucherChanged') === '41a939f14a6ac90498a57cf30a24ada8282640ea33385b965484ba7e530ee3b3'
    }

    /**
     * Emits on changing the voucher for a storage bucket.
     * Params
     * - storage bucket ID
     * - new voucher
     */
    get asV1000(): [bigint, v1000.Voucher] {
        assert(this.isV1000)
        return this._chain.decodeEvent(this.event)
    }
}
