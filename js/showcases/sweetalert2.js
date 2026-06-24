import { loadScript } from '../utils.js';

export default {
  id: 'sweetalert2',
  title: 'SweetAlert2',
  async init(container) {
    await loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11.10.2/dist/sweetalert2.all.min.js');
    const Swal = window.Swal;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">UX 감성</span>
            <h2 class="sp-title">SweetAlert2</h2>
            <p class="sp-desc">브라우저 기본 alert/confirm/prompt를 대체하는 아름다운 모달 라이브러리. 다양한 타입과 커스텀 HTML을 지원합니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i sweetalert2</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>jsdelivr.net</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap" style="text-align:center;">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:480px;margin:0 auto;">
            <button class="demo-btn" id="sw2-success">Success</button>
            <button class="demo-btn sec" id="sw2-error">Error</button>
            <button class="demo-btn sec" id="sw2-warning">Warning</button>
            <button class="demo-btn sec" id="sw2-confirm">Confirm</button>
            <button class="demo-btn sec" id="sw2-input">Input</button>
            <button class="demo-btn sec" id="sw2-toast">Toast</button>
          </div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>Swal.fire({ title, text, icon })</code>로 기본 사용. <code>await Swal.fire()</code>로 사용자 응답을 비동기로 받아 다음 처리를 이어갈 수 있습니다.</div>
      </div>`;

    document.getElementById('sw2-success').onclick = () => Swal.fire({ title:'완료!', text:'작업이 성공적으로 완료되었습니다.', icon:'success', confirmButtonColor:'#7c3aed', background:'#1a1d27', color:'#e6edf3' });
    document.getElementById('sw2-error').onclick = () => Swal.fire({ title:'오류 발생', text:'요청을 처리하는 중 문제가 생겼습니다.', icon:'error', confirmButtonColor:'#7c3aed', background:'#1a1d27', color:'#e6edf3' });
    document.getElementById('sw2-warning').onclick = () => Swal.fire({ title:'주의', text:'이 작업은 되돌릴 수 없습니다.', icon:'warning', confirmButtonColor:'#7c3aed', background:'#1a1d27', color:'#e6edf3' });
    document.getElementById('sw2-confirm').onclick = async () => {
      const r = await Swal.fire({ title:'삭제할까요?', text:'삭제하면 복구가 불가능합니다.', icon:'question',
        showCancelButton:true, confirmButtonText:'삭제', cancelButtonText:'취소',
        confirmButtonColor:'#ef4444', background:'#1a1d27', color:'#e6edf3' });
      if (r.isConfirmed) Swal.fire({ title:'삭제됨', icon:'success', timer:1500, showConfirmButton:false, background:'#1a1d27', color:'#e6edf3' });
    };
    document.getElementById('sw2-input').onclick = async () => {
      const r = await Swal.fire({ title:'이름 입력', input:'text', inputPlaceholder:'이름을 입력하세요', confirmButtonColor:'#7c3aed', background:'#1a1d27', color:'#e6edf3', inputAttributes:{style:'background:#21262d;color:#e6edf3;border:1px solid #30363d;'} });
      if (r.value) Swal.fire({ title:`안녕하세요, ${r.value}!`, icon:'success', background:'#1a1d27', color:'#e6edf3', confirmButtonColor:'#7c3aed' });
    };
    document.getElementById('sw2-toast').onclick = () => Swal.mixin({ toast:true, position:'top-end', showConfirmButton:false, timer:3000, background:'#1a1d27', color:'#e6edf3' }).fire({ icon:'success', title:'저장되었습니다!' });
  }
};
