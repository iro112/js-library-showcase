import { loadScript } from '../utils.js';

export default {
  id: 'packery',
  title: 'Packery',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/packery@2.1.2/dist/packery.pkgd.min.js');

    const items = [
      {w:'200px',h:'120px',color:'#7c3aed',label:'A'},
      {w:'120px',h:'200px',color:'#06b6d4',label:'B'},
      {w:'120px',h:'120px',color:'#10b981',label:'C'},
      {w:'120px',h:'80px', color:'#f59e0b',label:'D'},
      {w:'200px',h:'80px', color:'#ef4444',label:'E'},
      {w:'120px',h:'120px',color:'#8b5cf6',label:'F'},
    ];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">레이아웃</span>
            <h2 class="sp-title">Packery</h2>
            <p class="sp-desc">Masonry의 확장판. 드래그로 배치를 직접 바꿀 수 있는 그리드 레이아웃입니다. 대시보드 위젯 배치, 블록 에디터에 활용됩니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i packery</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <p style="font-size:12px;color:var(--text-muted);text-align:center;margin-bottom:14px;">블록을 드래그해서 배치를 바꿔보세요</p>
          <div id="pk-grid" style="max-width:480px;margin:0 auto;">
            ${items.map(it=>`
              <div class="pk-item" style="width:${it.w};height:${it.h};float:left;margin:4px;background:${it.color};border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;font-weight:700;cursor:grab;user-select:none;">${it.label}</div>`).join('')}
          </div>
          <div style="clear:both;"></div>
          <div class="demo-controls">
            <button class="demo-btn sec" id="pk-layout">레이아웃 재계산</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> Draggabilly와 연동하면 각 아이템을 드래그해 자유롭게 재배치할 수 있습니다. Masonry가 위에서 아래로 쌓는다면, Packery는 2D 공간을 최대한 채우는 방식으로 배치합니다.</div>
      </div>`;

    const pckry = new window.Packery('#pk-grid', {
      itemSelector: '.pk-item', gutter: 8
    });

    pckry.getItemElements().forEach(el => {
      el.addEventListener('mousedown', () => { el.style.opacity = '0.8'; el.style.cursor = 'grabbing'; });
      el.addEventListener('mouseup', () => { el.style.opacity = '1'; el.style.cursor = 'grab'; });
    });

    document.getElementById('pk-layout').onclick = () => pckry.layout();
  }
};
