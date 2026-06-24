import { loadScript } from '../utils.js';

export default {
  id: 'frappe-charts',
  title: 'Frappe Charts',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/frappe-charts@1.6.2/dist/frappe-charts.min.umd.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">데이터 시각화</span>
            <h2 class="sp-title">Frappe Charts</h2>
            <p class="sp-desc">GitHub Contribution 그래프 스타일로 유명한 오픈소스 차트 라이브러리. 의존성이 없고 SVG 기반으로 매우 가볍습니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i frappe-charts</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div id="fc-chart"></div>
          <div class="demo-controls">
            <button class="demo-btn" id="fc-bar">Bar</button>
            <button class="demo-btn sec" id="fc-line">Line</button>
            <button class="demo-btn sec" id="fc-pie">Pie</button>
            <button class="demo-btn sec" id="fc-update">데이터 업데이트</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> Chart.js보다 훨씬 가볍고 GitHub 스타일 Heatmap이 특징. <code>chart.addDataPoint(label, values)</code>로 실시간 데이터 추가가 간단합니다.</div>
      </div>`;

    const FrappeChart = window.frappe?.Chart || window.Chart;
    const labels = ['1월','2월','3월','4월','5월','6월'];
    const rand = () => Array.from({length:6}, () => Math.floor(Math.random()*80)+10);

    let chart = new FrappeChart('#fc-chart', {
      type: 'bar',
      height: 220,
      data: { labels, datasets: [{ name:'A팀', values: rand(), chartType:'bar' }, { name:'B팀', values: rand(), chartType:'bar' }] },
      colors: ['#7c3aed','#06b6d4'],
      tooltipOptions: { formatTooltipX: d => d, formatTooltipY: d => d + '건' }
    });

    document.getElementById('fc-bar').onclick = () => { chart.destroy(); chart = new FrappeChart('#fc-chart', { type:'bar', height:220, data:{ labels, datasets:[{name:'A팀',values:rand()},{name:'B팀',values:rand()}] }, colors:['#7c3aed','#06b6d4'] }); };
    document.getElementById('fc-line').onclick = () => { chart.destroy(); chart = new FrappeChart('#fc-chart', { type:'line', height:220, data:{ labels, datasets:[{name:'A팀',values:rand()},{name:'B팀',values:rand()}] }, lineOptions:{regionFill:1}, colors:['#7c3aed','#06b6d4'] }); };
    document.getElementById('fc-pie').onclick = () => { chart.destroy(); chart = new FrappeChart('#fc-chart', { type:'pie', height:220, data:{ labels, datasets:[{values:rand()}] }, colors:['#7c3aed','#6366f1','#06b6d4','#10b981','#f59e0b','#ef4444'] }); };
    document.getElementById('fc-update').onclick = () => chart.update({ labels, datasets: [{ name:'A팀', values: rand() }, { name:'B팀', values: rand() }] });
  }
};
