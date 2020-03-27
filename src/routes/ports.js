const router = require("express").Router();
const passport = require("passport");
const { portManager, hostManager } = require("./../services");
const { port } = require("./../middlewares/validators");

router.use(passport.authenticate("jwt"));

router.post("/update", port, (req, res) => {
    hostManager.update(req.port)
});

router.post("/delete", port, (req, res) => {
    portManager.delete(req.port)
});

router.get("/all", async (req, res) => {
    const host = req.host;
    const hostFromDB = await hostManager.findById(host.id);
    res.status(200).json(hostFromDB.ports)
});

module.exports = router;