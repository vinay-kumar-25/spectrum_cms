import React, { useState } from "react";
import axios from "axios";
import AddStudent from "./AddStudent";
import MarkAttendance from "./MarkAttendance";

const ViewClasses = () => {
  const [fId, setFId] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [mode, setMode] = useState("");
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Faculty ke liye sabhi classes fetch karein (aur component state update karein)
  const fetchClasses = async () => {
    if (!fId.trim()) return alert("⚠️ Faculty ID darj karein!");
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:4000/faculty/viewClasses/${fId}`
      );
      setClasses(res.data || []);
      console.log("✅ Classes fetched:", res.data);
    } catch (err) {
      console.error("❌ Error fetching classes:", err);
      alert("Classes fetch karne mein vifal rahe");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Class hatayein
  const handleRemoveClass = async (classId) => {
    if (!window.confirm("Kya aap sach mein is class ko delete karna chahte hain? Yeh action aparivartaneeya hai.")) return;
    try {
      await axios.delete(`http://localhost:4000/faculty/deleteClass/${classId}`);
      setClasses(classes.filter((cls) => cls.class_id !== classId));
      alert("🗑️ Class safaltapoorvak delete ho gayi!");
    } catch (err) {
      console.error("❌ Error deleting class:", err);
      alert("Class delete karne mein error. Ho sakta hai isme enroll kiye hue students hon.");
    }
  };

  // ✅ Enroll kiye hue students dekhein
  const handleViewStudents = async (cls) => {
    try {
      setSelectedClass(cls);
      setMode("viewStudents");
      setLoading(true);
      const res = await axios.get(
        `http://localhost:4000/faculty/getEnrolledStudents/${cls.class_id}`
      );
      setStudents(res.data || []);
      console.log("🎓 Enrolled students:", res.data);
    } catch (err) {
      console.error("❌ Error fetching enrolled students:", err);
      alert("Enroll kiye hue students ko fetch karne mein error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Students ko dynamic roop se filter karein
  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.roll?.toString().includes(search);
      
    const matchBranch = filterBranch ? s.branch === filterBranch : true;
    
    // 💡 SUDHARA GAYA LOGIC: s.year (number) ko string mein badlein taaki filterYear (string) se theek se tulna ho sake
    const matchYear = filterYear ? String(s.year) === filterYear : true; 
    
    return matchSearch && matchBranch && matchYear;
  });

  // Filters ke liye unique lists
  const uniqueBranches = [...new Set(students.map((s) => s.branch))].filter(Boolean).sort();
  const uniqueYears = [...new Set(students.map((s) => s.year))].filter(Boolean).sort((a, b) => a - b);
  const totalStudents = students.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-4 sm:p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-800 tracking-tight">
        📘 Class Management Portal
      </h1>

      {/* Faculty ID Input aur Fetch Button */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-10 p-4 bg-white rounded-2xl shadow-xl max-w-2xl mx-auto border border-indigo-100">
        <input
          className="border border-indigo-300 p-3 rounded-xl w-full sm:w-80 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition duration-150 text-lg"
          placeholder="Faculty ID darj karein (jaise: F1001)"
          value={fId}
          onChange={(e) => setFId(e.target.value)}
        />
        <button
          className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-40 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-3 rounded-xl shadow-lg transition duration-200 disabled:opacity-50"
          onClick={fetchClasses}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Fetch ho raha...
            </span>
          ) : (
            "Classes Fetch karein"
          )}
        </button>
      </div>
      
      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {classes.length === 0 && !loading && fId.trim() && (
          <p className="text-center text-gray-600 col-span-full text-xl py-10 border-4 border-dashed border-gray-300 rounded-2xl bg-white shadow-inner">
            😔 Is Faculty ID ke liye abhi tak koi classes assign nahi ki gayi hain.
          </p>
        )}
        {classes.length === 0 && !loading && !fId.trim() && (
          <p className="text-center text-gray-600 col-span-full text-xl py-10 border-4 border-dashed border-gray-300 rounded-2xl bg-white shadow-inner">
            👆 Kripya ek Faculty ID darj karein aur apne courses dekhne ke liye 'Fetch Classes' par click karein.
          </p>
        )}

        {classes.map((cls) => (
          <div
            key={cls.class_id}
            className="bg-white rounded-3xl shadow-2xl p-6 border-t-8 border-indigo-500 flex flex-col justify-between hover:shadow-3xl transition duration-300 ease-in-out"
          >
            <div className="flex flex-col space-y-3 mb-5">
              <h2 className="text-2xl font-bold text-indigo-800 border-b pb-2 border-indigo-100">
                {cls.class_name}
              </h2>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <p className="text-gray-600 flex items-center">
                  <span className="font-semibold text-indigo-500 mr-2">🆔</span>
                  <strong>Code:</strong> {cls.course_code}
                </p>
                <p className="text-gray-600 flex items-center">
                  <span className="font-semibold text-indigo-500 mr-2">📚</span>
                  <strong>Credits:</strong> {cls.credits || "3"}
                </p>
                <p className="text-gray-600 col-span-2 truncate">
                  <span className="font-semibold text-indigo-500 mr-2">🏷️</span>
                  <strong>Name:</strong> {cls.course_name || "N/A"}
                </p>
                {/* 💡 UPDATED: Total Classes aur Classes Held dikhayein */}
                <p className="text-gray-600 flex items-center">
                  <span className="font-semibold text-indigo-500 mr-2">🗓️</span>
                  <strong>Held / Total:</strong> <span className="font-bold text-indigo-700 ml-1">{cls.total_held || "0"}</span> / {cls.total_classes || "0"}
                </p>
                {/* 💡 UPDATED: Strength dikhayein */}
                <p className="text-gray-600 flex items-center">
                  <span className="font-semibold text-indigo-500 mr-2">🧑‍🎓</span>
                  <strong>Strength:</strong> <span className="font-bold text-indigo-700 ml-1">{cls.strength || "0"}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => { setSelectedClass(cls); setMode("attendance"); }}
                className="flex-1 min-w-[45%] bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-xl text-sm font-medium shadow-md transition"
              >
                📋 Attendance Mark karein
              </button>
              <button
                onClick={() => handleViewStudents(cls)}
                className="flex-1 min-w-[45%] bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-medium shadow-md transition"
                disabled={loading && selectedClass?.class_id === cls.class_id && mode === "viewStudents"}
              >
                👀 Students Dekhein
              </button>
              <button
                onClick={() => { setSelectedClass(cls); setMode("addStudent"); }}
                className="flex-1 min-w-[45%] bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl text-sm font-medium shadow-md transition"
              >
                ➕ Student Add karein
              </button>
              <button
                onClick={() => handleRemoveClass(cls.class_id)}
                className="flex-1 min-w-[45%] bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl text-sm font-medium shadow-md transition"
              >
                🗑️ Class Delete karein
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Student Component (Modal/Overlay) */}
      {selectedClass && mode === "addStudent" && (
        <AddStudent cls={selectedClass} close={() => setMode("")} fetchClasses={fetchClasses} /> 
      )}

    {/* Mark Attendance */}
    {selectedClass && mode === "attendance" && (
      <MarkAttendance 
        cls={selectedClass} 
        close={() => setMode("")} 
        fetchClasses={fetchClasses} // <-- Held count refresh karne ke liye fetch function pass karein
      />
    )}
      {/* View Enrolled Students Modal */}
      {selectedClass && mode === "viewStudents" && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl transition-transform duration-300">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-800 border-b pb-3">
              🎓 "{selectedClass.class_name}" mein Students
            </h2>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <input
                type="text"
                placeholder="Naam/Roll search karein..."
                className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition col-span-full md:col-span-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
              >
                <option value="">Sabhi Branches</option>
                {uniqueBranches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <select
                className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <option value="">Sabhi Years</option>
                {uniqueYears.map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
              <button
                onClick={() => { setFilterBranch(""); setFilterYear(""); setSearch(""); }}
                className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-2 rounded-xl font-medium transition"
              >
                Filters Reset karein
              </button>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-2xl mb-6 border border-indigo-200 shadow-inner">
              <h3 className="font-bold text-xl mb-3 text-indigo-800">
                📊 Student Vitran (Distribution)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-white p-3 rounded-xl shadow-lg border-b-4 border-indigo-500">
                  <p className="text-sm font-medium text-gray-500">TOTAL</p>
                  <p className="text-3xl font-extrabold text-indigo-700">{totalStudents}</p>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-lg border-b-4 border-emerald-500">
                  <p className="text-sm font-medium text-gray-500">FILTERED</p>
                  <p className="text-3xl font-extrabold text-emerald-700">{filteredStudents.length}</p>
                </div>

                {/* Branch Distribution */}
                {uniqueBranches.slice(0, 2).map((b) => (
                  <div
                    key={b}
                    className="bg-white p-3 rounded-xl shadow-md border-b-2 border-gray-300"
                  >
                    <p className="text-gray-500 text-sm truncate" title={b}>{b}</p>
                    <p className="text-xl font-bold text-gray-800">
                      {students.filter((s) => s.branch === b).length}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Student List */}
            {filteredStudents.length > 0 ? (
              <div className="max-h-80 overflow-y-auto pr-2">
                <ul className="space-y-3">
                  {filteredStudents.map((s, index) => (
                    <li
                      key={s.id || index}
                      className="bg-white border-l-6 border-blue-500 rounded-lg p-4 flex justify-between items-center shadow-md hover:shadow-xl transition duration-200"
                    >
                      <div>
                        <p className="font-semibold text-lg text-gray-800">{s.name}</p>
                        <p className="text-blue-600 text-sm font-mono">
                          Roll: <span className="font-semibold">{s.roll}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">
                          {s.branch}
                        </p>
                        <p className="text-xs text-gray-500">
                          Year {s.year}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-center text-gray-600 text-lg mt-6 py-8 border-4 border-dashed rounded-xl bg-white">
                ❌ Vartamaan filters ke aadhar par koi milte-julte students nahi mile.
              </p>
            )}

            {/* Close Button */}
            <div className="mt-8 flex justify-end pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setMode("");
                  setStudents([]);
                  setSearch("");
                  setFilterBranch("");
                  setFilterYear("");
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-200"
              >
                Student View Band karein
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewClasses;
