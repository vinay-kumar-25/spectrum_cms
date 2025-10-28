import React, { useState } from 'react'
import Btn from '../SideButton'
import CreateClass from './CreateClass'
import ViewClasses from './ViewClasses'
import FacultyDashboard from './FacultyDashboard'

const Faculty = () => {
  const [sidepage, setsidepage] = useState(<FacultyDashboard />)

  return (
    <div className="w-screen h-screen p-10">
      <div className='border-2 border-gray-300 h-full rounded-2xl flex'>
            <div className='w-[20%] border border-gray-200 bg-stone-50 rounded-xl m-2 flex flex-col'>
          {/* Header */}
          <div className="flex flex-col items-center text-center border-gray-200 border-b-2 p-4 bg-white rounded-t-xl">
            <img src="/NITUK Logo.png" alt="NITUK" className="w-12 mb-2" />
            <p className="font-semibold text-sm">National Institute of Technology Uttarakhand</p>
          </div>

          {/* Navigation */}
          <div className="m-2 flex flex-col space-y-3">
            {/* Dashboard */}
            <div className="p-2 rounded-xl text-sky-800 bg-sky-100 font-semibold">
              Dashboard
              <Btn click={() => setsidepage(<FacultyDashboard />)} task="Home" />
            </div>

            {/* Class Management */}
            <div className="p-2 rounded-xl text-emerald-800 bg-emerald-100 font-semibold">
              Class Management
              <Btn click={() => setsidepage(<CreateClass />)} task="Create New Class" />
              <Btn click={() => setsidepage(<ViewClasses />)} task="View My Classes" />
            </div>

            {/* NOTE:
                Attendance and Marks options will now appear
                INSIDE ViewClasses → when a specific class is opened.
            */}

           
          </div>

          {/* Footer */}
          <div className="mt-auto flex justify-between p-2 border-t-2 border-gray-200 bg-white rounded-b-xl">
            <div className="border bg-sky-100 rounded-xl p-1 w-3/4 text-xs text-gray-700">
              <div><strong>Name:</strong> Dr. Faculty</div>
              <div><strong>Role:</strong> Faculty</div>
              <div><strong>Email:</strong> faculty@nituk.ac.in</div>
            </div>
            <button
              onClick={() => alert("Faculty logged out")}
              className="bg-red-200 hover:bg-red-300 rounded-xl ml-1 w-1/4 text-xs font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-full m-2 rounded-xl border border-gray-200 overflow-y-auto">
          {sidepage}
        </div>
      </div>
    </div>
  )
}

export default Faculty
