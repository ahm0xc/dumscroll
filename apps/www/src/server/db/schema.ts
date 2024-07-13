// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { index, integer, pgTableCreator, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";

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
    customerId: varchar("customer_id", { length: 256 })
      .notNull()
      .$defaultFn(() => uuid()),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      customerIdIdx: index("customer_id_idx").on(table.customerId),
    };
  },
);

export const usersRelations = relations(users, ({ many }) => ({
  tracks: many(tracks),
}));

export const tracks = createTable("tracks", {
  id: varchar("id").primaryKey().notNull(), // this will be the date like YYYY-MM-DD followed by their userID e.g. 2024-11-25#user_789asf98sf
  userId: varchar("user_id").notNull(),
  youtubeDuration: integer("youtube_duration").default(0), // in seconds
  facebookDuration: integer("facebook_duration").default(0),
  instagramDuration: integer("instagram_duration").default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
});

export const tracksRelations = relations(tracks, ({ one }) => ({
  user: one(users, {
    fields: [tracks.userId],
    references: [users.id],
  }),
}));
