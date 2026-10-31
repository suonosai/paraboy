(function(){
var ids=['home','events','music','social','news','booking'],T=Date.UTC(2026,11,13,16,0,0),E=Date.UTC(2026,11,14,0,0,0),URL='https://www.tixtango.com/paraboyzfest#tickets';
var nav=document.getElementById('nav'),mb=document.getElementById('mb');
function go(){var h=(location.hash||'#home').slice(1);if(ids.indexOf(h)<0)h='home';
ids.forEach(function(i){document.getElementById(i).classList.toggle('on',i===h)});
document.querySelectorAll('.links a').forEach(function(a){if(a.getAttribute('href')==='#'+h)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
document.getElementById('bk').style.display=h==='booking'?'none':'block';nav.classList.remove('open');mb.setAttribute('aria-expanded','false');window.scrollTo(0,0)}
window.addEventListener('hashchange',go);go();
mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false')});
function p2(n){return n<10?'0'+n:''+n}
function tick(){var d=T-Date.now(),el=document.getElementById('cd'),s=document.getElementById('cd2');
if(d<=0){var live=Date.now()<E;el.innerHTML='<p class="live">'+(live?'Gates are open. See you inside.':'This event has ended. More dates soon.')+'</p>';s.textContent=live?'Happening now':'Ended';return}
var D=Math.floor(d/864e5),h=Math.floor(d%864e5/36e5),m=Math.floor(d%36e5/6e4),x=Math.floor(d%6e4/1e3);
el.innerHTML=[[D,'days'],[p2(h),'hrs'],[p2(m),'min'],[p2(x),'sec']].map(function(a){return '<div><b>'+a[0]+'</b><small>'+a[1]+'</small></div>'}).join('');
s.textContent=D+' days to go'}
tick();setInterval(tick,1000);
var price=10000,name='Regular',qty=1;
function fmt(n){return '\u20A6'+n.toLocaleString('en-US')}
function calc(){document.getElementById('q').textContent=qty;document.getElementById('tl').textContent=qty+' x '+name;document.getElementById('tt').textContent=fmt(price*qty)}
document.querySelectorAll('.tier').forEach(function(t){t.addEventListener('click',function(){document.querySelectorAll('.tier').forEach(function(o){o.classList.remove('on');o.setAttribute('aria-checked','false')});t.classList.add('on');t.setAttribute('aria-checked','true');price=+t.dataset.p;name=t.dataset.n;calc()})});
document.getElementById('qm').addEventListener('click',function(){if(qty>1){qty--;calc()}});
document.getElementById('qp').addEventListener('click',function(){if(qty<10){qty++;calc()}});
document.getElementById('share').addEventListener('click',function(){var t='PARABOYZ Fest, Dec 13 at Club House Landmark, Lagos. Tickets: '+URL;
try{if(navigator.share){navigator.share({title:'PARABOYZ Fest',text:'PARABOYZ Fest, Dec 13 at Club House Landmark, Lagos',url:URL}).catch(function(){});return}}catch(e){}
window.open('https://wa.me/?text='+encodeURIComponent(t),'_blank','noopener')});
var imgs=[].slice.call(document.querySelectorAll('.grid img')),idx=0,lb=document.createElement('div');lb.id='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Photo viewer');
lb.innerHTML='<img alt=""><button class="x" aria-label="Close">X</button><button class="p" aria-label="Previous photo">&lt;</button><button class="n" aria-label="Next photo">&gt;</button>';document.body.appendChild(lb);
var li=lb.querySelector('img');
function show(i){idx=(i+imgs.length)%imgs.length;li.src=imgs[idx].src;li.alt=imgs[idx].alt}
function open(i){show(i);lb.classList.add('on');lb.querySelector('.x').focus()}
function close(){lb.classList.remove('on')}
imgs.forEach(function(im,i){var f=im.parentNode;f.tabIndex=0;f.setAttribute('role','button');f.setAttribute('aria-label','Enlarge photo: '+im.alt);im.addEventListener('click',function(){open(i)});f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i)}})});
lb.querySelector('.x').addEventListener('click',close);lb.querySelector('.p').addEventListener('click',function(){show(idx-1)});lb.querySelector('.n').addEventListener('click',function(){show(idx+1)});
lb.addEventListener('click',function(e){if(e.target===lb)close()});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)});
var sx=0;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(idx+(d<0?1:-1))});
})();
