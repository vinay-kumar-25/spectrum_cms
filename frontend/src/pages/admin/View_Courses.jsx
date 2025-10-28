import React, { useEffect, useState } from "react";
import axios from "axios";

const View_Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterCredits, setFilterCredits] = useState("");
  const [updateModal, setUpdateModal] = useState(null);
  const [toast, setToast] = useState(null);

  const server = "http://localhost:4000/admin";

  // Fetch courses
  useEffect(() => {
    axios
      .get(`${server}/getAllCourses`)
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data);
      })
      .catch(() => showToast("Error fetching courses", "error"))
      .finally(() => setLoading(false));
  }, []);

  // Filter logic
  useEffect(() => {
    let temp = [...courses];

    if (searchTerm) {
      temp = temp.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (c.code && c.code.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterType) temp = temp.filter((c) => c.type === filterType);
    if (filterDept) temp = temp.filter((c) => c.dept === filterDept);
    if (filterCredits) temp = temp.filter((c) => c.credits == filterCredits);

    setFilteredCourses(temp);
  }, [searchTerm, filterType, filterDept, filterCredits, courses]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Delete Course
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`${server}/deleteCourse/${id}`);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      showToast("Course deleted successfully!");
    } catch (err) {
      console.error(err);
      showToast("Error deleting course", "error");
    }
  };

  // Update Course
  const handleUpdate = async () => {
    const { id, title, type, credits, dept, code } = updateModal;
    if (!title || !type || !credits || !dept || !code)
      return showToast("All fields are required", "error");

    try {
      await axios.put(`${server}/updateCourse/${id}`, {
        title,
        type,
        credits,
        dept,
        code,
      });

      setCourses((prev) =>
        prev.map((c) => (c.id === id ? updateModal : c))
      );

      showToast("Course updated successfully!");
      setUpdateModal(null);
    } catch (err) {
      console.error(err);
      showToast("Error updating course", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center text-yellow-700 font-semibold">
        Loading courses...
      </div>
    );

  return (
    <div className="w-full h-full bg-yellow-50 p-6 rounded-2xl border border-yellow-200 shadow-sm">
      <h2 className="text-2xl font-bold text-center text-yellow-800 mb-6">
        All Courses
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title/code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-lg border border-yellow-200 focus:outline-none focus:ring-1 focus:ring-yellow-300 flex-1"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 rounded-lg border border-yellow-200 focus:ring-1 focus:ring-yellow-300"
        >
          <option value="">All Types</option>
          <option value="theory">Theory</option>
          <option value="practical">Practical</option>
        </select>

        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="p-2 rounded-lg border border-yellow-200 focus:ring-1 focus:ring-yellow-300"
        >
          <option value="">All Departments</option>
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

        <input
          type="number"
          placeholder="Credits"
          value={filterCredits}
          onChange={(e) => setFilterCredits(e.target.value)}
          className="p-2 rounded-lg border border-yellow-200 focus:outline-none focus:ring-1 focus:ring-yellow-300 w-24"
        />

        <button
          onClick={() => {
            setSearchTerm("");
            setFilterType("");
            setFilterDept("");
            setFilterCredits("");
          }}
          className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 rounded-lg text-yellow-800 font-semibold transition"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      {filteredCourses.length === 0 ? (
        <p className="text-center text-gray-500">No courses found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-yellow-200 text-yellow-900 font-semibold">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Credits</th>
                <th className="p-3 text-left">Dept</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((c) => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-yellow-100 transition-all"
                >
                  <td className="p-3">{c.id}</td>
                  <td className="p-3">{c.code}</td>
                  <td className="p-3">{c.title}</td>
                  <td className="p-3 capitalize">{c.type}</td>
                  <td className="p-3">{c.credits}</td>
                  <td className="p-3">{c.dept}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => setUpdateModal({ ...c })}
                      className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg text-yellow-900 font-semibold"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-yellow-700 hover:bg-yellow-800 px-3 py-1 rounded-lg text-white font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {updateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">
              Update Course
            </h3>

            <input
              type="text"
              value={updateModal.code}
              onChange={(e) =>
                setUpdateModal({ ...updateModal, code: e.target.value })
              }
              placeholder="Course Code"
              className="p-2 rounded-lg border border-yellow-300 mb-3 w-full"
            />
            <input
              type="text"
              value={updateModal.title}
              onChange={(e) =>
                setUpdateModal({ ...updateModal, title: e.target.value })
              }
              placeholder="Course Title"
              className="p-2 rounded-lg border border-yellow-300 mb-3 w-full"
            />
            <select
              value={updateModal.type}
              onChange={(e) =>
                setUpdateModal({ ...updateModal, type: e.target.value })
              }
              className="p-2 rounded-lg border border-yellow-300 mb-3 w-full"
            >
              <option value="theory">Theory</option>
              <option value="practical">Practical</option>
            </select>
            <input
              type="number"
              value={updateModal.credits}
              onChange={(e) =>
                setUpdateModal({ ...updateModal, credits: e.target.value })
              }
              placeholder="Credits"
              className="p-2 rounded-lg border border-yellow-300 mb-3 w-full"
            />
            <select
              value={updateModal.dept}
              onChange={(e) =>
                setUpdateModal({ ...updateModal, dept: e.target.value })
              }
              className="p-2 rounded-lg border border-yellow-300 mb-3 w-full"
            >
              <option value="">Select Department</option>
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

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setUpdateModal(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg font-semibold ${
            toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-yellow-500 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default View_Courses;
  