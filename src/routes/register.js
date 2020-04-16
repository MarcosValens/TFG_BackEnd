const router = require("express").Router();
const { userManager } = require("./../services");

const { register } = require("./route-validators");

router.post("/", register.register, async (req, res) => {
    const errors = register.validate(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const userData = req.body;
    userData.issuer = "local";
    const userWasCreated = await userManager.create(userData);
    if (!userWasCreated) {
        return res.status(500).json({ message: "Could not create user. Soz!" });
    }
    res.status(200).json({ success: "User created sulucesefuly" });
});

module.exports = router;
