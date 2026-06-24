import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'cropperjs',
  title: 'Cropper.js',
  async init(container) {
    await loadStyle('https://cdn.jsdelivr.net/npm/cropperjs@1.6.1/dist/cropper.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/cropperjs@1.6.1/dist/cropper.min.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">이미지 & 미디어</span>
            <h2 class="sp-title">Cropper.js</h2>
            <p class="sp-desc">이미지 크롭 인터페이스. 드래그로 영역 선택, 회전, 확대/축소, 비율 고정을 지원합니다. 프로필 이미지 업로드, 썸네일 생성에 필수입니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i cropperjs</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div style="display:grid;grid-template-columns:1fr auto;gap:20px;align-items:start;">
            <div style="max-height:260px;overflow:hidden;border-radius:10px;">
              <img id="cp-img" src="https://picsum.photos/seed/42/600/400" alt="crop target" style="max-width:100%;display:block;">
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;min-width:120px;">
              <p style="font-size:11px;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">미리보기</p>
              <div id="cp-preview" style="width:100px;height:100px;overflow:hidden;border-radius:50%;border:2px solid var(--border);"></div>
              <button class="demo-btn sec" id="cp-rotate" style="font-size:12px;">90° 회전</button>
              <button class="demo-btn sec" id="cp-flip" style="font-size:12px;">좌우 반전</button>
              <button class="demo-btn" id="cp-crop" style="font-size:12px;">크롭 확인</button>
            </div>
          </div>
          <div id="cp-result" style="margin-top:14px;display:none;">
            <p style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">크롭 결과:</p>
            <img id="cp-output" style="max-width:200px;border-radius:8px;border:1px solid var(--border);">
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new Cropper(img, { aspectRatio, preview })</code>로 초기화. <code>cropper.getCroppedCanvas().toDataURL()</code>로 크롭된 이미지를 Base64로 받아 업로드합니다.</div>
      </div>`;

    // 외부 이미지 의존성 없이 Canvas로 데모 이미지 생성
    const makeImg = (w, h, hue) => {
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, `hsl(${hue},60%,18%)`); g.addColorStop(1, `hsl(${hue+50},60%,28%)`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      [0,1,2,3,4].forEach(i => {
        ctx.beginPath(); ctx.arc(w*(0.15+i*0.18), h*0.5, 35+i*12, 0, Math.PI*2);
        ctx.fillStyle = `hsla(${hue+i*40},80%,65%,0.35)`; ctx.fill();
      });
      ctx.beginPath(); ctx.arc(w*0.5, h*0.35, 60, 0, Math.PI*2);
      ctx.fillStyle = `hsla(${hue+20},90%,75%,0.25)`; ctx.fill();
      ctx.font = 'bold 18px sans-serif'; ctx.fillStyle = `hsla(0,0%,100%,0.4)`;
      ctx.textAlign = 'center'; ctx.fillText('Crop Demo', w/2, h-16);
      return c.toDataURL();
    };
    document.getElementById('cp-img').src = makeImg(600, 400, 260);

    const cropper = new window.Cropper(document.getElementById('cp-img'), {
      aspectRatio: 1,
      preview: '#cp-preview',
      viewMode: 1,
      dragMode: 'move',
    });

    document.getElementById('cp-rotate').onclick = () => cropper.rotate(90);
    document.getElementById('cp-flip').onclick = () => cropper.scaleX(cropper.getData().scaleX * -1 || -1);
    document.getElementById('cp-crop').onclick = () => {
      const canvas = cropper.getCroppedCanvas({ width: 200, height: 200 });
      const out = document.getElementById('cp-output');
      out.src = canvas.toDataURL();
      document.getElementById('cp-result').style.display = 'block';
    };
  }
};
