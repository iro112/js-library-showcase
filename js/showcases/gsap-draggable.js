import { loadScript } from '../utils.js';

export default {
  id: 'gsap-draggable',
  title: 'GSAP Draggable',
  async init(container) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Draggable.min.js');
    const { gsap, Draggable } = window;
    gsap.registerPlugin(Draggable);

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">드래그 & 인터랙션</span>
            <h2 class="sp-title">GSAP Draggable</h2>
            <p class="sp-desc">GSAP 생태계의 드래그 플러그인. 경계 제한, 스냅, 드래그 타입 설정이 간단하며 GSAP 애니메이션과 완벽하게 통합됩니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i gsap</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">use</span><code>gsap.registerPlugin(Draggable)</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="position:relative;">
          <div id="drag-bounds" style="width:100%;height:260px;background:var(--bg-surface);border:1px dashed var(--border);border-radius:12px;position:relative;overflow:hidden;">
            <p style="position:absolute;top:10px;left:0;right:0;text-align:center;font-size:11px;color:var(--text-muted);">점선 영역 안에서만 드래그 가능</p>
            ${[
              {id:'dg1',label:'자유 드래그',color:'#7c3aed',x:30,y:80},
              {id:'dg2',label:'X축만',color:'#06b6d4',x:180,y:120, type:'x'},
              {id:'dg3',label:'Y축만',color:'#10b981',x:320,y:50, type:'y'},
            ].map(b=>`
              <div id="${b.id}" style="position:absolute;left:${b.x}px;top:${b.y}px;width:90px;height:56px;background:${b.color};border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;cursor:grab;text-align:center;user-select:none;">${b.label}</div>`).join('')}
          </div>
          <div class="demo-controls">
            <button class="demo-btn sec" id="dg-snap">스냅 그리드 토글</button>
            <button class="demo-btn sec" id="dg-reset">위치 초기화</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>Draggable.create(el, { type, bounds, snap })</code>로 간단 설정. <code>onDrag</code>, <code>onDragEnd</code> 콜백으로 상태를 추적합니다.</div>
      </div>`;

    const bounds = '#drag-bounds';
    let snapOn = false;

    const drags = [
      Draggable.create('#dg1', { bounds, cursor: 'grab', activeCursor: 'grabbing' }),
      Draggable.create('#dg2', { type: 'x', bounds, cursor: 'ew-resize' }),
      Draggable.create('#dg3', { type: 'y', bounds, cursor: 'ns-resize' }),
    ];

    document.getElementById('dg-snap').onclick = () => {
      snapOn = !snapOn;
      drags[0][0].applyBounds({ snap: snapOn ? { x: v => Math.round(v/40)*40, y: v => Math.round(v/40)*40 } : undefined });
    };

    document.getElementById('dg-reset').onclick = () => {
      gsap.to('#dg1', { x: 0, y: 0, duration: 0.5, ease: 'back.out' });
      gsap.to('#dg2', { x: 0, y: 0, duration: 0.5, ease: 'back.out' });
      gsap.to('#dg3', { x: 0, y: 0, duration: 0.5, ease: 'back.out' });
      drags.forEach(d => d.forEach(dr => { dr.x = 0; dr.y = 0; }));
    };
  }
};
