import React from "react";

interface SymptomSliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  id: string;
}

function getSeverityColor(value: number): string {
  if (value <= 3) return "bg-green-500";
  if (value <= 6) return "bg-yellow-500";
  return "bg-red-500";
}

function getSeverityLabel(value: number): string {
  if (value === 0) return "Sin síntoma";
  if (value <= 3) return "Leve";
  if (value <= 6) return "Moderado";
  return "Severo";
}

export default function SymptomSlider({
  label,
  value,
  min = 0,
  max = 10,
  onChange,
  id,
}: SymptomSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <label
          htmlFor={id}
          className="font-medium text-sm"
          style={{ color: "var(--foreground-strong)" }}
        >
          {label}
        </label>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${getSeverityColor(value)}`}
          >
            {getSeverityLabel(value)}
          </span>
          <span
            className="text-xl font-bold min-w-[2rem] text-center"
            style={{ color: "var(--foreground-strong)" }}
          >
            {value}
          </span>
        </div>
      </div>

      <div className="relative">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          style={{
            background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label}
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-0.5">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
}
