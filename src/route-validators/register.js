const { userManager } = require("./../services");

module.exports = function ({ check, validationResult }) {
    return {
        register: [
            check("email")
                .isEmail()
                .withMessage("Please enter a valid email")
                .isLength({ min: 5, max: 254 })
                .withMessage("Email length must be of 5 or 254")
                .not()
                .isEmpty()
                .withMessage("Email cannot be empty")
                .custom((email) =>
                    userManager
                        .findByEmail(email)
                        .then(
                            (user) =>
                                user &&
                                Promise.reject("This email already exists")
                        )
                ),
            check("password")
                .isLength({ min: 8, max: 50 })
                .withMessage(
                    "Password length must be more than 8 characters and max length of 50 characters"
                )
                .notEmpty()
                .withMessage("Password cannot be empty"),
            check("name")
                .isLength({ min: 3, max: 30 })
                .withMessage(
                    "Name must be of minimum length 3 characters and max length of 30 characters"
                )
                .not()
                .isEmpty()
                .withMessage("Name cannot be empty"),
            check("surname")
                .isLength({ min: 3, max: 30 })
                .withMessage(
                    "Surname must be of minimum length 3 characters and max length of 30 characters"
                )
                .not()
                .isEmpty()
                .withMessage("Surname cannot be empty"),
        ],
        validate(req) {
            return validationResult(req);
        },
    };
};
