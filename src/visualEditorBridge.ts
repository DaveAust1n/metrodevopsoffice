type VisualEdit = {
  selector: string;
  tag: string;
  text?: string;
  src?: string;
  color?: string;
  backgroundColor?: string;
};

type EditorMessage =
  | { type: 'metrodevops:enter-editor'; edits?: VisualEdit[] }
  | { type: 'metrodevops:apply-edit'; edit: VisualEdit }
  | { type: 'metrodevops:exit-editor' };

let installed = false;
let editorMode = false;
let selectedElement: HTMLElement | null = null;
let overlayStyle: HTMLStyleElement | null = null;
const originalOutline = new WeakMap<HTMLElement, string>();

function allowedParentOrigin(origin: string) {
  try {
    const url = new URL(origin);
    return url.protocol === 'https:' && url.hostname.includes('metrodevopshub') && url.hostname.endsWith('vercel.app');
  } catch {
    return false;
  }
}

function selectorFor(element: HTMLElement): string {
  const parts: string[] = [];
  let current: HTMLElement | null = element;
  while (current && current !== document.body && parts.length < 8) {
    if (current.id && !current.id.startsWith('metro-editor-')) {
      parts.unshift(`#${CSS.escape(current.id)}`);
      break;
    }
    const tag = current.tagName.toLowerCase();
    const siblings = current.parentElement
      ? Array.from(current.parentElement.children).filter(child => child.tagName === current!.tagName)
      : [];
    const index = siblings.indexOf(current) + 1;
    parts.unshift(`${tag}:nth-of-type(${Math.max(1, index)})`);
    current = current.parentElement;
  }
  return parts.join(' > ');
}

function toHex(color: string): string {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return color;
  return '#' + match.slice(1, 4).map(value => Number(value).toString(16).padStart(2, '0')).join('');
}

function sendSelected(element: HTMLElement) {
  window.parent.postMessage({
    type: 'metrodevops:element-selected',
    selector: selectorFor(element),
    tag: element.tagName.toLowerCase(),
    text: element.innerText?.slice(0, 2000) ?? '',
    src: element instanceof HTMLImageElement ? element.currentSrc || element.src : '',
    color: toHex(getComputedStyle(element).color),
    backgroundColor: toHex(getComputedStyle(element).backgroundColor),
    canEditText: ['h1','h2','h3','h4','h5','p','a','button','span','li','div'].includes(element.tagName.toLowerCase()),
  }, '*');
}

function applyEdit(edit: VisualEdit) {
  let element: Element | null = null;
  try { element = document.querySelector(edit.selector); } catch { return; }
  if (!(element instanceof HTMLElement)) return;
  if (typeof edit.text === 'string') element.textContent = edit.text;
  if (typeof edit.src === 'string' && element instanceof HTMLImageElement) element.src = edit.src;
  if (typeof edit.color === 'string') element.style.color = edit.color;
  if (typeof edit.backgroundColor === 'string') element.style.backgroundColor = edit.backgroundColor;
}

function onClick(event: MouseEvent) {
  if (!editorMode || !(event.target instanceof Element)) return;
  const target = event.target.closest('h1,h2,h3,h4,h5,p,a,button,span,li,img,section,article,div');
  if (!(target instanceof HTMLElement) || target.closest('[data-metro-editor-ui]')) return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  if (selectedElement && originalOutline.has(selectedElement)) {
    selectedElement.style.outline = originalOutline.get(selectedElement) ?? '';
    selectedElement.style.outlineOffset = '';
  }
  selectedElement = target;
  if (!originalOutline.has(target)) originalOutline.set(target, target.style.outline);
  target.style.outline = '2px solid #00d9ff';
  target.style.outlineOffset = '3px';
  sendSelected(target);
}

function onMessage(event: MessageEvent<EditorMessage>) {
  if (event.source !== window.parent || !allowedParentOrigin(event.origin)) return;
  const message = event.data;
  if (!message || typeof message !== 'object') return;
  if (message.type === 'metrodevops:enter-editor') {
    editorMode = true;
    if (!overlayStyle) {
      overlayStyle = document.createElement('style');
      overlayStyle.id = 'metro-editor-style';
      overlayStyle.textContent = 'html.metro-editor-active, html.metro-editor-active * { cursor: crosshair !important; }';
      document.head.appendChild(overlayStyle);
    }
    document.documentElement.classList.add('metro-editor-active');
    (message.edits ?? []).forEach(applyEdit);
    window.parent.postMessage({ type: 'metrodevops:editor-ready' }, '*');
  } else if (message.type === 'metrodevops:apply-edit') {
    applyEdit(message.edit);
  } else if (message.type === 'metrodevops:exit-editor') {
    editorMode = false;
    document.documentElement.classList.remove('metro-editor-active');
    if (selectedElement) {
      selectedElement.style.outline = originalOutline.get(selectedElement) ?? '';
      selectedElement.style.outlineOffset = '';
    }
    selectedElement = null;
  }
}

export function installVisualEditorBridge() {
  if (installed || window.parent === window) return;
  installed = true;
  window.addEventListener('message', onMessage);
  document.addEventListener('click', onClick, true);
  window.parent.postMessage({ type: 'metrodevops:bridge-loaded' }, '*');
}
