"use strict";

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidator =require('../middlewares/validators/userValidator');
const multer = require('../middlewares/multerConfig');
const auth = require('../middlewares/auth');

// New user
router.post("/users",
        multer,
        /*(req, res, next) => {console.log("req.body: ", req.body); next() ;},*/
        userValidator.schema,
        userValidator.validate,
        userController.signup
        );

// Login
router.post("/login",userController.login);


// Update user by id
router.put("/users/:uuid",
            multer,
            userController.updateById
        );

// Get user by id
router.get("/users/:uuid", userController.getById);

// ONLY FOR TEST , TO DELETE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Get all users 
router.get("/users", auth, userController.getAllUsers);

// Get user by id
router.delete("/users/:uuid", userController.deleteById);





module.exports = router;