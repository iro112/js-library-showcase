export default {
  id: 'locomotive-scroll',
  title: 'Locomotive Scroll',
  async init(container) {
    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">스크롤</span>
            <h2 class="sp-title">Locomotive Scroll</h2>
            <p class="sp-desc">부드러운 관성 스크롤 + 패럴랙스 효과를 통합 제공. data-scroll 속성으로 각 요소의 스크롤 속도를 다르게 설정해 깊이감 있는 랜딩페이지를 만듭니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i locomotive-scroll</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">v4</span><code>Lenis 기반으로 마이그레이션 권장</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:20px;">
            <p style="font-size:12px;color:var(--accent-light);font-weight:600;margin-bottom:14px;">핵심 사용법</p>
            <pre style="font-size:12px;color:var(--text-muted);line-height:1.9;overflow-x:auto;"><code>import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  multiplier: 1,
  lerp: 0.08  // 관성 강도 (0~1)
});

// GSAP ScrollTrigger와 연동
scroll.on('scroll', ScrollTrigger.update);</code></pre>
          </div>
          <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:24px;">
            <p style="font-size:12px;color:var(--accent-light);font-weight:600;margin-bottom:14px;">패럴랙스 HTML 예시</p>
            <pre style="font-size:12px;color:var(--text-muted);line-height:1.9;overflow-x:auto;"><code>&lt;div data-scroll-container&gt;
  &lt;!-- 빠르게 움직이는 배경 --&gt;
  &lt;div data-scroll data-scroll-speed="-3"&gt;
    &lt;img src="bg.jpg"&gt;
  &lt;/div&gt;
  &lt;!-- 느리게 움직이는 전경 --&gt;
  &lt;h1 data-scroll data-scroll-speed="2"&gt;
    타이틀
  &lt;/h1&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>data-scroll-speed</code> 속성으로 요소별 스크롤 속도를 다르게 설정. 음수값은 반대 방향으로 움직여 패럴랙스 효과를 만듭니다. v5부터 Lenis를 기반으로 합니다.</div>
      </div>`;
  }
};
