import { AlertTriangle, X } from 'lucide-react'

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  isSubmitting,
  title = 'Submit your application?',
  description = 'Please confirm you are ready to submit. Once submitted, you will not be able to edit your application.',
  confirmText = 'Submit Application',
  children,
}) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#3B2923]/50 backdrop-blur-sm"
        onClick={!isSubmitting ? onCancel : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10 animate-scale-in">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#3B2923]/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-[#3B2923]" />
          </div>
          <div className="flex-1">
            <h3 id="confirm-modal-title" className="text-base font-semibold text-[#3B2923]">
              {title}
            </h3>
            <p className="text-sm text-[#7C6659] mt-1">
              {description}
            </p>
            {children}
          </div>
          {!isSubmitting && (
            <button
              type="button"
              onClick={onCancel}
              className="p-1 rounded-md text-[#7C6659] hover:text-[#3B2923] hover:bg-[#F8F3EA] transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#E4D8C7] text-sm font-medium text-[#3B2923]
              hover:bg-[#F8F3EA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Go back and review
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 rounded-lg bg-[#3B2923] text-white text-sm font-semibold
              hover:bg-[#2A1B17] transition-colors disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
