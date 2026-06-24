import { loadScript } from '../utils.js';

export default {
  id: 'threejs',
  title: 'Three.js',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.min.js');
    const THREE = window.THREE;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">3D / WebGL</span>
            <h2 class="sp-title">Three.js</h2>
            <p class="sp-desc">WebGL 3D의 표준 라이브러리. 복잡한 WebGL API를 추상화해 간단한 코드로 3D 장면, 조명, 쉐이더, 물리 등을 구현합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i three</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">docs</span><code>threejs.org</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:0;overflow:hidden;border-radius:12px;background:#050508;">
          <canvas id="three-canvas" style="width:100%;display:block;"></canvas>
        </div>
        <div class="demo-controls">
          <button class="demo-btn" id="th-box">Box</button>
          <button class="demo-btn sec" id="th-sphere">Sphere</button>
          <button class="demo-btn sec" id="th-torus">Torus</button>
          <button class="demo-btn sec" id="th-wire">Wireframe 토글</button>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>Scene → Camera → Renderer → Mesh(Geometry + Material)</code> 구조. <code>requestAnimationFrame</code> 루프에서 <code>renderer.render(scene, camera)</code>를 호출합니다.</div>
      </div>`;

    const canvas = document.getElementById('three-canvas');
    const W = canvas.parentElement.clientWidth;
    const H = Math.round(W * 9/16);
    canvas.width = W; canvas.height = H;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050508);

    const camera = new THREE.PerspectiveCamera(60, W/H, 0.1, 100);
    camera.position.set(0, 0, 3);

    const light1 = new THREE.DirectionalLight(0xa78bfa, 3);
    light1.position.set(5, 5, 5);
    const light2 = new THREE.DirectionalLight(0x06b6d4, 2);
    light2.position.set(-5, -3, 2);
    scene.add(light1, light2, new THREE.AmbientLight(0x1a1a2e, 2));

    let mesh;
    const mat = new THREE.MeshPhongMaterial({ color: 0x7c3aed, shininess: 80 });

    const setGeo = (geo) => {
      if (mesh) scene.remove(mesh);
      mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
    };
    setGeo(new THREE.BoxGeometry(1.5, 1.5, 1.5));

    document.getElementById('th-box').onclick = () => setGeo(new THREE.BoxGeometry(1.5, 1.5, 1.5));
    document.getElementById('th-sphere').onclick = () => setGeo(new THREE.SphereGeometry(1, 32, 32));
    document.getElementById('th-torus').onclick = () => setGeo(new THREE.TorusGeometry(0.8, 0.35, 20, 60));
    document.getElementById('th-wire').onclick = () => { mat.wireframe = !mat.wireframe; };

    const animate = () => {
      requestAnimationFrame(animate);
      if (mesh) { mesh.rotation.x += 0.006; mesh.rotation.y += 0.01; }
      renderer.render(scene, camera);
    };
    animate();
  }
};
