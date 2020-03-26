const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
    secretOrKey: process.env.SECRET
};

function jwtCallback(req, payload, done) {
    console.log(req);
    console.log(payload);
}

module.exports = new JwtStrategy(options, jwtCallback);