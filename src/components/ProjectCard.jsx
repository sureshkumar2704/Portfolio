export default function ProjectCard({ project, onOpen }) {
  return (
    <div
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen()
      }}
      className="project-card group relative flex flex-col p-7 cursor-pointer"
    >
      {/* Hover glow background */}
      <div className="absolute -inset-1 z-0 bg-gradient-to-r from-[#00F0FF]/15 via-[#7B61FF]/15 to-[#FF0055]/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 rounded-3xl" />

      <div className="relative z-10 flex-1 flex flex-col space-y-4">
        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-1.5 mb-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono font-semibold uppercase tracking-widest text-[#7B61FF] bg-[#7B61FF]/10 rounded-full px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-lg font-bold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-[#00F0FF]">
          {project.title}
        </h3>

        <p className="flex-1 text-sm text-[#94A3B8] leading-relaxed">
          {project.summary}
        </p>

        {/* Tech tags */}
        <div className="mt-auto pt-5 flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((t, i) => {
            const colors = ['#00F0FF', '#7B61FF', '#FF0055', '#00F0FF']
            const c = colors[i % colors.length]
            return (
              <span
                key={t}
                className="rounded-full px-3 py-1 text-[10px] font-mono font-semibold border"
                style={{
                  color: c,
                  backgroundColor: `${c}10`,
                  borderColor: `${c}20`,
                }}
              >
                {t}
              </span>
            )
          })}
        </div>
      </div>

      {/* Arrow icon on hover */}
      <div className="absolute top-6 right-6 z-10 opacity-0 translate-x-3 -translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[#00F0FF]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </div>
  )
}
