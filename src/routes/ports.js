const router = require("express").Router();
const passport = require("passport");
const { portManager, hostManager } = require("./../services");
const { port, network: {validateNetwork}, host } = require("./../middlewares/validators");
const { singlePort } = require("./../util").delete.ports;
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

router.post("/update", port, async (req, res) => {
    const gotUpdated = await portManager.update(req.port);
    if (!gotUpdated) {
        return res.status(500).json({message: "Something went wrong OOPS!"})
    }
    res.status(200).json({message: "Port updated successfully"})
});

router.post("/delete", port, async (req, res) => {
    const gotDeleted = await singlePort(req.port);
    if (!gotDeleted) {
        return res.status(500).json({message: "Something went wrong OOPS!"})
    }
    res.status(200).json({message: "Port deleted successfully"})
});

module.exports = router;