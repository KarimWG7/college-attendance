const express = require("express");
const router = express.Router();
const studentReportController = require("../controllers/studentReportController");

router.get("/basic/:studentId", studentReportController.getBasicReport);
router.get("/by-course/:studentId", studentReportController.getReportByCourse);
router.get("/by-month/:studentId", studentReportController.getReportByMonth);

module.exports = router;
