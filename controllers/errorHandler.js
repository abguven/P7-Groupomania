// Error handler
const errHandler = (error, res, status=400) => {
    
    // Email must be unique
    if (error.name == "SequelizeUniqueConstraintError" && error.errors[0].path == "email") {
        return res.status(status).json({ error: "Cet email existe déjà!" })
    }

    // If in production return only essential information 
    if (process.env.NODE_ENV === "production") {
        return res.status(status).json({ error: error.message });
    } else {
        return res.status(status).json({
            errorName : error.name, 
            errorMessage: error.message,
            errorStack: error.stack })
    }
}

module.exports = errHandler;
