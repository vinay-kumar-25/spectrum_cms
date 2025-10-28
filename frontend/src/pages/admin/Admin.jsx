import React, { useState } from 'react'
import Btn from '../SideButton'
import Add_Faculty from './Add_Faculty'
import View_Faculty from './View_Faculty'
import Add_course from './Add_Course'
import View_course from './View_Courses'
import Add_student from './Add_Student'
import View_student from './View_Students'
import AdminDashboard from './AdminDashboard'
const Admin = () => {
   const [sidepage, setsidepage] = useState(<AdminDashboard/>)
   return (
   <div className='w-screen h-screen p-10 '>
        <div className='border-2 border-gray-300 h-full rounded-2xl flex'>
            <div className='w-[20%] border border-gray-200 bg-stone-50 rounded-xl m-2 flex flex-col overflow-y-scroll'>
 {/* Header */}
          <div className="flex flex-col items-center text-center border-gray-200 border-b-2 p-4 bg-white rounded-t-xl">
            <img src="/NITUK Logo.png" alt="NITUK" className="w-12 mb-2" />
            <p className="font-semibold text-sm">National Institute of Technology Uttarakhand</p>
          </div>
              <div className=' m-2 h-full flex flex-col'>
               
               <div className=' mb-2  p-2 rounded-xl text-red-800 bg-red-100  font-semibold'> 
                <div>
                  <Btn click={()=>{setsidepage(<AdminDashboard/>)}} task="Home"></Btn>
                  </div>
                  </div>
                  
               <div className=' mb-2  p-2 rounded-xl text-blue-800 bg-sky-100  font-semibold'>Faculty 
                <div>
                  <Btn click={()=>{setsidepage(<Add_Faculty/>)}} task="Add new faculty"></Btn>
                  <Btn click={()=>{setsidepage(<View_Faculty/>)}} task="View All"></Btn>
                  </div>
                  </div>

               
               <div className=' mb-2  p-2 rounded-xl text-amber-800 bg-yellow-100  font-semibold'>Course  
                <div>
                  <Btn click={()=>{setsidepage(<Add_course/>)}} task="Add new Course"></Btn>
                  <Btn click={()=>{setsidepage(<View_course/>)}} task="View All"></Btn>
                  </div>
                  </div>
               
               <div className=' mb-2  p-2 rounded-xl text-green-800 bg-green-100  font-semibold'>Student 
                <div>
                  <Btn click={()=>{setsidepage(<Add_student/>)}} task="Add new Student"></Btn>
                  <Btn click={()=>{setsidepage(<View_student/>)}} task="View All"></Btn>
                  </div>
                  </div>
               <div></div>
              </div>
               {/* Footer */}
          <div className="mt-auto flex justify-between p-2 border-gray-200 border-t-2 bg-white rounded-b-xl">
            <div className="border bg-sky-100 rounded-xl p-1 w-3/4 text-xs text-gray-700">
              <div><strong>Name:</strong> Sir. Admin</div>
              <div><strong>Role:</strong> Admin</div>
              <div><strong>Email:</strong> admin@nituk.ac.in</div>
            </div>
            <button
              onClick={() => alert("Faculty logged out")}
              className="bg-red-200 hover:bg-red-300 rounded-xl ml-1 w-1/4 text-xs font-semibold"
            >
              Logout
            </button>
          </div>
            </div>
            <div className="  w-full m-2 border-gray-200 border rounded-xl"> {sidepage} </div>
        </div>
   </div>
  )
}

export default Admin