const router = require("express").Router();
const passport = require("passport");
const saveImage = require("image-downloader");
const path = require("path");
const fs = require("fs");

const { login } = require("./../route-validators");
const { tokenManager, userManager } = require("./../services");

async function createImage(url, id) {
    id = id.toString();
    const staticFolder = path.join(__dirname, `../../static`);
    const userFolder = path.join(staticFolder, id);
    if (!fs.existsSync(userFolder)) {
        await fs.mkdirSync(userFolder);
    }

    if (fs.readdirSync(userFolder).length) {
        return;
    }
    const options = {
        url,
        dest: path.join(userFolder, `${id}.jpg`).toString(),
    };
    await saveImage.image(options);
}


router.post("/local", login.local, (req, res, next) => {
    const errors = login.validate(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    passport.authenticate("local", (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Failed to log in" });
        }
        const token = tokenManager.create(user);
        res.status(200).json({ token });
    })(req, res, next);
});

router.get(
    "/google",
    (req, res, next) => {
        const referer = req.get("referer");
        console.log(req.headers)
        passport.authenticate("google", { scope: ["email", "profile"], state: `${referer}#/main` })(req, res, next)
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
                name: { givenName, familyName = "" },
            } = req.user;
            const userJson = req.user._json;
            const environment = "";
            let existingUser = await userManager.findByEmail(email);
            if (!existingUser) {
                await userManager.create({
                    email,
                    issuer: provider,
                    name: givenName,
                    surname: familyName,
                });
            }

            existingUser = await userManager.findByEmail(email);
            await createImage(userJson.picture, existingUser._id);

            const token = tokenManager.create(existingUser);
            res.status(200).redirect(`${req.query.state}?token=${token}&environment=${environment}`);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

module.exports = router;
