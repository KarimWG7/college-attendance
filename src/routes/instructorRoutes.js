const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");

router.post("/add", instructorController.add);
router.delete("/delete/:id", instructorController.delete);
router.put("/update/:id", instructorController.update);
router.get("/all", instructorController.getAll);
router.get("/:id", instructorController.getOne);

module.exports = router;
