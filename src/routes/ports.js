const router = require("express").Router();
const passport = require("passport");
const { portManager, hostManager } = require("./../services");

const {
    port,
    network: { validateNetwork },
    host,
} = require("./../middlewares/validators");

const { singlePort } = require("./../util").delete.ports;
const { areNewPorts } = require("./../util").check.ports;
const { ports } = require("./route-validators");

router.use(passport.authenticate("jwt"));

router.use([validateNetwork, host]);

router.post("/create", async (req, res) => {
    try {
        const host = req.hostDb;
        const newPorts = await areNewPorts(host, req.body.ports);
        if (!newPorts.length) {
            return res.status(200).json(host);
        }
        newPorts.forEach((port) => {
            host.ports.push(port);
        });
        await host.save();
        res.status(200).json(host);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong OOPS!" });
    }
});

router.get("/all", async (req, res) => {
    res.status(200).json({ ports: req.hostDb.ports });
});

router.post("/update", port, ports.update, async (req, res) => {
    const errors = ports.validate(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const gotUpdatedOnHost = await hostManager.updatePort(
        req.hostDb,
        req.body.port
    );
    const gotUpdated = await portManager.update(req.body.port);
    if (!gotUpdatedOnHost || !gotUpdated) {
        return res.status(500).json({ message: "Something went wrong OOPS!" });
    }
    res.status(200).json({ message: "Port updated successfully" });
});

router.post("/delete", port, async (req, res) => {
    const gotDeleted = await singlePort(req.hostDb, req.portDb);
    if (!gotDeleted) {
        return res.status(500).json({ message: "Something went wrong OOPS!" });
    }
    res.status(200).json({ host: req.hostDb });
});

module.exports = router;
