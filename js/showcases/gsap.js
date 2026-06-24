import { loadScript } from '../utils.js';

export default {
  id: 'gsap',
  title: 'GSAP',
  async init(container) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
    const { gsap } = window;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">애니메이션</span>
            <h2 class="sp-title">GSAP</h2>
            <p class="sp-desc">업계 표준 JS 애니메이션 엔진. 타임라인으로 복잡한 시퀀스를 직관적으로 제어합니다. 성능이 매우 뛰어나고 거의 모든 속성 애니메이션이 가능합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i gsap</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>cdnjs / gsap.com</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div id="gsap-stage" style="display:flex;gap:16px;justify-content:center;align-items:center;min-height:160px;flex-wrap:wrap;">
            ${[0,1,2,3,4].map(i=>`<div class="gsap-box" style="width:60px;height:60px;border-radius:12px;background:hsl(${i*50+220},70%,60%);"></div>`).join('')}
          </div>
          <div class="demo-controls">
            <button class="demo-btn" id="gsap-play">Timeline Play</button>
            <button class="demo-btn sec" id="gsap-stagger">Stagger</button>
            <button class="demo-btn sec" id="gsap-reset">Reset</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>gsap.timeline()</code>으로 여러 애니메이션을 순차/동시 실행. <code>stagger</code>로 요소 간 시차를 줍니다.</div>
      </div>`;

    const boxes = container.querySelectorAll('.gsap-box');

    document.getElementById('gsap-play').onclick = () => {
      const tl = gsap.timeline();
      tl.to(boxes, { y: -40, duration: 0.4, stagger: 0.1, ease: 'power2.out' })
        .to(boxes, { rotate: 360, duration: 0.5, stagger: 0.08 })
        .to(boxes, { scale: 1.3, duration: 0.3, stagger: 0.06, ease: 'back.out(2)' })
        .to(boxes, { y: 0, scale: 1, rotate: 0, duration: 0.5, stagger: 0.06, ease: 'bounce.out' });
    };

    document.getElementById('gsap-stagger').onclick = () => {
      gsap.fromTo(boxes, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' });
    };

    document.getElementById('gsap-reset').onclick = () => {
      gsap.set(boxes, { clearProps: 'all' });
    };
  }
};
