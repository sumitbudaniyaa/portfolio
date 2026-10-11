import { motion } from "framer-motion";

const draw = (delay, duration = 0.85) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration, ease: [0.33, 1, 0.68, 1] },
      opacity: { delay, duration: 0.08 },
    },
  },
});

export default function ClosingSection() {
  return (
    <div className="closing-wrapper">
      <section
        className="closing-section pt-8 sm:pt-10 pb-4 border-t border-[var(--surface-border)]"
        aria-label="Signature of Sumit Kumar"
      >
        <div className="closing-section__content max-w-[728px] mx-auto">
          <div className="closing-section__signature flex justify-center">
            <motion.svg
              className="closing-signature w-56 sm:w-64 h-auto text-[var(--surface-ink)] overflow-visible select-none"
              viewBox="0 0 320 102"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              role="img"
              aria-label="Sumit Kumar handwritten signature"
            >
              {/* "Sumit" — fluid cursive S flowing into u-m-i-t */}
              <motion.path
                d="M 18 66 C 28 50, 48 13, 38 11 C 28 9, 20 25, 30 39 C 42 55, 44 74, 24 76 C 14 77, 13 67, 23 63 C 33 59, 41 52, 45 46 C 43 58, 45 65, 51 64 C 56 63, 60 54, 62 46 C 60 56, 61 65, 65 65 C 68 54, 73 46, 77 47 C 79 48, 77 64, 80 65 C 83 54, 88 46, 92 47 C 94 48, 92 64, 96 65 C 101 64, 106 54, 108 46 C 107 58, 111 66, 117 62 C 124 56, 133 31, 137 17 C 132 34, 126 56, 129 64 C 131 68, 138 66, 146 59"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={draw(0.1, 1.05)}
              />

              {/* "i" dot */}
              <motion.path
                d="M 110 34 C 111 33, 112.5 32.5, 113 33.5"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                variants={draw(1.05, 0.12)}
              />

              {/* "t" crossbar flick */}
              <motion.path
                d="M 121 32 C 132 30, 144 28, 155 26"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                variants={draw(1.15, 0.2)}
              />

              {/* "K" stem */}
              <motion.path
                d="M 175 15 C 170 33, 163 54, 158 71"
                stroke="currentColor"
                strokeWidth="2.15"
                strokeLinecap="round"
                variants={draw(1.3, 0.25)}
              />

              {/* "K" arm + connected "umar" */}
              <motion.path
                d="M 196 22 C 186 31, 172 42, 164 47 C 172 49, 178 62, 184 65 C 189 66, 193 54, 195 47 C 193 57, 195 65, 200 65 C 204 64, 208 54, 210 47 C 209 57, 211 65, 215 65 C 218 55, 223 47, 226 48 C 228 49, 226 64, 229 65 C 232 55, 237 47, 240 48 C 242 49, 241 64, 245 65 C 250 64, 258 54, 259 48 C 254 46, 248 52, 249 61 C 250 66, 256 65, 260 55 C 259 62, 261 65, 266 64 C 270 62, 273 52, 275 46 C 277 49, 281 48, 285 46 C 283 54, 284 63, 291 63 C 297 63, 304 59, 311 53"
                stroke="currentColor"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={draw(1.5, 0.9)}
              />

              {/* Sweeping underline flourish */}
              <motion.path
                d="M 26 88 C 92 79, 192 73, 282 72 C 294 72, 296 75, 281 79 C 264 83, 238 87, 218 90"
                stroke="currentColor"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={draw(2.3, 0.55)}
              />
            </motion.svg>
          </div>
        </div>
      </section>
    </div>
  );
}
