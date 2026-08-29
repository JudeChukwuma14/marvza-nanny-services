import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

function StarRating({ rating = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'text-accent fill-accent' : 'text-border'}
        />
      ))}
    </div>
  )
}

export default function TestimonialCard({ testimonial, index = 0 }) {
  const { quote, name, location, service, rating } = testimonial

  return (
    <motion.div
      className="bg-white rounded-2xl border border-[#E4D8C7] p-6 flex flex-col gap-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px -8px rgba(59,41,35,0.12)' }}
    >
      {/* Subtle gradient accent on top edge */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/60 via-accent to-accent/60 rounded-t-2xl" />

      {/* Quote icon + stars */}
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center">
          <Quote size={14} className="text-accent" />
        </div>
        <StarRating rating={rating || 5} />
      </div>

      {/* Quote text */}
      <p className="text-sm text-[#3B2923] leading-relaxed flex-1 italic">
        "{quote}"
      </p>

      {/* Attribution */}
      <div className="flex items-center justify-between pt-3 border-t border-[#E4D8C7]">
        <div>
          <p className="text-sm font-semibold text-[#3B2923]">{name}</p>
          <p className="text-xs text-[#7C6659]">{location}</p>
        </div>
        {service && (
          <span className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">
            {service}
          </span>
        )}
      </div>
    </motion.div>
  )
}
