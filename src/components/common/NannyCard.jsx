import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

function getInitials(name) {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const AVATAR_GRADIENTS = [
  'from-[#3B2923] to-[#5A4238]',
  'from-[#9C7048] to-[#B88A62]',
  'from-[#5A4238] to-[#A8927E]',
  'from-[#7C6659] to-[#3B2923]',
]

export default function NannyCard({ nanny, index = 0 }) {
  const { name, experience, location, badge, specialties = [] } = nanny
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]

  return (
    <motion.div
      className="shrink-0 w-72 bg-white rounded-2xl border border-border overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px -8px rgba(59,41,35,0.12)' }}
    >
      {/* Avatar area */}
      <div className="aspect-[4/3] bg-gradient-to-br from-accent-light/60 to-bg flex items-center justify-center relative">
        <div
          className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
        >
          <span className="text-2xl font-serif font-semibold text-white tracking-wide">
            {getInitials(name)}
          </span>
        </div>
        {/* Decorative ring */}
        <div className="absolute w-24 h-24 rounded-full border-2 border-accent/20 animate-pulse" />
      </div>

      <div className="p-5">
        <h3 className="text-sm font-semibold text-text mb-1">{name}</h3>
        <p className="text-xs text-text-muted mb-1.5">{experience}</p>
        <p className="flex items-center gap-1 text-xs text-text-muted mb-3">
          <MapPin size={12} className="shrink-0" />
          {location}
        </p>
        <span className="inline-block text-[11px] font-medium text-white bg-green px-2.5 py-1 rounded-full mb-3">
          {badge}
        </span>

        {/* Specialties */}
        {specialties.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {specialties.map((s) => (
              <span
                key={s}
                className="text-[10px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
