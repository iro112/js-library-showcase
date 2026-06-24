import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'splide',
  title: 'Splide',
  async init(container) {
    await loadStyle('https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js');

    const items = [
      { icon:'D', title:'디자인 시스템', sub:'컴포넌트 기반 설계', c:'#7c3aed' },
      { icon:'G', title:'GSAP 애니메이션', sub:'고성능 타임라인', c:'#6366f1' },
      { icon:'3', title:'Three.js 3D', sub:'WebGL 시각화', c:'#06b6d4' },
      { icon:'D', title:'D3 시각화', sub:'데이터 중심 차트', c:'#10b981' },
      { icon:'S', title:'Swiper 슬라이더', sub:'터치 최적화', c:'#f59e0b' },
    ];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">슬라이더</span>
            <h2 class="sp-title">Splide</h2>
            <p class="sp-desc">Swiper보다 가볍고 접근성(a11y)이 우수한 캐러셀 라이브러리. WAI-ARIA를 완벽 지원하며 의존성이 없어 매우 가볍습니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i @splidejs/splide</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">size</span><code>~27KB (gzipped)</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:16px;">
          <div id="sp-splide" class="splide">
            <div class="splide__track">
              <ul class="splide__list">
                ${items.map(it=>`
                  <li class="splide__slide">
                    <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:28px;text-align:center;margin:4px;">
                      <div style="width:48px;height:48px;border-radius:50%;background:${it.c};color:#fff;font-size:18px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;">${it.icon}</div>
                      <h3 style="font-size:15px;margin-bottom:4px;">${it.title}</h3>
                      <p style="font-size:12px;color:var(--text-muted);">${it.sub}</p>
                    </div>
                  </li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> Swiper와 달리 HTML 구조가 시맨틱하며 키보드 네비게이션과 스크린 리더가 완벽하게 작동합니다. a11y가 중요한 프로젝트에 적합합니다.</div>
      </div>`;

    new window.Splide('#sp-splide', {
      type: 'loop', perPage: 2, autoplay: true, interval: 2500,
      breakpoints: { 640: { perPage: 1 } }
    }).mount();
  }
};
