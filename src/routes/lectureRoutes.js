const express = require("express");
const router = express.Router();
const lectureController = require("../controllers/lectureController");

router.post("/add", lectureController.add);
router.delete("/delete/:id", lectureController.delete);
router.put("/update/:id", lectureController.update);
router.get("/all", lectureController.getAll);
router.get("/:id", lectureController.getOne);

module.exports = router;
