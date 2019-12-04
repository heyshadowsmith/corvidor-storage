const atom = require("./atoms");
const molecule = require("./molecules");

function writeCorvidorFile(data) {
    atom.createFile(atom.createFileName(), molecule.convertData(data));
}

function writeSecureCorvidorFile(data, secret) {
    atom.createFile(atom.createFileName(), molecule.convertSecureData(data, secret));
}

function readCorvidorFile(name) {
    return molecule.revertData(atom.readFile(name));
}

function readSecureCorvidorFile(name, secret) {
    return molecule.revertSecureData(atom.readFile(name), secret);
}

function updateCorvidorFile(name, data) {
    atom.createFile(name, molecule.convertData(data));
}

module.exports = {
    writeCorvidorFile,
    writeSecureCorvidorFile,
    readCorvidorFile,
    readSecureCorvidorFile,
    updateCorvidorFile
};