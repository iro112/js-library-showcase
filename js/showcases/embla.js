import { loadScript } from '../utils.js';

export default {
  id: 'embla',
  title: 'Embla Carousel',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/embla-carousel@8.3.0/embla-carousel.umd.js');

    const slides = [
      { title: 'GSAP', desc: '애니메이션 엔진', color: '#7c3aed' },
      { title: 'Three.js', desc: '3D WebGL', color: '#06b6d4' },
      { title: 'D3.js', desc: '데이터 시각화', color: '#10b981' },
      { title: 'Swiper', desc: '터치 슬라이더', color: '#f59e0b' },
      { title: 'SplitType', desc: '텍스트 애니메이션', color: '#ef4444' },
    ];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">슬라이더</span>
            <h2 class="sp-title">Embla Carousel</h2>
            <p class="sp-desc">스크롤 기반의 부드러운 캐러셀. 최소한의 DOM 구조와 플러그인 시스템으로 확장성이 뛰어납니다. 터치/마우스 모두 자연스럽게 작동합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i embla-carousel</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:0;overflow:hidden;border-radius:12px;">
          <div id="em-viewport" style="overflow:hidden;">
            <div id="em-container" style="display:flex;touch-action:pan-y;">
              ${slides.map(s=>`
                <div style="flex:0 0 70%;min-width:0;padding:0 8px;">
                  <div style="background:${s.color};border-radius:12px;height:180px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;">
                    <h3 style="font-size:20px;font-weight:700;margin-bottom:4px;">${s.title}</h3>
                    <p style="font-size:13px;opacity:0.8;">${s.desc}</p>
                  </div>
                </div>`).join('')}
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;padding:16px;">
            <button class="demo-btn sec" id="em-prev" style="padding:8px 16px;">← 이전</button>
            <div id="em-dots" style="display:flex;gap:6px;"></div>
            <button class="demo-btn sec" id="em-next" style="padding:8px 16px;">다음 →</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> 최소 DOM + CSS만으로 슬라이더를 구성하고 Embla가 스크롤 관리를 담당합니다. <code>embla.scrollNext()</code>, <code>embla.on('select', cb)</code>로 커스텀 컨트롤을 추가합니다.</div>
      </div>`;

    const EmblaCarousel = window.EmblaCarousel;
    const embla = EmblaCarousel(document.getElementById('em-viewport'), {
      align: 'center', loop: true, dragFree: false
    });

    const dots = document.getElementById('em-dots');
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.style.cssText = 'width:8px;height:8px;border-radius:50%;border:none;background:var(--border);cursor:pointer;transition:background .2s;';
      dot.onclick = () => embla.scrollTo(i);
      dots.appendChild(dot);
    });

    const updateDots = () => {
      dots.querySelectorAll('button').forEach((d,i) => d.style.background = i === embla.selectedScrollSnap() ? '#a78bfa' : 'var(--border)');
    };
    embla.on('select', updateDots);
    updateDots();

    document.getElementById('em-prev').onclick = () => embla.scrollPrev();
    document.getElementById('em-next').onclick = () => embla.scrollNext();
  }
};
