import { useState } from 'react'

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate send
    setTimeout(() => {
      setStatus('sent')
      setFormState({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }, 1200)
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-mono font-semibold text-[#00F0FF] uppercase tracking-[0.25em] mb-3">Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 text-[#94A3B8] max-w-lg mx-auto">
            Have a project in mind or want to collaborate? Drop me a message.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] max-w-5xl mx-auto">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-widest mb-2">Name</label>
              <input
                id="name"
                type="text"
                required
                className="form-input"
                placeholder="Your name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-widest mb-2">Email</label>
              <input
                id="email"
                type="email"
                required
                className="form-input"
                placeholder="you@example.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-widest mb-2">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                className="form-input resize-none"
                placeholder="Tell me about your project..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full relative rounded-2xl py-3.5 font-semibold text-sm text-[#03050C] bg-white overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00F0FF]/15 disabled:opacity-60 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#7B61FF] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                {status === 'idle' && (
                  <>
                    Send Message
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
                {status === 'sending' && (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending...
                  </span>
                )}
                {status === 'sent' && (
                  <span className="inline-flex items-center gap-2 text-green-500">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Sent!
                  </span>
                )}
              </span>
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6 lg:pt-4">
            {/* Email */}
            <a href="mailto:sureshkumaroff27@gmail.com" className="glass glass-hover rounded-2xl p-6 flex items-center gap-4 transition-all group">
              <div className="social-icon shrink-0 group-hover:text-[#00F0FF] group-hover:border-[#00F0FF]/30">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-mono text-[#94A3B8] uppercase tracking-widest">Email</p>
                <p className="text-white font-medium">sureshkumaroff27@gmail.com</p>
              </div>
            </a>

            {/* Phone */}
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="social-icon shrink-0">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-mono text-[#94A3B8] uppercase tracking-widest">Phone</p>
                <p className="text-white font-medium">+91 81228 66251</p>
              </div>
            </div>

            {/* Location */}
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="social-icon shrink-0">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-mono text-[#94A3B8] uppercase tracking-widest">Location</p>
                <p className="text-white font-medium">Chennai, Tamil Nadu, India</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="mailto:sureshkumaroff27@gmail.com" className="social-icon" aria-label="Email">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
