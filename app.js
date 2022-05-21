const express = require('express');
//const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require("./routes/userRoutes");
const helmet = require('helmet');
const path = require('path');


const app = express();

// MIDDLEWARES

// Body parser
app.use(express.json());

// Debugging information
app.use(morgan('combined'));

// Static path for /images/
app.use("/images/avatars", express.static(path.join(__dirname, "images/avatars")));


//app.use(helmet());

// Enable CORS
// app.use(cors());


// ROUTES

// User routes
app.use("/api/v1",userRoutes);



module.exports = app;