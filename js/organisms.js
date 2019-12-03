const atom = require("./atoms");
const molecule = require("./molecules");

function writeCorvidorFile(data) {
    atom.createFile(atom.createFileName(), molecule.convertData(data))
}

function readCorvidorFile(name) {
    return molecule.revertData(atom.readFile(name));
}

module.exports = {
    writeCorvidorFile,
    readCorvidorFile
};