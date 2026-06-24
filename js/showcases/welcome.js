export default {
  id: 'welcome',
  title: '홈',
  init(container) {
    container.innerHTML = `
      <section class="welcome-hero">
        <h2 class="hero-title">JS 라이브러리 쇼케이스</h2>
        <p class="hero-desc">
          다양한 JavaScript 라이브러리를 직접 실행해보는 인터랙티브 데모 모음입니다.<br>
          상단 탭을 클릭해 각 라이브러리의 쇼케이스를 확인하세요.
        </p>
      </section>

      <section class="how-to-add">
        <h3>새 쇼케이스 추가하기</h3>
        <div class="steps">

          <div class="step">
            <div class="step-num">1</div>
            <div class="step-body">
              <strong>쇼케이스 모듈 파일 생성</strong>
              <p><code>js/showcases/my-library.js</code> 파일을 만들고 아래 형태로 export:</p>
              <pre><code>export default {
  id: 'my-library',    // 고유 식별자
  title: '라이브러리명', // 탭에 표시될 이름
  init(container, { app }) {
    // container: 콘텐츠를 렌더링할 DOM 요소
    // app.switchTo(id): 다른 탭으로 이동 (선택사항)
    container.innerHTML = '&lt;h2&gt;데모 내용&lt;/h2&gt;';

    // 라이브러리 초기화 코드
  }
};</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-num">2</div>
            <div class="step-body">
              <strong>main.js에 등록</strong>
              <p><code>js/main.js</code>에서 import 후 <code>app.register()</code> 호출:</p>
              <pre><code>import MyLibraryShowcase from './showcases/my-library.js';

app
  .register(WelcomeShowcase)
  .register(MyLibraryShowcase) // 추가
  .init();</code></pre>
            </div>
          </div>

        </div>
      </section>
    `;
  }
};
