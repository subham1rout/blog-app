const express = require("express");
const router = express.Router();

router.use(express.json());

const controller = require("../controller/blog-controller");

router.get("/posts", controller.fetchAllPost);
router.post("/posts", controller.savePost);
router.put("/posts", controller.updatePost);
router.delete("/posts", controller.deletePost);

module.exports = router;