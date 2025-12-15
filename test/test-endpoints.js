const http = require("http");

const makeRequest = (method, path, data) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 3001,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body: body });
        }
      });
    });

    req.on("error", (e) => reject(e));

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};

const runTests = async () => {
  console.log("Starting Tests...");

  // 1. Create Department
  console.log("\n1. Testing Create Department...");
  const createRes = await makeRequest("POST", "/api/departments", {
    name: "Computer Science",
  });
  console.log("Status:", createRes.status);
  console.log("Body:", createRes.body);
  const deptId = createRes.body.data ? createRes.body.data.id : null;

  if (!deptId) {
    console.error("Failed to create department, aborting tests.");
    return;
  }

  // 2. Search Department
  console.log("\n2. Testing Search Department...");
  const searchRes = await makeRequest(
    "GET",
    "/api/departments/search?name=Computer"
  );
  console.log("Status:", searchRes.status);
  console.log("Body:", searchRes.body);

  // 3. Delete Department
  console.log("\n3. Testing Delete Department...");
  const deleteRes = await makeRequest("DELETE", `/api/departments/${deptId}`);
  console.log("Status:", deleteRes.status);
  console.log("Body:", deleteRes.body);

  // 4. Verify Deletion (Search again)
  console.log("\n4. Verifying Deletion...");
  const verifyRes = await makeRequest(
    "GET",
    `/api/departments/search?name=Computer`
  );
  console.log("Status:", verifyRes.status);
  console.log("Body:", verifyRes.body); // Should be empty or not contain the deleted one

  // 5. Test Error Handling (Invalid Name)
  console.log("\n5. Testing Error Handling (Invalid Name)...");
  const errorRes = await makeRequest("POST", "/api/departments", { name: "" });
  console.log("Status:", errorRes.status);
  console.log("Body:", errorRes.body);
};

// Wait for server to start (manual delay if running immediately after start)
setTimeout(runTests, 2000);
