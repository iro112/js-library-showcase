import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'swiperjs',
  title: 'Swiper.js',
  async init(container) {
    await loadStyle('https://cdn.jsdelivr.net/npm/swiper@11.0.5/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11.0.5/swiper-bundle.min.js');

    const slides = [
      {title:'랜딩페이지 히어로', desc:'전체화면 캐러셀에 주로 사용', color:'linear-gradient(135deg,#7c3aed,#6366f1)'},
      {title:'카드 갤러리', desc:'포트폴리오 이미지 슬라이더', color:'linear-gradient(135deg,#06b6d4,#0891b2)'},
      {title:'모바일 UX', desc:'터치 스와이프 완벽 지원', color:'linear-gradient(135deg,#10b981,#059669)'},
      {title:'무한 루프', desc:'loop:true 옵션 하나로 설정', color:'linear-gradient(135deg,#f59e0b,#d97706)'},
    ];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">슬라이더</span>
            <h2 class="sp-title">Swiper.js</h2>
            <p class="sp-desc">모바일 최적화 터치 슬라이더의 표준. 현업에서 가장 많이 사용되며 페이지네이션, 네비게이션, 자동재생, 무한루프 등 모든 기능이 내장됩니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i swiper</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:0;overflow:hidden;border-radius:12px;">
          <div class="swiper" id="sw-swiper" style="height:220px;">
            <div class="swiper-wrapper">
              ${slides.map(s=>`
                <div class="swiper-slide" style="background:${s.color};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;">
                  <h3 style="font-size:18px;margin-bottom:6px;">${s.title}</h3>
                  <p style="font-size:13px;opacity:0.8;">${s.desc}</p>
                </div>`).join('')}
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
        <div class="demo-controls" style="margin-top:12px;">
          <button class="demo-btn sec" id="sw-auto">자동재생 토글</button>
          <button class="demo-btn sec" id="sw-cube">Cube 효과</button>
          <button class="demo-btn sec" id="sw-coverflow">Coverflow 효과</button>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new Swiper('.swiper', { loop, autoplay, effect, pagination, navigation })</code>로 초기화. 거의 모든 슬라이더 요구사항을 옵션으로 해결합니다.</div>
      </div>`;

    const Swiper = window.Swiper;
    let swiper = new Swiper('#sw-swiper', { loop:true, pagination:{el:'.swiper-pagination'}, navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'} });
    let autoOn = false;

    document.getElementById('sw-auto').onclick = () => {
      autoOn = !autoOn;
      if (autoOn) swiper.autoplay.start(); else swiper.autoplay.stop();
    };
    document.getElementById('sw-cube').onclick = () => {
      swiper.destroy(); document.querySelector('.swiper-button-prev')?.remove(); document.querySelector('.swiper-button-next')?.remove();
      swiper = new Swiper('#sw-swiper', { loop:true, effect:'cube', cubeEffect:{shadow:false}, pagination:{el:'.swiper-pagination'} });
    };
    document.getElementById('sw-coverflow').onclick = () => {
      swiper.destroy();
      swiper = new Swiper('#sw-swiper', { loop:true, effect:'coverflow', grabCursor:true, centeredSlides:true, slidesPerView:'auto', coverflowEffect:{rotate:40,stretch:0,depth:100,modifier:1}, pagination:{el:'.swiper-pagination'} });
    };
  }
};
