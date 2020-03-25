const router = require("express").Router();
const { tokenManager } = require("./../services");
// TODO: Add passport strategies
router.post("/local", (req, res, next) => {
    /* 
        This function should be replaced with passport local strategy
    */
   next();
}, (req, res) => {
    const user = req.user;
    const token = tokenManager.create(user);
    res.json({token});
});

router.get("/google", (req, res, next) => {
    /*
        This function should be replaced with google local strategy 
    */
   next();
}, (req, res) => {
    res.status(200).end();
});

router.get("/google/callback", (req, res, next) => {
        /*
        This function should be replaced with google local strategy 
    */
   next();
}, (req, res) => {
    const user = req.user
    // TODO: Get or create user with mongoose model
    const mongooseUser = user; // Leave it like this until this is implemented
    const token = tokenManager.create(mongooseUser);
    res.status(200).json({token});
});

module.exports = router;