const bcrypt = require("bcrypt");

const plainTextPassword1 = "";

console.log(bcrypt.hashSync(plainTextPassword1, 10));
