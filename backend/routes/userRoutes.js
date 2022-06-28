"use strict";

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidator = require('../middlewares/validators/userValidator');
const multer = require('../middlewares/multerConfigAvatar');
const auth = require('../middlewares/auth');


// Login
router.post("/login", userController.login);

// New user
router.post("/users",
        multer,
        userValidator.schema,
        userValidator.validate,
        userController.signup
);

// Update user by id
router.put("/users/:uuid",
        auth,
        multer,
        userValidator.schema,
        userValidator.validate,
        userController.updateById
);

// Get user by id
router.get("/users/:uuid",
        auth,
        userController.getById
);


// Get all users 
// router.get("/users", auth, userController.getAllUsers);

// Delete user by id
// router.delete("/users/:uuid",
//         auth,
//         userController.deleteById
// );


module.exports = router;