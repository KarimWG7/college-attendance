const express = require("express");
const router = express.Router();
const teacherControlController = require("../controllers/teacherControlController");

router.post("/open-lecture/:lectureId", teacherControlController.openLecture);
router.post("/close-lecture/:lectureId", teacherControlController.closeLecture);
router.put("/change-room/:lectureId", teacherControlController.changeRoom);
router.post("/force-attendance", teacherControlController.forceAttendance);
router.post("/mark-absent", teacherControlController.markAbsent);
router.post("/remove-attendance", teacherControlController.removeAttendance);
router.post("/mark-late", teacherControlController.markLate);
router.get(
  "/present-students/:lectureId",
  teacherControlController.getPresentStudents
);
router.get(
  "/absent-students/:lectureId",
  teacherControlController.getAbsentStudents
);
router.post("/block-student", teacherControlController.blockStudent);

module.exports = router;
