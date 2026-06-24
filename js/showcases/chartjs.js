import { loadScript } from '../utils.js';

export default {
  id: 'chartjs',
  title: 'Chart.js',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">데이터 시각화</span>
            <h2 class="sp-title">Chart.js</h2>
            <p class="sp-desc">가장 대중적인 JS 차트 라이브러리. 설정이 간단하고 반응형을 기본 지원합니다. 입문자에게 가장 추천되는 시각화 라이브러리입니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i chart.js</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <canvas id="cj-canvas" style="max-height:280px;"></canvas>
          <div class="demo-controls">
            <button class="demo-btn" id="cj-bar">Bar</button>
            <button class="demo-btn sec" id="cj-line">Line</button>
            <button class="demo-btn sec" id="cj-doughnut">Doughnut</button>
            <button class="demo-btn sec" id="cj-radar">Radar</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new Chart(canvas, { type, data, options })</code>로 생성. <code>chart.data.datasets[0].data = [...]</code> 후 <code>chart.update()</code>로 실시간 업데이트합니다.</div>
      </div>`;

    const labels = ['1월','2월','3월','4월','5월','6월'];
    const data1 = [65, 78, 52, 91, 83, 74];
    const data2 = [42, 55, 68, 49, 72, 88];

    let chart = null;
    const render = (type) => {
      if (chart) chart.destroy();
      const isDoughnut = type === 'doughnut' || type === 'radar';
      chart = new window.Chart(document.getElementById('cj-canvas'), {
        type,
        data: {
          labels,
          datasets: isDoughnut ? [{
            data: data1,
            backgroundColor: ['#7c3aed','#6366f1','#06b6d4','#10b981','#f59e0b','#ef4444'],
            borderWidth: 0
          }] : [
            { label: '2024년', data: data1, backgroundColor: 'rgba(124,58,237,0.5)', borderColor: '#7c3aed', borderWidth: 2, tension: 0.4 },
            { label: '2023년', data: data2, backgroundColor: 'rgba(6,182,212,0.3)', borderColor: '#06b6d4', borderWidth: 2, tension: 0.4 }
          ]
        },
        options: {
          responsive: true, animation: { duration: 700 },
          plugins: { legend: { labels: { color: '#8b949e' } } },
          scales: isDoughnut ? {} : { x: { ticks:{color:'#8b949e'}, grid:{color:'#30363d'} }, y: { ticks:{color:'#8b949e'}, grid:{color:'#30363d'} } }
        }
      });
    };

    render('bar');
    document.getElementById('cj-bar').onclick = () => render('bar');
    document.getElementById('cj-line').onclick = () => render('line');
    document.getElementById('cj-doughnut').onclick = () => render('doughnut');
    document.getElementById('cj-radar').onclick = () => render('radar');
  }
};
