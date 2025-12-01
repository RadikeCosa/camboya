import React from "react";

interface FormActionsProps {
  onReset?: () => void;
  saving: boolean;
  showReset?: boolean;
  saveLabel: string;
  resetLabel?: string;
}

export default function FormActions({
  onReset,
  saving,
  showReset = false,
  saveLabel,
  resetLabel = "Nueva evaluación",
}: FormActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
      <button
        type="submit"
        disabled={saving}
        className="flex-1 h-12 text-base font-semibold bg-blue-600 text-white rounded-lg shadow-md transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
        aria-label={saveLabel}
      >
        {saving ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Guardando...
          </span>
        ) : (
          saveLabel
        )}
      </button>
      {showReset && (
        <button
          type="button"
          onClick={onReset}
          className="flex-1 sm:flex-none h-12 px-6 text-base font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500/50"
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}
