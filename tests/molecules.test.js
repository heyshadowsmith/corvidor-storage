const molecule = require("../js/molecules");

const convertedData = molecule.convertData("Hello", "Hello");
const revertData = molecule.revertData(convertedData, "Hello");
const secretsMatch = molecule.secretsMatch(convertedData, "Hello");
const secretsMismatch = molecule.secretsMatch(convertedData, "No");

// INTEGRATION TESTS
test("Convert Data", () => {
  expect(convertedData).toEqual("XQAAgAAHAAAAAAAAAAAAAIAABwAAAAAAAAAAERIIpsxVzFnfv///8IQAAAAREgimzFXMWd+\/\///whAAA");
});

test("Revert Data", () => {
  expect(revertData).toEqual("Hello");
});

test("Match Secrets", () => {
  expect(secretsMatch).toBe(true);
});

test("Mismatch Secrets", () => {
  expect(secretsMismatch).toBe(false);
});