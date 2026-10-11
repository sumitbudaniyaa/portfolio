import React, { useState } from "react";
import { mindMatrix } from "../../data/content";

function MindStickerVisual({ id }) {
  switch (id) {
    case "esp32":
      // Realistic ESP32 DevKit PCB Board with silver ESP-WROOM-32 shield, gold GPIO pins & antenna
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          {/* PCB Base */}
          <rect x="14" y="6" width="36" height="52" rx="4" fill="#111827" stroke="#374151" strokeWidth="1.5" />
          {/* Gold GPIO Pin Rows (Left & Right) */}
          {[14, 19, 24, 29, 34, 39, 44, 49].map((y) => (
            <React.Fragment key={y}>
              <rect x="11" y={y} width="5" height="2.5" rx="0.8" fill="#FBBF24" />
              <rect x="48" y={y} width="5" height="2.5" rx="0.8" fill="#FBBF24" />
            </React.Fragment>
          ))}
          {/* Gold PCB Wi-Fi Meander Antenna */}
          <path
            d="M22 13V9h4v4h4V9h4v4h4V9h4v4"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Silver ESP-WROOM-32 RF Shield */}
          <rect x="20" y="15" width="24" height="22" rx="2" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.2" />
          <text x="32" y="25" textAnchor="middle" fill="#1F2937" fontSize="5" fontWeight="bold" fontFamily="monospace">
            ESP32
          </text>
          <text x="32" y="31" textAnchor="middle" fill="#4B5563" fontSize="3.8" fontFamily="monospace">
            WROOM
          </text>
          {/*BOOT / EN tactile buttons */}
          <rect x="20" y="42" width="5" height="4" rx="1" fill="#9CA3AF" />
          <rect x="39" y="42" width="5" height="4" rx="1" fill="#9CA3AF" />
          {/* Power & TX LEDs */}
          <circle cx="28" cy="44" r="1.5" fill="#EF4444" />
          <circle cx="36" cy="44" r="1.5" fill="#3B82F6" />
          {/* Micro-USB Port */}
          <rect x="25" y="51" width="14" height="8" rx="1.5" fill="#D1D5DB" stroke="#6B7280" strokeWidth="1" />
        </svg>
      );

    case "drones":
      // Top-down Quadcopter Drone with X-frame, 4 spinning rotors, and central camera gimbal
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          {/* Carbon X-Frame Arms */}
          <line x1="16" y1="16" x2="48" y2="48" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
          <line x1="48" y1="16" x2="16" y2="48" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
          {/* 4 Rotor Discs */}
          <circle cx="15" cy="15" r="10" fill="#38BDF8" fillOpacity="0.22" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="4 2" />
          <circle cx="49" cy="15" r="10" fill="#38BDF8" fillOpacity="0.22" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="4 2" />
          <circle cx="15" cy="49" r="10" fill="#FB923C" fillOpacity="0.22" stroke="#EA580C" strokeWidth="1.2" strokeDasharray="4 2" />
          <circle cx="49" cy="49" r="10" fill="#FB923C" fillOpacity="0.22" stroke="#EA580C" strokeWidth="1.2" strokeDasharray="4 2" />
          {/* Propeller Blades */}
          <path d="M8 15h14M42 15h14M8 49h14M42 49h14" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          {/* Motor Hubs */}
          <circle cx="15" cy="15" r="3" fill="#0284C7" />
          <circle cx="49" cy="15" r="3" fill="#0284C7" />
          <circle cx="15" cy="49" r="3" fill="#EA580C" />
          <circle cx="49" cy="49" r="3" fill="#EA580C" />
          {/* Central Fuselage & Flight Controller */}
          <rect x="24" y="21" width="16" height="22" rx="6" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
          {/* Front Vision Gimbal Lens */}
          <circle cx="32" cy="23" r="3" fill="#10B981" />
          <circle cx="32" cy="32" r="3.5" fill="#38BDF8" fillOpacity="0.3" stroke="#38BDF8" strokeWidth="1.2" />
        </svg>
      );

    case "ai":
      // Neural Processor / NPU Silicon Chip with glowing synaptic core
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          {/* Chip Pins */}
          {[18, 25, 32, 39, 46].map((p) => (
            <React.Fragment key={p}>
              <rect x={p - 1.5} y="6" width="3" height="6" rx="1" fill="#F59E0B" />
              <rect x={p - 1.5} y="52" width="3" height="6" rx="1" fill="#F59E0B" />
              <rect x="6" y={p - 1.5} width="6" height="3" rx="1" fill="#F59E0B" />
              <rect x="52" y={p - 1.5} width="6" height="3" rx="1" fill="#F59E0B" />
            </React.Fragment>
          ))}
          {/* Silicon Package */}
          <rect x="12" y="12" width="40" height="40" rx="7" fill="#0F172A" stroke="#6366F1" strokeWidth="1.8" />
          {/* Neural Core Connections */}
          <path d="M22 24L32 20L42 24L38 38L26 38L22 24Z" stroke="#818CF8" strokeWidth="1.2" strokeOpacity="0.7" />
          <line x1="22" y1="24" x2="38" y2="38" stroke="#C084FC" strokeWidth="1.2" strokeOpacity="0.7" />
          <line x1="42" y1="24" x2="26" y2="38" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.7" />
          {/* Glowing Sparkle Center */}
          <path
            d="M32 21C32 27 37 32 43 32C37 32 32 37 32 43C32 37 27 32 21 32C27 32 32 27 32 21Z"
            fill="#A855F7"
          />
          <circle cx="22" cy="24" r="2.2" fill="#38BDF8" />
          <circle cx="42" cy="24" r="2.2" fill="#38BDF8" />
          <circle cx="26" cy="38" r="2.2" fill="#F472B6" />
          <circle cx="38" cy="38" r="2.2" fill="#F472B6" />
        </svg>
      );

    case "rag":
      // RAG Pipeline: Document Chunk -> 3D Vector Cube -> Semantic Search Spark
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          <rect x="6" y="10" width="52" height="44" rx="10" fill="#1E1B4B" stroke="#4F46E5" strokeWidth="1.5" />
          {/* Left Document Card */}
          <rect x="12" y="18" width="14" height="18" rx="2.5" fill="#EEF2FF" />
          <line x1="15" y1="23" x2="23" y2="23" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="15" y1="27" x2="23" y2="27" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="15" y1="31" x2="20" y2="31" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" />
          {/* Arrow */}
          <path d="M29 27h5" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          {/* Vector Embedding Cluster */}
          <circle cx="42" cy="23" r="4.5" fill="#FF6446" />
          <circle cx="48" cy="28" r="4.5" fill="#FFB800" />
          <circle cx="41" cy="31" r="4.5" fill="#38BDF8" />
          {/* Bottom Token Reduction Pill */}
          <rect x="14" y="41" width="36" height="7" rx="3.5" fill="#312E81" />
          <circle cx="20" cy="44.5" r="2" fill="#34D399" />
          <line x1="25" y1="44.5" x2="44" y2="44.5" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "saas":
      // Multi-Tenant SaaS Analytics & Revenue Window
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          <rect x="6" y="10" width="52" height="44" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
          {/* Window Top Bar */}
          <circle cx="13" cy="16" r="1.8" fill="#EF4444" />
          <circle cx="19" cy="16" r="1.8" fill="#F59E0B" />
          <circle cx="25" cy="16" r="1.8" fill="#10B981" />
          <line x1="6" y1="21" x2="58" y2="21" stroke="#1E293B" strokeWidth="1.5" />
          {/* Sidebar */}
          <rect x="11" y="26" width="9" height="22" rx="2" fill="#1E293B" />
          {/* Revenue Bar Chart */}
          <rect x="25" y="38" width="5" height="10" rx="1.5" fill="#38BDF8" />
          <rect x="33" y="33" width="5" height="15" rx="1.5" fill="#6366F1" />
          <rect x="41" y="29" width="5" height="19" rx="1.5" fill="#8B5CF6" />
          <rect x="49" y="24" width="5" height="24" rx="1.5" fill="#10B981" />
          {/* Trend Line */}
          <path d="M25 34L35 28L43 30L52 22" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "backend":
      // Dual Server Rack Blades with blinking LEDs & API throughput
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          {/* Rack Unit 1 */}
          <rect x="8" y="10" width="48" height="13" rx="3.5" fill="#18181B" stroke="#3F3F46" strokeWidth="1.5" />
          <circle cx="15" cy="16.5" r="2.2" fill="#10B981" />
          <circle cx="22" cy="16.5" r="2.2" fill="#10B981" />
          <rect x="34" y="14.5" width="16" height="4" rx="1" fill="#3F3F46" />
          {/* Rack Unit 2 */}
          <rect x="8" y="26" width="48" height="13" rx="3.5" fill="#18181B" stroke="#3F3F46" strokeWidth="1.5" />
          <circle cx="15" cy="32.5" r="2.2" fill="#38BDF8" />
          <circle cx="22" cy="32.5" r="2.2" fill="#10B981" />
          <rect x="34" y="30.5" width="16" height="4" rx="1" fill="#3F3F46" />
          {/* Rack Unit 3 */}
          <rect x="8" y="42" width="48" height="13" rx="3.5" fill="#18181B" stroke="#3F3F46" strokeWidth="1.5" />
          <circle cx="15" cy="48.5" r="2.2" fill="#F59E0B" />
          <circle cx="22" cy="48.5" r="2.2" fill="#10B981" />
          <rect x="34" y="46.5" width="16" height="4" rx="1" fill="#3F3F46" />
        </svg>
      );

    case "frontend":
      // Layered Interactive UI Component Canvas & React Orbit
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          {/* Background Card */}
          <rect x="8" y="12" width="42" height="34" rx="6" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />
          <rect x="13" y="18" width="16" height="8" rx="2" fill="#3B82F6" />
          <rect x="13" y="30" width="28" height="4" rx="2" fill="#BFDBFE" />
          <rect x="13" y="37" width="20" height="4" rx="2" fill="#DBEAFE" />
          {/* Floating Glass Component Card */}
          <rect x="26" y="24" width="30" height="28" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="41" cy="38" r="2.2" fill="#61DAFB" />
          <ellipse cx="41" cy="38" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.3" />
          <ellipse cx="41" cy="38" rx="10" ry="4" transform="rotate(60 41 38)" stroke="#61DAFB" strokeWidth="1.3" />
          <ellipse cx="41" cy="38" rx="10" ry="4" transform="rotate(120 41 38)" stroke="#61DAFB" strokeWidth="1.3" />
        </svg>
      );

    case "cloud":
      // Volumetric Cloud Computing Cluster with Node Links
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="cloud-grad" x1="10" y1="14" x2="54" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          {/* Cloud Body */}
          <path
            d="M20 40h25a10 10 0 0 0 1.5-19.88A14 14 0 0 0 19.4 17.5 11 11 0 0 0 20 40Z"
            fill="url(#cloud-grad)"
          />
          {/* Compute Node Streams */}
          <line x1="22" y1="40" x2="22" y2="51" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <line x1="32" y1="40" x2="32" y2="54" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="40" x2="42" y2="51" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="22" cy="52" r="3" fill="#0284C7" stroke="#E0F2FE" strokeWidth="1.5" />
          <circle cx="32" cy="55" r="3" fill="#2563EB" stroke="#E0F2FE" strokeWidth="1.5" />
          <circle cx="42" cy="52" r="3" fill="#0284C7" stroke="#E0F2FE" strokeWidth="1.5" />
        </svg>
      );

    case "vision":
      // Computer Vision Object Detection Bounding Box Viewfinder
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="10" width="48" height="44" rx="8" fill="#090D16" stroke="#334155" strokeWidth="1.5" />
          {/* YOLO Bounding Box Corners */}
          <path d="M16 24v-6h6M48 24v-6h-6M16 40v6h6M48 40v6h-6" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Confidence Tag */}
          <rect x="16" y="12" width="22" height="6" rx="1.5" fill="#10B981" />
          <text x="27" y="16.5" textAnchor="middle" fill="#052E16" fontSize="4.5" fontWeight="bold" fontFamily="monospace">
            OBJ 0.99
          </text>
          {/* Iris / Target Reticle */}
          <circle cx="32" cy="32" r="8" stroke="#38BDF8" strokeWidth="1.8" />
          <circle cx="32" cy="32" r="3" fill="#38BDF8" />
        </svg>
      );

    case "database":
      // 3D Cylindrical Database Stack (PostgreSQL / Supabase RLS)
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          {/* Bottom Cylinder */}
          <path d="M14 38v9c0 3.87 8.06 7 18 7s18-3.13 18-7v-9" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1.5" />
          {/* Middle Cylinder */}
          <path d="M14 26v9c0 3.87 8.06 7 18 7s18-3.13 18-7v-9" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="1.5" />
          {/* Top Cylinder */}
          <path d="M14 16v9c0 3.87 8.06 7 18 7s18-3.13 18-7v-9" fill="#2563EB" stroke="#93C5FD" strokeWidth="1.5" />
          <ellipse cx="32" cy="16" rx="18" ry="7" fill="#3B82F6" stroke="#BFDBFE" strokeWidth="1.5" />
          {/* RLS Shield Badge */}
          <circle cx="46" cy="44" r="7" fill="#10B981" stroke="#052E16" strokeWidth="1.5" />
          <path d="M43.5 44l1.8 1.8 3.5-3.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "devops":
      // Docker Container Blocks + Linux VPS Terminal
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="12" width="48" height="40" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Container Blocks */}
          <rect x="16" y="28" width="8" height="7" rx="1.2" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1" />
          <rect x="26" y="28" width="8" height="7" rx="1.2" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1" />
          <rect x="36" y="28" width="8" height="7" rx="1.2" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1" />
          <rect x="21" y="19" width="8" height="7" rx="1.2" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1" />
          <rect x="31" y="19" width="8" height="7" rx="1.2" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1" />
          {/* Terminal Prompt Line */}
          <path d="M16 42l3 2.5-3 2.5M22 47h10" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "realtime":
    default:
      // Real-Time WebSockets Bi-Directional Pulse Wave
      return (
        <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="12" width="48" height="40" rx="10" fill="#18181B" stroke="#F59E0B" strokeWidth="1.5" />
          <path
            d="M14 32h7l4-10 6 20 5-14 4 8h10"
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="32" r="3" fill="#10B981" />
        </svg>
      );
  }
}

export default function LifeMatrixSection() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className="life-section" aria-labelledby="life-heading">
      <div className="section-intro mb-10 sm:mb-12">
        <h2
          id="life-heading"
          className="text-[26px] sm:text-[32px] font-bold tracking-tight text-[var(--surface-ink)] leading-none"
        >
          sneak peek of my mind right now
        </h2>
      </div>

      <div className="life-matrix relative w-full aspect-square max-h-[580px] bg-[var(--surface-card)] rounded-3xl border border-[var(--surface-border)] shadow-xs p-6 overflow-hidden select-none">
        {/* Coordinate Axes */}
        <div className="absolute inset-x-8 top-1/2 h-[1px] bg-[var(--surface-border)] -translate-y-1/2 pointer-events-none" />
        <div className="absolute inset-y-8 left-1/2 w-[1px] bg-[var(--surface-border)] -translate-x-1/2 pointer-events-none" />

        {/* Axis Labels */}
        <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[11px] font-mono uppercase tracking-wider text-[var(--surface-muted)] bg-[var(--surface-card)] px-2 rounded-full border border-[var(--surface-border)] shadow-2xs font-semibold">
          living rent free on my mind ↑
        </span>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-mono uppercase tracking-wider text-[var(--surface-muted)] bg-[var(--surface-card)] px-2 rounded-full border border-[var(--surface-border)] shadow-2xs font-semibold">
          currently on my mind ↓
        </span>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-mono uppercase tracking-wider text-[var(--surface-muted)] bg-[var(--surface-card)] px-2 rounded-full border border-[var(--surface-border)] shadow-2xs font-semibold">
          ← curious
        </span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono uppercase tracking-wider text-[var(--surface-muted)] bg-[var(--surface-card)] px-2 rounded-full border border-[var(--surface-border)] shadow-2xs font-semibold">
          obsessed →
        </span>

        {/* Scattered Interactive Visual Stickers (Images instead of text) */}
        {mindMatrix.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            onClick={() => setActiveItem(activeItem?.id === item.id ? null : item)}
            onMouseEnter={() => setActiveItem(item)}
            className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 z-10 hover:z-30 hover:scale-115 focus:outline-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
            }}
          >
            <div
              className={`relative rounded-2xl p-1 transition-transform ${
                activeItem?.id === item.id ? "scale-110 ring-2 ring-emerald-400/70" : ""
              }`}
            >
              <MindStickerVisual id={item.id} />
              {/* Hover / Active Floating Mini-Tag */}
              <span className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900/90 text-white px-1.5 py-0.5 text-[9px] font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                {item.tag}
              </span>
            </div>
          </button>
        ))}

        {/* Active Note Preview Card / Overlay Tooltip */}
        {activeItem && (
          <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-6 sm:w-80 bg-neutral-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-xl border border-white/10 z-40 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
              <span className="text-xs font-mono font-bold text-emerald-400">
                {`${activeItem.tag} · ${activeItem.label}`}
              </span>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="text-white/40 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-white/90 leading-relaxed font-medium">{activeItem.note}</p>
          </div>
        )}
      </div>
    </section>
  );
}


