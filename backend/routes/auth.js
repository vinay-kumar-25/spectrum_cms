import express from "express";
import db from "../db.js";

const router = express.Router();
router.post("/:role", async (req, res) => {
  console.log("hey i am working here of login");
  
 const { role } = req.params;
 const { email, password } = req.body;

 console.log(`🔹 Login attempt -> Role: ${role}, Email: ${email} ,Password: ${password}`);

 // Validate request
 if (!email || !password) {
  return res.status(400).json({ error: "Email and password are required" });
 }

 // Map role to table name
 const tableMap = {
  admin: "a_t",
  faculty: "f_t",
  student: "s_t",
 };

 const table = tableMap[role];
 if (!table) {
  return res.status(400).json({ error: "Invalid role" });
 }

 try {
  // Adjust column names as per your actual DB schema
  const query = `SELECT * FROM ${table} WHERE email = ? AND password = ?`;

    // Assuming db.query now returns a promise
    // It will be an array where the first element is results, second is fields.
  const [results] = await db.query(query, [email,password]); 

  if (results.length === 0) {
   console.log("❌ Invalid credentials for", role);
   return res.status(401).json({ error: "Invalid email or password" });
  }

  // ✅ Successful login
  console.log("✅ Login success for", role, ":", email);
  const user = results[0];
  return res.status(200).json({
   message: "Login successful",
   role,
   user: {
    id: user.id,
    name: user.name,
    email: user.email,
   },
  });

 } catch (err) {
    // This now catches errors from the asynchronous db.query call
  console.error("🔥 DB or Server error:", err); 
  res.status(500).json({ error: "Internal server error or Database error" });
 }
});

export default router;