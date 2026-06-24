import { ShowcaseApp } from './app.js';
import WelcomeShowcase from './showcases/welcome.js';

// ── 애니메이션 ──────────────────────────────
import GsapShowcase from './showcases/gsap.js';
import AnimejsShowcase from './showcases/animejs.js';
import MotionOneShowcase from './showcases/motion-one.js';
import FramerMotionShowcase from './showcases/framer-motion.js';
import LottieShowcase from './showcases/lottie.js';
import AutoAnimateShowcase from './showcases/autoanimate.js';
import VelocityShowcase from './showcases/velocityjs.js';
import PopmotionShowcase from './showcases/popmotion.js';
import MojsShowcase from './showcases/mojs.js';

// ── 스크롤 ──────────────────────────────────
import ScrollTriggerShowcase from './showcases/scrolltrigger.js';
import LenisShowcase from './showcases/lenis.js';
import LocomotiveScrollShowcase from './showcases/locomotive-scroll.js';
import AosShowcase from './showcases/aos.js';
import ScrollRevealShowcase from './showcases/scrollreveal.js';

// ── 3D / WebGL ──────────────────────────────
import ThreejsShowcase from './showcases/threejs.js';
import BabylonjsShowcase from './showcases/babylonjs.js';
import TsparticlesShowcase from './showcases/tsparticles.js';
import SplineShowcase from './showcases/spline.js?v=2';

// ── 데이터 시각화 ────────────────────────────
import ChartjsShowcase from './showcases/chartjs.js';
import D3jsShowcase from './showcases/d3js.js';
import ApexchartsShowcase from './showcases/apexcharts.js';
import EchartsShowcase from './showcases/echarts.js';
import FrappeChartsShowcase from './showcases/frappe-charts.js';
import HighchartsShowcase from './showcases/highcharts.js';
import ObservablePlotShowcase from './showcases/observable-plot.js';

// ── 슬라이더 ─────────────────────────────────
import SwiperjsShowcase from './showcases/swiperjs.js';
import SplideShowcase from './showcases/splide.js';
import GlidejsShowcase from './showcases/glidejs.js';
import EmblaShowcase from './showcases/embla.js';

// ── 드래그 & 인터랙션 ───────────────────────
import SortablejsShowcase from './showcases/sortablejs.js';
import InteractjsShowcase from './showcases/interactjs.js';
import HammerjsShowcase from './showcases/hammerjs.js';
import GsapDraggableShowcase from './showcases/gsap-draggable.js';

// ── 텍스트 효과 ──────────────────────────────
import SplitTypeShowcase from './showcases/splittype.js';
import TypedjsShowcase from './showcases/typedjs.js';
import CountupjsShowcase from './showcases/countupjs.js';
import SplittingjsShowcase from './showcases/splittingjs.js';

// ── 레이아웃 ─────────────────────────────────
import MasonryShowcase from './showcases/masonry.js';
import MuuriShowcase from './showcases/muuri.js';
import PackeryShowcase from './showcases/packery.js';

// ── 이미지 & 미디어 ──────────────────────────
import GlightboxShowcase from './showcases/glightbox.js';
import CropperShowcase from './showcases/cropperjs.js';
import ViewerjsShowcase from './showcases/viewerjs.js';
import PlyrShowcase from './showcases/plyr.js';

// ── UX 감성 ──────────────────────────────────
import BarbaShowcase from './showcases/barbajs.js';
import ConfettiShowcase from './showcases/canvas-confetti.js';
import Sweetalert2Showcase from './showcases/sweetalert2.js';
import TippyjsShowcase from './showcases/tippyjs.js';
import HowlerjsShowcase from './showcases/howlerjs.js';

// ── 앱 초기화 ────────────────────────────────
const app = new ShowcaseApp('#tab-nav', '#showcase-content');

app
  .register(WelcomeShowcase)
  // 애니메이션
  .register(GsapShowcase)
  .register(AnimejsShowcase)
  .register(MotionOneShowcase)
  .register(FramerMotionShowcase)
  .register(LottieShowcase)
  .register(AutoAnimateShowcase)
  .register(VelocityShowcase)
  .register(PopmotionShowcase)
  .register(MojsShowcase)
  // 스크롤
  .register(ScrollTriggerShowcase)
  .register(LenisShowcase)
  .register(LocomotiveScrollShowcase)
  .register(AosShowcase)
  .register(ScrollRevealShowcase)
  // 3D / WebGL
  .register(ThreejsShowcase)
  .register(BabylonjsShowcase)
  .register(TsparticlesShowcase)
  .register(SplineShowcase)
  // 데이터 시각화
  .register(ChartjsShowcase)
  .register(D3jsShowcase)
  .register(ApexchartsShowcase)
  .register(EchartsShowcase)
  .register(FrappeChartsShowcase)
  .register(HighchartsShowcase)
  .register(ObservablePlotShowcase)
  // 슬라이더
  .register(SwiperjsShowcase)
  .register(SplideShowcase)
  .register(GlidejsShowcase)
  .register(EmblaShowcase)
  // 드래그 & 인터랙션
  .register(SortablejsShowcase)
  .register(InteractjsShowcase)
  .register(HammerjsShowcase)
  .register(GsapDraggableShowcase)
  // 텍스트 효과
  .register(SplitTypeShowcase)
  .register(TypedjsShowcase)
  .register(CountupjsShowcase)
  .register(SplittingjsShowcase)
  // 레이아웃
  .register(MasonryShowcase)
  .register(MuuriShowcase)
  .register(PackeryShowcase)
  // 이미지 & 미디어
  .register(GlightboxShowcase)
  .register(CropperShowcase)
  .register(ViewerjsShowcase)
  .register(PlyrShowcase)
  // UX 감성
  .register(BarbaShowcase)
  .register(ConfettiShowcase)
  .register(Sweetalert2Showcase)
  .register(TippyjsShowcase)
  .register(HowlerjsShowcase)
  .init();
