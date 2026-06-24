import { loadScript } from '../utils.js';

export default {
  id: 'autoanimate',
  title: 'AutoAnimate',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/@formkit/auto-animate@0.8.2/index.umd.min.js');
    const autoAnimate = window.autoAnimate.default || window.autoAnimate;

    const items = ['디자인 시스템', 'GSAP 실습', 'Three.js 탐구', 'CSS Grid', 'Figma 플러그인'];
    let list = [...items];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">애니메이션</span>
            <h2 class="sp-title">AutoAnimate</h2>
            <p class="sp-desc">단 한 줄의 코드로 DOM 변경 시 자동으로 애니메이션을 추가합니다. 요소 추가/제거/정렬에 부드러운 전환이 생깁니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i @formkit/auto-animate</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">size</span><code>~2.5KB (gzipped)</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <ul id="aa-list" style="list-style:none;max-width:380px;margin:0 auto;display:flex;flex-direction:column;gap:8px;"></ul>
          <div class="demo-controls">
            <button class="demo-btn" id="aa-add">항목 추가</button>
            <button class="demo-btn sec" id="aa-remove">맨 위 제거</button>
            <button class="demo-btn sec" id="aa-shuffle">셔플</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>autoAnimate(listElement)</code> 한 줄만 호출하면 끝. React/Vue/Svelte 모두 지원하며 <code>useAutoAnimate()</code> 훅도 제공합니다.</div>
      </div>`;

    const ul = document.getElementById('aa-list');
    autoAnimate(ul);

    const render = () => {
      ul.innerHTML = '';
      list.forEach((text, i) => {
        const li = document.createElement('li');
        li.textContent = text;
        li.style.cssText = `padding:12px 16px;background:var(--bg-surface);border:1px solid var(--border);border-radius:8px;font-size:13px;cursor:pointer;color:var(--text);`;
        li.onclick = () => { list.splice(i, 1); render(); };
        ul.appendChild(li);
      });
    };
    render();

    let counter = items.length + 1;
    document.getElementById('aa-add').onclick = () => {
      list.unshift(`새 항목 ${counter++}`); render();
    };
    document.getElementById('aa-remove').onclick = () => {
      if (list.length) { list.shift(); render(); }
    };
    document.getElementById('aa-shuffle').onclick = () => {
      list = list.sort(() => Math.random() - 0.5); render();
    };
  }
};
