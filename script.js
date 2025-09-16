// Utilitário rápido
const $ = (s) => document.querySelector(s);

// Mostra/oculta páginas com transição CSS
function showPage(n){
  ['#page1','#page2'].forEach(sel=>{
    const el = $(sel);
    if(!el) return;
    el.classList.remove('active');
    el.setAttribute('hidden','hidden');
  });
  const page = $(`#page${n}`);
  if(page){
    page.removeAttribute('hidden');
    // aguarda o próximo frame para permitir a transição CSS
    setTimeout(()=>page.classList.add('active'), 50);
  }
  window.scrollTo({top:0, behavior:'auto'});
}

// Envelope da página 1
const envelope = $('#envelope');
if(envelope){
  envelope.addEventListener('click', ()=>{
    envelope.classList.add('open');
    setTimeout(()=>{
      showPage(2);
      animatePage2();
    }, 1100);
  });
}

// Animações da frente do card (nomes + frase + botão)
function animatePage2(){
  if(!window.gsap) return;
  gsap.fromTo('.name-left',   {opacity:0, x:-50}, {opacity:1, x:0, duration:0.9, ease:'power3.out', delay:0.1});
  gsap.fromTo('.name-center', {opacity:0, y: 30}, {opacity:1, y:0, duration:0.9, ease:'power3.out', delay:0.45});
  gsap.fromTo('.name-right',  {opacity:0, x: 50}, {opacity:1, x:0, duration:0.9, ease:'power3.out', delay:0.8});
  gsap.fromTo('.invitation',  {opacity:0, y: 40}, {opacity:1, y:0, duration:0.9, ease:'power3.out', delay:1.15});
  gsap.fromTo('#show-details',{opacity:0, y: 40}, {opacity:1, y:0, duration:0.9, ease:'power3.out', delay:1.45});
}

// Flip do card
const flipInner   = document.querySelector('#flip-card .card-inner');
const btnShow     = $('#show-details');
const btnBack     = $('#back-details');

if(btnShow && flipInner){
  btnShow.addEventListener('click', ()=>{
    flipInner.classList.add('flipped');
    // anima os links do verso ao aparecer
    if(window.gsap){
      gsap.fromTo('.link-btn',{opacity:0, y:10},{opacity:1, y:0, duration:.5, stagger:.08, ease:'power2.out', delay:.15});
    }
  });
}
if(btnBack && flipInner){
  btnBack.addEventListener('click', ()=> flipInner.classList.remove('flipped'));
}

// Inicial
showPage(1);
