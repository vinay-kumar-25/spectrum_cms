import React, { useState } from "react";
import axios from "axios";

const Add_Student = () => {
  const [name, setName] = useState("");
  const [email,setEmail] = useState("")
  const [roll, setRoll] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [enrollYear, setEnrollYear] = useState("");
  const [password, setPassword] = useState("");
  const server = "http://localhost:4000/admin/addStudent";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(server, { name,email, roll, branch, enroll_year: enrollYear, password });
      alert("Student added successfully!");
      setName(""); setRoll(""); setBranch("CSE"); setEnrollYear(""); setPassword(""); setEmail("")
    } catch (err) {
      console.error(err);
      alert("Error adding student.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-green-200">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-6">Add New Student</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="p-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <input
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            type="text"
            placeholder="Roll Number (e.g., BTT23CSE026)"
            className="p-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="p-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <option value="CSE">CSE</option>
            <option value="MECH">MECH</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
            <option value="CIV">CIV</option>
          </select>
          <input
            value={enrollYear}
            onChange={(e) => setEnrollYear(e.target.value)}
            type="number"
            placeholder="Enrollment Year"
            className="p-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_Student;
