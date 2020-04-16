const router = require("express").Router();
const passport = require("passport");
const { userManager } = require("./../services");
const { upload, findImage } = require("./../middlewares");
const { user } = require("./../route-validators");

router.get("/image/:id", findImage, (req, res) =>
    res.status(200).sendFile(req.image)
);


router.use(passport.authenticate("jwt"));

router.get("/", async (req, res) => {
    try {
        const userDb = await userManager.findByEmail(req.user.email);
        const publicUser = {
            _id: userDb._id,
            email: userDb.email,
            name: userDb.name,
            surname: userDb.surname,
            networks: userDb.networks,
        };
        res.status(200).json(publicUser);
    } catch (ex) {
        res.status(401).json({ message: "Something went wrong OOPS!" });
    }
});

router.post(
    "/update",
    user.update,
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
            console.log(error);
            res.status(500).json({ message: "Something went wrong OOPS!" });
        }
    }
);

module.exports = router;
