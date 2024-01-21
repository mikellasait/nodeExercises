import { characters } from "../../src/js-foundation/02-destructuring";

describe("js-foundation/02-destructuring.ts", () => {
  test("characters should contain Flash, Superman", () => {
    expect(characters).toContain("Flash");
    expect(characters).toContain("Superman");
  });

  test("first two characters should be Flash and Superman", () => {
    const [flash, superman] = characters;

    expect(flash).toBe("Flash");
    expect(superman).toBe("Superman");
  });
});
