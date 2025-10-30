import React, { useState, useEffect } from 'react'
import axios from 'axios'; // Using Axios for HTTP requests

// IMPORTANT: Ensure this matches your backend URL (Port 4000, /student route)
const API_BASE_URL = 'http://localhost:4000/student'; 
const STUDENT_ID = 6; // Example student ID

// --- ClassCard Component (Integrated) ---
const ClassCard = ({ course_title, faculty_name, attendance_percent, mt_marks, et_marks, grades, total_held, code, attended_classes }) => {
  const totalMarks = (mt_marks || 0) + (et_marks || 0)
  
  // Logic for attendance color coding
  const attendanceColor =
    attendance_percent >= 85
      ? 'bg-green-100 text-green-700 border-green-300'
      : attendance_percent >= 70
      ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
      : 'bg-red-100 text-red-700 border-red-300'

  return (
    <div className="p-4 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition duration-300">
      <div className='flex justify-between items-start mb-3 border-b pb-2'>
        <h3 className="text-xl font-bold text-gray-800">{course_title}</h3>
        <span className='text-sm font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 shadow-inner'>{code}</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 italic">Faculty: {faculty_name}</p>

      {/* Grid for key metrics */}
      <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
        {/* Attendance Percentage Indicator */}
        <div className={`p-3 rounded-lg border ${attendanceColor} text-center`}>
          <span className="text-gray-600 mr-1">Attendance:</span> 
          <span className="font-extrabold text-lg">{attendance_percent.toFixed(1)}%</span>
        </div>
        
        {/* Grade Indicator */}
        <div className="bg-purple-50 text-purple-700 border border-purple-200 p-3 rounded-lg text-center">
          Grade: <span className="font-extrabold text-lg">{grades || 'N/A'}</span>
        </div>
      </div>
      
      {/* Detail Section */}
      <div className="mt-5 pt-4 border-t border-gray-100 text-sm text-gray-700 space-y-2">
        <p className="flex justify-between items-center">
            <span className='text-gray-500'>Total Attended:</span> 
            <strong className='text-gray-900 text-base font-semibold'>{attended_classes} / {total_held}</strong>
        </p>
        <p className="flex justify-between">
            <span className='text-gray-500'>Mid-Term Marks:</span> 
            <strong className='text-gray-900'>{mt_marks}</strong>
        </p>
        <p className="flex justify-between">
            <span className='text-gray-500'>End-Term Marks:</span> 
            <strong className='text-gray-900'>{et_marks}</strong>
        </p>
        <p className="flex justify-between font-bold border-t border-gray-300 pt-2 mt-2 text-base">
            <span>Total Marks:</span> 
            <strong className='text-gray-900'>{totalMarks}</strong>
        </p>
      </div>
    </div>
  )
}
// --- End ClassCard Component ---

const CompletedClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      // Axios GET request to the classes endpoint
      const response = await axios.get(`${API_BASE_URL}/${STUDENT_ID}/classes`);
      const allClasses = response.data;
      
      // Filter: Show classes where a final grade IS assigned
      const completed = allClasses.filter(cls => cls.is_completed);
      setClasses(completed);
    } catch (error) {
      console.error('Fetch error:', error);
      // Set to null to trigger error display
      setClasses(null); 
    } finally {
      setLoading(false);
    }
  }
  
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 min-h-full">
        <svg className="animate-spin h-5 w-5 mr-3 inline-block text-purple-600" viewBox="0 0 24 24">...</svg>
        Loading Completed Courses...
      </div>
    );
  }
  
  if (classes === null) {
      return <div className="p-10 text-center bg-red-100 text-red-700 rounded-xl shadow-md">Error loading class data. Please check the backend service.</div>;
  }
  
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg min-h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center border-b pb-3">
        <span className="text-3xl mr-3">🎓</span> Completed Courses
      </h2>
      
      {classes.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-xl border border-gray-200 text-gray-500 text-lg font-medium shadow-inner">
          No course records with assigned grades found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls, i) => (
            <ClassCard key={i} {...cls} />
          ))}
        </div>
      )}
    </div>
  )
}
export default CompletedClasses