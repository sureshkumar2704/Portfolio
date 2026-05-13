import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const socialLinks = [
  { icon: '🔗', label: 'LinkedIn', url: '#', color: 'from-[#0A66C2] to-[#005FCC]' },
  { icon: '💻', label: 'GitHub', url: '#', color: 'from-[#24292F] to-[#1F2937]' },
  { icon: '🐦', label: 'Twitter', url: '#', color: 'from-[#1D9BF0] to-[#1A8CD8]' },
  { icon: '📧', label: 'Email', url: 'mailto:contact@example.com', color: 'from-[#FF006E] to-[#FF4365]' },
  { icon: '💼', label: 'Portfolio', url: '#', color: 'from-[#7B61FF] to-[#B061FF]' },
]

export default function EnhancedContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setSubmitSuccess(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    
    setTimeout(() => setSubmitSuccess(false), 3000)
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-[#03050C] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-[#7B61FF]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-[#00F0FF]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7B61FF]/30 bg-[#7B61FF]/10 px-4 py-1.5 text-xs font-mono text-[#00F0FF] uppercase tracking-widest mb-6 backdrop-blur">
            📬 Get in Touch
          </div>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tighter mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#7B61FF] to-[#FF006E]">
              Let's Create Something Amazing
            </span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto font-light">
            Have a project in mind? Let's discuss how I can help bring your ideas to life with cutting-edge AI and technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/20 to-[#00F0FF]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative bg-[#0F111D]/50 border border-[#7B61FF]/20 rounded-2xl p-8 backdrop-blur-md space-y-6 transition-all duration-300 group-hover:border-[#00F0FF]/50"
              >
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0F111D] border border-[#7B61FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00F0FF] transition-colors duration-200"
                    placeholder="Your name"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0F111D] border border-[#7B61FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00F0FF] transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </motion.div>

                {/* Subject Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0F111D] border border-[#7B61FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00F0FF] transition-colors duration-200"
                    placeholder="Project inquiry"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-[#0F111D] border border-[#7B61FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00F0FF] transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg font-bold text-[#03050C] bg-gradient-to-r from-[#00F0FF] to-[#7B61FF] hover:shadow-xl hover:shadow-[#00F0FF]/50 transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : submitSuccess ? 'Message Sent! ✓' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            {/* Direct Contact */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Contact</h3>
              <div className="space-y-4">
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF006E] to-[#FF4365] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                    📧
                  </div>
                  <div>
                    <p className="text-sm text-[#94A3B8]">Email</p>
                    <p className="text-white font-semibold group-hover:text-[#00F0FF] transition-colors">
                      contact@example.com
                    </p>
                  </div>
                </a>

                <a href="tel:+1234567890" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#0099FF] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200">
                    📱
                  </div>
                  <div>
                    <p className="text-sm text-[#94A3B8]">Phone</p>
                    <p className="text-white font-semibold group-hover:text-[#00F0FF] transition-colors">
                      +1 (234) 567-890
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7B61FF] to-[#B061FF] flex items-center justify-center text-xl">
                    📍
                  </div>
                  <div>
                    <p className="text-sm text-[#94A3B8]">Location</p>
                    <p className="text-white font-semibold">City, Country</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Connect</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-br ${social.color} hover:shadow-lg transition-all duration-200 text-white font-semibold`}
                  >
                    <span className="text-xl">{social.icon}</span>
                    <span className="hidden sm:inline text-sm">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 p-4 rounded-lg border border-[#00F0FF]/30 bg-[#00F0FF]/5"
            >
              <p className="text-sm text-[#94A3B8] mb-2">⏱️ Response Time</p>
              <p className="text-lg font-bold text-[#00F0FF]">Usually within 24 hours</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
