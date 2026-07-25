"use client";

import React from "react";
import { Check } from "lucide-react";

export default function FormStepper({ steps, currentStep }) {
  return (
    <div 
      className="grid gap-3 bg-slate-950/60 border border-slate-800 p-3 rounded-xl"
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((step) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;

        return (
          <div
            key={step.id}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
              isCurrent ? "bg-blue-600/10 border border-blue-500/30" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                isCompleted
                  ? "bg-emerald-600 text-white"
                  : isCurrent
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              {isCompleted ? <Check size={14} /> : step.id}
            </div>
            <div className="hidden sm:block overflow-hidden">
              <p
                className={`text-xs font-semibold truncate ${
                  isCurrent
                    ? "text-blue-400"
                    : isCompleted
                    ? "text-slate-200"
                    : "text-slate-500"
                }`}
              >
                {step.title}
              </p>
              <p className="text-[10px] text-slate-500 truncate">{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}