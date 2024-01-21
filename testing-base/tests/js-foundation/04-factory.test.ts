import { buildMakePerson } from "../../src/js-foundation/05-factory";

describe("js-foundation/03-factory.ts", () => {
  const getUUID = () => "1234";
  const getAge = () => 32;

  test("buildMakePerson should return a function", () => {
    const makePerson = buildMakePerson({
      getUUID,
      getAge,
    });

    expect(typeof makePerson).toBe("function");
  });

  test("makePerson should return a person", () => {
    const makePerson = buildMakePerson({
      getUUID,
      getAge,
    });
    const person = makePerson({ name: "Paco", birthdate: "1920-10-10" });
    expect(person).toEqual({ id: "1234", name: "Paco", birthdate: "1920-10-10", age: 32 });
  });
});
