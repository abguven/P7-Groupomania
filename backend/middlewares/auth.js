"use strict";
const jwt = require('jsonwebtoken');
const errHandler = require('../controllers/errorHandler');

module.exports = (req, res, next) => {
    try {
        // Get bearer token => Format expected in header: Bearer {token}
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("Token d'authentification manquant");
        }
        
        const { userId, isAdmin } = jwt.verify(token, process.env.JWT_KEY);
        
        // create an auth variable to check authorisation for following middlewares
        req.auth = { userId, isAdmin }; 

        next(); // Token is valid

    } catch (error) {
        errHandler(error, res, 401);
    }
};