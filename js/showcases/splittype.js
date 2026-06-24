import { loadScript } from '../utils.js';

export default {
  id: 'splittype',
  title: 'SplitType',
  async init(container) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
    await loadScript('https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js');
    const { gsap, SplitType } = window;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">텍스트 효과</span>
            <h2 class="sp-title">SplitType</h2>
            <p class="sp-desc">텍스트를 글자·단어·줄 단위로 분리해 각각을 개별 요소로 만듭니다. GSAP와 조합해 인상적인 타이포그래피 애니메이션을 구현합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i split-type</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;">
          <div style="margin:20px 0 32px;min-height:80px;">
            <p id="st-text" style="font-size:32px;font-weight:800;letter-spacing:-0.5px;line-height:1.2;">JS 라이브러리 쇼케이스</p>
          </div>
          <div class="demo-controls">
            <button class="demo-btn" id="st-chars">글자별 등장</button>
            <button class="demo-btn sec" id="st-words">단어별 등장</button>
            <button class="demo-btn sec" id="st-wave">Wave 효과</button>
            <button class="demo-btn sec" id="st-reset">초기화</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new SplitType('#el', { types: 'chars,words' })</code>로 텍스트를 분리. 각 글자가 <code>.char</code> 클래스를 가진 <code>&lt;span&gt;</code>이 되어 개별 애니메이션이 가능합니다.</div>
      </div>`;

    let split = null;
    const el = document.getElementById('st-text');

    const reset = () => { if (split) { split.revert(); } };

    document.getElementById('st-chars').onclick = () => {
      reset();
      split = new SplitType('#st-text', { types: 'chars' });
      gsap.from(split.chars, { opacity: 0, y: 40, duration: 0.5, stagger: 0.04, ease: 'power3.out' });
    };

    document.getElementById('st-words').onclick = () => {
      reset();
      split = new SplitType('#st-text', { types: 'words' });
      gsap.from(split.words, { opacity: 0, x: -30, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
    };

    document.getElementById('st-wave').onclick = () => {
      reset();
      split = new SplitType('#st-text', { types: 'chars' });
      gsap.fromTo(split.chars,
        { y: 0 },
        { y: -20, duration: 0.4, stagger: 0.05, ease: 'power2.inOut', yoyo: true, repeat: 2 }
      );
    };

    document.getElementById('st-reset').onclick = reset;
  }
};
