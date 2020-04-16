module.exports = function ({ check, validationResult }) {
    return {
        update: [
            check("name")
                .isString()
                .withMessage("Please enter a valid name")
                .isLength({ min: 3, max: 30 })
                .withMessage("Name length must be of 3 or 30")
                .not()
                .isEmpty()
                .withMessage("Name cannot be empty")
                .trim()
                .escape(),
            check("surname")
                .isString()
                .withMessage("Please enter a valid surname")
                .isLength({ min: 3, max: 30 })
                .withMessage("Surname length must be of 3 or 30")
                .not()
                .isEmpty()
                .withMessage("Surame cannot be empty")
                .trim()
                .escape(),
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
