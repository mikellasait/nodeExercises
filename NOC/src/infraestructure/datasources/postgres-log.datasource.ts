import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level: severityEnum[log.level],
      },
    });
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    const logs = await prisma.logModel.findMany({
      where: {
        level,
      },
    });

    return logs.map((log) => LogEntity.fromObject(log));
  }
}
