import { loadScript } from '../utils.js';

export default {
  id: 'd3js',
  title: 'D3.js',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js');
    const d3 = window.d3;

    const rawData = [
      { name: 'HTML/CSS', value: 85 },
      { name: 'JavaScript', value: 72 },
      { name: 'Figma', value: 90 },
      { name: 'React', value: 58 },
      { name: 'Three.js', value: 40 },
      { name: 'GSAP', value: 65 },
    ];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">데이터 시각화</span>
            <h2 class="sp-title">D3.js</h2>
            <p class="sp-desc">데이터 기반 DOM 조작의 바이블. 무한한 자유도로 어떤 시각화도 가능하지만 학습 곡선이 가파릅니다. SVG + 수학으로 완전한 커스텀 차트를 만듭니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i d3</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">docs</span><code>d3js.org</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <svg id="d3-svg" width="100%" style="overflow:visible;"></svg>
          <div class="demo-controls">
            <button class="demo-btn" id="d3-update">데이터 업데이트</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>d3.select().data().join()</code> 패턴으로 데이터와 DOM을 바인딩. Scale, Axis, Transition 등을 조합해 완전 커스텀 차트를 구현합니다.</div>
      </div>`;

    const svg = d3.select('#d3-svg');
    const margin = { top: 10, right: 10, bottom: 40, left: 70 };

    const draw = (data) => {
      svg.selectAll('*').remove();
      const W = document.getElementById('d3-svg').clientWidth;
      const H = 240;
      const g = svg.attr('height', H).append('g').attr('transform', `translate(${margin.left},${margin.top})`);
      const innerW = W - margin.left - margin.right;
      const innerH = H - margin.top - margin.bottom;

      const x = d3.scaleLinear().domain([0, 100]).range([0, innerW]);
      const y = d3.scaleBand().domain(data.map(d => d.name)).range([0, innerH]).padding(0.25);

      g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x).ticks(5).tickFormat(d => d+'%'))
        .selectAll('text,line,path').style('color', '#8b949e').style('stroke', '#30363d');
      g.append('g').call(d3.axisLeft(y))
        .selectAll('text,line,path').style('color', '#8b949e').style('stroke', '#30363d');

      const bars = g.selectAll('.bar').data(data, d => d.name);
      bars.enter().append('rect').attr('class', 'bar')
        .attr('x', 0).attr('y', d => y(d.name))
        .attr('height', y.bandwidth()).attr('rx', 4)
        .attr('fill', (_, i) => `hsl(${240 + i * 25}, 70%, 65%)`)
        .attr('width', 0)
        .transition().duration(600).ease(d3.easeCubicOut)
        .attr('width', d => x(d.value));
    };

    draw(rawData);
    document.getElementById('d3-update').onclick = () => {
      draw(rawData.map(d => ({ ...d, value: 30 + Math.floor(Math.random() * 65) })));
    };
  }
};
