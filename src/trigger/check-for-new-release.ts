import { schedules } from "@trigger.dev/sdk/v3";
import { main } from "../index";

export const checkForNewRelease = schedules.task({
  id: "check-for-new-release",
  cron: "0 0 * * *",
  run: async () => main("https://comixnow.com/category/dc-weekly/"),
});
