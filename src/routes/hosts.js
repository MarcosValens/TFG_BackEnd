const router = require("express").Router();
const passport = require("passport");
const {network: {validateNetwork}, host} = require("./../middlewares/validators");
const { hostManager, portManager } = require("./../services");
const {singleHost} = require("./../util").delete.hosts;

router.use(passport.authenticate("jwt"));

router.use(validateNetwork);

router.post("/save", async (req, res) => {
    const host = await hostManager.create(req.body);
    const network = req.network;
    console.log(network)

    network.hosts.push(host);
    await network.save();
    res.status(200).json({message: "Host saved successfully"})
})


router.get("/all", async (req, res) => {
    const hostIds = req.network.hosts;
    const hosts = await hostManager.findByIds(hostIds);
    res.status(200).json(hosts);
});


router.use(host);

router.get("/:hostId", async (req, res) => {
    const host = req.hostDb;
    const ports = await portManager.findByIds(host.ports);
    host.ports = ports;
    res.status(200).json(host);
});

router.post("/update", async (req, res) => {
    const hostData = req.body.host;
    const hostWasUpdated = await hostManager.update(hostData);

    if (!hostWasUpdated) {
        return res.status(500).json({message: "There was an error updating your host"});
    }
    res.status(200).json({message: "Host updated successfully"})
});


router.post("/delete", async (req, res) => {
    const gotDeleted = await singleHost(req.hostDb);
    if (!gotDeleted) {
        return res.status(500).json({message: "Could not delete that host"});
    }
    res.status(200).json({message: "Host deleted"});
});

module.exports = router;