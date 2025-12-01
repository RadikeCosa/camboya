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
    <div className="space-y-2">
      {success && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 text-green-700 bg-green-50 dark:bg-green-900/20 rounded-lg px-4 py-3 border border-green-200 dark:border-green-800"
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">{successText}</span>
        </div>
      )}
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-3 border border-red-200 dark:border-red-800"
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">{errorText}</span>
        </div>
      )}
    </div>
  );
}
