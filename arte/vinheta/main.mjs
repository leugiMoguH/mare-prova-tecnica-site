// Cena de referência (vinheta) — direção A "Azulejo": Kira toon com rim light e contorno, no canto do palco.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as TX from '../motor/tex.mjs';

const q = new URLSearchParams(location.search);
const hora = q.get('hora') ?? 'dia';
const tCaptura = q.has('t') ? +q.get('t') : null;      // modo captura: pose fixa, sem relógio
const hud = document.getElementById('hud');

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: tCaptura !== null });
const movel = matchMedia('(pointer: coarse)').matches;
const dprMax = +(q.get('dpr') ?? Math.min(devicePixelRatio, movel ? 1.5 : 1.25));
let dpr = dprMax;
renderer.setPixelRatio(dpr);
renderer.info.autoReset = false;
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = hora === 'noite' ? THREE.NeutralToneMapping : THREE.NoToneMapping;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 200);
const LUZ = {
  dia: { ceu: [[0, '#5aa6e0'], [0.55, '#bfe0ee'], [0.8, '#ffd8a8'], [1, '#ffb27e']], sol: ['#ffd2a0', 2.05], hemi: ['#b4d4ff', '#d9a985', 0.95], rim: ['#ffe2b0', 2.4], exp: 1.0 },
  noite: { ceu: [[0, '#10144a'], [0.55, '#2c2577'], [0.85, '#6b3790'], [1, '#c4508c']], sol: ['#8ea2ff', 0.45], hemi: ['#3a4aa6', '#1a1538', 0.4], rim: ['#7fb0ff', 1.6], exp: 1.05 },
}[hora];
scene.background = TX.ceu(THREE, LUZ.ceu);
renderer.toneMappingExposure = LUZ.exp;

// --- luz: chave quente com sombra, preenchimento frio, contraluz (rim)
const sol = new THREE.DirectionalLight(...LUZ.sol);
sol.position.set(-4, 6, 5);
sol.castShadow = true;
sol.shadow.mapSize.set(2048, 2048);
Object.assign(sol.shadow.camera, { left: -4, right: 4, top: 4, bottom: -2, near: 1, far: 20 });
sol.shadow.bias = -0.0004;
sol.shadow.normalBias = 0.02;
sol.shadow.radius = 3;
const rim = new THREE.DirectionalLight(...LUZ.rim);
rim.position.set(3, 3, -5);
scene.add(sol, rim, new THREE.HemisphereLight(...LUZ.hemi));
if (hora === 'noite') {
  const ponto = (c, i, d, x, y, z) => { const l = new THREE.PointLight(c, i, d, 1.6); l.position.set(x, y, z); scene.add(l); };
  ponto('#ffc36e', 1.5, 7, 0.1, 3.6, -2.0);        // candeeiro de parede
  ponto('#ffb860', 1.6, 10, -2.0, 4.4, 0.4);       // fio de lâmpadas
  ponto('#ffb860', 1.4, 10, 3.0, 4.2, 0.6);
  ponto('#ff9a50', 1.2, 5, -2.1, 2.6, -2.2);       // janela iluminada
  const foco = new THREE.SpotLight('#ffe9d0', 14, 16, 0.3, 0.6, 1.5);
  foco.position.set(3.2, 5.5, 4.5);
  foco.target.position.set(0, 1.0, -0.3);
  foco.castShadow = true;
  foco.shadow.mapSize.set(1024, 1024);
  foco.shadow.bias = -0.0005;
  scene.add(foco, foco.target);
}

// --- toon: rampa de 3 tons + rim por fresnel (a mesma linguagem para personagem e adereços)
const rampa = new THREE.DataTexture(new Uint8Array([128, 128, 128, 255, 196, 196, 196, 255, 255, 255, 255, 255]), 3, 1);
rampa.minFilter = rampa.magFilter = THREE.NearestFilter;
rampa.needsUpdate = true;
function toon(m, rimCor = '#fff1d6', rimForca = 0.45, vc = false) {
  const t = new THREE.MeshToonMaterial({ color: m.color, map: m.map ?? null, normalMap: m.normalMap ?? null, gradientMap: rampa, emissive: m.emissive ?? new THREE.Color(0), emissiveIntensity: m.emissiveIntensity ?? 1, vertexColors: vc });
  if (m.normalMap) t.normalScale.set(0.8, 0.8);
  t.onBeforeCompile = (s) => {
    s.uniforms.rimCor = { value: new THREE.Color(rimCor) };
    s.uniforms.rimForca = { value: rimForca };
    s.fragmentShader = s.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 rimCor; uniform float rimForca;')
      .replace('#include <opaque_fragment>', `
        float fres = pow(1.0 - clamp(dot(normalize(vViewPosition), normal) * -1.0 + 1.0 - 1.0, 0.0, 1.0), 1.0);
        float rimv = smoothstep(0.62, 0.72, 1.0 - abs(dot(normalize(-vViewPosition), normal)));
        outgoingLight += rimCor * rimv * rimForca;
        #include <opaque_fragment>`);
  };
  return t;
}

// --- contorno: casco invertido que acompanha esqueleto e shape keys
function contorno(mesh, espessura, cor) {
  const mat = new THREE.MeshBasicMaterial({ color: cor, side: THREE.BackSide });
  mat.onBeforeCompile = (s) => {
    s.uniforms.esp = { value: espessura };
    s.vertexShader = s.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float esp;')
      .replace('#include <skinning_vertex>', '#include <skinning_vertex>\ntransformed += normalize(objectNormal) * esp;');
  };
  if (!mesh.isSkinnedMesh) return;
  const o = new THREE.SkinnedMesh(mesh.geometry, mat);
  o.bind(mesh.skeleton, mesh.bindMatrix);
  o.morphTargetInfluences = mesh.morphTargetInfluences;
  o.morphTargetDictionary = mesh.morphTargetDictionary;
  o.frustumCulled = false;
  mesh.parent.add(o);
}

// --- cenário modelado no Blender (oclusão ambiente cozida em cores de vértice)
const cen = (await new GLTFLoader().loadAsync('../modelos/vinheta.glb')).scene;
cen.traverse((o) => {
  if (!o.isMesh) return;
  const vc = !!o.geometry.attributes.color && ['calcada', 'plano'].includes(o.material.name);
  const lamp = o.material.name === 'lampada';
  const nome = o.material.name;
  o.material = toon(o.material, '#fff4dc', 0.18, vc);
  o.material.name = nome;
  if (lamp) { o.material.emissive = new THREE.Color(hora === 'noite' ? '#ffcf70' : '#ffe0a0'); o.material.emissiveIntensity = hora === 'noite' ? 1.8 : 0.35; }
  if (hora === 'noite' && (o.material.name === 'interior' || o.material.name === 'vidro')) { o.material.emissive = new THREE.Color('#ffae55'); o.material.emissiveIntensity = o.material.name === 'vidro' ? 0.55 : 1.4; }
  o.castShadow = o.receiveShadow = true;
});
scene.add(cen);

// --- Kira
const gltf = await new GLTFLoader().loadAsync('../modelos/kira.glb');
const kira = gltf.scene;
kira.position.set(0, 0.4, -0.2);
kira.rotation.y = 0.25;
const piscar = [];
kira.traverse((o) => {
  if (!o.isMesh) return;
  o.castShadow = true;
  o.receiveShadow = true;
  o.material = toon(o.material, hora === 'dia' ? '#fff0cf' : '#9cc4ff', hora === 'dia' ? 0.4 : 0.55, !!o.geometry.attributes.color);
  if (o.morphTargetDictionary?.piscar !== undefined) piscar.push(o);
});
const malhas = [];
kira.traverse((o) => o.isSkinnedMesh && malhas.push(o));
malhas.forEach((m) => contorno(m, 0.0055, hora === 'dia' ? '#2a1d2e' : '#120d24'));
scene.add(kira);
const mixer = new THREE.AnimationMixer(kira);
const clip = gltf.animations.find((a) => a.name === (q.get('clipe') ?? 'Groove_Loop')) ?? gltf.animations[0];
mixer.clipAction(clip).play();

// --- pós-processamento: contorno de tinta pelas descontinuidades de profundidade + vinheta suave
const alvo = new THREE.WebGLRenderTarget(1, 1, { samples: 4, type: THREE.HalfFloatType });
alvo.depthTexture = new THREE.DepthTexture(1, 1);
const pos = new THREE.ShaderMaterial({
  uniforms: { cor: { value: alvo.texture }, prof: { value: alvo.depthTexture }, texel: { value: new THREE.Vector2() },
    perto: { value: 0.1 }, longe: { value: 200 }, tinta: { value: new THREE.Color(hora === 'dia' ? '#2b2033' : '#0d0a1f') } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
  fragmentShader: `
    #include <packing>
    uniform sampler2D cor, prof, bloom; uniform float forcaBloom; uniform vec2 texel; uniform float perto, longe; uniform vec3 tinta; varying vec2 vUv;
    float lin(vec2 uv){ return perspectiveDepthToViewZ(texture2D(prof, uv).x, perto, longe); }
    void main(){
      vec4 c = texture2D(cor, vUv);
      float d = lin(vUv), m = 0.0;
      for (int i = 0; i < 4; i++) {
        vec2 o = i == 0 ? vec2(texel.x, 0.0) : i == 1 ? vec2(-texel.x, 0.0) : i == 2 ? vec2(0.0, texel.y) : vec2(0.0, -texel.y);
        m = max(m, abs(lin(vUv + o * 1.2) - d));
      }
      float e = smoothstep(0.035, 0.08, m / max(-d, 0.1)) * (1.0 - smoothstep(25.0, 60.0, -d));
      vec3 r = mix(c.rgb, tinta, e * 0.85) + texture2D(bloom, vUv).rgb * forcaBloom;
      vec2 q = vUv - 0.5; r *= 1.0 - dot(q, q) * 0.35;
      gl_FragColor = vec4(r, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  depthWrite: false, depthTest: false, toneMapped: true,
});
const blR = [new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType }), new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType })];
const passe = (frag, unis) => new THREE.ShaderMaterial({ uniforms: unis, vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }', fragmentShader: frag, depthTest: false, depthWrite: false });
const extrair = passe('uniform sampler2D t; varying vec2 vUv; void main(){ vec3 c = texture2D(t, vUv).rgb; float l = max(c.r, max(c.g, c.b)); gl_FragColor = vec4(c * smoothstep(1.15, 1.8, l), 1.0); }', { t: { value: alvo.texture } });
const borrar = passe(`uniform sampler2D t; uniform vec2 dir; varying vec2 vUv;
  void main(){ vec3 s = texture2D(t, vUv).rgb * 0.227;
    for (int i = 1; i < 5; i++) { float w = i == 1 ? 0.195 : i == 2 ? 0.122 : i == 3 ? 0.054 : 0.016;
      s += (texture2D(t, vUv + dir * float(i)).rgb + texture2D(t, vUv - dir * float(i)).rgb) * w; }
    gl_FragColor = vec4(s, 1.0); }`, { t: { value: null }, dir: { value: new THREE.Vector2() } });
pos.uniforms.bloom = { value: blR[0].texture };
pos.uniforms.forcaBloom = { value: hora === 'noite' ? 1.6 : 0.0 };
const ecra = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), pos);
const cenaPos = new THREE.Scene(); cenaPos.add(ecra);
const camPos = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
function desenhar() {
  renderer.setRenderTarget(alvo);
  renderer.render(scene, camera);
  if (hora === 'noite') { ecra.material = extrair; renderer.setRenderTarget(blR[0]); renderer.render(cenaPos, camPos); }
  ecra.material = borrar;
  for (let i = 0; i < (hora === 'noite' ? 1 : 0); i++) {
    for (const [de, para, d] of [[0, 1, [1, 0]], [1, 0, [0, 1]]]) {
      borrar.uniforms.t.value = blR[de].texture;
      borrar.uniforms.dir.value.set(d[0] * (1 + i) / blR[0].width, d[1] * (1 + i) / blR[0].height);
      renderer.setRenderTarget(blR[para]); renderer.render(cenaPos, camPos);
    }
  }
  ecra.material = pos;
  renderer.setRenderTarget(null);
  renderer.render(cenaPos, camPos);
}

// --- câmara: paisagem (PC) e retrato (telemóvel) com enquadramentos próprios
function enquadrar() {
  const retrato = innerWidth < innerHeight;
  camera.aspect = innerWidth / innerHeight;
  camera.fov = retrato ? 42 : 30;
  camera.position.set(retrato ? 0.45 : 1.0, retrato ? 1.45 : 1.55, retrato ? 5.2 : 6.0);
  camera.lookAt(retrato ? -0.1 : 0.15, retrato ? 1.75 : 1.95, -1.0);
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  const pr = renderer.getPixelRatio();
  alvo.setSize(innerWidth * pr, innerHeight * pr);
  blR.forEach((r) => r.setSize(Math.ceil(innerWidth * pr / 4), Math.ceil(innerHeight * pr / 4)));
  pos.uniforms.texel.value.set(1 / (innerWidth * pr), 1 / (innerHeight * pr));
}
enquadrar();
addEventListener('resize', enquadrar);

// --- ciclo
const relogio = new THREE.Clock();
let frames = 0, acum = 0, piores = [];
function piscarEm(t) {
  const fase = t % 3.7;
  const v = fase < 0.12 ? Math.sin((fase / 0.12) * Math.PI) : 0;
  piscar.forEach((m) => (m.morphTargetInfluences[m.morphTargetDictionary.piscar] = v));
}
if (tCaptura !== null) {
  mixer.setTime(tCaptura);
  piscarEm(1);
  desenhar();
  window.__pronto = true;
} else {
  renderer.setAnimationLoop(() => {
    const dt = relogio.getDelta();
    mixer.update(dt);
    piscarEm(relogio.elapsedTime);
    desenhar();
    frames++; acum += dt; piores.push(dt);
    const calls = renderer.info.render.calls, tris = renderer.info.render.triangles;
    renderer.info.reset();
    if (acum > 2) {
      piores.sort((a, b) => b - a);
      const medio = acum / frames;
      if (!q.has('dpr') && relogio.elapsedTime > 6) {
        const novo = medio > 0.03 ? Math.max(0.75, dpr - 0.15) : medio < 0.016 ? Math.min(dprMax, dpr + 0.1) : dpr;
        if (novo !== dpr) { dpr = novo; renderer.setPixelRatio(dpr); enquadrar(); }
      }
      hud.textContent = `${Math.round(frames / acum)} fps · pior ${Math.round(piores[0] * 1000)} ms · ${calls} draws · ${Math.round(tris / 1000)}k tris · dpr ${dpr.toFixed(2)}`;
      frames = 0; acum = 0; piores = [];
    }
  });
}
if (q.has('medir')) {
  const tempos = [];
  let ult = performance.now();
  const fim = ult + 1000 * +q.get('medir');
  const aquecer = ult + 3000;
  const medir = () => {
    const ag = performance.now();
    if (ag > aquecer) tempos.push(ag - ult);
    ult = ag;
    if (ag < fim) requestAnimationFrame(medir);
    else {
      tempos.sort((a, b) => a - b);
      const p = (x) => +tempos[Math.floor(x * (tempos.length - 1))].toFixed(1);
      window.__medida = { n: tempos.length, p50: p(0.5), p95: p(0.95), pior: p(1), dpr: renderer.getPixelRatio(), w: innerWidth, h: innerHeight };
    }
  };
  requestAnimationFrame(medir);
}
window.__info = () => ({ gl: (() => { const g = renderer.getContext(); const e = g.getExtension('WEBGL_debug_renderer_info'); return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : '?'; })(), ...renderer.info.render });
