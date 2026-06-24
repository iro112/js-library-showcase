import { loadScript } from '../utils.js';

export default {
  id: 'lottie',
  title: 'Lottie',
  async init(container) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js');
    const lottie = window.lottie;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">애니메이션</span>
            <h2 class="sp-title">Lottie</h2>
            <p class="sp-desc">Adobe After Effects에서 만든 애니메이션을 JSON으로 export해 웹에서 그대로 재생합니다. 디자이너-개발자 협업의 혁명적 도구입니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i lottie-web</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>lottiefiles.com 에서 JSON 다운로드</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;">
          <div style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap;">
            <div>
              <div id="lottie-el" style="width:200px;height:200px;margin:0 auto;"></div>
              <p style="color:var(--text-muted);font-size:12px;margin-top:8px;">After Effects → JSON → 웹</p>
            </div>
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:20px;max-width:280px;text-align:left;">
              <p style="font-size:12px;color:var(--accent-light);font-weight:600;margin-bottom:12px;">사용 방법</p>
              <pre style="font-size:11px;color:var(--text-muted);line-height:1.8;"><code>lottie.loadAnimation({
  container: el,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'animation.json'
});</code></pre>
            </div>
          </div>
          <div class="demo-controls">
            <button class="demo-btn" id="lt-play">재생</button>
            <button class="demo-btn sec" id="lt-pause">일시정지</button>
            <button class="demo-btn sec" id="lt-stop">정지</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> 디자이너가 AE에서 작업한 애니메이션을 Bodymovin 플러그인으로 JSON export → 개발자는 path만 지정하면 끝. <strong>LottieFiles.com</strong>에서 무료 애니메이션을 제공합니다.</div>
      </div>`;

    // 내장 SVG 애니메이션 (pulsar circle) - CDN JSON 없이 동작
    const pulsarData = {"v":"5.7.8","fr":30,"ip":0,"op":60,"w":200,"h":200,"nm":"Pulse","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"circle","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[100]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":30,"s":[20]},{"t":60,"s":[100]}]},"r":{"a":0,"k":0},"p":{"a":0,"k":[100,100,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":0,"s":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":30,"s":[160,160,100]},{"t":60,"s":[100,100,100]}]}},"ao":0,"shapes":[{"ty":"el","d":1,"s":{"a":0,"k":[80,80]},"p":{"a":0,"k":[0,0]},"nm":"Ellipse"},{"ty":"fl","c":{"a":0,"k":[0.486,0.227,0.929,1]},"o":{"a":0,"k":100},"nm":"Fill"}],"ip":0,"op":60,"st":0}]};

    const anim = lottie.loadAnimation({
      container: document.getElementById('lottie-el'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: pulsarData
    });

    document.getElementById('lt-play').onclick = () => anim.play();
    document.getElementById('lt-pause').onclick = () => anim.pause();
    document.getElementById('lt-stop').onclick = () => anim.stop();
  }
};
