import React from "react";

interface SymptomSliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  id: string;
}

export default function SymptomSlider({
  label,
  value,
  min = 0,
  max = 10,
  onChange,
  id,
}: SymptomSliderProps) {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="font-semibold block mb-2"
        style={{ color: "var(--foreground-strong)" }}
      >
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 accent-(--accent) bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-(--accent) shadow-sm"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
      />
      <div
        className="mt-2 text-lg font-bold"
        style={{ color: "var(--foreground-strong)" }}
      >
        {value}
      </div>
    </div>
  );
}
