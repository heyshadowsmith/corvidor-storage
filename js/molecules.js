const atom = require("./atoms");

function convertSecureData(data, secret) {
    const compressedData = atom.compressData(data);
    const compressedSecret = atom.compressData(secret);
    const blendedCompressedData = atom.combineArrays(compressedData, compressedSecret);
    const bufferedData = atom.bufferData(blendedCompressedData);
    const encodedData = atom.encodeData(bufferedData);
    return encodedData;
}

function revertSecureData(data, secret) {
    const decodedData = atom.decodeData(data);
    const debufferedData = atom.debufferData(decodedData);
    const compressedSecret = atom.compressData(secret)
    const originalArrays = atom.getOriginalArrays(debufferedData, compressedSecret)
    const decompressedData = atom.decompressData(originalArrays[0]);
    return decompressedData;
}

function secretsMatch(data, secret) {
    const decodedData = atom.decodeData(data);
    const debufferedData = atom.debufferData(decodedData);
    const compressedSecret = atom.compressData(secret);
    const originalArrays = atom.getOriginalArrays(debufferedData, compressedSecret);
    const decompressedSecret = atom.decompressData(originalArrays[1]);

    if (secret !== decompressedSecret) return false

    return true;
}

module.exports = {
    convertSecureData,
    revertSecureData,
    secretsMatch
};