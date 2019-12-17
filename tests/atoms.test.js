const atom = require("../js/atoms");

const compressedData = atom.compressData("Hello");
const combinedData = atom.combineData(compressedData, compressedData);
const bufferedData = atom.bufferData(combinedData);
const encodedData = atom.encodeData(bufferedData);
const decodedData = atom.decodeData(encodedData);
const debufferedData = atom.debufferData(decodedData);
const splitData = atom.splitData(debufferedData, compressedData);
const decompressedData = atom.decompressData(splitData[0]);

// UNIT TESTS
test("Create file", async () => {
  const response = await atom.createFile("TestFile", "Hello");
  expect(response).toEqual("TestFile has been added to Corvidor");
});

test("Compress data", () => {
  expect(compressedData).toEqual([0, 0, 0, -128, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 17, 18, 8, -90, -52, 85, -52, 89, -33, -65, -1, -1, -16, -124, 0, 0]);
});

test("Combine data", () => {
  expect(combinedData).toEqual([93, 0, 0, -128, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -128, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 17, 18, 8, -90, -52, 85, -52, 89, -33, -65, -1, -1, -16, -124, 0, 0, 0, 17, 18, 8, -90, -52, 85, -52, 89, -33, -65, -1, -1, -16, -124, 0, 0]);
});

test("Buffer data", () => {
  expect(bufferedData.toJSON()).toEqual({
    "type": "Buffer",
    "data": [93, 0, 0, 128, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 17, 18, 8, 166, 204, 85, 204, 89, 223, 191, 255, 255, 240, 132, 0, 0, 0, 17, 18, 8, 166, 204, 85, 204, 89, 223, 191, 255, 255, 240, 132, 0, 0]
  });
});

test("Encode data", () => {
  expect(encodedData).toEqual("XQAAgAAHAAAAAAAAAAAAAIAABwAAAAAAAAAAERIIpsxVzFnfv///8IQAAAAREgimzFXMWd+\/\///whAAA");
});

test("Decode data", () => {
  expect(decodedData.toJSON()).toEqual({
    "type": "Buffer",
    "data": [93, 0, 0, 128, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 17, 18, 8, 166, 204, 85, 204, 89, 223, 191, 255, 255, 240, 132, 0, 0, 0, 17, 18, 8, 166, 204, 85, 204, 89, 223, 191, 255, 255, 240, 132, 0, 0]
  });
});

test("Debuffer data", () => {
  expect(debufferedData).toEqual([93, 0, 0, 128, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 17, 18, 8, 166, 204, 85, 204, 89, 223, 191, 255, 255, 240, 132, 0, 0, 0, 17, 18, 8, 166, 204, 85, 204, 89, 223, 191, 255, 255, 240, 132, 0, 0]);
});

test("Split data", () => {
  expect(splitData).toEqual([
    [93, 0, 0, 128, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 17, 18, 8, 166, 204, 85, 204, 89, 223, 191, 255, 255, 240, 132, 0, 0],
    [93, 0, 0, 128, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 17, 18, 8, 166, 204, 85, 204, 89, 223, 191, 255, 255, 240, 132, 0, 0]
  ]);
});

test("Decompress data", () => {
  expect(decompressedData).toEqual("Hello");
});

test("Generate file name", () => {
  expect(typeof atom.createFileName()).toBe("string");
});

test("Read file", async () => {
  const fileData = await atom.readFile("TestFile");
  expect(fileData).toEqual("Hello");
});

test("Can't read non-existent file", async () => {
  const response = await atom.readFile("NoFile");
  expect(response).toEqual("NoFile is not an id in Corvidor");
});

test("Delete file", async () => {
  const response = await atom.deleteFile("TestFile");
  expect(response).toEqual("TestFile has been deleted from Corvidor");
});

test("Can't delete non-existent file", async () => {
  const response = await atom.deleteFile("NoFile");
  expect(response).toEqual("NoFile is not an id in Corvidor");
});
