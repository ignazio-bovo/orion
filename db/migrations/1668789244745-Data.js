module.exports = class Data1668789244745 {
  name = 'Data1668789244745'

  async up(db) {
    await db.query(
      `CREATE TABLE "member_metadata" ("id" character varying NOT NULL, "name" text, "avatar" jsonb, "about" text, "member_id" character varying NOT NULL, CONSTRAINT "REL_e7e4d350f82ae2383894f465ed" UNIQUE ("member_id"), CONSTRAINT "PK_d3fcc374696465f3c0ac3ba8708" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE UNIQUE INDEX "IDX_e7e4d350f82ae2383894f465ed" ON "member_metadata" ("member_id") `
    )
    await db.query(
      `CREATE TABLE "bid" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "amount" numeric NOT NULL, "is_canceled" boolean NOT NULL, "created_in_block" integer NOT NULL, "auction_id" character varying, "nft_id" character varying, "bidder_id" character varying, "previous_top_bid_id" character varying, CONSTRAINT "PK_ed405dda320051aca2dcb1a50bb" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_9e594e5a61c0f3cb25679f6ba8" ON "bid" ("auction_id") `)
    await db.query(`CREATE INDEX "IDX_3caf2d6b31d2fe45a2b85b8191" ON "bid" ("nft_id") `)
    await db.query(`CREATE INDEX "IDX_e7618559409a903a897164156b" ON "bid" ("bidder_id") `)
    await db.query(
      `CREATE INDEX "IDX_32cb73025ec49c87f4c594a265" ON "bid" ("previous_top_bid_id") `
    )
    await db.query(
      `CREATE TABLE "auction" ("id" character varying NOT NULL, "starting_price" numeric NOT NULL, "buy_now_price" numeric, "auction_type" jsonb NOT NULL, "starts_at_block" integer NOT NULL, "ended_at_block" integer, "is_canceled" boolean NOT NULL, "is_completed" boolean NOT NULL, "nft_id" character varying, "winning_member_id" character varying, "top_bid_id" character varying, CONSTRAINT "PK_9dc876c629273e71646cf6dfa67" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_cfb47e97e60c9d1462576f85a8" ON "auction" ("nft_id") `)
    await db.query(
      `CREATE INDEX "IDX_a3127ec87cccc5696b92cac4e0" ON "auction" ("winning_member_id") `
    )
    await db.query(`CREATE INDEX "IDX_1673ad4b059742fbabfc40b275" ON "auction" ("top_bid_id") `)
    await db.query(
      `CREATE TABLE "auction_whitelisted_member" ("id" character varying NOT NULL, "auction_id" character varying, "member_id" character varying, CONSTRAINT "PK_f20264ca8e878696fbc25f11bd5" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_d5ae4854487c7658b64225be30" ON "auction_whitelisted_member" ("member_id") `
    )
    await db.query(
      `CREATE UNIQUE INDEX "IDX_5468573a96fa51c03743de5912" ON "auction_whitelisted_member" ("auction_id", "member_id") `
    )
    await db.query(
      `CREATE TABLE "membership" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "handle" text NOT NULL, "controller_account" text NOT NULL, CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE UNIQUE INDEX "IDX_1298811c0de5f11198fd43df72" ON "membership" ("handle") `
    )
    await db.query(
      `CREATE TABLE "geo_coordinates" ("id" character varying NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, CONSTRAINT "PK_14a5495aeb822afa30e7902e318" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE TABLE "node_location_metadata" ("id" character varying NOT NULL, "country_code" text, "city" text, "coordinates_id" character varying, CONSTRAINT "PK_5cf06baf86fd2eea399c1093f78" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_64eff87e0881036a6eddaf0a16" ON "node_location_metadata" ("coordinates_id") `
    )
    await db.query(
      `CREATE TABLE "storage_bucket_operator_metadata" ("id" character varying NOT NULL, "node_endpoint" text, "extra" text, "node_location_id" character varying, CONSTRAINT "PK_9846a397400ae1a39b21fbd02d4" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_a5e5d1b3ba2d54acbc3bde3871" ON "storage_bucket_operator_metadata" ("node_location_id") `
    )
    await db.query(
      `CREATE TABLE "storage_bucket" ("id" character varying NOT NULL, "operator_status" jsonb NOT NULL, "accepting_new_bags" boolean NOT NULL, "data_objects_size_limit" numeric NOT NULL, "data_object_count_limit" numeric NOT NULL, "data_objects_count" numeric NOT NULL, "data_objects_size" numeric NOT NULL, "operator_metadata_id" character varying, CONSTRAINT "PK_97cd0c3fe7f51e34216822e5f91" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_9846a397400ae1a39b21fbd02d" ON "storage_bucket" ("operator_metadata_id") `
    )
    await db.query(
      `CREATE TABLE "storage_bucket_bag" ("id" character varying NOT NULL, "storage_bucket_id" character varying, "bag_id" character varying, CONSTRAINT "PK_9d54c04557134225652d566cc82" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_aaf00b2c7d0cba49f97da14fbb" ON "storage_bucket_bag" ("bag_id") `
    )
    await db.query(
      `CREATE UNIQUE INDEX "IDX_4c475f6c9300284b095859eec3" ON "storage_bucket_bag" ("storage_bucket_id", "bag_id") `
    )
    await db.query(
      `CREATE TABLE "distribution_bucket_family_geographic_area" ("id" character varying NOT NULL, "area" jsonb NOT NULL, "distribution_bucket_family_metadata_id" character varying, CONSTRAINT "PK_de81c2226c59c7c77b6dabd25bb" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_166a68620f988fb3a3ffe075c6" ON "distribution_bucket_family_geographic_area" ("distribution_bucket_family_metadata_id") `
    )
    await db.query(
      `CREATE TABLE "distribution_bucket_family_metadata" ("id" character varying NOT NULL, "region" text, "description" text, "latency_test_targets" text array, CONSTRAINT "PK_df7a270835bb313d3ef17bdee2f" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_5510d3b244a63d6ec702faa426" ON "distribution_bucket_family_metadata" ("region") `
    )
    await db.query(
      `CREATE TABLE "distribution_bucket_family" ("id" character varying NOT NULL, "metadata_id" character varying, CONSTRAINT "PK_8cb7454d1ec34b0d3bb7ecdee4e" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_df7a270835bb313d3ef17bdee2" ON "distribution_bucket_family" ("metadata_id") `
    )
    await db.query(
      `CREATE TABLE "distribution_bucket_operator_metadata" ("id" character varying NOT NULL, "node_endpoint" text, "extra" text, "node_location_id" character varying, CONSTRAINT "PK_9bbecaa12f30e3826922688274f" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_b28a85d2356321236602a631c6" ON "distribution_bucket_operator_metadata" ("node_location_id") `
    )
    await db.query(
      `CREATE TABLE "distribution_bucket_operator" ("id" character varying NOT NULL, "worker_id" integer NOT NULL, "status" character varying(7) NOT NULL, "distribution_bucket_id" character varying, "metadata_id" character varying, CONSTRAINT "PK_03b87e6e972f414bab94c142285" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_678dc5427cdde0cd4fef2c07a4" ON "distribution_bucket_operator" ("distribution_bucket_id") `
    )
    await db.query(
      `CREATE INDEX "IDX_9bbecaa12f30e3826922688274" ON "distribution_bucket_operator" ("metadata_id") `
    )
    await db.query(
      `CREATE TABLE "distribution_bucket" ("id" character varying NOT NULL, "bucket_index" integer NOT NULL, "accepting_new_bags" boolean NOT NULL, "distributing" boolean NOT NULL, "family_id" character varying, CONSTRAINT "PK_c90d25fff461f2f5fa9082e2fb7" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_8cb7454d1ec34b0d3bb7ecdee4" ON "distribution_bucket" ("family_id") `
    )
    await db.query(
      `CREATE TABLE "distribution_bucket_bag" ("id" character varying NOT NULL, "distribution_bucket_id" character varying, "bag_id" character varying, CONSTRAINT "PK_02cb97c17ccabf42e8f5154d002" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_a9810100aee7584680f197c8ff" ON "distribution_bucket_bag" ("bag_id") `
    )
    await db.query(
      `CREATE UNIQUE INDEX "IDX_32e552d352848d64ab82d38e9a" ON "distribution_bucket_bag" ("distribution_bucket_id", "bag_id") `
    )
    await db.query(
      `CREATE TABLE "storage_bag" ("id" character varying NOT NULL, "owner" jsonb NOT NULL, CONSTRAINT "PK_242aecdc788d9b22bcbb9ade19a" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE TABLE "storage_data_object" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "is_accepted" boolean NOT NULL, "size" numeric NOT NULL, "ipfs_hash" text NOT NULL, "type" jsonb, "state_bloat_bond" numeric NOT NULL, "unset_at" TIMESTAMP WITH TIME ZONE, "storage_bag_id" character varying, CONSTRAINT "PK_61f224a4aef08f580a5ab4aadf0" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_ff8014300b8039dbaed764f51b" ON "storage_data_object" ("storage_bag_id") `
    )
    await db.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE TABLE "channel_follow" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "channel_id" character varying, "user_id" character varying, CONSTRAINT "PK_9410df2b9a316af3f0d216f9487" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_9bc0651dda94437ec18764a260" ON "channel_follow" ("channel_id") `
    )
    await db.query(`CREATE INDEX "IDX_822778b4b1ea8e3b60b127cb8b" ON "channel_follow" ("user_id") `)
    await db.query(
      `CREATE TABLE "video_view_event" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "video_id" character varying, "channel_id" character varying, CONSTRAINT "PK_2efd85597a6a7a704fc4d0f7701" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_2e29fba63e12a2b1818e0782d7" ON "video_view_event" ("video_id") `
    )
    await db.query(
      `CREATE INDEX "IDX_8f7f6822bdffeccb2ece945120" ON "video_view_event" ("channel_id") `
    )
    await db.query(
      `CREATE TABLE "channel" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "title" text, "description" text, "is_public" boolean, "is_censored" boolean NOT NULL, "language" text, "created_in_block" integer NOT NULL, "reward_account" text NOT NULL, "channel_state_bloat_bond" numeric NOT NULL, "follows_num" integer NOT NULL, "video_views_num" integer NOT NULL, "owner_member_id" character varying, "cover_photo_id" character varying, "avatar_photo_id" character varying, CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_25c85bc448b5e236a4c1a5f789" ON "channel" ("owner_member_id") `
    )
    await db.query(`CREATE INDEX "IDX_a77e12f3d8c6ced020e179a5e9" ON "channel" ("cover_photo_id") `)
    await db.query(
      `CREATE INDEX "IDX_6997e94413b3f2f25a84e4a96f" ON "channel" ("avatar_photo_id") `
    )
    await db.query(`CREATE INDEX "IDX_e58a2e1d78b8eccf40531a7fdb" ON "channel" ("language") `)
    await db.query(
      `CREATE TABLE "video_featured_in_category" ("id" character varying NOT NULL, "video_cut_url" text, "video_id" character varying, "category_id" character varying, CONSTRAINT "PK_f84d38b5cdb7567ac04d6e9d209" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_7b16ddad43901921a8d3c8eab7" ON "video_featured_in_category" ("video_id") `
    )
    await db.query(
      `CREATE UNIQUE INDEX "IDX_6d0917e1ac0cc06c8075bcf256" ON "video_featured_in_category" ("category_id", "video_id") `
    )
    await db.query(
      `CREATE TABLE "video_category" ("id" character varying NOT NULL, "name" text, "description" text, "created_in_block" integer NOT NULL, "parent_category_id" character varying, CONSTRAINT "PK_2a5c61f32e9636ee10821e9a58d" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE UNIQUE INDEX "IDX_cbe7e5d162a819e4ee2e2f6105" ON "video_category" ("name") `
    )
    await db.query(
      `CREATE INDEX "IDX_da26b34f037c0d59d3c0d0646e" ON "video_category" ("parent_category_id") `
    )
    await db.query(
      `CREATE TABLE "license" ("id" character varying NOT NULL, "code" integer, "attribution" text, "custom_text" text, CONSTRAINT "PK_f168ac1ca5ba87286d03b2ef905" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE TABLE "video_media_encoding" ("id" character varying NOT NULL, "codec_name" text, "container" text, "mime_media_type" text, CONSTRAINT "PK_52e25874f8d8a381e154d1125e0" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE TABLE "video_media_metadata" ("id" character varying NOT NULL, "pixel_width" integer, "pixel_height" integer, "size" numeric, "created_in_block" integer NOT NULL, "encoding_id" character varying, "video_id" character varying NOT NULL, CONSTRAINT "REL_4dc101240e8e1536b770aee202" UNIQUE ("video_id"), CONSTRAINT "PK_86a13815734e589cd86d0465e2d" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_5944dc5896cb16bd395414a0ce" ON "video_media_metadata" ("encoding_id") `
    )
    await db.query(
      `CREATE UNIQUE INDEX "IDX_4dc101240e8e1536b770aee202" ON "video_media_metadata" ("video_id") `
    )
    await db.query(
      `CREATE TABLE "video_subtitle" ("id" character varying NOT NULL, "type" text NOT NULL, "language" text, "mime_type" text NOT NULL, "video_id" character varying, "asset_id" character varying, CONSTRAINT "PK_2ac3e585fc608e673e7fbf94d8e" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_2203674f18d8052ed6bac39625" ON "video_subtitle" ("video_id") `
    )
    await db.query(
      `CREATE INDEX "IDX_ffa63c28188eecc32af921bfc3" ON "video_subtitle" ("language") `
    )
    await db.query(
      `CREATE INDEX "IDX_b6eabfb8de4128b28d73681020" ON "video_subtitle" ("asset_id") `
    )
    await db.query(
      `CREATE TABLE "comment_reaction" ("id" character varying NOT NULL, "reaction_id" integer NOT NULL, "member_id" character varying, "comment_id" character varying, "video_id" character varying, CONSTRAINT "PK_87f27d282c06eb61b1e0cde2d24" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_15080d9fb7cf8b563103dd9d90" ON "comment_reaction" ("member_id") `
    )
    await db.query(
      `CREATE INDEX "IDX_962582f04d3f639e33f43c54bb" ON "comment_reaction" ("comment_id") `
    )
    await db.query(
      `CREATE INDEX "IDX_d7995b1d57614a6fbd0c103874" ON "comment_reaction" ("video_id") `
    )
    await db.query(
      `CREATE TABLE "comment_reactions_count_by_reaction_id" ("id" character varying NOT NULL, "reaction_id" integer NOT NULL, "count" integer NOT NULL, "comment_id" character varying, "video_id" character varying, CONSTRAINT "PK_7345cbbc2ae25504a5d24932a31" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_984ad0c3a11b9073049d095703" ON "comment_reactions_count_by_reaction_id" ("comment_id") `
    )
    await db.query(
      `CREATE INDEX "IDX_c15bc80a05171d471345832efe" ON "comment_reactions_count_by_reaction_id" ("video_id") `
    )
    await db.query(
      `CREATE TABLE "comment" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "text" text NOT NULL, "status" character varying(9) NOT NULL, "replies_count" integer NOT NULL, "reactions_count" integer NOT NULL, "reactions_and_replies_count" integer NOT NULL, "is_edited" boolean NOT NULL, "author_id" character varying, "video_id" character varying, "parent_comment_id" character varying, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_3ce66469b26697baa097f8da92" ON "comment" ("author_id") `)
    await db.query(`CREATE INDEX "IDX_1ff03403fd31dfeaba0623a89c" ON "comment" ("video_id") `)
    await db.query(`CREATE INDEX "IDX_c3c2abe750c76c7c8e305f71f2" ON "comment" ("status") `)
    await db.query(
      `CREATE INDEX "IDX_ac69bddf8202b7c0752d9dc8f3" ON "comment" ("parent_comment_id") `
    )
    await db.query(
      `CREATE TABLE "video_reaction" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "reaction" character varying(6) NOT NULL, "member_id" character varying, "video_id" character varying, CONSTRAINT "PK_504876585c394f4ab33665dd44b" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_73dda64f53bbc7ec7035d5e7f0" ON "video_reaction" ("member_id") `
    )
    await db.query(
      `CREATE INDEX "IDX_436a3836eb47acb5e1e3c88dde" ON "video_reaction" ("video_id") `
    )
    await db.query(
      `CREATE TABLE "video_reactions_count_by_reaction_type" ("id" character varying NOT NULL, "reaction" character varying(6) NOT NULL, "count" integer NOT NULL, "video_id" character varying, CONSTRAINT "PK_671c69bb46bd314b0fdeb91a3aa" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE INDEX "IDX_6126405f4d28d8f4dc636fbd11" ON "video_reactions_count_by_reaction_type" ("video_id") `
    )
    await db.query(
      `CREATE TABLE "video" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "title" text, "description" text, "duration" integer, "language" text, "has_marketing" boolean, "published_before_joystream" TIMESTAMP WITH TIME ZONE, "is_public" boolean, "is_censored" boolean NOT NULL, "is_explicit" boolean, "video_state_bloat_bond" numeric NOT NULL, "created_in_block" integer NOT NULL, "is_featured" boolean NOT NULL, "is_comment_section_enabled" boolean NOT NULL, "comments_count" integer NOT NULL, "is_reaction_feature_enabled" boolean NOT NULL, "reactions_count" integer NOT NULL, "views_num" integer NOT NULL, "channel_id" character varying, "category_id" character varying, "thumbnail_photo_id" character varying, "license_id" character varying, "media_id" character varying, "pinned_comment_id" character varying, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_81b11ef99a9db9ef1aed040d75" ON "video" ("channel_id") `)
    await db.query(`CREATE INDEX "IDX_2a5c61f32e9636ee10821e9a58" ON "video" ("category_id") `)
    await db.query(
      `CREATE INDEX "IDX_8530d052cc79b420f7ce2b4e09" ON "video" ("thumbnail_photo_id") `
    )
    await db.query(`CREATE INDEX "IDX_75fbab42a4cb18371b6d5004b0" ON "video" ("language") `)
    await db.query(`CREATE INDEX "IDX_3ec633ae5d0477f512b4ed957d" ON "video" ("license_id") `)
    await db.query(`CREATE INDEX "IDX_2db879ed42e3308fe65e679672" ON "video" ("media_id") `)
    await db.query(
      `CREATE INDEX "IDX_54f88a7decf7d22fd9bd9fa439" ON "video" ("pinned_comment_id") `
    )
    await db.query(
      `CREATE TABLE "owned_nft" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "owner" jsonb NOT NULL, "transactional_status" jsonb, "creator_royalty" numeric, "last_sale_price" numeric, "last_sale_date" TIMESTAMP WITH TIME ZONE, "video_id" character varying NOT NULL, CONSTRAINT "REL_466896e39b9ec953f4f2545622" UNIQUE ("video_id"), CONSTRAINT "PK_5e0c289b350e863668fff44bb56" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE UNIQUE INDEX "IDX_466896e39b9ec953f4f2545622" ON "owned_nft" ("video_id") `
    )
    await db.query(
      `CREATE TABLE "curator_group" ("id" character varying NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "PK_0b4c0ab279d72bcbf4e16b65ff1" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE TABLE "curator" ("id" character varying NOT NULL, CONSTRAINT "PK_5791051a62d2c2dfc593d38ab57" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE TABLE "event" ("id" character varying NOT NULL, "in_block" integer NOT NULL, "in_extrinsic" text NOT NULL, "index_in_block" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "data" jsonb NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE TABLE "video_hero" ("id" character varying NOT NULL, "hero_title" text NOT NULL, "hero_video_cut_url" text NOT NULL, "hero_poster_url" text NOT NULL, "active" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE, "activated_at" TIMESTAMP WITH TIME ZONE, "deactivated_at" TIMESTAMP WITH TIME ZONE, "video_id" character varying, CONSTRAINT "PK_f3b63979879773378afac0b9495" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_9feac5d9713a9f07e32eb8ba7a" ON "video_hero" ("video_id") `)
    await db.query(
      `ALTER TABLE "member_metadata" ADD CONSTRAINT "FK_e7e4d350f82ae2383894f465ede" FOREIGN KEY ("member_id") REFERENCES "membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "bid" ADD CONSTRAINT "FK_9e594e5a61c0f3cb25679f6ba8d" FOREIGN KEY ("auction_id") REFERENCES "auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "bid" ADD CONSTRAINT "FK_3caf2d6b31d2fe45a2b85b81912" FOREIGN KEY ("nft_id") REFERENCES "owned_nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "bid" ADD CONSTRAINT "FK_e7618559409a903a897164156b7" FOREIGN KEY ("bidder_id") REFERENCES "membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "bid" ADD CONSTRAINT "FK_32cb73025ec49c87f4c594a265f" FOREIGN KEY ("previous_top_bid_id") REFERENCES "bid"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "auction" ADD CONSTRAINT "FK_cfb47e97e60c9d1462576f85a88" FOREIGN KEY ("nft_id") REFERENCES "owned_nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "auction" ADD CONSTRAINT "FK_a3127ec87cccc5696b92cac4e09" FOREIGN KEY ("winning_member_id") REFERENCES "membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "auction" ADD CONSTRAINT "FK_1673ad4b059742fbabfc40b275c" FOREIGN KEY ("top_bid_id") REFERENCES "bid"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "auction_whitelisted_member" ADD CONSTRAINT "FK_aad797677bc7c7c7dc1f1d397f5" FOREIGN KEY ("auction_id") REFERENCES "auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "auction_whitelisted_member" ADD CONSTRAINT "FK_d5ae4854487c7658b64225be305" FOREIGN KEY ("member_id") REFERENCES "membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "node_location_metadata" ADD CONSTRAINT "FK_64eff87e0881036a6eddaf0a16d" FOREIGN KEY ("coordinates_id") REFERENCES "geo_coordinates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "storage_bucket_operator_metadata" ADD CONSTRAINT "FK_a5e5d1b3ba2d54acbc3bde3871d" FOREIGN KEY ("node_location_id") REFERENCES "node_location_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "storage_bucket" ADD CONSTRAINT "FK_9846a397400ae1a39b21fbd02d4" FOREIGN KEY ("operator_metadata_id") REFERENCES "storage_bucket_operator_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "storage_bucket_bag" ADD CONSTRAINT "FK_791e2f82e3919ffcef8712aa1b9" FOREIGN KEY ("storage_bucket_id") REFERENCES "storage_bucket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "storage_bucket_bag" ADD CONSTRAINT "FK_aaf00b2c7d0cba49f97da14fbba" FOREIGN KEY ("bag_id") REFERENCES "storage_bag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_family_geographic_area" ADD CONSTRAINT "FK_166a68620f988fb3a3ffe075c69" FOREIGN KEY ("distribution_bucket_family_metadata_id") REFERENCES "distribution_bucket_family_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_family" ADD CONSTRAINT "FK_df7a270835bb313d3ef17bdee2f" FOREIGN KEY ("metadata_id") REFERENCES "distribution_bucket_family_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_operator_metadata" ADD CONSTRAINT "FK_b28a85d2356321236602a631c6f" FOREIGN KEY ("node_location_id") REFERENCES "node_location_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_operator" ADD CONSTRAINT "FK_678dc5427cdde0cd4fef2c07a43" FOREIGN KEY ("distribution_bucket_id") REFERENCES "distribution_bucket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_operator" ADD CONSTRAINT "FK_9bbecaa12f30e3826922688274f" FOREIGN KEY ("metadata_id") REFERENCES "distribution_bucket_operator_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket" ADD CONSTRAINT "FK_8cb7454d1ec34b0d3bb7ecdee4e" FOREIGN KEY ("family_id") REFERENCES "distribution_bucket_family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_bag" ADD CONSTRAINT "FK_8a807921f1aae60d4ba94895826" FOREIGN KEY ("distribution_bucket_id") REFERENCES "distribution_bucket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_bag" ADD CONSTRAINT "FK_a9810100aee7584680f197c8ff0" FOREIGN KEY ("bag_id") REFERENCES "storage_bag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "storage_data_object" ADD CONSTRAINT "FK_ff8014300b8039dbaed764f51bc" FOREIGN KEY ("storage_bag_id") REFERENCES "storage_bag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "channel_follow" ADD CONSTRAINT "FK_9bc0651dda94437ec18764a2601" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "channel_follow" ADD CONSTRAINT "FK_822778b4b1ea8e3b60b127cb8b1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_view_event" ADD CONSTRAINT "FK_2e29fba63e12a2b1818e0782d78" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_view_event" ADD CONSTRAINT "FK_8f7f6822bdffeccb2ece9451205" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "channel" ADD CONSTRAINT "FK_25c85bc448b5e236a4c1a5f7895" FOREIGN KEY ("owner_member_id") REFERENCES "membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "channel" ADD CONSTRAINT "FK_a77e12f3d8c6ced020e179a5e94" FOREIGN KEY ("cover_photo_id") REFERENCES "storage_data_object"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "channel" ADD CONSTRAINT "FK_6997e94413b3f2f25a84e4a96f8" FOREIGN KEY ("avatar_photo_id") REFERENCES "storage_data_object"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_featured_in_category" ADD CONSTRAINT "FK_7b16ddad43901921a8d3c8eab71" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_featured_in_category" ADD CONSTRAINT "FK_0e6bb49ce9d022cd872f3ab4288" FOREIGN KEY ("category_id") REFERENCES "video_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_category" ADD CONSTRAINT "FK_da26b34f037c0d59d3c0d0646e9" FOREIGN KEY ("parent_category_id") REFERENCES "video_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_media_metadata" ADD CONSTRAINT "FK_5944dc5896cb16bd395414a0ce0" FOREIGN KEY ("encoding_id") REFERENCES "video_media_encoding"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_media_metadata" ADD CONSTRAINT "FK_4dc101240e8e1536b770aee202a" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_subtitle" ADD CONSTRAINT "FK_2203674f18d8052ed6bac396252" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_subtitle" ADD CONSTRAINT "FK_b6eabfb8de4128b28d73681020f" FOREIGN KEY ("asset_id") REFERENCES "storage_data_object"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "comment_reaction" ADD CONSTRAINT "FK_15080d9fb7cf8b563103dd9d900" FOREIGN KEY ("member_id") REFERENCES "membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "comment_reaction" ADD CONSTRAINT "FK_962582f04d3f639e33f43c54bbc" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "comment_reaction" ADD CONSTRAINT "FK_d7995b1d57614a6fbd0c103874d" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "comment_reactions_count_by_reaction_id" ADD CONSTRAINT "FK_984ad0c3a11b9073049d0957038" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "comment_reactions_count_by_reaction_id" ADD CONSTRAINT "FK_c15bc80a05171d471345832efe4" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_3ce66469b26697baa097f8da923" FOREIGN KEY ("author_id") REFERENCES "membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_1ff03403fd31dfeaba0623a89cf" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_ac69bddf8202b7c0752d9dc8f32" FOREIGN KEY ("parent_comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_reaction" ADD CONSTRAINT "FK_73dda64f53bbc7ec7035d5e7f09" FOREIGN KEY ("member_id") REFERENCES "membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_reaction" ADD CONSTRAINT "FK_436a3836eb47acb5e1e3c88ddea" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_reactions_count_by_reaction_type" ADD CONSTRAINT "FK_6126405f4d28d8f4dc636fbd11e" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_81b11ef99a9db9ef1aed040d750" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_2a5c61f32e9636ee10821e9a58d" FOREIGN KEY ("category_id") REFERENCES "video_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_8530d052cc79b420f7ce2b4e09d" FOREIGN KEY ("thumbnail_photo_id") REFERENCES "storage_data_object"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_3ec633ae5d0477f512b4ed957d6" FOREIGN KEY ("license_id") REFERENCES "license"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_2db879ed42e3308fe65e6796729" FOREIGN KEY ("media_id") REFERENCES "storage_data_object"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_54f88a7decf7d22fd9bd9fa439a" FOREIGN KEY ("pinned_comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "owned_nft" ADD CONSTRAINT "FK_466896e39b9ec953f4f2545622d" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "video_hero" ADD CONSTRAINT "FK_9feac5d9713a9f07e32eb8ba7a1" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  async down(db) {
    await db.query(`DROP TABLE "member_metadata"`)
    await db.query(`DROP INDEX "public"."IDX_e7e4d350f82ae2383894f465ed"`)
    await db.query(`DROP TABLE "bid"`)
    await db.query(`DROP INDEX "public"."IDX_9e594e5a61c0f3cb25679f6ba8"`)
    await db.query(`DROP INDEX "public"."IDX_3caf2d6b31d2fe45a2b85b8191"`)
    await db.query(`DROP INDEX "public"."IDX_e7618559409a903a897164156b"`)
    await db.query(`DROP INDEX "public"."IDX_32cb73025ec49c87f4c594a265"`)
    await db.query(`DROP TABLE "auction"`)
    await db.query(`DROP INDEX "public"."IDX_cfb47e97e60c9d1462576f85a8"`)
    await db.query(`DROP INDEX "public"."IDX_a3127ec87cccc5696b92cac4e0"`)
    await db.query(`DROP INDEX "public"."IDX_1673ad4b059742fbabfc40b275"`)
    await db.query(`DROP TABLE "auction_whitelisted_member"`)
    await db.query(`DROP INDEX "public"."IDX_d5ae4854487c7658b64225be30"`)
    await db.query(`DROP INDEX "public"."IDX_5468573a96fa51c03743de5912"`)
    await db.query(`DROP TABLE "membership"`)
    await db.query(`DROP INDEX "public"."IDX_1298811c0de5f11198fd43df72"`)
    await db.query(`DROP TABLE "geo_coordinates"`)
    await db.query(`DROP TABLE "node_location_metadata"`)
    await db.query(`DROP INDEX "public"."IDX_64eff87e0881036a6eddaf0a16"`)
    await db.query(`DROP TABLE "storage_bucket_operator_metadata"`)
    await db.query(`DROP INDEX "public"."IDX_a5e5d1b3ba2d54acbc3bde3871"`)
    await db.query(`DROP TABLE "storage_bucket"`)
    await db.query(`DROP INDEX "public"."IDX_9846a397400ae1a39b21fbd02d"`)
    await db.query(`DROP TABLE "storage_bucket_bag"`)
    await db.query(`DROP INDEX "public"."IDX_aaf00b2c7d0cba49f97da14fbb"`)
    await db.query(`DROP INDEX "public"."IDX_4c475f6c9300284b095859eec3"`)
    await db.query(`DROP TABLE "distribution_bucket_family_geographic_area"`)
    await db.query(`DROP INDEX "public"."IDX_166a68620f988fb3a3ffe075c6"`)
    await db.query(`DROP TABLE "distribution_bucket_family_metadata"`)
    await db.query(`DROP INDEX "public"."IDX_5510d3b244a63d6ec702faa426"`)
    await db.query(`DROP TABLE "distribution_bucket_family"`)
    await db.query(`DROP INDEX "public"."IDX_df7a270835bb313d3ef17bdee2"`)
    await db.query(`DROP TABLE "distribution_bucket_operator_metadata"`)
    await db.query(`DROP INDEX "public"."IDX_b28a85d2356321236602a631c6"`)
    await db.query(`DROP TABLE "distribution_bucket_operator"`)
    await db.query(`DROP INDEX "public"."IDX_678dc5427cdde0cd4fef2c07a4"`)
    await db.query(`DROP INDEX "public"."IDX_9bbecaa12f30e3826922688274"`)
    await db.query(`DROP TABLE "distribution_bucket"`)
    await db.query(`DROP INDEX "public"."IDX_8cb7454d1ec34b0d3bb7ecdee4"`)
    await db.query(`DROP TABLE "distribution_bucket_bag"`)
    await db.query(`DROP INDEX "public"."IDX_a9810100aee7584680f197c8ff"`)
    await db.query(`DROP INDEX "public"."IDX_32e552d352848d64ab82d38e9a"`)
    await db.query(`DROP TABLE "storage_bag"`)
    await db.query(`DROP TABLE "storage_data_object"`)
    await db.query(`DROP INDEX "public"."IDX_ff8014300b8039dbaed764f51b"`)
    await db.query(`DROP TABLE "user"`)
    await db.query(`DROP TABLE "channel_follow"`)
    await db.query(`DROP INDEX "public"."IDX_9bc0651dda94437ec18764a260"`)
    await db.query(`DROP INDEX "public"."IDX_822778b4b1ea8e3b60b127cb8b"`)
    await db.query(`DROP TABLE "video_view_event"`)
    await db.query(`DROP INDEX "public"."IDX_2e29fba63e12a2b1818e0782d7"`)
    await db.query(`DROP INDEX "public"."IDX_8f7f6822bdffeccb2ece945120"`)
    await db.query(`DROP TABLE "channel"`)
    await db.query(`DROP INDEX "public"."IDX_25c85bc448b5e236a4c1a5f789"`)
    await db.query(`DROP INDEX "public"."IDX_a77e12f3d8c6ced020e179a5e9"`)
    await db.query(`DROP INDEX "public"."IDX_6997e94413b3f2f25a84e4a96f"`)
    await db.query(`DROP INDEX "public"."IDX_e58a2e1d78b8eccf40531a7fdb"`)
    await db.query(`DROP TABLE "video_featured_in_category"`)
    await db.query(`DROP INDEX "public"."IDX_7b16ddad43901921a8d3c8eab7"`)
    await db.query(`DROP INDEX "public"."IDX_6d0917e1ac0cc06c8075bcf256"`)
    await db.query(`DROP TABLE "video_category"`)
    await db.query(`DROP INDEX "public"."IDX_cbe7e5d162a819e4ee2e2f6105"`)
    await db.query(`DROP INDEX "public"."IDX_da26b34f037c0d59d3c0d0646e"`)
    await db.query(`DROP TABLE "license"`)
    await db.query(`DROP TABLE "video_media_encoding"`)
    await db.query(`DROP TABLE "video_media_metadata"`)
    await db.query(`DROP INDEX "public"."IDX_5944dc5896cb16bd395414a0ce"`)
    await db.query(`DROP INDEX "public"."IDX_4dc101240e8e1536b770aee202"`)
    await db.query(`DROP TABLE "video_subtitle"`)
    await db.query(`DROP INDEX "public"."IDX_2203674f18d8052ed6bac39625"`)
    await db.query(`DROP INDEX "public"."IDX_ffa63c28188eecc32af921bfc3"`)
    await db.query(`DROP INDEX "public"."IDX_b6eabfb8de4128b28d73681020"`)
    await db.query(`DROP TABLE "comment_reaction"`)
    await db.query(`DROP INDEX "public"."IDX_15080d9fb7cf8b563103dd9d90"`)
    await db.query(`DROP INDEX "public"."IDX_962582f04d3f639e33f43c54bb"`)
    await db.query(`DROP INDEX "public"."IDX_d7995b1d57614a6fbd0c103874"`)
    await db.query(`DROP TABLE "comment_reactions_count_by_reaction_id"`)
    await db.query(`DROP INDEX "public"."IDX_984ad0c3a11b9073049d095703"`)
    await db.query(`DROP INDEX "public"."IDX_c15bc80a05171d471345832efe"`)
    await db.query(`DROP TABLE "comment"`)
    await db.query(`DROP INDEX "public"."IDX_3ce66469b26697baa097f8da92"`)
    await db.query(`DROP INDEX "public"."IDX_1ff03403fd31dfeaba0623a89c"`)
    await db.query(`DROP INDEX "public"."IDX_c3c2abe750c76c7c8e305f71f2"`)
    await db.query(`DROP INDEX "public"."IDX_ac69bddf8202b7c0752d9dc8f3"`)
    await db.query(`DROP TABLE "video_reaction"`)
    await db.query(`DROP INDEX "public"."IDX_73dda64f53bbc7ec7035d5e7f0"`)
    await db.query(`DROP INDEX "public"."IDX_436a3836eb47acb5e1e3c88dde"`)
    await db.query(`DROP TABLE "video_reactions_count_by_reaction_type"`)
    await db.query(`DROP INDEX "public"."IDX_6126405f4d28d8f4dc636fbd11"`)
    await db.query(`DROP TABLE "video"`)
    await db.query(`DROP INDEX "public"."IDX_81b11ef99a9db9ef1aed040d75"`)
    await db.query(`DROP INDEX "public"."IDX_2a5c61f32e9636ee10821e9a58"`)
    await db.query(`DROP INDEX "public"."IDX_8530d052cc79b420f7ce2b4e09"`)
    await db.query(`DROP INDEX "public"."IDX_75fbab42a4cb18371b6d5004b0"`)
    await db.query(`DROP INDEX "public"."IDX_3ec633ae5d0477f512b4ed957d"`)
    await db.query(`DROP INDEX "public"."IDX_2db879ed42e3308fe65e679672"`)
    await db.query(`DROP INDEX "public"."IDX_54f88a7decf7d22fd9bd9fa439"`)
    await db.query(`DROP TABLE "owned_nft"`)
    await db.query(`DROP INDEX "public"."IDX_466896e39b9ec953f4f2545622"`)
    await db.query(`DROP TABLE "curator_group"`)
    await db.query(`DROP TABLE "curator"`)
    await db.query(`DROP TABLE "event"`)
    await db.query(`DROP TABLE "video_hero"`)
    await db.query(`DROP INDEX "public"."IDX_9feac5d9713a9f07e32eb8ba7a"`)
    await db.query(`ALTER TABLE "member_metadata" DROP CONSTRAINT "FK_e7e4d350f82ae2383894f465ede"`)
    await db.query(`ALTER TABLE "bid" DROP CONSTRAINT "FK_9e594e5a61c0f3cb25679f6ba8d"`)
    await db.query(`ALTER TABLE "bid" DROP CONSTRAINT "FK_3caf2d6b31d2fe45a2b85b81912"`)
    await db.query(`ALTER TABLE "bid" DROP CONSTRAINT "FK_e7618559409a903a897164156b7"`)
    await db.query(`ALTER TABLE "bid" DROP CONSTRAINT "FK_32cb73025ec49c87f4c594a265f"`)
    await db.query(`ALTER TABLE "auction" DROP CONSTRAINT "FK_cfb47e97e60c9d1462576f85a88"`)
    await db.query(`ALTER TABLE "auction" DROP CONSTRAINT "FK_a3127ec87cccc5696b92cac4e09"`)
    await db.query(`ALTER TABLE "auction" DROP CONSTRAINT "FK_1673ad4b059742fbabfc40b275c"`)
    await db.query(
      `ALTER TABLE "auction_whitelisted_member" DROP CONSTRAINT "FK_aad797677bc7c7c7dc1f1d397f5"`
    )
    await db.query(
      `ALTER TABLE "auction_whitelisted_member" DROP CONSTRAINT "FK_d5ae4854487c7658b64225be305"`
    )
    await db.query(
      `ALTER TABLE "node_location_metadata" DROP CONSTRAINT "FK_64eff87e0881036a6eddaf0a16d"`
    )
    await db.query(
      `ALTER TABLE "storage_bucket_operator_metadata" DROP CONSTRAINT "FK_a5e5d1b3ba2d54acbc3bde3871d"`
    )
    await db.query(`ALTER TABLE "storage_bucket" DROP CONSTRAINT "FK_9846a397400ae1a39b21fbd02d4"`)
    await db.query(
      `ALTER TABLE "storage_bucket_bag" DROP CONSTRAINT "FK_791e2f82e3919ffcef8712aa1b9"`
    )
    await db.query(
      `ALTER TABLE "storage_bucket_bag" DROP CONSTRAINT "FK_aaf00b2c7d0cba49f97da14fbba"`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_family_geographic_area" DROP CONSTRAINT "FK_166a68620f988fb3a3ffe075c69"`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_family" DROP CONSTRAINT "FK_df7a270835bb313d3ef17bdee2f"`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_operator_metadata" DROP CONSTRAINT "FK_b28a85d2356321236602a631c6f"`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_operator" DROP CONSTRAINT "FK_678dc5427cdde0cd4fef2c07a43"`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_operator" DROP CONSTRAINT "FK_9bbecaa12f30e3826922688274f"`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket" DROP CONSTRAINT "FK_8cb7454d1ec34b0d3bb7ecdee4e"`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_bag" DROP CONSTRAINT "FK_8a807921f1aae60d4ba94895826"`
    )
    await db.query(
      `ALTER TABLE "distribution_bucket_bag" DROP CONSTRAINT "FK_a9810100aee7584680f197c8ff0"`
    )
    await db.query(
      `ALTER TABLE "storage_data_object" DROP CONSTRAINT "FK_ff8014300b8039dbaed764f51bc"`
    )
    await db.query(`ALTER TABLE "channel_follow" DROP CONSTRAINT "FK_9bc0651dda94437ec18764a2601"`)
    await db.query(`ALTER TABLE "channel_follow" DROP CONSTRAINT "FK_822778b4b1ea8e3b60b127cb8b1"`)
    await db.query(
      `ALTER TABLE "video_view_event" DROP CONSTRAINT "FK_2e29fba63e12a2b1818e0782d78"`
    )
    await db.query(
      `ALTER TABLE "video_view_event" DROP CONSTRAINT "FK_8f7f6822bdffeccb2ece9451205"`
    )
    await db.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_25c85bc448b5e236a4c1a5f7895"`)
    await db.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_a77e12f3d8c6ced020e179a5e94"`)
    await db.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_6997e94413b3f2f25a84e4a96f8"`)
    await db.query(
      `ALTER TABLE "video_featured_in_category" DROP CONSTRAINT "FK_7b16ddad43901921a8d3c8eab71"`
    )
    await db.query(
      `ALTER TABLE "video_featured_in_category" DROP CONSTRAINT "FK_0e6bb49ce9d022cd872f3ab4288"`
    )
    await db.query(`ALTER TABLE "video_category" DROP CONSTRAINT "FK_da26b34f037c0d59d3c0d0646e9"`)
    await db.query(
      `ALTER TABLE "video_media_metadata" DROP CONSTRAINT "FK_5944dc5896cb16bd395414a0ce0"`
    )
    await db.query(
      `ALTER TABLE "video_media_metadata" DROP CONSTRAINT "FK_4dc101240e8e1536b770aee202a"`
    )
    await db.query(`ALTER TABLE "video_subtitle" DROP CONSTRAINT "FK_2203674f18d8052ed6bac396252"`)
    await db.query(`ALTER TABLE "video_subtitle" DROP CONSTRAINT "FK_b6eabfb8de4128b28d73681020f"`)
    await db.query(
      `ALTER TABLE "comment_reaction" DROP CONSTRAINT "FK_15080d9fb7cf8b563103dd9d900"`
    )
    await db.query(
      `ALTER TABLE "comment_reaction" DROP CONSTRAINT "FK_962582f04d3f639e33f43c54bbc"`
    )
    await db.query(
      `ALTER TABLE "comment_reaction" DROP CONSTRAINT "FK_d7995b1d57614a6fbd0c103874d"`
    )
    await db.query(
      `ALTER TABLE "comment_reactions_count_by_reaction_id" DROP CONSTRAINT "FK_984ad0c3a11b9073049d0957038"`
    )
    await db.query(
      `ALTER TABLE "comment_reactions_count_by_reaction_id" DROP CONSTRAINT "FK_c15bc80a05171d471345832efe4"`
    )
    await db.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_3ce66469b26697baa097f8da923"`)
    await db.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_1ff03403fd31dfeaba0623a89cf"`)
    await db.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_ac69bddf8202b7c0752d9dc8f32"`)
    await db.query(`ALTER TABLE "video_reaction" DROP CONSTRAINT "FK_73dda64f53bbc7ec7035d5e7f09"`)
    await db.query(`ALTER TABLE "video_reaction" DROP CONSTRAINT "FK_436a3836eb47acb5e1e3c88ddea"`)
    await db.query(
      `ALTER TABLE "video_reactions_count_by_reaction_type" DROP CONSTRAINT "FK_6126405f4d28d8f4dc636fbd11e"`
    )
    await db.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_81b11ef99a9db9ef1aed040d750"`)
    await db.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_2a5c61f32e9636ee10821e9a58d"`)
    await db.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_8530d052cc79b420f7ce2b4e09d"`)
    await db.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_3ec633ae5d0477f512b4ed957d6"`)
    await db.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_2db879ed42e3308fe65e6796729"`)
    await db.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_54f88a7decf7d22fd9bd9fa439a"`)
    await db.query(`ALTER TABLE "owned_nft" DROP CONSTRAINT "FK_466896e39b9ec953f4f2545622d"`)
    await db.query(`ALTER TABLE "video_hero" DROP CONSTRAINT "FK_9feac5d9713a9f07e32eb8ba7a1"`)
  }
}
