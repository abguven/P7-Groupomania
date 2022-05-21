const { body, validationResult } = require('express-validator');

const schema = [
    body("user_name")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Votre nom doit contenir au moins 5 caractère")
        .isLength({ max: 40 })
        .withMessage("Votre nom contient trop de caractères.(Max. 40 autorisé)")
        .escape(),
    body("last_name")
        .trim()
        .isLength({ max: 40 })
        .withMessage("Votre nom de famille contient trop de caractères.(Max. 40 autorisé)")
        .escape(),
    body("email", "Email non valide")
        .trim()
        .escape()
        .isEmail()
        .normalizeEmail(),
]

function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    next();
}


module.exports = { schema, validate }
