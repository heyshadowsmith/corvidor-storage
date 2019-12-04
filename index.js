const atom = require("./js/atoms");
const molecule = require("./js/molecules");
const organism = require("./js/organisms");

// console.log(organism.readSecureCorvidorFile("5Lz3yCmL", "Smith"));
console.log(molecule.revertSecureData(atom.readFile("5Lz3yCmL"), "Smith"));