import { relations } from "drizzle-orm";
import { date, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";

export const releases = pgTable(
  "release",
  {
    id: text("id").unique().notNull().primaryKey(),
    releaseDate: date("release-date").unique(),
    name: text("name"),
    url: text("url"),
  },
  (table) => ({
    idIdx: uniqueIndex("release-id-idx").on(table.id),
    releaseDateIndex: uniqueIndex("release-date-index").on(table.releaseDate),
  }),
);

export const issues = pgTable(
  "issue",
  {
    id: text("id").unique().notNull().primaryKey(),
    title: text("title"),
    date: date("date"),
    releaseId: text("release-id").references(() => releases.id),
  },
  (t) => ({
    idIdx: uniqueIndex("id_index").on(t.id),
  }),
);

export const releaseIssueRelation = relations(releases, ({ many }) => ({
  issues: many(issues),
}));

export const issueReleaseRelation = relations(issues, ({ one }) => ({
  release: one(releases, {
    fields: [issues.releaseId],
    references: [releases.id],
  }),
}));
