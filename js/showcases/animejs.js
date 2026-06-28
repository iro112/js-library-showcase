import { loadScript } from '../utils.js';

// animejs.com 공식 히어로를 오마주한 Anime.js 쇼케이스
// - 크림색 배경 + 굵은 헤드라인
// - anime.js 타임라인으로 조립되는 와이어프레임 기계(렌즈/기어) 오브젝트
// - 우하단의 빨간 플레이헤드 타임라인 스크러버 (드래그로 seek 가능)
export default {
  id: 'animejs',
  title: 'Anime.js',
  async init(container) {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js');
    const anime = window.anime;

    injectStyles();

    // ---- SVG 지오메트리 (모두 원점 0,0 기준 → 그룹 회전이 중심축을 돈다) ----
    const ticks = (r, n, len, w) => {
      let s = '';
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const x1 = Math.cos(a) * r, y1 = Math.sin(a) * r;
        const x2 = Math.cos(a) * (r + len), y2 = Math.sin(a) * (r + len);
        s += `<line class="tk" pathLength="1" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke-width="${w}"/>`;
      }
      return s;
    };
    const ring = (r, w) => `<circle class="rg" pathLength="1" cx="0" cy="0" r="${r}" fill="none" stroke-width="${w}"/>`;

    // 오른쪽으로 뻗는 렌즈 배럴(타원 적층)
    let barrel = '';
    const BN = 7;
    for (let i = 0; i < BN; i++) {
      const t = i / (BN - 1);
      const x = 170 + t * 250;
      const ry = 152 - t * 64;
      barrel += `<ellipse class="brl" pathLength="1" cx="${x.toFixed(0)}" cy="0" rx="11" ry="${ry.toFixed(0)}" fill="none" stroke-width="1"/>`;
    }
    // 배럴 상·하 연결선 + 전면 렌즈 디스크
    const conn =
      `<line class="conn" pathLength="1" x1="170" y1="-152" x2="420" y2="-88"/>` +
      `<line class="conn" pathLength="1" x1="170" y1="152" x2="420" y2="88"/>` +
      `<ellipse class="conn" pathLength="1" cx="445" cy="0" rx="20" ry="92" fill="none"/>`;

    // 왼쪽 피스톤 클러스터(작은 원 3개)
    let pist = '';
    [-70, 0, 70].forEach(y => {
      pist += `<circle class="pist" pathLength="1" cx="-205" cy="${y}" r="34" fill="none"/>` +
              `<circle class="pist" pathLength="1" cx="-205" cy="${y}" r="20" fill="none"/>`;
    });

    container.innerHTML = `
      <div class="ajx-hero">
        <div class="ajx-copy">
          <h2 class="ajx-h">The complete<br>animator's toolbox</h2>
          <p class="ajx-sub">Break free from browser limitations and animate<br>anything on the web with a single API.</p>
        </div>

        <div class="ajx-stage">
          <svg viewBox="0 0 1100 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <g transform="translate(545,300)">
              ${pist}
              <line class="conn" pathLength="1" x1="-205" y1="-70" x2="-150" y2="0"/>
              <line class="conn" pathLength="1" x1="-205" y1="70" x2="-150" y2="0"/>

              <!-- 회전하는 동심 기어/노치 링 (data-spin: 초, data-dir: 방향) -->
              <g class="ring" data-spin="26" data-dir="1">${ring(152, 1)}${ticks(152, 64, 16, 1)}</g>
              <g class="ring" data-spin="18" data-dir="-1">${ring(112, 1.6)}${ticks(112, 32, -24, 1.6)}</g>
              <g class="ring" data-spin="34" data-dir="1">${ring(78, 1)}${ticks(78, 96, 7, 1)}</g>
              <g class="ring" data-spin="14" data-dir="-1">${ring(46, 1.2)}</g>

              <!-- 중앙 크로스헤어 + 빨간 포커스 마크 -->
              <line class="cross" pathLength="1" x1="-22" y1="0" x2="22" y2="0"/>
              <line class="cross" pathLength="1" x1="0" y1="-22" x2="0" y2="22"/>
              <line class="focus" pathLength="1" x1="0" y1="-78" x2="0" y2="-58" stroke-width="3"/>

              ${barrel}
              ${conn}
            </g>
          </svg>
        </div>

        <div class="ajx-foot">
          <code class="ajx-npm">npm i animejs</code>
          <span class="ajx-ver">v3.2 · stagger · timeline</span>
        </div>

        <!-- 타임라인 스크러버 -->
        <div class="ajx-scrub" id="ajx-scrub" role="slider" aria-label="타임라인" tabindex="0">
          <div class="ajx-ticks">${Array.from({ length: 60 }, () => '<i></i>').join('')}</div>
          <div class="ajx-head" id="ajx-head"></div>
        </div>
      </div>`;

    // ---- 타임라인: 부품이 strokeDashoffset 으로 그려지며 조립 ----
    const tl = anime.timeline({ autoplay: true, loop: true, easing: 'easeInOutSine' });
    tl.add({ targets: '.ajx-hero .rg, .ajx-hero .tk', strokeDashoffset: [1, 0], opacity: [0, 1],
             duration: 1000, delay: anime.stagger(7, { from: 'center' }) }, 0)
      .add({ targets: '.ajx-hero .cross', strokeDashoffset: [1, 0], opacity: [0, 1], duration: 500 }, 300)
      .add({ targets: '.ajx-hero .pist', strokeDashoffset: [1, 0], opacity: [0, 1],
             duration: 600, delay: anime.stagger(70) }, 200)
      .add({ targets: '.ajx-hero .brl', strokeDashoffset: [1, 0], opacity: [0, 1],
             duration: 700, delay: anime.stagger(70) }, 500)
      .add({ targets: '.ajx-hero .conn', strokeDashoffset: [1, 0], opacity: [0, 1],
             duration: 650, delay: anime.stagger(60) }, 650)
      .add({ targets: '.ajx-hero .focus', strokeDashoffset: [1, 0], opacity: [0, 1], duration: 350 }, 1150)
      .add({ targets: '.ajx-hero .ajx-h', opacity: [0, 1], translateX: [-14, 0], duration: 700 }, 150)
      .add({ targets: '.ajx-hero .ajx-sub', opacity: [0, 1], translateX: [-14, 0], duration: 700 }, 350)
      .add({ duration: 1400 }); // 루프 사이 여유

    // ---- 동심 링 연속 회전 (중심축 기준) ----
    container.querySelectorAll('.ajx-hero .ring').forEach(g => {
      anime({ targets: g, rotate: parseFloat(g.dataset.dir) * 360,
              duration: parseFloat(g.dataset.spin) * 1000, easing: 'linear', loop: true });
    });

    // ---- 전체 스테이지 미세 부유 ----
    anime({ targets: '.ajx-hero .ajx-stage svg', translateY: [-8, 8],
            direction: 'alternate', duration: 4200, easing: 'easeInOutSine', loop: true });

    // ---- 스크러버: 재생 진행 표시 + 드래그 seek ----
    const scrub = container.querySelector('#ajx-scrub');
    const head = container.querySelector('#ajx-head');
    let scrubbing = false;

    const setHead = p => { head.style.left = (p * 100).toFixed(2) + '%'; };
    const seekTo = clientX => {
      const r = scrub.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      tl.seek(p * tl.duration);
      setHead(p);
    };

    scrub.addEventListener('pointerdown', e => {
      scrubbing = true; tl.pause(); scrub.setPointerCapture(e.pointerId); seekTo(e.clientX);
    });
    scrub.addEventListener('pointermove', e => { if (scrubbing) seekTo(e.clientX); });
    const endScrub = () => { if (scrubbing) { scrubbing = false; tl.play(); } };
    scrub.addEventListener('pointerup', endScrub);
    scrub.addEventListener('pointercancel', endScrub);

    // 재생 중 플레이헤드 동기화
    const sync = () => { if (!scrubbing) setHead((tl.progress || 0) / 100); requestAnimationFrame(sync); };
    requestAnimationFrame(sync);
  }
};

function injectStyles() {
  if (document.getElementById('ajx-style')) return;
  const css = `
  .ajx-hero{ position:relative; background:#dad5d0; border-radius:16px; min-height:560px;
    overflow:hidden; margin:-4px 0; font-family:'Helvetica Neue',Arial,sans-serif; }
  .ajx-copy{ position:absolute; top:48px; left:52px; z-index:3; max-width:520px; }
  .ajx-h{ margin:0; font-size:46px; line-height:1.04; font-weight:800; letter-spacing:-1.4px; color:#1b1714; }
  .ajx-sub{ margin:18px 0 0; font-size:15px; line-height:1.5; font-weight:600; color:rgba(27,23,20,.6); }
  .ajx-stage{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
  .ajx-stage svg{ width:100%; height:100%; max-height:560px; }
  .ajx-hero svg line, .ajx-hero svg circle, .ajx-hero svg ellipse{ stroke:rgba(34,30,26,.5); }
  .ajx-hero svg [pathLength]{ stroke-dasharray:1; stroke-dashoffset:1; }
  .ajx-hero .focus{ stroke:#ff2b2b !important; }
  .ajx-foot{ position:absolute; left:52px; bottom:40px; z-index:3; display:flex; align-items:center; gap:14px; }
  .ajx-npm{ font-family:'SF Mono',Consolas,monospace; font-size:13px; color:#1b1714;
    background:rgba(27,23,20,.07); border:1px solid rgba(27,23,20,.14); padding:6px 12px; border-radius:7px; }
  .ajx-ver{ font-size:11px; font-weight:700; letter-spacing:.5px; text-transform:uppercase; color:rgba(27,23,20,.45); }
  .ajx-scrub{ position:absolute; right:36px; bottom:36px; z-index:4; width:340px; height:34px;
    background:#1b1714; border-radius:8px; cursor:ew-resize; overflow:hidden;
    box-shadow:0 8px 24px rgba(0,0,0,.18); touch-action:none; }
  .ajx-ticks{ position:absolute; inset:0; display:flex; align-items:center; justify-content:space-between;
    padding:0 12px; pointer-events:none; }
  .ajx-ticks i{ width:1px; height:11px; background:rgba(255,255,255,.32); }
  .ajx-ticks i:nth-child(5n+1){ height:17px; background:rgba(255,255,255,.55); }
  .ajx-head{ position:absolute; top:4px; bottom:4px; left:0; width:2px; background:#ff2b2b;
    box-shadow:0 0 8px rgba(255,43,43,.8); border-radius:2px; transform:translateX(-1px); }
  @media (max-width:760px){
    .ajx-h{ font-size:32px; } .ajx-copy{ top:32px; left:28px; }
    .ajx-scrub{ width:220px; right:20px; } .ajx-foot{ left:28px; bottom:28px; }
  }`;
  const el = document.createElement('style');
  el.id = 'ajx-style';
  el.textContent = css;
  document.head.appendChild(el);
}
