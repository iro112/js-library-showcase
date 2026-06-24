import { loadScript } from '../utils.js';

export default {
  id: 'canvas-confetti',
  title: 'canvas-confetti',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js');
    const confetti = window.confetti;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">UX 감성</span>
            <h2 class="sp-title">canvas-confetti</h2>
            <p class="sp-desc">파티클/컨페티 효과를 구현하는 초경량 라이브러리. 이벤트 완료, 결제 성공, 게임 클리어 등의 축하 피드백에 사용됩니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i canvas-confetti</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">size</span><code>~7KB (gzipped)</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;">
          <div style="margin-bottom:28px;">
            <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:28px;font-weight:800;color:#fff;">!</div>
            <p style="font-size:14px;color:var(--text-muted);">아래 버튼을 눌러 효과를 확인하세요</p>
          </div>
          <div class="demo-controls" style="flex-wrap:wrap;gap:10px;justify-content:center;">
            <button class="demo-btn" id="cf-basic">기본 컨페티</button>
            <button class="demo-btn sec" id="cf-sides">양쪽 발사</button>
            <button class="demo-btn sec" id="cf-firework">불꽃놀이</button>
            <button class="demo-btn sec" id="cf-school">학교 색상</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>confetti({ particleCount, spread, origin })</code>만으로 사용. 비동기로 연속 호출해 더 풍부한 효과를 만들 수 있습니다.</div>
      </div>`;

    document.getElementById('cf-basic').onclick = () => {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    };

    document.getElementById('cf-sides').onclick = () => {
      confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 } });
    };

    document.getElementById('cf-firework').onclick = () => {
      const colors = ['#7c3aed','#06b6d4','#f59e0b','#ef4444','#10b981'];
      let count = 0;
      const fire = () => {
        if (count++ > 5) return;
        confetti({ particleCount: 50, startVelocity: 30, spread: 360, ticks: 60,
          origin: { x: Math.random(), y: Math.random() * 0.6 }, colors });
        setTimeout(fire, 300);
      };
      fire();
    };

    document.getElementById('cf-school').onclick = () => {
      confetti({ particleCount: 150, spread: 80, colors: ['#7c3aed','#a78bfa','#fff'], origin: { y: 0.5 } });
    };
  }
};
