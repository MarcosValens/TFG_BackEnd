const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const { userManager } = require("./../../src/services");

async function verifyPassword(password, userPassword) {
    const isValid = await bcrypt.compareSync(password, userPassword);
    return isValid;
}

const options = {
    usernameField: "email",
    session: false
}

async function doLogin(email, password, done) {
    try {
        const user = await userManager.findByEmail(email);
        if (!user) {
            return done(null, false);
        }
        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword || user.createdWith !== "local") {
            return done(null, false);
        }
        done(null, user);
    } catch(error) {
        done(error);
    }
}

module.exports = new LocalStrategy(options,doLogin);