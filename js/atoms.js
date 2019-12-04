const fs = require("fs");
const lzma = require("lzma");
const shortid = require("shortid");
const bcrypt = require("bcryptjs");

function compressData(data) {
    return lzma.compress(JSON.stringify(data));
}

function decompressData(data) {
    return JSON.parse(lzma.decompress(data));
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

function encryptData(data) {
    return bcrypt.hashSync(data, 10);
}

function compareEncryptedData(data, encryptedData) {
    return bcrypt.compareSync(data, encryptedData);
}

function createFileName() {
    return shortid.generate();
}

function createFile(name, data) {
    fs.writeFileSync(`data/${name}.crvdr`, data);
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

function combineArrays(array1, array2) {
    const firstArrayPart = array1.slice(0, 13);
    const secondArrayPart = array2;
    const lastArrayPart = array1.slice(13);
    const ArrayStructure = [firstArrayPart, secondArrayPart, lastArrayPart];
    const newArray = [].concat.apply([], ArrayStructure);
    return newArray;
}

function getOriginalArray(array1, array2) {
    const firstArrayPart = array1.slice(0, 13);
    const lastArrayPart = array1.slice(array2.length + 13);
    const originalArray = firstArrayPart.concat(lastArrayPart);
    return originalArray;
}

module.exports = {
    compressData,
    decompressData,
    bufferData,
    debufferData,
    encodeData,
    decodeData,
    encryptData,
    compareEncryptedData,
    createFileName,
    createFile,
    readFile,
    deleteFile,
    combineArrays,
    getOriginalArray
};