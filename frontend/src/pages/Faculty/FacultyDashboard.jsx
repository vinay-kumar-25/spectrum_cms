import React from "react";

const FacultyDashboard = () => {
  const features = [
    {
      title: "Create & Manage Classes",
      description: "Create new classes, assign courses, and manage your teaching schedule with ease.",
      icon: "🏫",
      gradient: "from-sky-100 to-blue-50",
      accentColor: "bg-sky-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="80" y="70" width="240" height="160" rx="12" fill="#0ea5e9" opacity="0.2"/>
          <rect x="120" y="110" width="60" height="80" rx="6" fill="#0ea5e9" opacity="0.4"/>
          <rect x="200" y="110" width="60" height="80" rx="6" fill="#0ea5e9" opacity="0.5"/>
          <circle cx="150" cy="140" r="10" fill="#0ea5e9"/>
          <circle cx="230" cy="140" r="10" fill="#0ea5e9"/>
          <rect x="100" y="85" width="200" height="12" rx="6" fill="#0ea5e9" opacity="0.6"/>
          <line x1="140" y1="210" x2="180" y2="210" stroke="#0ea5e9" strokeWidth="3" opacity="0.4"/>
          <line x1="220" y1="210" x2="260" y2="210" stroke="#0ea5e9" strokeWidth="3" opacity="0.4"/>
        </svg>
      )
    },
    {
      title: "Mark Attendance",
      description: "Quickly mark student attendance for your classes and track participation over time.",
      icon: "✓",
      gradient: "from-indigo-100 to-purple-50",
      accentColor: "bg-indigo-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="100" y="80" width="200" height="140" rx="10" fill="#6366f1" opacity="0.2"/>
          <polyline points="140,140 170,170 220,110" stroke="#6366f1" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
          <circle cx="180" cy="140" r="60" fill="none" stroke="#6366f1" strokeWidth="6" opacity="0.3"/>
          <rect x="120" y="100" width="40" height="8" rx="4" fill="#6366f1" opacity="0.4"/>
          <rect x="120" y="120" width="50" height="8" rx="4" fill="#6366f1" opacity="0.4"/>
          <rect x="120" y="190" width="45" height="8" rx="4" fill="#6366f1" opacity="0.4"/>
        </svg>
      )
    },
    {
      title: "Update Marks & Scores",
      description: "Enter and update mid-term, end-term marks and track student performance efficiently.",
      icon: "📊",
      gradient: "from-emerald-100 to-green-50",
      accentColor: "bg-emerald-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="120" y="160" width="35" height="80" rx="4" fill="#10b981" opacity="0.4"/>
          <rect x="170" y="120" width="35" height="120" rx="4" fill="#10b981" opacity="0.6"/>
          <rect x="220" y="90" width="35" height="150" rx="4" fill="#10b981" opacity="0.5"/>
          <text x="132" y="190" fill="#10b981" fontSize="20" fontWeight="bold">85</text>
          <text x="182" y="150" fill="#10b981" fontSize="20" fontWeight="bold">92</text>
          <text x="232" y="120" fill="#10b981" fontSize="20" fontWeight="bold">78</text>
          <line x1="100" y1="250" x2="280" y2="250" stroke="#10b981" strokeWidth="2" opacity="0.3"/>
        </svg>
      )
    },
    {
      title: "Generate Grades",
      description: "Assign final grades to students based on their performance and course completion.",
      icon: "🏆",
      gradient: "from-amber-100 to-yellow-50",
      accentColor: "bg-amber-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <polygon points="200,70 230,150 310,150 250,200 270,270 200,230 130,270 150,200 90,150 170,150" fill="#f59e0b" opacity="0.3"/>
          <circle cx="200" cy="160" r="50" fill="#f59e0b" opacity="0.4"/>
          <text x="185" y="175" fill="#f59e0b" fontSize="36" fontWeight="bold">A+</text>
          <circle cx="140" cy="100" r="20" fill="#fbbf24" opacity="0.5"/>
          <circle cx="260" cy="100" r="20" fill="#fbbf24" opacity="0.5"/>
          <circle cx="140" cy="220" r="15" fill="#fbbf24" opacity="0.4"/>
          <circle cx="260" cy="220" r="15" fill="#fbbf24" opacity="0.4"/>
        </svg>
      )
    },
    {
      title: "View Reports & Analytics",
      description: "Access detailed reports on marks, attendance, grades and class performance statistics.",
      icon: "📈",
      gradient: "from-violet-100 to-purple-50",
      accentColor: "bg-violet-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="100" y="80" width="200" height="140" rx="8" fill="#8b5cf6" opacity="0.2"/>
          <polyline points="130,180 160,150 190,160 220,120 250,140 270,110" stroke="#8b5cf6" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="160" cy="150" r="6" fill="#8b5cf6"/>
          <circle cx="190" cy="160" r="6" fill="#8b5cf6"/>
          <circle cx="220" cy="120" r="6" fill="#8b5cf6"/>
          <circle cx="250" cy="140" r="6" fill="#8b5cf6"/>
          <rect x="120" y="95" width="40" height="6" rx="3" fill="#8b5cf6" opacity="0.4"/>
          <rect x="120" y="110" width="55" height="6" rx="3" fill="#8b5cf6" opacity="0.4"/>
        </svg>
      )
    },
    {
      title: "Search Students",
      description: "Quickly find students by class ID or student ID and view their complete academic records.",
      icon: "🔍",
      gradient: "from-green-100 to-emerald-50",
      accentColor: "bg-green-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <circle cx="170" cy="130" r="55" fill="none" stroke="#22c55e" strokeWidth="7" opacity="0.4"/>
          <line x1="210" y1="170" x2="260" y2="220" stroke="#22c55e" strokeWidth="10" strokeLinecap="round"/>
          <circle cx="170" cy="130" r="35" fill="#22c55e" opacity="0.2"/>
          <circle cx="170" cy="120" r="18" fill="#22c55e" opacity="0.5"/>
          <path d="M 145 145 Q 170 160 195 145" stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <rect x="90" y="70" width="35" height="6" rx="3" fill="#22c55e" opacity="0.3"/>
          <rect x="90" y="85" width="50" height="6" rx="3" fill="#22c55e" opacity="0.3"/>
        </svg>
      )
    },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl overflow-y-auto">
      {/* Hero Header */}
      <div className="bg-white p-16 text-center">
        <div className="text-7xl mb-6">👨‍🏫</div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Faculty Dashboard</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Comprehensive tools to manage your classes, students, and academic records
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
        <div className="text-5xl mb-6">📚</div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Teaching Command Center</h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Empower your teaching with efficient class management, accurate grading, and insightful analytics. 
          Focus on what matters most - educating and inspiring students.
        </p>
      </div>
    </div>
  );
};

export default FacultyDashboard;