export default {
  id: 'howlerjs',
  title: 'Howler.js',
  async init(container) {
    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">UX 감성</span>
            <h2 class="sp-title">Howler.js</h2>
            <p class="sp-desc">웹 오디오의 표준 라이브러리. Web Audio API와 HTML5 Audio를 통합 관리하며 페이드, 루프, 3D 공간 오디오, 스프라이트를 지원합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i howler</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;">
          <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:12px;padding:24px;max-width:460px;margin:0 auto 24px;">
            <p style="font-size:12px;color:var(--accent-light);font-weight:600;margin-bottom:14px;">Howler.js 코드 예제</p>
            <pre style="font-size:12px;color:var(--text-muted);line-height:1.9;text-align:left;overflow-x:auto;"><code>import Howl from 'howler';

const sound = new Howl({
  src: ['audio.mp3', 'audio.ogg'],
  volume: 0.8,
  loop: false,
  onend: () => console.log('재생 완료')
});

sound.play();   // 재생
sound.pause();  // 일시정지
sound.fade(1, 0, 2000); // 2초 페이드아웃</code></pre>
          </div>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:20px;">아래는 Web Audio API로 구현한 데모입니다</p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;" id="hw-keys">
            ${['도','레','미','파','솔','라','시','도'].map((n,i)=>`
              <button class="demo-btn sec hw-key" data-freq="${[261,294,330,349,392,440,494,523][i]}" style="width:52px;height:64px;font-size:13px;font-weight:600;">${n}<br><span style="font-size:10px;opacity:0.6;">${[261,294,330,349,392,440,494,523][i]}Hz</span></button>`).join('')}
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new Howl({ src, volume, loop })</code>으로 초기화. 음악 플레이어, 게임 효과음, 알림음, 배경음악 등에 활용합니다.</div>
      </div>`;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    document.querySelectorAll('.hw-key').forEach(btn => {
      btn.onclick = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = Number(btn.dataset.freq);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.8);
        btn.style.background = 'var(--accent)';
        setTimeout(() => btn.style.background = '', 200);
      };
    });
  }
};
