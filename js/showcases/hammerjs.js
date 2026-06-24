import { loadScript } from '../utils.js';

export default {
  id: 'hammerjs',
  title: 'Hammer.js',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js');

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">드래그 & 인터랙션</span>
            <h2 class="sp-title">Hammer.js</h2>
            <p class="sp-desc">터치 제스처 인식 라이브러리. 스와이프, 핀치, 회전, 탭, 더블탭 등 모바일 제스처를 감지해 풍부한 터치 인터랙션을 구현합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i hammerjs</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;">
          <div id="hm-target" style="width:160px;height:160px;background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:20px;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:600;cursor:pointer;user-select:none;touch-action:none;transition:background .3s;">
            터치/클릭<br>제스처 테스트
          </div>
          <div id="hm-log" style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:14px;min-height:60px;font-size:12px;color:var(--text-muted);font-family:monospace;max-width:320px;margin:0 auto;">
            이벤트 로그가 여기에 표시됩니다...
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>new Hammer(el)</code>로 초기화 후 <code>.on('swipe tap pan', handler)</code>로 이벤트 수신. 모바일 앱 같은 제스처 인터랙션에 사용합니다.</div>
      </div>`;

    const target = document.getElementById('hm-target');
    const log = document.getElementById('hm-log');
    const msgs = [];

    const addLog = (msg, color) => {
      msgs.unshift(`<span style="color:${color};">${msg}</span>`);
      if (msgs.length > 4) msgs.pop();
      log.innerHTML = msgs.join('<br>');
    };

    const mc = new window.Hammer(target);
    mc.get('pinch').set({ enable: true });
    mc.get('rotate').set({ enable: true });

    mc.on('tap', () => { target.style.background = 'linear-gradient(135deg,#10b981,#059669)'; addLog('tap 감지됨', '#10b981'); setTimeout(()=>target.style.background='linear-gradient(135deg,#7c3aed,#06b6d4)',300); });
    mc.on('doubletap', () => { target.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)'; addLog('doubletap 감지됨', '#f59e0b'); setTimeout(()=>target.style.background='linear-gradient(135deg,#7c3aed,#06b6d4)',400); });
    mc.on('press', () => addLog('press (꾹 누름) 감지됨', '#ef4444'));
    mc.on('swipeleft', () => addLog('← swipeleft 감지됨', '#a78bfa'));
    mc.on('swiperight', () => addLog('→ swiperight 감지됨', '#a78bfa'));
    mc.on('swipeup', () => addLog('↑ swipeup 감지됨', '#a78bfa'));
    mc.on('swipedown', () => addLog('↓ swipedown 감지됨', '#a78bfa'));
    mc.on('pan', (e) => { target.style.transform = `translate(${e.deltaX*0.3}px, ${e.deltaY*0.3}px)`; });
    mc.on('panend', () => { target.style.transform = ''; addLog('pan 완료', '#06b6d4'); });
  }
};
