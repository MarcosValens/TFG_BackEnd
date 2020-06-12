const router = require("express").Router();
const { userManager } = require("./../services");

const { register } = require("./../route-validators");

router.post("/", register.register, async (req, res) => {
    try {
        const errors = register.validate(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const userData = req.body;
        userData.issuer = "local";
        const userWasCreated = await userManager.create(userData);
        console.log(userWasCreated);
        if (!userWasCreated) {
            return res.status(500).json({ message: "Could not create user." });
        }
        res.status(200).json({ success: "User created sulucesefuly" });
    } catch(e) {console.log(e)}
});

module.exports = router;
