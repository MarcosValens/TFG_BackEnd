const { userManager } = require("./../../services");
const { check } = require("express-validator");

const checks = [
    check("email")
        .isEmail()
        .isLength({ min: 5, max: 254 })
        .normalizeEmail()
        .not()
        .isEmpty()
        .trim()
        .escape()
        .custom(email => userManager.findByEmail(email).then(user => user && Promise.reject("This email already exists"))),
    check("password").isLength({ min: 8, max: 50 }),
    check("name")
        .isLength({ min: 3, max: 30 })
        .not()
        .isEmpty(),
    check("surname")
        .isLength({ min: 3, max: 254 })
        .not()
        .isEmpty()
];

module.exports = checks;