import { schedules } from "@trigger.dev/sdk/v3";
import { main } from "../index";

export const checkForNewRelease = schedules.task({
  id: "check-for-new-release",
  cron: "0 */2 * * 4",
  run: async () => {
    const result = await main("https://comixnow.com/category/dc-weekly/");

    result?.match((ok) => {
      console.log(ok);
    }, console.log);
  },
});
