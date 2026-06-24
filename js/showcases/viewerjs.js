import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'viewerjs',
  title: 'Viewer.js',
  async init(container) {
    await loadStyle('https://cdn.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.js');

    const imgs = Array.from({length:6}, (_,i) => `https://picsum.photos/seed/${i+30}/600/400`);

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">이미지 & 미디어</span>
            <h2 class="sp-title">Viewer.js</h2>
            <p class="sp-desc">이미지 뷰어 라이브러리. 확대/축소, 회전, 반전, 전체화면, 슬라이드쇼가 내장됩니다. 갤러리와 함께 사용하면 인스타그램 스타일 뷰어를 구현할 수 있습니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i viewerjs</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;text-align:center;">이미지를 클릭하면 뷰어가 열립니다 (확대/회전/슬라이드쇼 지원)</p>
          <ul id="vj-gallery" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;list-style:none;">
            ${imgs.map((src,i)=>`
              <li>
                <img src="${src}" alt="gallery ${i+1}"
                  style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:8px;cursor:zoom-in;transition:opacity .2s;"
                  onmouseover="this.style.opacity='.7'" onmouseout="this.style.opacity='1'">
              </li>`).join('')}
          </ul>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new Viewer(container, { inline, toolbar, navbar })</code>로 초기화. 뷰어 안에서 확대/회전/슬라이드쇼/전체화면 모두 내장된 UI로 제어 가능합니다.</div>
      </div>`;

    new window.Viewer(document.getElementById('vj-gallery'), {
      inline: false, toolbar: true, navbar: true, title: true,
      transition: true, movable: true, zoomable: true, rotatable: true, scalable: true
    });
  }
};
