const router = require("express").Router();
const { check, validationResult } = require('express-validator');

function isNewEmail(value) {
    return true;
}


const checks = [
    check("email").isEmail().isLength({max: 254}).normalizeEmail().not().isEmpty().trim().escape().custom(isNewEmail), // TODO: Delegate this to the user manager
    check("password").isLength({min: 8, max: 50})
]

router.post("/", checks, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    // TODO: Create user
    res.status(200).json({msg: "User created busesuly!"});
})

module.exports = router;