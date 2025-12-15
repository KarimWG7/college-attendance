const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const db = require("./models");
const errorHandler = require("./middlewares/errorHandler");

const departmentRoutes = require("./routes/departmentRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const enrolmentRoutes = require("./routes/enrolmentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const studentReportRoutes = require("./routes/studentReportRoutes");
const teacherControlRoutes = require("./routes/teacherControlRoutes");

// Routes
app.use("/api/departments", departmentRoutes);
app.use("/api/student", studentRoutes); // format.json uses /api/student
app.use("/api/courses", courseRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/enrolments", enrolmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/StudentReport", studentReportRoutes);
app.use("/api/TeacherControl", teacherControlRoutes);

// Sync Database
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });

// Error handling middleware
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  db.close();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
