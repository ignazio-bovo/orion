module.exports = class Data1719081717793 {
    name = 'Data1719081717793'

    async up(db) {
        await db.query(`CREATE TABLE "amm_curve" ("id" character varying NOT NULL, "token_id" character varying, "burned_by_amm" numeric NOT NULL, "minted_by_amm" numeric NOT NULL, "amm_slope_parameter" numeric NOT NULL, "amm_init_price" numeric NOT NULL, "finalized" boolean NOT NULL, CONSTRAINT "PK_477b83cf84964aa40f38edf1db1" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_97bee00638822978784362d19f" ON "amm_curve" ("token_id") `)
        await db.query(`CREATE TABLE "amm_transaction" ("id" character varying NOT NULL, "quantity" numeric NOT NULL, "price_paid" numeric NOT NULL, "amm_id" character varying, "account_id" character varying, "price_per_unit" numeric NOT NULL, "transaction_type" character varying(4) NOT NULL, "created_in" integer NOT NULL, CONSTRAINT "PK_783093757a6f260c72ded36d409" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_135d9555d7ea3e45dd78d8aede" ON "amm_transaction" ("amm_id") `)
        await db.query(`CREATE INDEX "IDX_9109e9ce696736e0dd51d90fa7" ON "amm_transaction" ("account_id", "amm_id") `)
        await db.query(`CREATE TABLE "revenue_share" ("id" character varying NOT NULL, "token_id" character varying, "created_in" integer NOT NULL, "starting_at" integer NOT NULL, "ends_at" integer NOT NULL, "potential_participants_num" integer, "participants_num" integer NOT NULL, "allocation" numeric NOT NULL, "claimed" numeric NOT NULL, "finalized" boolean NOT NULL, CONSTRAINT "PK_6ef7c4be56b9290db1462885163" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_4e8bfc2037cececc86ba5192ea" ON "revenue_share" ("token_id") `)
        await db.query(`CREATE TABLE "revenue_share_participation" ("id" character varying NOT NULL, "account_id" character varying, "revenue_share_id" character varying, "staked_amount" numeric NOT NULL, "earnings" numeric NOT NULL, "created_in" integer NOT NULL, "recovered" boolean NOT NULL, CONSTRAINT "RevenueShareParticipation_account_revenueShare" UNIQUE ("account_id", "revenue_share_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "PK_a6931d06b217f8055611ea26fc7" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_018b86600c0c1228ada1c928be" ON "revenue_share_participation" ("revenue_share_id") `)
        await db.query(`CREATE INDEX "IDX_9ca49e1effab0c3543ae0839cf" ON "revenue_share_participation" ("account_id", "revenue_share_id") `)
        await db.query(`CREATE TABLE "vesting_schedule" ("id" character varying NOT NULL, "cliff_ratio_permill" integer NOT NULL, "vesting_duration_blocks" integer NOT NULL, "cliff_duration_blocks" integer NOT NULL, "ends_at" integer NOT NULL, "cliff_block" integer NOT NULL, CONSTRAINT "PK_4818b05532ed9058110ed5b5b13" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "vested_account" ("id" character varying NOT NULL, "vesting_id" character varying, "account_id" character varying, "total_vesting_amount" numeric NOT NULL, "vesting_source" jsonb NOT NULL, "acquired_at" integer NOT NULL, CONSTRAINT "PK_23d64323d1b1b14ccbdb6ed2a64" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_745ee4e6a2dfd5de65fb8b9f44" ON "vested_account" ("vesting_id") `)
        await db.query(`CREATE INDEX "IDX_6a0600f53023dca2c43b99a097" ON "vested_account" ("account_id") `)
        await db.query(`CREATE TABLE "token_account" ("id" character varying NOT NULL, "member_id" character varying, "token_id" character varying, "staked_amount" numeric NOT NULL, "total_amount" numeric NOT NULL, "deleted" boolean NOT NULL, CONSTRAINT "PK_6121d7a5eafbe71fba146a98fd3" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_dc32b6b2efa86183e6329909e7" ON "token_account" ("member_id") `)
        await db.query(`CREATE INDEX "IDX_b44e36e5b6093947ec28580a84" ON "token_account" ("token_id", "member_id") `)
        await db.query(`CREATE TABLE "sale_transaction" ("id" character varying NOT NULL, "quantity" numeric NOT NULL, "sale_id" character varying, "account_id" character varying, "created_in" integer NOT NULL, CONSTRAINT "PK_06470e015a427563408e7e3661e" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_cfd7aa41d364144e6bbf677a48" ON "sale_transaction" ("account_id") `)
        await db.query(`CREATE INDEX "IDX_b538792bd801ca0a1c77c03eff" ON "sale_transaction" ("sale_id", "account_id") `)
        await db.query(`CREATE TABLE "sale" ("id" character varying NOT NULL, "token_id" character varying, "price_per_unit" numeric NOT NULL, "token_sale_allocation" numeric NOT NULL, "tokens_sold" numeric NOT NULL, "created_in" integer NOT NULL, "start_block" integer NOT NULL, "ends_at" integer NOT NULL, "terms_and_conditions" text NOT NULL, "max_amount_per_member" numeric, "finalized" boolean NOT NULL, "funds_source_account_id" character varying, CONSTRAINT "Sale_token_createdIn" UNIQUE ("token_id", "created_in") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_00468ff9c85265853384de0e1d" ON "sale" ("funds_source_account_id") `)
        await db.query(`CREATE INDEX "IDX_5c5d611ec29439dc91eeea287b" ON "sale" ("token_id", "created_in") `)
        await db.query(`CREATE TABLE "benefit" ("id" character varying NOT NULL, "token_id" character varying, "emoji_code" text, "title" text NOT NULL, "description" text NOT NULL, "display_order" integer NOT NULL, CONSTRAINT "Benefit_token_displayOrder" UNIQUE ("token_id", "display_order") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "PK_c024dccb30e6f4702adffe884d1" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_77ac3c1669ee14648626b078f9" ON "benefit" ("token_id", "display_order") `)
        await db.query(`CREATE TABLE "creator_token" ("id" character varying NOT NULL, "status" character varying(6) NOT NULL, "avatar" jsonb, "total_supply" numeric NOT NULL, "is_featured" boolean NOT NULL, "symbol" text, "is_invite_only" boolean NOT NULL, "annual_creator_reward_permill" integer NOT NULL, "revenue_share_ratio_permill" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "description" text, "whitelist_applicant_note" text, "whitelist_applicant_link" text, "accounts_num" integer NOT NULL, "number_of_revenue_share_activations" integer NOT NULL, "deissued" boolean NOT NULL, "current_amm_sale_id" character varying, "current_sale_id" character varying, "current_revenue_share_id" character varying, "number_of_vested_transfer_issued" integer NOT NULL, "last_price" numeric, CONSTRAINT "PK_abbc66d13ff7d3828e4c830d325" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_790a6fc1f7aad3711c0672bb6b" ON "creator_token" ("symbol") `)
        await db.query(`CREATE INDEX "IDX_64480ef90bda6c11650c3f4279" ON "creator_token" ("created_at") `)
        await db.query(`CREATE INDEX "IDX_aabe40376c0eb47772b52780b1" ON "creator_token" ("current_amm_sale_id") `)
        await db.query(`CREATE INDEX "IDX_5eca884f8728ff8f0c6a389c24" ON "creator_token" ("current_sale_id") `)
        await db.query(`CREATE INDEX "IDX_df8c309ef364e49b9d2f17dc77" ON "creator_token" ("current_revenue_share_id") `)
        await db.query(`CREATE TABLE "trailer_video" ("id" character varying NOT NULL, "video_id" character varying, "token_id" character varying NOT NULL, CONSTRAINT "TrailerVideo_token" UNIQUE ("token_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "TrailerVideo_token_video" UNIQUE ("token_id", "video_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "REL_0151a0342b10afcd1933f10656" UNIQUE ("token_id"), CONSTRAINT "PK_06ed751f0ca8164994ff327cacc" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_c73677538ef22a243568edac74" ON "trailer_video" ("video_id") `)
        await db.query(`CREATE INDEX "IDX_0151a0342b10afcd1933f10656" ON "trailer_video" ("token_id") `)
        await db.query(`CREATE INDEX "IDX_7eb550061f81d70d7c14b9368a" ON "trailer_video" ("token_id", "video_id") `)
        await db.query(`CREATE TABLE "activated_bounty" ("id" character varying NOT NULL, "bounty_id" character varying, "channel_owner_id" character varying, "key" text, "completed" boolean NOT NULL, CONSTRAINT "PK_798112c406dd063e45726b8ea03" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d8c1cc485974ad082695f05954" ON "activated_bounty" ("bounty_id") `)
        await db.query(`CREATE INDEX "IDX_316b6674390527e9016ba707c0" ON "activated_bounty" ("channel_owner_id") `)
        await db.query(`CREATE TABLE "admin"."bounty" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "max_payout_usd" integer NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "cover_image_link" text, "expiration_date" TIMESTAMP WITH TIME ZONE NOT NULL, "talking_points_text" text NOT NULL, CONSTRAINT "PK_afc9754b790b0effd1d59257f4d" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "token_channel" ("id" character varying NOT NULL, "token_id" character varying NOT NULL, "channel_id" character varying NOT NULL, CONSTRAINT "TokenChannel_channel" UNIQUE ("channel_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "TokenChannel_token" UNIQUE ("token_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "TokenChannel_token_channel" UNIQUE ("token_id", "channel_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "REL_7105aa65a2d333bb2f66db129e" UNIQUE ("token_id"), CONSTRAINT "REL_b065bc433d65b0a6874073ea54" UNIQUE ("channel_id"), CONSTRAINT "PK_e5cd0127f70ee171db28af0293c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_7105aa65a2d333bb2f66db129e" ON "token_channel" ("token_id") `)
        await db.query(`CREATE INDEX "IDX_b065bc433d65b0a6874073ea54" ON "token_channel" ("channel_id") `)
        await db.query(`CREATE INDEX "IDX_f13351e59524e009f99612af11" ON "token_channel" ("token_id", "channel_id") `)
        await db.query(`CREATE TABLE "vested_sale" ("id" character varying NOT NULL, "sale_id" character varying NOT NULL, "vesting_id" character varying NOT NULL, CONSTRAINT "VestedSale_vesting" UNIQUE ("vesting_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "VestedSale_sale" UNIQUE ("sale_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "VestedSale_sale_vesting" UNIQUE ("sale_id", "vesting_id") DEFERRABLE INITIALLY DEFERRED, CONSTRAINT "REL_4b0d0d4f6a5ce72247ffe22324" UNIQUE ("sale_id"), CONSTRAINT "REL_ffa4428b95fc1c0e4df5b5f495" UNIQUE ("vesting_id"), CONSTRAINT "PK_223c9942cef9ded13304deb2488" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_4b0d0d4f6a5ce72247ffe22324" ON "vested_sale" ("sale_id") `)
        await db.query(`CREATE INDEX "IDX_ffa4428b95fc1c0e4df5b5f495" ON "vested_sale" ("vesting_id") `)
        await db.query(`CREATE INDEX "IDX_b2135c373c44a37e4e6842ead5" ON "vested_sale" ("sale_id", "vesting_id") `)
        await db.query(`ALTER TABLE "admin"."channel" ADD "revenue_share_ratio_percent" integer`)
        await db.query(`ALTER TABLE "admin"."channel" ADD "cumulative_revenue" numeric NOT NULL`)
        await db.query(`ALTER TABLE "notification" ADD "dispatch_block" integer`)
        await db.query(`ALTER TABLE "amm_curve" ADD CONSTRAINT "FK_97bee00638822978784362d19fc" FOREIGN KEY ("token_id") REFERENCES "creator_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "amm_transaction" ADD CONSTRAINT "FK_135d9555d7ea3e45dd78d8aedec" FOREIGN KEY ("amm_id") REFERENCES "amm_curve"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "amm_transaction" ADD CONSTRAINT "FK_51f006dbc040d62dc479adbee78" FOREIGN KEY ("account_id") REFERENCES "token_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "revenue_share" ADD CONSTRAINT "FK_4e8bfc2037cececc86ba5192ea9" FOREIGN KEY ("token_id") REFERENCES "creator_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "revenue_share_participation" ADD CONSTRAINT "FK_7549dc863632b065f111a532551" FOREIGN KEY ("account_id") REFERENCES "token_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "revenue_share_participation" ADD CONSTRAINT "FK_018b86600c0c1228ada1c928be7" FOREIGN KEY ("revenue_share_id") REFERENCES "revenue_share"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "vested_account" ADD CONSTRAINT "FK_745ee4e6a2dfd5de65fb8b9f44a" FOREIGN KEY ("vesting_id") REFERENCES "vesting_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "vested_account" ADD CONSTRAINT "FK_6a0600f53023dca2c43b99a0974" FOREIGN KEY ("account_id") REFERENCES "token_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "token_account" ADD CONSTRAINT "FK_dc32b6b2efa86183e6329909e73" FOREIGN KEY ("member_id") REFERENCES "membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "token_account" ADD CONSTRAINT "FK_02862fa18dececb99dd81a6a6a9" FOREIGN KEY ("token_id") REFERENCES "creator_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_7c477ad14796b65a8e47214adc9" FOREIGN KEY ("sale_id") REFERENCES "sale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_cfd7aa41d364144e6bbf677a488" FOREIGN KEY ("account_id") REFERENCES "token_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_53aae73a92bcdefd80d4bb94e7f" FOREIGN KEY ("token_id") REFERENCES "creator_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_00468ff9c85265853384de0e1dd" FOREIGN KEY ("funds_source_account_id") REFERENCES "token_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "benefit" ADD CONSTRAINT "FK_b484e2182fc7a1910e84a5ae7ad" FOREIGN KEY ("token_id") REFERENCES "creator_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "creator_token" ADD CONSTRAINT "FK_aabe40376c0eb47772b52780b19" FOREIGN KEY ("current_amm_sale_id") REFERENCES "amm_curve"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "creator_token" ADD CONSTRAINT "FK_5eca884f8728ff8f0c6a389c24b" FOREIGN KEY ("current_sale_id") REFERENCES "sale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "creator_token" ADD CONSTRAINT "FK_df8c309ef364e49b9d2f17dc778" FOREIGN KEY ("current_revenue_share_id") REFERENCES "revenue_share"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "trailer_video" ADD CONSTRAINT "FK_c73677538ef22a243568edac74b" FOREIGN KEY ("video_id") REFERENCES "admin"."video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "trailer_video" ADD CONSTRAINT "FK_0151a0342b10afcd1933f106564" FOREIGN KEY ("token_id") REFERENCES "creator_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "activated_bounty" ADD CONSTRAINT "FK_d8c1cc485974ad082695f059548" FOREIGN KEY ("bounty_id") REFERENCES "admin"."bounty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "activated_bounty" ADD CONSTRAINT "FK_316b6674390527e9016ba707c08" FOREIGN KEY ("channel_owner_id") REFERENCES "admin"."channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "token_channel" ADD CONSTRAINT "FK_7105aa65a2d333bb2f66db129e9" FOREIGN KEY ("token_id") REFERENCES "creator_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "token_channel" ADD CONSTRAINT "FK_b065bc433d65b0a6874073ea540" FOREIGN KEY ("channel_id") REFERENCES "admin"."channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "vested_sale" ADD CONSTRAINT "FK_4b0d0d4f6a5ce72247ffe223240" FOREIGN KEY ("sale_id") REFERENCES "sale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
        await db.query(`ALTER TABLE "vested_sale" ADD CONSTRAINT "FK_ffa4428b95fc1c0e4df5b5f4952" FOREIGN KEY ("vesting_id") REFERENCES "vesting_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`)
    }

    async down(db) {
        await db.query(`DROP TABLE "amm_curve"`)
        await db.query(`DROP INDEX "public"."IDX_97bee00638822978784362d19f"`)
        await db.query(`DROP TABLE "amm_transaction"`)
        await db.query(`DROP INDEX "public"."IDX_135d9555d7ea3e45dd78d8aede"`)
        await db.query(`DROP INDEX "public"."IDX_9109e9ce696736e0dd51d90fa7"`)
        await db.query(`DROP TABLE "revenue_share"`)
        await db.query(`DROP INDEX "public"."IDX_4e8bfc2037cececc86ba5192ea"`)
        await db.query(`DROP TABLE "revenue_share_participation"`)
        await db.query(`DROP INDEX "public"."IDX_018b86600c0c1228ada1c928be"`)
        await db.query(`DROP INDEX "public"."IDX_9ca49e1effab0c3543ae0839cf"`)
        await db.query(`DROP TABLE "vesting_schedule"`)
        await db.query(`DROP TABLE "vested_account"`)
        await db.query(`DROP INDEX "public"."IDX_745ee4e6a2dfd5de65fb8b9f44"`)
        await db.query(`DROP INDEX "public"."IDX_6a0600f53023dca2c43b99a097"`)
        await db.query(`DROP TABLE "token_account"`)
        await db.query(`DROP INDEX "public"."IDX_dc32b6b2efa86183e6329909e7"`)
        await db.query(`DROP INDEX "public"."IDX_b44e36e5b6093947ec28580a84"`)
        await db.query(`DROP TABLE "sale_transaction"`)
        await db.query(`DROP INDEX "public"."IDX_cfd7aa41d364144e6bbf677a48"`)
        await db.query(`DROP INDEX "public"."IDX_b538792bd801ca0a1c77c03eff"`)
        await db.query(`DROP TABLE "sale"`)
        await db.query(`DROP INDEX "public"."IDX_00468ff9c85265853384de0e1d"`)
        await db.query(`DROP INDEX "public"."IDX_5c5d611ec29439dc91eeea287b"`)
        await db.query(`DROP TABLE "benefit"`)
        await db.query(`DROP INDEX "public"."IDX_77ac3c1669ee14648626b078f9"`)
        await db.query(`DROP TABLE "creator_token"`)
        await db.query(`DROP INDEX "public"."IDX_790a6fc1f7aad3711c0672bb6b"`)
        await db.query(`DROP INDEX "public"."IDX_64480ef90bda6c11650c3f4279"`)
        await db.query(`DROP INDEX "public"."IDX_aabe40376c0eb47772b52780b1"`)
        await db.query(`DROP INDEX "public"."IDX_5eca884f8728ff8f0c6a389c24"`)
        await db.query(`DROP INDEX "public"."IDX_df8c309ef364e49b9d2f17dc77"`)
        await db.query(`DROP TABLE "trailer_video"`)
        await db.query(`DROP INDEX "public"."IDX_c73677538ef22a243568edac74"`)
        await db.query(`DROP INDEX "public"."IDX_0151a0342b10afcd1933f10656"`)
        await db.query(`DROP INDEX "public"."IDX_7eb550061f81d70d7c14b9368a"`)
        await db.query(`DROP TABLE "activated_bounty"`)
        await db.query(`DROP INDEX "public"."IDX_d8c1cc485974ad082695f05954"`)
        await db.query(`DROP INDEX "public"."IDX_316b6674390527e9016ba707c0"`)
        await db.query(`DROP TABLE "admin"."bounty"`)
        await db.query(`DROP TABLE "token_channel"`)
        await db.query(`DROP INDEX "public"."IDX_7105aa65a2d333bb2f66db129e"`)
        await db.query(`DROP INDEX "public"."IDX_b065bc433d65b0a6874073ea54"`)
        await db.query(`DROP INDEX "public"."IDX_f13351e59524e009f99612af11"`)
        await db.query(`DROP TABLE "vested_sale"`)
        await db.query(`DROP INDEX "public"."IDX_4b0d0d4f6a5ce72247ffe22324"`)
        await db.query(`DROP INDEX "public"."IDX_ffa4428b95fc1c0e4df5b5f495"`)
        await db.query(`DROP INDEX "public"."IDX_b2135c373c44a37e4e6842ead5"`)
        await db.query(`ALTER TABLE "admin"."channel" DROP COLUMN "revenue_share_ratio_percent"`)
        await db.query(`ALTER TABLE "admin"."channel" DROP COLUMN "cumulative_revenue"`)
        await db.query(`ALTER TABLE "notification" DROP COLUMN "dispatch_block"`)
        await db.query(`ALTER TABLE "amm_curve" DROP CONSTRAINT "FK_97bee00638822978784362d19fc"`)
        await db.query(`ALTER TABLE "amm_transaction" DROP CONSTRAINT "FK_135d9555d7ea3e45dd78d8aedec"`)
        await db.query(`ALTER TABLE "amm_transaction" DROP CONSTRAINT "FK_51f006dbc040d62dc479adbee78"`)
        await db.query(`ALTER TABLE "revenue_share" DROP CONSTRAINT "FK_4e8bfc2037cececc86ba5192ea9"`)
        await db.query(`ALTER TABLE "revenue_share_participation" DROP CONSTRAINT "FK_7549dc863632b065f111a532551"`)
        await db.query(`ALTER TABLE "revenue_share_participation" DROP CONSTRAINT "FK_018b86600c0c1228ada1c928be7"`)
        await db.query(`ALTER TABLE "vested_account" DROP CONSTRAINT "FK_745ee4e6a2dfd5de65fb8b9f44a"`)
        await db.query(`ALTER TABLE "vested_account" DROP CONSTRAINT "FK_6a0600f53023dca2c43b99a0974"`)
        await db.query(`ALTER TABLE "token_account" DROP CONSTRAINT "FK_dc32b6b2efa86183e6329909e73"`)
        await db.query(`ALTER TABLE "token_account" DROP CONSTRAINT "FK_02862fa18dececb99dd81a6a6a9"`)
        await db.query(`ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_7c477ad14796b65a8e47214adc9"`)
        await db.query(`ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_cfd7aa41d364144e6bbf677a488"`)
        await db.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_53aae73a92bcdefd80d4bb94e7f"`)
        await db.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_00468ff9c85265853384de0e1dd"`)
        await db.query(`ALTER TABLE "benefit" DROP CONSTRAINT "FK_b484e2182fc7a1910e84a5ae7ad"`)
        await db.query(`ALTER TABLE "creator_token" DROP CONSTRAINT "FK_aabe40376c0eb47772b52780b19"`)
        await db.query(`ALTER TABLE "creator_token" DROP CONSTRAINT "FK_5eca884f8728ff8f0c6a389c24b"`)
        await db.query(`ALTER TABLE "creator_token" DROP CONSTRAINT "FK_df8c309ef364e49b9d2f17dc778"`)
        await db.query(`ALTER TABLE "trailer_video" DROP CONSTRAINT "FK_c73677538ef22a243568edac74b"`)
        await db.query(`ALTER TABLE "trailer_video" DROP CONSTRAINT "FK_0151a0342b10afcd1933f106564"`)
        await db.query(`ALTER TABLE "activated_bounty" DROP CONSTRAINT "FK_d8c1cc485974ad082695f059548"`)
        await db.query(`ALTER TABLE "activated_bounty" DROP CONSTRAINT "FK_316b6674390527e9016ba707c08"`)
        await db.query(`ALTER TABLE "token_channel" DROP CONSTRAINT "FK_7105aa65a2d333bb2f66db129e9"`)
        await db.query(`ALTER TABLE "token_channel" DROP CONSTRAINT "FK_b065bc433d65b0a6874073ea540"`)
        await db.query(`ALTER TABLE "vested_sale" DROP CONSTRAINT "FK_4b0d0d4f6a5ce72247ffe223240"`)
        await db.query(`ALTER TABLE "vested_sale" DROP CONSTRAINT "FK_ffa4428b95fc1c0e4df5b5f4952"`)
    }
}
