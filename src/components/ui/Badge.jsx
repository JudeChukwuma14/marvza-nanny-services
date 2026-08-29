/**
 * Status badge — maps status strings to colour variants.
 * No colour-only communication: uses text label always.
 */
const VARIANTS = {
  // Generic
  default:  'bg-[#E4D8C7]/60 text-[#7C6659]',
  // Positive
  success:  'bg-[#E8F3EE] text-[#3F7656]',
  approved: 'bg-[#E8F3EE] text-[#3F7656]',
  active:   'bg-[#E8F3EE] text-[#3F7656]',
  // Warnings / in-progress
  pending:  'bg-[#FBF3E3] text-[#B98945]',
  review:   'bg-[#EEF2FF] text-[#4F46E5]',
  screening:'bg-[#F3E8FF] text-[#7C3AED]',
  interview:'bg-[#FCE7F3] text-[#DB2777]',
  // Neutral
  new:      'bg-[#E0F2FE] text-[#0369A1]',
  applied:  'bg-[#E0F2FE] text-[#0369A1]',
  // Negative
  error:    'bg-[#FAEAEA] text-[#B94A48]',
  rejected: 'bg-[#FAEAEA] text-[#B94A48]',
  suspended:'bg-[#FAEAEA] text-[#B94A48]',
  archived: 'bg-[#E4D8C7]/60 text-[#7C6659]',
  // Urgent
  urgent:   'bg-[#FFF0ED] text-[#C2410C]',
  emergency:'bg-[#FFF0ED] text-[#C2410C]',
}

export default function Badge({ label, variant }) {
  const key = (variant || label || '').toLowerCase().replace(/\s/g, '')
  const styles = VARIANTS[key] || VARIANTS.default

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${styles}`}>
      {label}
    </span>
  )
}
