const atom = require("./atoms");
const molecule = require("./molecules");

function writeCorvidorFile(data) {
    atom.createFile(atom.createFileName(), molecule.convertData(data));
}

function readCorvidorFile(name) {
    return molecule.revertData(atom.readFile(name));
}

function updateCorvidorFile(name, data) {
    atom.createFile(name, molecule.convertData(data));
}

module.exports = {
    writeCorvidorFile,
    readCorvidorFile,
    updateCorvidorFile
};