const fs = require("fs");
const lzma = require("lzma");
const shortid = require("shortid");

function compressData(data) {
    return lzma.compress(JSON.stringify(data));
}

function decompressData(data) {
    return lzma.decompress(data);
}

function bufferData(data) {
    return Buffer.from(data);
}

function debufferData(data) {
    return data.toJSON().data;
}

function encodeData(data) {
    return data.toString("base64");
}

function decodeData(data) {
    return Buffer.from(data, "base64");
}

function createFileName() {
    return shortid.generate();
}

function createFile(name, content) {
    fs.writeFile(`data/${name}.crvdr`, content, error => {
        if (error) {
            console.error(error);
            return;
        }
    });
}

function readFile(name) {
    return fs.readFileSync(`data/${name}.crvdr`, "utf8");
}

function deleteFile(name) {
    fs.unlink(`data/${name}.txt`, error => {
        if (error) {
            console.error(error);
            return;
        }
    });
}

module.exports = {
    compressData,
    decompressData,
    bufferData,
    debufferData,
    encodeData,
    decodeData,
    createFileName,
    createFile,
    readFile,
    deleteFile
};