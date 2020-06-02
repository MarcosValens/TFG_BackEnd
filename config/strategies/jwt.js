const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { tokenManager } = require("./../../src/services/index");
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
    ignoreExpiration: true,
    passReqToCallback: true,
};

async function jwtCallback(req, payload, done) {
    const expiration = new Date(payload.exp * 1000);
    const now = new Date();
    if (expiration > now) {
        return done(null, payload);
    }
    const refreshToken = req.headers["x-refresh-token"];
    console.log("Token expired")
    if (!refreshToken) {
        return done(null, false);
    }
    try {
        const payload = tokenManager.verify(refreshToken);
        const isBlackListed = await tokenManager.isBlackListed(refreshToken);
        if (isBlackListed) throw { error: "Token is blacklisted" };
        const {email, name, surname, id, isDev} = payload;
        const newToken = tokenManager.createToken({email, name, surname, id, isDev});
        payload.token = newToken;
        done(null, payload);
    } catch (e) {
        done(null, false);
    }
}

module.exports = new JwtStrategy(options, jwtCallback);
