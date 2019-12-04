const atom = require("./js/atoms");
const molecule = require("./js/molecules");
const organism = require("./js/organisms");

// organism.writeSecureCorvidorFile({
//   "name": "shadow",
//   "age": "27"
// }, "Smith");

// organism.updateSecureCorvidorFile("IAwja6M7", {
//   "name": "shadow",
//   "age": "28"
// }, "Smith");
console.log(organism.readSecureCorvidorFile("IAwja6M7", "Smith"))