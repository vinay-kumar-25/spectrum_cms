import React, { useState, useEffect } from "react";
import axios from "axios";

const AddStudentsToClass = ({ cls, close }) => {
  console.log("class id is ",cls);
  
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const [toast, setToast] = useState(null);
  const server = "http://localhost:4000/admin";

  useEffect(() => {
    axios
      .get(`${server}/getAllStudents`)
      .then((res) => {
        setStudents(res.data);
        setFiltered(res.data);
      })
      .catch(() => showToast("Error fetching students", "error"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let temp = [...students];

    if (search) {
      temp = temp.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.roll.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterBranch) temp = temp.filter((s) => s.branch === filterBranch);
    if (filterYear)
      temp = temp.filter(
        (s) => String(s.enroll_year) === String(filterYear)
      );

    setFiltered(temp);
  }, [search, filterBranch, filterYear, students]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

const handleAddToClass = async () => {
  if (selected.length === 0)
    return showToast("Select at least one student", "error");

  try {
    console.log("Adding students:", cls.class_id, selected);

    await axios.post("http://localhost:4000/faculty/addStudentsToClass", {
      cls_id: cls.class_id,      // ✅ backend expects this key name
      student_ids: selected,     // ✅ backend expects this key name
    });

    showToast("Students successfully added to class!");
    setSelected([]);
    setTimeout(close, 2000);
  } catch (err) {
    console.error("❌ Error in handleAddToClass:", err);
    showToast("Error adding students", "error");
  }
};

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg text-center">
          <h2 className="text-green-700 text-xl font-semibold mb-4">
            Loading students...
          </h2>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-5xl max-h-[90vh] overflow-y-auto border border-green-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-800">
            Add Students to Class
          </h2>
          <button
            onClick={close}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            ✕ Close
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by Name/Roll"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              setSearch("");
              setFilterBranch("");
              setFilterYear("");
            }}
            className="px-3 py-1 bg-green-200 hover:bg-green-300 rounded-lg text-green-800 font-semibold transition"
          >
            Reset
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-200 text-green-900 font-semibold">
                <th className="p-3 text-left">Select</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Roll</th>
                <th className="p-3 text-left">Branch</th>
                <th className="p-3 text-left">Year</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No students found.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b hover:bg-green-50 transition-all"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(s.id)}
                        onChange={() => toggleSelect(s.id)}
                        className="w-6 h-6 accent-green-600 cursor-pointer"
                      />
                    </td>
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.roll}</td>
                    <td className="p-3">{s.branch}</td>
                    <td className="p-3">{s.enroll_year}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleAddToClass}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition"
          >
            ✅ Add Selected Students
          </button>
        </div>

        {/* Toast */}
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
    </div>
  );
};

export default AddStudentsToClass;
