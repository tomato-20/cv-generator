const bcrypt = require("bcrypt");
require("dotenv").config()

const SALT = process.env.SALT;

//to hash password
exports.hash = async() => {
try {
    const hashedPassword = await bcrypt.hash(Password, SALT);
    return hashedPassword;
} catch (error) {
    return new Error ("Password cannot be hashed")
}
}

//to compare
exports.compare = async(Password,hash) => {
try {
    const result = await bcrypt.compare(Password, hash);
    return result;
} catch (error) {
    return new Error ("Cannot compare password");
}
}
