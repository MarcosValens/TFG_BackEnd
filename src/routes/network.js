const router = require("express").Router();
const passport = require("passport");
const { networkManager, userManager, hostManager, portManager } = require("./../services");
const { network: { validateNetworkName, validateNetwork } } = require("./../middlewares/validators");

router.use(passport.authenticate("jwt"));

router.post("/create", validateNetworkName, async (req, res) => {
    try {
        const network = await networkManager.create(req.body);
        const user = req.user;
        const userFromDB = await userManager.findByEmail(user.email);
        userFromDB.networks.push(network);
        await userFromDB.save();
        res.status(200).json({message: "Network saved!"})
    } catch (error) {
        res.status(500).json({message: "This network already exists"})
    }

});

router.post("/update", validateNetwork, validateNetworkName, async (req, res) => {
    const wasUpdated = await networkManager.update(req.body);
    if(!wasUpdated) {
        return res.status(500).json({
            message:"Error updating network."
        })
    }
    res.status(200).json({message:"Network updated"})

});

router.post("/delete", validateNetwork, async (req, res) => {
    const wasDeleted = await networkManager.delete(req.body.networkId);
    if(!wasDeleted) {
        return res.status(500).json({
            message:"Error deleting network."
        })
    }
    res.status(200).json({message:"Network deleted."})
});

router.get("/all", async (req, res) => {
    const user = req.user;
    const userFromDB = await userManager.findByEmail(user.email);
    const networks = await networkManager.findByIds(userFromDB.networks);
    const filteredNetworks = networks.filter(network => !!network);
    res.status(200).json(filteredNetworks)
});

router.get("/:networkId", validateNetwork, async (req, res) => {
    res.status(200).json(req.network);
});

module.exports = router;