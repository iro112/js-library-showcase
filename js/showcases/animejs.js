import { loadScript } from '../utils.js';

export default {
  id: 'animejs',
  title: 'Anime.js',
  async init(container) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js');
    const anime = window.anime;

    const SIZE = 6;
    const colors = ['#7c3aed','#6366f1','#8b5cf6','#a78bfa','#06b6d4','#10b981'];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">애니메이션</span>
            <h2 class="sp-title">Anime.js</h2>
            <p class="sp-desc">가볍고 유연한 JS 애니메이션 라이브러리. SVG 패스 애니메이션, 타임라인, CSS 변환 모두 지원하며 문법이 직관적입니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i animejs</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>cdnjs.cloudflare.com</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div id="anime-grid" style="display:grid;grid-template-columns:repeat(${SIZE},1fr);gap:8px;max-width:300px;margin:0 auto 20px;">
            ${Array.from({length:SIZE*SIZE},(_,i)=>`<div class="an-dot" style="height:36px;border-radius:6px;background:${colors[i%colors.length]};opacity:0.3;"></div>`).join('')}
          </div>
          <div class="demo-controls">
            <button class="demo-btn" id="an-wave">Wave</button>
            <button class="demo-btn sec" id="an-scatter">Scatter</button>
            <button class="demo-btn sec" id="an-reset">Reset</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>anime.stagger()</code>로 격자 요소에 delay를 자동 분배. SVG의 <code>strokeDashoffset</code> 애니메이션도 자주 사용됩니다.</div>
      </div>`;

    const dots = container.querySelectorAll('.an-dot');

    document.getElementById('an-wave').onclick = () => {
      anime({ targets: dots, translateY: anime.stagger(6, {grid:[SIZE,SIZE], from:'center', axis:'y'}),
        scale: anime.stagger([1.4,0.8], {grid:[SIZE,SIZE], from:'center'}),
        opacity: 1, duration: 800, easing: 'easeInOutSine', delay: anime.stagger(60, {grid:[SIZE,SIZE], from:'center'}) });
    };

    document.getElementById('an-scatter').onclick = () => {
      anime({ targets: dots,
        translateX: () => anime.random(-80, 80),
        translateY: () => anime.random(-60, 60),
        scale: () => anime.random(0.4, 1.6) * 0.1 + 0.8,
        opacity: [0.2, 1],
        duration: 700, easing: 'easeOutExpo', delay: anime.stagger(20) });
    };

    document.getElementById('an-reset').onclick = () => {
      anime({ targets: dots, translateX: 0, translateY: 0, scale: 1, opacity: 0.3, duration: 500, easing: 'easeOutCubic' });
    };
  }
};
