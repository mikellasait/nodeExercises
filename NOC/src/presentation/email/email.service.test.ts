import { EmailService, SendMailOptions } from "./email.service";
import nodemailer from "nodemailer";

describe("email service", () => {
  const mockSendEmail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendEmail,
  });

  test("should", async () => {
    const emailService = new EmailService();

    const options: SendMailOptions = {
      to: "mikel@gmail.com",
      subject: "Test",
      htmlBody: "<h1>Hola</h1>",
    };

    await emailService.sendEmail(options);

    expect(mockSendEmail).toHaveBeenCalledWith({ ...options, attachments: expect.any(Array) });
  });

  test("should send email with attachments", () => {
    const emailService = new EmailService();

    emailService.sendEmailWithFileSystemLogs("mikel@gmail.com");

    expect(mockSendEmail).toHaveBeenCalledWith({
      to: "mikel@gmail.com",
      subject: "Logs del servidor",
      htmlBody: expect.any(String),
      attachments: expect.arrayContaining([
        {
          filename: "logs-all.log",
          path: "./logs/logs-all.log",
        },
        {
          filename: "logs-high.log",
          path: "./logs/logs-high.log",
        },
        {
          filename: "logs-medium.log",
          path: "./logs/logs-medium.log",
        },
      ]),
    });
  });
});
