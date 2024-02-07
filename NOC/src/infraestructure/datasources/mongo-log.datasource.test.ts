import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDataSource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("mongologdatasource", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  const logDatasource = new MongoLogDataSource();

  const log = new LogEntity(LogSeverityLevel.high, "asas", "mongo-log-datasource");

  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await logDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalledWith("Created", expect.any(String));
  });

  test("should get array of logs from database", async () => {
    await logDatasource.saveLog(log);

    const logs = await logDatasource.getLogs(LogSeverityLevel.high);

    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogSeverityLevel.high);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
