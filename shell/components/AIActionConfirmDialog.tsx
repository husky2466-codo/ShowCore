import { X, Pencil, Check, AlertCircle } from 'lucide-react';
import type { SuggestedAction } from './AIAssistant';

interface AIActionConfirmDialogProps {
  action: SuggestedAction;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * AI Action Confirmation Dialog
 *
 * Shows a preview of form fields that will be filled by the AI assistant.
 * Users must confirm before the values are applied.
 */
export function AIActionConfirmDialog({
  action,
  onConfirm,
  onCancel,
}: AIActionConfirmDialogProps) {
  // Get fields to display
  const fields: { id: string; value: string }[] = [];

  if (action.type === 'fill_field' && action.fieldId && action.fieldValue) {
    fields.push({ id: action.fieldId, value: action.fieldValue });
  } else if (action.type === 'fill_form' && action.formFields) {
    for (const [id, value] of Object.entries(action.formFields)) {
      fields.push({ id, value });
    }
  }

  // Format field ID for display (e.g., "profile.name" -> "Name")
  const formatFieldLabel = (fieldId: string): string => {
    const parts = fieldId.split('.');
    const lastPart = parts[parts.length - 1];
    return lastPart
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md mx-4 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-amber-50 dark:bg-amber-500/10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white">
              <Pencil className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                AI Assistant
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Review before filling
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              The AI assistant wants to fill the following fields. Please review the values before confirming.
            </p>
          </div>

          {/* Field Preview */}
          <div className="space-y-3 mb-4">
            {fields.map(({ id, value }) => (
              <div
                key={id}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-3"
              >
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  {formatFieldLabel(id)}
                </label>
                <div className="text-sm text-zinc-900 dark:text-zinc-100 font-medium">
                  {value || <span className="text-zinc-400 italic">Empty</span>}
                </div>
              </div>
            ))}
          </div>

          {fields.length === 0 && (
            <div className="text-center py-4 text-zinc-500 dark:text-zinc-400 text-sm">
              No fields to fill
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={fields.length === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            <Check className="h-4 w-4" />
            Fill Fields
          </button>
        </div>
      </div>
    </div>
  );
}
