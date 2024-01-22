import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";

export class Server {
  static start() {
    console.log("Server started...");

    const url = "http://google.com";

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        () => console.log(`${url} is OK`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
