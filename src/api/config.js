// allowed mime types. image, video, audio, document
const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/webm",
    "video/ogg",
    "audio/mpeg",
    "audio/ogg",
    "audio/wav",
    "audio/webm",
    "application/pdf",
    "application/msword",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint",
    "application/zip",
    "application/x-rar-compressed",
    "application/octet-stream",
    // file python
    "text/plain",
];

module.exports = {
    allowedMimeTypes,
};
