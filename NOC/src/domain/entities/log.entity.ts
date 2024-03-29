export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  constructor(
    public level: LogSeverityLevel,
    public message: string,
    public origin: string,
    public createdAt = new Date()
  ) {}

  static fromJson = (json: string): LogEntity => {
    const log: LogEntity = JSON.parse(json);

    const newLog = new LogEntity(log.level, log.message, log.origin);
    return newLog;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;
    const log = new LogEntity(level, message, origin, createdAt);
    return log;
  };
}
