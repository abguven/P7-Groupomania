"use strict";

const multer = require('multer');
const uuid4 = require("uuid").v4;

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

// Configuration for upladed files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/posts")
    },
    filename: (req, file, cb) => {
        // prepare a filename for maximum OS compatibility
        const name = file.originalname.toLowerCase().split(" ").join("_");
        
        // add unique identifier before filename to prevent duplicate names
        const newFileName = uuid4().replace(/-/g, "") + name;
        cb(null, newFileName);
    }
});

/**
 * Filter files which are not allowed for uploading * 
 */
const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(0, true);
    } else {
        req.fileMimeValidationError = lang.ERRMSG_FILE_VALIDATION_ONLY_FOLLOWING_TYPES_ALLOWED
            + ALLOWED_MIME_TYPES.join(", ");
        cb(0, false);
        //cb(new Error("Only .png .jpg and .jpeg format allowed"))
    }
}


module.exports = multer({ storage, fileFilter: fileFilter }).single("postImage");
