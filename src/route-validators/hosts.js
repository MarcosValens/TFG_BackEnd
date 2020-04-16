module.exports = function ({ check, validationResult }) {
    return {
        update: [
            check("description")
                .isString()
                .escape()
                .custom((description) =>
                    description.length < 3 || description.length > 255
                        ? Promise.reject(
                              "Description must be between 3 and 255 characters"
                          )
                        : true
                )
        ],
        validate(req) {
            return validationResult(req);
        },
    };
};
