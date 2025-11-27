import React from "react";

interface FormActionsProps {
  onSave: () => void;
  onReset?: () => void;
  saving: boolean;
  showReset?: boolean;
  saveLabel: string;
  resetLabel?: string;
}

export default function FormActions({
  onSave,
  onReset,
  saving,
  showReset = false,
  saveLabel,
  resetLabel = "Nueva evaluación",
}: FormActionsProps) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <button
        type="submit"
        disabled={saving}
        onClick={onSave}
        className="w-full h-12 text-lg font-semibold bg-(--accent) text-(--accent-foreground) rounded-lg shadow-md transition hover:shadow-lg hover:bg-blue-600 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-(--accent)"
        aria-label={saveLabel}
      >
        {saveLabel}
      </button>
      {showReset && (
        <button
          type="button"
          onClick={onReset}
          className="w-full h-10 text-base font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}
