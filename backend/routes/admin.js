
///////////////// handeling the faculty /////////////////
import express from "express"
const router = express.Router();
import db from "../db.js";

// ✅ Add a New Faculty
router.post("/addFaculty",(req,res)=>{
    let {name , email ,password} = req.body
    let query = "insert into f_t (name , email ,password) values (?, ?, ?)";
    db.execute(query,[name, email, password]).then(res=>{console.log(res);
    }).catch((err)=>{console.log(err);
    })
res.json({message:"successfully added"})
})

// ✅ Get All Faculty
router.get("/getAllFaculty", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM f_t");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching faculty:", err);
    res.status(500).json({ error: "Error fetching faculty data" });
  }
});

// ✅ Delete Faculty by ID
router.delete("/deleteFaculty/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM f_t WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json({ message: "Faculty deleted successfully!" });
  } catch (err) {
    console.error("Error deleting faculty:", err);
    res.status(500).json({ error: "Error deleting faculty" });
  }
});

//////////////////// Courses Handling ////////////////////

// ✅ Add New Course
router.post("/addCourse", async (req, res) => {
    console.log(req.body);
    
  const { title, type, credits, code, dept } = req.body;
  try {
    const query = "INSERT INTO c_t (title, type, credits, code, dept) VALUES (?, ?, ?, ?, ?)";
    await db.execute(query, [ 
     title || null,
    type || null,
    credits || null,
    code || null,
    dept || null
]);
    res.json({ message: "Course added successfully!" });
  } catch (err) {
    console.error("Error adding course:", err);
    res.status(500).json({ error: "Error adding course" });
  }
});

// ✅ Get All Courses
router.get("/getAllCourses", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM c_t");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Error fetching course data" });
  }
});

// ✅ Update Course
router.put("/updateCourse/:id", async (req, res) => {
  const { id } = req.params;
  const { title, type, credits, code, dept } = req.body;
  try {
    await db.execute(
      "UPDATE c_t SET title = ?, type = ?, credits = ?, code = ?, dept = ? WHERE id = ?",
      [title, type, credits, code, dept, id]
    );
    res.json({ message: "Course updated successfully!" });
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ error: "Error updating course" });
  }
});

// ✅ Delete Course
router.delete("/deleteCourse/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM c_t WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted successfully!" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ error: "Error deleting course" });
  }
});

//////////////////// Students Handling ////////////////////

// ✅ Add New Student
router.post("/addStudent", async (req, res) => {
  const { name, roll, branch, enroll_year, password } = req.body; // roll as string
  try {
    const query =
      "INSERT INTO s_t (name, roll, branch, enroll_year, password) VALUES (?, ?, ?, ?, ?)";
    await db.execute(query, [name, roll, branch, enroll_year, password]);
    res.json({ message: "Student added successfully!" });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ error: "Error adding student" });
  }
});

// ✅ Get All Students
router.get("/getAllStudents", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM s_t");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Error fetching student data" });
  }
});

// ✅ Update Student
router.put("/updateStudent/:id", async (req, res) => {
  const { id } = req.params;
  const { name, roll, branch, enroll_year, password } = req.body;
  try {
    await db.execute(
      "UPDATE s_t SET name = ?, roll = ?, branch = ?, enroll_year = ?, password = ? WHERE id = ?",
      [name, roll, branch, enroll_year, password, id]
    );
    res.json({ message: "Student updated successfully!" });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: "Error updating student" });
  }
});

// ✅ Delete Student
router.delete("/deleteStudent/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM s_t WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully!" });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ error: "Error deleting student" });
  }
});

export default router;
