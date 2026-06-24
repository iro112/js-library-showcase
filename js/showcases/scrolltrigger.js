import { loadScript } from '../utils.js';

export default {
  id: 'scrolltrigger',
  title: 'ScrollTrigger',
  async init(container) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    const sections = [
      { text: '01 — 스크롤을 내려보세요', sub: 'ScrollTrigger가 위치를 감지합니다', color: '#7c3aed' },
      { text: '02 — 요소가 뷰포트에 진입할 때', sub: '애니메이션이 자동으로 트리거됩니다', color: '#6366f1' },
      { text: '03 — 스크롤 위치 연동', sub: 'scrub 옵션으로 스크롤 속도와 연동 가능', color: '#06b6d4' },
      { text: '04 — 핀고정도 가능합니다', sub: '특정 섹션을 스크롤 중 고정시킵니다', color: '#10b981' },
    ];

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">스크롤</span>
            <h2 class="sp-title">GSAP ScrollTrigger</h2>
            <p class="sp-desc">스크롤 위치에 따라 GSAP 타임라인을 제어하는 플러그인. 랜딩페이지의 스크롤 애니메이션을 구현하는 업계 표준입니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i gsap</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">use</span><code>gsap.registerPlugin(ScrollTrigger)</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:0;overflow:hidden;border-radius:12px;">
          <div id="st-scroller" class="demo-scroll">
            <div style="padding:24px 32px;background:var(--bg-surface);text-align:center;position:sticky;top:0;z-index:2;border-bottom:1px solid var(--border);">
              <span style="font-size:12px;color:var(--text-muted);">↓ 아래로 스크롤하세요 ↓</span>
            </div>
            ${sections.map((s,i) => `
              <div class="st-sec" style="padding:48px 32px;border-bottom:1px solid var(--border);opacity:0;transform:translateX(-40px);">
                <div style="width:6px;height:40px;background:${s.color};border-radius:3px;margin-bottom:12px;"></div>
                <h3 style="font-size:18px;margin-bottom:6px;color:${s.color};">${s.text}</h3>
                <p style="color:var(--text-muted);font-size:13px;">${s.sub}</p>
              </div>`).join('')}
            <div style="padding:40px;text-align:center;color:var(--text-muted);font-size:13px;">끝 — 다시 올려보세요</div>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>trigger</code>로 기준 요소 지정, <code>start/end</code>로 진입 시점 설정, <code>scrub</code>으로 스크롤 속도와 동기화합니다.</div>
      </div>`;

    const scroller = document.getElementById('st-scroller');
    const items = scroller.querySelectorAll('.st-sec');

    items.forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        scroller: '#st-scroller',
        start: 'top 90%',
        onEnter: () => gsap.to(el, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }),
        onLeaveBack: () => gsap.to(el, { opacity: 0, x: -40, duration: 0.3 })
      });
    });
  }
};
