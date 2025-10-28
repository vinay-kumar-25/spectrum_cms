import React from 'react'
import Btn from '../SideButton'
import StudentDashboard from './StudentDashboard'
import { useState } from 'react'

const Student = () => {
  const [sidepage, setsidepage] = useState(<StudentDashboard/>)
  return (
    <div className='w-screen h-screen p-10'>
       <div className='border-2 border-gray-300 h-full rounded-2xl flex'>
            <div className='w-[20%] border border-gray-200 bg-stone-50 rounded-xl m-2 flex flex-col overflow-y-scroll'>
         {/* Header */}
          <div className="flex flex-col items-center text-center border-gray-200 border-b-2 p-4 bg-white rounded-t-xl">
            <img src="/NITUK Logo.png" alt="NITUK" className="w-12 mb-2" />
            <p className="font-semibold text-sm">National Institute of Technology Uttarakhand</p>
          </div>

          <div className='m-2 h-full flex flex-col'>

              <div className=' mb-2  p-2 rounded-xl text-green-800 bg-green-100  font-semibold'> 
                <div>
                  <Btn click={()=>{setsidepage(<StudentDashboard/>)}} task="Home"></Btn>
                  </div>
                  </div>
            {/* My Profile */}
            <div className='mb-2 p-2 rounded-xl text-green-800 bg-green-100 font-semibold'>
              My Profile
              <div >
                <Btn task="View Profile" />
                <Btn task="Edit Profile" />
              </div>
            </div>

            {/* My Schedule */}
            <div className='mb-2 p-2 rounded-xl text-blue-800 bg-blue-100 font-semibold'>
              My Schedule
              <div >
                <Btn task="View Timetable" />
                <Btn task="View Upcoming Classes" />
              </div>
            </div>

            {/* Academic Records */}
            <div className='mb-2 p-2 rounded-xl text-amber-800 bg-yellow-100 font-semibold'>
              Academic Record
              <div >
                <Btn task="View Marks" />
                <Btn task="View Grades" />
              </div>
            </div>

            {/* Attendance */}
            <div className='mb-2 p-2 rounded-xl text-purple-800 bg-purple-100 font-semibold'>
              Attendance
              <div >
                <Btn task="View Attendance" />
              </div>
            </div>

            {/* Courses */}
            <div className='mb-2 p-2 rounded-xl text-rose-800 bg-rose-100 font-semibold'>
              Course Details
              <div >
                <Btn task="View Enrolled Courses" />
                <Btn task="View Course Materials" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex justify-between p-2 border-gray-200 border-t-2 bg-white rounded-b-xl">
            <div className="border bg-sky-100 rounded-xl p-1 w-3/4 text-xs text-gray-700">
              <div><strong>Name:</strong> Dear Student</div>
              <div><strong>Role:</strong> Student</div>
              <div><strong>Email:</strong> Student@nituk.ac.in</div>
            </div>
            <button
              onClick={() => alert("Faculty logged out")}
              className="bg-red-200 hover:bg-red-300 rounded-xl ml-1 w-1/4 text-xs font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

         <div className="w-full m-2 border rounded-2xl border-gray-200 overflow-y-auto">
          {sidepage}
        </div>
      </div>
    </div>
  )
}

export default Student
