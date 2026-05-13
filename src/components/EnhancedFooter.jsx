import { motion } from 'framer-motion'

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Resume', href: '#' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'LinkedIn', href: '#' },
      { label: 'Twitter', href: '#' },
      { label: 'Email', href: 'mailto:contact@example.com' },
      { label: 'Discord', href: '#' },
    ],
  },
]

export default function EnhancedFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#03050C] border-t border-[#7B61FF]/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#7B61FF]/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#00F0FF]/5 blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 py-16 sm:py-20">
          {/* Top Section */}
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <a href="#hero" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#7B61FF] flex items-center justify-center text-white font-bold">
                  SK
                </div>
                <span className="font-black text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] to-[#7B61FF]">
                  Suresh Kumar
                </span>
              </a>
              <p className="text-sm text-[#94A3B8] font-light">
                Building intelligent systems and innovative AI solutions.
              </p>
              <div className="flex gap-3 mt-4">
                {['🔗', '💻', '🐦', '📧'].map((icon, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    className="w-8 h-8 rounded-lg border border-[#7B61FF]/30 flex items-center justify-center hover:bg-[#7B61FF]/20 transition-colors text-base"
                  >
                    {icon}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Links Columns */}
            {footerLinks.map((column, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (idx + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-white mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-sm text-[#94A3B8] hover:text-[#00F0FF] transition-colors duration-200 font-light"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#7B61FF]/50 to-transparent my-12" />

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            {/* Copyright */}
            <p className="text-sm text-[#94A3B8] text-center md:text-left">
              <span className="font-semibold text-white">© {currentYear} Suresh Kumar</span>
              {' '}·{' '}
              <span>All rights reserved</span>
            </p>

            {/* Design Credit */}
            <p className="text-sm text-[#94A3B8]">
              Crafted with{' '}
              <span className="text-[#FF006E] font-bold">❤</span>
              {' '}using React, Three.js & Tailwind CSS
            </p>

            {/* Bottom Links */}
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-[#94A3B8] hover:text-[#00F0FF] transition-colors">
                Privacy
              </a>
              <a href="#" className="text-[#94A3B8] hover:text-[#00F0FF] transition-colors">
                Terms
              </a>
              <a href="#" className="text-[#94A3B8] hover:text-[#00F0FF] transition-colors">
                Sitemap
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll to top button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#7B61FF] flex items-center justify-center text-white font-bold hover:shadow-lg hover:shadow-[#00F0FF]/50 transition-all duration-200 hover:scale-110 z-40"
        >
          ↑
        </motion.button>
      </div>
    </footer>
  )
}
