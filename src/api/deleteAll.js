const conn = require("../database/model");

const deleteAllFile = async (req, res) => {
    try {
        const data = await conn.deleteMany();
        res.status(200).json({
            message: "success",
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = deleteAllFile;
