import React, { useState } from 'react'
import Btn from '../SideButton'
import StudentDashboard from './StudentDashboard'
import StudentProfile from './StudentProfile'
import CurrentClasses from './CurrentClasses'
import CompletedClasses from './CompletedClasses'

const Student = () => {
  const [sidepage, setsidepage] = useState(<StudentDashboard />)

  return (
    <div className='w-screen h-screen p-6'>
      <div className='border-2 border-gray-300 h-full rounded-2xl flex'>
        
        {/* Sidebar */}
        <div className='w-[20%] border border-gray-200 bg-stone-50 rounded-xl m-2 flex flex-col overflow-y-scroll'>
          
          {/* Header */}
          <div className="flex flex-col items-center text-center border-gray-200 border-b-2 p-4 bg-white rounded-t-xl">
            <img src="/NITUK Logo.png" alt="NITUK" className="w-12 mb-2" />
            <p className="font-semibold text-sm text-gray-800">
              National Institute of Technology Uttarakhand
            </p>
          </div>

          {/* Menu */}
          <div className='m-2 h-full flex flex-col'>
            
            <div className='mb-2 p-2 rounded-xl text-green-800 bg-green-100 font-semibold'>
              <div>
                <Btn click={() => setsidepage(<StudentDashboard />)} task="🏠 Home" />
              </div>
            </div>

            {/* My Profile */}
            <div className='mb-2 p-2 rounded-xl text-green-800 bg-green-100 font-semibold'>
              My Profile
              <div>
                <Btn click={() => setsidepage(<StudentProfile />)} task="View / Edit Profile" />
              </div>
            </div>

            {/* Current Classes */}
            <div className='mb-2 p-2 rounded-xl text-blue-800 bg-blue-100 font-semibold'>
              Current Classes
              <div>
                <Btn click={() => setsidepage(<CurrentClasses />)} task="View Current Classes" />
              </div>
            </div>

            {/* Completed Classes */}
            <div className='mb-2 p-2 rounded-xl text-rose-800 bg-rose-100 font-semibold'>
              Completed Courses
              <div>
                <Btn click={() => setsidepage(<CompletedClasses />)} task="View Completed Courses" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex justify-between p-2 border-gray-200 border-t-2 bg-white rounded-b-xl">
            <div className="border bg-sky-100 rounded-xl p-1 w-3/4 text-xs text-gray-700">
              <div><strong>Name:</strong> Dear Student</div>
              <div><strong>Role:</strong> Student</div>
              <div><strong>Email:</strong> student@nituk.ac.in</div>
            </div>
            <button
              onClick={() => alert("Student logged out")}
              className="bg-red-200 hover:bg-red-300 rounded-xl ml-1 w-1/4 text-xs font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Display */}
        <div className="w-full m-2 border rounded-2xl border-gray-200 overflow-y-auto">
          {sidepage}
        </div>
      </div>
    </div>
  )
}

export default Student
