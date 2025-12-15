const express = require("express");
const router = express.Router();
const enrolmentController = require("../controllers/enrolmentController");

router.post("/", enrolmentController.create);
router.get("/", enrolmentController.getAll);
router.get("/:id", enrolmentController.getOne);
router.put("/:id", enrolmentController.update);
router.delete("/:id", enrolmentController.delete);

module.exports = router;
