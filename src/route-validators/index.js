const {check, validationResult} = require("express-validator");
const data = {
    check,
    validationResult
}
module.exports = {
    network: require("./network")(data),
    hosts: require("./hosts")(data),
    ports: require("./ports")(data),
    register: require("./register")(data),
    login: require("./login")(data),
    user: require("./user")(data)
}