const router = require("express").Router();
const { networkManager, hostManager, portManager } = require("./../services");

router.post("/all", async (req, res) => {
    try {
        await networkManager.update(req.body);
        res.status(200).json({message: "Network saved successfully"})
    } catch(e) {
        console.log(e);
        res.status(500).json({message: "Something went wrong OOPS"})
    }
})


module.exports = router;
