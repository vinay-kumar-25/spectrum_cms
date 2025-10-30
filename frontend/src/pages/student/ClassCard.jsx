import React from 'react'

const ClassCard = ({ course, faculty, attendance, mid, end, grade, color }) => {
  const total = mid + end
  
  // Adjusted color classes for clearer status indicators
  const attendanceColor =
    attendance >= 85
      ? 'bg-green-100 text-green-700 border-green-300'
      : attendance >= 70
      ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
      : 'bg-red-100 text-red-700 border-red-300'

  return (
    <div
      // Minimal styling: white background, subtle shadow, light gray border
      className="p-4 rounded-xl shadow-sm bg-white border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-800">{course}</h3>
      <p className="text-sm text-gray-500 mb-3">Faculty: {faculty}</p>

      {/* Grid for key metrics (Attendance and Grade) */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {/* Attendance Indicator */}
        <div className={`p-2 rounded-lg font-medium border ${attendanceColor} text-center`}>
          <span className="text-gray-600 mr-1">Attn:</span> 
          <span className="font-bold">{attendance}%</span>
        </div>
        
        {/* Grade Indicator */}
        <div className="bg-blue-50 text-blue-700 border border-blue-200 p-2 rounded-lg font-medium text-center">
          Grade: <span className="font-bold">{grade}</span>
        </div>
      </div>
      
      {/* Marks Section */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-700 space-y-1">
        <p className="flex justify-between">
            <span>Mid-Term Marks:</span> 
            <strong className='text-gray-900'>{mid}</strong>
        </p>
        <p className="flex justify-between">
            <span>End-Term Marks:</span> 
            <strong className='text-gray-900'>{end}</strong>
        </p>
        <p className="flex justify-between font-semibold border-t border-gray-200 pt-1 mt-1">
            <span>Total Marks:</span> 
            <strong className='text-gray-900'>{total} / 75</strong>
        </p>
      </div>
    </div>
  )
}
export default ClassCard
