const API_URL = "http://localhost:3002/api";

async function post(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`POST ${url} failed: ${response.status} ${text}`);
  }
  return response.json();
}

async function get(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GET ${url} failed: ${response.status} ${text}`);
  }
  return response.json();
}

async function testEndpoints() {
  try {
    console.log("Starting comprehensive tests...");

    // --- Departments ---
    console.log("\n--- Testing Departments ---");
    const deptRes = await post(`${API_URL}/departments`, {
      name: "Computer Science",
    });
    console.log("Create Department:", deptRes);
    const deptId = deptRes.data.id;

    // --- Students ---
    console.log("\n--- Testing Students ---");
    const studentRes = await post(`${API_URL}/students`, {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      departmentId: deptId,
    });
    console.log("Create Student:", studentRes);
    const studentId = studentRes.data.id;

    // --- Courses ---
    console.log("\n--- Testing Courses ---");
    const courseRes = await post(`${API_URL}/courses`, {
      name: "Intro to Programming",
    });
    console.log("Create Course:", courseRes);
    const courseId = courseRes.data.id;

    // --- Instructors ---
    console.log("\n--- Testing Instructors ---");
    const instructorRes = await post(`${API_URL}/instructors`, {
      firstName: "Jane",
      lastName: "Smith",
      gmail: "jane.smith@gmail.com",
    });
    console.log("Create Instructor:", instructorRes);
    const instructorId = instructorRes.data.id;

    // --- Lectures ---
    console.log("\n--- Testing Lectures ---");
    const lectureRes = await post(`${API_URL}/lectures`, {
      courseId: courseId,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString(),
      room: "101A",
    });
    console.log("Create Lecture:", lectureRes);
    const lectureId = lectureRes.data.id;

    // --- LectureSessions ---
    console.log("\n--- Testing LectureSessions ---");
    const sessionRes = await post(`${API_URL}/lecture-sessions`, {
      lectureId: lectureId,
      date: new Date().toISOString(),
      code: "ATT123",
      state: "Active",
    });
    console.log("Create LectureSession:", sessionRes);
    const sessionId = sessionRes.data.id;

    // --- Enrolments ---
    console.log("\n--- Testing Enrolments ---");
    const enrolmentRes = await post(`${API_URL}/enrolments`, {
      studentId: studentId,
      courseId: courseId,
    });
    console.log("Create Enrolment:", enrolmentRes);
    const enrolmentId = enrolmentRes.data.id;

    // --- Verification (Get All) ---
    console.log("\n--- Verifying Data Existence ---");
    const allDepts = await get(`${API_URL}/departments`);
    console.log(`Departments count: ${allDepts.data.length}`);

    const allStudents = await get(`${API_URL}/students`);
    console.log(`Students count: ${allStudents.data.length}`);

    const allCourses = await get(`${API_URL}/courses`);
    console.log(`Courses count: ${allCourses.data.length}`);

    const allInstructors = await get(`${API_URL}/instructors`);
    console.log(`Instructors count: ${allInstructors.data.length}`);

    const allLectures = await get(`${API_URL}/lectures`);
    console.log(`Lectures count: ${allLectures.data.length}`);

    const allSessions = await get(`${API_URL}/lecture-sessions`);
    console.log(`LectureSessions count: ${allSessions.data.length}`);

    const allEnrolments = await get(`${API_URL}/enrolments`);
    console.log(`Enrolments count: ${allEnrolments.data.length}`);

    console.log("\nAll tests passed successfully!");
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testEndpoints();
