import { loadScript } from '../utils.js';

export default {
  id: 'apexcharts',
  title: 'ApexCharts',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/apexcharts@3.46.0/dist/apexcharts.min.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">데이터 시각화</span>
            <h2 class="sp-title">ApexCharts</h2>
            <p class="sp-desc">설정값만으로 풍부한 인터랙티브 차트를 구현합니다. 툴팁, 줌, 선택, 라이브 업데이트가 내장되어 있어 대시보드 UI에 최적입니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i apexcharts</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div id="apex-chart"></div>
          <div class="demo-controls">
            <button class="demo-btn" id="ap-update">실시간 업데이트</button>
            <button class="demo-btn sec" id="ap-area">Area</button>
            <button class="demo-btn sec" id="ap-bar">Bar</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>chart.updateSeries([...])</code>로 애니메이션과 함께 실시간 데이터 업데이트가 가능합니다. 툴팁과 줌은 자동으로 내장됩니다.</div>
      </div>`;

    const genData = (n=12) => Array.from({length:n}, () => Math.floor(Math.random()*60)+20);
    let type = 'area';

    const opt = () => ({
      series: [{ name: '방문자', data: genData() }, { name: '전환', data: genData() }],
      chart: { type, height: 240, toolbar:{show:false}, background:'transparent', animations:{speed:500} },
      theme: { mode: 'dark' },
      colors: ['#7c3aed', '#06b6d4'],
      stroke: { curve:'smooth', width:2 },
      fill: { type:'gradient', gradient:{ shadeIntensity:1, opacityFrom:0.4, opacityTo:0.05 } },
      xaxis: { categories:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        labels:{style:{colors:'#8b949e'}}, axisBorder:{color:'#30363d'} },
      yaxis: { labels:{style:{colors:'#8b949e'}} },
      grid: { borderColor:'#30363d' },
      tooltip: { theme:'dark' },
      legend: { labels:{colors:'#8b949e'} }
    });

    const chart = new window.ApexCharts(document.getElementById('apex-chart'), opt());
    chart.render();

    document.getElementById('ap-update').onclick = () => chart.updateSeries([{name:'방문자',data:genData()},{name:'전환',data:genData()}]);
    document.getElementById('ap-area').onclick = () => { type='area'; chart.updateOptions(opt()); };
    document.getElementById('ap-bar').onclick = () => { type='bar'; chart.updateOptions(opt()); };
  }
};
