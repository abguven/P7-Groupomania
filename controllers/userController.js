"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sequelize, User } = require('../models');
const errHandler = require('./errorHandler');
const fs = require('fs');

/**
 * Create new user
 */
exports.signup = async (req, res) => {

    // Get data from request body
    const { email, password, user_name, last_name }
        = req.body;

    try {
        // Prepare url for uploaded image
        let avatar_url = "";
        if (req.file) {
            avatar_url = `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`
        }
        // Creating user in database
        const user = await User.create({
            email,
            password,
            user_name,
            last_name,
            avatar_url
        });

        // Success response
        return res.status(201).json(user);
    } catch (error) {
        errHandler(error, res);
    }

} // exports.signup = async (req, res)

/**
 * Update by id
 */
exports.updateById = async (req, res) => {

    // Get data from request body
    const { email, password, user_name, last_name, resetAvatar }
        = req.body;

    try {
        const user = await User.findByPk(req.params.uuid);
        // User not found
        if (user === null) {
            return res.status(404).json({ error: lang.ERR_USER_NOT_FOUND });
        }

        // Authorisation check
        if (req.auth.userId != user.uuid) {
            return res.status(403).json({ error: lang.ERR_NOT_AUTHORISED_FOR })
        }

        user.email = email;
        if (password){
            console.log(`Setting password to : ${password}`);
            user.password = password;
        }
        user.user_name = user_name;
        user.last_name = last_name;


        // Update "user.avatar_url" with new file and delete the old file
        if (req.file) {
            // Try deleting old file
            const oldFileName = user.avatar_url.split("/images/avatars")[1];
            const oldFilePath = "images/avatars/" + oldFileName;
            
            // Check if the file exists
            fs.stat(oldFilePath, function (err, stat) {
                if (err == null) {
                    fs.unlinkSync(oldFilePath); // Delete file if exists
                    console.log(`${oldFilePath} deleted`)
                } else {
                    console.log(`Can't delete ${oldFilePath} `)
                }
            });

            // Set new file's url
            user.avatar_url = `${req.protocol}://${req.get('host')}/images/avatars/${req.file.filename}`;
        }else{
            if (resetAvatar){
                user.avatar_url = "";
            }
        } 
        await user.save();
        return res.status(200).json({ user });

    } catch (error) {
        errHandler(error, res);
    }

}


// Get all users
exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            errHandler(error, res);
        })
}

// Get user by id
exports.getById = (req, res) => {
    User.findByPk(req.params.uuid)
        .then(user => {
            if (user === null) {
                return res.status(404).json({ error: lang.ERR_USER_NOT_FOUND });
            }
            res.status(200).json(user);
        })
        .catch(error => {
            errHandler(error, res);
        })
}

// Delete user by id
exports.deleteById = (req, res) => {
    User.findByPk(req.params.uuid)
        .then(user => {
            if (user === null) {
                return res.status(404).json({ error: lang.ERR_USER_NOT_FOUND });
            }
            // Authorisation check
            if (req.auth.userId != user.uuid && !req.auth.isAdmin) {
                console.log("req.auth : ", req.auth);
                return res.status(403).json({ error: lang.ERR_NOT_AUTHORISED_FOR })
            }
            // Delete the user
            user.destroy();
            res.status(200).json({ message: lang.MSG_USER_DELETED });
        })
        .catch(error => errHandler(error, res))
}


// Login
exports.login = (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
        .then(user => {
            if (user === null) {
                return res.status(404).json({ error: lang.ERR_EMAIL_NOT_FOUND })
            }
            // Verify password
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).json(({ error: lang.ERR_INCORRECT_PASSWORD }))
            }
            // Authentication succeed
            const token = jwt.sign({
                userId: user.uuid,
                isAdmin: (user.role === 'admin')
            },
                process.env.JWT_KEY,
                { expiresIn: "24h" }
            );

            res.status(200).json({ userId: user.uuid, token: token });
        })
        .catch(err => errHandler(error, res))

} // exports.login = (req, res) 

