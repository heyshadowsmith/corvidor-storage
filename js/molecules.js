const atom = require("./atoms");

function convertData(data) {
    const compressedData = atom.compressData(data);
    const bufferedData = atom.bufferData(compressedData);
    const encodedData = atom.encodeData(bufferedData);
    return encodedData;
}

function convertSecureData(data, secret) {
    const compressedData = atom.compressData(data);
    const compressedSecret = atom.compressData(secret);
    const blendedCompressedData = atom.combineArrays(compressedData, compressedSecret);
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
    const decodedData = atom.decodeData(data);
    const debufferedData = atom.debufferData(decodedData);
    const compressedSecret = atom.compressData(secret)
    const originalArray = atom.getOriginalArray(debufferedData, compressedSecret)
    const decompressedData = atom.decompressData(originalArray);
    return decompressedData;
}

module.exports = {
    convertData,
    convertSecureData,
    revertData,
    revertSecureData
};