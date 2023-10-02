const bot = require("../telegram");

const getFileLink = async (id) => {
    const file = await bot.getFileLink(id);
    console.log(file);
    return file;
};

const checkMimeType = async (buffer) => {
    const fileType = await import("file-type");
    try {
        const { mime } = await fileType.fileTypeFromBuffer(buffer);
        return mime;
    } catch (error) {
        return "application/octet-stream";
    }
};

module.exports = {
    getFileLink,
    checkMimeType,
};
