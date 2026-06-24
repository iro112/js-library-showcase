let _lib = null;

export default {
  id: 'motion-one',
  title: 'Motion One',
  async init(container) {
    if (!_lib) _lib = await import('https://esm.sh/motion@10.16.2');
    const { animate, spring, stagger } = _lib;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">애니메이션</span>
            <h2 class="sp-title">Motion One</h2>
            <p class="sp-desc">브라우저의 Web Animations API를 기반으로 한 초경량 애니메이션 라이브러리. WAAPI의 복잡한 문법을 단순화하고 spring 물리 지원을 추가했습니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i motion</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">size</span><code>~3KB (gzipped)</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;">
          <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">
            ${[0,1,2].map(i=>`<div class="mo-card" style="width:90px;height:90px;border-radius:16px;background:hsl(${240+i*30},70%,60%);cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:600;">클릭!</div>`).join('')}
          </div>
          <div class="demo-controls">
            <button class="demo-btn" id="mo-spring">Spring 바운스</button>
            <button class="demo-btn sec" id="mo-stagger">Stagger 등장</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>spring()</code>을 easing으로 전달하면 물리 기반의 자연스러운 움직임. GSAP 없이도 고품질 애니메이션이 가능합니다.</div>
      </div>`;

    const cards = container.querySelectorAll('.mo-card');

    cards.forEach(card => {
      card.onclick = () => {
        animate(card, { scale: [1, 1.4, 1] }, { easing: spring({ stiffness: 400, damping: 10 }), duration: 0.6 });
      };
    });

    document.getElementById('mo-spring').onclick = () => {
      animate(cards, { y: [-60, 0], opacity: [0, 1] }, { delay: stagger(0.1), easing: spring({ stiffness: 200, damping: 12 }) });
    };

    document.getElementById('mo-stagger').onclick = () => {
      animate(cards, { rotate: [0, 360] }, { delay: stagger(0.15), duration: 0.7, easing: 'ease-in-out' });
    };
  }
};
