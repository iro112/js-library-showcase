import { loadScript } from '../utils.js';

export default {
  id: 'highcharts',
  title: 'Highcharts',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/highcharts@11.2.0/highcharts.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">데이터 시각화</span>
            <h2 class="sp-title">Highcharts</h2>
            <p class="sp-desc">엔터프라이즈급 차트 라이브러리. 옵션이 매우 풍부하고 접근성(a11y), 반응형, 인터랙션 모두 완벽하게 지원합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i highcharts</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">license</span><code>비상업적 무료</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div id="hc-chart"></div>
          <div class="demo-controls">
            <button class="demo-btn sec" id="hc-area">Area</button>
            <button class="demo-btn sec" id="hc-column">Column</button>
            <button class="demo-btn sec" id="hc-spider">Spider</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> 매우 풍부한 기본 옵션과 공식 문서. 금융, 의료, 대시보드 등 엔터프라이즈 환경에서 가장 많이 사용됩니다.</div>
      </div>`;

    const Highcharts = window.Highcharts;
    const base = { chart:{backgroundColor:'transparent'}, title:{text:null},
      credits:{enabled:false}, legend:{itemStyle:{color:'#8b949e'}},
      xAxis:{lineColor:'#30363d',tickColor:'#30363d',labels:{style:{color:'#8b949e'}}},
      yAxis:{gridLineColor:'#30363d',labels:{style:{color:'#8b949e'}}},
      tooltip:{backgroundColor:'#1a1d27',style:{color:'#e6edf3'},borderColor:'#30363d'} };

    let chart;
    const render = (opts) => {
      if (chart) chart.destroy();
      chart = Highcharts.chart('hc-chart', { ...base, ...opts });
    };

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const rand = () => Array.from({length:12}, () => Math.floor(Math.random()*80)+10);

    render({ series:[
      {name:'방문자',data:rand(),color:'#7c3aed',type:'area',fillOpacity:0.2},
      {name:'전환',data:rand(),color:'#06b6d4',type:'area',fillOpacity:0.15}
    ], xAxis:{...base.xAxis, categories:months} });

    document.getElementById('hc-area').onclick = () => render({ series:[{name:'방문자',data:rand(),color:'#7c3aed',type:'area',fillOpacity:0.2},{name:'전환',data:rand(),color:'#06b6d4',type:'area',fillOpacity:0.15}], xAxis:{...base.xAxis,categories:months} });
    document.getElementById('hc-column').onclick = () => render({ series:[{name:'방문자',data:rand(),color:'#7c3aed',type:'column'},{name:'전환',data:rand(),color:'#06b6d4',type:'column'}], xAxis:{...base.xAxis,categories:months} });
    document.getElementById('hc-spider').onclick = () => render({ chart:{...base.chart,polar:true},
      xAxis:{...base.xAxis,categories:['HTML','CSS','JS','Figma','React','GSAP'],tickmarkPlacement:'on',lineWidth:0},
      yAxis:{...base.yAxis,gridLineInterpolation:'polygon',min:0,max:100},
      series:[{name:'스킬',data:[80,75,65,90,55,45],type:'area',color:'#7c3aed',fillOpacity:0.3}] });
  }
};
