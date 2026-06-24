import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'aos',
  title: 'AOS',
  async init(container) {
    await loadStyle('https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css');
    await loadScript('https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js');

    const cards = [
      { anim:'fade-up', label:'fade-up', color:'#7c3aed' },
      { anim:'fade-right', label:'fade-right', color:'#6366f1' },
      { anim:'zoom-in', label:'zoom-in', color:'#06b6d4' },
      { anim:'flip-left', label:'flip-left', color:'#10b981' },
      { anim:'slide-up', label:'slide-up', color:'#f59e0b' },
      { anim:'fade-down', label:'fade-down', color:'#ef4444' },
    ];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">스크롤</span>
            <h2 class="sp-title">AOS (Animate On Scroll)</h2>
            <p class="sp-desc">HTML data 속성만으로 스크롤 진입 애니메이션을 추가합니다. JS 코드 없이 data-aos 속성 하나면 끝납니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i aos</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">use</span><code>data-aos="fade-up" 속성 추가</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:0;overflow:hidden;border-radius:12px;">
          <div id="aos-scroller" class="demo-scroll" style="padding:20px;">
            <p style="text-align:center;color:var(--text-muted);font-size:12px;margin-bottom:20px;">↓ 스크롤해서 카드 등장 확인</p>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;">
              ${cards.map(c => `
                <div data-aos="${c.anim}" data-aos-duration="600"
                  style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:20px;">
                  <div style="width:32px;height:4px;background:${c.color};border-radius:2px;margin-bottom:10px;"></div>
                  <code style="font-size:12px;color:${c.color};">data-aos="${c.label}"</code>
                </div>`).join('')}
            </div>
            <div style="height:40px;"></div>
          </div>
        </div>
        <div class="demo-controls"><button class="demo-btn sec" id="aos-reset" style="font-size:12px;">↺ 다시 보기</button></div>
        <div class="sp-note"><strong>핵심:</strong> <code>AOS.init()</code> 한 번 + HTML에 <code>data-aos</code> 속성. <code>data-aos-delay</code>, <code>data-aos-duration</code>으로 세부 조정합니다.</div>
      </div>`;

    window.AOS.init({ container: '#aos-scroller', once: false });

    document.getElementById('aos-reset').onclick = () => {
      document.getElementById('aos-scroller').scrollTop = 0;
      setTimeout(() => window.AOS.refresh(), 100);
    };
  }
};
