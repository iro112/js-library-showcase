import { loadScript, loadStyle } from '../utils.js';

// MUI(Material UI)를 CDN(UMD)으로 로드 — 빌드 도구 없이 브라우저에서 바로 동작.
// React/ReactDOM 전역이 필요하며, MUI는 window.MaterialUI 로 노출된다.
export default {
  id: 'mui',
  title: 'MUI',
  async init(container) {
    loadStyle('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
    await loadScript('https://unpkg.com/react@18/umd/react.production.min.js');
    await loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
    await loadScript('https://unpkg.com/@mui/material@5.15.20/umd/material-ui.production.min.js');

    const React = window.React;
    const ReactDOM = window.ReactDOM;
    const MUI = window.MaterialUI;
    const { useState } = React;
    const h = React.createElement;
    const {
      ThemeProvider, createTheme,
      Paper, Stack, Typography, Button, Slider, Switch, FormControlLabel,
      TextField, Chip, Rating, Divider, Alert,
    } = MUI;

    container.innerHTML = `
      <div class="sp-page">
        <div class="sp-head">
          <div>
            <span class="sp-cat">프레임워크</span>
            <h2 class="sp-title">MUI (Material UI)</h2>
            <p class="sp-desc">구글 머티리얼 디자인을 구현한 React 컴포넌트 라이브러리. 버튼·슬라이더·입력 폼 등 완성도 높은 UI 컴포넌트를 즉시 사용할 수 있습니다. 아래 데모는 CDN으로 불러온 MUI가 실제로 동작하는 모습입니다.</p>
          </div>
          <div class="sp-install">
            <div class="sp-cmd"><span class="sp-cmd-label">npm</span><code>npm i @mui/material @emotion/react @emotion/styled</code></div>
            <div class="sp-cmd"><span class="sp-cmd-label">cdn</span><code>unpkg.com/@mui/material</code></div>
          </div>
        </div>
        <div class="sp-demo-wrap">
          <div id="mui-root" style="max-width:520px;margin:0 auto;"></div>
        </div>
        <div class="sp-note"><strong>핵심:</strong> <code>ThemeProvider</code>로 색상·타이포 테마를 주입하고, <code>Button</code>·<code>Slider</code> 같은 컴포넌트를 props로 제어합니다. 실제 프로젝트에선 npm + 번들러(Vite 등)로 설치합니다.</div>
      </div>`;

    // 쇼케이스 강조색(보라)과 어울리는 라이트 테마
    const theme = createTheme({
      palette: { primary: { main: '#7c3aed' }, secondary: { main: '#06b6d4' } },
      shape: { borderRadius: 10 },
      typography: { fontFamily: 'Roboto, system-ui, sans-serif' },
    });

    function Demo() {
      const [vol, setVol] = useState(40);
      const [dark, setDark] = useState(false);
      const [name, setName] = useState('');
      const [rating, setRating] = useState(4);

      return h(Paper, { elevation: 3, sx: { p: 4, borderRadius: 3 } },
        h(Typography, { variant: 'h5', fontWeight: 700, gutterBottom: true }, 'Material Design 컴포넌트'),
        h(Typography, { variant: 'body2', color: 'text.secondary', sx: { mb: 3 } }, '아래 요소들은 모두 MUI 컴포넌트이며 React 상태로 제어됩니다.'),

        h(Stack, { direction: 'row', spacing: 1.5, sx: { mb: 3 }, flexWrap: 'wrap', useFlexGap: true },
          h(Button, { variant: 'contained' }, 'Contained'),
          h(Button, { variant: 'outlined' }, 'Outlined'),
          h(Button, { variant: 'text' }, 'Text'),
          h(Button, { variant: 'contained', color: 'secondary' }, 'Secondary'),
        ),

        h(Divider, { sx: { my: 2 } }),

        h(Typography, { gutterBottom: true }, `볼륨: ${vol}`),
        h(Slider, { value: vol, onChange: (_, v) => setVol(v), valueLabelDisplay: 'auto', sx: { mb: 1 } }),

        h(FormControlLabel, {
          control: h(Switch, { checked: dark, onChange: e => setDark(e.target.checked) }),
          label: dark ? '다크 모드 ON' : '다크 모드 OFF',
          sx: { mb: 2, display: 'block' },
        }),

        h(TextField, {
          label: '이름', variant: 'outlined', size: 'small', fullWidth: true,
          value: name, onChange: e => setName(e.target.value), sx: { mb: 3 },
        }),

        h(Stack, { direction: 'row', spacing: 1, alignItems: 'center', sx: { mb: 3 }, flexWrap: 'wrap', useFlexGap: true },
          h(Chip, { label: 'React', color: 'primary' }),
          h(Chip, { label: 'Material', color: 'secondary', variant: 'outlined' }),
          h(Chip, { label: 'Component', onDelete: () => {} }),
        ),

        h(Typography, { gutterBottom: true }, '평점'),
        h(Rating, { value: rating, onChange: (_, v) => setRating(v || 0), sx: { mb: 2 } }),

        h(Alert, { severity: name ? 'success' : 'info' },
          name ? `안녕하세요, ${name}님! 평점 ${rating}점 / 볼륨 ${vol}` : '이름을 입력하면 메시지가 바뀝니다.'),
      );
    }

    function App() {
      return h(ThemeProvider, { theme }, h(Demo));
    }

    const root = ReactDOM.createRoot(container.querySelector('#mui-root'));
    root.render(h(App));
  }
};
