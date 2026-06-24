import { loadScript } from '../utils.js';

export default {
  id: 'velocityjs',
  title: 'Velocity.js',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/velocity-animate@1.5.2/velocity.min.js');
    const Velocity = window.Velocity;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">애니메이션</span>
            <h2 class="sp-title">Velocity.js</h2>
            <p class="sp-desc">jQuery 없이 동작하는 고성능 DOM 애니메이션 라이브러리. jQuery의 .animate()보다 훨씬 빠르며, CSS와 JS 애니메이션을 통합합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i velocity-animate</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;">
          <div id="vel-box" style="width:80px;height:80px;background:var(--accent);border-radius:16px;margin:0 auto 24px;"></div>
          <div class="demo-controls">
            <button class="demo-btn" id="vel-seq">시퀀스 실행</button>
            <button class="demo-btn sec" id="vel-loop">루프</button>
            <button class="demo-btn sec" id="vel-stop">정지</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> jQuery의 <code>.animate()</code>를 대체하며 훨씬 빠릅니다. <code>queue</code> 옵션으로 연속 애니메이션을 체이닝할 수 있습니다.</div>
      </div>`;

    const box = document.getElementById('vel-box');
    let looping = false;

    document.getElementById('vel-seq').onclick = () => {
      looping = false;
      Velocity(box, { translateX: 0, translateY: 0, scale: 1, borderRadius: '16px', backgroundColor: '#7c3aed' }, { duration: 0 });
      Velocity(box, { translateX: 120, rotateZ: 90 }, { duration: 400, easing: 'easeInOutQuad' });
      Velocity(box, { scale: 1.5, backgroundColor: '#06b6d4', borderRadius: '50%' }, { duration: 300 });
      Velocity(box, { translateY: -60 }, { duration: 250, easing: 'easeOutCubic' });
      Velocity(box, { translateY: 0, scale: 1, translateX: 0, rotateZ: 0, borderRadius: '16px', backgroundColor: '#7c3aed' }, { duration: 500, easing: 'spring' });
    };

    const loop = () => {
      if (!looping) return;
      Velocity(box, { rotateZ: 360 }, { duration: 800, easing: 'linear', complete: () => {
        Velocity(box, { rotateZ: 0 }, { duration: 0, complete: loop });
      }});
    };

    document.getElementById('vel-loop').onclick = () => { looping = true; loop(); };
    document.getElementById('vel-stop').onclick = () => {
      looping = false;
      Velocity(box, 'stop');
      Velocity(box, { translateX: 0, translateY: 0, scale: 1, rotateZ: 0, backgroundColor: '#7c3aed', borderRadius: '16px' }, { duration: 300 });
    };
  }
};
