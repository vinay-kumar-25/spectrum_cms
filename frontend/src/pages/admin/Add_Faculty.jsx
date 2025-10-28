import React, { useState } from "react";
import axios from "axios";
const Add_Faculty = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
let server = "http://localhost:4000/admin/addFaculty"
  
const handleSubmit = (e) => {
  e.preventDefault();
  let data = { name, email, password };
  console.log("submitting",{name ,email, password});
  
  axios.post(server, data)
    .then((res) => {
      console.log(res);
      alert(res.data.message);

      setName("");
      setEmail("");
      setPassword("");
    })
    .catch((err) => console.error(err));
};

  return (
    <div className="w-full h-full bg-sky-50 rounded-2xl p-6 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-sky-700 mb-6">
          Add New Faculty
        </h2>

        <form
          className="flex flex-col space-y-4 bg-white rounded-2xl  p-6 w-full"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter faculty name"
              className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter faculty email"
              className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>

          <button
           type="button"
           onClick={(e)=>{handleSubmit(e)}}
            className="bg-sky-500 text-white rounded-xl px-4 py-2 hover:bg-sky-600 transition-all duration-200 font-semibold"
          >
            Add Faculty
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_Faculty;
