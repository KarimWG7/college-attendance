const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/add", courseController.add);
router.delete("/delete/:id", courseController.delete);
router.put("/update/:id", courseController.update);
router.get("/all", courseController.getAll);
router.put("/change-instructor", courseController.changeInstructor);
router.get("/:id", courseController.getOne); // Keeping getOne for completeness though not explicitly in format.json list for Courses (it is for others)

module.exports = router;
