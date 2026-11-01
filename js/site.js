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
/* booking form: BOOKING_KEY is a Web3Forms access key. The key maps to the inbox on Web3Forms' side, so no email address appears in this site. */
var BOOKING_KEY='2cae122e-b081-4c98-93c5-c82e302bbe5e';
(function(){
var f=document.getElementById('bform');if(!f)return;
var st=document.getElementById('b-status'),btn=document.getElementById('b-send'),groups=f.querySelectorAll('.grp');
function say(cls,html){st.className='status '+cls;st.innerHTML=html;st.hidden=false;st.scrollIntoView({block:'nearest',behavior:'smooth'})}
function sync(){var r=f.querySelector('input[name=type]:checked'),g=r?r.getAttribute('data-g'):'';
for(var i=0;i<groups.length;i++){var s=groups[i].getAttribute('data-show');groups[i].hidden=!(r&&(s==='any'||s===g))}}
f.addEventListener('change',function(e){if(e.target.name==='type'){sync();var p=f.querySelector('.err[data-for=type]');if(p)p.hidden=true}});
function bad(el,on){var p=el.parentNode.querySelector('.err');if(p)p.hidden=!on;el.setAttribute('aria-invalid',on?'true':'false')}
f.addEventListener('input',function(e){if(e.target.getAttribute('aria-invalid')==='true'&&e.target.checkValidity())bad(e.target,false)});
function valid(){var ok=true,first=null,r=f.querySelector('input[name=type]:checked'),tp=f.querySelector('.err[data-for=type]');
if(!r){tp.hidden=false;ok=false;first=f.querySelector('input[name=type]')}else tp.hidden=true;
['b-name','b-email','b-msg'].forEach(function(id){var el=document.getElementById(id);el.value=el.value.trim();var v=el.checkValidity()&&el.value!=='';bad(el,!v);if(!v){ok=false;if(!first)first=el}});
if(first)first.focus();return ok}
function data(){var o={},els=f.elements,i,e;for(i=0;i<els.length;i++){e=els[i];if(!e.name||e.name==='botcheck'||e.name==='type'||e.type==='radio')continue;if(e.value&&e.value.trim())o[e.name]=e.value.trim()}
o.booking_type=f.querySelector('input[name=type]:checked').value;return o}
var L={booking_type:'Booking type',name:'Name',email:'Email',phone:'Phone or WhatsApp',organisation:'Organisation',event_date:'Event date',city_country:'City and country',venue:'Venue',attendance:'Attendance',link:'Link',budget:'Budget',preferred_contact:'Best way to reach',message:'Message'};
function lines(o){return Object.keys(L).filter(function(k){return o[k]}).map(function(k){return L[k]+': '+o[k]}).join('\n')}
f.addEventListener('submit',function(e){e.preventDefault();if(!valid())return;
if(f.botcheck.checked){say('ok','Thank you. Your request was received.');return}
var o=data(),subject='Booking request: '+o.booking_type+' | '+o.name;
if(!BOOKING_KEY){say('bad','Online booking requests are not switched on yet. Please call or WhatsApp one of the booking numbers above.');return}
btn.disabled=true;btn.textContent='Sending...';
var payload={access_key:BOOKING_KEY,subject:subject,from_name:'suonosai.com booking form'};
for(var k in o)payload[(k==='name'||k==='email'||k==='message')?k:(L[k]||k)]=o[k];payload.botcheck=false;
fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload)})
.then(function(r){return r.json()}).then(function(j){
if(j&&j.success){f.reset();sync();say('ok','<b>Request sent.</b> Thank you, '+o.name.split(' ')[0]+'. The booking team will reply to '+o.email+' soon.')}else throw new Error('x')})
.catch(function(){say('bad','Something went wrong and your request was not sent. Please try again, or call or WhatsApp one of the booking numbers above.')})
.then(function(){btn.disabled=false;btn.textContent='Send booking request'})});
})();
