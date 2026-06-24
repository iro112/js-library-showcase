export default {
  id: 'barbajs',
  title: 'Barba.js',
  async init(container) {
    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">UX 감성</span>
            <h2 class="sp-title">Barba.js</h2>
            <p class="sp-desc">페이지 이동 시 부드러운 전환 애니메이션을 추가하는 라이브러리. 멀티페이지 사이트에서 SPA 같은 전환 경험을 구현합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i @barba/core</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div id="bb-demo" style="position:relative;height:200px;border-radius:10px;overflow:hidden;background:var(--bg-surface);">
            <div id="bb-page" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#7c3aed,#6366f1);transition:none;">
              <h3 style="color:#fff;font-size:20px;">페이지 A</h3>
            </div>
          </div>
          <div class="demo-controls">
            <button class="demo-btn" id="bb-fade">Fade 전환</button>
            <button class="demo-btn sec" id="bb-slide">Slide 전환</button>
            <button class="demo-btn sec" id="bb-scale">Scale 전환</button>
          </div>
          <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:16px;margin-top:16px;">
            <p style="font-size:12px;color:var(--accent-light);font-weight:600;margin-bottom:10px;">실제 Barba.js 설정 코드</p>
            <pre style="font-size:11px;color:var(--text-muted);line-height:1.9;overflow-x:auto;"><code>barba.init({
  transitions: [{
    name: 'fade',
    leave(data) {
      return gsap.to(data.current.container,
        { opacity: 0, duration: 0.5 });
    },
    enter(data) {
      return gsap.from(data.next.container,
        { opacity: 0, duration: 0.5 });
    }
  }]
});</code></pre>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> HTML에 <code>data-barba="wrapper"</code>와 <code>data-barba="container"</code>를 추가하고 transitions를 정의하면 됩니다. GSAP과 함께 사용하는 것이 일반적입니다.</div>
      </div>`;

    const page = document.getElementById('bb-page');
    const pages = [
      { label: '페이지 A', bg: 'linear-gradient(135deg,#7c3aed,#6366f1)' },
      { label: '페이지 B', bg: 'linear-gradient(135deg,#06b6d4,#0891b2)' },
      { label: '페이지 C', bg: 'linear-gradient(135deg,#10b981,#059669)' },
    ];
    let cur = 0;

    const transition = async (type) => {
      const next = pages[(cur + 1) % pages.length];
      if (type === 'fade') {
        page.style.transition = 'opacity 0.4s ease';
        page.style.opacity = '0';
        setTimeout(() => {
          cur = (cur + 1) % pages.length;
          page.style.background = pages[cur].bg;
          page.querySelector('h3').textContent = pages[cur].label;
          page.style.opacity = '1';
        }, 400);
      } else if (type === 'slide') {
        page.style.transition = 'transform 0.4s cubic-bezier(0.77,0,0.175,1)';
        page.style.transform = 'translateX(-100%)';
        setTimeout(() => {
          cur = (cur + 1) % pages.length;
          page.style.transition = 'none';
          page.style.transform = 'translateX(100%)';
          page.style.background = pages[cur].bg;
          page.querySelector('h3').textContent = pages[cur].label;
          requestAnimationFrame(() => { page.style.transition = 'transform 0.4s cubic-bezier(0.77,0,0.175,1)'; page.style.transform = 'translateX(0)'; });
        }, 400);
      } else if (type === 'scale') {
        page.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        page.style.transform = 'scale(0.85)';
        page.style.opacity = '0';
        setTimeout(() => {
          cur = (cur + 1) % pages.length;
          page.style.background = pages[cur].bg;
          page.querySelector('h3').textContent = pages[cur].label;
          page.style.transform = 'scale(1.1)';
          requestAnimationFrame(() => { page.style.transform = 'scale(1)'; page.style.opacity = '1'; });
        }, 300);
      }
    };

    document.getElementById('bb-fade').onclick = () => transition('fade');
    document.getElementById('bb-slide').onclick = () => transition('slide');
    document.getElementById('bb-scale').onclick = () => transition('scale');
  }
};
