import { ArgsType, Field, ObjectType, InputType, Int, registerEnumType } from 'type-graphql'
import { DateTime } from '@subsquid/graphql-server'

@ArgsType()
export class AddBountyArgs {
  @Field(() => Int, { nullable: false })
  maxPayoutUSD: number

  @Field(() => String, { nullable: false })
  title: string

  @Field(() => String, { nullable: false })
  description: string

  @Field(() => String, { nullable: true })
  coverImageLink: string

  @Field(() => DateTime, { nullable: false })
  expirationDate: Date

  @Field(() => String, { nullable: true })
  talkingPointsText: string
}

@ObjectType()
export class BountyOperationResult {
  @Field(() => [String], { nullable: false })
  bountyId!: string
}

@ArgsType()
export class AddActivatedBountyArgs {
  @Field(() => String, { nullable: false })
  bountyId: string

  @Field(() => String, { nullable: false })
  channelOwnerId: string

  @Field(() => String, { nullable: false })
  key: string
}

@ObjectType()
export class ActivatedBountyOperationResult {
  @Field(() => [String], { nullable: false })
  bountyId!: string
}

@ObjectType()
export class GetActivatedBountiesForChannel {
  @Field(() => Int, { nullable: false })
  maxPayoutUSD: number

  @Field(() => String, { nullable: false })
  title: string

  @Field(() => String, { nullable: false })
  description: string

  @Field(() => String, { nullable: true })
  coverImageLink: string

  @Field(() => DateTime, { nullable: false })
  expirationDate: Date

  @Field(() => String, { nullable: true })
  talkingPointsText: string

  @Field(() => Boolean, { nullable: false })
  completed: boolean
}
