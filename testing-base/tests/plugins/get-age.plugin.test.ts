import { getAge } from "../../src/plugins";

describe("plugins/get-age.plugin.ts", () => {
  test("getAge should return the age of a person", () => {
    const birthDate = "2000-01-01";

    const age = getAge(birthDate);

    expect(typeof age).toBe("number");
  });

  test("getAge should return current age", () => {
    const birthDate = "2000-01-01";

    const age = getAge(birthDate);

    const calculatedAge = new Date().getFullYear() - new Date(birthDate).getFullYear();

    expect(age).toBe(calculatedAge);
  });

  test("getAge should return 0 age", () => {
    const spy = jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(1995);

    const birthDate = "1995-10-21";
    const age = getAge(birthDate);

    expect(age).toBe(0);
    expect(spy).toHaveBeenCalled();
  });
});
