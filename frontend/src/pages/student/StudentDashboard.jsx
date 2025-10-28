import React from "react";

const StudentDashboard = () => {
  const features = [
    {
      title: "Your Profile",
      description: "View and manage your personal information, enrollment details, branch, and academic records.",
      icon: "👤",
      gradient: "from-blue-100 to-cyan-50",
      accentColor: "bg-blue-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <circle cx="200" cy="120" r="50" fill="#3b82f6" opacity="0.3"/>
          <circle cx="200" cy="110" r="30" fill="#3b82f6" opacity="0.5"/>
          <path d="M 150 160 Q 200 190 250 160 L 250 210 Q 200 240 150 210 Z" fill="#3b82f6" opacity="0.4"/>
          <rect x="120" y="80" width="60" height="8" rx="4" fill="#3b82f6" opacity="0.3"/>
          <rect x="220" y="80" width="60" height="8" rx="4" fill="#3b82f6" opacity="0.3"/>
          <rect x="140" y="220" width="120" height="10" rx="5" fill="#3b82f6" opacity="0.4"/>
        </svg>
      )
    },
    {
      title: "My Courses",
      description: "Access all your enrolled courses, view syllabus, course materials, and track your progress.",
      icon: "📚",
      gradient: "from-purple-100 to-violet-50",
      accentColor: "bg-purple-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="100" y="90" width="70" height="100" rx="6" fill="#a855f7" opacity="0.3"/>
          <rect x="165" y="70" width="70" height="120" rx="6" fill="#a855f7" opacity="0.5"/>
          <rect x="230" y="80" width="70" height="110" rx="6" fill="#a855f7" opacity="0.4"/>
          <line x1="135" y1="110" x2="135" y2="170" stroke="#a855f7" strokeWidth="3"/>
          <line x1="200" y1="90" x2="200" y2="170" stroke="#a855f7" strokeWidth="3"/>
          <line x1="265" y1="100" x2="265" y2="170" stroke="#a855f7" strokeWidth="3"/>
          <circle cx="200" cy="220" r="8" fill="#a855f7" opacity="0.6"/>
        </svg>
      )
    },
    {
      title: "Marks & Performance",
      description: "Check your mid-term, end-term marks, internal assessments, and overall academic performance.",
      icon: "📊",
      gradient: "from-emerald-100 to-green-50",
      accentColor: "bg-emerald-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="110" y="170" width="40" height="70" rx="5" fill="#10b981" opacity="0.4"/>
          <rect x="170" y="130" width="40" height="110" rx="5" fill="#10b981" opacity="0.6"/>
          <rect x="230" y="100" width="40" height="140" rx="5" fill="#10b981" opacity="0.5"/>
          <polyline points="100,190 130,160 190,120 250,80 290,100" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <circle cx="130" cy="160" r="7" fill="#10b981"/>
          <circle cx="190" cy="120" r="7" fill="#10b981"/>
          <circle cx="250" cy="80" r="7" fill="#10b981"/>
        </svg>
      )
    },
    {
      title: "Grades & GPA",
      description: "View your final grades for each course, semester-wise GPA, and cumulative performance.",
      icon: "🏆",
      gradient: "from-amber-100 to-yellow-50",
      accentColor: "bg-amber-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <circle cx="200" cy="140" r="60" fill="#f59e0b" opacity="0.3"/>
          <polygon points="200,90 215,120 245,125 222,147 228,177 200,162 172,177 178,147 155,125 185,120" fill="#f59e0b" opacity="0.5"/>
          <text x="182" y="155" fill="#f59e0b" fontSize="28" fontWeight="bold">A</text>
          <rect x="120" y="210" width="160" height="10" rx="5" fill="#f59e0b" opacity="0.3"/>
          <rect x="120" y="210" width="120" height="10" rx="5" fill="#f59e0b" opacity="0.6"/>
        </svg>
      )
    },
    {
      title: "Attendance Tracker",
      description: "Monitor your attendance percentage, days to maintain 75%, and class-wise attendance records.",
      icon: "📅",
      gradient: "from-rose-100 to-pink-50",
      accentColor: "bg-rose-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="100" y="70" width="200" height="160" rx="12" fill="#f43f5e" opacity="0.2"/>
          <circle cx="200" cy="150" r="50" fill="none" stroke="#f43f5e" strokeWidth="8" opacity="0.4"/>
          <path d="M 200 150 L 200 110 A 40 40 0 0 1 235 150 Z" fill="#f43f5e" opacity="0.6"/>
          <text x="188" y="160" fill="#f43f5e" fontSize="24" fontWeight="bold">75%</text>
          <rect x="120" y="90" width="50" height="8" rx="4" fill="#f43f5e" opacity="0.4"/>
          <rect x="230" y="90" width="50" height="8" rx="4" fill="#f43f5e" opacity="0.4"/>
        </svg>
      )
    },
    {
      title: "Faculty & Classes",
      description: "View your faculty members, class schedules, timings, and contact information for each course.",
      icon: "👨‍🏫",
      gradient: "from-indigo-100 to-blue-50",
      accentColor: "bg-indigo-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="100" y="90" width="200" height="130" rx="10" fill="#6366f1" opacity="0.2"/>
          <circle cx="150" cy="130" r="25" fill="#6366f1" opacity="0.5"/>
          <circle cx="250" cy="130" r="25" fill="#6366f1" opacity="0.5"/>
          <rect x="130" y="160" width="40" height="50" rx="5" fill="#6366f1" opacity="0.4"/>
          <rect x="230" y="160" width="40" height="50" rx="5" fill="#6366f1" opacity="0.4"/>
          <line x1="120" y1="110" x2="280" y2="110" stroke="#6366f1" strokeWidth="3" opacity="0.3"/>
        </svg>
      )
    },
    {
      title: "Certificates & Documents",
      description: "Download your certificates, bonafide, mark sheets, and other academic documents issued by admin.",
      icon: "📜",
      gradient: "from-teal-100 to-cyan-50",
      accentColor: "bg-teal-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="120" y="80" width="160" height="140" rx="8" fill="#14b8a6" opacity="0.2"/>
          <circle cx="200" cy="140" r="35" fill="none" stroke="#14b8a6" strokeWidth="6" opacity="0.4"/>
          <polygon points="200,125 207,145 228,148 214,162 217,183 200,174 183,183 186,162 172,148 193,145" fill="#14b8a6" opacity="0.5"/>
          <rect x="140" y="100" width="60" height="6" rx="3" fill="#14b8a6" opacity="0.4"/>
          <rect x="140" y="115" width="80" height="6" rx="3" fill="#14b8a6" opacity="0.4"/>
          <rect x="140" y="190" width="120" height="6" rx="3" fill="#14b8a6" opacity="0.4"/>
          <rect x="140" y="205" width="100" height="6" rx="3" fill="#14b8a6" opacity="0.4"/>
        </svg>
      )
    },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl overflow-y-auto">
      {/* Hero Header */}
      <div className="bg-white p-16 text-center">
        <div className="text-7xl mb-6">🎓</div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Student Dashboard</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your complete academic portal - track your progress, courses, and achievements
        </p>
      </div>

      {/* Features Section */}
      <div className="p-12 space-y-6 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${feature.gradient} rounded-3xl overflow-hidden`}
          >
            <div className={`grid grid-cols-1 ${idx % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-0 items-center`}>
              {/* Content Side */}
              <div className={`p-12 ${idx % 2 === 0 ? 'order-1' : 'order-2'}`}>
                <div className="text-6xl mb-6">{feature.icon}</div>
                
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h2>
                
                <div className={`w-20 h-1 ${feature.accentColor} rounded-full mb-6`}></div>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Illustration Side */}
              <div className={`p-12 flex items-center justify-center ${idx % 2 === 0 ? 'order-2' : 'order-1'}`}>
                <div className="w-full max-w-md">
                  {feature.illustration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Message */}
      <div className="bg-white p-16 text-center mt-8">
        <div className="text-5xl mb-6">🌟</div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Academic Journey Hub</h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Stay on top of your academic goals with real-time access to your marks, attendance, grades, and certificates. 
          Monitor your progress and maintain the 75% attendance requirement effortlessly.
        </p>
      </div>
    </div>
  );
};

export default StudentDashboard;