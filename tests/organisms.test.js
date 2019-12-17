const organism = require("../js/organisms");

// INTEGRATION TESTS
test("Create, Read, Update, & Destroy a Corvidor file", async () => {
  // Create Corvidor File
  const createFile = await organism.writeCorvidorFile("Hello", "Hello");
  expect(createFile.secret).toEqual("Hello");

  // Fail to read Corvidor file because of a wrong secret
  const wrongSecretRead = await organism.readCorvidorFile(createFile.id, "No");
  expect(wrongSecretRead.error).toEqual("Permission denied");

  // Fail to read Corvidor file because it doesn't exist
  const nonexistentFileRead = await organism.readCorvidorFile("No", "Hello");
  expect(nonexistentFileRead.error).toEqual("Permission denied");

  // Successfully read Corvidor file
  const successfulRead = await organism.readCorvidorFile(createFile.id, "Hello");
  expect(successfulRead).toEqual("Hello");

  // Fail to update Corvidor file because of wrong secret
  const wrongSecretUpdate = await organism.updateCorvidorFile(createFile.id, "Hello There", "No");
  expect(wrongSecretUpdate.error).toEqual("Permission denied");

  // Fail to update Corvidor file because it doesn't exist
  const nonexistentFileUpdate = await organism.updateCorvidorFile("No", "Hello There", "Hello");
  expect(nonexistentFileUpdate.error).toEqual("Permission denied");

  // Successfully update Corvidor file
  const successfulUpdate = await organism.updateCorvidorFile(createFile.id, "Hello There", "Hello");
  expect(successfulUpdate.message).toEqual(`${createFile.id} has been updated`)

  // Successfully reread Corvidor file
  const successfulReread = await organism.readCorvidorFile(createFile.id, "Hello");
  expect(successfulReread).toEqual("Hello There");

  // Fail to delete Corvidor file because of wrong secret
  const wrongSecretDelete = await organism.deleteCorvidorFile(createFile.id, "No");
  expect(wrongSecretDelete.error).toEqual("Permission denied");

  // Fail to delete Corvidor file because it doesn't exist
  const nonexistentFileDelete = await organism.deleteCorvidorFile("No", "Hello");
  expect(nonexistentFileDelete.error).toEqual("Permission denied");

  // Successfully delete Corvidor file 
  const successfulDelete = await organism.deleteCorvidorFile(createFile.id, "Hello");
  expect(successfulDelete.message).toEqual(`${createFile.id} has been deleted from Corvidor`);
});