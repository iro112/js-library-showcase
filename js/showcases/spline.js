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
        <div class="sp-demo-wrap" style="padding:0;overflow:hidden;border-radius:12px;background:#050508;min-height:320px;display:flex;align-items:center;justify-content:center;">
          <canvas id="sp-canvas" style="width:100%;display:block;"></canvas>
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

    // Spline 스타일 CSS 3D 데모
    const canvas = document.getElementById('sp-canvas');
    const W = canvas.parentElement.clientWidth || 600;
    const H = 320;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    let t = 0;
    const spheres = [
      { x: W*0.3, y: H*0.45, r: 70, color: '#7c3aed', phase: 0 },
      { x: W*0.65, y: H*0.5, r: 50, color: '#06b6d4', phase: 1.2 },
      { x: W*0.5, y: H*0.3, r: 35, color: '#a78bfa', phase: 2.4 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, W, H);

      // 배경 그리드
      ctx.strokeStyle = 'rgba(124,58,237,0.12)';
      ctx.lineWidth = 1;
      for (let i = 0; i < W; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
      for (let j = 0; j < H; j += 40) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke(); }

      // 구체들
      spheres.forEach(s => {
        const yOff = Math.sin(t + s.phase) * 12;
        const grad = ctx.createRadialGradient(s.x - s.r*0.3, s.y + yOff - s.r*0.3, s.r*0.1, s.x, s.y + yOff, s.r);
        grad.addColorStop(0, s.color + 'ff');
        grad.addColorStop(0.5, s.color + 'aa');
        grad.addColorStop(1, s.color + '11');
        ctx.beginPath();
        ctx.arc(s.x, s.y + yOff, s.r, 0, Math.PI*2);
        ctx.fillStyle = grad;
        ctx.fill();
        // 그림자
        ctx.beginPath();
        ctx.ellipse(s.x, s.y + s.r*0.9 + yOff*0.3 + 10, s.r*0.6, s.r*0.15, 0, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fill();
      });

      // Spline 워터마크 스타일 텍스트
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(124,58,237,0.5)';
      ctx.fillText('Spline-style 3D preview (canvas demo)', 12, H - 14);

      t += 0.018;
      requestAnimationFrame(draw);
    };
    draw();
  }
};
