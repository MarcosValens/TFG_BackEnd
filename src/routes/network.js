const router = require("express").Router();
const { NetworkManager } = require("./../services/networkManager");

router.post("/create", (req, res) => {
    NetworkManager.create(req.network)
});

router.post("/update", (req, res) => {
    NetworkManager.update(req.network)
});

router.post("/delete", (req, res) => {
    NetworkManager.delete(req.network)
});

