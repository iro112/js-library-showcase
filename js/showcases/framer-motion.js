export default {
  id: 'framer-motion',
  title: 'Framer Motion',
  async init(container) {
    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">애니메이션</span>
            <h2 class="sp-title">Framer Motion</h2>
            <p class="sp-desc">React 전용 선언형 애니메이션 라이브러리. JSX 속성만으로 복잡한 애니메이션을 표현하며 스프링 물리, 드래그, 레이아웃 애니메이션을 지원합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i framer-motion</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">note</span><code>React 프로젝트 전용</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:16px;">
              <p style="font-size:11px;color:var(--accent-light);font-weight:600;margin-bottom:10px;">기본 애니메이션</p>
              <pre style="font-size:11px;color:var(--text-muted);line-height:1.8;"><code>&lt;motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
&gt;</code></pre>
            </div>
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:16px;">
              <p style="font-size:11px;color:var(--accent-light);font-weight:600;margin-bottom:10px;">드래그 & 스프링</p>
              <pre style="font-size:11px;color:var(--text-muted);line-height:1.8;"><code>&lt;motion.div
  drag
  dragConstraints={ref}
  whileDrag={{ scale: 1.1 }}
  whileHover={{ rotate: 5 }}
&gt;</code></pre>
            </div>
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:16px;">
              <p style="font-size:11px;color:var(--accent-light);font-weight:600;margin-bottom:10px;">스크롤 연동</p>
              <pre style="font-size:11px;color:var(--text-muted);line-height:1.8;"><code>const y = useScrollY();
const opacity = useTransform(
  y, [0, 300], [1, 0]
);</code></pre>
            </div>
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:10px;padding:16px;">
              <p style="font-size:11px;color:var(--accent-light);font-weight:600;margin-bottom:10px;">레이아웃 전환</p>
              <pre style="font-size:11px;color:var(--text-muted);line-height:1.8;"><code>&lt;AnimatePresence&gt;
  {isVisible &amp;&amp;
    &lt;motion.div
      layout exit={{ x: -100 }}
    /&gt;}
&lt;/AnimatePresence&gt;</code></pre>
            </div>
          </div>
          <div style="background:linear-gradient(135deg,rgba(124,58,237,0.1),rgba(6,182,212,0.1));border:1px solid rgba(124,58,237,0.3);border-radius:10px;padding:16px;text-align:center;">
            <p style="font-size:13px;color:var(--text-muted);">Framer Motion은 React 빌드 환경이 필요합니다.<br>Vite + React 프로젝트에서 실습하세요.</p>
            <div style="display:flex;gap:10px;justify-content:center;margin-top:12px;">
              <code style="background:var(--bg-elevated);padding:6px 12px;border-radius:6px;font-size:12px;color:var(--accent-light);">npm create vite@latest</code>
              <code style="background:var(--bg-elevated);padding:6px 12px;border-radius:6px;font-size:12px;color:var(--accent-light);">npm i framer-motion</code>
            </div>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> React 컴포넌트를 <code>motion.div</code>로 바꾸기만 하면 애니메이션 속성을 사용할 수 있습니다. Framer Design 툴과 연동하면 디자인을 코드로 바로 export할 수 있습니다.</div>
      </div>`;
  }
};
