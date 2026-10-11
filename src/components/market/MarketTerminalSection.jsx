import React, { useState } from "react";
import { TrendingUp, Activity, Terminal } from "lucide-react";
import { marketSectors } from "../../data/content";

export default function MarketTerminalSection() {
  const [activeSectorKey, setActiveSectorKey] = useState("AI");
  const [activeTimeframe, setActiveTimeframe] = useState("1M");
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const sector = marketSectors[activeSectorKey] || marketSectors.AI;
  const points = sector.chartPoints;

  // Build SVG path for chart points
  const minVal = Math.min(...points) * 0.95;
  const maxVal = Math.max(...points) * 1.05;
  const width = 640;
  const height = 180;

  const getCoordinates = (val, idx) => {
    const x = (idx / (points.length - 1)) * (width - 40) + 20;
    const y = height - 20 - ((val - minVal) / (maxVal - minVal)) * (height - 40);
    return { x, y };
  };

  const coords = points.map((val, idx) => getCoordinates(val, idx));

  // Construct smooth curve path
  const linePath = coords.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");

  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

  return (
    <section className="interest-market-section" aria-labelledby="market-heading">
      <div className="section-intro mb-10 sm:mb-12">
        <h2
          id="market-heading"
          className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[var(--surface-ink)] leading-none"
        >
          things currently trading high in my head
        </h2>
      </div>

      <div className="market-terminal bg-[#0d1730] text-[#f7f1e8] rounded-2xl p-5 sm:p-7 shadow-xl border border-white/10">
        {/* Terminal Header */}
        <header className="market-terminal__header flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          {/* Sector Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 mr-1 flex items-center gap-1 text-xs font-mono">
              <Terminal size={14} /> INDEX
            </span>
            {Object.keys(marketSectors).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveSectorKey(key);
                  setHoveredPoint(null);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeSectorKey === key
                    ? "bg-emerald-500 text-black shadow-sm"
                    : "bg-white/5 hover:bg-white/10 text-white/70"
                }`}
              >
                {marketSectors[key].symbol}
              </button>
            ))}
          </div>

          {/* Timeframe Selectors */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5 text-xs font-mono">
            {sector.timeframes.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setActiveTimeframe(tf)}
                className={`px-2.5 py-0.5 rounded-md transition-colors ${
                  activeTimeframe === tf ? "bg-white/20 text-white font-bold" : "text-white/50 hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </header>

        {/* Live Index Quote Row */}
        <div className="flex items-baseline justify-between py-4">
          <div>
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider font-mono">
              {sector.title}
            </h3>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl font-extrabold font-mono tracking-tight text-white">
                {hoveredPoint !== null ? hoveredPoint.toFixed(1) : sector.index}
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-sm font-bold bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                <TrendingUp size={14} /> {sector.change}
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/40">
            <Activity size={13} className="text-emerald-400 animate-pulse" /> Live Synthetic Feed
          </div>
        </div>

        {/* Dynamic Interactive SVG Chart */}
        <div className="relative w-full aspect-[640/180] my-2 bg-black/20 rounded-xl overflow-hidden border border-white/5">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            <defs>
              <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="45" x2={width} y2="45" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
            <line x1="0" y1="90" x2={width} y2="90" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />
            <line x1="0" y1="135" x2={width} y2="135" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="4 4" />

            {/* Area & Line */}
            <path d={areaPath} fill="url(#marketGradient)" />
            <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />

            {/* Interactive Points */}
            {coords.map((pt, idx) => (
              <g key={idx}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredPoint === points[idx] ? "5" : "3"}
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="2"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredPoint(points[idx])}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Holdings Breakdown Area */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white/50 mb-3">
              Sector Holdings & Capitalization
            </h4>
            <div className="grid gap-2">
              {sector.holdings.map((h, i) => (
                <div key={i} className="flex items-center justify-between text-xs font-medium bg-white/5 px-3 py-2 rounded-lg">
                  <span className="text-white/80">{h.name}</span>
                  <span className="font-mono text-emerald-400 font-bold">{h.allocation}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Trading Philosophy</p>
              <p className="text-xs text-white/80 leading-relaxed mt-2">
                "Allocate heavily to clean primitives: sub-1.5s auth flows, RLS row-level security, vectorized semantic search, and deterministic state transitions. Cut fluff, preserve leverage."
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
              <span>STATUS: LONG</span>
              <span className="text-emerald-400">HIGH CONVICTION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

