const { Request, Response } = require("express");
const dotenv = require("dotenv");
const bot = require("../telegram");
const { allowedMimeTypes } = require("./config");
const fileSchema = require("../database/model");
const { getFileLink, checkMimeType } = require("../helpers");

dotenv.config();
const channelId = process.env.TELEGRAM_CHANNEL;
const getLink = (items) => {
    const result = items.map(async (item) => {
        const { file_id } = item;
        const file = await getFileLink(file_id);
        const thumbnail =
            item.thumb && (await getFileLink(item?.thumb?.file_id));
        return { file, thumbnail, width: item?.width, height: item?.height };
    });
    return Promise.all(result);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */

const upload = async (req, res) => {
    const { file, body } = req;
    const { caption = "" } = body;
    const buffer = Buffer.from(file.buffer);

    const mimeType = await checkMimeType(buffer);
    if (!allowedMimeTypes.includes(mimeType)) {
        return res.status(400).json({
            message: "File type not allowed",
        });
    }

    let send;

    if (mimeType.includes("image")) {
        send = await bot.sendPhoto(channelId, buffer, {
            caption,
            contentType: mimeType,
        });
    } else if (mimeType.includes("video")) {
        send = await bot.sendVideo(channelId, buffer, {
            caption,
            contentType: mimeType,
        });
    } else if (mimeType.includes("audio")) {
        send = await bot.sendAudio(channelId, buffer, {
            caption,
            contentType: mimeType,
        });
    } else if (mimeType.includes("application") || mimeType.includes("text")) {
        send = await bot.sendDocument(channelId, buffer, {
            fileType: mimeType,
        });
    }

    if (send) {
        const data = {
            id: send.message_id,
            filename: file.originalname,
            mimeType: mimeType,
            timestamp: Date.now(),
        };
        const base64 = Buffer.from(JSON.stringify(data)).toString("base64");
        const save = new fileSchema(
            {
                uuid: send.message_id,
                file_id: base64,
                file: await getLink(
                    send.photo || send.video || send.audio || send.document
                ),
                filename: file.originalname,
                mime_type: mimeType,
            },
            true
        );
        await save.save();
        return res.status(200).json({
            message: "File uploaded",
        });
    } else {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = upload;
