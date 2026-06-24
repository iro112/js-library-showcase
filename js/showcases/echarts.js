import { loadScript } from '../utils.js';

export default {
  id: 'echarts',
  title: 'Echarts',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">데이터 시각화</span>
            <h2 class="sp-title">Apache ECharts</h2>
            <p class="sp-desc">Apache가 관리하는 강력한 시각화 라이브러리. 지도, 3D 차트, 대용량 데이터 렌더링에 강하며 매우 아름다운 기본 스타일을 제공합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i echarts</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">docs</span><code>echarts.apache.org</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:12px;">
          <div id="ec-chart" style="width:100%;height:260px;"></div>
          <div class="demo-controls">
            <button class="demo-btn" id="ec-line">Line</button>
            <button class="demo-btn sec" id="ec-pie">Pie</button>
            <button class="demo-btn sec" id="ec-scatter">Scatter</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>chart.setOption(option)</code>으로 모든 것을 선언형으로 정의합니다. 옵션만 바꿔서 차트 타입을 자유롭게 변환할 수 있습니다.</div>
      </div>`;

    const ec = window.echarts.init(document.getElementById('ec-chart'), 'dark');

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const rand = (n) => Array.from({length:n}, () => Math.floor(Math.random()*80)+10);

    const lineOpt = () => ({
      backgroundColor: 'transparent',
      tooltip: { trigger:'axis' },
      legend: { data:['Series A','Series B'], textStyle:{color:'#8b949e'} },
      grid: { left:40, right:20, top:40, bottom:30 },
      xAxis: { type:'category', data:months, axisLine:{lineStyle:{color:'#30363d'}}, axisLabel:{color:'#8b949e'} },
      yAxis: { type:'value', splitLine:{lineStyle:{color:'#30363d'}}, axisLabel:{color:'#8b949e'} },
      series: [
        { name:'Series A', type:'line', smooth:true, data:rand(12), itemStyle:{color:'#7c3aed'},
          areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(124,58,237,0.4)'},{offset:1,color:'rgba(124,58,237,0)'}]}} },
        { name:'Series B', type:'line', smooth:true, data:rand(12), itemStyle:{color:'#06b6d4'} }
      ]
    });

    const pieOpt = () => ({
      backgroundColor: 'transparent',
      tooltip: { trigger:'item' },
      legend: { orient:'vertical', left:'left', textStyle:{color:'#8b949e'} },
      series: [{ type:'pie', radius:['40%','70%'], center:['60%','50%'],
        data: ['React','Vue','Angular','Svelte','Vanilla'].map((n,i)=>({ name:n, value:rand(1)[0], itemStyle:{color:`hsl(${240+i*30},70%,65%)`} })),
        label:{color:'#e6edf3'} }]
    });

    const scatterOpt = () => ({
      backgroundColor: 'transparent',
      tooltip: {},
      xAxis: { splitLine:{lineStyle:{color:'#30363d'}}, axisLabel:{color:'#8b949e'} },
      yAxis: { splitLine:{lineStyle:{color:'#30363d'}}, axisLabel:{color:'#8b949e'} },
      series: [{ type:'scatter', symbolSize:12,
        data: Array.from({length:40}, () => [Math.random()*100, Math.random()*100]),
        itemStyle:{color:'#a78bfa', opacity:0.7} }]
    });

    ec.setOption(lineOpt());
    document.getElementById('ec-line').onclick = () => ec.setOption(lineOpt(), true);
    document.getElementById('ec-pie').onclick = () => ec.setOption(pieOpt(), true);
    document.getElementById('ec-scatter').onclick = () => ec.setOption(scatterOpt(), true);
  }
};
