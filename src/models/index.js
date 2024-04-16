const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        mongoose.connect("mongodb://localhost:27017/echoverse");
        console.log("Successfully connected to database");
    } catch (error) {
        console.log("Db connection error!");
        console.error(error);
    }
}

module.exports = {
    connectToDatabase,
};
