const router = require("express").Router();
const networkManager = require("./../services/networkManager");
const passport = require("passport");
router.use(passport.authenticate("jwt"));

router.post("/create", (req, res) => {
    console.log("Here")
    networkManager.create(req.network)
});

router.post("/update", (req, res) => {
    networkManager.update(req.network)
});

router.post("/delete", (req, res) => {
    networkManager.delete(req.network)
});

module.exports = router;