import { relations } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const releases = sqliteTable(
  "release",
  {
    id: text("id").unique().notNull(),
    releaseDate: integer("release-date", {
      mode: "timestamp",
    }).unique(),
    url: text("url"),
  },
  (table) => ({
    releaseDateIndex: uniqueIndex("release-date-index").on(table.releaseDate),
  }),
);

export const issues = sqliteTable("issue", {
  id: text("id").unique().notNull(),
  title: text("title"),
  date: integer("date", {
    mode: "timestamp",
  }),
  releaseId: text("release-id").references(() => releases.id),
});

export const releaseIssueRelation = relations(releases, ({ many }) => ({
  issues: many(issues),
}));

export const issueReleaseRelation = relations(issues, ({ one }) => ({
  release: one(releases, {
    fields: [issues.releaseId],
    references: [releases.id],
  }),
}));
