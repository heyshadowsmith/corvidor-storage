const atom = require("./js/atoms");
const molecule = require("./js/molecules");
const organism = require("./js/organisms");

// organism.writeSecureCorvidorFile({
//   "name": "shadow",
//   "age": "27"
// }, "Smith");
console.log(organism.readSecureCorvidorFile("u_Q0e52H", "Smith"))