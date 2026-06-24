import { loadScript } from '../utils.js';

export default {
  id: 'scrollreveal',
  title: 'ScrollReveal',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/scrollreveal@4.0.9/dist/scrollreveal.min.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">스크롤</span>
            <h2 class="sp-title">ScrollReveal</h2>
            <p class="sp-desc">스크롤 시 요소를 부드럽게 등장시키는 라이브러리. JS API로 AOS보다 세밀하게 제어하며 CSS 클래스 없이 JS만으로 동작합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i scrollreveal</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:0;border-radius:12px;overflow:hidden;">
          <div id="sr-scroller" class="demo-scroll" style="padding:24px;">
            <p style="text-align:center;color:var(--text-muted);font-size:12px;margin-bottom:20px;">↓ 스크롤하면 요소가 등장합니다</p>
            <div style="display:flex;flex-direction:column;gap:14px;">
              <div class="sr-item" style="padding:20px;background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;">
                <div style="height:3px;width:60px;background:#7c3aed;border-radius:2px;margin-bottom:8px;"></div>
                <p style="font-size:13px;">origin: 'left' — 왼쪽에서 슬라이드</p>
              </div>
              <div class="sr-item2" style="padding:20px;background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;text-align:right;">
                <div style="height:3px;width:60px;background:#06b6d4;border-radius:2px;margin-bottom:8px;margin-left:auto;"></div>
                <p style="font-size:13px;">origin: 'right' — 오른쪽에서 슬라이드</p>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
                ${[0,1,2].map(i=>`<div class="sr-grid" style="padding:16px;background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;text-align:center;"><div style="width:28px;height:28px;border-radius:50%;background:hsl(${250+i*30},70%,65%);margin:0 auto 8px;"></div><p style="font-size:12px;color:var(--text-muted);">delay ${i*100}ms</p></div>`).join('')}
              </div>
              <div class="sr-scale" style="padding:20px;background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;text-align:center;">
                <p style="font-size:13px;">scale + opacity 조합</p>
              </div>
            </div>
            <div style="height:40px;"></div>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>ScrollReveal({ origin, distance, duration, delay })</code>로 전역 설정 후 <code>.reveal(selector)</code>로 적용합니다.</div>
      </div>`;

    const sr = window.ScrollReveal({ container: '#sr-scroller', reset: true });
    sr.reveal('.sr-item',  { origin: 'left',   distance: '40px', duration: 600, delay: 0 });
    sr.reveal('.sr-item2', { origin: 'right',  distance: '40px', duration: 600, delay: 0 });
    sr.reveal('.sr-grid',  { origin: 'bottom', distance: '30px', duration: 500, interval: 120 });
    sr.reveal('.sr-scale', { scale: 0.7, duration: 600 });
  }
};
