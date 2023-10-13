import { EntityManager } from 'typeorm'
import { Channel, Notification } from '../../model'
import { getNotificationAvatar } from './notificationAvatars'
import { getNotificationIcon } from './notificationIcons'
import { getNotificationLink } from './notificationLinks'

type NotificationData = {
  icon: string
  link: string
  avatar: string
  text: string
}

export const getNotificationData = async (
  em: EntityManager,
  { notificationType, recipient }: Notification
): Promise<NotificationData> => {
  const recipientId =
    recipient.isTypeOf === 'MemberRecipient' ? recipient.membership : recipient.channel

  switch (notificationType.isTypeOf) {
    //
    // Member notifications events
    //

    // Generic
    case 'ChannelCreated': {
      const { channelId, channelTitle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'bell'),
        link: await getNotificationLink(em, 'channel-page', [channelId]),
        avatar: await getNotificationAvatar(em, 'channelId', channelId),
        text: `New channel created: “${channelTitle}“`,
      }
    }

    // Engagement
    case 'CommentReply': {
      const { videoId, videoTitle, commentId, memberHandle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'follow'),
        link: await getNotificationLink(em, 'video-page', [videoId, commentId]),
        avatar: await getNotificationAvatar(em, 'membershipHandle', memberHandle),
        text: `${memberHandle} replied to your comment under the video: “${videoTitle}”`,
      }
    }
    case 'ReactionToComment': {
      const { videoId, videoTitle, commentId, memberHandle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'reaction'),
        link: await getNotificationLink(em, 'video-page', [videoId, commentId]),
        avatar: await getNotificationAvatar(em, 'membershipHandle', memberHandle),
        text: `${memberHandle} reacted to your comment on the video: “${videoTitle}”`,
      }
    }

    // Followed channels
    case 'VideoPosted': {
      const { videoId, videoTitle, channelTitle, channelId } = notificationType
      return {
        icon: await getNotificationIcon(em, 'video'),
        link: await getNotificationLink(em, 'video-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'channelId', channelId),
        text: `${channelTitle} posted a new video: “${videoTitle}”`,
      }
    }
    case 'NewNftOnSale': {
      const { videoId, videoTitle, channelTitle, channelId } = notificationType
      return {
        icon: await getNotificationIcon(em, 'nft'),
        link: await getNotificationLink(em, 'nft-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'channelId', channelId),
        text: `${channelTitle} started the sale of NFT: “${videoTitle}”`,
      }
    }
    case 'NewAuction': {
      const { videoId, videoTitle, channelTitle, channelId } = notificationType
      return {
        icon: await getNotificationIcon(em, 'nft'),
        link: await getNotificationLink(em, 'nft-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'channelId', channelId),
        text: `${channelTitle} started an auction for NFT: “${videoTitle}”`,
      }
    }

    // NFT
    case 'HigherBidPlaced': {
      const { videoId, videoTitle, newBidderHandle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'nft-alt'),
        link: await getNotificationLink(em, 'nft-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'membershipHandle', newBidderHandle),
        text: `${newBidderHandle} placed a higher bid in the auction for NFT: “${videoTitle}”`,
      }
    }
    case 'AuctionWon': {
      const { videoId, videoTitle, type } = notificationType
      const auctionText = type.isTypeOf === 'AuctionTypeOpen' ? 'an open' : 'a timed'
      return {
        icon: await getNotificationIcon(em, 'nft'),
        link: await getNotificationLink(em, 'nft-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'membershipId', recipientId),
        text: `You won ${auctionText} auction for NFT: “${videoTitle}”`,
      }
    }
    case 'AuctionLost': {
      const { videoId, videoTitle, type } = notificationType
      const auctionText = type.isTypeOf === 'AuctionTypeOpen' ? 'an open' : 'a timed'
      return {
        icon: await getNotificationIcon(em, 'nft-alt'),
        link: await getNotificationLink(em, 'nft-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'membershipId', recipientId),
        text: `You lost ${auctionText} auction for NFT: “${videoTitle}”. Withdraw your bid`,
      }
    }

    //
    // Channel notifications events
    //

    // Content moderation and featuring
    case 'ChannelExcluded': {
      const channel = await em.getRepository(Channel).findOneBy({ id: recipientId })
      return {
        icon: await getNotificationIcon(em, 'warning'),
        link: await getNotificationLink(em, 'term-of-sevice-page'),
        avatar: await getNotificationAvatar(em, 'channelId', recipientId),
        text: `Your channel “${channel?.title}” is excluded from App`,
      }
    }
    case 'VideoExcluded': {
      const { videoTitle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'warning'),
        link: await getNotificationLink(em, 'term-of-sevice-page'),
        avatar: await getNotificationAvatar(em, 'channelId', recipientId),
        text: `Your video is excluded from App: “${videoTitle}”`,
      }
    }
    case 'NftFeaturedOnMarketPlace': {
      const { videoTitle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'bell'),
        link: await getNotificationLink(em, 'marketplace-page'),
        avatar: await getNotificationAvatar(em, 'channelId', recipientId),
        text: `Your NFT was featured in the marketplace featured section: “${videoTitle}”`,
      }
    }

    // Engagement
    case 'NewChannelFollower': {
      const { followerHandle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'follow'),
        link: await getNotificationLink(em, 'member-page', [followerHandle]),
        avatar: await getNotificationAvatar(em, 'membershipHandle', followerHandle),
        text: `${followerHandle} followed your channel`,
      }
    }
    case 'CommentPostedToVideo': {
      const { videoId, videoTitle, memberHandle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'follow'),
        link: await getNotificationLink(em, 'nft-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'membershipHandle', memberHandle),
        text: `${memberHandle} left a comment on your video: “${videoTitle}”`,
      }
    }
    case 'VideoLiked': {
      const { videoId, videoTitle, memberHandle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'like'),
        link: await getNotificationLink(em, 'video-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'membershipHandle', memberHandle),
        text: `${memberHandle} liked your video: “${videoTitle}”`,
      }
    }
    case 'VideoDisliked': {
      const { videoId, videoTitle, memberHandle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'dislike'),
        link: await getNotificationLink(em, 'video-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'membershipHandle', memberHandle),
        text: `${memberHandle} disliked your video: “${videoTitle}”`,
      }
    }

    // Youtube Partnership Program
    case 'ChannelVerified': {
      return {
        icon: await getNotificationIcon(em, 'bell'),
        link: await getNotificationLink(em, 'ypp-dashboard'),
        avatar: await getNotificationAvatar(em, 'channelId', recipientId),
        text: `Your channel got verified in our Youtube Partnership Program`,
      }
    }
    case 'ChannelSuspended': {
      return {
        icon: await getNotificationIcon(em, 'warning'),
        link: await getNotificationLink(em, 'ypp-dashboard'),
        avatar: await getNotificationAvatar(em, 'channelId', recipientId),
        text: `Your channel got suspended in our Youtube Partnership Program`,
      }
    }

    // NFTs Auctions
    case 'NftPurchased': {
      const { videoId, videoTitle, buyerHandle, price } = notificationType
      return {
        icon: await getNotificationIcon(em, 'nft'),
        link: await getNotificationLink(em, 'nft-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'membershipHandle', buyerHandle),
        text: `${buyerHandle} purchased for ${formatJOY(price)} your NFT: “${videoTitle}”`,
      }
    }
    case 'NftRoyaltyPaid': {
      const { videoId, videoTitle, amount } = notificationType
      return {
        icon: await getNotificationIcon(em, 'nft'),
        link: await getNotificationLink(em, 'nft-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'channelId', recipientId),
        text: `You received ${formatJOY(amount)} royalties from your NFT: “${videoTitle}”`,
      }
    }
    case 'CreatorReceivesAuctionBid': {
      const { videoId, videoTitle, amount, bidderHandle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'nft'),
        link: await getNotificationLink(em, 'nft-page', [videoId]),
        avatar: await getNotificationAvatar(em, 'membershipHandle', bidderHandle),
        text: `${bidderHandle} placed a bid of ${formatJOY(amount)} for your NFT: “${videoTitle}”`,
      }
    }

    // Payouts
    case 'DirectChannelPaymentByMember': {
      const { amount, payerHandle } = notificationType
      return {
        icon: await getNotificationIcon(em, 'payout'),
        link: await getNotificationLink(em, 'member-page', [payerHandle]),
        avatar: await getNotificationAvatar(em, 'membershipHandle', payerHandle),
        text: `${payerHandle} transferred ${formatJOY(amount)} to your channel`,
      }
    }
    case 'ChannelFundsWithdrawn': {
      const { amount } = notificationType
      return {
        icon: await getNotificationIcon(em, 'payout'),
        link: await getNotificationLink(em, 'payments-page'),
        avatar: await getNotificationAvatar(em, 'membershipId', recipientId),
        text: `${formatJOY(amount)} were withdrawn from your channel account`,
      }
    }
  }
}

const JOY_DECIMAL = 10
const formatJOY = (hapiAmount: bigint): string => {
  const [intPart, decPart] = splitInt(String(hapiAmount), JOY_DECIMAL)
  const formatedIntPart = chunkFromEnd(intPart, 3).join(' ')
  const roundedDec = Math.round(Number(splitInt(decPart, 2).join('.')))
  const _decPart = formatedIntPart === '0' && roundedDec === 0 ? Number(decPart) : roundedDec
  const joyAmount = _decPart ? `${formatedIntPart}.${_decPart}` : formatedIntPart

  return `${joyAmount} $JOY`
}
const splitInt = (numStr: string, decimal: number) => {
  return [numStr.slice(0, -decimal) ?? '0', numStr.slice(-decimal).padStart(decimal)]
}
const chunkFromEnd = (str: string, interval: number): string[] =>
  Array.from({ length: Math.floor((str.length - 1) / interval) }).reduce(
    ([head, ...tail]: string[]) => [head.slice(0, -interval), head.slice(-interval), ...tail],
    [str]
  )
