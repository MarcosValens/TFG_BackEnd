const router = require("express").Router();
const { userManager } = require("./../services");
const { check, validationResult } = require('express-validator');

const checks = [
    check("email").isEmail().isLength({min: 5, max: 254}).normalizeEmail()
        .not().isEmpty()
            .trim().escape()
                .custom(userManager.emailExists),
    check("password").isLength({min: 8, max: 50}),
    check("name").isLength({min: 3, max: 30}).not().isEmpty(),
    check("surname").isLength({min: 3, max: 254}).not().isEmpty()
]

router.post("/", checks, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const user = await userManager.create(req.body);
    if (!user) {
        return res.status(500).json({error: "Could not create user. Soz!"});
    }
    await user.save();
    res.status(200).json({success: true});
})

module.exports = router;