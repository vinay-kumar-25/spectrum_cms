import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUserType }) => {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Role configurations with icons and gradients
  const roleConfig = {
    student: {
      icon: "🎓",
      title: "Student Portal",
      gradient: "from-emerald-50 to-green-100",
      accent: "emerald",
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="80" r="35" fill="#10b981" opacity="0.3"/>
          <circle cx="100" cy="75" r="25" fill="#10b981" opacity="0.5"/>
          <path d="M 70 110 Q 100 130 130 110 L 130 150 Q 100 170 70 150 Z" fill="#10b981" opacity="0.4"/>
          <circle cx="80" cy="65" r="15" fill="#34d399" opacity="0.4"/>
          <circle cx="120" cy="65" r="15" fill="#34d399" opacity="0.4"/>
        </svg>
      )
    },
    faculty: {
      icon: "👨‍🏫",
      title: "Faculty Portal",
      gradient: "from-sky-50 to-blue-100",
      accent: "sky",
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <rect x="60" y="60" width="80" height="80" rx="8" fill="#0ea5e9" opacity="0.2"/>
          <circle cx="100" cy="90" r="20" fill="#0ea5e9" opacity="0.5"/>
          <rect x="70" y="115" width="60" height="40" rx="6" fill="#0ea5e9" opacity="0.4"/>
          <rect x="50" y="70" width="100" height="8" rx="4" fill="#0ea5e9" opacity="0.6"/>
        </svg>
      )
    },
    admin: {
      icon: "⚙️",
      title: "Admin Portal",
      gradient: "from-rose-50 to-red-100",
      accent: "rose",
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="50" fill="#f43f5e" opacity="0.2"/>
          <circle cx="100" cy="100" r="35" fill="#f43f5e" opacity="0.4"/>
          <rect x="95" y="60" width="10" height="25" rx="2" fill="#f43f5e" opacity="0.6"/>
          <rect x="95" y="115" width="10" height="25" rx="2" fill="#f43f5e" opacity="0.6"/>
          <rect x="60" y="95" width="25" height="10" rx="2" fill="#f43f5e" opacity="0.6"/>
          <rect x="115" y="95" width="25" height="10" rx="2" fill="#f43f5e" opacity="0.6"/>
        </svg>
      )
    },
  };

  const current = roleConfig[role];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/${role}/login`, {
        email,
        password,
      });

      if (res.status === 200) {
        setUserType(role);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Check credentials or server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${current.gradient} flex items-center justify-center p-6`}>
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Illustration & Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-6 p-12">
          <div className="w-64 h-64">
            {current.illustration}
          </div>
          <div className="text-center">
            <div className="text-7xl mb-4">{current.icon}</div>
            <h2 className={`text-4xl font-bold text-${current.accent}-700`}>
              {current.title}
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              Secure access to your academic portal
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl p-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center mb-4">
              <img src="/NITUK Logo.png" alt="NIT UK" className="w-16" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500">Sign in to access your dashboard</p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-2 p-2 bg-gray-100 rounded-2xl">
            {Object.keys(roleConfig).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  role === r
                    ? `bg-${roleConfig[r].accent}-500 text-white shadow-lg`
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{roleConfig[r].icon}</span>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed bg-${current.accent}-500 hover:bg-${current.accent}-600 shadow-lg`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Logging in...
                </span>
              ) : (
                `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              © 2025 NIT Uttarakhand — Secure Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;