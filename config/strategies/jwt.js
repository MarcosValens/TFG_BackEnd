const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
};

async function jwtCallback(req, payload, done) {
    done(null, payload);
}

module.exports = new JwtStrategy(options, jwtCallback);
