const router = require("express").Router();
const { networkManager, userManager, tokenManager } = require("./../services");

router.post("/create", (req, res) => {
    networkManager.create(req.network)
});

router.post("/update", (req, res) => {
    networkManager.update(req.network)
});

router.post("/delete", (req, res) => {
    networkManager.delete(req.network)
});

router.get("/getNetworks", (req, res) => {
    tokenManager.
    userManager.findByEmail(req.)
    networkManager.getAllUserNetworks
});

module.exports = router;