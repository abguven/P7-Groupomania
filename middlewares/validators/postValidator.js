const { body, validationResult } = require('express-validator');

const MIN_LENGTH_POST = 11;

const schema = [
    body("content")
        .trim()
        .isLength({ min: MIN_LENGTH_POST })
        .withMessage(`Publication doit être au moins ${MIN_LENGTH_POST} caractères`)
        .escape()
];

async function validate(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array()[0].msg }); // Send only first validation error
    }
    next();
}

module.exports = {schema, validate };