CREATE TABLE IF NOT EXISTS "dumscroll_payment_histories" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"payment_data" jsonb,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dumscroll_tracks" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"url" varchar NOT NULL,
	"duration" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dumscroll_user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"license_key" varchar(256) NOT NULL,
	"subscription_id" text,
	"customer_id" text,
	"subscription_status" text,
	"subscription_plan_id" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dumscroll_waitlist" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "dumscroll_waitlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dumscroll_payment_histories" ADD CONSTRAINT "dumscroll_payment_histories_user_id_dumscroll_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dumscroll_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dumscroll_tracks" ADD CONSTRAINT "dumscroll_tracks_user_id_dumscroll_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dumscroll_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "license_key_idx" ON "dumscroll_user" ("license_key");