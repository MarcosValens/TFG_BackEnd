const router = require("express").Router();
const passport = require("passport");
const {network: {validateNetwork}, host} = require("./../middlewares/validators");
const { hostManager } = require("./../services");


router.use(passport.authenticate("jwt"));

router.use(validateNetwork);

router.get("/all", async (req, res) => {
    res.status(200).json(req.network.hosts);
})

router.use(host);

router.get("/:hostId", async (req, res) => {
    res.status(200).json(req.host);
})

router.post("/", async (req, res) => {
    const hostData = req.body.host;
    const hostWasUpdated = await hostManager.update(hostData);

    if (!hostWasUpdated) {
        return res.status(500).json({message: "There was an error updating your host"});
    }
    res.status(200).json({message: "Host updated successfully"})
});

router.post("/delete", (req, res) => {
    const gotDeleted = await hostManager.delete(req.body.hostId);
    if (!gotDeleted) {
        return res.status(500).json({message: "Could not delete that host"});
    }
    res.status(200).json({message: "Host deleted"});
})

module.exports = router;