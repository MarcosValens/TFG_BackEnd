const { networkManager, userManager } = require("./../../services");

async function validateNetwork(req, res, next) {
    const idNetwork = req.params.networkId || req.body.networkId;
    const user = req.user;
    const userFromDB = await userManager.findByEmail(user.email);
    const network = userFromDB.networks.find(network => idNetwork);
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

module.exports = {
    validateNetwork, validateNetworkName
};