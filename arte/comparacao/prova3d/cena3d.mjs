// Prova 3D: modelo substituto CC0 com esqueleto e pesos automáticos (rig3d.py), clipes retargetados.
// ?clip=idle|interact|dance|walk  &t=<segundos fixos para capturas>  &ang=<rotação inicial em rad>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const q = new URLSearchParams(location.search);
const T_FIXO = q.has('t') ? +q.get('t') : null;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.prepend(renderer.domElement);
const cena = new THREE.Scene();
cena.background = new THREE.Color('#e9e2d8');
cena.add(new THREE.HemisphereLight('#fff6e8', '#8a7a6a', 1.6));
const sol = new THREE.DirectionalLight('#fff1dc', 2.2);
sol.position.set(-1.5, 4, 3); sol.castShadow = true; sol.shadow.mapSize.set(1024, 1024);
Object.assign(sol.shadow.camera, { left: -1.5, right: 1.5, top: 2, bottom: -1 });
cena.add(sol);

// chão com a mesma cor da prova 2D
const chao = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: '#d6cbbb', roughness: 1 }));
chao.rotation.x = -Math.PI / 2; chao.receiveShadow = true; cena.add(chao);

const g = await new Promise((ok, falha) => new GLTFLoader().load('./modelos/proxy-crianca.glb', ok, undefined, falha));
const raiz = g.scene;
raiz.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } });
raiz.updateMatrixWorld(true);
const cx = new THREE.Box3().setFromObject(raiz, true);
raiz.position.y -= cx.min.y;
cena.add(raiz);
const altura = cx.max.y - cx.min.y;

const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 50);
const controlos = new OrbitControls(cam, renderer.domElement);
controlos.target.set(0, altura * 0.52, 0);
controlos.enablePan = false; controlos.minDistance = altura * 0.6; controlos.maxDistance = altura * 6;
const ang = +(q.get('ang') ?? 0.35);
function enquadrar() {
  const w = innerWidth, h = innerHeight;
  cam.aspect = w / h;
  // distância para caber a altura toda (e a largura em retrato) com folga para o painel
  const vfov = THREE.MathUtils.degToRad(cam.fov), dist = Math.max(altura * 0.68 / Math.tan(vfov / 2), altura * 0.42 / Math.tan(vfov / 2) / cam.aspect);
  if (!enquadrar.feito) {
    cam.position.set(Math.sin(ang) * dist, altura * 0.62, Math.cos(ang) * dist);
    enquadrar.feito = true;
  }
  cam.updateProjectionMatrix(); renderer.setSize(w, h); controlos.update();
}
addEventListener('resize', enquadrar); enquadrar();

const ajudaOssos = new THREE.SkeletonHelper(raiz); ajudaOssos.visible = false;
ajudaOssos.material.depthTest = false; ajudaOssos.renderOrder = 30; cena.add(ajudaOssos);

const mixer = new THREE.AnimationMixer(raiz);
const acoes = Object.fromEntries(g.animations.map((c) => [c.name.split('_')[0].split('.')[0].toLowerCase(), mixer.clipAction(c)]));
let atual = null;
function escolherClip(nome) {
  const a = acoes[nome.toLowerCase()];
  if (!a) return;
  if (atual && atual !== a) atual.fadeOut(0.25);
  a.reset().fadeIn(atual ? 0.25 : 0).play(); atual = a;
  document.querySelectorAll('[data-clip]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.clip.toLowerCase() === nome.toLowerCase()));
}
document.querySelectorAll('[data-clip]').forEach((b) => b.onclick = () => escolherClip(b.dataset.clip));
document.querySelectorAll('[data-ver]').forEach((b) => b.onclick = () => {
  const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); ajudaOssos.visible = on;
});
escolherClip(q.get('clip') ?? 'idle');
if (q.get('ver') === 'ossos') document.querySelector('[data-ver="ossos"]').click();
if (T_FIXO !== null) mixer.setTime(T_FIXO);

let tris = 0;
raiz.traverse((o) => { if (o.isMesh) tris += (o.geometry.index ? o.geometry.index.count : o.geometry.attributes.position.count) / 3; });

// medição: fps, p95 e pausas depois de 3 s (igual à prova 2D)
const hud = document.getElementById('hud'), tempos = [];
let ultimo = performance.now(), pausas = 0;
const t0 = performance.now();
function ciclo(agora) {
  const ms = agora - ultimo, dt = Math.min(ms / 1000, 0.1); ultimo = agora; // estatísticas com o tempo real, sem limite
  if (T_FIXO === null) mixer.update(dt);
  controlos.update();
  renderer.render(cena, cam);
  if (agora - t0 > 3000) { tempos.push(ms); if (ms > 50) pausas++; if (tempos.length > 600) tempos.shift(); }
  if (tempos.length && Math.round(agora / 500) !== Math.round((agora - dt * 1000) / 500)) {
    const o = [...tempos].sort((a, b) => a - b), p95 = o[Math.floor(o.length * 0.95)];
    hud.textContent = `${(1000 / (o.reduce((s, v) => s + v, 0) / o.length)).toFixed(0)} fps · p95 ${p95.toFixed(1)} ms · pausas ${pausas}\n${renderer.info.render.calls} draws · ${tris} tri`;
  }
  requestAnimationFrame(ciclo);
}
requestAnimationFrame(ciclo);
window.__pronto = true;
window.__info = () => ({ tri: tris, draws: renderer.info.render.calls, clipes: Object.keys(acoes) });
