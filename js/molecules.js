const atom = require("./atoms");

function convertData(data) {
    const compressedData = atom.compressData(data);
    const bufferedData = atom.bufferData(compressedData);
    const encodedData = atom.encodeData(bufferedData);
    return encodedData;
}

function convertSecureData(data, secret) {
    const compressedData = atom.compressData(data);
    const encryptedData = atom.encryptData(secret);
    const compressedEncryptedData = atom.compressData(encryptedData);
    const blendedCompressedData = blendCompressedData(compressedData, compressedEncryptedData);
    const bufferedData = atom.bufferData(blendedCompressedData);
    const encodedData = atom.encodeData(bufferedData);
    return encodedData; 
}

function revertData(data) {
    const decodedData = atom.decodeData(data);
    const debufferedData = atom.debufferData(decodedData);
    const decompressedData = atom.decompressData(debufferedData);
    return decompressedData;
}

function revertSecureData(data, secret) {
    const decodeData = atom.decodeData(data);
    const debufferedData = atom.debufferData(decodeData);
    return splitBlendedCompressedData(debufferedData, secret);
}

function blendCompressedData(data1, data2) {
    const arrayCenter = atom.findArrayCenter(data1);
    const newArray = atom.combineArray(data1, arrayCenter, data2);
    return newArray;
}

function splitBlendedCompressedData(data, secret) {
    const encryptedData = atom.encryptData(secret);
    const compressedEncryptedData = atom.compressData(encryptedData);
    findArrayInArray(data, compressedEncryptedData);
}

function findArrayInArray(array1, array2) {
    console.log(array1);
    console.log(array2);
}

module.exports = {
    convertData,
    convertSecureData,
    revertData,
    revertSecureData,
    blendCompressedData,
    splitBlendedCompressedData
};