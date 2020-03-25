const Strategy = require("passport-google-oauth2").Strategy;
const User = require('../../src/model/User');

const googleOptions = {
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
};

async function googleCallback(accessToken, refreshToken, profile, done) {
    const currentUser = await User.findOne({
        googleId: profile.id
    });
    if (currentUser){
        done(null, currentUser)
    } else {
        let newUser = await new User({
            name: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture
        }).save();
        done(null, newUser)
    }
} 

const GoogleStrategy = new Strategy(googleOptions, googleCallback);
module.exports = GoogleStrategy;