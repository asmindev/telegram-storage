// make router with express

const Router = require("express").Router;
const upload = require("./upload");
const uploadMulter = require("./uploadMulter");
const getFile = require("./getFile");
const getAllFile = require("./getAllFile");
const deleteAllFile = require("./deleteAll");

const router = Router();

router.post("/upload", uploadMulter.single("file"), upload);
router.get("/file/:id", getFile);
router.get("/files", getAllFile);
router.delete("/files", deleteAllFile);
router.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
    });
});

module.exports = router;
