module.exports = function ({ check, validationResult }) {
    return {
        create: [
            check("name")
                .isString()
                .escape()
                .custom((name) =>
                    name.length < 3 || name.length > 25
                        ? Promise.reject(
                              "Name must be between 3 and 25 characters"
                          )
                        : true
                ),
            check("gateway")
                .escape()
        ],
        update: [
            check("name")
                .isString()
                .escape()
                .custom((name) =>
                    name.length < 3 || name.length > 25
                        ? Promise.reject(
                              "Name must be between 3 and 25 characters"
                          )
                        : true
                ),
            check("gateway")
                .isString()
                .escape()
        ],
        validate(req) {
            return validationResult(req);
        },
    };
};
