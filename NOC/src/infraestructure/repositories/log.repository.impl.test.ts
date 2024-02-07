import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";
describe("log repository impl", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("savelog should call datasources savelog with log entity", async () => {
    const log = new LogEntity(LogSeverityLevel.low, "iusudsa", "log repo impl");

    await logRepository.saveLog(log);

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call datasources getLogs by severy level", async () => {
    await logRepository.getLogs(LogSeverityLevel.high);

    expect(mockLogDatasource).toHaveBeenCalledWith(LogSeverityLevel.high);
  });
});
