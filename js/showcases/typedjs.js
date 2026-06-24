import { loadScript } from '../utils.js';

export default {
  id: 'typedjs',
  title: 'Typed.js',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">텍스트 효과</span>
            <h2 class="sp-title">Typed.js</h2>
            <p class="sp-desc">타이핑 효과를 구현하는 라이브러리. 여러 문자열을 순서대로 타이핑/삭제하며 반복합니다. 히어로 섹션 부제목에 자주 사용됩니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i typed.js</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;">
          <div style="margin:20px 0 32px;">
            <p style="font-size:16px;color:var(--text-muted);margin-bottom:10px;">저는</p>
            <p style="font-size:28px;font-weight:700;min-height:44px;">
              <span id="typed-el"></span>
            </p>
          </div>
          <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:18px;max-width:400px;margin:0 auto;text-align:left;">
            <pre style="font-size:12px;color:var(--text-muted);line-height:1.8;"><code>new Typed('#element', {
  strings: ['UX 디자이너', '프론트엔드 개발자'],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true
});</code></pre>
          </div>
          <div class="demo-controls">
            <button class="demo-btn sec" id="ty-fast">빠르게</button>
            <button class="demo-btn sec" id="ty-slow">느리게</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>strings</code> 배열로 여러 문장을 순환. <code>typeSpeed</code>, <code>backSpeed</code>로 속도 조절. <code>cursorChar</code>로 커서 모양도 변경 가능합니다.</div>
      </div>`;

    let typed;
    const strings = ['UX/UI 디자이너입니다', '프론트엔드 개발자입니다', 'JS 라이브러리를 공부합니다', 'Three.js를 배우고 있습니다', 'GSAP을 좋아합니다'];

    const start = (speed = 60) => {
      if (typed) typed.destroy();
      typed = new window.Typed('#typed-el', { strings, typeSpeed: speed, backSpeed: speed * 0.6, loop: true, backDelay: 1500, startDelay: 300 });
    };

    start();
    document.getElementById('ty-fast').onclick = () => start(25);
    document.getElementById('ty-slow').onclick = () => start(100);
  }
};
