import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'glightbox',
  title: 'GLightbox',
  async init(container) {
    await loadStyle('https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/css/glightbox.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/js/glightbox.min.js');

    const makeImg = (w, h, hue) => {
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, `hsl(${hue},60%,15%)`); g.addColorStop(1, `hsl(${hue+50},60%,28%)`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      [0,1,2,3].forEach(i => {
        ctx.beginPath(); ctx.arc(w*(0.2+i*0.2), h*0.5, 30+i*15, 0, Math.PI*2);
        ctx.fillStyle = `hsla(${hue+i*45},85%,65%,0.3)`; ctx.fill();
      });
      ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.textAlign = 'center'; ctx.fillText(`Photo ${hue%60+1}`, w/2, h-14);
      return c.toDataURL();
    };

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">이미지 & 미디어</span>
            <h2 class="sp-title">GLightbox</h2>
            <p class="sp-desc">모던한 이미지/영상 라이트박스. YouTube, Vimeo, 인라인 HTML도 지원하며 터치 스와이프와 키보드 네비게이션이 내장됩니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i glightbox</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;text-align:center;">이미지를 클릭하면 라이트박스가 열립니다</p>
          <div id="gl-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
            ${Array.from({length:8}, (_,i) => `
              <a data-idx="${i}" class="glightbox" data-description="사진 ${i+1}" style="display:block;border-radius:8px;overflow:hidden;aspect-ratio:4/3;background:var(--bg-elevated);">
                <img data-idx="${i}" alt="photo ${i+1}" style="width:100%;height:100%;object-fit:cover;transition:transform .3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              </a>`).join('')}
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>&lt;a class="glightbox" href="image.jpg"&gt;</code>에 클래스만 추가하고 <code>GLightbox()</code>로 초기화하면 끝. 갤러리 그룹핑, 캡션, 영상 모두 같은 방식으로 처리합니다.</div>
      </div>`;

    // data URI를 DOM에 직접 주입
    container.querySelectorAll('#gl-grid img').forEach(img => {
      const i = parseInt(img.dataset.idx);
      const uri = makeImg(800, 600, 190 + i * 25);
      img.src = uri;
      img.closest('a').href = uri;
    });

    window.GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
  }
};
