module.exports = function ({ check, validationResult }) {
    return {
        local: [
            check("email")
                .isEmail()
                .withMessage("Please enter a valid email")
                .isLength({ min: 5, max: 254 })
                .withMessage("Email length must be of 5 or 254")
                .not()
                .isEmpty()
                .withMessage("Email cannot be empty"),
            check("password")
                .isLength({ min: 8, max: 50 })
                .withMessage(
                    "Password length must be more than 8 characters and max length of 50 characters"
                )
                .notEmpty()
                .withMessage("Password cannot be empty"),
        ],
        validate(req) {
            return validationResult(req);
        },
    };
};
