const router = require("express").Router();
const {networkManager, userManager} = require("./../services");
const passport = require("passport");
router.use(passport.authenticate("jwt"));

async function validateNetwork(req, res, next) {
    const idNetwork = req.body.networkId;
    const user = req.user;
    const userFromDB = await userManager.findByEmail(user.email);
    const network = userFromDB.networks.find(network => network._id === idNetwork);
    if (!network) {
        return res.status(401).json({"message": "Network not found"})
    }
    req.network = network;
    next()
}

async function validateNetworkName(req, res, next) {
    const networkName = req.body.name;
    const user = req.user;
    const userFromDB = await userManager.findByEmail(user.email);
    const networkPromises = userFromDB.networks.map(networkManager.findById);
    const networks = await Promise.all(networkPromises);
    const networkNameDB = networks.find(network => network && network.name === networkName);
    if (networkNameDB) {
        return res.status(401).json({"message": "This name already exists"})
    }
    next()
}


router.post("/create", validateNetworkName, async (req, res) => {
    try {
        const network = await networkManager.create(req.body);
        const user = req.user;
        console.log(network);
        const userFromDB = await userManager.findByEmail(user.email);
        userFromDB.networks.push(network);
        await userFromDB.save();
        res.status(200).json({"message":"Network saved!"})
    } catch (error){
     res.status(500).json({"message":"This network already exists"})
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