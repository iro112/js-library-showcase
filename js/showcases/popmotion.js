export default {
  id: 'popmotion',
  title: 'Popmotion',
  async init(container) {
    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">애니메이션</span>
            <h2 class="sp-title">Popmotion</h2>
            <p class="sp-desc">Framer Motion의 핵심 애니메이션 엔진. spring, tween, decay 등의 물리 기반 애니메이션 프리미티브를 제공합니다. 현재는 Framer Motion 내부에 통합되었습니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i popmotion</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">note</span><code>Framer Motion 내부에 통합됨</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:16px;">
              <p style="font-size:11px;color:var(--accent-light);font-weight:600;margin-bottom:10px;">spring() — 스프링 물리</p>
              <pre style="font-size:11px;color:var(--text-muted);line-height:1.8;"><code>import { spring } from 'popmotion';

spring({
  from: 0,
  to: 100,
  stiffness: 400,
  damping: 10,
  onUpdate: v => {
    el.style.x = v + 'px';
  }
}).start();</code></pre>
            </div>
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:16px;">
              <p style="font-size:11px;color:var(--accent-light);font-weight:600;margin-bottom:10px;">animate() — 기본 트윈</p>
              <pre style="font-size:11px;color:var(--text-muted);line-height:1.8;"><code>import { animate } from 'popmotion';

animate({
  from: '#7c3aed',
  to: '#06b6d4',
  duration: 800,
  onUpdate: v => {
    el.style.background = v;
  }
});</code></pre>
            </div>
          </div>
          <div id="pm-demo" style="text-align:center;">
            <div id="pm-ball" style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a78bfa);margin:0 auto 24px;cursor:pointer;"></div>
            <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px;">Web Animations API로 스프링 물리 시연</p>
            <div class="demo-controls">
              <button class="demo-btn" id="pm-spring">Spring 바운스</button>
              <button class="demo-btn sec" id="pm-decay">Decay (감속)</button>
            </div>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> Popmotion은 Framer Motion의 기반 엔진입니다. Framer Motion을 통해 간접적으로 사용하거나, React 없이 순수 JS 환경에서 물리 기반 애니메이션이 필요할 때 직접 사용합니다.</div>
      </div>`;

    const ball = document.getElementById('pm-ball');

    document.getElementById('pm-spring').onclick = () => {
      ball.animate([
        { transform: 'scale(1) translateY(0)' },
        { transform: 'scale(0.8) translateY(40px)', offset: 0.3 },
        { transform: 'scale(1.3) translateY(-60px)', offset: 0.6 },
        { transform: 'scale(0.95) translateY(8px)', offset: 0.8 },
        { transform: 'scale(1) translateY(0)' }
      ], { duration: 700, easing: 'ease-out', fill: 'forwards' });
    };

    document.getElementById('pm-decay').onclick = () => {
      let pos = 0;
      const target = 160;
      ball.animate([
        { transform: `translateX(0)` },
        { transform: `translateX(${target}px)`, offset: 0.5, easing: 'ease-out' },
        { transform: `translateX(${target * 0.85}px)`, offset: 0.7 },
        { transform: `translateX(${target * 0.95}px)`, offset: 0.85 },
        { transform: `translateX(${target * 0.9}px)`, offset: 0.95 },
        { transform: `translateX(0)` }
      ], { duration: 1000, fill: 'forwards' });
    };
  }
};
