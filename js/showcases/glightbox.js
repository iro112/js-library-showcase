import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'glightbox',
  title: 'GLightbox',
  async init(container) {
    await loadStyle('https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/css/glightbox.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/js/glightbox.min.js');

    const photos = Array.from({length:8}, (_,i) => ({
      src: `https://picsum.photos/seed/${i+20}/800/600`,
      thumb: `https://picsum.photos/seed/${i+20}/200/150`,
      desc: `사진 ${i+1} — picsum.photos 제공`
    }));

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">이미지 & 미디어</span>
            <h2 class="sp-title">GLightbox</h2>
            <p class="sp-desc">모던한 이미지/영상 라이트박스. YouTube, Vimeo, 인라인 HTML도 지원하며 터치 스와이프와 키보드 네비게이션이 내장됩니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i glightbox</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;text-align:center;">이미지를 클릭하면 라이트박스가 열립니다</p>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
            ${photos.map((p,i)=>`
              <a href="${p.src}" class="glightbox" data-description="${p.desc}" style="display:block;border-radius:8px;overflow:hidden;aspect-ratio:4/3;background:var(--bg-elevated);">
                <img src="${p.thumb}" alt="photo ${i+1}" style="width:100%;height:100%;object-fit:cover;transition:transform .3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              </a>`).join('')}
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>&lt;a class="glightbox" href="image.jpg"&gt;</code>에 클래스만 추가하고 <code>GLightbox()</code>로 초기화하면 끝. 갤러리 그룹핑, 캡션, 영상 모두 같은 방식으로 처리합니다.</div>
      </div>`;

    window.GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
  }
};
