import React, { useState } from "react";
import axios from "axios";

const Add_Course = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("theory");
  const [credits, setCredits] = useState("");
  const [dept, setDept] = useState("CSE");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const server = "http://localhost:4000/admin/addCourse";

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !code || !credits) {
      showToast("Please fill all required fields!", "error");
      return;
    }

    setLoading(true);
    try {
      await axios.post(server, { title, type, credits, code, dept });
      showToast("✅ Course added successfully!");
      setTitle("");
      setCode("");
      setType("theory");
      setCredits("");
      setDept("CSE");
    } catch (err) {
      console.error(err);
      showToast("❌ Error adding course.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="w-full max-w-md bg-yellow-50 p-6 rounded-2xl shadow-md border border-yellow-200 relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-center text-yellow-700 mb-6">
          Add New Course
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Course Title"
            className="p-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="text"
            placeholder="Course Code (e.g., CSE101)"
            className="p-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="theory">Theory</option>
            <option value="practical">Practical</option>
          </select>

          <input
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            type="number"
            placeholder="Credits"
            min="1"
            className="p-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="p-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="Humanities">Humanities</option>
            <option value="Mathematics">Mathematics</option>
            <option value="CSE">CSE</option>
            <option value="Mech">Mech</option>
            <option value="Civil">Civil</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Sports">Sports</option>
            <option value="Others">Others</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>

        {/* ✅ Toast Notification */}
        {toast && (
          <div
            className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg font-semibold shadow-md ${
              toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-yellow-500 text-white"
            }`}
          >
            {toast.msg}
          </div>
        )}
      </div>
    </div>
  );
};

export default Add_Course;
