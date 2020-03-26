const Strategy = require("passport-google-oauth2").Strategy;

const googleOptions = {
    callbackURL: '/login/google/callback',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
};

async function googleCallback(accessToken, refreshToken, profile, done) {
        done(null, profile)
} 

const GoogleStrategy = new Strategy(googleOptions, googleCallback);
module.exports = GoogleStrategy;