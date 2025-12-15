const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

router.post("/", departmentController.create);
router.delete("/:id", departmentController.delete);
router.get("/search", departmentController.search);
router.get("/", departmentController.search); // Allow listing all if no query

module.exports = router;
