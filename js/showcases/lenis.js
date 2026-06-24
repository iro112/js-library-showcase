import { loadScript } from '../utils.js';

export default {
  id: 'lenis',
  title: 'Lenis',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">스크롤</span>
            <h2 class="sp-title">Lenis</h2>
            <p class="sp-desc">부드러운 관성 스크롤을 구현하는 초경량 라이브러리. 스크롤에 고급스러운 무게감과 여운을 추가해 프리미엄 느낌을 줍니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i lenis</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">size</span><code>~4KB (gzipped)</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:0;overflow:hidden;border-radius:12px;">
          <div id="lenis-wrap" style="height:420px;overflow-y:scroll;position:relative;">
            <div id="lenis-content">
              ${Array.from({length:8},(_,i)=>`
                <div style="padding:40px 32px;border-bottom:1px solid var(--border);background:${i%2?'var(--bg-elevated)':'var(--bg-surface)'};">
                  <div style="width:${40+i*10}px;height:4px;background:hsl(${240+i*15},70%,60%);border-radius:2px;margin-bottom:10px;"></div>
                  <h3 style="font-size:16px;margin-bottom:6px;">섹션 ${i+1}</h3>
                  <p style="color:var(--text-muted);font-size:13px;">Lenis가 적용된 부드러운 스크롤. 마우스 휠로 스크롤해보세요.</p>
                </div>`).join('')}
            </div>
          </div>
        </div>
        <div style="display:flex;gap:8px;margin-top:12px;align-items:center;flex-wrap:wrap;">
          <span style="font-size:12px;color:var(--text-muted);">easing:</span>
          <button class="demo-btn sec" id="l-linear" style="font-size:12px;padding:6px 12px;">Linear (기본)</button>
          <button class="demo-btn sec" id="l-expo" style="font-size:12px;padding:6px 12px;">Expo (부드럽게)</button>
        </div>
        <div class="sp-note" style="margin-top:12px;"><strong>핵심:</strong> <code>new Lenis({ lerp, duration, easing })</code>로 초기화 후 <code>requestAnimationFrame</code>에서 <code>lenis.raf(time)</code>을 호출합니다.</div>
      </div>`;

    const Lenis = window.Lenis;
    let lenis;
    let raf;

    const startLenis = (easing) => {
      if (lenis) { lenis.destroy(); cancelAnimationFrame(raf); }
      lenis = new Lenis({
        wrapper: document.getElementById('lenis-wrap'),
        content: document.getElementById('lenis-content'),
        duration: 1.2,
        easing: easing,
        orientation: 'vertical',
        smoothWheel: true
      });
      const animate = (t) => { lenis.raf(t); raf = requestAnimationFrame(animate); };
      raf = requestAnimationFrame(animate);
    };

    startLenis(t => Math.min(1, 1.001 - Math.pow(2, -10 * t)));

    document.getElementById('l-linear').onclick = () => startLenis(t => t);
    document.getElementById('l-expo').onclick = () => startLenis(t => Math.min(1, 1.001 - Math.pow(2, -10 * t)));
  }
};
