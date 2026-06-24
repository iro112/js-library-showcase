import { loadScript } from '../utils.js';

export default {
  id: 'tsparticles',
  title: 'tsParticles',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/tsparticles-slim@2.12.0/tsparticles.slim.bundle.min.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">3D / WebGL</span>
            <h2 class="sp-title">tsParticles</h2>
            <p class="sp-desc">마우스와 상호작용하는 파티클 배경 효과. 단 몇 줄의 설정으로 인터랙티브 배경을 구현합니다. 랜딩페이지에 자주 사용됩니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i tsparticles-slim</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:0;overflow:hidden;border-radius:12px;position:relative;min-height:300px;background:#050508;">
          <div id="tsparticles-demo" style="width:100%;height:300px;"></div>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;">
            <p style="color:rgba(255,255,255,0.5);font-size:13px;">마우스를 올려보세요</p>
          </div>
        </div>
        <div class="demo-controls">
          <button class="demo-btn" id="tsp-network">네트워크</button>
          <button class="demo-btn sec" id="tsp-snow">스노우</button>
          <button class="demo-btn sec" id="tsp-bubble">버블</button>
        </div>
        <div class="sp-note"><strong>핵심:</strong> JSON 설정 하나로 파티클의 색상, 크기, 움직임, 마우스 반응 등 모든 것을 제어합니다. particles.js의 후속 버전입니다.</div>
      </div>`;

    const tsParticles = window.tsParticles;

    const configs = {
      network: {
        particles: { number:{value:60}, color:{value:'#a78bfa'}, links:{enable:true,color:'#7c3aed',opacity:0.4,distance:120},
          move:{enable:true,speed:1.5}, opacity:{value:0.7}, size:{value:{min:2,max:4}} },
        interactivity: { events:{onHover:{enable:true,mode:'grab'},onClick:{enable:true,mode:'push'}},
          modes:{grab:{distance:160,links:{opacity:1}},push:{quantity:4}} }
      },
      snow: {
        particles: { number:{value:80}, color:{value:'#fff'}, move:{enable:true,speed:1,direction:'bottom',straight:false},
          opacity:{value:{min:0.1,max:0.5}}, size:{value:{min:1,max:5}}, wobble:{enable:true,distance:10,speed:10} },
        interactivity: { events:{onHover:{enable:true,mode:'repulse'}} }
      },
      bubble: {
        particles: { number:{value:30}, color:{value:['#7c3aed','#06b6d4','#10b981','#f59e0b']},
          move:{enable:true,speed:2}, opacity:{value:{min:0.3,max:0.8}},
          size:{value:{min:8,max:24}}, shape:{type:'circle'} },
        interactivity: { events:{onHover:{enable:true,mode:'bubble'}}, modes:{bubble:{size:40,opacity:1}} }
      }
    };

    let currentId = null;
    const load = async (key) => {
      if (currentId) { const c = tsParticles.domItem(0); if (c) c.destroy(); }
      await tsParticles.load({ id:'tsparticles-demo', options:{ background:{color:'transparent'}, ...configs[key], detectRetina:true } });
      currentId = key;
    };

    load('network');
    document.getElementById('tsp-network').onclick = () => load('network');
    document.getElementById('tsp-snow').onclick = () => load('snow');
    document.getElementById('tsp-bubble').onclick = () => load('bubble');
  }
};
