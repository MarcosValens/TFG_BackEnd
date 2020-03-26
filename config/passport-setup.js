const passport = require("passport");
const strategies = require("./strategies");
const { userService } = require("./../src/services");
passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await userService.findByEmail(email);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

strategies.forEach(strategy => passport.use(strategy));