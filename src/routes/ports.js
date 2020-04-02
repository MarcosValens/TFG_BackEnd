const router = require("express").Router();
const passport = require("passport");
const { portManager, hostManager } = require("./../services");
const { port, network: {validateNetwork}, host } = require("./../middlewares/validators");

router.use(passport.authenticate("jwt"));

router.use([validateNetwork, host])

router.post("/save", async (req, res) => {
    try {
        const hostDb = req.hostDb;
        const port = await portManager.create(req.body);
        if (!port) {
            return res.status(500).json({message: "Something went wrong OOPS!"})
        }
        hostDb.ports.push(port);
        await hostDb.save();
        res.status(200).json({message: "OK"})
    } catch(e) {
        res.status(500).json({message: "Something went wrong OOPS!"})
    }
    
})

router.post("/update", port, (req, res) => {
    hostManager.update(req.port)
});

router.post("/delete", port, (req, res) => {
    portManager.delete(req.port)
});

router.get("/:networkId/:hostId/all", async (req, res) => {
    const host = req.hostDb;
    const ports = await portManager.findByIds(host.ports);
    res.status(200).json(ports)
});

module.exports = router;