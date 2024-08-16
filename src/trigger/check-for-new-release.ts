import { schedules } from "@trigger.dev/sdk/v3";
import { main } from "../index";

export const checkForNewRelease = schedules.task({
  id: "check-for-new-release",
  cron: "0 0 * * 4",
  run: async () => await main("https://comixnow.com/category/dc-weekly/"),
});
