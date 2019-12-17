const organism = require("../js/organisms");

// INTEGRATION TESTS
test("Create, Read, Update, & Destroy a Corvidor file", async () => {
  // Create Corvidor File
  const createFile = await organism.writeCorvidorFile("Hello", "Hello");
  expect(createFile.secret).toEqual("Hello");

  // Fail to Read Corvidor File
  const failingRead = await organism.readCorvidorFile(createFile.id, "No");
  expect(failingRead.error).toEqual("Permission denied");

  // Successfully Read Corvidor File
  const successfulRead = await organism.readCorvidorFile(createFile.id, "Hello");
  expect(successfulRead).toEqual("Hello");

  // Fail to Update Corvidor File
  const failingUpdate = await organism.updateCorvidorFile(createFile.id, "Hello There", "No");
  expect(failingUpdate.error).toEqual("Permission denied");

  // Successfully Update Corvidor File
  const successfulUpdate = await organism.updateCorvidorFile(createFile.id, "Hello There", "Hello");
  expect(successfulUpdate.message).toEqual(`${createFile.id} has been updated`)

  // Successfully Reread Corvidor File
  const successfulReread = await organism.readCorvidorFile(createFile.id, "Hello");
  expect(successfulReread).toEqual("Hello There");

  // Fail to Delete Corvidor File 
  const failingDelete = await organism.deleteCorvidorFile(createFile.id, "No");
  expect(failingDelete.error).toEqual("Permission denied");

  // Successfully Delete Corvidor File 
  const successfulDelete = await organism.deleteCorvidorFile(createFile.id, "Hello");
  expect(successfulDelete.message).toEqual(`${createFile.id} has been deleted from Corvidor`);
});