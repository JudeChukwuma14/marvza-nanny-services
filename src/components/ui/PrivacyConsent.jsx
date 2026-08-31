import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function PrivacyConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('marvza_cookie_consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('marvza_cookie_consent', 'accepted')
    setIsVisible(false)
    // Ensure analytics scripts are loaded here or listened to elsewhere
  }

  const handleDecline = () => {
    localStorage.setItem('marvza_cookie_consent', 'declined')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-border p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="font-serif text-lg font-semibold text-text mb-2">We respect your privacy</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                We use cookies to improve your experience and analyze site performance. You can choose to accept all cookies or decline non-essential tracking. For more details, see our <Link to="/cookie-policy" className="text-green hover:underline font-medium">Cookie Policy</Link> and <Link to="/privacy-policy" className="text-green hover:underline font-medium">Privacy Policy</Link>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border text-text font-semibold hover:bg-bg transition-colors text-sm"
              >
                Decline Optional
              </button>
              <button
                onClick={handleAccept}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-green text-white font-semibold hover:bg-green-dark transition-colors text-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
