import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'splittingjs',
  title: 'Splitting.js',
  async init(container) {
    await loadStyle('https://cdn.jsdelivr.net/npm/splitting@1.0.6/dist/splitting.css');
    await loadScript('https://cdn.jsdelivr.net/npm/splitting@1.0.6/dist/splitting.min.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">텍스트 효과</span>
            <h2 class="sp-title">Splitting.js</h2>
            <p class="sp-desc">텍스트와 요소를 분리하고 CSS 변수(--char-index)를 자동 설정해줍니다. CSS animation만으로 복잡한 텍스트 효과를 구현할 수 있습니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i splitting</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;">
          <style>
            .sp-wave span.char { display:inline-block; animation: sp-wave-anim 1.5s ease-in-out infinite; animation-delay: calc(var(--char-index) * 0.06s); }
            @keyframes sp-wave-anim { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
            .sp-rainbow span.char { display:inline-block; color: hsl(calc(var(--char-index) * 25), 70%, 65%); transition: transform .2s; }
            .sp-rainbow span.char:hover { transform: scale(1.5) rotate(-10deg); }
            .sp-fade span.char { display:inline-block; opacity:0; animation: sp-fade-in .5s forwards; animation-delay: calc(var(--char-index) * 0.04s); }
            @keyframes sp-fade-in { to{opacity:1;transform:translateY(0)} from{transform:translateY(20px)} }
          </style>
          <div style="display:flex;flex-direction:column;gap:28px;margin:16px 0;">
            <div>
              <p style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">Wave 효과 (CSS animation)</p>
              <p class="sp-wave" data-splitting style="font-size:28px;font-weight:700;">Splitting.js</p>
            </div>
            <div>
              <p style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">Rainbow Hover (CSS hsl)</p>
              <p class="sp-rainbow" data-splitting style="font-size:28px;font-weight:700;cursor:pointer;">UX/UI 디자인</p>
            </div>
            <div id="sp-fade-wrap">
              <p style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">Fade In (버튼으로 재실행)</p>
              <p id="sp-fade-el" data-splitting style="font-size:28px;font-weight:700;">JavaScript</p>
            </div>
          </div>
          <div class="demo-controls">
            <button class="demo-btn sec" id="sp-replay">Fade 다시 재생</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>Splitting()</code> 호출 후 각 글자에 <code>--char-index</code> CSS 변수가 설정됩니다. <code>animation-delay: calc(var(--char-index) * 0.05s)</code>으로 스태거 효과를 순수 CSS로 구현합니다.</div>
      </div>`;

    window.Splitting();

    document.getElementById('sp-replay').onclick = () => {
      const el = document.getElementById('sp-fade-el');
      el.querySelectorAll('.char').forEach(c => { c.style.animation = 'none'; c.offsetHeight; c.style.animation = ''; });
    };
  }
};
