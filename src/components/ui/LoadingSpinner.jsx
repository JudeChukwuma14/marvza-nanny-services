import { motion } from 'framer-motion'

export function LoadingSpinner({ size = 20, className = '' }) {
  return (
    <motion.div
      className={`rounded-full border-2 border-[#E4D8C7] border-t-[#3B2923] ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export function LoadingPage({ message = 'Loading…' }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <LoadingSpinner size={36} />
      <p className="text-sm text-[#7C6659]">{message}</p>
    </div>
  )
}

export function SkeletonBlock({ className = '' }) {
  return (
    <motion.div
      className={`bg-[#E4D8C7] rounded-lg ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
