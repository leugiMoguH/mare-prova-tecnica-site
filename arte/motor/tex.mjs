// Texturas procedurais (canvas). Tudo desenhado por código, sem imagens de terceiros.
const canvas = (w, h) => Object.assign(document.createElement('canvas'), { width: w, height: h });
function tex(THREE, c, rep, srgb = true) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  if (rep) t.repeat.set(rep[0], rep[1]);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const rnd = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

// Calçada portuguesa: pedras claras e escuras em ondas.
export function calcada(THREE, a, b, linha, rep) {
  const c = canvas(512, 512), g = c.getContext('2d');
  g.fillStyle = linha; g.fillRect(0, 0, 512, 512);
  const r = rnd(7), n = 32, s = 512 / n;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const claro = Math.floor((y + 2.4 * Math.sin((x * Math.PI) / 4)) / 3) % 2 === 0;
    g.fillStyle = claro ? a : b;
    g.fillRect(x * s + 1, y * s + 1, s - 2, s - 2);
    g.fillStyle = `rgba(0,0,0,${0.02 + r() * 0.06})`;
    g.fillRect(x * s + 1, y * s + 1, s - 2, s - 2);
  }
  return tex(THREE, c, rep);
}

export function tijolo(THREE, base, junta, variacao, rep) {
  const c = canvas(512, 256), g = c.getContext('2d');
  g.fillStyle = junta; g.fillRect(0, 0, 512, 256);
  const r = rnd(11);
  const bw = 64, bh = 32;
  for (let y = 0; y < 8; y++) for (let x = -1; x < 9; x++) {
    const off = y % 2 ? bw / 2 : 0;
    const v = (r() - 0.5) * variacao;
    g.fillStyle = shade(base, v);
    g.fillRect(x * bw + off + 2, y * bh + 2, bw - 4, bh - 4);
  }
  return tex(THREE, c, rep);
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.max(0, Math.min(255, Math.round(v + amt * 255)));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

// Azulejo: grelha de ladrilhos com rosácea azul e branca.
export function azulejo(THREE, azul, branco, rep, rot = false) {
  const c = canvas(256, 256), g = c.getContext('2d');
  g.fillStyle = branco; g.fillRect(0, 0, 256, 256);
  for (let ty = 0; ty < 2; ty++) for (let tx = 0; tx < 2; tx++) {
    const cx = tx * 128 + 64, cy = ty * 128 + 64;
    g.save(); g.translate(cx, cy);
    g.fillStyle = azul;
    for (let i = 0; i < 4; i++) {
      g.rotate(Math.PI / 2);
      g.beginPath(); g.ellipse(0, -30, 14, 30, 0, 0, Math.PI * 2); g.fill();
      g.beginPath(); g.arc(34, -34, 9, 0, Math.PI * 2); g.fill();
    }
    g.beginPath(); g.arc(0, 0, 11, 0, Math.PI * 2); g.fill();
    g.fillStyle = branco; g.beginPath(); g.arc(0, 0, 5, 0, Math.PI * 2); g.fill();
    g.restore();
    g.strokeStyle = azul; g.lineWidth = 3; g.strokeRect(tx * 128 + 2, ty * 128 + 2, 124, 124);
  }
  return tex(THREE, c, rep);
}

export function tabuas(THREE, base, linha, rep) {
  const c = canvas(256, 256), g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, 256, 256);
  const r = rnd(5);
  for (let i = 0; i < 6; i++) {
    g.fillStyle = `rgba(0,0,0,${r() * 0.08})`; g.fillRect(0, i * 42, 256, 42);
    g.strokeStyle = linha; g.lineWidth = 3; g.beginPath(); g.moveTo(0, i * 42); g.lineTo(256, i * 42); g.stroke();
  }
  return tex(THREE, c, rep);
}

// Degradê vertical para céu.
export function ceu(THREE, paradas, estrelas = 0) {
  const c = canvas(8, 512), g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 512);
  paradas.forEach(([p, col]) => gr.addColorStop(p, col));
  g.fillStyle = gr; g.fillRect(0, 0, 8, 512);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function halo(THREE, cor) {
  const c = canvas(128, 128), g = c.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, cor); gr.addColorStop(0.25, cor.replace(/[\d.]+\)$/, '0.55)')); gr.addColorStop(1, cor.replace(/[\d.]+\)$/, '0)'));
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function letreiro(THREE, texto, cor, fundo, fonte = '900 120px "Arial Black", Impact, sans-serif', w = 1024, h = 256) {
  const c = canvas(w, h), g = c.getContext('2d');
  if (fundo) { g.fillStyle = fundo; g.fillRect(0, 0, w, h); }
  g.font = fonte; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = cor; g.fillText(texto, w / 2, h / 2 + 6);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function ondas(THREE, claro, escuro, rep) {
  const c = canvas(256, 256), g = c.getContext('2d');
  g.fillStyle = escuro; g.fillRect(0, 0, 256, 256);
  g.strokeStyle = claro; g.lineWidth = 4; g.lineCap = 'round';
  const r = rnd(3);
  for (let i = 0; i < 26; i++) {
    const x = r() * 256, y = r() * 256, l = 20 + r() * 40;
    g.globalAlpha = 0.4 + r() * 0.5;
    g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + l / 2, y - 6, x + l, y); g.stroke();
  }
  return tex(THREE, c, rep);
}
