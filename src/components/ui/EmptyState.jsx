import { motion } from 'framer-motion'
import { InboxIcon, SearchX, AlertCircle, RefreshCw } from 'lucide-react'

const ICONS = {
  empty:   InboxIcon,
  search:  SearchX,
  error:   AlertCircle,
}

export default function EmptyState({
  variant = 'empty',
  title = 'Nothing here yet',
  message = '',
  action,
  actionLabel = 'Try again',
}) {
  const Icon = ICONS[variant] || InboxIcon

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-16 px-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#E4D8C7]/50 flex items-center justify-center mb-4">
        <Icon size={28} className="text-[#A8978A]" />
      </div>
      <h3 className="text-base font-semibold text-[#3B2923] mb-2">{title}</h3>
      {message && <p className="text-sm text-[#7C6659] max-w-xs leading-relaxed">{message}</p>}
      {action && (
        <motion.button
          onClick={action}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E4D8C7] text-sm font-medium text-[#3B2923] hover:bg-[#F8F3EA] transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <RefreshCw size={14} />
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  )
}
