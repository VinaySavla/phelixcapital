"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

export default function PhelixCapitalHomepage() {
  const [theme, setTheme] = useState('light')
  const isDark = theme === 'dark'
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const nextErrors = {}
    const trimmedName = formData.name.trim()
    const trimmedEmail = formData.email.trim()
    const trimmedPhone = formData.phone.trim()
    const trimmedMessage = formData.message.trim()

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      nextErrors.name = 'Name must be between 2 and 50 characters.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!/^\d{10}$/.test(trimmedPhone)) {
      nextErrors.phone = 'Mobile number must be exactly 10 digits.'
    }

    return nextErrors
  }

  const themeToggleBtn = (
    <button
      type="button"
      hidden
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={isDark ? 'p-3 rounded-2xl border border-[#C8A96B]/20 bg-white/[0.04] hover:bg-white/[0.08] transition duration-300 flex-shrink-0' : 'p-3 rounded-2xl border border-[#af8239]/30 bg-[#fffaf5] hover:bg-[#fff3e8] transition duration-300 flex-shrink-0'}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-[#F2E3BF]">
          <path d="M12 3v2.5M12 18.5V21M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M3 12h2.5M18.5 12H21M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-[#061226]">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('phelix-theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
      return
    }

    document.documentElement.classList.remove('dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('phelix-theme', theme)
  }, [theme])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value
    }))
    setFormErrors((current) => ({
      ...current,
      [name]: ''
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormStatus({ type: '', message: '' })
    const nextErrors = validateForm()
    setFormErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message right now.')
      }

      setFormStatus({ type: 'success', message: 'Thanks. Your message has been sent successfully.' })
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong while sending your message.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={isDark ? 'min-h-screen bg-[#07080B] text-white font-sans' : 'min-h-screen bg-[#FAF6F1] text-[#061226] font-sans'}>
      {/* NAVBAR */}
      <header className={isDark ? 'fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[#07080B]/75 border-b border-[#C8A96B]/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]' : 'fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/90 border-b border-[#af8239]/20 shadow-[0_10px_35px_rgba(6,18,38,0.08)]'}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* 1. Logo (Always visible) */}
        <a href='/'><img src={isDark ? "/phelixcapitallogodark.png" : "/phelixcapitallogo.png"} alt="Phelix Capital Logo" className="h-14 w-auto relative z-50" /></a>

        {/* 2. Mobile Controls: Theme Toggle & Hamburger (Hidden on desktop) */}
        <div className="flex lg:hidden items-center gap-3 relative z-[60]">
          {themeToggleBtn}
          
          <button 
            className="p-2 flex flex-col justify-center items-center gap-1.5 ml-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`w-6 h-0.5 block transition-all duration-300 ${isDark ? 'bg-gray-300' : 'bg-[#061226]'} ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 block transition-all duration-300 ${isDark ? 'bg-gray-300' : 'bg-[#061226]'} ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 block transition-all duration-300 ${isDark ? 'bg-gray-300' : 'bg-[#061226]'} ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* 3. Mobile Dark Overlay (Click to close) */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* 4. Sidebar Wrapper (Mobile Menu & Desktop Nav/Buttons) */}
        <div className={`
          /* Mobile Classes: Fixed Sidebar */
          fixed top-0 right-0 h-screen w-[280px] pt-32 px-8 flex flex-col gap-10 z-50
          transform transition-transform duration-300 ease-in-out shadow-2xl
          ${isDark ? 'bg-[#07080B] border-l border-[#C8A96B]/10' : 'bg-white border-l border-[#af8239]/20'}
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          
          /* Desktop Classes: Transparent wrapper to preserve exact spacing */
          lg:contents
        `}>
          
          {/* Main Navigation Links */}
          <nav className={isDark ? 'flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-14 text-[16px] lg:text-[15px] text-gray-300' : 'flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-14 text-[16px] lg:text-[15px] text-[#061226]'}>
            <a href="#services" onClick={() => setIsOpen(false)} className={isDark ? 'hover:text-[#F2E3BF] transition duration-300 tracking-wide w-full border-b border-[#C8A96B]/10 pb-4 lg:border-0 lg:pb-0 lg:w-auto' : 'hover:text-[#af8239] transition duration-300 tracking-wide w-full border-b border-[#af8239]/10 pb-4 lg:border-0 lg:pb-0 lg:w-auto'}>
              Why Choose Us
            </a>
            <a href="#about" onClick={() => setIsOpen(false)} className={isDark ? 'hover:text-[#F2E3BF] transition duration-300 tracking-wide w-full border-b border-[#C8A96B]/10 pb-4 lg:border-0 lg:pb-0 lg:w-auto' : 'hover:text-[#af8239] transition duration-300 tracking-wide w-full border-b border-[#af8239]/10 pb-4 lg:border-0 lg:pb-0 lg:w-auto'}>
              About Us
            </a>
            <a href="#contact" onClick={() => setIsOpen(false)} className={isDark ? 'hover:text-[#F2E3BF] transition duration-300 tracking-wide w-full border-b border-[#C8A96B]/10 pb-4 lg:border-0 lg:pb-0 lg:w-auto' : 'hover:text-[#af8239] transition duration-300 tracking-wide w-full border-b border-[#af8239]/10 pb-4 lg:border-0 lg:pb-0 lg:w-auto'}>
              Contact
            </a>
          </nav>

          {/* Actions: Theme Toggle (Desktop Only here) & Login (Mobile + Desktop) */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full lg:w-auto">
            
            {/* Desktop Theme Toggle (Hidden on mobile sidebar) */}
            <div className="hidden lg:block">
              {themeToggleBtn}
            </div>

            <a
              href="https://investor.phelixcap.in/investor/login"
              target="_blank"
              rel="noopener noreferrer"
              className={isDark ? 'w-full lg:w-auto px-6 py-3 rounded-2xl border border-[#C8A96B]/20 bg-white/[0.02] hover:bg-white/[0.05] transition duration-300 text-[15px] text-center' : 'w-full lg:w-auto px-6 py-3 rounded-2xl border border-[#af8239]/30 bg-[#fffaf5] hover:bg-[#fff3e8] transition duration-300 text-[15px] text-[#061226] text-center'} 
            >
              Log in / Sign up
            </a>
          </div>
          
        </div>
      </div>
    </header>

      {/* HERO */}
      <section className={isDark ? 'relative min-h-[850px] flex flex-col justify-center overflow-hidden bg-[#05070B] pt-28 border-b border-white/[0.03] font-[\'DM_Sans\']' : 'relative min-h-[850px] flex flex-col justify-center overflow-hidden bg-[#F6F1E9] pt-28 border-b border-[#af8239]/10 font-[\'DM_Sans\']'}>
        <div className={isDark ? 'absolute inset-0 opacity-20' : 'absolute inset-0'}>
          <img
            src="/herobg.jpeg"
            alt=""
            className="w-full h-full object-cover object-[35%_center] md:object-center"
          />
        </div>

        <div className={isDark ? 'absolute inset-0 bg-black/70' : 'absolute inset-0 bg-gradient-to-r from-[#F8F4ED]/15 via-transparent to-transparent'} />

        {isDark && (
          <>
            <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#D8B36A]/[0.07] blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#4A6FA5]/[0.08] blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            <div className="absolute top-[50%] left-[50%] w-[600px] h-[300px] rounded-full bg-[#8B5E3C]/[0.05] blur-[140px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
          </>
        )}

        {!isDark && (
          <>
            <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#af8239]/[0.06] blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#4A6FA5]/[0.06] blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            <div className="absolute top-[50%] left-[50%] w-[600px] h-[300px] rounded-full bg-[#8B5E3C]/[0.04] blur-[140px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
          </>
        )}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -30, 0], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-[#D8B36A]"
          />
          <motion.div
            animate={{ y: [0, -40, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-[35%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#D8B36A]"
          />
          <motion.div
            animate={{ y: [0, -25, 0], opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            className="absolute top-[60%] left-[40%] w-1 h-1 rounded-full bg-[#C8A96B]"
          />
          <motion.div
            animate={{ y: [0, -35, 0], opacity: [0.08, 0.22, 0.08] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
            className="absolute top-[25%] right-[35%] w-0.5 h-0.5 rounded-full bg-white"
          />
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute top-[70%] left-[60%] w-1 h-1 rounded-full bg-[#D8B36A]"
          />
          <motion.div
            animate={{ y: [0, -45, 0], opacity: [0.06, 0.18, 0.06] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-[10%] left-[55%] w-0.5 h-0.5 rounded-full bg-white"
          />
          <motion.div
            animate={{ y: [0, -28, 0], x: [0, -8, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
            className="absolute top-[45%] left-[10%] w-1 h-1 rounded-full bg-[#C8A96B]"
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
        >
          <div className="max-w-[780px]">
            <h1 className="text-[52px] sm:text-[68px] lg:text-[82px] font-normal leading-[0.98] tracking-[-0.035em] mb-8 font-['DM_Serif_Display']">
              <span className={isDark ? 'text-white' : 'text-[#09223D]'}>Smart investing,</span>
              <br />
              <span className={isDark ? 'text-[#D8B36A] italic' : 'text-[#AF761E] italic'}>
                Sustainable wealth
              </span>
            </h1>

            <div className={isDark ? 'w-20 h-px bg-[#D8B36A] mb-7' : 'w-20 h-[2px] bg-[#AF761E] mb-7'} />

            <p className={isDark ? 'text-[18px] md:text-[21px] text-gray-200 leading-[1.7] max-w-xl mb-7 font-normal' : 'text-[18px] md:text-[21px] text-[#334155] leading-[1.7] max-w-xl mb-7 font-normal'}>
              Empowering investors through transparent,
              <br />
              research driven mutual fund solutions.
            </p>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={isDark ? 'inline-flex items-center gap-4 px-8 py-4 rounded-lg bg-[#D8B36A] text-black text-[16px] font-medium tracking-wide hover:bg-[#E7C98A] transition duration-300 shadow-[0_12px_40px_rgba(216,179,106,0.22)]' : 'inline-flex items-center gap-4 px-8 py-4 rounded-lg bg-[#B47A22] text-white text-[16px] font-medium tracking-wide hover:bg-[#966319] transition duration-300 shadow-[0_12px_35px_rgba(175,130,57,0.25)]'}
            >
              Book Free Consultation <span aria-hidden="true" className="text-xl">→</span>
            </motion.a>
          </div>

          <div className={isDark ? 'mt-14 pt-7 border-t border-white/10 grid sm:grid-cols-3 max-w-[850px]' : 'mt-14 pt-7 border-t border-[#09223D]/10 grid sm:grid-cols-3 max-w-[850px]'}>
            {[
              {
                title: 'Clarity',
                text: 'Transparent advice you can understand and trust.',
                icon: <path d="M12 3 4.5 6v5.5c0 4.7 3.2 8.1 7.5 9.5 4.3-1.4 7.5-4.8 7.5-9.5V6L12 3Zm-3 9 2 2 4.5-5" />
              },
              {
                title: 'Discipline',
                text: 'Process-driven suggestions without emotional noise.',
                icon: <><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="3" /><path d="m14 10 5-5m0 0v4m0-4h-4" /></>
              },
              {
                title: 'Growth',
                text: 'Compounding wealth with patience and perspective.',
                icon: <><path d="M5 19v-5h4v5m2 0V9h4v10m2 0V5h3v14M4 19h17" /><path d="m5 10 5-3 4 1 6-5" /></>
              }
            ].map((item) => (
              <div key={item.title} className={isDark ? 'flex gap-4 py-4 sm:px-6 first:pl-0 sm:border-r sm:last:border-r-0 border-white/10' : 'flex gap-4 py-4 sm:px-6 first:pl-0 sm:border-r sm:last:border-r-0 border-[#09223D]/10'}>
                <div className={isDark ? 'w-14 h-14 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-[#D8B36A]' : 'w-14 h-14 shrink-0 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#A66D18]'}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <h2 className={isDark ? 'font-[\'DM_Serif_Display\'] text-[25px] text-white leading-tight mb-1' : 'font-[\'DM_Serif_Display\'] text-[25px] text-[#09223D] leading-tight mb-1'}>{item.title}</h2>
                  <p className={isDark ? 'text-sm leading-relaxed text-gray-400' : 'text-sm leading-relaxed text-[#475569]'}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="services" className={isDark ? 'py-20 px-6 bg-white/[0.02] relative overflow-hidden' : 'py-20 px-6 bg-[#FAF6F1] relative overflow-hidden'}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center mb-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[460px] rounded-[38px] overflow-hidden border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
            >
              <img
                src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1800&auto=format&fit=crop"
                alt="Growth through nature"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div>
              <p className={isDark ? 'text-[#C8A96B] mb-4' : 'text-[#af8239] mb-4'}>Why Choose Us</p>
              <h2 className={isDark ? 'text-4xl md:text-5xl font-semibold mb-6 text-white' : 'text-4xl md:text-5xl font-semibold mb-6 text-[#061226]'}>
                A transparent and research-driven approach to investing.
              </h2>
              <p className={isDark ? 'text-gray-400 text-lg leading-relaxed' : 'text-[#334155] text-lg leading-relaxed'}>
                Built to simplify investing while helping you stay aligned with your long-term financial goals.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Expert Fund Selection',
                text: 'Mutual fund recommendations based on systematic analysis, aligned to your investment objectives and risk category'
              },
              {
                title: 'Portfolio Rebalancing',
                text: 'We track your investments regularly and suggest rebalancing to capitalize on market opportunities.'
              },
              {
                title: '100% Transparency',
                text: 'No hidden charges. We invest in regular mutual funds and are paid directly by AMCs.'
              },
              {
                title: 'Technology Platform',
                text: 'Real-time portfolio monitoring and detailed reports all in one place, accessible anytime.'
              },
              {
                title: 'DIY Investing',
                text: 'Curated baskets across equity, debt and commodities for investors who prefer to go solo.'
              },
              {
                title: 'Fully Regulated',
                text: 'AMFI registered. Your investments are 100% safe, held directly with trusted AMCs not with us.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className={isDark ? 'group relative bg-[linear-gradient(180deg,rgba(20,22,28,0.95),rgba(14,15,20,0.92))] border border-white/[0.06] rounded-[34px] p-9 overflow-hidden hover:border-[#C8A96B]/30 transition duration-500 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.28)]' : 'group relative bg-white border border-[#af8239]/15 rounded-[34px] p-9 overflow-hidden hover:border-[#af8239]/40 transition duration-500 shadow-[0_25px_70px_rgba(6,18,38,0.08)]'}
              >
                <h3 className={isDark ? 'text-2xl font-semibold mb-5 group-hover:text-[#E7D2A7] transition duration-300 text-white' : 'text-2xl font-semibold mb-5 group-hover:text-[#af8239] transition duration-300 text-[#061226]'}>
                  {item.title}
                </h3>

                <p className={isDark ? 'text-gray-400 leading-relaxed text-[15px]' : 'text-[#334155] leading-relaxed text-[15px]'}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section id="framework" className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center mb-14">
            <div>
              <p className={isDark ? 'text-[#C8A96B] mb-4' : 'text-[#af8239] mb-4'}>The Phelix Framework</p>
              <h2 className={isDark ? 'text-4xl md:text-5xl font-semibold leading-tight mb-6 text-white' : 'text-4xl md:text-5xl font-semibold leading-tight mb-6 text-[#061226]'}>
                Observe. Protect. Compound.
              </h2>
              <p className={isDark ? 'text-gray-400 text-lg leading-relaxed max-w-2xl' : 'text-[#334155] text-lg leading-relaxed max-w-2xl'}>
                A disciplined investment framework combining research, risk management, and long-term compounding principles.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[420px] rounded-[38px] overflow-hidden border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
            >
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop"
                alt="Strategic investment framework"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Observe',
                text: 'Track macro trends, market conditions, and sectoral developments through a research-driven lens to identify relevant mutual fund categories.'
              },
              {
                number: '02',
                title: 'Protect',
                text: 'Prioritize risk-appropriate fund selection, category diversification, and stability-focused allocation during uncertain market conditions'
              },
              {
                number: '03',
                title: 'Compound',
                text: 'Enable disciplined, long-term mutual fund investing through systematic allocation to help build wealth over time'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="group relative bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] border border-white/[0.06] rounded-[34px] p-10 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.28)]"
              >
                <div className={isDark ? 'absolute top-8 right-8 text-6xl font-semibold text-white/[0.05]' : 'absolute top-8 right-8 text-6xl font-semibold text-[#061226]/8'}>
                  {item.number}
                </div>

                <div className="relative z-10">
                  <h3 className={isDark ? 'text-3xl font-semibold mb-6 text-white' : 'text-3xl font-semibold mb-6 text-[#061226]'}>
                    {item.title}
                  </h3>

                  <p className={isDark ? 'text-gray-400 leading-relaxed text-[16px]' : 'text-[#334155] leading-relaxed text-[16px]'}>
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className={isDark ? 'py-20 px-6 bg-white/[0.02] relative overflow-hidden' : 'py-20 px-6 bg-[#FAF6F1] relative overflow-hidden'}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center mb-14">
            <div>
              <p className={isDark ? 'text-[#C8A96B] mb-4' : 'text-[#af8239] mb-4'}>How It Works</p>

              <h2 className={isDark ? 'text-4xl md:text-5xl font-semibold leading-tight mb-6 text-white' : 'text-4xl md:text-5xl font-semibold leading-tight mb-6 text-[#061226]'}>
                From first conversation to invested in days.
              </h2>

              <p className={isDark ? 'text-gray-400 text-lg leading-relaxed' : 'text-[#334155] text-lg leading-relaxed'}>
                A seamless onboarding process designed to simplify investing while keeping you informed at every step.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[420px] rounded-[38px] overflow-hidden border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
            >
              <img
                src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1800&auto=format&fit=crop"
                alt="Luxury mechanical watch internals"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-transparent" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Schedule Free Discussion',
                text: 'Share your investment objectives, investment horizon, and risk appetite through a one-on-one discussion.'
              },
              {
                step: '02',
                title: 'Get Fund Suggestions',
                text: 'Receive mutual fund suggestions based on systematic research and a structured selection process.'
              },
              {
                step: '03',
                title: 'KYC and Onboarding',
                text: 'Complete your digital onboarding and KYC process quickly and securely through trusted platforms.'
              },
              {
                step: '04',
                title: 'Invest and Track',
                text: 'Start investing and monitor your portfolio through a transparent and technology-enabled experience.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] border border-white/[0.06] rounded-[34px] p-10 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.28)]"
              >
                <div className={isDark ? 'text-[#D8B36A] text-sm tracking-[0.25em] uppercase mb-6' : 'text-[#af8239] text-sm tracking-[0.25em] uppercase mb-6'}>
                  {item.step}
                </div>

                <h3 className={isDark ? 'text-2xl font-semibold mb-5 text-white leading-snug' : 'text-2xl font-semibold mb-5 text-[#061226] leading-snug'}>
                  {item.title}
                </h3>

                <p className={isDark ? 'text-gray-400 leading-relaxed text-[15px]' : 'text-[#334155] leading-relaxed text-[15px]'}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className={isDark ? 'py-20 px-6 bg-white/[0.02] relative overflow-hidden' : 'py-20 px-6 bg-[#FAF6F1] relative overflow-hidden'}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={isDark ? 'relative min-h-[500px] h-[min(65vw,640px)] rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.45)]' : 'relative min-h-[500px] h-[min(65vw,640px)] rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(6,18,38,0.08)]'}
          >
            <img
              src="/founder.jpeg"
              alt="Shobhit Bhansali - Founder, Phelix Capital"
              className="w-full h-full object-cover object-top"
            />
            <div className={isDark ? 'absolute inset-0 bg-gradient-to-b from-[#07080B]/10 to-[#07080B]/60' : 'absolute inset-0 bg-gradient-to-b from-[#f7f8fb]/10 to-[#f7f8fb]/40'} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className={isDark ? 'text-[#C8A96B] mb-4' : 'text-[#af8239] mb-4'}>Founder Introduction</p>

            <h2 className={isDark ? 'text-4xl md:text-5xl font-semibold mb-8 leading-tight text-white' : 'text-4xl md:text-5xl font-semibold mb-8 leading-tight text-[#061226]'}>
              Hi, I’m Shobhit Bhansali.
            </h2>

            <p className={isDark ? 'text-gray-300 text-lg leading-relaxed mb-6' : 'text-[#1f2937] text-lg leading-relaxed mb-6'}>
              I’m Shobhit Bhansali, a Chartered Accountant (CA) and Chartered Financial Analyst (CFA) with a deep passion for investing and long-term wealth creation.
            </p>

            <p className={isDark ? 'text-gray-400 leading-relaxed mb-6 text-lg' : 'text-[#334155] leading-relaxed mb-6 text-lg'}>
              Through Phelix Capital, my goal is to simplify investing through research-driven mutual fund solutions focused on disciplined risk management and sustainable compounding.
            </p>

            <p className={isDark ? 'text-gray-400 leading-relaxed mb-10 text-lg' : 'text-[#334155] leading-relaxed mb-10 text-lg'}>
              I believe successful investing is not about chasing noise or predictions - it is about staying patient, managing risk intelligently, and allowing compounding to work over time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section id="contact" className="px-6 pb-16 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={isDark ? 'max-w-7xl mx-auto bg-[linear-gradient(135deg,#17171F_0%,#101116_50%,#0C0D11_100%)] border border-white/[0.06] rounded-[44px] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.40)]' : 'max-w-7xl mx-auto bg-white border border-[#af8239]/15 rounded-[44px] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_40px_120px_rgba(6,18,38,0.12)]'}
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className={isDark ? 'text-[#C8A96B] mb-5 tracking-[0.25em] uppercase text-sm' : 'text-[#af8239] mb-5 tracking-[0.25em] uppercase text-sm'}>
              Begin Your Wealth Journey
            </p>

            <h2 className={isDark ? 'text-4xl md:text-6xl font-semibold leading-tight mb-8 text-white' : 'text-4xl md:text-6xl font-semibold leading-tight mb-8 text-[#061226]'}>
              Wealth compounds best with clarity, discipline, and time.
            </h2>

            <p className={isDark ? 'text-lg text-gray-400 leading-relaxed mb-6 max-w-2xl mx-auto' : 'text-lg text-[#334155] leading-relaxed mb-6 max-w-2xl mx-auto'}>
              Begin your investment journey with a framework designed around intelligent risk management and long-term compounding.
            </p>

            <p className={isDark ? 'text-[18px] text-white mb-10' : 'text-[18px] text-[#061226] mb-10'}>
              Book a free 30 minute consultation - no fees, no pressure.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mb-6 max-w-2xl mx-auto">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  minLength={2}
                  maxLength={50}
                  pattern="[A-Za-z][A-Za-z\\s'.-]{1,49}"
                  title="Use 2 to 50 letters and common name characters only."
                  aria-invalid={Boolean(formErrors.name)}
                  className={isDark ? 'w-full px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-gray-500 outline-none focus:border-[#D8B36A]/40 transition duration-300' : 'w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-[#af8239]/20 text-[#061226] placeholder:text-[#64748b] outline-none focus:border-[#af8239]/50 transition duration-300'}
                />
                {formErrors.name && <p className="mt-2 text-left text-sm text-red-400">{formErrors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  maxLength={254}
                  aria-invalid={Boolean(formErrors.email)}
                  className={isDark ? 'w-full px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-gray-500 outline-none focus:border-[#D8B36A]/40 transition duration-300' : 'w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-[#af8239]/20 text-[#061226] placeholder:text-[#64748b] outline-none focus:border-[#af8239]/50 transition duration-300'}
                />
                {formErrors.email && <p className="mt-2 text-left text-sm text-red-400">{formErrors.email}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  maxLength={10}
                  pattern="\d{10}"
                  inputMode="numeric"
                  title="Use exactly 10 digits."
                  aria-invalid={Boolean(formErrors.phone)}
                  className={isDark ? 'w-full px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-gray-500 outline-none focus:border-[#D8B36A]/40 transition duration-300' : 'w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-[#af8239]/20 text-[#061226] placeholder:text-[#64748b] outline-none focus:border-[#af8239]/50 transition duration-300'}
                />
                {formErrors.phone && <p className="mt-2 text-left text-sm text-red-400">{formErrors.phone}</p>}
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={4}
                  required
                  className={isDark ? 'w-full px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-gray-500 outline-none focus:border-[#D8B36A]/40 transition duration-300 resize-none' : 'w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-[#af8239]/20 text-[#061226] placeholder:text-[#64748b] outline-none focus:border-[#af8239]/50 transition duration-300 resize-none'}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-[#D8B36A] text-black text-[16px] font-medium hover:bg-[#E7C98A] transition duration-300 mt-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </motion.button>
            </form>

            {formStatus.message && (
              <p className={formStatus.type === 'success' ? 'text-sm text-emerald-400 mb-8' : 'text-sm text-red-400 mb-8'}>
                {formStatus.message}
              </p>
            )}

            <p className={isDark ? 'text-sm text-gray-500 mb-8' : 'text-sm text-[#475569] mb-8'}>
              We’ll reach out within 24 hours.
            </p>

            <div className={isDark ? 'pt-8 border-t border-white/[0.06] text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto' : 'pt-8 border-t border-[#af8239]/15 text-sm text-[#475569] leading-relaxed max-w-2xl mx-auto'}>
              AMFI-registered Mutual Fund Distributor | ARN: 358543 | Valid through 09 April 2029
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER RIBBON */}
      <footer className={isDark ? 'px-4 sm:px-6 pt-5 bg-[#07080B]' : 'px-4 sm:px-6 pt-5 bg-[#FAF6F1]'}>
        <div className="bg-[#09223D] text-[#F8F3E9] rounded-t-[36px] px-6 sm:px-10 lg:px-16 pt-14 pb-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20">
            <div>
              <img src="/phelixcapitallogodark.png" alt="Phelix Capital" className="h-16 w-auto mb-8" />
              <p className="text-[15px] text-[#E6DCC8] leading-relaxed mb-5">
                Phelix Capital is a brand name used by Shobhit Bhansali
              </p>
              <p className="text-[13px] text-[#B9C2CA] leading-relaxed max-w-xl">
                AMFI Registration Name: Shobhit Bhansali | ARN 358543 | Valid through 09 April 2029
              </p>
            </div>

            <div>
              <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-4 text-[15px]">
                <a href="#about" className="hover:text-[#D8B36A] transition-colors">About Us</a>
                <a href="/terms-and-conditions" className="hover:text-[#D8B36A] transition-colors">Terms and Conditions</a>
                <a href="#contact" className="hover:text-[#D8B36A] transition-colors">Contact Us</a>
                <a href="/privacy-policy" className="hover:text-[#D8B36A] transition-colors">Privacy Policy</a>
                <a href="#services" className="hover:text-[#D8B36A] transition-colors">Why Choose Us</a>
                <a href="/commission-disclosure" className="hover:text-[#D8B36A] transition-colors">Commission Disclosure</a>
              </nav>

              <p className="mt-9 pt-7 border-t border-white/15 text-[13px] leading-relaxed text-[#D8DEE3]">
                Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-xs text-[#8F9DA8]">
            © 2026 Phelix Capital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
