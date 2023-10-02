const bot = require("../telegram");

const getFile = async (req, res) => {
    const { id } = req.params;
    const file = await bot.getFileLink(id);
    res.json(file);
};

module.exports = getFile;
