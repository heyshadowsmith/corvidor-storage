const fs = require("fs");
const lzma = require("lzma");
const shortid = require("shortid");

function compressData(data) {
    return lzma.compress(JSON.stringify(data));
}

function combineData(array1, array2) {
    const firstArrayPart = array1.slice(0, 13);
    const secondArrayPart = array2;
    secondArrayPart[0] = 0;
    const lastArrayPart = array1.slice(13);
    const ArrayStructure = [firstArrayPart, secondArrayPart, lastArrayPart];
    const newArray = [].concat.apply([], ArrayStructure);
    return newArray;
}

function bufferData(data) {
    return Buffer.from(data);
}

function encodeData(data) {
    return data.toString("base64");
}

function decodeData(data) {
    return Buffer.from(data, "base64");
}

function debufferData(data) {
    return data.toJSON().data;
}

function splitData(array1, array2) {
    const firstArrayPart = array1.slice(0, 13);
    const secondArrayPart = array1.slice(13, 13 + array2.length);
    secondArrayPart[0] = 93;
    const lastArrayPart = array1.slice(array2.length + 13);
    const originalArray = firstArrayPart.concat(lastArrayPart);
    const originalArrays = [originalArray, secondArrayPart];
    return originalArrays;
}

function decompressData(data) {
    return JSON.parse(lzma.decompress(data));
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
    fs.unlink(`data/${name}.crvdr`, error => {
        if (error) {
            return `${name} is not in Corvidor`;
        }
    });
}

module.exports = {
    compressData,
    combineData,
    bufferData,
    encodeData,
    decodeData,
    debufferData,
    splitData,
    decompressData,
    createFileName,
    createFile,
    readFile,
    deleteFile
};