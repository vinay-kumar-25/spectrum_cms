import React, { useState } from 'react';

const UpdateMarks = () => {
  const [classId, setClassId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [marks, setMarks] = useState({
    mt_marks: '',
    et_marks: '',
    attendance: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/faculty/marks/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          class_id: classId,
          student_id: studentId,
          ...marks
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('✓ Marks updated successfully!');
        setMarks({ mt_marks: '', et_marks: '', attendance: '' });
      } else {
        setMessage('✗ ' + (data.error || 'Failed to update marks'));
      }
    } catch (error) {
      setMessage('✗ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">Update Marks</h1>
          <p className="text-emerald-600">Enter student marks and scores</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-emerald-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                🏫 Class ID
              </label>
              <input
                type="text"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full px-4 py-3 border-3 border-emerald-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-200"
                placeholder="Enter class ID"
                required
              />
            </div>

            <div>
              <label className="block text-emerald-800 font-semibold mb-2">
                👤 Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-3 border-3 border-emerald-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-200"
                placeholder="Enter student ID"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  📝 Mid-Term
                </label>
                <input
                  type="number"
                  value={marks.mt_marks}
                  onChange={(e) => setMarks({...marks, mt_marks: e.target.value})}
                  className="w-full px-4 py-3 border-3 border-emerald-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-200"
                  placeholder="0-100"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  📄 End-Term
                </label>
                <input
                  type="number"
                  value={marks.et_marks}
                  onChange={(e) => setMarks({...marks, et_marks: e.target.value})}
                  className="w-full px-4 py-3 border-3 border-emerald-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-200"
                  placeholder="0-100"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-emerald-800 font-semibold mb-2">
                  ✓ Attendance
                </label>
                <input
                  type="number"
                  value={marks.attendance}
                  onChange={(e) => setMarks({...marks, attendance: e.target.value})}
                  className="w-full px-4 py-3 border-3 border-emerald-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-200"
                  placeholder="0-100"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Updating...' : '💾 Update Marks'}
            </button>

            {message && (
              <div className={`p-4 rounded-xl text-center font-semibold ${
                message.startsWith('✓') 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMarks;