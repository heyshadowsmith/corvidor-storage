const atom = require("./atoms");

function convertData(data) {
    const compressedData = atom.compressData(data);
    const bufferedData = atom.bufferData(compressedData);
    const encodedData = atom.encodeData(bufferedData);
    return encodedData;
}

function revertData(data) {
    const decodedData = atom.decodeData(data);
    const debufferedData = atom.debufferData(decodedData);
    const decompressedData = atom.decompressData(debufferedData);
    return decompressedData;
}

module.exports = {
    convertData,
    revertData
};