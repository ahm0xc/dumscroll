// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { v4 as uuid } from "uuid";
import type { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `dumscroll_${name}`);

export const users = createTable(
  "user",
  {
    id: varchar("id").primaryKey().notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    licenseKey: varchar("license_key", { length: 256 })
      .notNull()
      .$defaultFn(() => uuid()),

    // paddle
    subscriptionId: text("subscription_id"),
    customerId: text("customer_id"),
    subscriptionStatus: text("subscription_status"),
    subscriptionPlanId: text("subscription_plan_id"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      licenseKeyIdx: index("license_key_idx").on(table.licenseKey),
    };
  },
);

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type User = z.infer<typeof selectUserSchema>;

export const usersRelations = relations(users, ({ many }) => ({
  tracks: many(tracks),
}));

export const tracks = createTable("tracks", {
  id: varchar("id").primaryKey().notNull(), // this will be the date like YYYY-MM-DD followed by their userID e.g. 2024-11-25#user_789asf98sf
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  url: varchar("url").notNull(), // this will be the origin (e.g. https://facebook.com)
  duration: integer("duration").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
});

export const insertTrackSchema = createInsertSchema(tracks);
export const selectTrackSchema = createSelectSchema(tracks);
export type Track = z.infer<typeof selectTrackSchema>;

export const tracksRelations = relations(tracks, ({ one }) => ({
  user: one(users, {
    fields: [tracks.userId],
    references: [users.id],
  }),
}));

export const paymentHistories = createTable("payment_histories", {
  id: varchar("id").primaryKey().notNull().$defaultFn(uuid),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),

  data: jsonb("payment_data"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const waitlists = createTable("waitlist", {
  id: varchar("id").primaryKey().notNull().$defaultFn(uuid),
  email: varchar("email").unique().notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});
