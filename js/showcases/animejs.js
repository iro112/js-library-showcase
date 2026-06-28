import { loadScript } from '../utils.js';

// animejs.com 히어로 오마주 — 스크롤 분해/조립(exploded view) + 360° 회전
// 스크롤 진행도(0→1)에 따라:
//  - 전체 어셈블리가 360° 회전
//  - 부품들이 폭발 분해도처럼 흩어졌다가(중간) 다시 합쳐짐(양끝)
//  - 우하단 스크럽 게이지 + 라벨(타임스탬프) 동기화
export default {
  id: 'animejs',
  title: 'Anime.js',
  async init(container) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js');
    const anime = window.anime;

    injectStyles();

    const k = 0.5; // 원근(위에서 살짝 내려다본) 압축 비율

    // ── 지오메트리 헬퍼 (모두 원점 0,0 기준) ──
    const ell = (rx, cy = 0, kk = k) => `<ellipse cx="0" cy="${cy}" rx="${rx.toFixed(1)}" ry="${(rx * kk).toFixed(1)}"/>`;
    const line = (x1, y1, x2, y2) => `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;

    const head = () => {
      let s = ell(54) + ell(13);
      for (let j = 0; j < 6; j++) { const a = j / 6 * Math.PI * 2, cx = Math.cos(a) * 31, cy = Math.sin(a) * 31 * k; s += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="11" ry="${(11 * k).toFixed(1)}"/>`; }
      return s;
    };
    const gear = (r = 58, n = 34, tl = 12) => {
      let s = ell(r) + ell(r * 0.62) + ell(10);
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; s += line(Math.cos(a) * r, Math.sin(a) * r * k, Math.cos(a) * (r + tl), Math.sin(a) * (r + tl) * k); }
      for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2; s += line(0, 0, Math.cos(a) * r * 0.62, Math.sin(a) * r * 0.62 * k); }
      return s;
    };
    const knurl = (r = 50, n = 46) => {
      let s = ell(r) + ell(r * 0.8) + ell(r * 0.4) + ell(13);
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; s += line(Math.cos(a) * r * 0.8, Math.sin(a) * r * 0.8 * k, Math.cos(a) * r, Math.sin(a) * r * k); }
      return s;
    };
    const barrel = (r = 64, ribs = 5, gap = 16) => {
      let s = '', top = -(ribs - 1) / 2 * gap, bot = (ribs - 1) / 2 * gap;
      for (let i = 0; i < ribs; i++) s += ell(r, top + i * gap);
      s += line(-r, top, -r, bot) + line(r, top, r, bot);
      return s;
    };
    const oct = (r = 30) => {
      const pts = a => Array.from({ length: 8 }, (_, i) => { const t = (22.5 + 45 * i) * Math.PI / 180; return `${(Math.cos(t) * a).toFixed(1)},${(Math.sin(t) * a * k).toFixed(1)}`; }).join(' ');
      return `<polygon points="${pts(r)}"/><polygon points="${pts(r * 0.52)}"/>`;
    };
    const plate = (r = 46) => ell(r) + ell(r, 12) + ell(r * 0.3) + line(-r, 0, -r, 12) + line(r, 0, r, 12);
    const piston = () => {
      let s = `<rect x="-46" y="-32" width="92" height="64" rx="12"/>`;
      for (let j = 0; j < 3; j++) { const cx = -26 + 26 * j; s += `<ellipse cx="${cx}" cy="-18" rx="11" ry="7"/><ellipse cx="${cx}" cy="10" rx="11" ry="7"/>` + line(cx - 11, -18, cx - 11, 10) + line(cx + 11, -18, cx + 11, 10); }
      return s;
    };
    const base = (r = 82) => ell(r) + ell(r, 16) + ell(r * 0.8) + ell(r * 0.8, 16) + line(-r, 0, -r, 16) + line(r, 0, r, 16);

    // ── 부품 정의: 조립위치(ax,ay) → 분해위치(ex,ey), 개별 스핀(deg) ──
    const PARTS = [
      { g: base(),         ax: 0, ay: 185, ex: 0,    ey: 345, spin: 30 },
      { g: barrel(70, 6),  ax: 0, ay: 120, ex: 0,    ey: 250, spin: 40 },
      { g: oct(),          ax: 0, ay: 38,  ex: 0,    ey: 38,  spin: 90 },
      { g: barrel(56, 4),  ax: 0, ay: -5,  ex: 0,    ey: -28, spin: 60 },
      { g: piston(),       ax: 0, ay: 12,  ex: -330, ey: 80,  spin: -150 },
      { g: plate(44),      ax: 0, ay: 62,  ex: 300,  ey: 150, spin: 130 },
      { g: plate(38),      ax: 0, ay: 84,  ex: 360,  ey: 56,  spin: -120 },
      { g: gear(),         ax: 0, ay: -92, ex: -320, ey: -150, spin: 260 },
      { g: knurl(),        ax: 0, ay: -52, ex: 320,  ey: -128, spin: 200 },
      { g: head(),         ax: 0, ay: -150,ex: 70,   ey: -255, spin: 120 },
    ];

    container.innerHTML = `
      <div class="ajx-hero">
        <div class="ajx-stage">
          <div class="ajx-bg"></div>
          <div class="ajx-stars"></div>
          <div class="ajx-glow"></div>
          <div class="ajx-copy">
            <h2 class="ajx-h">The complete<br>animator's toolbox</h2>
            <p class="ajx-sub">스크롤을 내리면 흩어진 부품이 360° 회전하며<br>하나의 별처럼 합체됩니다.</p>
          </div>

          <svg class="ajx-svg" viewBox="0 0 1120 620" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <g class="ajx-spin">
              ${PARTS.map((p, i) => `<g class="part" data-i="${i}">${p.g}</g>`).join('')}
            </g>
          </svg>

          <div class="ajx-tag" data-at="0.18,0.30" data-n="6.38"></div>
          <div class="ajx-tag" data-at="0.78,0.26" data-n="8.55"></div>
          <div class="ajx-tag" data-at="0.82,0.62" data-n="3.50"></div>
          <div class="ajx-tag" data-at="0.16,0.66" data-n="4.30"></div>

          <div class="ajx-hint" id="ajx-hint">SCROLL ↓ TO ASSEMBLE</div>

          <div class="ajx-foot"><code class="ajx-npm">npm i animejs</code><span class="ajx-ver">scroll · assemble · 360°</span></div>
          <div class="ajx-scrub"><div class="ajx-ticks">${Array.from({ length: 60 }, () => '<i></i>').join('')}</div><div class="ajx-head" id="ajx-head"></div></div>
        </div>
      </div>`;

    // 라벨 텍스트 채우기
    container.querySelectorAll('.ajx-tag').forEach(t => {
      const [x, y] = t.dataset.at.split(',');
      t.style.left = x * 100 + '%'; t.style.top = y * 100 + '%';
      t.innerHTML = `<span class="dot"></span><span class="num">${t.dataset.n}</span>`;
    });

    const hero = container.querySelector('.ajx-hero');
    const spin = container.querySelector('.ajx-spin');
    const parts = [...container.querySelectorAll('.part')];
    const head$ = container.querySelector('#ajx-head');
    const hint = container.querySelector('#ajx-hint');
    const tags = [...container.querySelectorAll('.ajx-tag')];
    const starsEl = container.querySelector('.ajx-stars');
    const glowEl = container.querySelector('.ajx-glow');
    const copyEl = container.querySelector('.ajx-copy');
    const headerH = document.querySelector('.site-header')?.offsetHeight || 64;
    copyEl.style.top = (headerH + 28) + 'px';

    // 별빛 생성 (3개 깊이 레이어 → 시차용 data-depth)
    let sh = '';
    for (let i = 0; i < 160; i++) {
      const sz = (Math.random() * 2.2 + 0.4).toFixed(1);
      const depth = (0.2 + Math.random() * 0.8).toFixed(2);
      sh += `<i style="left:${(Math.random() * 100).toFixed(2)}%;top:${(Math.random() * 100).toFixed(2)}%;` +
            `width:${sz}px;height:${sz}px;--o:${(0.25 + Math.random() * 0.7).toFixed(2)};` +
            `--d:${depth};animation-delay:${(Math.random() * 5).toFixed(2)}s;` +
            `animation-duration:${(2.4 + Math.random() * 3.5).toFixed(2)}s"></i>`;
    }
    starsEl.innerHTML = sh;

    const CX = 560, CY = 300;
    const ease = t => t * t * (3 - 2 * t); // smoothstep

    function render() {
      const r = hero.getBoundingClientRect();
      const dist = hero.offsetHeight - window.innerHeight;
      let p = dist > 0 ? -r.top / dist : 0;
      p = Math.min(1, Math.max(0, p));

      // 스크롤을 내릴수록 0(흩어짐) → 1(합체)
      const assemble = ease(p);
      const apart = 1 - assemble;
      const t = performance.now() / 1000;
      const idle = Math.sin(t * 0.6) * 1.6;             // 항상 은은하게 살아있는 회전
      const rot = p * 360 + idle;                       // 합체되며 한 바퀴 회전

      spin.setAttribute('transform', `translate(${CX},${CY}) rotate(${rot.toFixed(2)}) scale(1,0.94)`);

      parts.forEach((el, i) => {
        const d = PARTS[i];
        const x = d.ex + (d.ax - d.ex) * assemble;       // 분해위치 → 조립위치
        const y = d.ey + (d.ay - d.ey) * assemble;
        const a = apart * d.spin;                        // 자리를 잡으며 스핀을 푼다
        el.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${a.toFixed(1)})`);
      });

      // 시차 + 합체될수록 강해지는 광원(하나의 별)
      starsEl.style.transform = `translateY(${(-p * 120).toFixed(1)}px)`;
      glowEl.style.transform = `translate(-50%,-50%) scale(${(0.8 + assemble * 0.4).toFixed(3)})`;
      glowEl.style.opacity = (0.3 + assemble * 0.6).toFixed(2);

      head$.style.left = (p * 100).toFixed(2) + '%';
      hint.style.opacity = Math.max(0, 1 - p * 6);
      tags.forEach(tg => tg.style.opacity = apart);     // 흩어졌을 때 라벨 표시

      requestAnimationFrame(render);
    }

    // 등장: 부품 페이드인(transform 은 render 가 전담하므로 opacity 만 건드림)
    anime({ targets: parts, opacity: [0, 1], duration: 900, delay: anime.stagger(70), easing: 'easeOutQuad' });
    requestAnimationFrame(render);
  }
};

function injectStyles() {
  if (document.getElementById('ajx-style')) return;
  const css = `
  /* 전체화면(풀블리드) 우주 */
  .ajx-hero{ position:relative; height:300vh; margin-top:-48px; margin-bottom:-48px;
    width:100vw; margin-left:calc(-50vw + 50%); margin-right:calc(-50vw + 50%);
    background:#04050d; font-family:'Helvetica Neue',Arial,sans-serif; }
  .ajx-stage{ position:sticky; top:0; height:100vh; width:100%;
    display:flex; align-items:center; justify-content:center; overflow:hidden; }

  /* 네뷸라 배경 */
  .ajx-bg{ position:absolute; inset:-30%; z-index:0;
    background:
      radial-gradient(38% 50% at 28% 32%, rgba(110,72,220,.40), transparent 70%),
      radial-gradient(42% 48% at 74% 64%, rgba(40,120,200,.32), transparent 72%),
      radial-gradient(34% 40% at 60% 22%, rgba(214,68,150,.22), transparent 70%),
      radial-gradient(60% 70% at 50% 50%, #0a0a1e 0%, #05060f 55%, #03030a 100%);
    animation:ajxNebula 60s linear infinite; }
  @keyframes ajxNebula{ to{ transform:rotate(360deg) scale(1.05); } }

  /* 별빛 */
  .ajx-stars{ position:absolute; inset:-10% 0; z-index:1; will-change:transform; }
  .ajx-stars i{ position:absolute; border-radius:50%; background:#eaf0ff;
    opacity:var(--o); animation:ajxTwinkle ease-in-out infinite;
    box-shadow:0 0 6px rgba(190,205,255,.7); transform:scale(var(--d)); }
  @keyframes ajxTwinkle{ 0%,100%{ opacity:calc(var(--o) * .25); } 50%{ opacity:var(--o); } }

  /* 기계 뒤 신비한 광원 */
  .ajx-glow{ position:absolute; left:50%; top:50%; z-index:1; width:680px; height:680px;
    transform:translate(-50%,-50%); pointer-events:none;
    background:radial-gradient(circle, rgba(140,110,255,.35) 0%, rgba(80,140,230,.16) 35%, transparent 68%);
    filter:blur(8px); }

  .ajx-copy{ position:absolute; top:90px; left:6vw; z-index:4; max-width:560px; pointer-events:none; }
  .ajx-h{ margin:0; font-size:46px; line-height:1.04; font-weight:800; letter-spacing:-1.4px;
    color:#f4f2ff; text-shadow:0 0 24px rgba(150,130,255,.55), 0 2px 10px rgba(0,0,0,.4); }
  .ajx-sub{ margin:16px 0 0; font-size:14.5px; line-height:1.6; font-weight:500; color:rgba(210,214,240,.72); }

  .ajx-svg{ position:relative; z-index:2; width:100%; height:100%;
    filter:drop-shadow(0 0 3px rgba(150,140,255,.65)); }
  .ajx-svg ellipse, .ajx-svg line, .ajx-svg rect, .ajx-svg polygon, .ajx-svg path{
    fill:none; stroke:rgba(196,210,255,.62); stroke-width:1.1; vector-effect:non-scaling-stroke;
    stroke-linecap:round; stroke-linejoin:round; }

  .ajx-tag{ position:absolute; z-index:4; display:flex; align-items:center; gap:7px; transform:translate(-50%,-50%);
    opacity:0; transition:opacity .15s; pointer-events:none; }
  .ajx-tag .dot{ width:9px; height:9px; border-radius:50%; background:#a78bfa;
    box-shadow:0 0 0 4px rgba(167,139,250,.2), 0 0 12px rgba(167,139,250,.9); }
  .ajx-tag .num{ font-family:'SF Mono',Consolas,monospace; font-size:12px; font-weight:600; color:#eef0ff;
    background:rgba(255,255,255,.08); border:1px solid rgba(190,205,255,.2); padding:2px 7px; border-radius:5px;
    backdrop-filter:blur(4px); }

  .ajx-hint{ position:absolute; bottom:104px; left:50%; transform:translateX(-50%); z-index:4;
    font-size:11px; font-weight:800; letter-spacing:3px; color:rgba(200,205,235,.5); }
  .ajx-foot{ position:absolute; left:6vw; bottom:40px; z-index:4; display:flex; align-items:center; gap:14px; }
  .ajx-npm{ font-family:'SF Mono',Consolas,monospace; font-size:13px; color:#eef0ff;
    background:rgba(255,255,255,.06); border:1px solid rgba(190,205,255,.18); padding:6px 12px; border-radius:7px; }
  .ajx-ver{ font-size:11px; font-weight:700; letter-spacing:.5px; text-transform:uppercase; color:rgba(190,200,230,.42); }
  .ajx-scrub{ position:absolute; right:5vw; bottom:38px; z-index:5; width:320px; height:32px;
    background:rgba(10,10,24,.7); border:1px solid rgba(190,205,255,.15); border-radius:8px;
    overflow:hidden; box-shadow:0 8px 28px rgba(0,0,0,.4); backdrop-filter:blur(6px); }
  .ajx-ticks{ position:absolute; inset:0; display:flex; align-items:center; justify-content:space-between; padding:0 12px; }
  .ajx-ticks i{ width:1px; height:10px; background:rgba(200,210,255,.28); }
  .ajx-ticks i:nth-child(5n+1){ height:16px; background:rgba(200,210,255,.55); }
  .ajx-head{ position:absolute; top:4px; bottom:4px; left:0; width:2px; background:#ff2b2b;
    box-shadow:0 0 10px rgba(255,43,43,.9); border-radius:2px; }
  @media (max-width:760px){
    .ajx-h{ font-size:30px; } .ajx-copy{ left:6vw; }
    .ajx-scrub{ width:200px; } }`;
  const el = document.createElement('style');
  el.id = 'ajx-style';
  el.textContent = css;
  document.head.appendChild(el);
}
