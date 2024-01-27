import { EmailService } from "./email/email.service";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource());

const emailService = new EmailService();

export class Server {
  static start() {
    console.log("Server started...");

    new SendEmailLogs(emailService, fileSystemRepository).execute(["asdaasd@fsdaddsa", "asdasdsa@dsffsd"]);

    // const url = "http://google.es";

    // CronService.createJob("*/5 * * * * *", () => {
    //   new CheckService(
    //     fileSystemRepository,
    //     undefined, // () => console.log(`${url} is OK`),
    //     undefined // (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
