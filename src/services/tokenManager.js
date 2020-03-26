const jwt = require("jsonwebtoken");

class TokenManager {
    constructor() {}

    create(user) {
        const publicUser = {email: user.email, name: user.name, surname: user.surname, id: user._id} ;
        return jwt.sign(publicUser, process.env.SECRET, {
            expiresIn: "4h",
        });
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
