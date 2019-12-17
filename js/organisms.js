const atom = require("./atoms");
const molecule = require("./molecules");

async function writeCorvidorFile(data, secret) {
    const name = atom.createFileName();

    const response = await atom.createFile(name, molecule.convertData(data, secret));

    return {
        "message": response,
        "id": name,
        secret
    }
}

async function readCorvidorFile(name, secret) {
    const fileData = await atom.readFile(name);

    const secretsMatch = await molecule.secretsMatch(fileData, secret);

    if (!secretsMatch) return "Permission denied";

    const data = await molecule.revertData(fileData, secret)

    return data;
}

async function updateCorvidorFile(name, data, secret) {
    const fileData = await atom.readFile(name);

    const secretsMatch = await molecule.secretsMatch(fileData, secret);

    if (!secretsMatch) return "Permission denied";

    atom.createFile(name, molecule.convertData(data, secret));

    return {
        "message": `${name} has been updated`
    };
}

async function deleteCorvidorFile(name, secret) {
    const fileData = await atom.readFile(name)
    const secretsMatch = await molecule.secretsMatch(fileData, secret);

    if (!secretsMatch) return "Permission denied";

    const response = await atom.deleteFile(name);

    return {
        "message": response
    };
}

module.exports = {
    writeCorvidorFile,
    readCorvidorFile,
    updateCorvidorFile,
    deleteCorvidorFile
};