import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Snowflake } from "lucide-react";

export default function CreamiRecipeModal({ recipe, onClose }) {
  return (
    <AnimatePresence>
      {recipe && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-[60] overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="bg-white rounded-t-3xl mt-16 mx-0 sm:mx-auto sm:max-w-lg sm:rounded-3xl sm:mt-10 overflow-hidden"
          >
            {/* Hero */}
            <div className="bg-gradient-to-br from-[#FFF3E6] to-[#FFE8D0] text-center py-8 relative">
              <button
                onClick={onClose}
                className="absolute top-4 left-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow"
              >
                <X size={16} className="text-[#2a2a2a]" />
              </button>
              <div className="text-6xl mb-2">{recipe.emoji}</div>
            </div>

            <div className="px-5 py-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <h2 className="text-xl font-black text-[#2a2a2a] leading-tight">{recipe.title}</h2>
                  {recipe.subtitle && (
                    <span className="inline-block mt-1 text-xs font-bold text-[#6BB5E8] bg-[#EEF6FB] px-2.5 py-0.5 rounded-full">
                      {recipe.subtitle}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-[#6a6050] mb-3 leading-relaxed">{recipe.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {recipe.tags.map((t) => (
                  <span key={t} className="text-[10px] font-bold text-[#C4622D] bg-[#FDE8D4] px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              {/* Freeze reminder */}
              <div className="bg-[#EEF6FB] rounded-xl px-3 py-2 flex items-center gap-2 mb-4">
                <Snowflake size={13} className="text-[#6BB5E8] shrink-0" />
                <p className="text-[11px] text-[#4A8AB5] font-semibold">
                  Freeze {recipe.id === 'c2' ? '36' : '24'}h minimum before spinning
                </p>
              </div>

              {recipe.sections.map((sec, i) => (
                <div key={i} className="mb-5">
                  <h3 className="text-xs font-bold text-[#8a8070] uppercase tracking-widest mb-2">
                    {sec.label}
                  </h3>
                  {sec.type === 'ing' ? (
                    <div className="bg-[#FAF6EF] rounded-2xl divide-y divide-[#f0ece6]">
                      {sec.items.map((ing, j) => (
                        <div key={j} className="flex items-center justify-between px-4 py-2.5">
                          <span className="text-sm text-[#2a2a2a] font-medium">{ing.n}</span>
                          <span className="text-sm font-bold text-[#C4622D]">{ing.a}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {sec.items.map((step, j) => (
                        <div key={j} className="flex gap-3">
                          <div className="w-7 h-7 bg-[#C4622D] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-white text-xs font-black">{j + 1}</span>
                          </div>
                          <p className="text-sm text-[#2a2a2a] leading-relaxed flex-1 pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {recipe.ytUrl && (
                <a
                  href={recipe.ytUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-red-600 text-white font-bold py-3.5 rounded-2xl mt-2 mb-4"
                >
                  <ExternalLink size={16} />
                  Watch on YouTube
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
