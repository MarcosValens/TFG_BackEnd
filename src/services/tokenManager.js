const jwt = require("jsonwebtoken");
const { Token } = require("./../model");
class TokenManager {
    constructor() {}

    createRefreshToken(publicUser) {
        return jwt.sign(publicUser, process.env.REFRESH_SECRET);
    }

    createToken(publicUser) {
        return jwt.sign(publicUser, process.env.SECRET, {
            expiresIn: "1m",
        });
    }

    create(user) {
        const publicUser = {
            email: user.email,
            name: user.name,
            surname: user.surname,
            id: user._id,
            isDev: user.isDev
        };
        const tokens = {
            refreshToken: this.createRefreshToken(publicUser),
            token: this.createToken(publicUser),
        };
        return tokens;
    }

    verify(token) {
        // We don't care about expiration on refresh tokens
        return jwt.verify(token, process.env.REFRESH_SECRET, {
            ignoreExpiration: true,
        });
    }

    async invalidate(token) {
        const blackList = await this.isBlackListed(token);
        if (!blackList) {
            const mongooseToken = await Token.create({
                blackListedToken: token
            }); 
            await mongooseToken.save();
        }
    }
    async isBlackListed(token) {
        return await Token.findOne({blackListedToken: token})
    }
}
const instance = {
    tokenManager: null,
};

module.exports = (() => {
    if (!instance.tokenManager) {
        instance.tokenManager = new TokenManager();
    }
    return instance.tokenManager;
})();
