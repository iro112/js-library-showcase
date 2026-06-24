import { loadScript, loadStyle } from '../utils.js';

export default {
  id: 'plyr',
  title: 'Plyr',
  async init(container) {
    await loadStyle('https://cdn.plyr.io/3.7.8/plyr.css');
    await loadScript('https://cdn.plyr.io/3.7.8/plyr.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">이미지 & 미디어</span>
            <h2 class="sp-title">Plyr</h2>
            <p class="sp-desc">CSS로 완전히 커스텀 가능한 미디어 플레이어. HTML5 video/audio, YouTube, Vimeo를 동일한 API로 제어합니다. 접근성(a11y) 완벽 지원.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i plyr</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>cdn.plyr.io</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="padding:16px;">
          <div id="pl-player">
            <div data-plyr-provider="youtube" data-plyr-embed-id="bTqVqk7FSmY"></div>
          </div>
          <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:16px;margin-top:16px;">
            <p style="font-size:12px;color:var(--accent-light);font-weight:600;margin-bottom:10px;">간단한 사용법</p>
            <pre style="font-size:12px;color:var(--text-muted);line-height:1.8;overflow-x:auto;"><code>// YouTube
const player = new Plyr('#player', {
  controls: ['play','progress','volume','fullscreen'],
  youtube: { noCookie: true }
});

// HTML5 Video
const player = new Plyr('video');
player.on('ready', () => console.log('준비됨'));</code></pre>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> CSS 변수(<code>--plyr-color-main</code>)를 바꾸면 플레이어 테마를 브랜드 색상에 맞게 즉시 변경할 수 있습니다. HTML5/YouTube/Vimeo 모두 동일한 API를 사용합니다.</div>
      </div>`;

    new window.Plyr('#pl-player', {
      youtube: { noCookie: true, rel: 0 },
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
    });
  }
};
