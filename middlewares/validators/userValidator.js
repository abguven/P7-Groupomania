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

]

async function validate(req, res, next) {
    // If user wants to update without changing his password 
    console.log(`body.ignorePassword = ${req.body.ignorePassword} || req.method = ${req.method}`);  // DEBUG
    if (req.body.ignorePassword !== "true".toUpperCase() || req.method !== "PUT") {
        await body("password")
            .isLength({ min: 6 })
            .withMessage("Votre mot de passe doit contenir au moins 6 caractères")
            .isLength({ max: 20 })
            .withMessage("Votre mot de passe contient trop de caractères.(Max. 20 autorisé)")
            .run(req);
    } else {
        console.log('\x1b[33m Ignoring password validation ... \x1b[0m'); // DEBUG
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg }); // Send only first validation error
    }
    next();
}


module.exports = { schema, validate }
