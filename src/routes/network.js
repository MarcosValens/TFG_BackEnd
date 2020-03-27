const router = require("express").Router();
const passport = require("passport");
const { networkManager, userManager } = require("./../services");
const { network: { validateNetworkName, validateNetwork } } = require("./../middlewares/validators");

router.use(passport.authenticate("jwt"));

router.post("/create", validateNetworkName, async (req, res) => {
    try {
        const network = await networkManager.create(req.body);
        const user = req.user;
        console.log(network);
        const userFromDB = await userManager.findByEmail(user.email);
        userFromDB.networks.push(network);
        await userFromDB.save();
        res.status(200).json({"message": "Network saved!"})
    } catch (error) {
        res.status(500).json({"message": "This network already exists"})
    }

});

router.post("/update", validateNetwork, validateNetworkName, (req, res) => {
    networkManager.update(req.network)
});

router.post("/delete", validateNetwork, (req, res) => {
    networkManager.delete(req.network)
});

router.get("/all", async (req, res) => {
    const user = req.user;
    const userFromDB = await userManager.findByEmail(user.email);
    res.status(200).json(userFromDB.networks)
});

module.exports = router;