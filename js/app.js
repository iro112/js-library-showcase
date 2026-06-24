export class ShowcaseApp {
  #showcases = [];
  #activeId = null;
  #navEl;
  #contentEl;

  constructor(navSelector, contentSelector) {
    this.#navEl = document.querySelector(navSelector);
    this.#contentEl = document.querySelector(contentSelector);
  }

  register(showcase) {
    this.#showcases.push(showcase);
    return this; // 체이닝 지원
  }

  init() {
    this.#renderTabs();
    if (this.#showcases.length > 0) {
      this.#activate(this.#showcases[0].id);
    }
    return this;
  }

  switchTo(id) {
    this.#activate(id);
  }

  #renderTabs() {
    this.#navEl.innerHTML = '';
    this.#showcases.forEach(showcase => {
      const btn = document.createElement('button');
      btn.className = 'tab-btn';
      btn.dataset.id = showcase.id;
      btn.textContent = showcase.title;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.addEventListener('click', () => this.#activate(showcase.id));
      this.#navEl.appendChild(btn);
    });
  }

  #activate(id) {
    if (this.#activeId === id) return;
    this.#activeId = id;

    const showcase = this.#showcases.find(s => s.id === id);
    if (!showcase) return;

    this.#navEl.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.dataset.id === id;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    this.#contentEl.innerHTML = '';
    const panel = document.createElement('div');
    panel.className = 'showcase-panel';
    panel.setAttribute('role', 'tabpanel');
    this.#contentEl.appendChild(panel);

    showcase.init(panel, { app: this });
  }
}
