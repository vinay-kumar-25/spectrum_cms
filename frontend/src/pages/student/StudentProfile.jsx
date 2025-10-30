import React, { useState, useEffect } from 'react'
import axios from 'axios'; // Import Axios

// API_BASE_URL updated to match your backend (Port 4000, /student route)
const API_BASE_URL = 'http://localhost:4000/student'; 
const STUDENT_ID = 6; // Hardcoded student ID for demo (Vinay Kumar)

const StudentProfile = () => {
  // Use null initially to indicate data is being loaded
  const [profile, setProfile] = useState(null);
  const [tempProfile, setTempProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' }); // success, error

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // --- Axios Request ---
      const response = await axios.get(`${API_BASE_URL}/${STUDENT_ID}/profile`);
      const data = response.data; // Axios wraps the response data in the 'data' property
      // ---------------------
      
      // Map backend data keys to frontend keys
      const displayProfile = {
        name: data.name,
        email: data.email || 'N/A', 
        roll: data.roll,
        branch: data.branch_full || data.branch,
        year: `${data.current_year}th Year`,
      }

      setProfile(displayProfile);
      setTempProfile(displayProfile);
      setStatusMessage({ text: 'Profile loaded successfully.', type: 'success' });
    } catch (error) {
      console.error('Fetch error:', error);
      setStatusMessage({ text: 'Error loading profile. Check backend connection and CORS.', type: 'error' });
      // Fallback to minimal state on API failure
      setProfile({});
      setTempProfile({});
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value })
  }

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile(profile);
    setStatusMessage({ text: 'Editing mode enabled.', type: 'info' });
  }

  const handleSave = async () => {
    // In a real application, you would send a PUT request here using axios.put
    // await axios.put(`${API_BASE_URL}/${STUDENT_ID}/profile`, tempProfile);
    
    setProfile(tempProfile);
    setIsEditing(false); 
    setStatusMessage({ text: 'Profile updated successfully! ✅ (Client-side update only)', type: 'success' });
  }

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
    setStatusMessage({ text: 'Editing cancelled.', type: 'info' });
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 min-h-full bg-white rounded-2xl shadow-lg">
        <svg className="animate-spin h-5 w-5 mr-3 inline-block text-emerald-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading Student Profile...
      </div>
    );
  }
  
  // Use Object.keys(profile).length to check if profile is loaded but possibly empty due to error
  if (!profile || Object.keys(profile).length === 0) return <div className="p-8 text-center text-red-500 bg-white rounded-2xl shadow-lg">Failed to load profile data. Please ensure the backend is running.</div>;

  return (
    <div className="p-6 bg-gradient-to-br from-white to-emerald-50 min-h-full rounded-2xl shadow-inner">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center border-b pb-2">
        <span className="text-3xl mr-3">👤</span> Student Profile
      </h2>
      
      {/* Status Message Display */}
      {statusMessage.text && (
        <div 
          className={`p-3 mb-4 text-sm rounded-lg font-medium ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : statusMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}
          role="alert"
        >
          {statusMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(profile).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-semibold text-gray-600 capitalize mb-1 text-sm">{key.replace('_', ' ')}</label>
            
            {isEditing && (key !== 'roll' && key !== 'year') ? (
              /* Input field for editing */
              <input
                name={key}
                value={tempProfile[key]} 
                onChange={handleChange}
                className="border border-emerald-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-150 ease-in-out bg-white"
              />
            ) : (
              /* Read-only display */
              <p className="border border-gray-200 bg-white p-3 rounded-lg text-lg text-gray-800 shadow-sm font-medium">
                {profile[key]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* --- Button Area --- */}
      <div className="mt-10 flex gap-4 justify-end">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition duration-150 ease-in-out shadow-lg transform hover:scale-[1.01]"
            >
              💾 Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-xl font-bold transition duration-150 ease-in-out shadow-lg transform hover:scale-[1.01]"
            >
            ❌ Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition duration-150 ease-in-out shadow-lg transform hover:scale-[1.01]"
          >
            ✏️ Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}

export default StudentProfile
