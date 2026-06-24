import { loadScript } from '../utils.js';

export default {
  id: 'sortablejs',
  title: 'SortableJS',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js');
    const Sortable = window.Sortable;

    const cols = {
      todo: ['디자인 시스템 구축', '애니메이션 기획', 'UI 컴포넌트 제작'],
      doing: ['Three.js 실습', 'GSAP 스터디'],
      done: ['HTML/CSS 기초', 'Figma 마스터']
    };

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">드래그 & 인터랙션</span>
            <h2 class="sp-title">SortableJS</h2>
            <p class="sp-desc">드래그 앤 드롭 정렬의 표준 라이브러리. 리스트 정렬, Kanban 보드, 중첩 드래그를 지원하며 React/Vue/Angular 통합이 가능합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i sortablejs</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <p style="text-align:center;font-size:12px;color:var(--text-muted);margin-bottom:16px;">카드를 드래그해서 다른 컬럼으로 이동하세요</p>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
            ${Object.entries(cols).map(([key, tasks]) => `
              <div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:10px;">${key === 'todo' ? '할 일' : key === 'doing' ? '진행 중' : '완료'}</div>
                <div id="sb-${key}" class="sb-col" style="min-height:100px;background:var(--bg-surface);border-radius:10px;padding:8px;display:flex;flex-direction:column;gap:6px;">
                  ${tasks.map(t=>`<div class="sb-card" style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:7px;padding:10px 12px;font-size:12px;cursor:grab;user-select:none;">${t}</div>`).join('')}
                </div>
              </div>`).join('')}
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new Sortable(el, { group: 'shared' })</code>로 컬럼 간 이동 가능한 Kanban 구현. <code>onEnd</code> 콜백으로 상태를 동기화합니다.</div>
      </div>`;

    ['todo','doing','done'].forEach(key => {
      Sortable.create(document.getElementById(`sb-${key}`), {
        group: 'kanban', animation: 150, ghostClass: 'opacity-50',
        chosenClass: 'ring-2',
        dragoverBubble: true,
        onStart: e => { e.item.style.opacity = '0.5'; },
        onEnd: e => { e.item.style.opacity = '1'; }
      });
    });
  }
};
