import express from "express";
import db from "../db.js";
const router = express.Router();

/* ----------------------------- CREATE CLASS ----------------------------- */
router.post("/createClass", async (req, res) => {
  const { faculty_email, course_code, total_classes, class_name } = req.body;

  if (!faculty_email || !course_code || !total_classes || !class_name)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    const [facultyRows] = await db.query("SELECT id FROM f_t WHERE email = ?", [
      faculty_email,
    ]);
    if (facultyRows.length === 0)
      return res.status(404).json({ error: "Faculty not found" });
    const f_id = facultyRows[0].id;

    const [courseRows] = await db.query("SELECT id FROM c_t WHERE code = ?", [
      course_code,
    ]);
    if (courseRows.length === 0)
      return res.status(404).json({ error: "Course not found" });
    const c_id = courseRows[0].id;

    // NOTE: 'count' maps to 'total_classes' (expected lectures)
    const [insertResult] = await db.query(
      "INSERT INTO cls_t (name, f_id, c_id, count) VALUES (?, ?, ?, ?)",
      [class_name, f_id, c_id, total_classes]
    );

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      class_id: insertResult.insertId,
      class_name,
    });
  } catch (err) {
    console.error("❌ Error creating class:", err);
    res.status(500).json({ error: "Database error creating class" });
  }
});

/* ----------------------------- VIEW CLASSES (UPDATED) ----------------------------- */
router.get("/viewClasses/:f_id", async (req, res) => {
  const { f_id } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT cls_t.id AS class_id, cls_t.name AS class_name,
              c_t.title AS course_title, c_t.code AS course_code, 
              c_t.type AS course_type, c_t.credits AS course_credits, 
              cls_t.count AS total_classes,
              cls_t.total_held, 
              cls_t.strength
        FROM cls_t
        JOIN c_t ON cls_t.c_id = c_t.id
        WHERE cls_t.f_id = ?`,
      [f_id]
    );
    if (rows.length === 0)
      return res
        .status(404)
        .json({ message: "No classes found for this faculty." });
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching classes:", err);
    res.status(500).json({ error: "Database error fetching classes" });
  }
});

/* ----------------------------- ADD STUDENT TO CLASS (UPDATED) ----------------------------- */
router.post("/addStudentsToClass", async (req, res) => {
  const { cls_id, student_ids } = req.body;

  if (!cls_id || !Array.isArray(student_ids) || student_ids.length === 0)
    return res.status(400).json({ error: "Missing or invalid data" });

  const connection = db; 

  try {
    await connection.beginTransaction();
    let studentsAddedCount = 0;

    for (const s_id of student_ids) {
      // Use INSERT IGNORE to prevent adding duplicates to rec_t
      const [insertResult] = await connection.query(
        "INSERT IGNORE INTO rec_t (cls_id, s_id, attendance, mt_marks, et_marks, grades) VALUES (?, ?, 0, 0, 0, NULL)",
        [cls_id, s_id]
      );
      
      // Check if a new row was inserted (affectedRows will be 1 if inserted, 0 if ignored)
      if (insertResult.affectedRows > 0) {
          studentsAddedCount++;
      }
    }
    
    // 💡 NEW STEP: Update class strength in cls_t only if new students were added
    if (studentsAddedCount > 0) {
        await connection.query(
            "UPDATE cls_t SET strength = strength + ? WHERE id = ?",
            [studentsAddedCount, cls_id]
        );
        console.log(`✅ Class strength updated for class ${cls_id}. Added ${studentsAddedCount} new students.`);
    }


    await connection.commit();
    res.json({
      success: true,
      message: `${studentsAddedCount} new students added successfully to class (Skipped ${student_ids.length - studentsAddedCount} existing).`,
      students_added: studentsAddedCount,
    });
  } catch (err) {
    await connection.rollback();
    console.error("❌ Error adding students:", err);
    res.status(500).json({ error: "Database error adding students" });
  }
});



/* ----------------------------- DELETE CLASS ----------------------------- */
router.delete("/deleteClass/:cls_id", async (req, res) => {
  const { cls_id } = req.params;

  try {
    // ✅ First, remove all related records in rec_t
    await db.query("DELETE FROM rec_t WHERE cls_id = ?", [cls_id]);

    // ✅ Then, delete the class entry itself
    const [result] = await db.query("DELETE FROM cls_t WHERE id = ?", [cls_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.json({ success: true, message: "✅ Class deleted successfully!" });
  } catch (err) {
    console.error("❌ Error deleting class:", err);
    res.status(500).json({ error: "Database error while deleting class" });
  }
});


/* ----------------------------- GET ENROLLED STUDENTS ----------------------------- */
router.get("/getEnrolledStudents/:cls_id", async (req, res) => {
  const { cls_id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT s.id AS student_id, s.name, s.roll, s.branch, s.enroll_year
       FROM rec_t r
       JOIN s_t s ON r.s_id = s.id
       WHERE r.cls_id = ?`,
      [cls_id]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching enrolled students:", err);
    res.status(500).json({ error: "Database error while fetching enrolled students" });
  }
});


   /* ----------------------------- MARK DAILY ATTENDANCE (Cumulative Update) - WITHOUT TRANSACTION ----------------------------- */
router.post("/markAttendance/:class_id", async (req, res) => {
  const { class_id } = req.params; 
  
  // 💡 FIX: Destructure the key that the frontend actually sends (usually 'present_students') 
  // and alias it to the local variable name 'presentStudentIDs'.
  // We use a default value of [] to ensure it's always an array for safety.
  const { present_students: presentStudentIDs = [] } = req.body; 

  console.log(`\n--- ATTENDANCE SUBMISSION START ---`);
  console.log(`Class ID: ${class_id}`);
  
  // 💡 FIX: Safely check if the variable is an array before using .join() to prevent TypeError.
  const studentIdsString = Array.isArray(presentStudentIDs) 
    ? presentStudentIDs.join(', ') 
    : '[] (Invalid Data)';
      
  console.log(`Present Student IDs: [${studentIdsString}]`);

  // --- Input Validation ---
  if (!class_id) {
    return res.status(400).json({ error: "Missing class ID in URL parameter." });
  }
  if (!Array.isArray(presentStudentIDs)) {
     return res.status(400).json({ error: "Present students data must be an array." });
  }
  // --- End Validation ---


  try {
    // 1. Increment the TOTAL CLASSES HELD count (total_held) in the class table (cls_t)
    // This is known to be working.
    const [classUpdateResult] = await db.query(
      "UPDATE cls_t SET total_held = total_held + 1 WHERE id = ?",
      [class_id]
    );

    console.log(`Step 1 (cls_t update): Rows affected = ${classUpdateResult.affectedRows}`);


    // 2. Increment the 'attendance' count for all PRESENT students in the record table (rec_t)
    if (presentStudentIDs.length > 0) {
      // 💡 FIX: Using the correct, modern syntax 'IN (?)' for passing an array 
      // of IDs to the MySQL driver, which runs successfully in the terminal.
      const [recUpdateResult] = await db.query(
        "UPDATE rec_t SET attendance = attendance + 1 WHERE cls_id = ? AND s_id IN (?)",
        [class_id, presentStudentIDs] 
      );
      
      console.log(`Step 2 (rec_t update): Rows affected = ${recUpdateResult.affectedRows}`);
      
      // Explicitly check for 0 rows affected to help with debugging data issues
      if (recUpdateResult.affectedRows === 0) {
          throw new Error("Attendance update failed: 0 rows affected in rec_t. Check s_id/cls_id data integrity.");
      }
    }

    // ✅ Success Response
    res.json({ 
        success: true, 
        message: `Attendance marked successfully. Present: ${presentStudentIDs.length} students. Total classes held incremented.` 
    });

  } catch (err) {
    // ❌ Error Handling
    const detail = err.message || err.sqlMessage || "Unknown database error.";
    console.error("❌ CRITICAL DATABASE ERROR:", detail);
    
    res.status(500).json({ 
        error: "Database error during attendance submission. See console for details.",
        detail: detail
    });

  } finally {
      console.log(`--- ATTENDANCE SUBMISSION END ---\n`);
  }
});

export default router;
