import { loadScript } from '../utils.js';

export default {
  id: 'observable-plot',
  title: 'Observable Plot',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js');
    await loadScript('https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6.14/dist/plot.umd.min.js');
    const Plot = window.Plot;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">데이터 시각화</span>
            <h2 class="sp-title">Observable Plot</h2>
            <p class="sp-desc">D3 제작팀이 만든 간결한 시각화 문법. D3의 복잡함을 대폭 줄이면서도 표현력은 유지합니다. 탐색적 데이터 분석에 특히 강합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i @observablehq/plot</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div id="op-chart" style="width:100%;overflow-x:auto;"></div>
          <div class="demo-controls">
            <button class="demo-btn" id="op-dot">Dot Plot</button>
            <button class="demo-btn sec" id="op-bar">Bar</button>
            <button class="demo-btn sec" id="op-line">Line</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>Plot.dot(data, {x, y, fill})</code> 같은 mark 함수를 조합합니다. D3보다 훨씬 적은 코드로 동일한 결과를 얻을 수 있습니다.</div>
      </div>`;

    const skills = [
      {skill:'HTML',level:85,cat:'기초'},{skill:'CSS',level:78,cat:'기초'},
      {skill:'JS',level:72,cat:'언어'},{skill:'React',level:58,cat:'프레임워크'},
      {skill:'Vue',level:45,cat:'프레임워크'},{skill:'Figma',level:90,cat:'디자인'},
      {skill:'GSAP',level:65,cat:'라이브러리'},{skill:'Three.js',level:40,cat:'라이브러리'},
    ];
    const months = Array.from({length:12},(_,i)=>({ month:i+1, a:Math.random()*60+20, b:Math.random()*60+20 }));

    const render = (el, chart) => { el.innerHTML = ''; el.appendChild(chart); };
    const el = document.getElementById('op-chart');

    const colorMap = { '기초':'#7c3aed','언어':'#06b6d4','프레임워크':'#10b981','디자인':'#f59e0b','라이브러리':'#a78bfa' };

    const drawDot = () => render(el, Plot.plot({
      marginLeft:60, height:220, style:{background:'transparent',color:'#8b949e',fontSize:12},
      marks:[Plot.dot(skills,{x:'level',y:'skill',fill:d=>colorMap[d.cat]||'#7c3aed',r:8,tip:true}),
        Plot.gridX({stroke:'#30363d'})]
    }));
    const drawBar = () => render(el, Plot.plot({
      marginLeft:60, height:220, style:{background:'transparent',color:'#8b949e',fontSize:12},
      marks:[Plot.barX(skills,{x:'level',y:'skill',fill:d=>colorMap[d.cat]||'#7c3aed',rx:4}),
        Plot.gridX({stroke:'#30363d'})]
    }));
    const drawLine = () => render(el, Plot.plot({
      height:220, style:{background:'transparent',color:'#8b949e',fontSize:12},
      marks:[Plot.line(months,{x:'month',y:'a',stroke:'#7c3aed',strokeWidth:2}),
        Plot.line(months,{x:'month',y:'b',stroke:'#06b6d4',strokeWidth:2}),
        Plot.gridY({stroke:'#30363d'}),Plot.gridX({stroke:'#30363d'})]
    }));

    drawDot();
    document.getElementById('op-dot').onclick = drawDot;
    document.getElementById('op-bar').onclick = drawBar;
    document.getElementById('op-line').onclick = drawLine;
  }
};
