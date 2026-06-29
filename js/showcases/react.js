import { loadScript } from '../utils.js';

// React를 CDN(UMD)으로 로드 — 빌드 도구 없이 브라우저에서 바로 동작.
// JSX 대신 React.createElement(h)로 컴포넌트를 작성한다.
export default {
  id: 'react',
  title: 'React',
  async init(container) {
    // UMD 빌드는 window.React / window.ReactDOM 을 전역에 노출
    await loadScript('https://unpkg.com/react@18/umd/react.production.min.js');
    await loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
    const React = window.React;
    const ReactDOM = window.ReactDOM;
    const { useState } = React;
    const h = React.createElement;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">프레임워크</span>
            <h2 class="sp-title">React</h2>
            <p class="sp-desc">UI를 컴포넌트로 쪼개고 상태(state)가 바뀌면 화면을 자동으로 다시 그리는 라이브러리. 아래 데모는 빌드 도구 없이 CDN으로 불러온 React가 실제로 동작하는 모습입니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i react react-dom</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>unpkg.com/react@18</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div id="react-root" style="max-width:460px;margin:0 auto;"></div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>useState</code>로 상태를 선언하고 <code>setState</code>로 바꾸면 컴포넌트가 다시 렌더됩니다. 여기선 JSX 없이 <code>React.createElement</code>로 작성했지만, 보통은 JSX + 번들러(Vite 등)를 씁니다.</div>
      </div>`;

    const box = { background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' };

    function Counter() {
      const [count, setCount] = useState(0);
      return h('div', { style: { ...box, textAlign: 'center', marginBottom: '16px' } },
        h('p', { style: { fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' } }, '좋아요'),
        h('div', { style: { fontSize: '44px', fontWeight: 800, color: 'var(--accent-light)', fontVariantNumeric: 'tabular-nums' } }, count),
        h('div', { style: { display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '14px' } },
          h('button', { className: 'demo-btn sec', onClick: () => setCount(c => Math.max(0, c - 1)) }, '−'),
          h('button', { className: 'demo-btn', onClick: () => setCount(c => c + 1) }, '＋ 좋아요'),
          h('button', { className: 'demo-btn sec', onClick: () => setCount(0) }, '리셋'),
        ),
      );
    }

    function TagList() {
      const [items, setItems] = useState(['Hooks', 'Virtual DOM', 'Component']);
      const [val, setVal] = useState('');
      const add = () => { const v = val.trim(); if (!v) return; setItems(list => [...list, v]); setVal(''); };
      return h('div', { style: box },
        h('p', { style: { fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' } }, `상태로 관리되는 목록 (${items.length})`),
        h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px', minHeight: '32px' } },
          items.map((it, i) => h('span', {
            key: i,
            style: { display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--accent-dim)', border: '1px solid var(--accent)', color: 'var(--accent-light)', fontSize: '13px', padding: '5px 10px', borderRadius: '20px' },
          },
            it,
            h('button', {
              onClick: () => setItems(list => list.filter((_, j) => j !== i)),
              style: { background: 'none', border: 'none', color: 'var(--accent-light)', cursor: 'pointer', fontSize: '14px', lineHeight: 1, padding: 0 },
            }, '×'),
          )),
        ),
        h('div', { style: { display: 'flex', gap: '8px' } },
          h('input', {
            value: val,
            placeholder: '항목 입력 후 Enter',
            onChange: e => setVal(e.target.value),
            onKeyDown: e => { if (e.key === 'Enter') add(); },
            style: { flex: 1, background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', padding: '8px 12px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' },
          }),
          h('button', { className: 'demo-btn', onClick: add }, '추가'),
        ),
      );
    }

    function App() {
      return h(React.Fragment, null, h(Counter), h(TagList));
    }

    const root = ReactDOM.createRoot(container.querySelector('#react-root'));
    root.render(h(App));
  }
};
