// Kira 2D articulada: malhas deformadas por ossos (skinning) a partir das camadas recortadas da imagem-mestra.
// Coordenadas: píxeis da mestra 1024x1536; mundo = (x - 512, 768 - y).
import * as THREE from 'three';

const W = 1024, H = 1536, CELULA = 8;
const mundo = ([x, y]) => new THREE.Vector2(x - W / 2, H / 2 - y);

// Hierarquia: osso → pai. Cada osso roda em torno da sua articulação.
const PAIS = {
  anca: null, peito: 'anca', pescoco: 'peito', cabeca: 'pescoco', puf_e: 'cabeca', puf_d: 'cabeca',
  ombro_e: 'peito', cotovelo_e: 'ombro_e', pulso_e: 'cotovelo_e',
  ombro_d: 'peito', cotovelo_d: 'ombro_d', pulso_d: 'cotovelo_d',
  coxa_e: 'anca', joelho_e: 'coxa_e', tornozelo_e: 'joelho_e',
  coxa_d: 'anca', joelho_d: 'coxa_d', tornozelo_d: 'joelho_d',
};
// Segmentos de influência por camada: [osso, de, até] (pontos do esqueleto ou coordenadas).
const SEGMENTOS = {
  corpo: [
    ['anca', 'anca', 'peito'], ['peito', 'peito', 'pescoco'], ['pescoco', 'pescoco', 'cabeca'],
    ['cabeca', 'cabeca', [512, 150]], ['puf_e', 'puf_e', [380, 95]], ['puf_d', 'puf_d', [630, 95]],
    ['coxa_e', 'coxa_e', 'joelho_e'], ['joelho_e', 'joelho_e', 'tornozelo_e'], ['tornozelo_e', 'tornozelo_e', 'pe_e'],
    ['coxa_d', 'coxa_d', 'joelho_d'], ['joelho_d', 'joelho_d', 'tornozelo_d'], ['tornozelo_d', 'tornozelo_d', 'pe_d'],
  ],
  braco_e: [['ombro_e', 'ombro_e', 'cotovelo_e'], ['cotovelo_e', 'cotovelo_e', 'pulso_e'], ['pulso_e', 'pulso_e', 'mao_e']],
  braco_d: [['ombro_d', 'ombro_d', 'cotovelo_d'], ['cotovelo_d', 'cotovelo_d', 'pulso_d'], ['pulso_d', 'pulso_d', 'mao_d']],
};

function distSegmento(p, a, b) {
  const ab = b.clone().sub(a), t = THREE.MathUtils.clamp(p.clone().sub(a).dot(ab) / ab.lengthSq(), 0, 1);
  return p.distanceTo(a.clone().addScaledVector(ab, t));
}

async function alfaDe(url) {
  const img = await new Promise((ok, falha) => { const i = new Image(); i.onload = () => ok(i); i.onerror = falha; i.src = url; });
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, W, H).data, a = new Uint8Array(W * H);
  for (let i = 0; i < a.length; i++) a[i] = d[i * 4 + 3];
  return a;
}

// Grelha só onde há píxeis (união das variantes), pesos pela distância aos segmentos permitidos.
function geometria(alfas, segs, esq, indice) {
  const nx = W / CELULA, ny = H / CELULA, cheia = new Uint8Array(nx * ny);
  for (let cy = 0; cy < ny; cy++) for (let cx = 0; cx < nx; cx++) {
    let ok = 0;
    for (const a of alfas) for (let y = cy * CELULA; y < (cy + 1) * CELULA && !ok; y += 2) for (let x = cx * CELULA; x < (cx + 1) * CELULA; x += 2) if (a[y * W + x] > 8) { ok = 1; break; }
    cheia[cy * nx + cx] = ok;
  }
  const idVert = new Int32Array((nx + 1) * (ny + 1)).fill(-1), pos = [], uv = [], ind = [], si = [], sw = [];
  const segsMundo = segs.map(([osso, a, b]) => [indice[osso], mundo(typeof a === 'string' ? esq[a] : a), mundo(typeof b === 'string' ? esq[b] : b)]);
  const vert = (gx, gy) => {
    const k = gy * (nx + 1) + gx;
    if (idVert[k] >= 0) return idVert[k];
    const px = gx * CELULA, py = gy * CELULA, p = mundo([px, py]);
    pos.push(p.x, p.y, 0); uv.push(px / W, 1 - py / H);
    const ws = segsMundo.map(([o, a, b]) => [o, 1 / Math.pow(distSegmento(p, a, b) + 6, 4)]).sort((m, n) => n[1] - m[1]).slice(0, 4);
    const tot = ws.reduce((s, [, w]) => s + w, 0);
    for (let i = 0; i < 4; i++) { si.push(ws[i] ? ws[i][0] : 0); sw.push(ws[i] ? ws[i][1] / tot : 0); }
    return (idVert[k] = pos.length / 3 - 1);
  };
  for (let cy = 0; cy < ny; cy++) for (let cx = 0; cx < nx; cx++) if (cheia[cy * nx + cx]) {
    const a = vert(cx, cy), b = vert(cx + 1, cy), c = vert(cx, cy + 1), d = vert(cx + 1, cy + 1);
    ind.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
  g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
  g.setIndex(ind);
  return g;
}

export async function criarKira({ base, variantes, expressoes }) {
  const esq = await (await fetch(base + 'esqueleto.json')).json();
  const ossos = {}, lista = [];
  for (const [nome, pai] of Object.entries(PAIS)) {
    const b = new THREE.Bone(); b.name = nome;
    const p = mundo(esq[nome]), pp = pai ? mundo(esq[pai]) : new THREE.Vector2();
    b.position.set(p.x - pp.x, p.y - pp.y, 0);
    (pai ? ossos[pai] : null)?.add(b);
    ossos[nome] = b; lista.push(b);
  }
  const indice = Object.fromEntries(lista.map((b, i) => [b.name, i]));
  const raiz = new THREE.Group(); raiz.add(ossos.anca);
  raiz.updateMatrixWorld(true);
  const esqueleto = new THREE.Skeleton(lista);
  const loader = new THREE.TextureLoader();
  const texturas = {};
  for (const v of variantes) for (const parte of Object.keys(SEGMENTOS)) {
    const t = await loader.loadAsync(`${base}${v}-${parte}.webp`);
    t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    (texturas[v] ??= {})[parte] = t;
  }
  const malhas = {};
  let ordem = 0;
  for (const parte of Object.keys(SEGMENTOS)) {
    const alfas = await Promise.all(variantes.map((v) => alfaDe(`${base}${v}-${parte}.webp`)));
    const geo = geometria(alfas, SEGMENTOS[parte], esq, indice);
    const mat = new THREE.MeshBasicMaterial({ map: texturas[variantes[0]][parte], transparent: true, depthTest: false, depthWrite: false });
    const m = new THREE.SkinnedMesh(geo, mat);
    m.renderOrder = ordem++; m.frustumCulled = false;
    m.bind(esqueleto);
    raiz.add(m); malhas[parte] = m;
  }
  // Expressões: recorte suave do rosto preso ao osso da cabeça (troca instantânea, sem reconstruir).
  const rosto = {};
  for (const [nome, ficheiro] of Object.entries(expressoes)) {
    const t = await loader.loadAsync(base + ficheiro); t.colorSpace = THREE.SRGBColorSpace;
    const [x0, y0, x1, y1] = esq.rosto, c = mundo([(x0 + x1) / 2, (y0 + y1) / 2]), cab = mundo(esq.cabeca);
    const q = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, y1 - y0), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthTest: false, depthWrite: false }));
    q.position.set(c.x - cab.x, c.y - cab.y, 0); q.renderOrder = 10; q.visible = false;
    ossos.cabeca.add(q); rosto[nome] = q;
  }
  const repouso = Object.fromEntries(lista.map((b) => [b.name, b.position.clone()]));
  return {
    raiz, ossos, malhas, repouso,
    vestir(v) { for (const [parte, m] of Object.entries(malhas)) m.material.map = texturas[v][parte]; },
    expressao(nome) { for (const [k, q] of Object.entries(rosto)) q.visible = k === nome; },
    triangulos: () => Object.values(malhas).reduce((s, m) => s + m.geometry.index.count / 3, 0),
  };
}
