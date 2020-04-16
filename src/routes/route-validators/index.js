const {check, validationResult} = require("express-validator");
const {utils} = require("@rochismo/net-utils");
const data = {
    check,
    validationResult,
    utils
}
module.exports = {
    network: require("./network")(data),
    hosts: require("./hosts")(data),
    ports: require("./ports")(data),
    register: require("./register")(data),
    login: require("./login")(data)
}