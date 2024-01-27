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

    return log;
  };
}
