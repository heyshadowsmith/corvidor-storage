const atom = require("./js/atoms");
const molecule = require("./js/molecules");
const organism = require("./js/organisms");

// Left here for development
// molecule.revertSecureData("XQAAgAAHAAAAAAAAAAARXQAAgAA+AAAAAAAAAAARCQKtAAJRteTYRNfLztqH6ZIt3n8biMYa+TAXmPWfGuOpp67Jq1VDhOa62MSo/GlIU5pJBvTWESIWDSo7DGNpqnh5PP//h1YAABUJBlPIHPOfeP///z5YAAA=", "Hello");
const newArray = atom.combineArray([1,2,3,4,5,6,7,8,9,10], [1,2,3,4,5,6,7,8,9,10]);
console.log(JSON.stringify(newArray));
console.log(atom.splitArray())
// console.log(atom.decompressData(newArray));
// console.log(JSON.stringify(newArray));