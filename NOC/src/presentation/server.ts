import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
  static start() {
    console.log("Server started...");

    const url = "http://localhost:3000";

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        fileSystemRepository,
        undefined, // () => console.log(`${url} is OK`),
        undefined // (error) => console.log(error)
      ).execute(url);
    });
  }
}
