import React, { useEffect, useRef, useState } from "react";

// --- CLEARWATER WebGL2 Engine (Ported from https://github.com/Aureliengmz/clearwater by Aurélien / Lumaris) ---
// MIT Licensed — Real-time, photoreal shallow water in WebGL2
// Enhanced with live Sanganer weather & time-of-day dynamic optical absorption & scattering

const N = 256, LOGN = 8;
const L = 4.6;               // patch size (m)
const DEPTH = 1.6;           // mean depth (m)
const TARGET_SLOPE = 0.042;  // RMS slope (soft gentle waves)
const RN = 256, RSIZE = 7.0; // local ripple simulation (m)
const G = 256, C = 1024;     // caustic grid and texture resolution
const VFOV = 64 * Math.PI / 180;
const IORS = [1.3315, 1.3335, 1.3365];

function mulberry(a) {
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function gauss(rnd) {
  let u = 0, v = 0;
  while (!u) u = rnd();
  v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Compute dynamic optical characteristics with physically-grounded water optics
// Uses continuous weather variables (cloud cover, wind speed, temperature, rain) for realism
function computeWaterWeatherPalette(timeOfDay = 14, weatherData = {}) {
  const code = weatherData.weatherCode ?? 0;
  const clouds = Math.min(100, Math.max(0, weatherData.cloudCover ?? 25));
  const wind = Math.min(60, Math.max(0, weatherData.windSpeed ?? 10));
  const rain = Math.max(0, weatherData.rain ?? 0);
  const temp = weatherData.temperature ?? 30;
  const isRain = rain > 0 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95;
  const isFog = code >= 45 && code <= 48;
  const isThunderstorm = code >= 95;

  // Normalized weather factors [0..1]
  const cloudF = clouds / 100;              // cloud cover fraction
  const windF = Math.min(wind / 35, 1);     // wind turbulence factor
  const rainF = Math.min(rain / 8, 1);      // rain intensity factor

  // Wind-driven turbidity: stronger wind suspends sediment from the sandy bottom
  // This makes water murkier and shifts from clear blue to cloudy green-grey
  const turbidity = 0.02 + windF * 0.12 + rainF * 0.15;

  // Temperature-driven dissolved organic matter: warmer water has slightly more
  // dissolved organics giving a faint green-yellow tint (tropical water vs arctic blue)
  const organicF = Math.max(0, (temp - 15) / 35) * 0.06;

  // --- Time-of-day sun position & base colors ---
  let sunAz = 0.08;
  let sunEl = 0.65;
  let sunColor = [1.0, 0.96, 0.88];
  let sunIntensity = 6.2;

  // Physical water absorption (m^-1): Pure water absorbs red >> green >> blue
  // Pope & Fry 1997 reference values scaled for shallow coastal/freshwater
  let sigA = [0.42, 0.065, 0.018];
  // Scattering (m^-1): Rayleigh molecular + suspended particles
  let sigS = [0.012, 0.028, 0.058];
  // Sky radiance colors
  let skyZen = [0.10, 0.30, 0.85];
  let skyHor = [0.52, 0.74, 0.97];
  let causIntensity = 1.2;
  let exposure = 0.62;

  // Smooth interpolation helper for time brackets
  const smoothT = (t, lo, hi) => {
    const x = Math.max(0, Math.min(1, (t - lo) / (hi - lo)));
    return x * x * (3 - 2 * x); // smoothstep
  };

  if (timeOfDay < 5.25 || timeOfDay >= 20.2) {
    // ═══ NIGHT: Moonlight on dark water ═══
    // Visible waves and luminous lunar reflections / white crest lines
    const moonProg = timeOfDay >= 20.2 ? (timeOfDay - 20.2) / 9.05 : (timeOfDay + 3.8) / 9.05;
    sunEl = (28 + Math.sin(moonProg * Math.PI) * 20) * Math.PI / 180;
    sunAz = (moonProg - 0.5) * Math.PI * 0.85;
    sunColor = [0.75, 0.88, 1.0]; // Luminous silvery moonlight
    sunIntensity = 3.2; // Bright enough for visible moonlit crest lines and reflections
    // Night water: deep obsidian background
    sigA = [0.48, 0.24, 0.08];
    sigS = [0.009, 0.016, 0.042];
    // Deep navy-black sky with faint blue wash
    skyZen = [0.010, 0.016, 0.065];
    skyHor = [0.026, 0.042, 0.12];
    causIntensity = 0.90; // Visible lunar caustics on the dark bottom
    exposure = 0.88;
  } else if (timeOfDay < 7.0) {
    // ═══ DAWN (5:25 - 7:00): Pre-sunrise glow to fresh daylight ═══
    // Water warms gently from nocturnal obsidian-blue to crisp morning cyan
    const prog = smoothT(timeOfDay, 5.25, 7.0);
    sunEl = (4 + prog * 22) * Math.PI / 180;
    sunAz = -0.52 + prog * 0.24;
    // Dawn sun warms from amber-gold to fresh morning light
    sunColor = [1.0, 0.72 + prog * 0.10, 0.45 + prog * 0.13];
    sunIntensity = 2.4 + prog * 2.6;
    // Physical water absorption: red absorbs heavily >> green >> blue
    sigA = [0.48 - prog * 0.08, 0.24 - prog * 0.165, 0.08 - prog * 0.060];
    sigS = [0.009 + prog * 0.004, 0.016 + prog * 0.014, 0.042 + prog * 0.020];
    // Sky transitions from deep night blue to early morning azure
    skyZen = [0.010 + prog * 0.11, 0.016 + prog * 0.304, 0.065 + prog * 0.715];
    skyHor = [0.026 + prog * 0.824, 0.042 + prog * 0.638, 0.12 + prog * 0.43];
    causIntensity = 0.90;
    exposure = 0.88 - prog * 0.22;
  } else if (timeOfDay < 8.5) {
    // ═══ EARLY MORNING (7:00 - 8:30): Fresh warm sunlight ═══
    const prog = smoothT(timeOfDay, 7.0, 8.5);
    sunEl = (26 + prog * 16) * Math.PI / 180;
    sunAz = -0.28 + prog * 0.18;
    sunColor = [1.0, 0.82 + prog * 0.10, 0.58 + prog * 0.22];
    sunIntensity = 5.0 + prog * 0.8;
    sigA = [0.40, 0.075 + prog * 0.01, 0.020];
    sigS = [0.013, 0.030, 0.062];
    skyZen = [0.12, 0.32 + prog * 0.04, 0.78 + prog * 0.07];
    skyHor = [0.85 - prog * 0.30, 0.68 - prog * 0.02, 0.55 + prog * 0.35];
    causIntensity = 0.90 + prog * 0.25;
    exposure = 0.66 - prog * 0.02;
  } else if (timeOfDay < 16.8) {
    // ═══ MIDDAY (8:30 - 16:48): Full daylight, clearest water ═══
    // Water at its most transparent blue under high sun
    const prog = (timeOfDay - 8.5) / 8.3;
    sunEl = (32 + Math.sin(prog * Math.PI) * 28) * Math.PI / 180;
    sunAz = (prog - 0.5) * 0.55;
    // Near-white midday sun
    sunColor = [1.0, 0.97, 0.91];
    sunIntensity = 6.5;
    // Pure water physical absorption — deep blue hue
    sigA = [0.42, 0.065, 0.018];
    sigS = [0.012, 0.028, 0.058];
    // Clean Rayleigh-scattering sky
    skyZen = [0.10, 0.30, 0.88];
    skyHor = [0.52, 0.74, 0.97];
    causIntensity = 0.48; // Soft, gentle aquatic dapples in daytime — no harsh white lines
    exposure = 0.62;
  } else if (timeOfDay < 18.2) {
    // ═══ GOLDEN HOUR (16:48 - 18:12): Warm amber sunlight over clear aquamarine water ═══
    // Low sun angle creates warm golden surface reflections while water depth remains a crystal-clear cyan/teal
    const prog = smoothT(timeOfDay, 16.8, 18.2);
    sunEl = (26 - prog * 14) * Math.PI / 180;
    sunAz = 0.22 + prog * 0.22;
    // Warm golden sunlight
    sunColor = [1.0, 0.97 - prog * 0.17, 0.91 - prog * 0.45];
    sunIntensity = 6.5 - prog * 1.3;
    // Physical water absorption: red absorbs heavily >> green >> blue
    sigA = [0.42, 0.065 + prog * 0.005, 0.018 + prog * 0.002];
    sigS = [0.012, 0.028, 0.058];
    // Overhead sky remains deep cobalt/azure blue
    skyZen = [0.10 - prog * 0.04, 0.30 - prog * 0.08, 0.88 - prog * 0.16];
    // Horizon warms to rich golden amber (balanced green and blue, never maroon)
    skyHor = [0.52 + prog * 0.38, 0.74 - prog * 0.08, 0.97 - prog * 0.55];
    causIntensity = 0.48 + prog * 0.32;
    exposure = 0.62 + prog * 0.03;
  } else if (timeOfDay < 19.3) {
    // ═══ SUNSET (18:12 - 19:18): Golden-coral sunset glints, tranquil deep teal water ═══
    // In real shallow water at sunset, water is deep clear turquoise/teal with warm golden highlights — never maroon
    const prog = smoothT(timeOfDay, 18.2, 19.3);
    sunEl = Math.max(0.04, (12 - prog * 10) * Math.PI / 180);
    sunAz = 0.44 + prog * 0.18;
    // Warm golden-amber sunset sun
    sunColor = [1.0, 0.80 - prog * 0.18, 0.46 - prog * 0.18];
    sunIntensity = 5.2 - prog * 2.0;
    // Water maintains natural physical absorption: red absorbed ~20x faster than blue
    sigA = [0.42 + prog * 0.04, 0.070 + prog * 0.010, 0.020 + prog * 0.005];
    sigS = [0.012 - prog * 0.002, 0.028 - prog * 0.004, 0.058 - prog * 0.006];
    // Overhead sky is deep twilight sapphire-blue (never magenta/maroon)
    skyZen = [0.06 - prog * 0.02, 0.22 - prog * 0.08, 0.72 - prog * 0.22];
    // Horizon is warm golden-peach sunset glow
    skyHor = [0.90 - prog * 0.22, 0.66 - prog * 0.24, 0.42 - prog * 0.08];
    causIntensity = 0.80 - prog * 0.35;
    exposure = 0.65 + prog * 0.06;
  } else {
    // ═══ DUSK (19:18 - 20:12): Twilight sapphire-navy water ═══
    const prog = smoothT(timeOfDay, 19.3, 20.2);
    sunEl = 0.06 - prog * 0.02;
    sunAz = 0.62 + prog * 0.10;
    // Twilight ambient light shifting to cool silvery tones
    sunColor = [1.0 - prog * 0.25, 0.62 + prog * 0.26, 0.28 + prog * 0.72];
    sunIntensity = 3.2;
    // Deepening nocturnal water optics
    sigA = [0.46 + prog * 0.02, 0.080 + prog * 0.160, 0.025 + prog * 0.055];
    sigS = [0.010 - prog * 0.001, 0.024 - prog * 0.008, 0.052 - prog * 0.010];
    skyZen = [0.04 - prog * 0.030, 0.14 - prog * 0.124, 0.50 - prog * 0.435];
    skyHor = [0.68 - prog * 0.654, 0.42 - prog * 0.378, 0.34 - prog * 0.220];
    causIntensity = 0.45 + prog * 0.45;
    exposure = 0.71 + prog * 0.17;
  }

  // ═══ CONTINUOUS WEATHER MODULATION ═══
  // These adjust the base time-of-day values using continuous weather variables

  // Cloud cover: reduces direct sun, diffuses sky colors, softens caustics
  // Partial clouds create dappled but still colorful water; full overcast goes steel-grey
  const cloudDim = 1 - cloudF * 0.72; // sun intensity reduction
  sunIntensity *= cloudDim;
  causIntensity *= (1 - cloudF * 0.78);
  // Overcast sky becomes more uniform grey — blend toward neutral grey
  const greyZen = [0.32, 0.36, 0.42];
  const greyHor = [0.48, 0.52, 0.56];
  const skyBlend = cloudF * cloudF; // quadratic — mild clouds barely affect sky color
  skyZen = skyZen.map((v, i) => v + (greyZen[i] - v) * skyBlend);
  skyHor = skyHor.map((v, i) => v + (greyHor[i] - v) * skyBlend);
  // Heavy cloud cover desaturates sun color toward neutral white-grey
  if (cloudF > 0.5) {
    const desat = (cloudF - 0.5) * 2; // 0..1 over 50-100% clouds
    const avgSun = (sunColor[0] + sunColor[1] + sunColor[2]) / 3;
    sunColor = sunColor.map(c => c + (avgSun - c) * desat * 0.6);
  }

  // Wind-driven turbidity: suspended particles increase scattering (murky water)
  // High wind → more Mie scattering (forward-peaked), slightly more absorption from sediment
  sigS = sigS.map(s => s + turbidity * 0.8);
  sigA = sigA.map((a, i) => a + turbidity * [0.08, 0.05, 0.02][i]);
  // Turbid water shifts from blue toward grey-green
  if (windF > 0.3) {
    const murkF = (windF - 0.3) / 0.7;
    sigA[2] += murkF * 0.04; // blue absorption increases (less blue)
    sigS[1] += murkF * 0.02; // green scattering increases (greenish tint)
  }

  // Temperature-driven organic tint
  sigA[0] -= organicF * 0.5; // slightly less red absorption (warmer tint)
  sigA[1] -= organicF * 0.3; // slightly less green absorption
  // Warm water absorbs a touch more blue from dissolved tannins
  sigA[2] += organicF * 0.15;

  // ═══ WEATHER OVERRIDES (severe conditions) ═══
  if (isRain) {
    // Rain: turbid runoff, suspended clay, dimpled surface kills specular
    // Water becomes murky olive-grey with poor visibility
    const intensity = isThunderstorm ? 1.0 : 0.6 + rainF * 0.4;
    sunColor = sunColor.map((c, i) => c + ([0.58, 0.62, 0.68][i] - c) * intensity * 0.7);
    sunIntensity = Math.min(sunIntensity, 2.5 - intensity * 1.0);
    // Heavy suspended sediment: much more scattering, moderate absorption
    sigA = sigA.map((a, i) => a + [0.06, 0.04, 0.02][i] * intensity);
    sigS = sigS.map((s, i) => s + [0.06, 0.08, 0.09][i] * intensity);
    // Uniform grey sky
    skyZen = skyZen.map((v, i) => v + ([0.25, 0.28, 0.33][i] - v) * intensity);
    skyHor = skyHor.map((v, i) => v + ([0.38, 0.42, 0.48][i] - v) * intensity);
    causIntensity *= (1 - intensity * 0.85);
    exposure = Math.min(exposure, 0.62);
  }

  if (isFog) {
    // Fog: extremely diffuse, milky water with high forward scattering
    // Everything blends toward a soft white-grey
    sunColor = [0.72, 0.75, 0.80];
    sunIntensity = Math.min(sunIntensity, 1.8);
    // High scattering makes water appear pale and milky
    sigS = sigS.map(s => Math.max(s, 0.065) + 0.03);
    sigA = sigA.map((a, i) => a * 0.7 + [0.08, 0.06, 0.04][i]);
    skyZen = [0.45, 0.48, 0.52];
    skyHor = [0.62, 0.65, 0.68];
    causIntensity *= 0.12;
    exposure = 0.60;
  }

  // Clamp all optical parameters to physically plausible ranges
  sigA = sigA.map(a => Math.max(0.005, Math.min(a, 0.8)));
  sigS = sigS.map(s => Math.max(0.004, Math.min(s, 0.25)));

  const sunV = [
    Math.sin(sunAz) * Math.cos(sunEl),
    Math.sin(sunEl),
    -Math.cos(sunAz) * Math.cos(sunEl)
  ];

  // ═══ WAVE INTENSITY: calm, natural shallow water ripples ═══
  // Natural water is glassy and serene, with pure physical Fresnel reflections and no artificial white lines
  let waveScale, waveSpeed, whiteLine = 0.0;
  if (timeOfDay < 5.25 || timeOfDay >= 20.2) {
    // Night: serene, calm lunar water
    waveScale = 0.38;
    waveSpeed = 0.42;
  } else if (timeOfDay < 7.0) {
    // Dawn: peaceful morning stillness
    const prog = smoothT(timeOfDay, 5.25, 7.0);
    waveScale = 0.38 - prog * 0.04;
    waveSpeed = 0.42 - prog * 0.02;
  } else if (timeOfDay < 8.5) {
    // Early morning: settling into soft daytime
    const prog = smoothT(timeOfDay, 7.0, 8.5);
    waveScale = 0.34;
    waveSpeed = 0.40;
  } else if (timeOfDay < 16.8) {
    // Midday: softest, calmest water with gentle glassy ripples
    waveScale = 0.34;
    waveSpeed = 0.40;
  } else if (timeOfDay < 18.2) {
    // Golden hour: tranquil golden water
    const prog = smoothT(timeOfDay, 16.8, 18.2);
    waveScale = 0.34 + prog * 0.03;
    waveSpeed = 0.40;
  } else if (timeOfDay < 19.3) {
    // Sunset: soft evening waves
    const prog = smoothT(timeOfDay, 18.2, 19.3);
    waveScale = 0.37 + prog * 0.02;
    waveSpeed = 0.40 + prog * 0.02;
  } else {
    // Dusk: gentle twilight ripples
    const prog = smoothT(timeOfDay, 19.3, 20.2);
    waveScale = 0.38;
    waveSpeed = 0.42;
  }

  // Wind amplifies waves at any time of day
  waveScale *= (1 + windF * 0.25);
  waveSpeed *= (1 + windF * 0.12);
  // Rain adds subtle choppiness
  if (isRain) {
    waveScale *= (1 + rainF * 0.20);
    waveSpeed *= (1 + rainF * 0.08);
  }

  return {
    sunV,
    sunColor: sunColor.map((c) => c * sunIntensity),
    sigA,
    sigS,
    skyZen,
    skyHor,
    causIntensity,
    exposure,
    isRain,
    waveScale,
    waveSpeed,
    whiteLine,
  };
}

const VS = `#version 300 es
layout(location=0) in vec2 p; out vec2 vUv;
void main(){ vUv = p*.5+.5; gl_Position = vec4(p,0.,1.); }`;

const HEAD = `#version 300 es
precision highp float; precision highp sampler2D; precision highp int;
in vec2 vUv; out vec4 o;
`;

export default function ClearwaterWater({ timeOfDay = 14, weatherData = {} }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isSupported, setIsSupported] = useState(true);

  // Store active weather optical parameters in a ref for zero-rebuild 60fps uniform modulation
  const paletteRef = useRef(computeWaterWeatherPalette(timeOfDay, weatherData));

  useEffect(() => {
    paletteRef.current = computeWaterWeatherPalette(timeOfDay, weatherData);
  }, [timeOfDay, weatherData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let gl;
    try {
      gl = canvas.getContext("webgl2", {
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      });
    } catch {
      setIsSupported(false);
      return;
    }

    if (!gl) {
      setIsSupported(false);
      return;
    }

    const extF32 = gl.getExtension("EXT_color_buffer_float");
    const extF16 = gl.getExtension("EXT_color_buffer_half_float");
    const extAniso = gl.getExtension("EXT_texture_filter_anisotropic");

    if (!extF32 && !extF16) {
      setIsSupported(false);
      return;
    }

    const FFT_FMT = extF32 ? gl.RGBA32F : gl.RGBA16F;

    // --- GL Helpers ---
    function sh(type, src, name) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(`[Clearwater] Shader "${name}" error:`, gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    }

    function prog(vs, fs, name) {
      const v = sh(gl.VERTEX_SHADER, vs, name + ".vs");
      const f = sh(gl.FRAGMENT_SHADER, fs, name + ".fs");
      if (!v || !f) return null;
      const p = gl.createProgram();
      gl.attachShader(p, v);
      gl.attachShader(p, f);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.warn(`[Clearwater] Link "${name}" error:`, gl.getProgramInfoLog(p));
        return null;
      }
      const u = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const info = gl.getActiveUniform(p, i);
        u[info.name.replace(/\[0\]$/, "")] = gl.getUniformLocation(p, info.name);
      }
      return { p, u, v, f };
    }

    function tex(w, h, fmt, { filter = gl.LINEAR, wrap = gl.CLAMP_TO_EDGE, mip = false, aniso = 0 } = {}) {
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      const levels = mip ? Math.floor(Math.log2(Math.max(w, h))) + 1 : 1;
      gl.texStorage2D(gl.TEXTURE_2D, levels, fmt, w, h);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mip ? gl.LINEAR_MIPMAP_LINEAR : filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
      if (aniso && extAniso) {
        gl.texParameterf(
          gl.TEXTURE_2D,
          extAniso.TEXTURE_MAX_ANISOTROPY_EXT,
          Math.min(aniso, gl.getParameter(extAniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT))
        );
      }
      return t;
    }

    function rt(w, h, fmt, opts) {
      const t = tex(w, h, fmt, opts);
      const fb = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      return { t, fb, w, h };
    }

    function bindT(unit, t) {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
    }

    function target(r) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, r ? r.fb : null);
      gl.viewport(0, 0, r ? r.w : canvas.width, r ? r.h : canvas.height);
    }

    // Fullscreen Triangle VAO
    const triVAO = gl.createVertexArray();
    const triBuf = gl.createBuffer();
    gl.bindVertexArray(triVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, triBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    function fullscreen() {
      gl.bindVertexArray(triVAO);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    // --- Ocean Spectrum (FFT) ---
    function buildH0() {
      const rnd = mulberry(7);
      const kp = (2 * Math.PI) / 0.62, kcut = (2 * Math.PI) / 0.045;
      const wd = [0.8, 0.6];
      const re = new Float32Array(N * N), im = new Float32Array(N * N);
      let s2 = 0;
      for (let m = 0; m < N; m++) {
        for (let n = 0; n < N; n++) {
          const nx = n < N / 2 ? n : n - N, nz = m < N / 2 ? m : m - N;
          const kx = (2 * Math.PI * nx) / L, kz = (2 * Math.PI * nz) / L, k = Math.hypot(kx, kz);
          let P = 0;
          if (k > 1e-6) {
            const lk = Math.log(k / kp);
            const bump = Math.exp(-0.5 * (lk / 0.36) ** 2);
            const tail = 0.035 * Math.exp(-((kp / k) ** 2)) * Math.exp(-((k / kcut) ** 2));
            const swell = 0.35 * Math.exp(-0.5 * (Math.log(k / ((2 * Math.PI) / 1.6)) / 0.3) ** 2);
            const c = (kx * wd[0] + kz * wd[1]) / k;
            const spread = (0.3 + 0.7 * c * c) * (c < 0 ? 0.35 : 1);
            P = (bump + tail + swell) * spread / (k * k * k * k);
          }
          const a = Math.sqrt(P / 2);
          const i = m * N + n;
          re[i] = gauss(rnd) * a;
          im[i] = gauss(rnd) * a;
          s2 += 2 * k * k * (re[i] * re[i] + im[i] * im[i]);
        }
      }
      const sc = TARGET_SLOPE / Math.sqrt(s2);
      const data = new Float32Array(N * N * 4);
      for (let m = 0; m < N; m++) {
        for (let n = 0; n < N; n++) {
          const i = m * N + n, j = ((N - m) % N) * N + ((N - n) % N);
          data[i * 4] = re[i] * sc;
          data[i * 4 + 1] = im[i] * sc;
          data[i * 4 + 2] = re[j] * sc;
          data[i * 4 + 3] = -im[j] * sc;
        }
      }
      const t = tex(N, N, gl.RGBA32F, { filter: gl.NEAREST, wrap: gl.REPEAT });
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, N, N, gl.RGBA, gl.FLOAT, data);
      return t;
    }

    const h0Tex = buildH0();
    const fftA = rt(N, N, FFT_FMT, { filter: gl.NEAREST, wrap: gl.REPEAT });
    const fftB = rt(N, N, FFT_FMT, { filter: gl.NEAREST, wrap: gl.REPEAT });
    const surfRT = rt(N, N, gl.RGBA16F, { wrap: gl.REPEAT, mip: true, aniso: 8 });

    const pSpec = prog(VS, HEAD + `
uniform sampler2D uH0; uniform float uT, uL;
vec2 cmul(vec2 a, vec2 b){ return vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x); }
void main(){
  ivec2 id = ivec2(gl_FragCoord.xy);
  vec4 s = texelFetch(uH0, id, 0);
  vec2 n = vec2(id); n -= step(${N / 2}.0, n) * ${N}.0;
  vec2 k = 6.28318530718*n/uL; float kl = length(k);
  float w = sqrt(9.81*kl + 7.4e-5*kl*kl*kl);
  float w0 = 6.28318530718/60.0; w = floor(w/w0)*w0;
  float c = cos(w*uT), sn = sin(w*uT);
  vec2 H = cmul(s.xy, vec2(c,sn)) + cmul(s.zw, vec2(c,-sn));
  vec2 C1 = H - k.x*H;
  vec2 C2 = vec2(-k.y*H.y, k.y*H.x);
  o = vec4(C1, C2);
}`, "spectrum");

    const pFFT = prog(VS, HEAD + `
uniform sampler2D uSrc; uniform int uP, uHoriz;
vec2 cmul(vec2 a, vec2 b){ return vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x); }
void main(){
  ivec2 id = ivec2(gl_FragCoord.xy);
  int j = uHoriz==1 ? id.x : id.y;
  int k = j & (uP-1);
  int i = ((j - (j & (2*uP-1))) >> 1) + k;
  bool y1 = (j & uP) != 0;
  ivec2 a = uHoriz==1 ? ivec2(i, id.y) : ivec2(id.x, i);
  ivec2 b = uHoriz==1 ? ivec2(i+${N / 2}, id.y) : ivec2(id.x, i+${N / 2});
  vec4 x0 = texelFetch(uSrc, a, 0), x1 = texelFetch(uSrc, b, 0);
  float ang = 3.14159265359*float(k)/float(uP);
  vec2 w = vec2(cos(ang), sin(ang));
  vec4 wx = vec4(cmul(w,x1.xy), cmul(w,x1.zw));
  o = y1 ? x0-wx : x0+wx;
}`, "fft");

    const pResolve = prog(VS, HEAD + `
uniform sampler2D uSrc;
void main(){
  vec4 s = texelFetch(uSrc, ivec2(gl_FragCoord.xy), 0);
  vec2 sl = vec2(s.y, s.z);
  o = vec4(s.x, sl, dot(sl,sl));
}`, "resolve");

    function runFFT(t) {
      gl.disable(gl.BLEND);
      target(fftA);
      gl.useProgram(pSpec.p);
      bindT(0, h0Tex);
      gl.uniform1i(pSpec.u.uH0, 0);
      gl.uniform1f(pSpec.u.uT, t);
      gl.uniform1f(pSpec.u.uL, L);
      fullscreen();

      gl.useProgram(pFFT.p);
      gl.uniform1i(pFFT.u.uSrc, 0);
      let src = fftA, dst = fftB;
      for (let horiz = 1; horiz >= 0; horiz--) {
        for (let s = 0; s < LOGN; s++) {
          target(dst);
          bindT(0, src.t);
          gl.uniform1i(pFFT.u.uP, 1 << s);
          gl.uniform1i(pFFT.u.uHoriz, horiz);
          fullscreen();
          [src, dst] = [dst, src];
        }
      }

      target(surfRT);
      gl.useProgram(pResolve.p);
      bindT(0, src.t);
      gl.uniform1i(pResolve.u.uSrc, 0);
      fullscreen();
      gl.bindTexture(gl.TEXTURE_2D, surfRT.t);
      gl.generateMipmap(gl.TEXTURE_2D);
    }

    // --- Interactive Ripples (Wave Equation) ---
    const rip = [0, 1].map(() => rt(RN, RN, gl.RGBA16F, { wrap: gl.CLAMP_TO_EDGE }));
    let ripIdx = 0, ripCenter = [0, 0];
    const pRipple = prog(VS, HEAD + `
uniform sampler2D uSrc; uniform vec2 uShift; uniform vec4 uDrop;
void main(){
  vec2 px = 1.0/vec2(textureSize(uSrc,0));
  vec2 uv = vUv + uShift;
  vec4 c = texture(uSrc, uv);
  float avg = 0.25*(texture(uSrc, uv+vec2(px.x,0)).r + texture(uSrc, uv-vec2(px.x,0)).r + texture(uSrc, uv+vec2(0,px.y)).r + texture(uSrc, uv-vec2(0,px.y)).r);
  float v = c.g + (avg - c.r)*0.9;
  v *= 0.9955;
  float h = c.r + v;
  h *= 0.9985;
  if (uDrop.w != 0.0){
    float d = length(vUv - uDrop.xy);
    float r = uDrop.z;
    if (d < r){
      float f = 0.5 + 0.5*cos(3.14159*d/r);
      h -= uDrop.w*f;
    }
  }
  vec2 e = min(vUv, 1.0-vUv);
  float edge = smoothstep(0.0, 0.06, min(e.x,e.y));
  h *= mix(0.9, 1.0, edge);
  v *= mix(0.9, 1.0, edge);
  if (uv.x<0.||uv.y<0.||uv.x>1.||uv.y>1.) { h=0.; v=0.; }
  o = vec4(h, v, 0, 1);
}`, "ripple");

    const pRipN = prog(VS, HEAD + `
uniform sampler2D uSrc; uniform float uTexel;
void main(){
  vec2 px = 1.0/vec2(textureSize(uSrc,0));
  float hx = texture(uSrc, vUv+vec2(px.x,0)).r - texture(uSrc, vUv-vec2(px.x,0)).r;
  float hz = texture(uSrc, vUv+vec2(0,px.y)).r - texture(uSrc, vUv-vec2(0,px.y)).r;
  float h = texture(uSrc,vUv).r;
  float lap = (texture(uSrc, vUv+vec2(px.x,0)).r + texture(uSrc, vUv-vec2(px.x,0)).r + texture(uSrc, vUv+vec2(0,px.y)).r + texture(uSrc, vUv-vec2(0,px.y)).r - 4.0*h)/(uTexel*uTexel);
  o = vec4(h, hx/(2.0*uTexel), hz/(2.0*uTexel), lap);
}`, "rippleNormals");

    const ripN = rt(RN, RN, gl.RGBA16F, { wrap: gl.CLAMP_TO_EDGE });
    gl.bindFramebuffer(gl.FRAMEBUFFER, rip[0].fb); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, rip[1].fb); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, ripN.fb); gl.clear(gl.COLOR_BUFFER_BIT);

    const drops = [];
    let ripActive = 0;

    function stepRipples(shiftUV) {
      gl.disable(gl.BLEND);
      gl.useProgram(pRipple.p);
      gl.uniform1i(pRipple.u.uSrc, 0);
      for (let s = 0; s < 1; s++) {
        const src = rip[ripIdx], dst = rip[1 - ripIdx];
        target(dst);
        bindT(0, src.t);
        gl.uniform2f(pRipple.u.uShift, s === 0 ? shiftUV[0] : 0, s === 0 ? shiftUV[1] : 0);
        const d = drops.shift();
        gl.uniform4f(pRipple.u.uDrop, d ? d[0] : 0, d ? d[1] : 0, d ? d[2] : 0, d ? d[3] : 0);
        fullscreen();
        ripIdx = 1 - ripIdx;
      }
      target(ripN);
      gl.useProgram(pRipN.p);
      bindT(0, rip[ripIdx].t);
      gl.uniform1i(pRipN.u.uSrc, 0);
      gl.uniform1f(pRipN.u.uTexel, RSIZE / RN);
      fullscreen();
    }

    // --- Caustics ---
    const causRT = rt(C, C, gl.RGBA16F, { wrap: gl.REPEAT, mip: true, aniso: 8 });
    const gridVAO = gl.createVertexArray();
    const gridVB = gl.createBuffer();
    const gridIB = gl.createBuffer();
    gl.bindVertexArray(gridVAO);
    {
      const v = new Float32Array((G + 1) * (G + 1) * 2);
      let o = 0;
      for (let j = 0; j <= G; j++) for (let i = 0; i <= G; i++) { v[o++] = i / G; v[o++] = j / G; }
      const idx = new Uint32Array(G * G * 6);
      o = 0;
      for (let j = 0; j < G; j++) {
        for (let i = 0; i < G; i++) {
          const a = j * (G + 1) + i, b = a + 1, c = a + G + 1, d = c + 1;
          idx[o++] = a; idx[o++] = b; idx[o++] = c;
          idx[o++] = b; idx[o++] = d; idx[o++] = c;
        }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, gridVB);
      gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gridIB);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    }
    gl.bindVertexArray(null);

    const pCaus = prog(
      `#version 300 es
precision highp float; precision highp sampler2D;
layout(location=0) in vec2 aUV;
uniform sampler2D uSurf; uniform float uL, uDepth, uIor; uniform vec3 uSun; uniform vec2 uShift;
out vec2 vSrc;
void main(){
  ivec2 off = ivec2(gl_InstanceID % 3 - 1, gl_InstanceID / 3 - 1);
  vec4 s = textureLod(uSurf, aUV, 0.0);
  vec3 n = normalize(vec3(-s.y, 1.0, -s.z));
  vec3 r = refract(-uSun, n, 1.0/uIor);
  vec3 P = vec3(aUV.x*uL, s.x, aUV.y*uL);
  vec3 F = P + r*((-uDepth - s.x)/r.y);
  vSrc = aUV*uL;
  vec2 c = (F.xz - uShift)/uL + vec2(off);
  gl_Position = vec4(c*2.0-1.0, 0.0, 1.0);
}`,
      `#version 300 es
precision highp float;
in vec2 vSrc; out vec4 o; uniform float uNorm;
void main(){
  vec2 a = dFdx(vSrc), b = dFdy(vSrc);
  float area = abs(a.x*b.y - a.y*b.x);
  float I = min(area*uNorm, 40.0);
  o = vec4(I);
}`,
      "caustics"
    );

    let causShift = [0, 0];
    function renderCaustics(sun) {
      target(causRT);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.useProgram(pCaus.p);
      bindT(0, surfRT.t);
      gl.uniform1i(pCaus.u.uSurf, 0);
      gl.uniform1f(pCaus.u.uL, L);
      gl.uniform1f(pCaus.u.uDepth, DEPTH);
      gl.uniform3fv(pCaus.u.uSun, sun);
      gl.uniform1f(pCaus.u.uNorm, (C / L) * (C / L));

      const sy = sun[1], sinI = Math.sqrt(1 - sy * sy), sinT = sinI / IORS[1], cosT = Math.sqrt(1 - sinT * sinT);
      const hd = Math.hypot(sun[0], sun[2]) || 1, tanT = sinT / cosT;
      causShift = [-sun[0] / hd * DEPTH * tanT, -sun[2] / hd * DEPTH * tanT];
      gl.uniform2fv(pCaus.u.uShift, causShift);
      gl.bindVertexArray(gridVAO);
      const masks = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]];
      for (let c = 0; c < 3; c++) {
        gl.colorMask(...masks[c]);
        gl.uniform1f(pCaus.u.uIor, IORS[c]);
        gl.drawElementsInstanced(gl.TRIANGLES, G * G * 6, gl.UNSIGNED_INT, 0, 9);
      }
      gl.colorMask(true, true, true, true);
      gl.disable(gl.BLEND);
      gl.bindTexture(gl.TEXTURE_2D, causRT.t);
      gl.generateMipmap(gl.TEXTURE_2D);
    }

    // --- Sandy Floor Texture (no pebble circles) ---
    const pebTex = tex(1024, 1024, gl.SRGB8_ALPHA8, { wrap: gl.REPEAT, mip: true, aniso: 16 });
    let pebReady = false;

    // Fill with a smooth sandy texture using subtle noise variation (no circular pebble shapes)
    {
      const rnd = mulberry(42);
      const fallbackData = new Uint8Array(1024 * 1024 * 4);
      for (let y = 0; y < 1024; y++) {
        for (let x = 0; x < 1024; x++) {
          const idx = (y * 1024 + x) * 4;
          // Smooth sandy base with subtle noise variation
          const noise = (rnd() - 0.5) * 18;
          const baseR = 148 + noise;
          const baseG = 138 + noise;
          const baseB = 120 + noise;
          fallbackData[idx] = Math.max(0, Math.min(255, Math.floor(baseR)));
          fallbackData[idx + 1] = Math.max(0, Math.min(255, Math.floor(baseG)));
          fallbackData[idx + 2] = Math.max(0, Math.min(255, Math.floor(baseB)));
          fallbackData[idx + 3] = 255;
        }
      }
      gl.bindTexture(gl.TEXTURE_2D, pebTex);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 1024, 1024, gl.RGBA, gl.UNSIGNED_BYTE, fallbackData);
      gl.generateMipmap(gl.TEXTURE_2D);
      pebReady = true;
    }

    // --- Weather-Synchronized Water Shader (Zero Landscape View - Pure Shallow Water Bed) ---
    const pMain = prog(VS, HEAD + `
uniform sampler2D uSurf, uCaus, uPeb, uRip;
uniform vec3 uCam, uR, uU, uF, uSun;
uniform vec3 uSunColor, uSigA, uSigS, uSkyZen, uSkyHor;
uniform float uTanF, uAspect, uL, uDepth, uTime, uRipSize, uCausIntensity, uWaveScale, uWhiteLine;
uniform vec2 uCausShift, uRipCenter;

const float IOR = 1.3335;
const float PI = 3.14159265359;

float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3, p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash12(i),hash12(i+vec2(1,0)),u.x), mix(hash12(i+vec2(0,1)),hash12(i+vec2(1,1)),u.x), u.y);
}
float fbm2(vec2 p){ float v=0., a=0.5; for(int i=0;i<4;i++){ v+=a*vnoise(p); p=p*2.03+17.1; a*=0.5; } return v; }

vec3 sky(vec3 d){
  float e = d.y;
  float mu = dot(d, uSun);
  vec3 c = mix(uSkyHor, uSkyZen, pow(clamp(e,0.,1.), 0.42));
  c += uSunColor * 0.12 * (0.22*pow(max(mu,0.),6.) + 0.30*pow(max(mu,0.),64.) + 1.6*pow(max(mu,0.),2400.));
  return c;
}

vec4 texBS(sampler2D t, vec2 uv){
  vec2 ts = vec2(textureSize(t,0)); vec2 p = uv*ts - 0.5; vec2 f = fract(p); p = floor(p);
  vec2 f2 = f*f, f3 = f2*f;
  vec2 w0 = (-f3 + 3.0*f2 - 3.0*f + 1.0)/6.0, w1 = (3.0*f3 - 6.0*f2 + 4.0)/6.0;
  vec2 w2 = (-3.0*f3 + 3.0*f2 + 3.0*f + 1.0)/6.0, w3 = f3/6.0;
  vec2 g0 = w0+w1, g1 = w2+w3; vec2 h0 = (w1/g0 - 0.5 + p)/ts, h1 = (w3/g1 + 1.5 + p)/ts;
  return (texture(t, vec2(h0.x,h0.y))*g0.x + texture(t, vec2(h1.x,h0.y))*g1.x)*g0.y
       + (texture(t, vec2(h0.x,h1.y))*g0.x + texture(t, vec2(h1.x,h1.y))*g1.x)*g1.y;
}

float floorDepth(vec2 xz){
  float shelf = 0.95 + 0.17*clamp(-xz.y + 1.5, 0.0, 14.0);
  return shelf + 0.30*(vnoise(xz*0.22)-0.5) + 0.10*(vnoise(xz*0.9+7.0)-0.5);
}

vec3 pebbles(vec2 x, float sc, out float hgt){
  vec2 uv = x / (vec2(0.78, 0.78)*sc);
  vec2 dx = dFdx(uv), dy = dFdy(uv);
  vec3 col = textureGrad(uPeb, uv, dx, dy).rgb;
  hgt = dot(col, vec3(0.3,0.55,0.15));
  return col;
}

float fresnel(float ci, float n){
  ci = clamp(ci, 0.0, 1.0);
  float st2 = (1.0-ci*ci)/(n*n); if (st2 >= 1.0) return 1.0;
  float ct = sqrt(1.0-st2);
  float rs = (ci - n*ct)/(ci + n*ct), rp = (n*ci - ct)/(n*ci + ct);
  return 0.5*(rs*rs + rp*rp);
}

void main(){
  vec2 ndc = vUv*2.0-1.0;
  vec3 rd = normalize(uF + ndc.x*uAspect*uTanF*uR + ndc.y*uTanF*uU);
  // Ensure rays are always cast downward into the water bed (NO looking up at landscape/sky)
  vec3 wd = rd; wd.y = min(wd.y, -0.06); wd = normalize(wd);

  vec3 SIG_T = uSigA + uSigS;

  float wS = uWaveScale;
  float t = -uCam.y / wd.y;
  vec2 xz; vec4 A; vec4 B; vec4 R;
  const mat2 M = mat2(0.8, -0.6, 0.6, 0.8);
  const float SC = 0.41, WB = 0.04;
  float hsum = 0.0;
  for (int i=0;i<3;i++){
    xz = uCam.xz + wd.xz*t;
    A = texture(uSurf, xz/uL);
    B = texture(uSurf, (M*xz)/(uL*SC) + 0.37);
    vec2 ruv = (xz - uRipCenter)/uRipSize + 0.5;
    R = texture(uRip, ruv);
    hsum = (A.x + WB*SC*B.x)*wS + R.x;
    t = (hsum - uCam.y) / wd.y;
  }
  vec3 P = uCam + wd*t;
  A = texBS(uSurf, P.xz/uL);
  B = texBS(uSurf, (M*P.xz)/(uL*SC) + 0.37);
  vec2 slope = (A.yz + WB*(transpose(M)*B.yz))*wS + R.yz;
  const mat2 M2 = mat2(0.28, 0.96, -0.96, 0.28);
  vec4 Cm = texture(uSurf, (M2*P.xz)/(uL*0.13) + 0.71);
  slope += 0.04*wS*exp(-t*0.18)*(transpose(M2)*Cm.yz);
  float var = (max(A.w - dot(A.yz,A.yz), 0.0) + WB*WB*max(B.w - dot(B.yz,B.yz), 0.0))*wS*wS;
  vec3 n = normalize(vec3(-slope.x, 1.0, -slope.y));
  float dist = t;

  vec3 v = -wd;
  float nv = dot(n, v);
  if (nv < 0.02) { n = normalize(n + v*(0.02-nv)); nv = dot(n,v); }
  float F = fresnel(nv, IOR);

  vec3 rr = reflect(wd, n); rr.y = abs(rr.y);
  vec3 refl = sky(rr) * 1.25;

  float a2 = 0.00012 + 1.2*var;
  vec3 h = normalize(v + uSun);
  float nh = max(dot(n,h),0.0), nl = max(dot(n,uSun),0.0);
  float c2 = max(nh*nh, 1e-4); float tan2 = (1.0-c2)/c2;
  float D = exp(-tan2/a2)/(PI*a2*c2*c2);
  float Vis = 0.5/(nl*sqrt(nv*nv*(1.0-a2)+a2) + nv*sqrt(nl*nl*(1.0-a2)+a2) + 1e-5);
  float Fh = fresnel(max(dot(h,v),0.0), IOR);
  float maxSpec = 260.0;
  vec3 spec = uSunColor * min(D*Vis*Fh*nl, maxSpec);

  vec3 tr = refract(wd, n, 1.0/IOR);
  float fy = -floorDepth(P.xz);
  float s = (fy - P.y)/tr.y; vec3 FP = P + tr*s;
  for (int i=0;i<2;i++){ fy = -floorDepth(FP.xz); s = (fy - P.y)/tr.y; FP = P + tr*s; }
  s = max(s, 0.0);

  float hgt;
  vec3 pf = pebbles(FP.xz, 1.0, hgt);
  float zone = fbm2(FP.xz*0.16 + 3.0);
  // Gentle organic sand ripple waves (wide and natural, not rigid stripes)
  float sandRipples = sin(dot(FP.xz, vec2(0.86, 0.51))*3.2 + 2.5*vnoise(FP.xz*0.6));
  float sandTexture = 0.93 + 0.12*vnoise(FP.xz*28.0) + 0.05*sandRipples;
  vec3 sand = vec3(0.58, 0.54, 0.46) * sandTexture;
  sand = sand*sand*1.3;
  vec3 alb = mix(pf * 0.65, sand, 0.72);
  hgt = 0.40 + 0.03*sandRipples;
  alb.g = min(alb.g, max(alb.r, alb.b));
  float big = vnoise(FP.xz*0.45) * 0.65 + vnoise(FP.xz*1.3+3.1) * 0.35;
  alb *= mix(0.84, 1.16, big);
  alb = mix(vec3(0.28, 0.28, 0.30), pow(alb, vec3(1.12)), 0.80) * 0.72;

  vec3 sunT = refract(-uSun, vec3(0,1,0), 1.0/IOR);
  float Ts = 1.0 - fresnel(uSun.y, IOR);
  float depthHere = max(P.y - FP.y, 0.0);
  vec2 cuv = (FP.xz - uCausShift + sunT.xz/(-sunT.y)*(hgt-0.35)*0.04)/uL;
  vec3 cDef = texture(uCaus, cuv, 1.6).rgb;
  vec3 cSoft = texture(uCaus, cuv, 2.8).rgb;
  // Gracefully compressed dancing caustics — fluid, alive and glowing softly (never harsh or laser-like)
  vec3 rawCaus = mix(cSoft, cDef, 0.38);
  vec3 causDynamic = (rawCaus / (1.0 + rawCaus * 0.42)) * 1.45;
  vec3 caus = mix(vec3(0.85), causDynamic, clamp(uCausIntensity * 0.70, 0.25, 0.85));

  float ao = mix(0.90, 1.0, smoothstep(0.36, 0.44, hgt));
  vec3 Esun = uSunColor * Ts * exp(-SIG_T*depthHere/(-sunT.y)) * caus * (-sunT.y) * ao;
  vec3 skyIrr = uSkyHor * PI * 0.22;
  vec3 Esky = skyIrr * exp(-(uSigA + 0.4*uSigS)*depthHere*1.25) * ao;
  vec3 Lfloor = alb/PI * (Esun + Esky);

  vec3 Tv = exp(-SIG_T*s);
  float cosS = dot(sunT, -tr);
  float g = 0.8; float ph = (1.0-g*g)/(4.0*PI*pow(1.0+g*g-2.0*g*cosS, 1.5));
  vec3 Lmid = uSunColor*Ts*exp(-SIG_T*depthHere*0.5/(-sunT.y))*(ph+0.02) + skyIrr*exp(-uSigA*depthHere*0.6)/(4.0*PI);
  vec3 Lin = uSigS/SIG_T * Lmid * (1.0 - Tv) * 3.0;
  vec3 under = Lfloor*Tv + Lin;

  // Pure photoreal shallow water (Fresnel sky reflection + seabed refraction + specular glints)
  vec3 col = F*refl + (1.0-F)*under + spec;

  // Subtle, delicate sun glints on the tips of wave crests (soft kiss of light, never thick white lines)
  float crestPeak = smoothstep(0.016, 0.052, hsum) * smoothstep(0.022, 0.070, length(slope));
  vec3 sunTint = uSunColor / max(max(uSunColor.r, max(uSunColor.g, uSunColor.b)), 1e-4);
  vec3 glintCol = mix(vec3(0.95, 0.98, 1.0), sunTint, 0.20);
  col += glintCol * (crestPeak * 0.32);

  float haze = 1.0 - exp(-dist*0.004);
  float muh = max(dot(normalize(vec3(wd.x,0.0,wd.z)), uSun), 0.0);
  vec3 hazeC = uSkyHor*0.95 + uSunColor*0.06*(0.22*pow(muh,6.0)+0.3*pow(muh,64.0));
  col = mix(col, hazeC, haze*0.7);

  o = vec4(max(col, 0.0), 1.0);
}`, "water");

    // --- Post Processing Shaders ---
    const pBright = prog(VS, HEAD + `
uniform sampler2D uSrc; uniform float uThr;
void main(){
  vec2 px = 1.0/vec2(textureSize(uSrc,0));
  vec3 c = vec3(0);
  for (int y=-1;y<=2;y++) for (int x=-1;x<=2;x++) c += texture(uSrc, vUv + (vec2(x,y)-0.5)*px*1.0).rgb;
  c /= 16.0;
  float l = max(max(c.r,c.g),c.b);
  float k = max(l - uThr, 0.0) / max(l, 1e-4);
  o = vec4(min(c*k, vec3(160.0)), 1);
}`, "bright");

    const pBlur = prog(VS, HEAD + `
uniform sampler2D uSrc; uniform vec2 uDir;
void main(){
  vec2 px = uDir/vec2(textureSize(uSrc,0));
  vec3 c = texture(uSrc, vUv).rgb*0.2270270270;
  c += (texture(uSrc, vUv+px*1.3846153846).rgb + texture(uSrc, vUv-px*1.3846153846).rgb)*0.3162162162;
  c += (texture(uSrc, vUv+px*3.2307692308).rgb + texture(uSrc, vUv-px*3.2307692308).rgb)*0.0702702703;
  o = vec4(c,1);
}`, "blur");

    const pCopy = prog(VS, HEAD + `uniform sampler2D uSrc; uniform float uK; void main(){ o = vec4(texture(uSrc,vUv).rgb*uK,1); }`, "copy");

    const pFinal = prog(VS, HEAD + `
uniform sampler2D uHdr, uStreak, uB1, uB2; uniform float uExp, uTime, uNoPost; uniform vec2 uRes;
vec3 bicubic(sampler2D t, vec2 uv){
  vec2 ts = vec2(textureSize(t,0)); vec2 p = uv*ts - 0.5; vec2 f = fract(p); p = floor(p);
  vec2 f2 = f*f, f3 = f2*f;
  vec2 w0 = f*(-0.5+f*(1.0-0.5*f)), w1 = 1.0+f*f*(-2.5+1.5*f), w2 = f*(0.5+f*(2.0-1.5*f)), w3 = f*f*(-0.5+0.5*f);
  vec2 g0 = w0+w1, g1 = w2+w3; vec2 h0 = (w1/g0 - 0.5 + p)/ts, h1 = (w3/g1 + 1.5 + p)/ts;
  return (texture(t, vec2(h0.x,h0.y)).rgb*g0.x + texture(t, vec2(h1.x,h0.y)).rgb*g1.x)*g0.y + (texture(t, vec2(h0.x,h1.y)).rgb*g0.x + texture(t, vec2(h1.x,h1.y)).rgb*g1.x)*g1.y;
}
vec3 aces(vec3 x){ const float a=2.51,b=0.03,c=2.43,d=0.59,e=0.14; return clamp((x*(a*x+b))/(x*(c*x+d)+e),0.,1.); }
float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3, p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
void main(){
  vec2 uv = vUv;
  vec2 cc = uv-0.5; float ca = 0.0012*dot(cc,cc)*4.0;
  vec3 c;
  c.r = texture(uHdr, uv + cc*ca).r; c.g = texture(uHdr, uv).g; c.b = texture(uHdr, uv - cc*ca).b;
  c += texture(uB1, uv).rgb * 0.035 + bicubic(uB2, uv) * 0.035;
  c *= uExp;
  float vig = 1.0 - 0.22*dot(cc*vec2(1.0,0.8), cc*vec2(1.0,0.8))*2.2;
  c *= vig;
  c = aces(c);
  float lum = dot(c, vec3(0.2126,0.7152,0.0722));
  c = mix(vec3(lum), c, 0.90);
  c = mix(c, c*vec3(0.96,1.0,1.05), 1.0 - smoothstep(0.0, 0.35, lum));
  c = pow(c, vec3(1.0/2.2));
  o = vec4(c, 1);
}`, "final");

    // Dynamic resolution RT buffers
    let W = 0, H = 0;
    let hdrRT, qA, qB, b1, b2, b2t, streakRT;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let quality = DPR > 1.5 ? 0.78 : 0.95;

    function alloc() {
      const rect = container.getBoundingClientRect();
      const cw = Math.max(1, Math.round(rect.width * DPR * quality));
      const ch = Math.max(1, Math.round(rect.height * DPR * quality));
      if (cw === W && ch === H) return;
      W = cw;
      H = ch;
      canvas.width = W;
      canvas.height = H;

      for (const r of [hdrRT, qA, qB, b1, b2, b2t, streakRT]) {
        if (r) {
          gl.deleteTexture(r.t);
          gl.deleteFramebuffer(r.fb);
        }
      }

      hdrRT = rt(W, H, gl.RGBA16F);
      const qw = Math.max(1, W >> 1), qh = Math.max(1, H >> 1);
      qA = rt(qw, qh, gl.RGBA16F);
      qB = rt(qw, qh, gl.RGBA16F);
      b1 = rt(qw, qh, gl.RGBA16F);
      b2 = rt(Math.max(1, qw >> 2), Math.max(1, qh >> 2), gl.RGBA16F);
      b2t = rt(b2.w, b2.h, gl.RGBA16F);

      streakRT = rt(4, 4, gl.RGBA16F);
      gl.bindFramebuffer(gl.FRAMEBUFFER, streakRT.fb);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    alloc();

    function post(t, exposure) {
      gl.disable(gl.BLEND);
      gl.useProgram(pBright.p);
      bindT(0, hdrRT.t);
      gl.uniform1i(pBright.u.uSrc, 0);
      target(qA);
      gl.uniform1f(pBright.u.uThr, 2.5);
      fullscreen();

      gl.useProgram(pBlur.p);
      gl.uniform1i(pBlur.u.uSrc, 0);
      target(qB);
      bindT(0, qA.t);
      gl.uniform2f(pBlur.u.uDir, 1, 0);
      fullscreen();

      target(b1);
      bindT(0, qB.t);
      gl.uniform2f(pBlur.u.uDir, 0, 1);
      fullscreen();

      gl.useProgram(pCopy.p);
      target(b2);
      bindT(0, b1.t);
      gl.uniform1i(pCopy.u.uSrc, 0);
      gl.uniform1f(pCopy.u.uK, 1.0);
      fullscreen();

      gl.useProgram(pBlur.p);
      for (let i = 0; i < 2; i++) {
        target(b2t);
        bindT(0, b2.t);
        gl.uniform2f(pBlur.u.uDir, 1.5, 0);
        fullscreen();
        target(b2);
        bindT(0, b2t.t);
        gl.uniform2f(pBlur.u.uDir, 0, 1.5);
        fullscreen();
      }

      target(null);
      gl.useProgram(pFinal.p);
      bindT(0, hdrRT.t);
      bindT(1, streakRT.t);
      bindT(2, b1.t);
      bindT(3, b2.t);
      gl.uniform1i(pFinal.u.uHdr, 0);
      gl.uniform1i(pFinal.u.uStreak, 1);
      gl.uniform1i(pFinal.u.uB1, 2);
      gl.uniform1i(pFinal.u.uB2, 3);
      gl.uniform1f(pFinal.u.uExp, exposure);
      gl.uniform1f(pFinal.u.uNoPost, 0);
      gl.uniform1f(pFinal.u.uTime, t);
      gl.uniform2f(pFinal.u.uRes, W, H);
      fullscreen();
    }

    // --- Camera Strictly Locked Downward (NO Landscape Viewing) ---
    // Fixed downward pitch (-0.76 rad) ensures view is 100% focused on water, caustics & pebbles
    const cam = { yaw: 0, pitch: -0.76, vy: 0, h: 1.55 };
    let drag = null;
    let lastTap = null;
    let lastMoveDropTime = 0;

    function camBasis(t) {
      const yaw = cam.yaw + (0.005 * Math.sin(t * 0.25));
      const pit = -0.76; // Strictly locked downwards into the water
      const roll = 0.003 * Math.sin(t * 0.35);
      const f = [Math.sin(yaw) * Math.cos(pit), Math.sin(pit), -Math.cos(yaw) * Math.cos(pit)];
      let r = [Math.cos(yaw), 0, Math.sin(yaw)];
      let u = [r[1] * f[2] - r[2] * f[1], r[2] * f[0] - r[0] * f[2], r[0] * f[1] - r[1] * f[0]];
      const cr = Math.cos(roll), sr = Math.sin(roll);
      const r2 = r.map((x, i) => x * cr + u[i] * sr),
            u2 = u.map((x, i) => u[i] * cr - r[i] * sr);
      const pos = [0.02 * Math.sin(t * 0.21), cam.h + 0.012 * Math.sin(t * 0.57), 0.02 * Math.cos(t * 0.17)];
      return { f, r: r2, u: u2, pos };
    }

    function tapToDrop(sx, sy, B, strength = 0.075) {
      const rect = canvas.getBoundingClientRect();
      const nx = ((sx - rect.left) / rect.width) * 2 - 1;
      const ny = 1 - ((sy - rect.top) / rect.height) * 2;
      const tf = Math.tan(VFOV / 2), asp = rect.width / rect.height;
      const d = [0, 1, 2].map(i => B.f[i] + nx * asp * tf * B.r[i] + ny * tf * B.u[i]);
      if (d[1] >= -0.01) return;
      const t = -B.pos[1] / d[1];
      const px = B.pos[0] + d[0] * t, pz = B.pos[2] + d[2] * t;
      const u = (px - ripCenter[0]) / RSIZE + 0.5, v = (pz - ripCenter[1]) / RSIZE + 0.5;
      if (u < 0.02 || u > 0.98 || v < 0.02 || v > 0.98) return;
      drops.push([u, v, 0.024, strength]);
      ripActive = 0;
    }

    const onPointerDown = (e) => {
      canvas.setPointerCapture(e.pointerId);
      drag = {
        x: e.clientX,
        y: e.clientY,
        x0: e.clientX,
        y0: e.clientY,
        t: performance.now(),
      };
      // Drop ripple splash at cursor location
      const B = camBasis(performance.now() / 1000);
      tapToDrop(e.clientX, e.clientY, B, 0.09);
    };

    const onPointerMove = (e) => {
      const now = performance.now();
      if (drag) {
        const rect = canvas.getBoundingClientRect();
        const k = 0.45 / Math.min(rect.width, rect.height);
        const dx = (e.clientX - drag.x) * k;
        cam.yaw -= dx * 0.35; // Gentle subtle yaw rotation only, NO vertical pitch/tilt
        drag.x = e.clientX;
        drag.y = e.clientY;

        // Stir continuous ripples while dragging over water
        if (now - lastMoveDropTime > 45) {
          const B = camBasis(now / 1000);
          tapToDrop(e.clientX, e.clientY, B, 0.05);
          lastMoveDropTime = now;
        }
      } else {
        // Natural gentle ripples trailing cursor on hover
        if (now - lastMoveDropTime > 90) {
          const B = camBasis(now / 1000);
          tapToDrop(e.clientX, e.clientY, B, 0.028);
          lastMoveDropTime = now;
        }
      }
    };

    const onPointerUp = (e) => {
      if (drag && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 8 && performance.now() - drag.t < 350) {
        lastTap = [e.clientX, e.clientY];
      }
      drag = null;
    };

    const onPointerCancel = () => {
      drag = null;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);

    // Resize Observer
    const ro = new ResizeObserver(() => {
      alloc();
    });
    ro.observe(container);

    // Intersection Observer: Pause WebGL loop when footer is offscreen to conserve GPU/battery
    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Initial soft starter ripples
    setTimeout(() => {
      drops.push([0.5, 0.5, 0.03, 0.08]);
      ripActive = 0;
    }, 400);

    // --- Main Render Loop ---
    let animId;
    let last = performance.now();
    let tSim = 0;
    let currentPalette = null;

    function lerpVec3(a, b, k) {
      return [
        a[0] + (b[0] - a[0]) * k,
        a[1] + (b[1] - a[1]) * k,
        a[2] + (b[2] - a[2]) * k,
      ];
    }

    function frame(now) {
      animId = requestAnimationFrame(frame);
      if (!isVisible) return;

      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      tSim += dt;
      const t = tSim;

      if (!drag) {
        cam.yaw += cam.vy * 0.9;
        cam.vy *= 0.9;
      }

      if (!pebReady) return;

      if (!currentPalette) {
        currentPalette = { ...paletteRef.current };
      } else {
        const tgt = paletteRef.current;
        const k = 0.08;
        currentPalette = {
          sunV: lerpVec3(currentPalette.sunV, tgt.sunV, k),
          sunColor: lerpVec3(currentPalette.sunColor, tgt.sunColor, k),
          sigA: lerpVec3(currentPalette.sigA, tgt.sigA, k),
          sigS: lerpVec3(currentPalette.sigS, tgt.sigS, k),
          skyZen: lerpVec3(currentPalette.skyZen, tgt.skyZen, k),
          skyHor: lerpVec3(currentPalette.skyHor, tgt.skyHor, k),
          causIntensity: currentPalette.causIntensity + (tgt.causIntensity - currentPalette.causIntensity) * k,
          exposure: currentPalette.exposure + (tgt.exposure - currentPalette.exposure) * k,
          waveScale: currentPalette.waveScale + (tgt.waveScale - currentPalette.waveScale) * k,
          waveSpeed: currentPalette.waveSpeed + (tgt.waveSpeed - currentPalette.waveSpeed) * k,
          whiteLine: currentPalette.whiteLine + (tgt.whiteLine - currentPalette.whiteLine) * k,
          isRain: tgt.isRain,
        };
      }
      const palette = currentPalette;
      const B = camBasis(t);

      runFFT(t * palette.waveSpeed);

      // Keep ripple window centered under view
      const look = -B.pos[1] / Math.min(B.f[1], -0.2);
      const want = [B.pos[0] + B.f[0] * look * 0.9, B.pos[2] + B.f[2] * look * 0.9];
      const tx = RSIZE / RN;
      const dxT = Math.round((want[0] - ripCenter[0]) / tx);
      const dzT = Math.round((want[1] - ripCenter[1]) / tx);

      if (lastTap) {
        tapToDrop(lastTap[0], lastTap[1], B, 0.09);
        lastTap = null;
      }

      // Rain droplets creating water surface ripples during rain
      if (palette.isRain && Math.random() < 0.22) {
        const rect = canvas.getBoundingClientRect();
        const rx = rect.left + Math.random() * rect.width;
        const ry = rect.top + Math.random() * rect.height;
        tapToDrop(rx, ry, B, 0.035 + Math.random() * 0.035);
      }

      if (ripActive < 900) {
        stepRipples([dxT / RN, dzT / RN]);
        ripCenter = [ripCenter[0] + dxT * tx, ripCenter[1] + dzT * tx];
        ripActive++;
      } else {
        ripCenter = [ripCenter[0] + dxT * tx, ripCenter[1] + dzT * tx];
      }

      renderCaustics(palette.sunV);

      target(hdrRT);
      gl.disable(gl.BLEND);
      gl.useProgram(pMain.p);
      bindT(0, surfRT.t);
      bindT(1, causRT.t);
      bindT(2, pebTex);
      bindT(3, ripN.t);

      const u = pMain.u;
      gl.uniform1i(u.uSurf, 0);
      gl.uniform1i(u.uCaus, 1);
      gl.uniform1i(u.uPeb, 2);
      gl.uniform1i(u.uRip, 3);
      gl.uniform3fv(u.uCam, B.pos);
      gl.uniform3fv(u.uR, B.r);
      gl.uniform3fv(u.uU, B.u);
      gl.uniform3fv(u.uF, B.f);
      gl.uniform3fv(u.uSun, palette.sunV);
      gl.uniform3fv(u.uSunColor, palette.sunColor);
      gl.uniform3fv(u.uSigA, palette.sigA);
      gl.uniform3fv(u.uSigS, palette.sigS);
      gl.uniform3fv(u.uSkyZen, palette.skyZen);
      gl.uniform3fv(u.uSkyHor, palette.skyHor);
      gl.uniform1f(u.uCausIntensity, palette.causIntensity);
      gl.uniform1f(u.uWaveScale, palette.waveScale);
      gl.uniform1f(u.uWhiteLine, palette.whiteLine);
      gl.uniform1f(u.uTanF, Math.tan(VFOV / 2));
      gl.uniform1f(u.uAspect, W / H);
      gl.uniform1f(u.uL, L);
      gl.uniform1f(u.uDepth, DEPTH);
      gl.uniform1f(u.uTime, t);
      gl.uniform1f(u.uRipSize, RSIZE);
      gl.uniform2fv(u.uRipCenter, ripCenter);
      gl.uniform2fv(u.uCausShift, causShift);
      fullscreen();

      post(t, palette.exposure);
    }

    animId = requestAnimationFrame(frame);

    // --- Cleanup on unmount ---
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);

      const deleteRT = (r) => {
        if (!r) return;
        if (r.t) gl.deleteTexture(r.t);
        if (r.fb) gl.deleteFramebuffer(r.fb);
      };

      deleteRT(fftA);
      deleteRT(fftB);
      deleteRT(surfRT);
      deleteRT(rip[0]);
      deleteRT(rip[1]);
      deleteRT(ripN);
      deleteRT(causRT);
      deleteRT(hdrRT);
      deleteRT(qA);
      deleteRT(qB);
      deleteRT(b1);
      deleteRT(b2);
      deleteRT(b2t);
      deleteRT(streakRT);

      gl.deleteTexture(h0Tex);
      gl.deleteTexture(pebTex);

      gl.deleteVertexArray(triVAO);
      gl.deleteBuffer(triBuf);
      gl.deleteVertexArray(gridVAO);
      gl.deleteBuffer(gridVB);
      gl.deleteBuffer(gridIB);

      const deleteProg = (prg) => {
        if (!prg) return;
        if (prg.v) gl.deleteShader(prg.v);
        if (prg.f) gl.deleteShader(prg.f);
        if (prg.p) gl.deleteProgram(prg.p);
      };

      deleteProg(pSpec);
      deleteProg(pFFT);
      deleteProg(pResolve);
      deleteProg(pRipple);
      deleteProg(pRipN);
      deleteProg(pCaus);
      deleteProg(pMain);
      deleteProg(pBright);
      deleteProg(pBlur);
      deleteProg(pCopy);
      deleteProg(pFinal);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="clearwater-footer relative w-full h-[460px] sm:h-[540px] overflow-hidden select-none touch-none cursor-pointer"
      aria-label="Clearwater real-time shallow water footer"
    >
      {/* Fallback for unsupported devices */}
      {!isSupported ? (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 via-sky-600/40 to-slate-900 flex items-center justify-center p-6 text-center text-sm font-medium">
          <p>WebGL2 shallow-water simulation requires hardware acceleration.</p>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />
      )}

      {/* Top Vignette / Atmospheric Gradient Melt from page background */}
      <div
        className="absolute inset-x-0 top-0 h-32 sm:h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--page-bg) 0%, color-mix(in srgb, var(--page-bg) 75%, transparent) 40%, transparent 100%)",
        }}
      />

      {/* Bottom Subtle Depth Fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, rgba(7, 18, 24, 0.45) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
