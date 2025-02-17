const fs = require("fs");
const util = require("util");
const lzma = require("lzma");
const shortid = require("shortid");

const readFileAsync = util.promisify(fs.readFile);
const deleteFileAsync = util.promisify(fs.unlink);
const fileExistsAsync = util.promisify(fs.access);
const writeFileAsync = util.promisify(fs.writeFile);

async function createFile(name, data) {
    const response = await writeFileAsync(`data/${name}.crvdr`, data)
        .then(() => `${name} has been added to Corvidor`);
    return response;
}

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

async function fileExists(name) {
    const fileExists = await fileExistsAsync(`data/${name}.crvdr`, fs.F_OK)
        .then(() => true)
        .catch(() => false);

    return fileExists;
}

async function readFile(name) {
    const fileData = await readFileAsync(`data/${name}.crvdr`, "utf8")
        .then(data => data);

    return fileData;
}

async function deleteFile(name) {
    const response = await deleteFileAsync(`data/${name}.crvdr`)
        .then(() => `${name} has been deleted from Corvidor`);
        
    return response;
}

module.exports = {
    createFile,
    compressData,
    combineData,
    bufferData,
    encodeData,
    decodeData,
    debufferData,
    splitData,
    decompressData,
    createFileName,
    fileExists,
    readFile,
    deleteFile
};