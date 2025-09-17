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

// Pulso dourado automático a cada 3s na página 1
let pulseTimer = setInterval(()=>{
  const page1 = document.querySelector('#page1');
  const env = document.querySelector('#envelope');
  if(page1?.classList.contains('active') && !env.classList.contains('open')){
    const rect = page1.getBoundingClientRect();
    createPulse(rect.width/2, rect.height/2);
  }
},3000);

// Pulso no clique
document.querySelector('#page1').addEventListener('click',(e)=>{
  createPulse(e.clientX, e.clientY);
});

// Função que cria pulso
function createPulse(x,y){
  const pulse=document.createElement('div');
  pulse.className='pulse-circle';
  pulse.style.left=x+'px';
  pulse.style.top=y+'px';
  document.querySelector('#page1').appendChild(pulse);
  setTimeout(()=>pulse.remove(),1200);
}

// ===== Chuva de corações (Bootstrap Icons + paleta terracota) =====
const terracotaPalette = [
    
  "#f2f2f2", // dourado queimado
  "#d9b794", // dourado queimado
  "#ea6445", // terracota claro
  "#a3a89a", // marrom clássico
  "#967761", // sienna
  "#b24a35"  // vinho terroso
];

function createHeart() {
  const heart = document.createElement('i');
  heart.className = 'bi bi-heart-fill heart';
  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.fontSize = (16 + Math.random()*18) + 'px';
  heart.style.animationDuration = (3 + Math.random()*3) + 's';

  // cor aleatória da paleta terracota
  const color = terracotaPalette[Math.floor(Math.random() * terracotaPalette.length)];
  heart.style.color = color;

  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(), 6000);
}
// gera corações em intervalos regulares
setInterval(createHeart, 1400);

// Inicial
showPage(1);
