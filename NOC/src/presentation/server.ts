import { EmailService } from "./email/email.service";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresDataSource } from "../infraestructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgresLogRepository = new LogRepositoryImpl(new PostgresDataSource());
// const emailService = new EmailService();

export class Server {
  static start() {
    console.log("Server started...");

    // new SendEmailLogs(emailService, fileSystemRepository).execute(["asdaasd@fsdaddsa", "asdasdsa@dsffsd"]);

    //

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://google.es";
      new CheckServiceMultiple(
        [fileSystemRepository, mongoLogRepository, postgresLogRepository],
        undefined, // () => console.log(`${url} is OK`),
        undefined // (error) => console.log(error)
      ).execute(url);
    });
  }
}
