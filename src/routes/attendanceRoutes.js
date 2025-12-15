const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/scan", attendanceController.scan);

// Keep other CRUD routes for admin purposes if needed, or remove if strictly following format.json
// format.json only shows /scan for Attendance.
// I will keep them but maybe comment them out or leave them as they are useful.
// The user asked to "format the routes... as what this file says".
// I should probably strictly follow it for the main paths, but keeping CRUD is usually good practice unless forbidden.
// I'll add scan and keep others.

router.post("/", attendanceController.create);
router.get("/", attendanceController.getAll);
router.get("/:id", attendanceController.getOne);
router.put("/:id", attendanceController.update);
router.delete("/:id", attendanceController.delete);

module.exports = router;
