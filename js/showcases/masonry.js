import { loadScript } from '../utils.js';

export default {
  id: 'masonry',
  title: 'Masonry.js',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js');

    const heights = [120,180,100,200,140,160,90,210,130];
    const colors = ['#7c3aed','#6366f1','#06b6d4','#10b981','#f59e0b','#ef4444','#8b5cf6','#0891b2','#059669'];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">레이아웃</span>
            <h2 class="sp-title">Masonry.js</h2>
            <p class="sp-desc">Pinterest 스타일의 벽돌 쌓기 그리드 레이아웃. 다양한 높이의 아이템을 최적으로 배치하며 반응형을 기본 지원합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i masonry-layout</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div id="ms-grid" style="max-width:520px;margin:0 auto;">
            ${heights.map((h,i)=>`
              <div class="ms-item" style="width:calc(33.3% - 8px);margin-bottom:10px;float:left;margin-right:10px;background:${colors[i]};border-radius:10px;height:${h}px;display:flex;align-items:center;justify-content:center;">
                <span style="color:rgba(255,255,255,0.8);font-size:12px;font-weight:600;">${i+1}</span>
              </div>`).join('')}
          </div>
          <div style="clear:both;"></div>
          <div class="demo-controls">
            <button class="demo-btn sec" id="ms-add">아이템 추가</button>
            <button class="demo-btn sec" id="ms-2col">2열</button>
            <button class="demo-btn sec" id="ms-3col">3열</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new Masonry(container, { itemSelector, columnWidth, gutter })</code>로 초기화. 이미지 로드 후 레이아웃이 틀어지면 imagesLoaded와 함께 사용합니다.</div>
      </div>`;

    let colW = 'calc(33.3% - 8px)';
    let msnry = new window.Masonry('#ms-grid', { itemSelector: '.ms-item', columnWidth: '.ms-item', gutter: 10, percentPosition: true });

    let count = 10;
    document.getElementById('ms-add').onclick = () => {
      const el = document.createElement('div');
      el.className = 'ms-item';
      const h = 80 + Math.floor(Math.random() * 140);
      el.style.cssText = `width:${colW};margin-bottom:10px;float:left;margin-right:10px;background:hsl(${Math.random()*360|0},65%,60%);border-radius:10px;height:${h}px;display:flex;align-items:center;justify-content:center;`;
      el.innerHTML = `<span style="color:rgba(255,255,255,0.8);font-size:12px;font-weight:600;">${count++}</span>`;
      document.getElementById('ms-grid').appendChild(el);
      msnry.appended(el);
    };

    const setCol = (w, label) => {
      colW = w;
      document.querySelectorAll('.ms-item').forEach(el => el.style.width = w);
      msnry.layout();
    };
    document.getElementById('ms-2col').onclick = () => setCol('calc(50% - 6px)');
    document.getElementById('ms-3col').onclick = () => setCol('calc(33.3% - 8px)');
  }
};
