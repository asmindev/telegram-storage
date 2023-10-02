const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const FileSchema = new mongoose.Schema(
    {
        uuid: {
            type: Number,
            required: true,
            unique: true,
        },
        file_id: {
            type: String,
            required: true,
            unique: true,
        },
        file: {
            type: Array || Object,
            required: true,
        },
        filename: {
            type: String,
            required: true,
        },
        mime_type: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("File", FileSchema);
