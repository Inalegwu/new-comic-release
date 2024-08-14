import { integer, sqliteTable, uniqueIndex } from "drizzle-orm/sqlite-core";

export const release = sqliteTable(
  "release",
  {
    releaseDate: integer("release-date", {
      mode: "timestamp",
    }).unique(),
  },
  (table) => ({
    releaseDateIndex: uniqueIndex("release-date-index").on(table.releaseDate),
  }),
);
