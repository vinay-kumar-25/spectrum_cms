import React from 'react';
import { useNavigate } from 'react-router-dom';
// Utility for fetching icons (using lucide-react style SVGs)
const Icon = ({ name, className = "w-5 h-5", color = "currentColor" }) => {
  const icons = {
    // Icons for the Landing Page
    lock: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    play: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    logIn: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>,
    trendingUp: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    checkCircle: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>,
    fileText: <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>,
  };
  return icons[name] || <span className={className}>?</span>;
};


const features = [
  {
    title: "Student Progress Tracking",
    description: "View real-time attendance, internal marks, and grades across all enrolled courses.",
    iconName: "checkCircle",
    accent: "green", // Green for Students
  },
  {
    title: "Streamlined Faculty Grading",
    description: "Manage class sections, upload marks, and communicate seamlessly with students.",
    iconName: "fileText",
    accent: "blue", // Blue for Faculty
  },
  {
    title: "Admin Reporting & Analytics",
    description: "Generate comprehensive reports on performance trends and operational metrics.",
    iconName: "trendingUp",
    accent: "red", // Red for Admin
  },
];


const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center p-4 md:p-8 bg-gradient-to-br from-indigo-50 to-white">

      {/* Header / Navbar */}
      <header className="w-full max-w-7xl flex justify-between items-center py-4 px-2">
          <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
            Spectrum
          </h1>
          {/* Removed scale transition */}
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700"
          >
            <Icon name="logIn" className="w-5 h-5"/>
            Login Portal
          </button>
      </header>
      
      {/* --- Hero Section --- */}
      <main className="text-center max-w-5xl pt-20 pb-20">
        <div className="text-lg font-semibold uppercase tracking-widest text-indigo-500 mb-4">
          NIT Uttarakhand College Tracker
        </div>
        <h2 className="text-5xl font-extrabold text-gray-900 leading-snug md:text-7xl">
          Your Academic World, <span className="text-indigo-600">Unified.</span>
        </h2>
        <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto">
          Spectrum provides a unified platform for students, faculty, and administration to track, manage, and accelerate the academic process.
        </p>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
          {/* Removed scale/translate transition */}
          <button
            onClick={() => navigate('/login')}
            className="flex items-center justify-center gap-3 px-10 py-4 text-lg font-bold rounded-xl bg-indigo-600 text-white shadow-2xl shadow-indigo-300 hover:bg-indigo-700"
          >
            <Icon name="lock" className="w-6 h-6"/>
            Go to Login
          </button>
          {/* Removed scale/translate transition */}
          <button
            // Placeholder: Can lead to a mock demo page or simply log
            onClick={() => console.log('Demo Button Clicked')}
            className="flex items-center justify-center gap-3 px-10 py-4 text-lg font-bold rounded-xl bg-white text-indigo-600 border-2 border-indigo-200 shadow-lg hover:border-indigo-400 hover:text-indigo-700"
          >
            <Icon name="play" className="w-6 h-6"/>
            Explore Features
          </button>
        </div>
      </main>

      {/* --- Feature Grid (Using Role Colors) --- */}
      <section className="w-full max-w-6xl py-12">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Designed for Every Role
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              // Removed transform and transition
              className={`bg-white p-8 rounded-3xl shadow-xl border-t-4 border-${feature.accent}-500 hover:shadow-2xl`}
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-${feature.accent}-100 text-${feature.accent}-600 mb-6 shadow-md`}>
                <Icon name={feature.iconName} className="w-8 h-8"/>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-7xl border-t border-gray-100 mt-16 py-6 text-center">
        <p className="text-sm text-gray-400">
          © 2025 Spectrum — Developed for NIT Uttarakhand
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
