// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { pgTableCreator, timestamp, varchar } from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `dumscroll_${name}`);

export const users = createTable("user", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  customerId: varchar("customer_id", { length: 256 })
    .notNull()
    .$defaultFn(() => uuid()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
});
