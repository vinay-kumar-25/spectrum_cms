// src/components/Toast.jsx
import React, { useEffect } from "react";
import { CheckCircle, X, AlertTriangle } from "lucide-react";

const Toast = ({ message, type, onClose }) => {
  const baseClasses =
    "fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl transition-all duration-300 transform z-[100]";
  const typeClasses = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-sky-500 text-white",
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="flex items-center">
        {type === "success" && <CheckCircle className="w-5 h-5 mr-2" />}
        {type === "error" && <AlertTriangle className="w-5 h-5 mr-2" />}
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 opacity-75 hover:opacity-100">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
