import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const MarkAttendance = ({ cls, close, fetchClasses }) => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [attendance, setAttendance] = useState({}); // {roll: 'P'/'A', ...}
    const [isSubmitting, setIsSubmitting] = useState(false);
    const studentRefs = useRef([]);

    // 1. Fetch Students on Load
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:4000/faculty/getEnrolledStudents/${cls.class_id}`
                );
                console.log(res.data);
                

                // Sort students: Branch -> Year -> Roll No (All are strings for consistent comparison)
                const sortedStudents = (res.data || []).sort((a, b) => {
                    if (a.branch < b.branch) return -1;
                    if (a.branch > b.branch) return 1;

                    if (a.year < b.year) return -1;
                    if (a.year > b.year) return 1;

                    return a.roll - b.roll;
                });

                setStudents(sortedStudents);

                // Initialize attendance state with all students marked as Absent ('A') by default
                const initialAttendance = sortedStudents.reduce((acc, student) => {
                    acc[student.roll] = 'A'; 
                    return acc;
                }, {});
                setAttendance(initialAttendance);

            } catch (err) {
                console.error("❌ Error fetching students for attendance:", err);
                alert("Failed to fetch student list.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [cls.class_id]);

    // 2. Focus Management (To scroll to the current student)
    useEffect(() => {
        if (studentRefs.current[currentIndex]) {
            studentRefs.current[currentIndex].scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [currentIndex, students.length]);

    // 3. Keyboard Event Handler
    const handleKeyPress = useCallback((event) => {
        if (isSubmitting || loading) return;

        const roll = students[currentIndex]?.roll;
        if (!roll) return;

        let newStatus = null;

        if (event.key === 'p' || event.key === 'P') {
            newStatus = 'P';
        } else if (event.key === 'a' || event.key === 'A') {
            newStatus = 'A';
        }

        if (newStatus) {
            setAttendance(prev => ({
                ...prev,
                [roll]: newStatus
            }));

            // Move to the next student
            if (currentIndex < students.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                alert("🎉 All students marked! Click 'Submit Attendance' to save.");
            }
        }
    }, [currentIndex, students, isSubmitting, loading]);

    // Attach/Detach keyboard listener
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    // 4. Submission Handler (CORRECTED TO SEND S_ID)

const handleSubmitAttendance = async () => {
    if (students.length === 0) return alert("No students to mark attendance for.");
    if (!window.confirm("Are you sure you want to submit this attendance record?")) return;

    setIsSubmitting(true);

    // 1. Identify which student rolls were marked 'P' using the attendance state
    const presentRolls = Object.keys(attendance).filter(roll => attendance[roll] === 'P');

    // 2. CRITICAL FIX: Map the PRESENT rolls back to their Student ID (s_id) 
    // by searching the original 'students' array using the roll number.
    const presentStudentsIDs = presentRolls
        .map(roll => {
            const student = students.find(s => s.roll === roll);
            // This ensures we return the 'id' (s_id) only if the student object is found
            return student ? student.student_id : null; 
        })
        .filter(id => id !== null && id !== undefined); // Filter out any null or undefined IDs

    const payload = {
        class_id: cls.class_id,
        present_students: presentStudentsIDs, // <-- This array should now contain s_id values like [4, 6]
    };

    console.log("Submitting Payload (Student IDs):", payload);
    console.log("Array to send:", presentStudentsIDs);

    if (presentStudentsIDs.length === 0 && presentRolls.length > 0) {
        // This is a debug alert: If rolls were marked present but no IDs were found.
        alert("⚠️ Students were marked present, but their Student IDs (s.id) could not be retrieved from the fetched list. Check your `getEnrolledStudents` backend data.");
    }
    
    // Allow submission even if no one is present (to increment total_held)
    // if (presentStudentsIDs.length === 0) {
    //     // Submission logic here if you want to skip the update but still run the API
    // }

    try {
        const res = await axios.post(
            `http://localhost:4000/faculty/markAttendance/${cls.class_id}`,
            payload
        );

        alert(`✅ Attendance submitted successfully! Total Present: ${presentStudentsIDs.length}`);
        
        if (fetchClasses) fetchClasses(); 

        close();
    } catch (err) {
        console.error("❌ Error submitting attendance:", err.response?.data || err);
        alert(`Failed to submit attendance. Detail: ${err.response?.data?.detail || 'Unknown error.'}`);
    } finally {
        setIsSubmitting(false);
    }
};

    if (loading) {
        return (
            <ModalBase close={close}>
                <div className="text-center p-10">
                    <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-4" viewBox="0 0 24 24">...</svg>
                    <p className="text-lg text-gray-700">Loading student list...</p>
                </div>
            </ModalBase>
        );
    }

    // --- Modal Structure and UI ---
    return (
        <ModalBase close={close}>
            <h2 className="text-3xl font-bold mb-2 text-indigo-700">
                📋 Mark Attendance: {cls.class_name}
            </h2>
            <p className="text-gray-500 mb-6 border-b pb-3">
                Date: {new Date().toLocaleDateString()} | Press **P** for Present, **A** for Absent.
            </p>

            {/* Control Panel */}
            <div className="flex justify-between items-center mb-4 bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                <div className="flex space-x-4">
                    <span className="font-semibold text-indigo-700">Total: {students.length}</span>
                    <span className="font-semibold text-green-700">Present: {Object.values(attendance).filter(s => s === 'P').length}</span>
                    <span className="font-semibold text-red-700">Absent: {Object.values(attendance).filter(s => s === 'A').length}</span>
                </div>
                <div className="text-sm text-gray-600">
                    Current: <span className="font-extrabold text-lg text-indigo-800">{currentIndex + 1}</span> / {students.length}
                </div>
            </div>

            {/* Student List */}
            <div className="max-h-[60vh] overflow-y-auto pr-3 space-y-2 border p-3 rounded-lg bg-white shadow-inner">
                {students.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">No students enrolled in this class.</p>
                ) : (
                    students.map((student, index) => (
                        <div
                            key={student.roll}
                            ref={el => studentRefs.current[index] = el}
                            className={`p-4 rounded-xl border-l-8 transition-all duration-200 shadow-md ${
                                index === currentIndex
                                    ? "bg-yellow-100 border-yellow-500 ring-4 ring-yellow-200 scale-[1.01]" // Currently selected
                                    : attendance[student.roll] === 'P'
                                    ? "bg-green-50 border-green-500" // Marked Present
                                    : "bg-red-50 border-red-500 opacity-70" // Marked Absent
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <p className="text-xl font-bold text-gray-800">{student.name}</p>
                                    <p className="text-sm text-indigo-600 font-mono">Roll No: {student.roll}</p>
                                    {/* Display the s_id for confirmation during testing */}
                                    <p className="text-xs text-gray-400">ID: {student.student_id}</p> 
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-600">
                                        {student.branch} - Year {student.year}
                                    </p>
                                    <p className={`text-2xl font-extrabold mt-1 ${attendance[student.roll] === 'P' ? 'text-green-700' : 'text-red-700'}`}>
                                        {attendance[student.roll] === 'P' ? 'PRESENT' : 'ABSENT'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between gap-4 pt-4 border-t">
                <button
                    onClick={handleSubmitAttendance}
                    disabled={isSubmitting || students.length === 0}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-200 disabled:opacity-50"
                >
                    {isSubmitting ? "Submitting..." : "💾 Submit Attendance"}
                </button>
                <button
                    onClick={close}
                    className="w-1/4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-xl transition duration-200"
                >
                    Close
                </button>
            </div>
        </ModalBase>
    );
};

// Reusable Modal Wrapper (Inspired by the ViewClasses modal structure)
const ModalBase = ({ children, close }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-8 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transition-transform duration-300">
            {children}
        </div>
    </div>
);

export default MarkAttendance;