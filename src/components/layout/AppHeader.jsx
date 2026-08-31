import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail, Zap } from "lucide-react";
import logo from "../../assets/images/baby.png";
const CONTACT_PHONE = "+44 7944 219712";
const CONTACT_PHONE_HREF = "tel:+447944219712";
const CONTACT_EMAIL = "Hello@marvza.com";
const CONTACT_EMAIL_HREF = "mailto:Hello@marvza.com";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "Hotel Nannies", to: "/services/hotel-nanny" },
      {
        label: "Backup & Emergency Nannies",
        to: "/services/backup-emergency-nanny",
      },
      { label: "Event Nannies", to: "/services/event-nanny" },
      { label: "Wedding Nannies", to: "/services/wedding-nanny" },
      {
        label: "Travel & Vacation Nannies",
        to: "/services/travel-vacation-nanny",
      },
      { label: "Night Nannies", to: "/services/night-nanny" },
      { label: "Full-Time Nannies", to: "/services/full-time-nanny" },
      { label: "Part-Time Nannies", to: "/services/part-time-nanny" },
      { label: "After-School Nannies", to: "/services/after-school-nanny" },
      {
        label: "Temporary & Ad-Hoc Nannies",
        to: "/services/temporary-adhoc-nanny",
      },
      {
        label: "Maternity/Newborn Nannies",
        to: "/services/maternity-newborn-nanny",
      },
      { label: "Evening Babysitters", to: "/services/evening-babysitter" },
    ],
  },
  // { label: 'How It Works', to: '/how-it-works' },
  // { label: 'For Families', to: '/for-families' },
  // { label: 'For Nannies', to: '/for-nannies' },
  { label: "About", to: "/about" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.12 } },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 340, damping: 36 },
  },
  exit: { x: "100%", transition: { duration: 0.22, ease: "easeIn" } },
};

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-[#3B2923] hover:text-green transition-colors py-2"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Services
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl border border-[#E4D8C7] shadow-lg overflow-hidden z-50"
          >
            {NAV_LINKS[1].children.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-4 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-green/5 text-green font-medium"
                      : "text-[#3B2923] hover:bg-[#F8F3EA] hover:text-green"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AppHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top contact bar — scrolls away with the page, not part of the sticky header */}
      <div className="hidden sm:block bg-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center gap-5">
            <a
              href={CONTACT_PHONE_HREF}
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone size={12} className="shrink-0" />
              {CONTACT_PHONE}
            </a>
            <a
              href={CONTACT_EMAIL_HREF}
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail size={12} className="shrink-0" />
              {CONTACT_EMAIL}
            </a>
          </div>
          <span className="hidden md:inline text-white/60">
            We connect families across London
          </span>
        </div>
      </div>

      <motion.header
        className={`sticky top-0 z-40 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="bg-white border-b border-[#E4D8C7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0 group"
              aria-label="Marvza home"
            >
              <motion.div
                className="w-10 h-10 overflow-hidden"
                whileHover={{ scale: 1.08, rotate: -4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <img
                  src={logo}
                  alt="Marvza Private Nannies & Mannies Logo"
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
              <div>
                <span className="text-[16px] font-bold font-serif text-green leading-tight block">
                  Marvza
                </span>
                <span className="text-[10px] text-[#7C6659] leading-tight block">
                  Private Nannies & Mannies
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.filter((l) => l.label !== "Services").map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                      isActive
                        ? "text-green bg-green/5"
                        : "text-[#7C6659] hover:text-green hover:bg-[#F8F3EA]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-0 rounded-lg bg-green/5"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <ServicesDropdown />
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <a
                  href="tel:+447944219712"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B94A48] text-white text-sm font-semibold hover:bg-[#a03d3c] transition-colors shadow-sm"
                >
                  <Zap size={14} /> Need Childcare Today?
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/request-nanny"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green text-white text-sm font-semibold hover:bg-green-dark transition-colors shadow-sm"
                >
                  Request a Nanny
                </Link>
              </motion.div>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              className="lg:hidden p-2 rounded-lg text-[#3B2923] hover:bg-[#F8F3EA] transition-colors"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              whileTap={{ scale: 0.92 }}
            >
              <Menu size={22} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-[#3B2923]/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] bg-white shadow-2xl flex flex-col lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4D8C7]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-green flex items-center justify-center">
                    <img src={logo} alt="Marvza Private Nannies & Mannies Logo" />
                  </div>
                  <span className="font-bold font-serif text-green">
                    Marvza
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg text-[#7C6659] hover:bg-[#F8F3EA] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav
                className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1"
                aria-label="Mobile navigation"
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    {link.children ? (
                      <>
                        <p className="px-3 py-2 text-xs font-semibold text-[#7C6659] uppercase tracking-wider">
                          Services
                        </p>
                        {link.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            className={({ isActive }) =>
                              `block px-5 py-2.5 rounded-lg text-sm transition-colors ${
                                isActive
                                  ? "text-green bg-green/5 font-medium"
                                  : "text-[#3B2923] hover:bg-[#F8F3EA]"
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </>
                    ) : (
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "text-green bg-green/5"
                              : "text-[#3B2923] hover:bg-[#F8F3EA]"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Contact details */}
              <div className="px-4 py-4 border-t border-[#E4D8C7] flex flex-col gap-2.5">
                <a
                  href={CONTACT_PHONE_HREF}
                  className="flex items-center gap-2.5 text-sm text-[#3B2923] hover:text-green transition-colors"
                >
                  <Phone size={15} className="shrink-0 text-green" />
                  {CONTACT_PHONE}
                </a>
                <a
                  href={CONTACT_EMAIL_HREF}
                  className="flex items-center gap-2.5 text-sm text-[#3B2923] hover:text-green transition-colors"
                >
                  <Mail size={15} className="shrink-0 text-green" />
                  {CONTACT_EMAIL}
                </a>
              </div>

              {/* CTA buttons */}
              <div className="px-4 py-5 border-t border-[#E4D8C7] flex flex-col gap-3">
                <a
                  href="tel:+447944219712"
                  className="text-center py-2.5 rounded-xl bg-[#B94A48] text-white text-sm font-semibold hover:bg-[#a03d3c] transition-colors flex items-center justify-center gap-2"
                >
                  <Zap size={16} /> Need Childcare Today?
                </a>
                <Link
                  to="/request-nanny"
                  className="text-center py-2.5 rounded-xl bg-green text-white text-sm font-semibold hover:bg-green-dark transition-colors"
                >
                  Request a Nanny
                </Link>
                <Link
                  to="/become-a-nanny"
                  className="text-center py-2.5 rounded-xl border border-green text-green text-sm font-semibold hover:bg-green/5 transition-colors"
                >
                  Become a Nanny
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
