/**
 * Express Student Routes (student_routes.js)
 * * This file handles all API requests related to student data, joining data
 * from s_t, rec_t, cls_t, c_t, and f_t tables as per the provided schema.
 */
import express from "express"
const router = express.Router();
// Assuming a MySQL connection pool is correctly initialized and exported from db.js
import db from "../db.js"; 

/**
 * Route 1: Get Student Profile Details
 * Query: SELECT id, name, roll, branch, enroll_year FROM s_t WHERE id = ?
 */
router.get('/:studentId/profile', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        
        // --- REAL DATABASE QUERY ---
        // Fetch base student details
        const sql = `SELECT id, name, roll, branch, enroll_year FROM s_t WHERE id = ?`;
        // Assuming db.query returns [resultsArray, fields]
        const [results] = await db.query(sql, [studentId]);
        
        const profile = results.length > 0 ? results[0] : null;

        if (!profile) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        // Calculate dynamic fields for frontend logic
        profile.current_year = new Date().getFullYear() - profile.enroll_year + 1;
        profile.branch_full = profile.branch === 'CSE' ? 'Computer Science and Engineering' : profile.branch;

        // Mocked email since s_t doesn't contain an email column in the provided schema dump
        profile.email = `${profile.name.replace(/\s/g, '').toLowerCase()}@nituk.ac.in`; 

        res.json(profile);
    } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ message: 'Internal Server Error during profile fetch' });
    }
});

/**
 * Route 2: Get All Classes Data (Current & Completed)
 * Query: Complex JOIN involving rec_t, cls_t, c_t, f_t
 */
router.get('/:studentId/classes', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        
        // --- REAL DATABASE QUERY (Complex JOIN) ---
    const sql = `
    SELECT
        r.grades,
        r.mt_marks,
        r.et_marks,
        r.attendance AS attended_classes,
        c.total_held,
        cr.title AS course_title,
        cr.code,
        f.name AS faculty_name
    FROM rec_t r
    JOIN cls_t c ON r.cls_id = c.id
    JOIN c_t cr ON c.c_id = cr.id
    JOIN f_t f ON c.f_id = f.id
    WHERE r.s_id = ?;
`;

        const [results] = await db.query(sql, [studentId]);

        // Process results to calculate attendance percentage and status
        const processedResults = results.map(cls => {
            // Use defaults of 0 for safety
            const totalHeld = cls.total_held || 0;
            const attendedClasses = cls.attended_classes || 0;
            
            return {
                ...cls,
                // Calculate percentage
                attendance_percent: totalHeld > 0 ? (attendedClasses / totalHeld) * 100 : 0,
                is_completed: cls.grades !== null // Mark as completed if a grade is assigned
            };
        });

        res.json(processedResults);
    } catch (error) {
        console.error('Error fetching student classes:', error);
        res.status(500).json({ message: 'Internal Server Error during classes fetch' });
    }
});

export default router
