// Prova 2D: Kira articulada no Three.js com animações procedimentais, troca de roupa e expressões.
// ?anim=repouso|aceno|danca  &t=<segundos fixos para capturas>  &roupa=mestra|hoodie  &ver=malha,ossos
import * as THREE from 'three';
import { criarKira } from './rig2d.mjs';

const q = new URLSearchParams(location.search);
const T_FIXO = q.has('t') ? +q.get('t') : null;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
document.body.prepend(renderer.domElement);
const cena = new THREE.Scene();
cena.background = new THREE.Color('#e9e2d8');
const cam = new THREE.OrthographicCamera();

// chão e sombra de contacto, comuns às duas provas
const chao = new THREE.Mesh(new THREE.PlaneGeometry(6000, 900), new THREE.MeshBasicMaterial({ color: '#d6cbbb' }));
chao.position.set(0, -768 - 400, -1); cena.add(chao);
const sombra = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0.16, depthTest: false }));
sombra.scale.set(260, 26, 1); sombra.position.set(0, -768 + 70, -0.5); cena.add(sombra);

const kira = await criarKira({
  base: './tex/', variantes: ['mestra', 'hoodie'],
  expressoes: { olhos_fechados: 'rosto-olhos_fechados.webp', sorriso: 'rosto-sorriso.webp' },
});
cena.add(kira.raiz);
const O = kira.ossos, R = kira.repouso, rad = THREE.MathUtils.degToRad;

// ajudas visuais para avaliar a deformação
const fios = Object.values(kira.malhas).map((m) => {
  const w = new THREE.SkinnedMesh(m.geometry, new THREE.MeshBasicMaterial({ color: '#1e6b6a', wireframe: true, transparent: true, opacity: 0.35, depthTest: false }));
  w.bind(m.skeleton, m.bindMatrix); w.renderOrder = 20; w.visible = false; w.frustumCulled = false; kira.raiz.add(w); return w;
});
const ajudaOssos = new THREE.SkeletonHelper(O.anca); ajudaOssos.visible = false;
ajudaOssos.material.depthTest = false; ajudaOssos.renderOrder = 30; cena.add(ajudaOssos);

function enquadrar() {
  // personagem inteira com folga em baixo para o painel de botões
  const w = innerWidth, h = innerHeight, asp = w / h, altura = 1980, largura = Math.max(altura * asp, 1150);
  const alt = largura / asp, centro = -150;
  Object.assign(cam, { left: -largura / 2, right: largura / 2, top: centro + alt / 2, bottom: centro - alt / 2, near: -100, far: 100 });
  cam.updateProjectionMatrix(); renderer.setSize(w, h);
}
addEventListener('resize', enquadrar); enquadrar();

// mola simples para os puffs (atraso e ressalto)
const mola = { e: { a: 0, v: 0 }, d: { a: 0, v: 0 } };
let alvoPrev = 0;
function molas(dt, cabecaRot) {
  const acel = (cabecaRot - alvoPrev) / Math.max(dt, 1e-3); alvoPrev = cabecaRot;
  for (const [k, s] of Object.entries(mola)) {
    const f = -acel * 0.012 * (k === 'e' ? 1 : 1.1);
    s.v += (f - s.a * 90 - s.v * 9) * dt; s.a += s.v * dt;
    O['puf_' + k].rotation.z = THREE.MathUtils.clamp(s.a, -0.35, 0.35);
  }
}

const ANIM = {
  repouso(t) {
    const r = Math.sin(t * 2.1);
    O.peito.rotation.z = r * rad(0.8); O.cabeca.rotation.z = Math.sin(t * 1.3 + 1) * rad(2.5);
    O.anca.position.y = R.anca.y + r * 2;
    O.ombro_e.rotation.z = rad(-3) + r * rad(1.5); O.ombro_d.rotation.z = rad(3) - r * rad(1.5);
    O.cotovelo_e.rotation.z = rad(4); O.cotovelo_d.rotation.z = rad(-4);
  },
  aceno(t) {
    ANIM.repouso(t);
    const sobe = Math.min(1, t * 2.2);
    O.ombro_d.rotation.z = sobe * rad(118);
    O.cotovelo_d.rotation.z = sobe * (rad(38) + Math.sin(t * 9) * rad(22));
    O.pulso_d.rotation.z = sobe * Math.sin(t * 9 - 0.6) * rad(14);
    O.cabeca.rotation.z = sobe * rad(-5) + Math.sin(t * 1.3) * rad(2);
    O.peito.rotation.z = sobe * rad(-2.5);
  },
  danca(t) {
    const b = t * Math.PI * 2 * (104 / 60) / 2; // 104 bpm, ciclo de 2 tempos
    const lado = Math.sin(b), salto = Math.abs(Math.sin(b * 2));
    O.anca.position.x = R.anca.x + lado * 16;
    O.anca.position.y = R.anca.y - (1 - salto) * 14;
    O.anca.rotation.z = lado * rad(4);
    O.peito.rotation.z = -lado * rad(7);
    O.cabeca.rotation.z = Math.sin(b * 2 + 0.6) * rad(5);
    // pernas: compensam a anca para manter os pés no chão (dobra no plano da imagem)
    O.coxa_e.rotation.z = -lado * rad(4) + (1 - salto) * rad(-5); O.joelho_e.rotation.z = (1 - salto) * rad(8);
    O.coxa_d.rotation.z = -lado * rad(4) + (1 - salto) * rad(5); O.joelho_d.rotation.z = (1 - salto) * rad(-8);
    O.tornozelo_e.rotation.z = -(O.anca.rotation.z + O.coxa_e.rotation.z + O.joelho_e.rotation.z);
    O.tornozelo_d.rotation.z = -(O.anca.rotation.z + O.coxa_d.rotation.z + O.joelho_d.rotation.z);
    // braços: bombeiam alternados com cotovelo dobrado
    O.ombro_e.rotation.z = rad(-25) + Math.sin(b * 2) * rad(28);
    O.cotovelo_e.rotation.z = rad(-70) + Math.sin(b * 2 + 1) * rad(20);
    O.ombro_d.rotation.z = rad(25) - Math.sin(b * 2 + Math.PI) * rad(28);
    O.cotovelo_d.rotation.z = rad(70) - Math.sin(b * 2 + Math.PI + 1) * rad(20);
    O.pulso_e.rotation.z = Math.sin(b * 2) * rad(12); O.pulso_d.rotation.z = -Math.sin(b * 2) * rad(12);
  },
};

let anim = q.get('anim') ?? 'repouso', inicio = performance.now();
function repor() {
  for (const [n, b] of Object.entries(O)) { b.position.copy(R[n]); b.rotation.set(0, 0, 0); }
}
function escolherAnim(a) { anim = a; inicio = performance.now(); repor(); marcar('anim', a); }
function marcar(tipo, valor) { document.querySelectorAll(`[data-${tipo}]`).forEach((b) => b.setAttribute('aria-pressed', b.dataset[tipo] === valor)); }
document.querySelectorAll('[data-anim]').forEach((b) => b.onclick = () => escolherAnim(b.dataset.anim));
document.querySelectorAll('[data-roupa]').forEach((b) => b.onclick = () => { kira.vestir(b.dataset.roupa); marcar('roupa', b.dataset.roupa); });
document.querySelectorAll('[data-ver]').forEach((b) => b.onclick = () => {
  const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on);
  if (b.dataset.ver === 'malha') fios.forEach((f) => f.visible = on); else ajudaOssos.visible = on;
});
if (q.get('roupa')) { kira.vestir(q.get('roupa')); marcar('roupa', q.get('roupa')); }
for (const v of (q.get('ver') ?? '').split(',')) document.querySelector(`[data-ver="${v}"]`)?.click();
marcar('anim', anim);

// expressões: pestanejar periódico; sorriso durante a dança
function rosto(t) {
  const pisca = (t % 3.7) < 0.12;
  kira.expressao(pisca ? 'olhos_fechados' : anim === 'danca' || (anim === 'aceno' && t > 0.6) ? 'sorriso' : null);
}

// medição: fps, p95 e pausas depois de 3 s
const hud = document.getElementById('hud'), tempos = [];
let ultimo = performance.now(), pausas = 0;
const t0 = performance.now();
function ciclo(agora) {
  const dt = Math.min((agora - ultimo) / 1000, 0.1); ultimo = agora;
  const t = T_FIXO ?? (agora - inicio) / 1000;
  ANIM[anim](t); molas(T_FIXO !== null ? 1 / 60 : dt, O.cabeca.rotation.z + O.peito.rotation.z + O.anca.position.x * 0.004);
  rosto(t);
  sombra.position.x = O.anca.position.x * 0.8;
  renderer.render(cena, cam);
  if (agora - t0 > 3000) { tempos.push(dt * 1000); if (dt > 0.05) pausas++; if (tempos.length > 600) tempos.shift(); }
  if (tempos.length && Math.round(agora / 500) !== Math.round((agora - dt * 1000) / 500)) {
    const o = [...tempos].sort((a, b) => a - b), p95 = o[Math.floor(o.length * 0.95)];
    hud.textContent = `${(1000 / (o.reduce((s, v) => s + v, 0) / o.length)).toFixed(0)} fps · p95 ${p95.toFixed(1)} ms · pausas ${pausas}\n${renderer.info.render.calls} draws · ${kira.triangulos()} tri`;
  }
  requestAnimationFrame(ciclo);
}
requestAnimationFrame(ciclo);
window.__pronto = true;
window.__info = () => ({ tri: kira.triangulos(), draws: renderer.info.render.calls });
