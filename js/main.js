import { ShowcaseApp } from './app.js';
import WelcomeShowcase from './showcases/welcome.js';
import GsapDemoShowcase from './showcases/gsap-demo.js';

// ── 새 쇼케이스는 여기에 import 후 register() 추가 ──
const app = new ShowcaseApp('#tab-nav', '#showcase-content');

app
  .register(WelcomeShowcase)
  .register(GsapDemoShowcase)
  .init();
