const router = require("express").Router();
const { userManager } = require("./../services");
const { check, validationResult, body } = require("express-validator");

const checks = [
    check("email")
        .isEmail()
        .isLength({ min: 5, max: 254 })
        .normalizeEmail()
        .not()
        .isEmpty()
        .trim()
        .escape()
        .custom(email => userManager.findByEmail(email).then(user => user && Promise.reject("This email already exists"))),
    check("password").isLength({ min: 8, max: 50 }),
    check("name")
        .isLength({ min: 3, max: 30 })
        .not()
        .isEmpty(),
    check("surname")
        .isLength({ min: 3, max: 254 })
        .not()
        .isEmpty()
];


router.post("/", checks, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const userData = req.body;
    userData.issuer = "local"
    const userWasCreated = await userManager.create(userData);
    if (!userWasCreated) {
        return res.status(500).json({ error: "Could not create user. Soz!" });
    }
    res.status(200).json({ success: "User created sulucesefuly" });
});

module.exports = router;
