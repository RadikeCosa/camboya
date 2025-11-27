import React from "react";

interface StatusMessageProps {
  success?: boolean;
  error?: string | null;
  successText: string;
  errorText: string;
}

export default function StatusMessage({
  success,
  error,
  successText,
  errorText,
}: StatusMessageProps) {
  if (!success && !error) return null;
  return (
    <div className="mt-4">
      {success && (
        <div
          role="status"
          aria-live="polite"
          className="text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-300 rounded-lg px-4 py-2 shadow-sm"
        >
          {successText}
        </div>
      )}
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-300 rounded-lg px-4 py-2 shadow-sm"
        >
          {errorText}
        </div>
      )}
    </div>
  );
}
