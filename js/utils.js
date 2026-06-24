const _scripts = new Set();

export function loadScript(url) {
  if (_scripts.has(url)) return Promise.resolve();
  _scripts.add(url);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = url;
    s.onload = resolve;
    s.onerror = () => { _scripts.delete(url); reject(new Error(`Failed: ${url}`)); };
    document.head.appendChild(s);
  });
}

export function loadStyle(url) {
  if (document.querySelector(`link[href="${url}"]`)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = url;
    l.onload = resolve;
    l.onerror = reject;
    document.head.appendChild(l);
  });
}
