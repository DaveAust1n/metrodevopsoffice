// Plain JavaScript runtime. The portfolio does not load React or Hub's editor bundle.
const editor = new URLSearchParams(location.search).get('mode') === 'editor' && parent !== window;
const [manifest, seed] = await Promise.all(['manifest.json','seed.json'].map(async file => {
 const response=await fetch(new URL(file,import.meta.url));if(!response.ok)throw Error('Portfolio assets unavailable');return response.json();
}));
const templates = new Map([...document.querySelectorAll('[data-hub-services]')].map(list => [list.dataset.hubServices,list.firstElementChild.cloneNode(true)]));
const fields = new Map(manifest.fields.map(field=>[field.id,field]));
let selected=null;
function text(value,max=10000){return typeof value==='string'?value.slice(0,max):'';}
function render(content){
 if(content?.adapter!==manifest.adapter)return;
 for(const [id,value] of Object.entries(content.fields||{})){
  const field=fields.get(id);if(!field||typeof value!=='string')continue;
  const node=document.querySelector(`[data-hub-node="${field.node}"]`)?.childNodes[field.index];
  if(node?.nodeType===3)node.nodeValue=text(value);
 }
 if(Array.isArray(content.services))for(const list of document.querySelectorAll('[data-hub-services]')){
  const fragment=document.createDocumentFragment();
  for(const item of content.services.slice(0,150)){
   if(item.group!==list.dataset.hubServices||item.visible===false)continue;
   const card=templates.get(item.group).cloneNode(true);card.dataset.serviceId=text(item.id,100);
   for(const key of ['name','description','price']){const node=card.querySelector(`[data-service-field="${key}"]`);node.textContent=text(item[key]);node.hidden=key==='price'&&!item[key];}
   fragment.append(card);
  }
  list.replaceChildren(fragment);
 }
}
render(seed);
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');
toggle?.setAttribute('aria-expanded','false');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('main-nav-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');});
nav?.addEventListener('click',event=>{if(event.target.closest('a')){nav.classList.remove('main-nav-open');toggle.setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){nav?.classList.remove('main-nav-open');toggle?.setAttribute('aria-expanded','false');}});
if(editor){
 document.documentElement.dataset.editorActive='true';
 window.addEventListener('message',event=>{
  if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='hub:content')return;
  render(event.data.content);
  if(event.data.focus){const field=fields.get(event.data.focus);const target=field?document.querySelector(`[data-hub-node="${field.node}"]`):[...document.querySelectorAll('[data-service-id]')].find(n=>n.dataset.serviceId===event.data.focus);target?.scrollIntoView({block:'center',behavior:'smooth'});}
 });
 document.addEventListener('click',event=>{
  const service=event.target.closest('[data-service-id]'),node=event.target.closest('[data-hub-node]');
  if(!service&&!node)return;
  event.preventDefault();event.stopImmediatePropagation();selected?.classList.remove('hub-selected');selected=service||node;selected.classList.add('hub-selected');
  parent.postMessage({type:'hub:select',serviceId:service?.dataset.serviceId,fieldIds:node?manifest.fields.filter(f=>f.node===node.dataset.hubNode).map(f=>f.id):[]},location.origin);
 },true);
 parent.postMessage({type:'hub:ready'},location.origin);
}else{
 const slug=new URLSearchParams(location.search).get('site')||document.body.dataset.hubSite;
 if(slug){
  try{const response=await fetch('https://metrodevopshub.vercel.app/api/connected-content?site='+encodeURIComponent(slug),{cache:'no-store'});if(!response.ok)throw Error('This website is not published.');const result=await response.json();render(result.content);document.title=result.title||document.title;}
  catch(error){if(!document.body.dataset.hubSite)document.querySelector('main').replaceChildren(Object.assign(document.createElement('p'),{textContent:error.message}));}
 }
}
