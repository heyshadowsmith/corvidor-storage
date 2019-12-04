const atom = require("./atoms");

function convertData(data) {
    const compressedData = atom.compressData(data);
    const bufferedData = atom.bufferData(compressedData);
    const encodedData = atom.encodeData(bufferedData);
    return encodedData;
}

function convertSecureData(data, secret) {
    const compressedData = atom.compressData(data);
    const encryptedSecret = atom.encryptData(secret);
    const compressedEncryptedSecret = atom.compressData(encryptedSecret);
    const blendedCompressedData = atom.combineArrays(compressedData, compressedEncryptedSecret);
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

// Something in this function is buggin' out
function revertSecureData(data, secret) {
    const decodedData = atom.decodeData(data);
    const debufferedData = atom.debufferData(decodedData);
    const encryptedSecret = atom.encryptData(secret);
    const compressedEncryptedSecret = atom.compressData(encryptedSecret)
    const originalArray = atom.getOriginalArray(debufferedData, compressedEncryptedSecret)
    const decompressedData = atom.decompressData(originalArray);
    return decompressedData;
    // return decompressedData;
}

module.exports = {
    convertData,
    convertSecureData,
    revertData,
    revertSecureData
};