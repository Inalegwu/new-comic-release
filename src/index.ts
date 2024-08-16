import axios from "axios";
import { load } from "cheerio";
import { v4 } from "uuid";
import { db } from "./db";
import { issues, releases } from "./db/schema";

type Data = {
  title: string;
  href: string;
  date: string;
  isNew: boolean;
  timestamp: number;
};

const parseData = async (data: Data[]) => {
  for (const article of data) {
    console.log(`parsing ${article.title}`);
    if (!article.isNew) return;

    const exists = await db.query.releases.findFirst({
      where: (release, { eq }) => eq(release.releaseDate, article.date),
      with: {
        issues: true,
      },
    });

    if (exists) {
      console.log(`${exists.name} is already saved`);
      process.exit();
    }

    const page = await axios.get(article.href);

    const $ = load(page.data);
    const body = $("div.tdb-block-inner").find("p");

    const regexOld = /\w+(?: \w+)* \#\d+/g;
    const regex = /[\w\s&]+ \#\d+/g;

    const text = body.text();
    const parsed = text
      .split("\n")
      .map((v) => v.trim())
      .join("\n")
      .match(regex)
      ?.map((v) => v.trim());

    if (parsed === undefined) return;

    const rel = await db
      .insert(releases)
      .values({
        id: v4(),
        releaseDate: article.date,
        url: article.href,
        name: article.date,
      })
      .returning({
        id: releases.id,
        releaseDate: releases.releaseDate,
        name: releases.name,
      })
      .execute();

    console.log(`Saved release : ${rel[0].name}`);

    console.log(`Attempting to add issues to ${rel[0].name}`);
    for (const p of parsed) {
      console.log(`Attempting to save ${p}`);
      const added = await db
        .insert(issues)
        .values({
          id: v4(),
          title: p,
          date: rel[0].releaseDate,
          releaseId: rel[0].id,
        })
        .returning({
          id: issues.id,
          title: issues.title,
        })
        .execute();
      console.log(`Saved ${added[0].title}`);
    }
    process.exit();
  }
};

export const main = async (url: string) => {
  console.log(`Directing worker to ${url}`);
  const data: Data[] = [];
  const page = await axios.get(url);

  console.log("loading page");
  const $ = load(page.data);

  const posts = $("div.tdb_module_loop").find("a");

  posts.each((id, el) => {
    const href = $(el).attr("href");
    const title = $(el).text();

    // console.log({ href, title });

    if (href === "" || title === "" || href === undefined) return;

    if (title.split(":").length < 2) return;

    const date = title.match(/\b((\w{3,9})\s+\d{1,2},\s+\d{4})\b/)?.[0];
    const timestamp = Date.parse(date!);
    const isNew = Date.now() <= timestamp;

    const meta = {
      title,
      href,
      date: date!,
      isNew,
      timestamp,
    };

    console.log(`adding ${meta.title} to data list \n`);

    data.push(meta);
  });

  console.log("attempting to parse and save data");
  parseData(data);
};

main("https://comixnow.com/category/dc-weekly/");
