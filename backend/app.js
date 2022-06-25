const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const helmet = require('helmet');
const path = require('path');


const app = express();

// MIDDLEWARES

// Body parser
app.use(express.json());

// Debugging information
//app.use(morgan('combined'));

// Static paths for images
app.use("/images/avatars/", express.static(path.join(__dirname, "images/avatars")));
app.use("/images/posts/", express.static(path.join(__dirname, "images/posts")))


//app.use(helmet());

// Enable CORS
 app.use(cors());


 // ROUTES

// User routes
app.use("/api/v1",userRoutes);

// Post routes
app.use("/api/v1/posts", postRoutes);

module.exports = app;