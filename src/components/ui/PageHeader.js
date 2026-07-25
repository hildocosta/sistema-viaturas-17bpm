import React from "react";

export function PageHeader({ title, description, icon: Icon, action }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6 shrink-0">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          {Icon && <Icon className="text-blue-500" size={24} />}
          {title}
        </h1>
        {description && (
          <p className="text-xs text-slate-400 mt-1">{description}</p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}