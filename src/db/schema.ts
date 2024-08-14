import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const release = sqliteTable(
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

export const comingSoon = sqliteTable(
  "coming-soon",
  {
    id: text("id").unique().notNull(),
    releaseDate: integer("release-date", {
      mode: "timestamp",
    }),
    url: text("url"),
  },
  (t) => ({
    releaseDateIndex: uniqueIndex("release-date-index").on(t.releaseDate),
    idIndex: uniqueIndex("id-idx").on(t.id),
  }),
);
