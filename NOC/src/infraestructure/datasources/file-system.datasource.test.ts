import path from "path";
import fs from "fs";
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("file system datasource", () => {
  const logPath = path.join(__dirname, "../../../logs");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they dont exists ", () => {
    new FileSystemDatasource();

    const files = fs.readdirSync(logPath);
    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test("should save log in all logs file", () => {
    const logDatasource = new FileSystemDatasource();

    const log = new LogEntity(LogSeverityLevel.low, "asdsda", "fyle-system datasource tests");
    logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should save log in all logs file and medium", () => {
    const logDatasource = new FileSystemDatasource();

    const log = new LogEntity(LogSeverityLevel.medium, "asdsda", "fyle-system datasource tests");
    logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");
    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test("should save log in all logs file and high", () => {
    const logDatasource = new FileSystemDatasource();

    const log = new LogEntity(LogSeverityLevel.high, "asdsda", "fyle-system datasource tests");
    logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");
    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test("should return all logs", async () => {
    const logDatasource = new FileSystemDatasource();
    const highLog = new LogEntity(LogSeverityLevel.high, "asdsdsa", "fyle-system datasource tests");
    const mediumLog = new LogEntity(LogSeverityLevel.medium, "asdesda", "fyle-system datasource tests");
    const lowLog = new LogEntity(LogSeverityLevel.low, "asdcvsda", "fyle-system datasource tests");

    await logDatasource.saveLog(highLog);
    await logDatasource.saveLog(mediumLog);
    await logDatasource.saveLog(lowLog);

    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);

    expect(logsLow).toEqual(expect.arrayContaining([lowLog, mediumLog, highLog]));
    expect(logsMedium).toEqual(expect.arrayContaining([mediumLog]));
    expect(logsHigh).toEqual(expect.arrayContaining([highLog]));
  });

  test("should not throw an error if path exists", () => {
    new FileSystemDatasource();
    new FileSystemDatasource();

    expect(true).toBeTruthy();
  });

  test("should throw an error if severity level is no implemented in get logs", async () => {
    const logDatasource = new FileSystemDatasource();

    try {
      await logDatasource.getLogs("ejemplo" as LogSeverityLevel);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(true).toBeTruthy;
    }
  });
});
