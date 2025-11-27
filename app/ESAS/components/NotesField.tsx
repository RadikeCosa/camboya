import React from "react";

interface NotesFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id?: string;
  error?: string;
}

export default function NotesField({
  value,
  onChange,
  label,
  id = "notes",
  error,
}: NotesFieldProps) {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="font-semibold block mb-2"
        style={{ color: "var(--foreground-strong)" }}
      >
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={`w-full p-3 text-base rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-(--accent) resize-none ${
          error
            ? "border-red-500 ring-red-500"
            : "border-gray-300 dark:border-gray-700"
        }`}
        style={{ background: "var(--background)", color: "var(--foreground)" }}
        aria-label={label}
      />
      {error && (
        <div
          className="text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-300 rounded-lg px-4 py-2 shadow-sm mt-2"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
    </div>
  );
}
