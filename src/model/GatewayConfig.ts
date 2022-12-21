import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class GatewayConfig {
  constructor(props?: Partial<GatewayConfig>) {
    Object.assign(this, props)
  }

  /**
   * ID/name of the configuration flag
   */
  @PrimaryColumn()
  id!: string

  /**
   * Value of the configuration flag
   */
  @Column('bool', { nullable: false })
  value!: boolean

  /**
   * Last time the value was updated
   */
  @Column('timestamp with time zone', { nullable: false })
  updatedAt!: Date
}
