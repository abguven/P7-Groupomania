const { body, validationResult } = require('express-validator');

const schema = [
    body("user_name")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Votre nom doit contenir au moins 3 caractère")
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
    body("password")
        .isLength({ min: 6 })
        .withMessage("Votre mot de passe doit contenir au moins 6 caractère")
        .isLength({ max: 20 })
        .withMessage("Votre mot de passe contient trop de caractères.(Max. 20 autorisé)")
]

function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    next();
}


module.exports = { schema, validate }
