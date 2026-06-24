import { loadScript } from '../utils.js';

export default {
  id: 'countupjs',
  title: 'CountUp.js',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/countup.js@2.8.0/dist/countUp.umd.js');

    const stats = [
      { id:'cu1', end:98,   suffix:'%', label:'사용자 만족도', color:'#7c3aed' },
      { id:'cu2', end:2847, suffix:'',  label:'완성된 프로젝트', color:'#06b6d4' },
      { id:'cu3', end:50,   suffix:'+', label:'학습한 라이브러리', color:'#10b981' },
      { id:'cu4', end:4.9,  suffix:'',  label:'평균 평점', color:'#f59e0b', decimals:1 },
    ];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">텍스트 효과</span>
            <h2 class="sp-title">CountUp.js</h2>
            <p class="sp-desc">숫자가 부드럽게 카운팅 올라가는 효과. 통계 섹션, 포트폴리오, 대시보드에서 임팩트 있는 수치 표현에 사용됩니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i countup.js</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:500px;margin:0 auto;">
            ${stats.map(s=>`
              <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:24px;text-align:center;">
                <div style="font-size:36px;font-weight:800;color:${s.color};font-variant-numeric:tabular-nums;">
                  <span id="${s.id}">0</span>${s.suffix}
                </div>
                <p style="font-size:12px;color:var(--text-muted);margin-top:6px;">${s.label}</p>
              </div>`).join('')}
          </div>
          <div class="demo-controls">
            <button class="demo-btn" id="cu-start">카운팅 시작</button>
            <button class="demo-btn sec" id="cu-reset">리셋</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new CountUp(el, endVal, { duration, suffix, decimal })</code>로 설정. IntersectionObserver와 조합하면 스크롤 시 자동 시작됩니다.</div>
      </div>`;

    const CountUp = window.countUp?.CountUp || window.CountUp;
    const instances = stats.map(s => new CountUp(s.id, s.end, { duration: 2.5, suffix: '', decimals: s.decimals || 0, useEasing: true, useGrouping: true }));

    document.getElementById('cu-start').onclick = () => instances.forEach(c => c.start());
    document.getElementById('cu-reset').onclick = () => {
      instances.forEach((c, i) => { c.reset(); document.getElementById(stats[i].id).textContent = '0'; });
    };

    instances.forEach(c => c.start());
  }
};
