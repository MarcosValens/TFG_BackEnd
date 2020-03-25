const Strategy = require("passport-google-oauth2").Strategy;

const googleOptions = {
    callbackURL: "",
    clientID: "",
    clientSecret: ""
};

async function googleCallback(accessToken, refreshToken, profile, done) {
    
} 

const GoogleStrategy = new Strategy(googleOptions, googleCallback);
module.exports = GoogleStrategy;