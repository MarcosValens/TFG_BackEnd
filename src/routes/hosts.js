const router = require("express").Router();
const passport = require("passport");

const {
    network: { validateNetwork },
    host,
} = require("./../middlewares/validators");

const { hosts } = require("./../route-validators");

const { hostManager, portManager } = require("./../services");
const { singleHost } = require("./../util").delete.hosts;

router.use(passport.authenticate("jwt"));

router.use(validateNetwork);

router.post("/create", async (req, res) => {
    const hostsFromRequest = req.body.host || req.body.hosts;
    const hostsCreated = await hostManager.create(hostsFromRequest);
    const network = req.network;

    hostsCreated.forEach((host) => network.hosts.push(host));
    await network.save();
    res.status(200).json(hostsCreated);
});

router.get("/all", async (req, res) => {
    const hostIds = req.network.hosts;
    const hostsFetched = await hostManager.findByIds(hostIds);
    res.status(200).json(hostsFetched);
});

router.post("/updateSweep", async (req, res) => {
    const hostData = req.body.hosts;
    const alives = hostData.map(({alive}) => alive);
    const hostsGotUpdated = await hostManager.updateSweep(hostData, alives);

    if (!hostsGotUpdated) {
        return res
            .status(500)
            .json({ message: "There was an error updating the hosts list" });
    }
    res.status(200).json({ message: "Hosts updated successfully" });
});

router.use(host);

router.get("/:hostId", async (req, res) => {
    const host = req.hostDb;
    const ports = await portManager.findByIds(host.ports);
    host.ports = ports;
    res.status(200).json(host);
});

router.post("/update", hosts.update, async (req, res) => {
    const errors = hosts.validate(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const hostData = req.body.host;
    const hostWasUpdated = await hostManager.update(hostData);

    if (!hostWasUpdated) {
        return res
            .status(500)
            .json({ message: "There was an error updating your host" });
    }
    res.status(200).json({ message: "Host updated successfully" });
});

router.post("/delete", async (req, res) => {
    const gotDeleted = await singleHost(req.hostDb);
    if (!gotDeleted) {
        return res.status(500).json({ message: "Could not delete that host" });
    }
    res.status(200).json({ message: "Host deleted" });
});

module.exports = router;
