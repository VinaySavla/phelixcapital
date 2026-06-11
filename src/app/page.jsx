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
  const [theme, setTheme] = useState('dark')
  const isDark = theme === 'dark'

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('phelix-theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
      return
    }

    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('phelix-theme', theme)
  }, [theme])

  return (
    <div className={isDark ? 'min-h-screen bg-[#07080B] text-white font-sans' : 'min-h-screen bg-[#f7f8fb] text-[#061226] font-sans'}>
      {/* NAVBAR */}
      <header className={isDark ? 'fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[#07080B]/75 border-b border-[#C8A96B]/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]' : 'fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/90 border-b border-[#af8239]/20 shadow-[0_10px_35px_rgba(6,18,38,0.08)]'}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <img src={isDark ? "/phelixcapitallogodark.png" : "/phelixcapitallogo.png"} alt="Phelix Capital Logo" className="h-14 w-auto" />

          <nav className={isDark ? 'hidden lg:flex items-center gap-14 text-[15px] text-gray-300' : 'hidden lg:flex items-center gap-14 text-[15px] text-[#061226]'}>
            <a href="#services" className={isDark ? 'hover:text-[#F2E3BF] transition duration-300 tracking-wide' : 'hover:text-[#af8239] transition duration-300 tracking-wide'}>
              Why Choose Us
            </a>
            <a href="#about" className={isDark ? 'hover:text-[#F2E3BF] transition duration-300 tracking-wide' : 'hover:text-[#af8239] transition duration-300 tracking-wide'}>
              About Us
            </a>
            <a href="#contact" className={isDark ? 'hover:text-[#F2E3BF] transition duration-300 tracking-wide' : 'hover:text-[#af8239] transition duration-300 tracking-wide'}>
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={isDark ? 'p-3 rounded-2xl border border-[#C8A96B]/20 bg-white/[0.04] hover:bg-white/[0.08] transition duration-300' : 'p-3 rounded-2xl border border-[#af8239]/30 bg-[#fffaf5] hover:bg-[#fff3e8] transition duration-300'}
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
            <button className={isDark ? 'px-6 py-3 rounded-2xl border border-[#C8A96B]/20 bg-white/[0.02] hover:bg-white/[0.05] transition duration-300 text-[15px]' : 'px-6 py-3 rounded-2xl border border-[#af8239]/30 bg-[#fffaf5] hover:bg-[#fff3e8] transition duration-300 text-[15px] text-[#061226]'} onClick={() => window.location.href = 'https://investor.phelixcap.in/investor/login'}>
              Log in / Sign up
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className={isDark ? 'relative min-h-[78vh] flex flex-col justify-center overflow-hidden bg-[#05070B] pt-28 border-b border-white/[0.03]' : 'relative min-h-[78vh] flex flex-col justify-center overflow-hidden bg-[#f5f7fb] pt-28 border-b border-[#af8239]/10'}>
        <div className="absolute inset-0 opacity-[0.18]">
          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury finance background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className={isDark ? 'absolute inset-0 bg-black/55' : 'absolute inset-0 bg-white/45'} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-6xl mx-auto px-6 relative z-10 text-center"
        >
          <h1 className="text-[46px] md:text-[72px] font-[500] leading-[1] tracking-[-0.045em] mb-8 font-sans">
            <span className={isDark ? 'text-white' : 'text-[#061226]'}>Smart Investing,</span>
            <br />
            <span className={isDark ? 'text-[#D8B36A] font-medium' : 'text-[#af8239] font-medium'}>
              Sustainable Wealth
            </span>
          </h1>

          <div className="w-16 h-px bg-white/15 mx-auto mb-8" />

          <p className={isDark ? 'text-[21px] md:text-[26px] text-gray-200 leading-relaxed max-w-3xl mx-auto mb-12 font-normal tracking-[0.01em] font-[\'Inter\']' : 'text-[21px] md:text-[26px] text-[#334155] leading-relaxed max-w-3xl mx-auto mb-12 font-normal tracking-[0.01em] font-[\'Inter\']'}>
            Empowering investors through transparent,
            <br />
            research driven mutual fund solutions.
          </p>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={isDark ? 'px-10 py-4 rounded-2xl bg-[#D8B36A] text-black text-[16px] font-medium tracking-wide hover:bg-[#E7C98A] transition duration-300 font-[\'Inter\'] shadow-[0_12px_40px_rgba(216,179,106,0.22)]' : 'px-10 py-4 rounded-2xl bg-[#af8239] text-white text-[16px] font-medium tracking-wide hover:bg-[#9a6d2b] transition duration-300 font-[\'Inter\'] shadow-[0_12px_35px_rgba(175,130,57,0.25)]'}
          >
            Book Free Consultation
          </motion.button>
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="services" className={isDark ? 'py-32 px-6 bg-white/[0.02] relative overflow-hidden' : 'py-32 px-6 bg-white relative overflow-hidden'}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center mb-20">
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
      <section id="framework" className="py-36 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center mb-20">
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
      <section id="how-it-works" className={isDark ? 'py-36 px-6 bg-white/[0.02] relative overflow-hidden' : 'py-36 px-6 bg-white relative overflow-hidden'}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-16 items-center mb-20">
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
      <section id="about" className={isDark ? 'py-36 px-6 bg-white/[0.02] relative overflow-hidden' : 'py-36 px-6 bg-white relative overflow-hidden'}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-[40px] overflow-hidden border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
          >
            <img
              src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1800&auto=format&fit=crop"
              alt="Professional wealth management office"
              className="w-full h-full object-cover"
            />
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
      <section id="contact" className="px-6 pb-28 pt-8">
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

            <form className="flex flex-col gap-4 w-full mb-6 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Name"
                className={isDark ? 'w-full px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-gray-500 outline-none focus:border-[#D8B36A]/40 transition duration-300' : 'w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-[#af8239]/20 text-[#061226] placeholder:text-[#64748b] outline-none focus:border-[#af8239]/50 transition duration-300'}
              />
              <input
                type="email"
                placeholder="Email"
                className={isDark ? 'w-full px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-gray-500 outline-none focus:border-[#D8B36A]/40 transition duration-300' : 'w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-[#af8239]/20 text-[#061226] placeholder:text-[#64748b] outline-none focus:border-[#af8239]/50 transition duration-300'}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className={isDark ? 'w-full px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-gray-500 outline-none focus:border-[#D8B36A]/40 transition duration-300' : 'w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-[#af8239]/20 text-[#061226] placeholder:text-[#64748b] outline-none focus:border-[#af8239]/50 transition duration-300'}
              />
              <textarea
                placeholder="Message"
                rows={4}
                className={isDark ? 'w-full px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-gray-500 outline-none focus:border-[#D8B36A]/40 transition duration-300 resize-none' : 'w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-[#af8239]/20 text-[#061226] placeholder:text-[#64748b] outline-none focus:border-[#af8239]/50 transition duration-300 resize-none'}
              ></textarea>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-[#D8B36A] text-black text-[16px] font-medium hover:bg-[#E7C98A] transition duration-300 mt-2"
              >
                Submit
              </motion.button>
            </form>

            <p className={isDark ? 'text-sm text-gray-500 mb-8' : 'text-sm text-[#475569] mb-8'}>
              We’ll reach out within 24 hours.
            </p>

            <div className={isDark ? 'pt-8 border-t border-white/[0.06] text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto' : 'pt-8 border-t border-[#af8239]/15 text-sm text-[#475569] leading-relaxed max-w-2xl mx-auto'}>
              Phelix Capital is a trade name used by Shobhit Bhansali.<br />AMFI-registered Mutual Fund Distributor | ARN: 358543 | Valid through 09 April 2029
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className={isDark ? 'border-t border-white/[0.04] px-6 py-14 bg-[#06070A]' : 'border-t border-[#af8239]/10 px-6 py-14 bg-white'}>
        <div className={isDark ? 'max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500' : 'max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#475569]'}>
          <div>© 2026 Phelix Capital. All rights reserved.</div>

          <div className="flex items-center gap-6">
            <a href="#" className={isDark ? 'hover:text-white transition duration-300' : 'hover:text-[#af8239] transition duration-300'}>
              Privacy Policy
            </a>
            <a href="#" className={isDark ? 'hover:text-white transition duration-300' : 'hover:text-[#af8239] transition duration-300'}>
              Terms
            </a>
            <a href="#" className={isDark ? 'hover:text-white transition duration-300' : 'hover:text-[#af8239] transition duration-300'}>
              Disclosures
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
