const atom = require("./atoms");
const molecule = require("./molecules");

function writeSecureCorvidorFile(data, secret) {
    const name = atom.createFileName();

    atom.createFile(name, molecule.convertSecureData(data, secret));

    return `${name} has been created`
}

function readSecureCorvidorFile(name, secret) {
    const secretsMatch = molecule.secretsMatch(atom.readFile(name), secret);

    if (!secretsMatch) return "Permission denied";
    
    return molecule.revertSecureData(atom.readFile(name), secret);
}

function updateSecureCorvidorFile(name, data, secret) {
    const secretsMatch = molecule.secretsMatch(atom.readFile(name), secret);

    if (!secretsMatch) return "Permission denied";

    atom.createFile(name, molecule.convertSecureData(data, secret));

    return `${name} has been updated`;
}

function deleteSecureCorvidorFile(name, secret) {
    const secretsMatch = molecule.secretsMatch(atom.readFile(name), secret);

    if (!secretsMatch) return "Permission denied";

    atom.deleteFile(name);

    return `${name} has been deleted`;
}

module.exports = {
    writeSecureCorvidorFile,
    readSecureCorvidorFile,
    updateSecureCorvidorFile,
    deleteSecureCorvidorFile
};