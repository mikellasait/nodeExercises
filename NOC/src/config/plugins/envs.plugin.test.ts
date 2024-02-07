import { envs } from "./envs.plugin";

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SEVICE: "gmail",
      MAILER_EMAIL: "mikel@gmail.com",
      MAILER_SECRET_KEY: "123456",
      PROD: false,
      MONGO_URL: "mongodb://mikel:12345@localhost:27017/",
      MONGO_DB_NAME: "NOC_TEST",
      MONGO_USER: "mikel",
      MONGO_PASS: "12345",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
