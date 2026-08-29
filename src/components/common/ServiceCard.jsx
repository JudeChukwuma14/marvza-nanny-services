import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ service, index = 0 }) {
  const { name, slug, tagline, description, icon: Icon, color = '#3B2923', image } = service

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
      className="h-full"
    >
      <Link
        to={`/services/${slug}`}
        className="flex flex-col group h-full bg-white rounded-2xl border border-[#E4D8C7] hover:border-[#3B2923]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        {/* Top Image Section */}
        {image && (
          <div className="w-full h-48 overflow-hidden relative">
            <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/0 transition-colors duration-300" />
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Colored top accent overlay on the image */}
            <div
              className="absolute top-0 left-0 right-0 h-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: color }}
            />
          </div>
        )}

        <div className="p-6 flex-1 flex flex-col">
          {/* Icon - Moved to float between image and content if image exists */}
          <motion.div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${image ? '-mt-12 mb-4 relative z-20 shadow-sm border border-white/50' : 'mb-4'}`}
            style={{ backgroundColor: image ? 'white' : `${color}12` }}
            whileHover={{ scale: 1.1, rotate: -4 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {Icon && <Icon size={22} style={{ color }} />}
          </motion.div>

          <h3 className="text-base font-semibold text-[#3B2923] mb-2 group-hover:text-[#3B2923] transition-colors">
            {name}
          </h3>
          {tagline && (
            <p className="text-xs text-[#B88A62] font-medium mb-3">{tagline}</p>
          )}
          <p className="text-sm text-[#7C6659] leading-relaxed mb-6 flex-1">{description}</p>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B2923] group-hover:gap-2.5 transition-all mt-auto">
            Find out more <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
