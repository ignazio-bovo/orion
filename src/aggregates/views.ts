import { UnsequencedVideoEvent, VideoEvent, VideoEventsBucketModel, VideoEventType } from '../models/VideoEvent'

type VideoEventsAggregationResult = {
  events?: VideoEvent[]
}[]

export class ViewsAggregate {
  private videoViewsMap: Record<string, number> = {}
  private channelViewsMap: Record<string, number> = {}

  public videoViews(videoId: string): number | null {
    return this.videoViewsMap[videoId] ?? null
  }

  public channelViews(channelId: string): number | null {
    return this.channelViewsMap[channelId] ?? null
  }

  public async rebuild() {
    const aggregation: VideoEventsAggregationResult = await VideoEventsBucketModel.aggregate([
      { $unwind: '$events' },
      { $group: { _id: null, allEvents: { $push: '$events' } } },
      { $project: { events: '$allEvents' } },
    ])

    const events = aggregation[0]?.events || []

    events.forEach((event) => {
      this.applyEvent(event)
    })
  }

  public applyEvent(event: UnsequencedVideoEvent) {
    const currentVideoViews = this.videoViewsMap[event.videoId] || 0
    const currentChannelViews = this.channelViewsMap[event.channelId] || 0

    switch (event.type) {
      case VideoEventType.AddView:
        this.videoViewsMap[event.videoId] = currentVideoViews + 1
        this.channelViewsMap[event.channelId] = currentChannelViews + 1
        break
      default:
        console.error(`Parsing unknown video event: ${event.type}`)
    }
  }
}

export const viewsAggregate = new ViewsAggregate()
