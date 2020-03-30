const router = require("express").Router();
const { tokenManager, userManager } = require("./../services");

const passport = require("passport");

router.post("/local", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err || !user) {
            return res
                .status(401)
                .json({ message: "What were you trying to do?" });
        }
        const token = tokenManager.create(user);
        res.status(200).json({ token });
    })(req, res, next);
});

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
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

module.exports = router;
