import 'reflect-metadata'
import { Resolver, UseMiddleware, Ctx, Args, Arg, Mutation, Query } from 'type-graphql'
import { EntityManager } from 'typeorm'
import { AccountOnly, OperatorOnly } from '../middleware'
import { withHiddenEntities } from '../../../utils/sql'
import { ActivatedBounty, Bounty, Channel } from '../../../model'
import {
  ActivatedBountyOperationResult,
  AddActivatedBountyArgs,
  AddBountyArgs,
  BountyOperationResult,
  GetActivatedBountiesForChannel,
} from './types'
import { v4 as uuidv4 } from 'uuid'
import { Context } from '../../check'

@Resolver()
export class BountyResolver {
  constructor(private em: () => Promise<EntityManager>) {}

  @Mutation(() => BountyOperationResult)
  @UseMiddleware(OperatorOnly())
  async addBounty(@Args() params: AddBountyArgs): Promise<BountyOperationResult> {
    const em = await this.em()
    return withHiddenEntities(em, async () => {
      const id = uuidv4()
      const bounty = new Bounty({
        id,
        createdAt: new Date(),
        expirationDate: params.expirationDate,
        maxPayoutUSD: params.maxPayoutUSD,
        title: params.title,
        description: params.description,
        coverImageLink: params.coverImageLink,
        talkingPointsText: params.talkingPointsText,
      })
      await em.save(bounty)

      return { bountyId: id }
    })
  }

  // add a new resolver in order to add a activated bounty entity to the database
  @Mutation(() => ActivatedBountyOperationResult)
  @UseMiddleware(AccountOnly)
  async addActivatedBounty(
    @Args() params: AddActivatedBountyArgs,
    @Ctx() ctx: Context
  ): Promise<ActivatedBountyOperationResult> {
    const em = await this.em()
    return withHiddenEntities(em, async () => {
      await this.ensureChannelBelongsToContextAccount(em, params.channelOwnerId, ctx)

      const bounty = await em.getRepository(Bounty).findOne({ where: { id: params.bountyId } })
      if (!bounty) {
        throw new Error(`Bounty with id ${params.bountyId} not found`)
      }
      const id = uuidv4()
      const activatedBounty = new ActivatedBounty({
        id,
        bountyId: bounty.id,
        channelOwnerId: params.channelOwnerId,
        completed: false,
      })
      bounty.activatedBounties.push(activatedBounty)

      await em.save(activatedBounty)
      await em.save(bounty)

      return { bountyId: id }
    })
  }

  // add a resolver in order to remove an activated bounty
  @Mutation(() => ActivatedBountyOperationResult)
  @UseMiddleware(AccountOnly)
  async removeActivatedBounty(
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ): Promise<ActivatedBountyOperationResult> {
    const em = await this.em()
    return withHiddenEntities(em, async () => {
      const activatedBounty = await em.getRepository(ActivatedBounty).findOne({ where: { id } })
      if (!activatedBounty) {
        throw new Error(`Activated bounty with id ${id} not found`)
      }
      await this.ensureActivatedBountyBelongsToContextAccount(em, activatedBounty, ctx)

      const bounty = await em
        .getRepository(Bounty)
        .findOne({ where: { id: activatedBounty.bountyId! } })
      if (!bounty) {
        throw new Error(`Bounty for activated bounty ${activatedBounty.bountyId} not found`)
      }

      bounty.activatedBounties = bounty.activatedBounties.filter((ab) => ab.id !== id)

      await em.remove(activatedBounty)
      await em.save(bounty)

      return { bountyId: id }
    })
  }

  // mark activated bounty as completed
  @Mutation(() => ActivatedBountyOperationResult)
  @UseMiddleware(OperatorOnly())
  async markActivatedBountyAsCompleted(
    @Arg('id') id: string
  ): Promise<ActivatedBountyOperationResult> {
    const em = await this.em()
    return withHiddenEntities(em, async () => {
      const bounty = await em.getRepository(ActivatedBounty).findOne({ where: { id } })
      if (!bounty) {
        throw new Error(`Activated bounty with id ${id} not found`)
      }

      bounty.completed = true

      await em.save(bounty)

      return { bountyId: id }
    })
  }

  // get all bounties for a specific channel
  @Query(() => [GetActivatedBountiesForChannel])
  @UseMiddleware(AccountOnly)
  async getBountiesForChannel(
    @Arg('channelId') channelId: string,
    @Ctx() ctx: Context
  ): Promise<GetActivatedBountiesForChannel[]> {
    const em = await this.em()
    return withHiddenEntities(em, async () => {
      await this.ensureChannelBelongsToContextAccount(em, channelId, ctx)

      const bountiesResult: any = await em
        .createQueryBuilder(Bounty, 'bounty')
        .innerJoin(ActivatedBounty, 'activatedBounty', 'bounty.id = activatedBounty.bountyId')
        .addSelect('activatedBounty.completed', 'completed') // Select ActivatedBounty.completed in addition to all Bounty properties
        .getMany()

      return bountiesResult.map((bounty: any) => ({
        maxPayoutsUSD: bounty.maxPayoutUSD,
        title: bounty.title,
        description: bounty.description,
        coverImageLink: bounty.coverImageLink,
        expirationDate: bounty.expirationDate,
        talkingPointsText: bounty.talkingPointsText,
        completed: bounty.activatedBounties.completed,
      }))
    })
  }

  async ensureActivatedBountyBelongsToContextAccount(
    em: EntityManager,
    activatedBounty: ActivatedBounty,
    ctx: Context
  ) {
    await this.ensureChannelBelongsToContextAccount(em, activatedBounty.channelOwnerId!, ctx)
  }

  async ensureChannelBelongsToContextAccount(em: EntityManager, channelId: string, ctx: Context) {
    const channel = await em.getRepository(Channel).findOne({ where: { id: channelId } })
    if (!channel) {
      throw new Error(`Channel with id ${channelId} not found`)
    }
    if (channel.ownerMemberId !== ctx.account?.membershipId) {
      throw new Error(
        `Channel with id ${channelId} does not belong to account with id ${ctx.accountId}`
      )
    }
  }
}
