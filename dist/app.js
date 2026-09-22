import {experiences,escapeHtml,publicationHtml,experienceHtml,servicesHtml,educationHtml,cvHtml} from './content.js?v=2';
import {scenes,clampPosition,sceneAt,depthAt} from './navigation.js?v=3';
const $=s=>document.querySelector(s);
const reader=$('#reader'),thumbs=$('#thumbnails'),content=$('#content');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const sectionLabels={intro:'Introduction',research:'Research & experience',publications:'Publications',community:'Community service',about:'About'};
let position=12,target=12,slice=-1,stateKey='',currentSection='intro',experienceIndex=0,opener=null,publications=[],raf=0,lastFrame=0,entryAnimation=null;
const publicationReady=fetch('publications.json').then(r=>{if(!r.ok)throw Error('Bibliography unavailable');return r.json()}).then(data=>publications=data);
publicationReady.catch(()=>{});
const urlFor=i=>`assets/ct/slice-${String(i+1).padStart(2,'0')}.png`;
for(let i=0;i<34;i++){
 const b=document.createElement('button');b.className='thumbnail';b.dataset.slice=i;b.setAttribute('aria-label',`CT slice ${i+1} of 34`);b.innerHTML=`<img src="${urlFor(i)}" alt="" loading="lazy"><span>${String(i+1).padStart(2,'0')}</span>`;thumbs.append(b);b.addEventListener('click',()=>setTarget(i,{instant:true}));
}
function updateView({updateHash=true}={}){
 const visual=depthAt(position,reducedMotion.matches),scene=visual.scene;
 const nextSlice=Math.round(position);
 if(slice!==nextSlice){
  slice=nextSlice;$('#scan').src=urlFor(slice);$('#scan').alt=`Axial brain CT, slice ${slice+1} of 34`;
  $('#slice-count').innerHTML=`I: ${slice+1} <span>(${slice+1}/34)</span>`;
  for(const [i,b] of [...thumbs.children].entries()){if(i===slice)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')}
  const b=thumbs.children[slice];thumbs.scrollLeft=Math.max(0,b.offsetLeft-thumbs.offsetLeft-thumbs.clientWidth/2+b.clientWidth/2);
 }
 $('#scan-slider').value=position;
 $('#previous').disabled=position<=0;$('#next').disabled=position>=33;
 currentSection=scene.section;experienceIndex=scene.experience??experienceIndex;
 if(stateKey!==scene.key){
  stateKey=scene.key;renderContent();$('#section-label').textContent=sectionLabels[currentSection];$('#series-label').textContent=scene.label;
  $('#chapter-count').textContent=currentSection==='intro'?'Introduction':currentSection==='research'?`Research ${experienceIndex+1}/3`:currentSection==='publications'?'15 bibliography entries':currentSection==='community'?'9 service roles':'Class of 2027';
  $('#section-status').textContent=currentSection==='research'?experiences[experienceIndex].institution:sectionLabels[currentSection];
  document.querySelectorAll('[data-section]').forEach(a=>{if(a.dataset.section===currentSection)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  document.querySelectorAll('[data-experience]').forEach(b=>b.setAttribute('aria-pressed',String(currentSection==='research'&&Number(b.dataset.experience)===experienceIndex)));
  $('#research-series').hidden=currentSection!=='research';
 }
 content.style.opacity=visual.opacity;content.style.transform=`translateZ(${visual.depth}px)`;content.inert=visual.opacity<.4;
 if(updateHash&&location.hash!==`#${currentSection}`)history.replaceState(null,'',`#${currentSection}`);
}
function setTarget(n,{instant=false}={}){
 if(reader.open)return;
 entryAnimation?.cancel();entryAnimation=null;
 target=clampPosition(n);
 if(instant||reducedMotion.matches){cancelAnimationFrame(raf);raf=0;position=target;updateView();return}
 if(!raf){lastFrame=performance.now();raf=requestAnimationFrame(tick)}
}
function tick(time){
 if(reader.open){raf=0;return}
 const dt=Math.min(48,time-lastFrame);lastFrame=time;
 position+=(target-position)*(1-Math.exp(-dt/85));
 if(Math.abs(target-position)<.001)position=target;
 updateView();raf=position===target?0:requestAnimationFrame(tick);
}
function freezeExploration(){cancelAnimationFrame(raf);raf=0;target=position;entryAnimation?.cancel();entryAnimation=null}
function jumpTo(scene){
 setTarget(scene.anchor,{instant:true});
 if(!reducedMotion.matches)entryAnimation=content.animate([{opacity:0,transform:'translateZ(-90px)'},{opacity:1,transform:'translateZ(0)'}],{duration:360,easing:'cubic-bezier(.2,.7,.2,1)'});
 if(innerWidth<=760)closeSidebar();
}
function navigateSection(id){const scene=scenes.find(s=>s.section===id);if(scene)jumpTo(scene)}
function renderContent(){
 let html='';
 if(currentSection==='intro'){
  html=`<h1 id="content-title">Hi, I'm Zain.</h1><p class="description">I'm a medical student with a background in imaging research and an interest in the evolving role of technology in medicine.</p>`;
 }else if(currentSection==='research'){
  const e=experiences[experienceIndex];
  html=`<p class="eyebrow">Research intern <span class="date">${e.shortDates}</span></p><h1 id="content-title">${e.display}</h1><p class="department">${e.department}</p><p class="description">${e.description}</p><button class="primary-button" data-open="experience">Read experience <span aria-hidden="true">↗</span></button><div class="content-foot"><span class="mono">0${experienceIndex+1} / 03</span><span>Research & experience</span></div>`;
 }else if(currentSection==='publications'){
  html=`<p class="eyebrow">Bibliography <span class="date">2023 – 2026</span></p><h1 id="content-title">Publications<br> & abstracts</h1><p class="department">Radiology & cardiovascular research</p><p class="description">Neonatal brain MRI, image reconstruction, and cardiovascular disease. Journal articles, a case report, and conference abstracts, with complete citations.</p><button class="primary-button" data-open="publications">Read all 15 publications <span aria-hidden="true">↗</span></button><div class="content-foot"><span>15 bibliography entries</span></div>`;
 }else if(currentSection==='community'){
  html=`<p class="eyebrow">Leadership & service</p><h1 id="content-title">Community<br> service</h1><p class="department">Pakistan & the United States</p><p class="description">Hospital fundraising, patient intake, and support for refugee families. Contributed to collective fundraising efforts exceeding $400,000 for Koohi Goth Women’s Hospital.</p><button class="primary-button" data-open="community">Explore all 9 roles <span aria-hidden="true">↗</span></button><div class="content-foot"><span>9 organizations</span></div>`;
 }else{
  html=`<p class="eyebrow">About</p><h1 id="content-title">Zain Alvi</h1><p class="department">MD candidate · Class of 2027</p><p class="description">Medical student at Meharry Medical College, with research experience in radiology and cardiovascular medicine. BS in Biology from New York Institute of Technology.</p><button class="primary-button" data-open="about">Background & education <span aria-hidden="true">↗</span></button><div class="content-foot"><span>English · Urdu · Sindhi</span></div>`;
 }
 content.classList.toggle('intro',currentSection==='intro');
 content.innerHTML=html;content.scrollTop=0;
}
function closeSidebar(){$('.workspace').classList.remove('mobile-sidebar-open');$('#toggle-sidebar').setAttribute('aria-expanded','false')}
function toggleSidebar(){const workspace=$('.workspace');if(innerWidth<=760){const open=workspace.classList.toggle('mobile-sidebar-open');$('#toggle-sidebar').setAttribute('aria-expanded',String(open))}else{const collapsed=workspace.classList.toggle('sidebar-collapsed');$('#toggle-sidebar').setAttribute('aria-expanded',String(!collapsed))}}
$('#toggle-sidebar').onclick=toggleSidebar;$('#collapse-sidebar').onclick=()=>innerWidth<=760?closeSidebar():toggleSidebar();
$('#read-current').onclick=e=>openReader(currentSection==='research'?'experience':currentSection==='intro'?'about':currentSection,e.currentTarget);
$('#reset-view').onclick=()=>jumpTo(scenes[0]);$('#explore-tool').onclick=()=>{if(reader.open)reader.close();content.focus({preventScroll:true})};
if(innerWidth<=760)$('#toggle-sidebar').setAttribute('aria-expanded','false');
document.addEventListener('click',e=>{
 const section=e.target.closest('[data-section]');if(section){e.preventDefault();navigateSection(section.dataset.section);return}
 const experience=e.target.closest('[data-experience]');if(experience){jumpTo(scenes.find(s=>s.experience===Number(experience.dataset.experience)));return}
 const button=e.target.closest('[data-open]');if(button){openReader(button.dataset.open,button);return}
 const publication=e.target.closest('[data-publication]');if(publication)openReader('publications',publication,publication.dataset.publication);
 if(e.target.closest('[data-print]'))window.print();
 if(e.target.closest('[data-retry-publications]'))location.reload();
});
async function openReader(type,button,targetId){
 if(!reader.open){freezeExploration();opener=button;reader.showModal();document.body.style.overflow='hidden'}
 const titles={experience:['Research & experience',experiences[experienceIndex].institution],publications:['Bibliography','Publications & abstracts'],community:['Leadership & service','Community involvement'],about:['About','Background & education'],cv:['Curriculum vitae','Zain Alvi'],credits:['Image sources','About the CT sequence']};
 const [kicker,title]=titles[type];$('#reader-kicker').textContent=kicker;$('#reader-title').textContent=title;
 $('#paused-position').textContent=`Scan paused at slice ${String(slice+1).padStart(2,'0')}`;
 const body=$('#reader-body');body.scrollTop=0;
 if(['experience','publications','cv'].includes(type)){
  body.innerHTML='<p role="status">Loading publications…</p>';
  try{await publicationReady}catch{body.innerHTML='<p>The bibliography could not load. Reload the page to try again.</p><button class="primary-button" data-retry-publications>Reload page</button>';return}
  if(!reader.open)return;
 }
 if(type==='experience')body.innerHTML=experienceHtml(experiences[experienceIndex],publications);
 if(type==='publications')body.innerHTML=publications.map(publicationHtml).join('');
 if(type==='community')body.innerHTML=`<p class="lead">Hospital fundraising, community clinics, and support for families in Pakistan and the United States.</p>${servicesHtml()}`;
 if(type==='about')body.innerHTML=`<p class="lead">Zain Alvi is a medical student at Meharry Medical College, class of 2027.</p><section><h3>Education</h3>${educationHtml}</section><section><h3>Research experience</h3><p>His work includes head CT utilization at Vanderbilt, neonatal brain MRI at Stanford, and cardiovascular clinical research at Emory.</p></section><section><h3>Languages</h3><p>Native or bilingual proficiency in English, Urdu, and Sindhi.</p></section>`;
 if(type==='cv')body.innerHTML=`<button class="print-button" data-print>Print / save as PDF</button>${cvHtml(publications)}`;
 if(type==='credits')body.innerHTML=`<p class="lead">34 axial CT images from the base of the skull to the top.</p><p>Images by the Department of Radiology, Uppsala University Hospital, uploaded by Mikael Häggström. The images are provided under the <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer">CC0 1.0 public-domain dedication</a>.</p><p>The sequence preserves the source images’ numbering, orientation, and scale. These are reference images from Wikimedia Commons, not Zain’s scan. Portfolio sections are navigation states, not anatomical associations.</p><p><a href="https://commons.wikimedia.org/wiki/Category:Computed_tomography_images_of_Mikael_H%C3%A4ggstr%C3%B6m%27s_brain" target="_blank" rel="noopener noreferrer">View the original image collection</a></p>`;
 body.scrollTop=0;
 if(targetId)requestAnimationFrame(()=>document.getElementById(targetId)?.scrollIntoView({block:'start'}));
}
function closeReader(){reader.close()}
$('#close-reader').onclick=closeReader;$('#back-exploration').onclick=closeReader;
reader.addEventListener('close',()=>{document.body.style.overflow='';opener?.isConnected&&opener.focus({preventScroll:true})});
reader.addEventListener('click',e=>{if(e.target===reader){const r=reader.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeReader()}});
$('#previous').onclick=()=>setTarget(Math.round(target)-1);$('#next').onclick=()=>setTarget(Math.round(target)+1);
$('#scan-slider').addEventListener('input',e=>setTarget(Number(e.target.value),{instant:true}));
$('#viewer').addEventListener('wheel',e=>{
 if(reader.open||e.ctrlKey)return;
 const scroller=e.target.closest('#content');if(scroller&&scroller.scrollHeight>scroller.clientHeight+2)return;
 e.preventDefault();const pixels=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);setTarget(target+Math.max(-180,Math.min(180,pixels))/180);
},{passive:false});
window.addEventListener('keydown',e=>{
 if(reader.open||e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,[contenteditable]'))return;
 if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(e.key)){
  e.preventDefault();setTarget(e.key==='Home'?0:e.key==='End'?33:Math.round(target)+(['ArrowDown','ArrowRight'].includes(e.key)?1:-1),{instant:reducedMotion.matches});
 }
 if(e.key==='Escape')closeSidebar();
});
let touch=null;
$('.scan-figure').addEventListener('touchstart',e=>{touch={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
$('.scan-figure').addEventListener('touchmove',e=>{if(!touch||reader.open)return;e.preventDefault();const dx=touch.x-e.touches[0].clientX,dy=touch.y-e.touches[0].clientY;setTarget(target+(Math.abs(dx)>Math.abs(dy)?dx:dy)/100);touch={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:false});
$('.scan-figure').addEventListener('touchend',()=>{touch=null},{passive:true});
$('#scan').onerror=()=>{$('#image-error').hidden=false};$('#scan').onload=()=>{$('#image-error').hidden=true};$('#retry-image').onclick=()=>{$('#scan').src=urlFor(slice)+`?retry=${Date.now()}`};
window.addEventListener('hashchange',()=>navigateSection(location.hash.slice(1)));
$('.identity').addEventListener('click',e=>{e.preventDefault();navigateSection('intro')});
reducedMotion.addEventListener('change',()=>{freezeExploration();position=Math.round(position);target=position;updateView()});
const initial=scenes.find(s=>`#${s.section}`===location.hash);position=target=initial?.anchor??scenes[0].anchor;updateView();
for(let i=0;i<34;i++){const img=new Image();img.src=urlFor(i)}
