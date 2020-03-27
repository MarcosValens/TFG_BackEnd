const router = require("express").Router();
const passport = require("passport");
const { portManager, hostManager } = require("./../services");
const { portValidator } = require("./../middlewares/validators");

router.use(passport.authenticate("jwt"));

router.post("/create", portValidator, async (req, res) => {
    try {
        const port = await portManager.create(req.body);
        const host = req.host;
        const hostFromDB = await hostManager.findById(host.id);
        hostFromDB.ports.push(port);
        await hostFromDB.save();
        res.status(200).json({"message": "Port saved!"})
    } catch (error) {
        res.status(500).json({"message": "This port already exists"})
    }
});

router.post("/update", portValidator, (req, res) => {
    hostManager.update(req.port)
});

router.post("/delete", portValidator, (req, res) => {
    portManager.delete(req.port)
});

router.get("/all", async (req, res) => {
    const host = req.host;
    const hostFromDB = await hostManager.findById(host.id);
    res.status(200).json(hostFromDB.ports)
});

module.exports = ports;