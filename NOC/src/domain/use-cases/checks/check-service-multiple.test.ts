import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";
import { CheckServiceMultiple } from "./check-service-multiple";

describe("check-service multiple usecase", () => {
  const mockLogRepositories = [
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
  ];

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(mockLogRepositories, successCallback, errorCallback);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successcallback when fetch return true ", async () => {
    const success = await checkServiceMultiple.execute("https://google.com");
    expect(success).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockLogRepositories[0].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepositories[1].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call errorcallback when fetch return false ", async () => {
    const error = await checkServiceMultiple.execute("");
    expect(error).toBe(false);

    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(mockLogRepositories[0].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepositories[1].saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
