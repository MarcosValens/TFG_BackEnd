const router = require("express").Router();
const networkManager = require("./../services/networkManager");

router.post("/create", (req, res) => {
    networkManager.create(req.network)
});

router.post("/update", (req, res) => {
    networkManager.update(req.network)
});

router.post("/delete", (req, res) => {
    networkManager.delete(req.network)
});

