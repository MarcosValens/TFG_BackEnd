const router = require("express").Router();
const passport = require("passport");
const { userManager, networkManager, tokenManager } = require("./../services");
const { wipe } = require("./../util/index").delete.networks;
const { upload, findImage, deleteImage } = require("./../middlewares");
const { user } = require("./../route-validators");
router.get("/image/:id", findImage, (req, res) =>
    res.status(200).sendFile(req.image)
);

router.delete("/invalidate", async (req, res) => {
    const refreshToken = req.headers["x-refresh-token"];
    if (!refreshToken) {
        return res.status(204).json({message: "No Token found"})
    }
    try {
        tokenManager.verify(refreshToken)
        await tokenManager.invalidate(refreshToken)
    } catch(e) {
        return res.status(204).json(null);
    }
})
router.use(passport.authenticate("jwt"));
router.use(async (req, res, next) => {
    const userDb = await userManager.findByEmail(req.user.email);
    if (req.user.token) {
        res.setHeader("access-token", req.user.token)
    }
    req.userDb = userDb;
    next();
});

router.get("/check", (req, res) => res.status(200).send(req.userDb));

router.get("/", async (req, res) => {
    try {
        const userDb = req.userDb;
        const publicUser = {
            _id: userDb._id,
            strategy: userDb.createdWith,
            email: userDb.email,
            name: userDb.name,
            surname: userDb.surname,
            networks: userDb.networks,
            userAgreementAccepted: userDb.userAgreementAccepted,
            isDev: userDb.isDev
        };
        res.status(200).json(publicUser);
    } catch (ex) {
        res.status(401).json({ message: "Something went wrong OOPS!" });
    }
});

router.delete("/delete", async (req, res) => {
    const user = req.userDb;
    try {
        const userNetworks = await networkManager.findByIds(user.networks);
        const wipePromises = userNetworks.map((network) => wipe(network));
        const wipes = await Promise.all(wipePromises);
        const pfpGotDeleted = deleteImage(user._id.toString());
        const userGotDeleted = await userManager.delete(user._id);

        const gotWiped = wipes.indexOf(false) === -1 && pfpGotDeleted && userGotDeleted;
        if (!gotWiped) {
            return res.status(500).json({message: "Could not delete user"});
        }
        res.status(200).json({message: "User deleted successfully"});

    } catch (e) {
        res.status(500).json({ message: "OOPs Something went wrong" });
    }
});

router.get("/accept", async (req, res) => {
    const user = req.userDb;
    if (user.userAgreementAccepted) return res.status(204).json({ message: "You have accepted our agreement, no need to flood us." });
    user.userAgreementAccepted = true;
    await user.save();
    res.status(200).json({ message: "Agreement accepted" });
})

router.post(
    "/update",
    upload.single("image"),
    async (req, res) => {
        try {
            const errors = user.validate(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const userDb = await userManager.findByEmail(req.user.email);
            const userData = {
                photo: req.file,
                data: req.body,
            };
            const didUpdate = await userManager.update(userDb, userData);
            if (!didUpdate) {
                return res.status(400).json({ message: "Check your fields" });
            }
            res.status(200).json({ message: "Profile updated successfully!" });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong OOPS!" });
        }
    }
);

module.exports = router;
