// Error handler
const errHandler = (error, res, status=400) => {
    
    // Email must be unique
    if (error.name == "SequelizeUniqueConstraintError" && error.errors[0].path == "email") {
        return res.status(status).json({ error: lang.ERR_EMAIL_UNIQUE })
    }

    // Sequelize validation error
    if (error.name == "SequelizeValidationError" && error.errors[0].type == "notNull Violation"){
        return res.status(status).json({
            error : "Un champs obligatoire est nul",
            path: `${error.errors[0].path}`
         });
    }

    // If in production return only essential information 
    if (process.env.NODE_ENV === "production") {
        return res.status(status).json({ error: error.message });
    } else {
        return res.status(status).json({
            error: error.message,
            errorName : error.name, 
            errorStack: error.stack })
    }
}

module.exports = errHandler;
