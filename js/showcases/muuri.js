import { loadScript } from '../utils.js';

export default {
  id: 'muuri',
  title: 'Muuri',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/muuri@0.9.5/dist/muuri.min.js');

    const cats = ['all', 'design', 'code', '3d'];
    const items = [
      {label:'Figma',cat:'design',color:'#f59e0b'},
      {label:'GSAP',cat:'code',color:'#7c3aed'},
      {label:'Three.js',cat:'3d',color:'#06b6d4'},
      {label:'CSS Grid',cat:'code',color:'#6366f1'},
      {label:'Spline',cat:'3d',color:'#10b981'},
      {label:'D3.js',cat:'code',color:'#ef4444'},
      {label:'Illustrator',cat:'design',color:'#f97316'},
      {label:'Blender',cat:'3d',color:'#06b6d4'},
      {label:'React',cat:'code',color:'#06b6d4'},
    ];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">레이아웃</span>
            <h2 class="sp-title">Muuri</h2>
            <p class="sp-desc">애니메이션, 필터링, 드래그 정렬이 통합된 그리드 레이아웃 라이브러리. 포트폴리오 필터, 이미지 갤러리, 대시보드 위젯 배치에 활용됩니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i muuri</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
            ${cats.map(c=>`<button class="demo-btn sec mu-filter" data-filter="${c}" style="font-size:12px;padding:6px 14px;">${c==='all'?'전체보기':c}</button>`).join('')}
          </div>
          <div id="mu-grid" style="position:relative;">
            ${items.map(it=>`
              <div class="mu-item" data-cat="${it.cat}" style="width:calc(33.3% - 8px);margin:4px;display:inline-block;">
                <div style="background:${it.color};border-radius:10px;padding:20px;text-align:center;color:#fff;font-size:13px;font-weight:600;">${it.label}</div>
              </div>`).join('')}
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>grid.filter(selector)</code>로 카테고리 필터링. 아이템 추가/제거/정렬 시 자동으로 레이아웃이 재계산되고 애니메이션이 적용됩니다.</div>
      </div>`;

    const grid = new window.Muuri('#mu-grid', {
      dragEnabled: true,
      items: '.mu-item',
      layout: { fillGaps: true }
    });

    document.querySelectorAll('.mu-filter').forEach(btn => {
      btn.onclick = () => {
        const f = btn.dataset.filter;
        grid.filter(f === 'all' ? () => true : el => el.getElement().dataset.cat === f);
      };
    });
  }
};
