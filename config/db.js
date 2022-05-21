const { Sequelize } = require('sequelize');

// DB CONNECTION CONFIGURATION
const sequelize = new Sequelize(
    process.env.DB_SCHEMA,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    });


// Test 





module.exports = sequelize;