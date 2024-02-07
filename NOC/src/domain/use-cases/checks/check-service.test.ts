import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe("check-service usecase", () => {
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(mockLogRepository, successCallback, errorCallback);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successcallback when fetch return true ", async () => {
    const success = await checkService.execute("https://google.com");
    expect(success).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call errorcallback when fetch return false ", async () => {
    const error = await checkService.execute("");
    expect(error).toBe(false);

    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
