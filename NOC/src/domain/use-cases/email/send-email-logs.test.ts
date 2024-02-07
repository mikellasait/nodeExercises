import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe("send-email-logs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository);

  test("should return true if email was sent successfully", async () => {
    const sent = await sendEmailLogs.execute("mikel@gmail.com");

    expect(sent).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should return false if an error occurred", async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

    const sent = await sendEmailLogs.execute("mikel@gmail.com");

    expect(sent).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
