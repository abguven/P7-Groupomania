'use strict';
require("dotenv").config();

const ps = require("prompt-sync")({ sigint: true });

async function main(){
    await sequelize.sync({ force: true });
}

const environment = process.env.NODE_ENV;

if (!(environment.toLowerCase() == "development" || environment.toLowerCase() == "test")){
    console.log("You can't call this function if you're not in development or test mode!!!");
    process.exit(-1);
}

/* ATTENTION ONLY USE IT IN ENVIRONEMENT MODE */
const { sequelize } = require('./models/index');

let strResponse = ps("This operation will delete all records in the Database.Are you sure? (y/N) : ");

const response = strResponse.toUpperCase() == "Y" ? true : false;

if(response){
    console.log("Deleting database");
    main();
}else{
    console.log("Quiting...");
}