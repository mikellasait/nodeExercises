import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("LogEntity", () => {
  const logObj = {
    level: LogSeverityLevel.high,
    message: "sdfsd",
    origin: "log.entity.test",
  };

  test("should create a LogEntity instance", () => {
    const log = new LogEntity(logObj.level, logObj.message, logObj.origin);

    expect(log).toBeInstanceOf(LogEntity);

    expect(log.message).toBe(logObj.message);
    expect(log.level).toBe(LogSeverityLevel.high);
    expect(log.origin).toBe(logObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should return logEntity instance from json", () => {
    const json = JSON.stringify(logObj);

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(logObj.message);
    expect(log.level).toBe(logObj.level);
    expect(log.origin).toBe(logObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should return logEntity instance from object", () => {
    const log = LogEntity.fromObject(logObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(logObj.message);
    expect(log.level).toBe(logObj.level);
    expect(log.origin).toBe(logObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
