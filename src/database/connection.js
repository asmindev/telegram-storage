const mongoose = require("mongoose");
const FileSchema = require("./model");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.log(error);
        console.error("MongoDB connection FAIL");
        process.exit(1);
    }
};

module.exports = connectDB;
