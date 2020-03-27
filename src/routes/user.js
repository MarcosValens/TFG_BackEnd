const router = require("express").Router();
const passport = require("passport");
const { userManager } = require("./../services");

router.use(passport.authenticate("jwt"));

router.get("/", async (req, res) => {
    try {
        const user = await userManager.findByEmail(req.body.email);
        res.status(200).json(user);
    } catch(ex) {
        res.status(500).json({error: "Something went wrong OOPS!"})
    }
});

router.put("/update", async (req, res) => {
    try {
        const user = await userManager.findByEmail(req.user.email);
        const didUpdate = await userManager.update(user, req.body);
        if (!didUpdate) {
            return res.status(400).json({error: "Check your fields"}); 
        }
        res.status(200).json({message: "Profile updated successfully!"});
    } catch(error) {
        res.status(500).json({error: "Something went wrong OOPS!"});
    }
})

module.exports = router;