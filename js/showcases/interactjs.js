import { loadScript } from '../utils.js';

export default {
  id: 'interactjs',
  title: 'Interact.js',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/interactjs@1.10.27/dist/interact.min.js');
    const interact = window.interact;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">드래그 & 인터랙션</span>
            <h2 class="sp-title">Interact.js</h2>
            <p class="sp-desc">드래그, 리사이즈, 제스처를 정밀하게 제어하는 라이브러리. 마우스/터치/펜 입력을 통합 처리하며 DOM에 직접 의존성이 없습니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i interactjs</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="position:relative;min-height:300px;overflow:hidden;">
          <p style="font-size:12px;color:var(--text-muted);text-align:center;margin-bottom:16px;">박스를 드래그하거나 모서리를 잡아 크기를 조절하세요</p>
          ${[
            {id:'ij1',label:'드래그',color:'#7c3aed',x:20,y:40,w:120,h:80},
            {id:'ij2',label:'리사이즈',color:'#06b6d4',x:180,y:80,w:140,h:100},
          ].map(b=>`
            <div id="${b.id}" class="ij-box" style="position:absolute;left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;background:${b.color};border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:600;cursor:grab;user-select:none;touch-action:none;">
              ${b.label}
              <div style="position:absolute;bottom:0;right:0;width:16px;height:16px;background:rgba(255,255,255,0.3);border-radius:0 0 10px 0;cursor:se-resize;"></div>
            </div>`).join('')}
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>interact(el).draggable({ listeners: { move } })</code>로 드래그, <code>.resizable()</code>로 리사이즈 설정. <code>event.dx / event.dy</code>로 이동량을 받아 직접 위치를 업데이트합니다.</div>
      </div>`;

    const makeInteract = (selector) => {
      interact(selector)
        .draggable({
          listeners: {
            move(event) {
              const target = event.target;
              const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
              const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
              target.style.transform = `translate(${x}px, ${y}px)`;
              target.setAttribute('data-x', x);
              target.setAttribute('data-y', y);
            }
          }
        })
        .resizable({
          edges: { right: true, bottom: true, bottomRight: true },
          listeners: {
            move(event) {
              const target = event.target;
              target.style.width = event.rect.width + 'px';
              target.style.height = event.rect.height + 'px';
            }
          },
          modifiers: [interact.modifiers.restrictSize({ min: { width: 80, height: 60 } })]
        });
    };

    makeInteract('#ij1');
    makeInteract('#ij2');
  }
};
