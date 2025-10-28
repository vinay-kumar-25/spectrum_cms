import React, { useEffect, useState } from "react";
import axios from "axios";

const View_Faculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateModal, setUpdateModal] = useState(null);
  const [toast, setToast] = useState(null);

  const server = "http://localhost:4000/admin";

  // ✅ Fetch all faculties
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await axios.get(`${server}/getAllFaculty`);
        setFaculties(res.data || []);
        setFilteredFaculties(res.data || []);
      } catch (err) {
        console.error("Error fetching faculty:", err);
        showToast("Failed to load faculty data!", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchFaculties();
  }, []);

  // ✅ Filter faculties based on search term
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = faculties.filter(
      (f) =>
        f.name.toLowerCase().includes(term) ||
        f.email.toLowerCase().includes(term)
    );
    setFilteredFaculties(filtered);
  }, [searchTerm, faculties]);

  // ✅ Toast Notification System
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // ✅ Delete faculty
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this faculty?")) return;
    try {
      await axios.delete(`${server}/deleteFaculty/${id}`);
      setFaculties((prev) => prev.filter((f) => f.id !== id));
      showToast("Faculty deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Error deleting faculty", "error");
    }
  };

  // ✅ Update faculty (via modal)
  const handleUpdate = async () => {
    const { id, name, email } = updateModal;
    if (!name || !email) return showToast("All fields required!", "error");

    try {
      await axios.put(`${server}/updateFaculty/${id}`, { name, email });
      setFaculties((prev) =>
        prev.map((f) => (f.id === id ? { ...f, name, email } : f))
      );
      setUpdateModal(null);
      showToast("Faculty updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      showToast("Error updating faculty", "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-full text-lg font-semibold text-blue-700">
        Loading faculty data...
      </div>
    );

  return (
    <div className="w-full h-full bg-sky-50 p-6 rounded-2xl shadow-md border border-blue-200">
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
        Faculty Management
      </h1>

      {/* 🔍 Search */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-300 flex-1"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded-lg text-blue-800 font-semibold transition"
        >
          Reset
        </button>
      </div>

      {/* 🧑‍🏫 Faculty Table */}
      {filteredFaculties.length === 0 ? (
        <p className="text-center text-gray-500 font-medium">No faculty found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-200 text-blue-900 font-semibold">
                <th className="p-3 text-left rounded-tl-lg">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-center rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculties.map((faculty) => (
                <tr key={faculty.id} className="border-b hover:bg-blue-100 transition">
                  <td className="p-3">{faculty.id}</td>
                  <td className="p-3">{faculty.name}</td>
                  <td className="p-3">{faculty.email}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => setUpdateModal({ ...faculty })}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(faculty.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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

      {/* ✏️ Update Modal */}
      {updateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4">
              Update Faculty
            </h3>

            <input
              type="text"
              value={updateModal.name}
              onChange={(e) =>
                setUpdateModal({ ...updateModal, name: e.target.value })
              }
              placeholder="Faculty Name"
              className="p-2 rounded-lg border border-blue-300 mb-3 w-full"
            />
            <input
              type="email"
              value={updateModal.email}
              onChange={(e) =>
                setUpdateModal({ ...updateModal, email: e.target.value })
              }
              placeholder="Faculty Email"
              className="p-2 rounded-lg border border-blue-300 mb-3 w-full"
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
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔔 Toast */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg font-semibold shadow-md ${
            toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default View_Faculty;
