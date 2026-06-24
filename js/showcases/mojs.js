import { loadScript } from '../utils.js';

export default {
  id: 'mojs',
  title: 'mo.js',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/@mojs/core@1.7.1/dist/mo.umd.js');
    const mojs = window.mojs;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">텍스트 효과</span>
            <h2 class="sp-title">mo.js</h2>
            <p class="sp-desc">모션 그래픽 특화 애니메이션 라이브러리. Burst(방사형), Shape(도형), Trail 등 독특한 효과를 제공합니다. 버튼 클릭 피드백 애니메이션에 특히 탁월합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i @mojs/core</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;min-height:280px;position:relative;">
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:28px;">버튼을 클릭해 폭발 효과를 확인하세요</p>
          <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;">
            <button class="demo-btn" id="mo-burst" style="position:relative;">Burst 효과</button>
            <button class="demo-btn sec" id="mo-circle" style="position:relative;">Circle Burst</button>
            <button class="demo-btn sec" id="mo-hearts" style="position:relative;">Hearts</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new mojs.Burst({ parent: el, radius: { 0: 60 }, count: 8 })</code>로 방사형 폭발 효과 생성. 각 파티클의 형태, 색상, 이동 경로를 세밀하게 설정합니다.</div>
      </div>`;

    const makeBurst = (parent, opts) => new mojs.Burst({ parent, ...opts });

    document.getElementById('mo-burst').onclick = function() {
      makeBurst(this, {
        radius: { 0: 80 }, count: 10, angle: { 0: 360 },
        children: { shape: 'circle', fill: ['#7c3aed','#a78bfa','#06b6d4','#10b981'], radius: { 5: 0 }, duration: 700, easing: 'quad.out' }
      }).generate().replay();
    };

    document.getElementById('mo-circle').onclick = function() {
      makeBurst(this, {
        radius: { 0: 70 }, count: 8,
        children: { shape: 'circle', fill: { '#7c3aed': '#06b6d4' }, stroke: 'none', radius: { 8: 0 }, duration: 600 }
      }).generate().replay();
      new mojs.Shape({ parent: this, shape: 'circle', fill: 'none', stroke: '#a78bfa', strokeWidth: { 20: 0 }, radius: { 0: 60 }, duration: 500, easing: 'quad.out' }).play();
    };

    document.getElementById('mo-hearts').onclick = function() {
      makeBurst(this, {
        radius: { 0: 90 }, count: 12, angle: { 0: 360 },
        children: { shape: 'cross', fill: { '#ef4444': '#f59e0b','#f59e0b': '#7c3aed' }, radius: { 12: 0 }, duration: 800, easing: 'cubic.out' }
      }).generate().replay();
    };
  }
};
