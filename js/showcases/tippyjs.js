import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'tippyjs',
  title: 'Tippy.js',
  async init(container) {
    await loadScript('https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js');
    await loadScript('https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.min.js');
    await loadStyle('https://unpkg.com/tippy.js@6/dist/tippy.css');
    const tippy = window.tippy;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">UX 감성</span>
            <h2 class="sp-title">Tippy.js</h2>
            <p class="sp-desc">커스텀 툴팁과 팝오버의 표준. 위치 자동 계산(Popper.js 기반), 다양한 트리거, 애니메이션, 인터랙티브 콘텐츠까지 지원합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i tippy.js</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>unpkg.com</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;">
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:24px;">각 버튼에 마우스를 올려보세요</p>
          <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;">
            <button class="demo-btn tp-basic">기본 툴팁</button>
            <button class="demo-btn sec tp-html">HTML 콘텐츠</button>
            <button class="demo-btn sec tp-arrow">화살표 없음</button>
            <button class="demo-btn sec tp-bottom">아래 배치</button>
            <button class="demo-btn sec tp-click">클릭으로 열기</button>
            <button class="demo-btn sec tp-delay">딜레이 있음</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> Popper.js가 뷰포트 경계를 감지해 툴팁 위치를 자동으로 조정합니다. <code>content</code>에 HTML 요소나 함수를 전달하면 풍부한 팝오버도 구현됩니다.</div>
      </div>`;

    tippy('.tp-basic', { content: '기본 Tippy 툴팁입니다' });
    tippy('.tp-html', { content: '<strong style="color:#a78bfa">HTML</strong>도 <em>지원</em>됩니다', allowHTML: true });
    tippy('.tp-arrow', { content: '화살표 없는 스타일', arrow: false });
    tippy('.tp-bottom', { content: '아래에 표시됩니다', placement: 'bottom' });
    tippy('.tp-click', { content: '클릭으로 토글', trigger: 'click' });
    tippy('.tp-delay', { content: '0.5초 딜레이', delay: [500, 200] });
  }
};
