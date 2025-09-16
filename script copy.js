// ======== Utilidades ========
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function showPage(id){
  ['#page1','#page2','#page3'].forEach(sel=>{
    const el=document.querySelector(sel);
    if(!el) return;
    el.classList.remove('active');
    el.setAttribute('hidden','hidden');
  });
  const page=document.querySelector(`#page${id}`);
  if(page){
    page.removeAttribute('hidden');
    setTimeout(()=>page.classList.add('active'),50); // delay para transição
  }
  window.scrollTo({top:0,behavior:'auto'});
}

// ======== Parallax ========
function bindParallax(scopeSelector){
  const scope = $(scopeSelector);
  if(!scope) return;
  scope.addEventListener('mousemove',(e)=>{
    const rect=scope.getBoundingClientRect();
    const cx=rect.left+rect.width/2;
    const cy=rect.top+rect.height/2;
    const dx=(e.clientX-cx);
    const dy=(e.clientY-cy);
    scope.querySelectorAll('.layer').forEach(layer=>{
      const depth=parseFloat(layer.dataset.depth||'0.05');
      layer.style.transform=`translate(${-(dx*depth)}px, ${-(dy*depth)}px)`;
    });
  });
}
bindParallax('#page1');
bindParallax('#page3');

// ======== Envelope ========
const envelope=$('#envelope');
if(envelope){
  envelope.addEventListener('click',()=>{
    envelope.classList.add('open');
    setTimeout(()=>{
      showPage(2);
      animatePage2();
    },1100);
  });
}

// ======== Página 2: animação GSAP ========
function animatePage2(){
  if(!window.gsap) return;
  const tl=gsap.timeline();
  ['#l1','#l2','#l3','#l4','#cta2'].forEach((id,i)=>{
    const el=$(id);
    if(el){
      gsap.set(el,{opacity:0,y:20});
      tl.to(el,{opacity:1,y:0,duration:.6,ease:'power2.out'},i*0.35);
    }
  });
}

// ======== Botão para página 3 ========
function goTo(num){
  showPage(num);
  if(num===3){ animateLinks(); }
}
window.goTo=goTo;

// ======== Página 3: animação links ========
function animateLinks(){
  if(!window.gsap) return;
  gsap.fromTo('.link-card',{opacity:0,y:20},{
    opacity:1,y:0,duration:.5,stagger:.12,ease:'power2.out'
  });
}

// ======== Inicial ========
showPage(1);
