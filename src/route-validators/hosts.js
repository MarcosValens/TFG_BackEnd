module.exports = function ({ check, validationResult }) {
    return {
        update: [
            check("description")
                .isString()
                .escape()
                .custom((description) =>
                    description.length > 30
                        ? Promise.reject(
                              "Description must be between 3 and 30 characters"
                          )
                        : true
                )
        ],
        validate(req) {
            return validationResult(req);
        },
    };
};
