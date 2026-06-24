export default {
  id: 'spline',
  title: 'Spline',
  async init(container) {
    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">3D / WebGL</span>
            <h2 class="sp-title">Spline</h2>
            <p class="sp-desc">코딩 없이 3D 인터랙티브 씬을 만들고 웹에 embed하는 디자인 도구. Figma처럼 쓰면서 3D 결과물을 웹사이트에 바로 삽입할 수 있습니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">web</span><code>spline.design</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i @splinetool/runtime</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:0;overflow:hidden;border-radius:12px;background:#050508;min-height:320px;">
          <iframe src="https://my.spline.design/untitled-eb4a0a49e97ef3b3e70fb32f78a1fc4c/"
            frameborder="0" width="100%" height="320"
            title="Spline 3D Scene"
            style="display:block;border:none;"
            loading="lazy">
          </iframe>
        </div>
        <div style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:12px;padding:20px;margin-top:16px;">
          <p style="font-size:12px;color:var(--accent-light);font-weight:600;margin-bottom:10px;">웹사이트에 embed하는 방법</p>
          <pre style="font-size:12px;color:var(--text-muted);line-height:1.8;overflow-x:auto;"><code>&lt;!-- 방법 1: iframe (가장 간단) --&gt;
&lt;iframe src="https://my.spline.design/YOUR-SCENE-ID/"
  frameborder="0" width="100%" height="400"&gt;&lt;/iframe&gt;

&lt;!-- 방법 2: @splinetool/runtime (제어 가능) --&gt;
import { Application } from '@splinetool/runtime';
const spline = new Application(canvas);
await spline.load('https://prod.spline.design/YOUR-ID/scene.splinecode');</code></pre>
        </div>
        <div class="sp-note" style="margin-top:12px;"><strong>핵심:</strong> Spline 앱에서 3D 씬 제작 → Export → Web Embed 코드 복사. 마우스 인터랙션, 이벤트 트리거도 노코드로 설정 가능합니다.</div>
      </div>`;
  }
};
