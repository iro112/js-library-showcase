import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'viewerjs',
  title: 'Viewer.js',
  async init(container) {
    await loadStyle('https://cdn.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.js');

    const makeImg = (w, h, hue) => {
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, `hsl(${hue},65%,15%)`); g.addColorStop(1, `hsl(${hue+60},65%,28%)`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      [0,1,2].forEach(i => {
        ctx.beginPath(); ctx.arc(w*(0.25+i*0.25), h*0.5, 50+i*20, 0, Math.PI*2);
        ctx.fillStyle = `hsla(${hue+i*50},80%,65%,0.3)`; ctx.fill();
      });
      ctx.font = 'bold 22px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.textAlign = 'center'; ctx.fillText(`Image ${hue%60+1}`, w/2, h-20);
      return c.toDataURL();
    };

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">이미지 & 미디어</span>
            <h2 class="sp-title">Viewer.js</h2>
            <p class="sp-desc">이미지 뷰어 라이브러리. 확대/축소, 회전, 반전, 전체화면, 슬라이드쇼가 내장됩니다. 갤러리와 함께 사용하면 인스타그램 스타일 뷰어를 구현할 수 있습니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i viewerjs</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;text-align:center;">이미지를 클릭하면 뷰어가 열립니다 (확대/회전/슬라이드쇼 지원)</p>
          <ul id="vj-gallery" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;list-style:none;">
            ${Array.from({length:6}, (_,i) => `
              <li>
                <img data-idx="${i}" alt="gallery ${i+1}"
                  style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:8px;cursor:zoom-in;transition:opacity .2s;background:var(--bg-elevated);"
                  onmouseover="this.style.opacity='.7'" onmouseout="this.style.opacity='1'">
              </li>`).join('')}
          </ul>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new Viewer(container, { inline, toolbar, navbar })</code>로 초기화. 뷰어 안에서 확대/회전/슬라이드쇼/전체화면 모두 내장된 UI로 제어 가능합니다.</div>
      </div>`;

    // innerHTML 후 DOM에서 src 주입 (data URI가 template literal에 들어가지 않도록)
    container.querySelectorAll('#vj-gallery img').forEach(img => {
      const i = parseInt(img.dataset.idx);
      img.src = makeImg(600, 400, 200 + i * 30);
    });

    new window.Viewer(document.getElementById('vj-gallery'), {
      inline: false, toolbar: true, navbar: true, title: true,
      transition: true, movable: true, zoomable: true, rotatable: true, scalable: true
    });
  }
};
