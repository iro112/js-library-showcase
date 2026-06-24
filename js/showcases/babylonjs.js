import { loadScript } from '../utils.js';

export default {
  id: 'babylonjs',
  title: 'Babylon.js',
  async init(container) {
    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">3D / WebGL</span>
            <h2 class="sp-title">Babylon.js</h2>
            <p class="sp-desc">Microsoft가 만든 강력한 3D 게임/인터랙션 엔진. Three.js보다 게임 엔진에 가깝고 물리, 충돌, 파티클 시스템이 내장되어 있습니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i @babylonjs/core</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>cdn.babylonjs.com</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:16px;">
              <p style="font-size:11px;color:var(--accent-light);font-weight:600;margin-bottom:10px;">Three.js vs Babylon.js</p>
              <div style="font-size:12px;color:var(--text-muted);line-height:1.8;">
                <p><span style="color:#7c3aed;">Three.js</span> — 유연한 렌더러, 큰 생태계, 커스텀에 유리</p>
                <p><span style="color:#06b6d4;">Babylon.js</span> — 게임 엔진형, 물리/충돌/GUI 내장, 에디터 제공</p>
              </div>
            </div>
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:16px;">
              <p style="font-size:11px;color:var(--accent-light);font-weight:600;margin-bottom:10px;">주요 특징</p>
              <ul style="font-size:12px;color:var(--text-muted);line-height:2;list-style:none;">
                <li>물리 엔진 (Ammo.js / Havok) 내장</li>
                <li>Babylon Playground 온라인 에디터</li>
                <li>glTF/FBX/OBJ 포맷 직접 지원</li>
                <li>XR (VR/AR) 네이티브 지원</li>
              </ul>
            </div>
          </div>
          <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:20px;">
            <p style="font-size:12px;color:var(--accent-light);font-weight:600;margin-bottom:12px;">기본 씬 구성 코드</p>
            <pre style="font-size:11px;color:var(--text-muted);line-height:1.9;overflow-x:auto;"><code>import { Engine, Scene, FreeCamera, HemisphericLight, MeshBuilder } from '@babylonjs/core';

const engine = new Engine(canvas);
const scene = new Scene(engine);
const camera = new FreeCamera('cam', new Vector3(0, 5, -10), scene);
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas);

const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
engine.runRenderLoop(() => scene.render());</code></pre>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <a href="https://playground.babylonjs.com" style="color:var(--accent-light);">playground.babylonjs.com</a>에서 코드를 바로 실행해볼 수 있습니다. Babylon 에디터로 시각적으로 씬을 구성하고 코드를 export하는 것이 권장 방법입니다.</div>
      </div>`;
  }
};
