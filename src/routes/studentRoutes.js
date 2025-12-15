const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/add", studentController.add);
router.delete("/delete/:id", studentController.delete);
router.put("/update/:id", studentController.update);
router.get("/all", studentController.getAll);
router.get("/by-level/:level", studentController.getByLevel);
router.get("/by-department/:departmentId", studentController.getByDepartment);
router.get("/:id", studentController.getOne);

module.exports = router;
