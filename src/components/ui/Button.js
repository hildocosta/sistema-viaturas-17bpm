import React from "react";

export function PrimaryButton({ 
  children, 
  icon: Icon, 
  iconPosition = "left", 
  ...props 
}) {
  return (
    <button
      {...props}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-600/20 disabled:opacity-50"
    >
      {Icon && iconPosition === "left" && <Icon size={16} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={16} />}
    </button>
  );
}

export function SecondaryButton({ children, icon: Icon, ...props }) {
  return (
    <button
      {...props}
      className="flex items-center gap-2 border border-slate-800 hover:bg-slate-900 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

export function IconButton({ icon: Icon, title, ...props }) {
  return (
    <button
      {...props}
      title={title}
      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-blue-400 transition-all text-slate-400 cursor-pointer"
    >
      {Icon && <Icon size={18} />}
    </button>
  );
}