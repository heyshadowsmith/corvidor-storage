const atom = require("./atoms");
const molecule = require("./molecules");

function writeCorvidorFile(data, secret) {
    const name = atom.createFileName();

    atom.createFile(name, molecule.convertData(data, secret));

    return `${name} has been created`
}

function readCorvidorFile(name, secret) {
    const secretsMatch = molecule.secretsMatch(atom.readFile(name), secret);

    if (!secretsMatch) return "Permission denied";
    
    return molecule.revertData(atom.readFile(name), secret);
}

function updateCorvidorFile(name, data, secret) {
    const secretsMatch = molecule.secretsMatch(atom.readFile(name), secret);

    if (!secretsMatch) return "Permission denied";

    atom.createFile(name, molecule.convertData(data, secret));

    return `${name} has been updated`;
}

function deleteCorvidorFile(name, secret) {
    const secretsMatch = molecule.secretsMatch(atom.readFile(name), secret);

    if (!secretsMatch) return "Permission denied";

    atom.deleteFile(name);

    return `${name} has been deleted`;
}

module.exports = {
    writeCorvidorFile,
    readCorvidorFile,
    updateCorvidorFile,
    deleteCorvidorFile
};