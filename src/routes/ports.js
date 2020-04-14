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
        /*
const port = await portManager.create(req.body);
        if (!port) {
            return res
                .status(500)
                .json({ message: "Something went wrong OOPS!" });
        }
        hostDb.ports.push(port);
        await hostDb.save();
        */
        res.status(200).json(host);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong OOPS!" });
    }
});

router.get("/all", async (req, res) => {
    res.status(200).json({ ports: req.hostDb.ports });
});

router.post("/update", port, async (req, res) => {
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
    const gotDeleted = await singlePort(req.port);
    if (!gotDeleted) {
        return res.status(500).json({ message: "Something went wrong OOPS!" });
    }
    res.status(200).json({ message: "Port deleted successfully" });
});

module.exports = router;
