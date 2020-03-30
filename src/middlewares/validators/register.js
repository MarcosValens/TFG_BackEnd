const { userManager } = require("../../services");
const { body } = require("express-validator");

function validString(string, min, max, paramName) {
    const status = {
        success: true,
        msg: ""
    };
    if (!string) {
        status.success = false;
        status.msg = `${paramName} must not be empty`;
    }
    if (password.length < 8) {
        status.success = false;
        status.msg = `${paramName} length should be more than ${min}`;
    } else if (password.length > 52) {
        status.success = false;
        status.msg = `${paramName} length cannot be more than ${max}`;
    }
    return status;
}

const checks = [
    body("email")
        .isEmail()
        .normalizeEmail()
        .escape()
        .not()
        .isEmpty()
        .trim()
        .custom(async email => {
            const email = await userManager.findByEmail(email);
            if (email) {
                return Promise.reject("This email already exists");
            }
            return true;
        }),
    body("password").custom(password => {
        const status = validString(password, 8, 52, "password");
        if(!status.success) {
            return Promise.reject(status.msg);
        }
        return true;
    }),
    body("name").custom(name => {
        const status = validString(name, 3, 25, "name");
        if(!status.success) {
            return Promise.reject(status.msg);
        }
        return true;
    }),
    body("surname").custom(surname => {
        const status = validString(surname, 3, 25, "surname");
        if(!status.success) {
            return Promise.reject(status.msg);
        }
        return true;
    })
];

module.exports = checks;