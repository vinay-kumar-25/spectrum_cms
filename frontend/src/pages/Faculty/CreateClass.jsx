import React, { useState } from "react";
import axios from "axios";

const Create_Class = () => {
  const [facultyEmail, setFacultyEmail] = useState("vinaykumar@gmail.com");
  const [courseCode, setCourseCode] = useState("CSL354");
  const [className, setClassName] = useState(""); // ✅ new field
  const [totalClasses, setTotalClasses] = useState("36");
  const server = "http://localhost:4000/faculty/createClass";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!facultyEmail || !courseCode || !className || !totalClasses) {
      alert("⚠️ Please fill all fields properly before proceeding.");
      return;
    }

    try {
      await axios.post(server, {
        faculty_email: facultyEmail,
        course_code: courseCode,
        class_name: className, // ✅ send class name to backend
        total_classes: totalClasses,
      });

      alert(`✅ Class "${className}" created successfully!`);
      // Optionally clear the fields
      // setFacultyEmail("");
      // setCourseCode("");
      // setClassName("");
      // setTotalClasses("");
    } catch (err) {
      console.error(err);
      alert("❌ Error creating class. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-sky-200">
        <h2 className="text-2xl font-bold text-sky-800 text-center mb-6">
          Create New Class
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={facultyEmail}
            onChange={(e) => setFacultyEmail(e.target.value)}
            type="email"
            placeholder="Faculty Email (e.g., john.doe@nituk.ac.in)"
            className="p-3 rounded-lg border border-sky-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />

          <input
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            type="text"
            placeholder="Course Code (e.g., CSE305)"
            className="p-3 rounded-lg border border-sky-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />

          {/* ✅ Class Name input */}
          <input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            type="text"
            placeholder="Class Name (e.g., CSE 3rd Year - Batch A)"
            className="p-3 rounded-lg border border-sky-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />

          <input
            value={totalClasses}
            onChange={(e) => setTotalClasses(e.target.value)}
            type="number"
            placeholder="Total Number of Classes"
            className="p-3 rounded-lg border border-sky-300 focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />

          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Create Class
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Faculty Dashboard • NIT Uttarakhand
        </div>
      </div>
    </div>
  );
};

export default Create_Class;
