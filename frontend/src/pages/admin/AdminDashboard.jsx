import React from "react";

const AdminDashboard = () => {
  const features = [
    {
      title: "Manage Students",
      description: "Add, update, view, and delete students. Filter by year, branch, and enrollment.",
      icon: "👨‍🎓",
      gradient: "from-green-100 to-emerald-50",
      accentColor: "bg-green-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <circle cx="200" cy="120" r="50" fill="#10b981" opacity="0.2"/>
          <circle cx="200" cy="120" r="35" fill="#10b981"/>
          <path d="M 140 180 Q 200 220 260 180 L 260 240 Q 200 280 140 240 Z" fill="#10b981" opacity="0.3"/>
          <rect x="100" y="200" width="200" height="80" rx="10" fill="#10b981" opacity="0.6"/>
          <circle cx="150" cy="100" r="25" fill="#34d399" opacity="0.5"/>
          <circle cx="250" cy="100" r="25" fill="#34d399" opacity="0.5"/>
        </svg>
      )
    },
    {
      title: "Manage Faculties",
      description: "Add, update, view, and delete faculty records. Assign departments and courses.",
      icon: "👩‍🏫",
      gradient: "from-blue-100 to-cyan-50",
      accentColor: "bg-blue-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="120" y="80" width="160" height="140" rx="10" fill="#3b82f6" opacity="0.2"/>
          <circle cx="200" cy="130" r="30" fill="#3b82f6" opacity="0.6"/>
          <rect x="140" y="170" width="120" height="60" rx="8" fill="#3b82f6" opacity="0.4"/>
          <line x1="160" y1="220" x2="240" y2="220" stroke="#3b82f6" strokeWidth="3"/>
          <circle cx="100" cy="180" r="15" fill="#60a5fa" opacity="0.5"/>
          <circle cx="300" cy="180" r="15" fill="#60a5fa" opacity="0.5"/>
        </svg>
      )
    },
    {
      title: "Manage Courses",
      description: "Add, update, view, and delete courses. Include credits, type, and department.",
      icon: "📚",
      gradient: "from-amber-100 to-yellow-50",
      accentColor: "bg-amber-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="100" y="100" width="80" height="100" rx="5" fill="#f59e0b" opacity="0.3"/>
          <rect x="160" y="80" width="80" height="120" rx="5" fill="#f59e0b" opacity="0.5"/>
          <rect x="220" y="90" width="80" height="110" rx="5" fill="#f59e0b" opacity="0.4"/>
          <line x1="140" y1="120" x2="140" y2="180" stroke="#f59e0b" strokeWidth="2"/>
          <line x1="200" y1="100" x2="200" y2="180" stroke="#f59e0b" strokeWidth="2"/>
          <line x1="260" y1="110" x2="260" y2="180" stroke="#f59e0b" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Manage Classes",
      description: "Create and assign classes. Track class schedules and enrolled students.",
      icon: "🏫",
      gradient: "from-purple-100 to-violet-50",
      accentColor: "bg-purple-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="80" y="60" width="240" height="180" rx="12" fill="#a855f7" opacity="0.2"/>
          <rect x="120" y="100" width="160" height="100" rx="8" fill="#a855f7" opacity="0.4"/>
          <circle cx="140" cy="140" r="8" fill="#a855f7"/>
          <circle cx="180" cy="140" r="8" fill="#a855f7"/>
          <circle cx="220" cy="140" r="8" fill="#a855f7"/>
          <circle cx="260" cy="140" r="8" fill="#a855f7"/>
          <rect x="100" y="80" width="200" height="15" rx="7" fill="#a855f7" opacity="0.6"/>
        </svg>
      )
    },
    {
      title: "Analytics & Insights",
      description: "View enrolled courses, student distribution, faculty workload, and statistics.",
      icon: "📊",
      gradient: "from-indigo-100 to-blue-50",
      accentColor: "bg-indigo-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="120" y="180" width="40" height="60" rx="5" fill="#6366f1" opacity="0.4"/>
          <rect x="180" y="140" width="40" height="100" rx="5" fill="#6366f1" opacity="0.6"/>
          <rect x="240" y="100" width="40" height="140" rx="5" fill="#6366f1" opacity="0.5"/>
          <polyline points="100,200 140,170 200,130 260,90 300,110" stroke="#6366f1" strokeWidth="3" fill="none"/>
          <circle cx="140" cy="170" r="6" fill="#6366f1"/>
          <circle cx="200" cy="130" r="6" fill="#6366f1"/>
          <circle cx="260" cy="90" r="6" fill="#6366f1"/>
        </svg>
      )
    },
    {
      title: "Search & Filter",
      description: "Easily search students, faculties, and courses. Filter by department, type, year.",
      icon: "🔍",
      gradient: "from-teal-100 to-cyan-50",
      accentColor: "bg-teal-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <circle cx="180" cy="130" r="60" fill="none" stroke="#14b8a6" strokeWidth="8" opacity="0.4"/>
          <line x1="225" y1="175" x2="280" y2="230" stroke="#14b8a6" strokeWidth="12" strokeLinecap="round"/>
          <circle cx="180" cy="130" r="40" fill="#14b8a6" opacity="0.2"/>
          <rect x="100" y="60" width="40" height="8" rx="4" fill="#14b8a6" opacity="0.3"/>
          <rect x="100" y="80" width="60" height="8" rx="4" fill="#14b8a6" opacity="0.3"/>
          <rect x="100" y="100" width="50" height="8" rx="4" fill="#14b8a6" opacity="0.3"/>
        </svg>
      )
    },
    {
      title: "Secure Admin Access",
      description: "Only authorized admins can perform actions, ensuring data security and integrity.",
      icon: "🔒",
      gradient: "from-red-100 to-rose-50",
      accentColor: "bg-red-500",
      illustration: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="140" y="140" width="120" height="100" rx="10" fill="#ef4444" opacity="0.3"/>
          <rect x="160" y="100" width="80" height="60" rx="30" fill="none" stroke="#ef4444" strokeWidth="8" opacity="0.5"/>
          <circle cx="200" cy="180" r="15" fill="#ef4444" opacity="0.6"/>
          <rect x="195" y="185" width="10" height="30" rx="2" fill="#ef4444" opacity="0.6"/>
          <path d="M 120 160 L 280 160" stroke="#ef4444" strokeWidth="4" opacity="0.3"/>
        </svg>
      )
    },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl overflow-y-auto">
      {/* Hero Header */}
      <div className="bg-white p-16 text-center">
        <div className="text-7xl mb-6">⚙️</div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Admin Control Center</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Complete administrative control with powerful management tools
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
        <div className="text-5xl mb-6">🛡️</div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Administrative Command Center</h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          This dashboard represents the complete powers and responsibilities of an Administrator. 
          Manage your institution with care and precision.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;