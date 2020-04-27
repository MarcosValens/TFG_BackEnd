const router = require("express").Router();
const passport = require("passport");
const { networkManager, userManager, hostManager } = require("./../services");

const { network } = require("./../route-validators");

const {
    network: { validateNetworkName, validateNetwork },
} = require("./../middlewares/validators");

const { wipe } = require("./../util").delete.networks;

router.use(passport.authenticate("jwt"));

// OK
router.post(
    "/create",
    validateNetworkName,
    network.create,
    async (req, res) => {
        try {
            const errors = network.validate(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const networkCreated = await networkManager.create(req.body);
            const user = req.user;
            const userFromDB = await userManager.findByEmail(user.email);
            userFromDB.networks.push(networkCreated);
            await userFromDB.save();
            res.status(200).json(networkCreated);
        } catch (error) {
            res.status(500).json({ message: "This network already exists" });
        }
    }
);

// OK TODO:TEST WITH HOSTS
router.post(
    "/update",
    validateNetwork,
    validateNetworkName,
    network.update,
    async (req, res) => {
        const errors = network.validate(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const wasUpdated = await networkManager.update(req.network, req.body);
        if (!wasUpdated) {
            return res.status(500).json({
                message: "Error updating network.",
            });
        }
        res.status(200).json({ network: wasUpdated });
    }
);

// OK
router.post("/delete", validateNetwork, async (req, res) => {
    const wasDeleted = await wipe(req.network);
    if (!wasDeleted) {
        return res.status(500).json({
            message: "Error deleting network.",
        });
    }
    await userManager.deleteNetwork(req.network._id, req.userDb);
    res.status(200).json({ networks: req.userDb.networks });
});

// OK
router.get("/all", async (req, res) => {
    const userFromDB = await userManager.findByEmail(req.user.email);
    const networksFetched = await networkManager.findByIds(userFromDB.networks);
    const filteredNetworks = networksFetched.filter((network) => !!network);
    res.status(200).json(filteredNetworks);
});

// OK
router.get("/:networkId", validateNetwork, async (req, res) => {
    const network = req.network;
    const hosts = await hostManager.findByIds(network.hosts);
    if (!network) {
        return res.status(404).json({ message: "Network not found" });
    }
    network.hosts = hosts;
    res.status(200).json(network);
});

module.exports = router;
