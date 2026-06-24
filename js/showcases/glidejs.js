import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'glidejs',
  title: 'Glide.js',
  async init(container) {
    await loadStyle('https://cdn.jsdelivr.net/npm/@glidejs/glide@3.6.0/dist/css/glide.core.min.css');
    await loadStyle('https://cdn.jsdelivr.net/npm/@glidejs/glide@3.6.0/dist/css/glide.theme.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/@glidejs/glide@3.6.0/dist/glide.min.js');

    const cards = [
      { title: 'HTML / CSS', sub: '웹의 기초', color: '#e34c26' },
      { title: 'JavaScript', sub: '동적 인터랙션', color: '#f0db4f' },
      { title: 'React', sub: '컴포넌트 UI', color: '#61dafb' },
      { title: 'Three.js', sub: '3D WebGL', color: '#049ef4' },
      { title: 'GSAP', sub: '애니메이션', color: '#88ce02' },
    ];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">슬라이더</span>
            <h2 class="sp-title">Glide.js</h2>
            <p class="sp-desc">의존성 없는 초경량 슬라이더. Swiper보다 단순하고 빠릅니다. 자동재생, 루프, 키보드 네비게이션을 기본 지원하며 번들 사이즈가 매우 작습니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i @glidejs/glide</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">size</span><code>~16KB (gzipped)</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:20px;">
          <div id="gj-glide" class="glide">
            <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides">
                ${cards.map(c=>`
                  <li class="glide__slide">
                    <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:32px;text-align:center;">
                      <div style="width:48px;height:48px;border-radius:10px;background:${c.color}22;border:2px solid ${c.color};margin:0 auto 14px;display:flex;align-items:center;justify-content:center;">
                        <div style="width:12px;height:12px;border-radius:50%;background:${c.color};"></div>
                      </div>
                      <h3 style="font-size:16px;margin-bottom:4px;color:${c.color};">${c.title}</h3>
                      <p style="font-size:13px;color:var(--text-muted);">${c.sub}</p>
                    </div>
                  </li>`).join('')}
              </ul>
            </div>
            <div class="glide__bullets" data-glide-el="controls[nav]">
              ${cards.map((_,i)=>`<button class="glide__bullet" data-glide-dir="=${i}"></button>`).join('')}
            </div>
            <div class="glide__arrows" data-glide-el="controls">
              <button class="glide__arrow glide__arrow--left" data-glide-dir="<">←</button>
              <button class="glide__arrow glide__arrow--right" data-glide-dir=">">→</button>
            </div>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> Swiper와 달리 HTML data 속성 기반으로 컨트롤을 연결합니다. <code>data-glide-el="controls"</code>와 <code>data-glide-dir</code>으로 화살표/불릿을 선언형으로 정의합니다.</div>
      </div>`;

    new window.Glide('#gj-glide', {
      type: 'carousel',
      autoplay: 3000,
      animationDuration: 500,
      perView: 2,
      breakpoints: { 640: { perView: 1 } }
    }).mount();
  }
};
