const router = require("express").Router();
const { tokenManager } = require("./../services");

require("./../../config/passport-setup.js")
const passport = require("passport");

router.post("/local", passport.authenticate("local", {session: false}), (req, res) => {
    const user = req.user;
    const token = tokenManager.create(user);
    res.json({token});
});

router.get("/google", passport.authenticate("google", {scope: ["email", "profile"]}), (req, res) => {
    res.status(200).end();
});

router.get("/google/callback", (req, res) => {
    const user = req.user
    // TODO: Get or create user with mongoose model
    const mongooseUser = user; // Leave it like this until this is implemented
    const token = tokenManager.create(mongooseUser);
    res.status(200).json({token});
});

module.exports = router;