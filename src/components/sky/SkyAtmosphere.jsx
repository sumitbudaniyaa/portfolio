import React, { useState, useEffect, useRef } from "react";
import { RefreshCw, X } from "lucide-react";

// Default coordinate for background atmospheric weather physics (Sanganer, Jaipur, India)
const DEFAULT_COORDS = { lat: 26.8173, lon: 75.7725 };

// 12 Photographic Art-Directed Sky Palettes
const ART_PALETTES = {
  night: {
    pageBg: "#070b18",
    fadeTo: "#070b18",
    surfaceInk: "#f7f3ed",
    surfaceMuted: "#9ba1b0",
    surfaceBg: "#090e1a",
    surfaceCard: "#0d1527",
    surfaceCardSubtle: "rgba(255, 255, 255, 0.05)",
    surfaceBorder: "rgba(255, 255, 255, 0.12)",
    isDark: true,
    washA: "rgba(4, 12, 44, 0.96)",
    washB: "rgba(18, 52, 124, 0.72)",
    washC: "rgba(64, 112, 192, 0.38)",
    washD: "rgba(7, 11, 24, 0.96)",
    focalA: "rgba(147, 179, 255, 0.40)",
    focalB: "rgba(147, 179, 255, 0)",
    skyFilter: "saturate(1.18) contrast(1.08) brightness(0.82)",
    phase: "night",
    cloudHighlight: "rgba(70, 95, 145, 0.42)",
    cloudCore: "rgba(32, 50, 90, 0.35)",
    cloudShadow: "rgba(15, 25, 55, 0.45)",
    ambientLight: 0.25,
  },
  preDawn: {
    pageBg: "#ffffff",
    fadeTo: "#ffffff",
    surfaceInk: "#11110f",
    surfaceMuted: "#706c63",
    surfaceBg: "#ffffff",
    surfaceCard: "#ffffff",
    surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
    surfaceBorder: "rgba(17, 17, 15, 0.1)",
    isDark: false,
    washA: "rgba(48, 50, 96, 0.88)",
    washB: "rgba(120, 78, 126, 0.62)",
    washC: "rgba(165, 110, 135, 0.48)",
    washD: "rgba(240, 180, 170, 0.28)",
    focalA: "rgba(255, 188, 174, 0.48)",
    focalB: "rgba(255, 188, 174, 0)",
    skyFilter: "saturate(1.22) contrast(1.05) brightness(0.92)",
    phase: "dawn",
    cloudHighlight: "rgba(255, 195, 185, 0.65)",
    cloudCore: "rgba(180, 130, 160, 0.50)",
    cloudShadow: "rgba(95, 75, 115, 0.42)",
    ambientLight: 0.5,
  },
  dawn: {
    pageBg: "#ffffff",
    fadeTo: "#ffffff",
    surfaceInk: "#11110f",
    surfaceMuted: "#706c63",
    surfaceBg: "#ffffff",
    surfaceCard: "#ffffff",
    surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
    surfaceBorder: "rgba(17, 17, 15, 0.1)",
    isDark: false,
    washA: "rgba(255, 115, 76, 0.84)",
    washB: "rgba(255, 182, 118, 0.66)",
    washC: "rgba(182, 215, 255, 0.50)",
    washD: "rgba(255, 245, 215, 0.32)",
    focalA: "rgba(255, 245, 211, 0.76)",
    focalB: "rgba(255, 245, 211, 0)",
    skyFilter: "saturate(1.30) contrast(1.03) brightness(1.04)",
    phase: "dawn",
    cloudHighlight: "rgba(255, 240, 215, 0.85)",
    cloudCore: "rgba(255, 190, 150, 0.65)",
    cloudShadow: "rgba(175, 135, 165, 0.45)",
    ambientLight: 0.72,
  },
  sunrise: {
    pageBg: "#ffffff",
    fadeTo: "#ffffff",
    surfaceInk: "#11110f",
    surfaceMuted: "#706c63",
    surfaceBg: "#ffffff",
    surfaceCard: "#ffffff",
    surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
    surfaceBorder: "rgba(17, 17, 15, 0.1)",
    isDark: false,
    washA: "rgba(255, 95, 68, 0.88)",
    washB: "rgba(255, 175, 95, 0.74)",
    washC: "rgba(142, 208, 255, 0.54)",
    washD: "rgba(255, 248, 215, 0.36)",
    focalA: "rgba(255, 247, 202, 0.84)",
    focalB: "rgba(255, 247, 202, 0)",
    skyFilter: "saturate(1.36) contrast(1.04) brightness(1.06)",
    phase: "sunrise",
    cloudHighlight: "rgba(255, 248, 225, 0.92)",
    cloudCore: "rgba(255, 185, 135, 0.72)",
    cloudShadow: "rgba(185, 130, 140, 0.46)",
    ambientLight: 0.85,
  },
  morning: {
    pageBg: "#ffffff",
    fadeTo: "#ffffff",
    surfaceInk: "#11110f",
    surfaceMuted: "#706c63",
    surfaceBg: "#ffffff",
    surfaceCard: "#ffffff",
    surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
    surfaceBorder: "rgba(17, 17, 15, 0.1)",
    isDark: false,
    washA: "rgba(28, 152, 255, 0.80)",
    washB: "rgba(115, 208, 255, 0.66)",
    washC: "rgba(210, 242, 255, 0.54)",
    washD: "rgba(255, 255, 255, 0.88)",
    focalA: "rgba(255, 255, 255, 0.72)",
    focalB: "rgba(255, 255, 255, 0)",
    skyFilter: "saturate(1.34) contrast(1.04) brightness(1.06)",
    phase: "morning",
    cloudHighlight: "rgba(255, 255, 255, 0.95)",
    cloudCore: "rgba(240, 248, 255, 0.78)",
    cloudShadow: "rgba(175, 205, 230, 0.48)",
    ambientLight: 0.95,
  },
  day: {
    pageBg: "#ffffff",
    fadeTo: "#ffffff",
    surfaceInk: "#11110f",
    surfaceMuted: "#706c63",
    surfaceBg: "#ffffff",
    surfaceCard: "#ffffff",
    surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
    surfaceBorder: "rgba(17, 17, 15, 0.1)",
    isDark: false,
    washA: "rgba(18, 145, 255, 0.82)",
    washB: "rgba(95, 200, 255, 0.68)",
    washC: "rgba(202, 238, 255, 0.52)",
    washD: "rgba(255, 255, 255, 0.92)",
    focalA: "rgba(255, 255, 255, 0.68)",
    focalB: "rgba(255, 255, 255, 0)",
    skyFilter: "saturate(1.36) contrast(1.04) brightness(1.05)",
    phase: "day",
    cloudHighlight: "rgba(255, 255, 255, 0.96)",
    cloudCore: "rgba(242, 249, 255, 0.82)",
    cloudShadow: "rgba(180, 210, 235, 0.50)",
    ambientLight: 1.0,
  },
  golden: {
    pageBg: "#ffffff",
    fadeTo: "#ffffff",
    surfaceInk: "#11110f",
    surfaceMuted: "#706c63",
    surfaceBg: "#ffffff",
    surfaceCard: "#ffffff",
    surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
    surfaceBorder: "rgba(17, 17, 15, 0.1)",
    isDark: false,
    washA: "rgba(255, 118, 58, 0.84)",
    washB: "rgba(255, 192, 85, 0.70)",
    washC: "rgba(122, 194, 255, 0.48)",
    washD: "rgba(255, 240, 185, 0.38)",
    focalA: "rgba(255, 240, 175, 0.80)",
    focalB: "rgba(255, 240, 175, 0)",
    skyFilter: "saturate(1.36) contrast(1.04) brightness(1.04)",
    phase: "golden",
    cloudHighlight: "rgba(255, 246, 215, 0.94)",
    cloudCore: "rgba(255, 205, 140, 0.75)",
    cloudShadow: "rgba(165, 140, 170, 0.48)",
    ambientLight: 0.92,
  },
  lateGolden: {
    pageBg: "#ffffff",
    fadeTo: "#ffffff",
    surfaceInk: "#11110f",
    surfaceMuted: "#706c63",
    surfaceBg: "#ffffff",
    surfaceCard: "#ffffff",
    surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
    surfaceBorder: "rgba(17, 17, 15, 0.1)",
    isDark: false,
    washA: "rgba(255, 115, 68, 0.84)",
    washB: "rgba(255, 184, 102, 0.72)",
    washC: "rgba(138, 176, 238, 0.48)",
    washD: "rgba(255, 232, 182, 0.38)",
    focalA: "rgba(255, 232, 174, 0.78)",
    focalB: "rgba(255, 232, 174, 0)",
    skyFilter: "saturate(1.35) contrast(1.04) brightness(1.03)",
    phase: "golden",
    cloudHighlight: "rgba(255, 238, 205, 0.92)",
    cloudCore: "rgba(255, 190, 130, 0.74)",
    cloudShadow: "rgba(155, 125, 160, 0.50)",
    ambientLight: 0.86,
  },
  roseHour: {
    pageBg: "#ffffff",
    fadeTo: "#ffffff",
    surfaceInk: "#11110f",
    surfaceMuted: "#706c63",
    surfaceBg: "#ffffff",
    surfaceCard: "#ffffff",
    surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
    surfaceBorder: "rgba(17, 17, 15, 0.1)",
    isDark: false,
    washA: "rgba(238, 88, 95, 0.82)",
    washB: "rgba(251, 148, 106, 0.68)",
    washC: "rgba(128, 142, 224, 0.50)",
    washD: "rgba(255, 220, 185, 0.38)",
    focalA: "rgba(255, 217, 177, 0.72)",
    focalB: "rgba(255, 217, 177, 0)",
    skyFilter: "saturate(1.34) contrast(1.05) brightness(1.02)",
    phase: "sunset",
    cloudHighlight: "rgba(255, 222, 200, 0.90)",
    cloudCore: "rgba(235, 150, 140, 0.72)",
    cloudShadow: "rgba(145, 105, 150, 0.52)",
    ambientLight: 0.78,
  },
  sunset: {
    pageBg: "#ffffff",
    fadeTo: "#ffffff",
    surfaceInk: "#11110f",
    surfaceMuted: "#706c63",
    surfaceBg: "#ffffff",
    surfaceCard: "#ffffff",
    surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
    surfaceBorder: "rgba(17, 17, 15, 0.1)",
    isDark: false,
    washA: "rgba(250, 72, 85, 0.84)",
    washB: "rgba(255, 148, 85, 0.74)",
    washC: "rgba(118, 144, 242, 0.52)",
    washD: "rgba(255, 228, 176, 0.40)",
    focalA: "rgba(255, 226, 169, 0.78)",
    focalB: "rgba(255, 226, 169, 0)",
    skyFilter: "saturate(1.36) contrast(1.05) brightness(1.01)",
    phase: "sunset",
    cloudHighlight: "rgba(255, 230, 180, 0.94)",
    cloudCore: "rgba(255, 145, 115, 0.78)",
    cloudShadow: "rgba(135, 90, 145, 0.55)",
    ambientLight: 0.72,
  },
  dusk: {
    pageBg: "#ffffff",
    fadeTo: "#ffffff",
    surfaceInk: "#11110f",
    surfaceMuted: "#706c63",
    surfaceBg: "#ffffff",
    surfaceCard: "#ffffff",
    surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
    surfaceBorder: "rgba(17, 17, 15, 0.1)",
    isDark: false,
    washA: "rgba(78, 82, 196, 0.78)",
    washB: "rgba(235, 118, 128, 0.54)",
    washC: "rgba(42, 84, 168, 0.50)",
    washD: "rgba(195, 155, 205, 0.30)",
    focalA: "rgba(255, 207, 188, 0.56)",
    focalB: "rgba(255, 207, 188, 0)",
    skyFilter: "saturate(1.22) contrast(1.04) brightness(0.92)",
    phase: "dusk",
    cloudHighlight: "rgba(255, 180, 175, 0.70)",
    cloudCore: "rgba(170, 110, 155, 0.56)",
    cloudShadow: "rgba(65, 55, 110, 0.50)",
    ambientLight: 0.52,
  },
  twilight: {
    pageBg: "#ffffff",
    fadeTo: "#ffffff",
    surfaceInk: "#11110f",
    surfaceMuted: "#706c63",
    surfaceBg: "#ffffff",
    surfaceCard: "#ffffff",
    surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
    surfaceBorder: "rgba(17, 17, 15, 0.1)",
    isDark: false,
    washA: "rgba(62, 55, 118, 0.84)",
    washB: "rgba(125, 75, 132, 0.54)",
    washC: "rgba(44, 58, 112, 0.56)",
    washD: "rgba(85, 70, 125, 0.28)",
    focalA: "rgba(255, 205, 188, 0.44)",
    focalB: "rgba(255, 205, 188, 0)",
    skyFilter: "saturate(1.22) contrast(1.05) brightness(0.88)",
    phase: "dusk",
    cloudHighlight: "rgba(190, 140, 170, 0.52)",
    cloudCore: "rgba(115, 80, 125, 0.45)",
    cloudShadow: "rgba(45, 38, 85, 0.48)",
    ambientLight: 0.38,
  },
};

const PALETTE_TIMELINE = [
  { hour: 0, palette: ART_PALETTES.night },
  { hour: 5.15, palette: ART_PALETTES.night },
  { hour: 5.5, palette: ART_PALETTES.preDawn },
  { hour: 6.0, palette: ART_PALETTES.dawn },
  { hour: 6.65, palette: ART_PALETTES.sunrise },
  { hour: 8.5, palette: ART_PALETTES.morning },
  { hour: 13.4, palette: ART_PALETTES.day },
  { hour: 17.3, palette: ART_PALETTES.golden },
  { hour: 17.5, palette: ART_PALETTES.lateGolden },
  { hour: 18.0, palette: ART_PALETTES.roseHour },
  { hour: 18.55, palette: ART_PALETTES.sunset },
  { hour: 19.55, palette: ART_PALETTES.dusk },
  { hour: 20.0, palette: ART_PALETTES.twilight },
  { hour: 20.45, palette: ART_PALETTES.night },
  { hour: 24, palette: ART_PALETTES.night },
];

// --- PHOTOREALISTIC VOLUMETRIC CLOUD NOISE & SYNTHESIS ENGINE ---
const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
const p = new Uint8Array(256);
for (let i = 0; i < 256; i++) p[i] = i;
let seedVal = 1001;
for (let i = 255; i > 0; i--) {
  seedVal = (seedVal * 16807) % 2147483647;
  const j = seedVal % (i + 1);
  const tmp = p[i];
  p[i] = p[j];
  p[j] = tmp;
}
const perm = new Uint8Array(512);
const permMod12 = new Uint8Array(512);
for (let i = 0; i < 512; i++) {
  perm[i] = p[i & 255];
  permMod12[i] = perm[i] % 12;
}
const grad3 = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
  [1, 1], [-1, 1], [1, -1], [-1, -1],
];

function noise2D(xin, yin) {
  const s = (xin + yin) * F2;
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);
  const t = (i + j) * G2;
  const x0 = xin - (i - t);
  const y0 = yin - (j - t);
  const i1 = x0 > y0 ? 1 : 0;
  const j1 = x0 > y0 ? 0 : 1;
  const x1 = x0 - i1 + G2;
  const y1 = y0 - j1 + G2;
  const x2 = x0 - 1.0 + 2.0 * G2;
  const y2 = y0 - 1.0 + 2.0 * G2;
  const ii = i & 255;
  const jj = j & 255;

  let n0 = 0, n1 = 0, n2 = 0;
  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 > 0) {
    t0 *= t0;
    const g = permMod12[ii + perm[jj]];
    n0 = t0 * t0 * (grad3[g][0] * x0 + grad3[g][1] * y0);
  }
  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 > 0) {
    t1 *= t1;
    const g = permMod12[ii + i1 + perm[jj + j1]];
    n1 = t1 * t1 * (grad3[g][0] * x1 + grad3[g][1] * y1);
  }
  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 > 0) {
    t2 *= t2;
    const g = permMod12[ii + 1 + perm[jj + 1]];
    n2 = t2 * t2 * (grad3[g][0] * x2 + grad3[g][1] * y2);
  }
  return 70.0 * (n0 + n1 + n2);
}

function fbm(x, y, octaves = 4) {
  let v = 0, a = 0.5, f = 1.0;
  for (let o = 0; o < octaves; o++) {
    v += a * noise2D(x * f, y * f);
    f *= 2.02;
    a *= 0.5;
  }
  return v;
}

function parseRgba(str) {
  if (!str) return [255, 255, 255, 1];
  const m = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\)/);
  if (m) {
    return [
      parseFloat(m[1]),
      parseFloat(m[2]),
      parseFloat(m[3]),
      m[4] !== undefined ? parseFloat(m[4]) : 1.0,
    ];
  }
  return [255, 255, 255, 1];
}

function smoothUnion(d1, d2, k = 0.4) {
  const h = Math.max(0, Math.min(1, 0.5 + 0.5 * (d2 - d1) / k));
  return d2 * (1 - h) + d1 * h - k * h * (1 - h);
}

function generateCumulus(w, h, turrets, seed) {
  const density = new Float32Array(w * h);
  const light = new Float32Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let d = 999;
      for (let t = 0; t < turrets.length; t++) {
        const item = turrets[t];
        const dx = (x - item.x) / item.rx;
        const dy = (y - item.y) / item.ry;
        const dist = Math.sqrt(dx * dx + dy * dy);
        d = smoothUnion(d, dist, 0.4);
      }

      // Flat condensation deck dissipation
      const baseDeck = h * 0.74;
      if (y > baseDeck) {
        d += ((y - baseDeck) / (h * 0.26)) * 1.8;
      }

      if (d > 1.35) continue;

      // Domain-warped turbulence
      const u = (x / w) * 3.4 + seed;
      const v = (y / h) * 3.0 + seed * 1.5;
      const qx = fbm(u + 5.2, v + 1.3, 3);
      const qy = fbm(u + 1.7, v + 9.2, 3);
      const n = fbm(u + 0.9 * qx, v + 0.9 * qy, 4);

      const effDist = d - n * 0.45;
      if (effDist >= 1.0) continue;

      const rawD = Math.max(0, Math.min(1, (1.0 - effDist) / 0.55));
      const finalD = Math.pow(rawD, 1.35) * 0.96;
      if (finalD < 0.01) continue;

      const idx = y * w + x;
      density[idx] = finalD;

      const heightGrad = Math.max(0, Math.min(1, 1.0 - (y / h) * 0.85));
      const internalLight = Math.max(0, Math.min(1, 1.0 - finalD * 0.25));
      const rimLight = Math.max(0, Math.min(1, 0.5 - (d - 0.7) * 1.5));
      light[idx] = Math.max(0, Math.min(1, heightGrad * 0.45 + rimLight * 0.35 + internalLight * 0.20));
    }
  }

  let canvas = null;
  let ctx = null;
  if (typeof document !== "undefined") {
    canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    ctx = canvas.getContext("2d");
  }

  return { w, h, density, light, canvas, ctx };
}

function generateCirrus(w, h, seed) {
  const density = new Float32Array(w * h);
  const light = new Float32Array(w * h);

  for (let y = 0; y < h; y++) {
    const ny = (y / h) * 2 - 1;
    const envelope = Math.max(0, 1.0 - ny * ny);

    for (let x = 0; x < w; x++) {
      const nx = (x / w) * 2 - 1;
      const xShear = nx - ny * 0.45;
      const xEnv = Math.max(0, 1.0 - xShear * xShear * 0.9);
      const mask = envelope * xEnv;
      if (mask < 0.05) continue;

      const u = xShear * 2.2 + seed;
      const v = ny * 4.5 + seed * 2.0;
      const qx = fbm(u * 1.5, v * 2.2, 3);
      const n = fbm(u * 2.0 + qx, v * 3.5, 4);

      const d = (n * 0.5 + 0.5) * mask;
      if (d < 0.08) continue;

      const finalD = Math.pow(d, 1.6) * 0.62;
      const idx = y * w + x;
      density[idx] = finalD;
      light[idx] = Math.max(0, Math.min(1, 0.7 + (1 - ny) * 0.25));
    }
  }

  let canvas = null;
  let ctx = null;
  if (typeof document !== "undefined") {
    canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    ctx = canvas.getContext("2d");
  }

  return { w, h, density, light, canvas, ctx };
}

function tintCloudTemplates(templates, palette) {
  if (!templates || templates.length === 0 || !palette) return;
  const highlightRgba = parseRgba(palette.cloudHighlight);
  const coreRgba = parseRgba(palette.cloudCore);
  const shadowRgba = parseRgba(palette.cloudShadow);

  templates.forEach((t) => {
    if (!t.ctx) return;
    const imgData = t.ctx.createImageData(t.w, t.h);
    const data32 = new Uint32Array(imgData.data.buffer);
    const N = t.w * t.h;

    for (let i = 0; i < N; i++) {
      const d = t.density[i];
      if (d <= 0.005) continue;

      const l = t.light[i];
      let r, g, b, a;
      if (l < 0.5) {
        const factor = l * 2;
        r = shadowRgba[0] + (coreRgba[0] - shadowRgba[0]) * factor;
        g = shadowRgba[1] + (coreRgba[1] - shadowRgba[1]) * factor;
        b = shadowRgba[2] + (coreRgba[2] - shadowRgba[2]) * factor;
        a = (shadowRgba[3] + (coreRgba[3] - shadowRgba[3]) * factor) * d;
      } else {
        const factor = (l - 0.5) * 2;
        r = coreRgba[0] + (highlightRgba[0] - coreRgba[0]) * factor;
        g = coreRgba[1] + (highlightRgba[1] - coreRgba[1]) * factor;
        b = coreRgba[2] + (highlightRgba[2] - coreRgba[2]) * factor;
        a = (coreRgba[3] + (highlightRgba[3] - coreRgba[3]) * factor) * d;
      }

      const aB = Math.min(255, Math.max(0, Math.round(a * 255)));
      const rB = Math.min(255, Math.max(0, Math.round(r)));
      const gB = Math.min(255, Math.max(0, Math.round(g)));
      const bB = Math.min(255, Math.max(0, Math.round(b)));

      data32[i] = (aB << 24) | (bB << 16) | (gB << 8) | rB;
    }
    t.ctx.putImageData(imgData, 0, 0);
  });
}

let cachedCloudTemplates = null;
function getCloudTemplates() {
  if (!cachedCloudTemplates && typeof document !== "undefined") {
    cachedCloudTemplates = [
      // 1. Majestic Convective Cumulus (towering central cauliflower crown, flat condensation base)
      generateCumulus(560, 240, [
        { x: 130, y: 145, rx: 85, ry: 60 },
        { x: 220, y: 115, rx: 105, ry: 85 },
        { x: 320, y: 100, rx: 125, ry: 95 },
        { x: 420, y: 125, rx: 100, ry: 75 },
        { x: 495, y: 155, rx: 75, ry: 50 },
        { x: 310, y: 165, rx: 230, ry: 45 },
      ], 12.3),

      // 2. Billowing Scattered Cumulus (wind-ruffled convective lobes)
      generateCumulus(500, 210, [
        { x: 120, y: 130, rx: 80, ry: 60 },
        { x: 210, y: 105, rx: 95, ry: 75 },
        { x: 310, y: 115, rx: 105, ry: 70 },
        { x: 400, y: 135, rx: 85, ry: 55 },
        { x: 260, y: 150, rx: 190, ry: 40 },
      ], 45.6),

      // 3. High-Altitude Cirrus Mares' Tails (wind-stretched horizontal virga streamers)
      generateCirrus(640, 130, 78.9),

      // 4. Delicate Cirrostratus Filament Veil
      generateCirrus(580, 110, 99.1),
    ];
  }
  return cachedCloudTemplates;
}


function getWeatherLabel(code, rain) {
  if (rain > 0) return "Rainy";
  if (code === 0) return "Clear Sky";
  if (code === 1) return "Mainly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 85 && code <= 86) return "Snow";
  if (code >= 95) return "Thunderstorm";
  return "Clear";
}

function computeWeatherPalette(basePalette, weatherData) {
  if (!weatherData) return basePalette;

  const code = weatherData.weatherCode || 0;
  const cloudCover = weatherData.cloudCover ?? 30;
  const rain = weatherData.rain || 0;
  const isNight = basePalette.phase === "night";

  // If Night:
  if (isNight) {
    if (code >= 95 || rain > 0) {
      return {
        ...basePalette,
        pageBg: "#050811",
        fadeTo: "#050811",
        surfaceInk: "#f7f3ed",
        surfaceMuted: "#9ba1b0",
        surfaceBg: "#090e1a",
        surfaceCard: "#0d1527",
        surfaceBorder: "rgba(255, 255, 255, 0.12)",
        isDark: true,
        washA: "rgba(3, 6, 18, 0.98)",
        washB: "rgba(12, 20, 42, 0.88)",
        washC: "rgba(24, 38, 70, 0.55)",
        washD: "rgba(5, 8, 17, 0.98)",
        skyFilter: "saturate(0.95) contrast(1.10) brightness(0.75)",
        cloudHighlight: "rgba(45, 60, 95, 0.50)",
        cloudCore: "rgba(20, 30, 55, 0.55)",
        cloudShadow: "rgba(8, 14, 28, 0.70)",
      };
    }
    if (code === 3 || cloudCover >= 80) {
      return {
        ...basePalette,
        pageBg: "#060914",
        fadeTo: "#060914",
        surfaceInk: "#f7f3ed",
        surfaceMuted: "#9ba1b0",
        surfaceBg: "#090e1a",
        surfaceCard: "#0d1527",
        surfaceBorder: "rgba(255, 255, 255, 0.12)",
        isDark: true,
        washA: "rgba(4, 8, 22, 0.98)",
        washB: "rgba(16, 26, 52, 0.80)",
        washC: "rgba(32, 48, 82, 0.45)",
        washD: "rgba(6, 9, 20, 0.98)",
        cloudHighlight: "rgba(55, 75, 115, 0.45)",
        cloudCore: "rgba(25, 40, 70, 0.48)",
        cloudShadow: "rgba(10, 18, 35, 0.60)",
      };
    }
    return basePalette;
  }

  // Thunderstorm:
  if (code >= 95) {
    return {
      ...basePalette,
      isDark: true,
      pageBg: "#0c0f18",
      fadeTo: "#0c0f18",
      surfaceInk: "#f4f6fb",
      surfaceMuted: "#929bb0",
      surfaceBg: "#101420",
      surfaceCard: "#141a2a",
      surfaceCardSubtle: "rgba(255, 255, 255, 0.05)",
      surfaceBorder: "rgba(255, 255, 255, 0.12)",
      washA: "rgba(48, 54, 76, 0.94)",
      washB: "rgba(72, 80, 105, 0.82)",
      washC: "rgba(110, 118, 142, 0.65)",
      washD: "rgba(155, 165, 188, 0.45)",
      focalA: "rgba(180, 190, 215, 0.35)",
      focalB: "rgba(180, 190, 215, 0)",
      skyFilter: "saturate(1.05) contrast(1.15) brightness(0.82)",
      cloudHighlight: "rgba(150, 160, 185, 0.85)",
      cloudCore: "rgba(95, 105, 130, 0.80)",
      cloudShadow: "rgba(55, 65, 88, 0.75)",
    };
  }

  // Rain / Showers / Drizzle:
  if (rain > 0 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return {
      ...basePalette,
      isDark: false,
      pageBg: "#ffffff",
      fadeTo: "#ffffff",
      surfaceInk: "#11110f",
      surfaceMuted: "#706c63",
      surfaceBg: "#ffffff",
      surfaceCard: "#ffffff",
      surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
      surfaceBorder: "rgba(17, 17, 15, 0.1)",
      washA: "rgba(92, 112, 136, 0.92)",
      washB: "rgba(125, 145, 168, 0.78)",
      washC: "rgba(168, 184, 204, 0.62)",
      washD: "rgba(215, 226, 238, 0.45)",
      focalA: "rgba(220, 230, 245, 0.35)",
      focalB: "rgba(220, 230, 245, 0)",
      skyFilter: "saturate(0.92) contrast(1.05) brightness(0.90)",
      cloudHighlight: "rgba(195, 208, 222, 0.88)",
      cloudCore: "rgba(135, 150, 172, 0.78)",
      cloudShadow: "rgba(85, 100, 122, 0.65)",
    };
  }

  // Dense Fog / Mist:
  if (code >= 45 && code <= 48) {
    return {
      ...basePalette,
      isDark: false,
      pageBg: "#ffffff",
      fadeTo: "#ffffff",
      surfaceInk: "#11110f",
      surfaceMuted: "#706c63",
      surfaceBg: "#ffffff",
      surfaceCard: "#ffffff",
      surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
      surfaceBorder: "rgba(17, 17, 15, 0.1)",
      washA: "rgba(175, 188, 200, 0.88)",
      washB: "rgba(198, 208, 218, 0.76)",
      washC: "rgba(222, 228, 235, 0.65)",
      washD: "rgba(242, 245, 248, 0.85)",
      focalA: "rgba(245, 248, 252, 0.50)",
      focalB: "rgba(245, 248, 252, 0)",
      skyFilter: "saturate(0.72) contrast(0.92) brightness(1.02)",
      cloudHighlight: "rgba(235, 240, 245, 0.80)",
      cloudCore: "rgba(195, 205, 215, 0.65)",
      cloudShadow: "rgba(160, 170, 180, 0.50)",
    };
  }

  // Heavy Overcast:
  if (code === 3 || cloudCover >= 80) {
    return {
      ...basePalette,
      isDark: false,
      pageBg: "#ffffff",
      fadeTo: "#ffffff",
      surfaceInk: "#11110f",
      surfaceMuted: "#706c63",
      surfaceBg: "#ffffff",
      surfaceCard: "#ffffff",
      surfaceCardSubtle: "rgba(0, 0, 0, 0.03)",
      surfaceBorder: "rgba(17, 17, 15, 0.1)",
      washA: "rgba(130, 150, 172, 0.88)",
      washB: "rgba(165, 182, 200, 0.74)",
      washC: "rgba(202, 216, 230, 0.58)",
      washD: "rgba(238, 244, 250, 0.72)",
      focalA: "rgba(240, 245, 255, 0.45)",
      focalB: "rgba(240, 245, 255, 0)",
      skyFilter: "saturate(0.85) contrast(0.98) brightness(0.96)",
      cloudHighlight: "rgba(225, 235, 245, 0.90)",
      cloudCore: "rgba(170, 185, 205, 0.78)",
      cloudShadow: "rgba(120, 138, 160, 0.58)",
    };
  }

  // Clear Sky:
  if (cloudCover <= 20) {
    return {
      ...basePalette,
      skyFilter: "saturate(1.38) contrast(1.08) brightness(1.05)",
    };
  }

  return basePalette;
}

function getPaletteForHour(hour) {
  const h = (hour + 24) % 24;
  for (let i = 0; i < PALETTE_TIMELINE.length - 1; i++) {
    const cur = PALETTE_TIMELINE[i];
    const nxt = PALETTE_TIMELINE[i + 1];
    if (h >= cur.hour && h <= nxt.hour) {
      const progress = (h - cur.hour) / (nxt.hour - cur.hour || 1);
      return progress > 0.5 ? nxt.palette : cur.palette;
    }
  }
  return ART_PALETTES.day;
}

export default function SkyAtmosphere({
  timeOfDay,
  setTimeOfDay,
  weatherData: externalWeather,
  setWeatherData: externalSetWeather,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoTime, setIsAutoTime] = useState(true);

  // Live user city detection (persisted, defaulting to Sanganer)
  const [cityName, setCityName] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_city");
      if (saved && saved !== "Bengaluru") return saved;
      localStorage.setItem("user_city", "Sanganer");
    }
    return "Sanganer";
  });

  // Background weather dynamics for realistic cloud volume & wind drift
  const [internalWeatherData, setInternalWeatherData] = useState({
    cloudCover: 25,
    windSpeed: 10,
    rain: 0,
    weatherCode: 0,
    temperature: 34,
  });

  const weatherData = externalWeather || internalWeatherData;
  const setWeatherData = externalSetWeather || setInternalWeatherData;

  const canvasRef = useRef(null);
  const dialRef = useRef(null);

  // Reverse geocoding to resolve the current city
  const resolveCityName = async (lat, lon) => {
    if (!lat || !lon) return;
    try {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const detected = data.locality || data.city || data.principalSubdivision;
        if (detected && detected !== "Bengaluru") {
          setCityName(detected);
          localStorage.setItem("user_city", detected);
        }
        return;
      }
    } catch {
      // fallback below
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      if (res.ok) {
        const data = await res.json();
        const detected =
          data.address?.suburb ||
          data.address?.neighbourhood ||
          data.address?.locality ||
          data.address?.city ||
          data.address?.town;
        if (detected && detected !== "Bengaluru") {
          setCityName(detected);
          localStorage.setItem("user_city", detected);
        }
      }
    } catch {
      // keep fallback
    }
  };

  // Live weather fetch from Open-Meteo for physical accuracy
  const fetchLiveWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m&timezone=auto`
      );
      if (!res.ok) return;
      const data = await res.json();
      const current = data.current;
      const code = current.weather_code ?? 0;

      setWeatherData({
        cloudCover: current.cloud_cover ?? 25,
        windSpeed: Math.round(current.wind_speed_10m ?? 10),
        rain: (current.rain ?? 0) + (current.showers ?? 0) + (code >= 51 && code <= 67 ? 1 : 0),
        snow: (current.snowfall ?? 0) + (code >= 71 && code <= 77 ? 1 : 0),
        weatherCode: code,
        temperature: Math.round(current.temperature_2m ?? 34),
      });
    } catch {
      // Fallback to default
    }
  };

  useEffect(() => {
    fetchLiveWeather(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lon } = pos.coords;
          fetchLiveWeather(lat, lon);
          resolveCityName(lat, lon);
        },
        () => {
          // keep Sanganer default
        },
        { timeout: 7000 }
      );
    }
  }, []);

  // Update clock when in auto-time
  useEffect(() => {
    if (!isAutoTime) return;
    const now = new Date();
    setTimeOfDay(now.getHours() + now.getMinutes() / 60);

    const interval = setInterval(() => {
      const d = new Date();
      setTimeOfDay(d.getHours() + d.getMinutes() / 60);
    }, 30000);
    return () => clearInterval(interval);
  }, [isAutoTime, setTimeOfDay]);

  // Current active palette modulated by real city weather
  const activePalette = computeWeatherPalette(getPaletteForHour(timeOfDay), weatherData);

  // Update root CSS variables for photographic atmospheric scattering and dark mode
  useEffect(() => {
    // Only night or severe storm (e.g. thunderstorm) activates dark theme.
    // Day, morning, evening remain in clean light mode.
    const isNight = activePalette.phase === "night";
    const isSevereStorm = Boolean(weatherData && weatherData.weatherCode >= 95);
    const isDark = Boolean(activePalette.isDark || isNight || isSevereStorm);
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.setAttribute("data-theme", isDark ? "dark" : "light");

    root.style.setProperty("--page-bg", isDark ? "#070b18" : "#ffffff");
    root.style.setProperty("--fade-to", isDark ? "#070b18" : "#ffffff");
    root.style.setProperty("--surface-ink", isDark ? "#f7f3ed" : "#11110f");
    root.style.setProperty("--surface-muted", isDark ? "#9ba1b0" : "#706c63");
    root.style.setProperty("--surface-bg", isDark ? "#090e1a" : "#ffffff");
    root.style.setProperty("--surface-card", isDark ? "#0d1527" : "#ffffff");
    root.style.setProperty("--surface-card-subtle", isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)");
    root.style.setProperty("--surface-border", isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(17, 17, 15, 0.1)");

    root.style.setProperty("--wash-a", activePalette.washA);
    root.style.setProperty("--wash-b", activePalette.washB);
    root.style.setProperty("--wash-c", activePalette.washC);
    root.style.setProperty("--wash-d", activePalette.washD);
    root.style.setProperty("--focal-a", activePalette.focalA);
    root.style.setProperty("--focal-b", activePalette.focalB);
    root.style.setProperty("--sky-filter", activePalette.skyFilter);

    // Dynamic tinting for photorealistic volumetric clouds
    tintCloudTemplates(getCloudTemplates(), activePalette);
  }, [activePalette, weatherData]);

  // Optical Canvas Atmosphere Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    // 1. Procedural Volumetric Clouds System
    const templates = getCloudTemplates();
    tintCloudTemplates(templates, activePalette);

    const cloudInstances = [
      // High-Altitude Cirrus Layer (drifting slowly, high in the sky, silky)
      { templateIdx: 2, relX: 0.05, relY: 0.04, baseScale: 1.15, speedFactor: 0.28, baseAlpha: 0.60 },
      { templateIdx: 3, relX: 0.55, relY: 0.08, baseScale: 1.10, speedFactor: 0.32, baseAlpha: 0.55 },

      // Mid-Altitude Convective Cumulus Banks (towering cauliflower crowns, flat bases)
      { templateIdx: 0, relX: -0.08, relY: 0.15, baseScale: 1.25, speedFactor: 0.52, baseAlpha: 0.92 },
      { templateIdx: 1, relX: 0.40, relY: 0.24, baseScale: 1.12, speedFactor: 0.60, baseAlpha: 0.88 },
      { templateIdx: 0, relX: 0.78, relY: 0.18, baseScale: 1.18, speedFactor: 0.48, baseAlpha: 0.85 },

      // Lower-Altitude Drifting Banks
      { templateIdx: 1, relX: 0.18, relY: 0.34, baseScale: 1.05, speedFactor: 0.72, baseAlpha: 0.80 },
      { templateIdx: 3, relX: 0.80, relY: 0.36, baseScale: 0.95, speedFactor: 0.65, baseAlpha: 0.70 },
    ];

    // 2. Starfield Generator (450 multi-magnitude twinkling celestial bodies)
    const stars = [];
    for (let i = 0; i < 450; i++) {
      const isHotBlue = Math.random() < 0.18;
      const isWarmGolden = Math.random() < 0.15;
      let starColor = "255, 255, 255";
      if (isHotBlue) starColor = "215, 235, 255";
      else if (isWarmGolden) starColor = "255, 230, 195";

      stars.push({
        x: Math.random(),
        y: Math.random() * 0.72,
        baseRadius: Math.random() * 1.3 + 0.35,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        isDiffractionCross: Math.random() > 0.88,
        color: starColor,
      });
    }

    // 3. Occasional Shooting Star
    let shootingStar = null;
    let nextShootingStarTime = performance.now() + 8000 + Math.random() * 8000;

    // 4. Rain Particles Engine
    const rainDrops = [];
    for (let i = 0; i < 90; i++) {
      rainDrops.push({
        x: Math.random(),
        y: Math.random(),
        length: Math.random() * 32 + 18,
        speed: Math.random() * 0.022 + 0.016,
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    let lastTime = performance.now();

    const render = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      if (w === 0 || h === 0) return;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const isNight = activePalette.phase === "night";
      const isSunPresent = !isNight;

      // ─── 1. SOLAR CORONA, ATMOSPHERIC SCATTERING & SILKY GOD RAYS ───
      if (isSunPresent) {
        const progress = Math.min(Math.max((timeOfDay - 5.4) / 14.6, 0), 1);
        const sunX = w * (0.12 + 0.76 * progress);
        const sunArc = Math.sin(progress * Math.PI);
        const sunY = h * (0.72 - sunArc * 0.52);

        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // A. Broad Rayleigh Scattering Dome (Soft atmospheric ambient bloom)
        const broadRadius = Math.max(w * 0.45, 340);
        const skyGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, broadRadius);
        skyGlow.addColorStop(0, "rgba(255, 250, 230, 0.45)");
        skyGlow.addColorStop(0.20, "rgba(255, 235, 195, 0.20)");
        skyGlow.addColorStop(0.50, "rgba(255, 210, 160, 0.06)");
        skyGlow.addColorStop(1, "rgba(255, 200, 140, 0)");
        ctx.fillStyle = skyGlow;
        ctx.fillRect(0, 0, w, h);

        const isSunObscured = weatherData.weatherCode === 3 || weatherData.cloudCover >= 80 || weatherData.rain > 0;

        // B. Silky-Smooth Volumetric God Rays (Downward-fanning atmospheric light shafts)
        // Hidden during heavy overcast/rain as direct sunlight is diffused uniformly
        if (!isSunObscured) {
          const rayAngles = [
            Math.PI * 0.28,
            Math.PI * 0.38,
            Math.PI * 0.50,
            Math.PI * 0.62,
            Math.PI * 0.72,
          ];
          const rayLength = Math.max(w * 0.55, 380);

          rayAngles.forEach((baseAngle, idx) => {
            const sway = Math.sin(currentTime * 0.0003 + idx * 1.5) * 0.04;
            const angle = baseAngle + sway;
            const spread = 0.16 + Math.sin(currentTime * 0.0002 + idx) * 0.02;

            const leftX = sunX + Math.cos(angle - spread) * rayLength;
            const leftY = sunY + Math.sin(angle - spread) * rayLength;
            const rightX = sunX + Math.cos(angle + spread) * rayLength;
            const rightY = sunY + Math.sin(angle + spread) * rayLength;

            // Cross-gradient: zero opacity on both edges ensures feather-soft boundaries without hard lines
            const crossGrad = ctx.createLinearGradient(leftX, leftY, rightX, rightY);
            crossGrad.addColorStop(0, "rgba(255, 252, 235, 0)");
            crossGrad.addColorStop(0.25, "rgba(255, 248, 220, 0.025)");
            crossGrad.addColorStop(0.50, "rgba(255, 245, 210, 0.070)");
            crossGrad.addColorStop(0.75, "rgba(255, 248, 220, 0.025)");
            crossGrad.addColorStop(1, "rgba(255, 252, 235, 0)");

            ctx.save();
            ctx.fillStyle = crossGrad;
            ctx.beginPath();
            ctx.moveTo(sunX, sunY);
            ctx.lineTo(leftX, leftY);
            ctx.lineTo(rightX, rightY);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          });
        }

        // C. Soft Outer Corona Haze (diffused when obscured)
        const coronaOuterRadius = isSunObscured ? 180 : 130;
        const coronaOuterGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, coronaOuterRadius);
        coronaOuterGrad.addColorStop(0, isSunObscured ? "rgba(255, 245, 225, 0.40)" : "rgba(255, 250, 230, 0.82)");
        coronaOuterGrad.addColorStop(0.3, isSunObscured ? "rgba(255, 235, 205, 0.20)" : "rgba(255, 240, 200, 0.38)");
        coronaOuterGrad.addColorStop(0.7, isSunObscured ? "rgba(255, 220, 180, 0.05)" : "rgba(255, 220, 160, 0.09)");
        coronaOuterGrad.addColorStop(1, "rgba(255, 200, 130, 0)");
        ctx.fillStyle = coronaOuterGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, coronaOuterRadius, 0, Math.PI * 2);
        ctx.fill();

        // D. Brilliant Solar Disc Core (dimmed if obscured by cloud deck)
        const discRadius = isSunObscured ? 28 : 20;
        const discGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, discRadius);
        discGrad.addColorStop(0, isSunObscured ? "rgba(255, 255, 255, 0.65)" : "rgba(255, 255, 255, 1)");
        discGrad.addColorStop(0.65, isSunObscured ? "rgba(255, 250, 230, 0.45)" : "rgba(255, 252, 235, 0.95)");
        discGrad.addColorStop(1, "rgba(255, 235, 170, 0)");
        ctx.fillStyle = discGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, discRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // ─── 2. NIGHT SKY: TWINKLING STARS, MOON & METEOR ───
      if (isNight) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Twinkling Starfield
        const cloudFactor = Math.max(0.1, 1 - weatherData.cloudCover / 100);
        stars.forEach((star) => {
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = Math.sin(star.twinklePhase) * 0.38 + 0.62;
          const alpha = twinkle * cloudFactor;
          if (alpha > 0.05) {
            const sx = star.x * w;
            const sy = star.y * h;

            if (star.isDiffractionCross) {
              ctx.strokeStyle = `rgba(${star.color}, ${alpha * 0.85})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(sx - 4.5, sy);
              ctx.lineTo(sx + 4.5, sy);
              ctx.moveTo(sx, sy - 4.5);
              ctx.lineTo(sx, sy + 4.5);
              ctx.stroke();

              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
              ctx.beginPath();
              ctx.arc(sx, sy, star.baseRadius * 1.1, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillStyle = `rgba(${star.color}, ${alpha * 0.82})`;
              ctx.beginPath();
              ctx.arc(sx, sy, star.baseRadius, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });

        // Occasional Shooting Star
        if (!shootingStar && currentTime > nextShootingStarTime) {
          shootingStar = {
            x: Math.random() * w * 0.7 + w * 0.15,
            y: Math.random() * h * 0.35 + 20,
            vx: (Math.random() * 500 + 400) * (Math.random() > 0.5 ? 1 : -1),
            vy: Math.random() * 250 + 150,
            life: 1.0,
            length: Math.random() * 60 + 50,
          };
          nextShootingStarTime = currentTime + 14000 + Math.random() * 12000;
        }

        if (shootingStar) {
          shootingStar.x += shootingStar.vx * dt;
          shootingStar.y += shootingStar.vy * dt;
          shootingStar.life -= dt * 1.8;

          if (shootingStar.life <= 0) {
            shootingStar = null;
          } else {
            const angle = Math.atan2(shootingStar.vy, shootingStar.vx);
            const tailX = shootingStar.x - Math.cos(angle) * shootingStar.length;
            const tailY = shootingStar.y - Math.sin(angle) * shootingStar.length;
            const meteorGrad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
            meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.life * 0.9})`);
            meteorGrad.addColorStop(0.3, `rgba(200, 230, 255, ${shootingStar.life * 0.6})`);
            meteorGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

            ctx.strokeStyle = meteorGrad;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(shootingStar.x, shootingStar.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();
          }
        }

        // Luminous Lunar Disc & Halo
        const moonProgress = timeOfDay >= 18 ? (timeOfDay - 18) / 12 : (timeOfDay + 6) / 12;
        const moonX = w * (0.18 + 0.64 * moonProgress);
        const moonY = h * (0.64 - Math.sin(moonProgress * Math.PI) * 0.45);

        // Soft Lunar Halo
        const haloRadius = 75;
        const haloGrad = ctx.createRadialGradient(moonX, moonY, 12, moonX, moonY, haloRadius);
        haloGrad.addColorStop(0, "rgba(220, 238, 255, 0.42)");
        haloGrad.addColorStop(0.32, "rgba(165, 198, 248, 0.14)");
        haloGrad.addColorStop(1, "rgba(140, 175, 245, 0)");
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(moonX, moonY, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Moon Body with realistic lunar crescent shading
        const moonRadius = 15;
        const moonBodyGrad = ctx.createRadialGradient(moonX - 4, moonY - 4, 1, moonX, moonY, moonRadius);
        moonBodyGrad.addColorStop(0, "#ffffff");
        moonBodyGrad.addColorStop(0.75, "#e6edf5");
        moonBodyGrad.addColorStop(1, "#cbd5e1");
        ctx.fillStyle = moonBodyGrad;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle Lunar Maria (crater impressions)
        ctx.fillStyle = "rgba(160, 175, 195, 0.28)";
        ctx.beginPath();
        ctx.arc(moonX + 3, moonY - 2, 4.5, 0, Math.PI * 2);
        ctx.arc(moonX - 2, moonY + 3, 3.5, 0, Math.PI * 2);
        ctx.arc(moonX + 4, moonY + 4, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // ─── 3. VOLUMETRIC NATURAL DRIFTING CLOUDS ───
      const cloudCoverRatio = (weatherData.cloudCover ?? 30) / 100;
      // Clear skies (< 10%) dissolve clouds completely; cloudy skies scale up naturally
      const cloudCoverFactor =
        cloudCoverRatio <= 0.12 ? cloudCoverRatio * 0.4 : Math.min(1.0, 0.15 + cloudCoverRatio * 0.85);
      const windDriftSpeed = Math.max(weatherData.windSpeed, 5) * 0.000032;

      ctx.save();
      cloudInstances.forEach((inst) => {
        inst.relX += windDriftSpeed * inst.speedFactor * dt * 60;
        if (inst.relX > 1.35) {
          inst.relX = -0.45;
          inst.relY = Math.max(0.05, Math.min(0.50, inst.relY + (Math.random() - 0.5) * 0.06));
        }

        const template = templates[inst.templateIdx];
        if (!template || !template.canvas) return;

        const destW = template.w * inst.baseScale;
        const destH = template.h * inst.baseScale;
        const posX = inst.relX * w;
        const posY = inst.relY * h;

        if (posX + destW < -100 || posX > w + 100) return;

        ctx.save();
        ctx.globalAlpha = inst.baseAlpha * cloudCoverFactor;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(template.canvas, posX, posY, destW, destH);
        ctx.restore();
      });
      ctx.restore();

      // ─── 4. ATMOSPHERIC PRECIPITATION (RAIN & FOG) ───
      if (weatherData.rain > 0 || weatherData.weatherCode >= 51) {
        ctx.save();
        ctx.strokeStyle = "rgba(220, 240, 255, 0.42)";
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        rainDrops.forEach((d) => {
          d.y += d.speed * (1 + weatherData.windSpeed * 0.03);
          d.x += (weatherData.windSpeed * 0.0003);
          if (d.y > 1) {
            d.y = 0;
            d.x = Math.random();
          }
          if (d.x > 1) d.x = 0;

          const startX = d.x * w;
          const startY = d.y * h * 0.85;
          const slantX = (weatherData.windSpeed * 1.2);
          ctx.moveTo(startX, startY);
          ctx.lineTo(startX + slantX, startY + d.length);
        });
        ctx.stroke();
        ctx.restore();
      }

      // Rolling Atmospheric Fog
      if (weatherData.weatherCode >= 45 && weatherData.weatherCode <= 48) {
        ctx.save();
        const fogGrad = ctx.createLinearGradient(0, h * 0.4, 0, h);
        fogGrad.addColorStop(0, "rgba(240, 245, 250, 0)");
        fogGrad.addColorStop(0.6, "rgba(240, 245, 250, 0.35)");
        fogGrad.addColorStop(1, "rgba(240, 245, 250, 0.65)");
        ctx.fillStyle = fogGrad;
        ctx.fillRect(0, h * 0.4, w, h * 0.6);
        ctx.restore();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = Math.min(window.innerHeight * 0.72, 840) * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [timeOfDay, activePalette, weatherData]);

  // Arc dial slider calculation
  const getDialHandlePos = () => {
    const angle = (timeOfDay / 24) * Math.PI;
    const cx = 120;
    const cy = 125;
    const r = 96;
    const x = cx - r * Math.cos(angle);
    const y = cy - r * Math.sin(angle);
    return { x, y };
  };

  const handleDialPointer = (e) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height;

    const dx = e.clientX - cx;
    const dy = cy - e.clientY;

    let angle = Math.atan2(dy, -dx);
    if (angle < 0) angle = dx >= 0 ? Math.PI : 0;
    const ratio = Math.max(0, Math.min(1, angle / Math.PI));
    const newHours = ratio * 24;
    setIsAutoTime(false);
    setTimeOfDay(newHours);
  };

  const { x: handleX, y: handleY } = getDialHandlePos();

  const resetToNow = () => {
    const d = new Date();
    setIsAutoTime(true);
    setTimeOfDay(d.getHours() + d.getMinutes() / 60);
  };

  return (
    <>
      {/* Photographic Atmospheric Sky System */}
      <div className="site-sky" aria-hidden="true">
        {/* Layer 1: Base Optical Multi-Radial Gradient Wash */}
        <div
          className="site-sky__wash"
          style={{
            filter: "var(--sky-filter)",
            transition: "filter 600ms ease",
          }}
        />

        {/* Layer 2: Optical Canvas (Solar Corona, Volumetric Clouds, Starfield, Moon, Weather) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
        />

        {/* Layer 3: Organic Horizon Diffusion */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              activePalette.isDark
                ? "linear-gradient(180deg, rgba(7,11,24,0) 0%, rgba(7,11,24,0) 48%, rgba(7,11,24,0.85) 82%, var(--page-bg) 100%)"
                : "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 52%, rgba(255,255,255,0.85) 86%, var(--page-bg) 100%)",
            transition: "background 500ms ease",
          }}
        />
      </div>

      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="sky-meta-control">
        <button
          className={`sky-meta-trigger ${isOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          title="Open atmosphere dial"
        >
          <span className="sky-meta-pulse" aria-hidden="true" />
          <span className="sr-only">Toggle atmosphere controls</span>
        </button>
      </div>

      {/* Glassmorphic Atmosphere Control Sheet */}
      <div className={`sky-meta-backdrop ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <section className="sky-meta-sheet" id="sky-meta-sheet">
          {/* Header */}
          <div className="sky-meta-sheet__header flex items-center justify-between">
            <div className="min-w-0">
              <h3 className="text-xl font-bold tracking-tight text-inherit leading-none truncate">
                {cityName}
              </h3>
              {weatherData.temperature !== undefined && (
                <p className="text-[13px] sm:text-sm font-semibold text-inherit/75 mt-1.5 leading-none truncate">
                  {weatherData.temperature}°C
                </p>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                className="sky-icon-button"
                type="button"
                onClick={resetToNow}
                title="Reset to current live time"
                aria-label="Reset to current live time"
              >
                <RefreshCw size={15} />
              </button>
              <button
                className="sky-icon-button"
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close sheet"
                aria-label="Close sheet"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Semicircular Interactive Arc Dial */}
          <div
            ref={dialRef}
            className="sky-time-dial my-1"
            onPointerDown={(e) => {
              handleDialPointer(e);
              const onMove = (moveEvent) => handleDialPointer(moveEvent);
              const onUp = () => {
                window.removeEventListener("pointermove", onMove);
                window.removeEventListener("pointerup", onUp);
              };
              window.addEventListener("pointermove", onMove);
              window.addEventListener("pointerup", onUp);
            }}
          >
            <svg viewBox="0 0 240 135" aria-hidden="true">
              <path
                d="M 24 125 A 96 96 0 0 1 216 125"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.12"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Increased interval markers along the arc */}
              <g fill="currentColor" fillOpacity="0.35">
                <circle cx="24" cy="125" r="3" />
                <circle cx="31.3" cy="88.3" r="2.5" />
                <circle cx="52.1" cy="57.1" r="2.8" />
                <circle cx="83.3" cy="36.3" r="2.5" />
                <circle cx="120" cy="29" r="3.5" />
                <circle cx="156.7" cy="36.3" r="2.5" />
                <circle cx="187.9" cy="57.1" r="2.8" />
                <circle cx="208.7" cy="88.3" r="2.5" />
                <circle cx="216" cy="125" r="3" />
              </g>
            </svg>

            <span
              className="sky-time-dial__handle"
              style={{
                left: `${handleX}px`,
                top: `${handleY}px`,
              }}
              aria-hidden="true"
            />
          </div>
        </section>
      </div>
    </>
  );
}
