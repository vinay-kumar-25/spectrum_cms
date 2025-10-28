import React, { useEffect, useState } from "react";
import axios from "axios";

const View_Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [toast, setToast] = useState(null);
  const [updateModal, setUpdateModal] = useState(null);

  const server = "http://localhost:4000/admin";

  // Fetch all students
  useEffect(() => {
    axios
      .get(`${server}/getAllStudents`)
      .then((res) => {
        setStudents(res.data);
        setFilteredStudents(res.data);
      })
      .catch(() => showToast("Error fetching students", "error"))
      .finally(() => setLoading(false));
  }, []);

  // Apply filters & search
  useEffect(() => {
    let temp = [...students];

    if (searchTerm) {
      temp = temp.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.roll.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBranch) temp = temp.filter((s) => s.branch === filterBranch);
    if (filterYear) temp = temp.filter((s) => String(s.enroll_year) === String(filterYear));

    setFilteredStudents(temp);
  }, [searchTerm, filterBranch, filterYear, students]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await axios.delete(`${server}/deleteStudent/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showToast("Student deleted successfully!");
    } catch (err) {
      console.error(err);
      showToast("Error deleting student", "error");
    }
  };

  // Update student
  const handleUpdate = async () => {
    const { id, name, roll, branch, enroll_year, password } = updateModal;
    if (!name || !roll || !branch || !enroll_year || !password) return;

    try {
      await axios.put(`${server}/updateStudent/${id}`, {
        name,
        roll,
        branch,
        enroll_year,
        password,
      });
      setStudents((prev) => prev.map((s) => (s.id === id ? updateModal : s)));
      showToast("Student updated successfully!");
      setUpdateModal(null);
    } catch (err) {
      console.error(err);
      showToast("Error updating student", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center text-green-700 font-semibold">
        Loading students...
      </div>
    );

  return (
    <div className="w-full h-full bg-green-50 p-6 rounded-2xl border border-green-200 shadow-sm">
      <h2 className="text-2xl font-bold text-green-800 text-center mb-6">
        All Students
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by Name/Roll"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-lg border border-green-300 focus:outline-none focus:ring-1 focus:ring-green-400 flex-1"
        />

        <select
          value={filterBranch}
          onChange={(e) => setFilterBranch(e.target.value)}
          className="p-2 rounded-lg border border-green-300 focus:ring-1 focus:ring-green-400"
        >
          <option value="">All Branches</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="CIV">CIV</option>
        </select>

        <input
          type="number"
          placeholder="Year"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="p-2 rounded-lg border border-green-300 focus:outline-none focus:ring-1 focus:ring-green-400 w-28"
        />

        <button
          onClick={() => {
            setSearchTerm("");
            setFilterBranch("");
            setFilterYear("");
          }}
          className="px-3 py-1 bg-green-200 hover:bg-green-300 rounded-lg text-green-800 font-semibold transition"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      {filteredStudents.length === 0 ? (
        <p className="text-center text-gray-500">No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-green-200 text-green-900 font-semibold">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Roll</th>
                <th className="p-3 text-left">Branch</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr
                  key={s.id}
                  className="border-b hover:bg-green-50 transition-all"
                >
                  <td className="p-3">{s.id}</td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.roll}</td>
                  <td className="p-3">{s.branch}</td>
                  <td className="p-3">{s.enroll_year}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => setUpdateModal({ ...s })}
                      className="bg-green-400 hover:bg-green-500 px-3 py-1 rounded-lg text-white font-semibold"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white font-semibold"
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
            <h3 className="text-xl font-bold text-green-800 mb-4">
              Update Student
            </h3>
            <input
              type="text"
              value={updateModal.name}
              onChange={(e) =>
                setUpdateModal({ ...updateModal, name: e.target.value })
              }
              placeholder="Name"
              className="p-2 rounded-lg border border-green-300 mb-3 w-full"
            />
            <input
              type="text"
              value={updateModal.roll}
              onChange={(e) =>
                setUpdateModal({ ...updateModal, roll: e.target.value })
              }
              placeholder="Roll"
              className="p-2 rounded-lg border border-green-300 mb-3 w-full"
            />
            <select
              value={updateModal.branch}
              onChange={(e) =>
                setUpdateModal({ ...updateModal, branch: e.target.value })
              }
              className="p-2 rounded-lg border border-green-300 mb-3 w-full"
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIV">CIV</option>
            </select>
            <input
              type="number"
              value={updateModal.enroll_year}
              onChange={(e) =>
                setUpdateModal({
                  ...updateModal,
                  enroll_year: e.target.value,
                })
              }
              placeholder="Year"
              className="p-2 rounded-lg border border-green-300 mb-3 w-full"
            />
            <input
              type="password"
              value={updateModal.password}
              onChange={(e) =>
                setUpdateModal({ ...updateModal, password: e.target.value })
              }
              placeholder="Password"
              className="p-2 rounded-lg border border-green-300 mb-3 w-full"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setUpdateModal(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg font-semibold ${
            toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default View_Students;
