const router = require("express").Router();
const { tokenManager, userManager } = require("./../services");

const passport = require("passport");

router.get("/error", (req, res) => {
    res.status(401).json({ error: "What were you trying to do?" });
});

router.post(
    "/local",
    passport.authenticate("local", { failureRedirect: "/login/error" }),
    (req, res) => {
        const user = req.user;
        const token = tokenManager.create(user);
        res.json({ token });
    }
);

router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] }),
    (req, res) => {
        res.status(200);
    }
);

router.get(
    "/google/callback",
    passport.authenticate("google"),
    async (req, res) => {
        try {
            const {
                email,
                provider,
                name: { givenName, familyName = "" }
            } = req.user;
            let existingUser = await userManager.findByEmail(email);
            if (!existingUser) {
                await userManager.create({
                    email,
                    issuer: provider,
                    name: givenName,
                    surname: familyName
                });
            }

            existingUser = await userManager.findByEmail(email);

            const token = tokenManager.create(existingUser);
            res.status(200).json({ token });
        } catch(error) {
            res.status(500).json({error: "Something went wrong"});
        }
    }
);

module.exports = router;
