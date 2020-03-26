const jwt = require("jsonwebtoken");

class TokenManager {
    constructor() {}

    create(user) {
        console.log(user);
        const publicUser = {email: user.email, name: user.name, surname: user.surname, networks: user.networks, id: user._id} ;
        return jwt.sign(publicUser, process.env.SECRET, {
            expiresIn: "4h",
        });
    }

    validate(token) {
        return jwt.verify(token, process.env.SECRET);
    }
}
const instance = {
    tokenManager: null
};

module.exports = (() => {
    if (!instance.tokenManager) {
        instance.tokenManager = new TokenManager();
    }
    return instance.tokenManager;
})();
