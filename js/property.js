(function(){
  'use strict';
  if (window.AOS) AOS.init({duration:650,once:true,offset:45});

  var nav=document.getElementById('nav'), btt=document.getElementById('btt');
  function onScroll(){
    if(nav) nav.classList.toggle('scrolled',window.scrollY>60);
    if(btt) btt.classList.toggle('show',window.scrollY>350);
    document.querySelectorAll('main section[id]').forEach(function(sec){
      var top=sec.offsetTop-120, bottom=top+sec.offsetHeight;
      if(window.scrollY>=top && window.scrollY<bottom){
        document.querySelectorAll('.nav-link').forEach(function(l){l.classList.remove('active');});
        var l=document.querySelector('.nav-link[href="#'+sec.id+'"]'); if(l) l.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  if(btt) btt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var href=this.getAttribute('href'); if(!href || href==='#') return;
      var target=document.querySelector(href); if(!target) return;
      e.preventDefault();
      var menu=document.getElementById('navmenu');
      if(menu && menu.classList.contains('show') && window.bootstrap){ var instance=bootstrap.Collapse.getOrCreateInstance(menu); instance.hide(); }
      setTimeout(function(){window.scrollTo({top:target.offsetTop-78,behavior:'smooth'});},50);
    });
  });

  var pop=document.getElementById('galPop'), popImg=document.getElementById('gpImg'), popTitle=document.getElementById('gpTitle'), popDesc=document.getElementById('gpDesc');
  var gallery=[];
  function collectGallery(){
    gallery=[];
    document.querySelectorAll('.gitem[data-gimg]').forEach(function(item){
      gallery.push({el:item,img:item.dataset.gimg,title:item.dataset.gtitle||'',desc:item.dataset.gdesc||''});
    });
  }
  collectGallery(); var current=0;
  function openGallery(index){
    collectGallery(); current=(index+gallery.length)%gallery.length; var g=gallery[current]; if(!g) return;
    popImg.src=g.img; popImg.alt=g.title; popTitle.textContent=g.title; popDesc.textContent=g.desc;
    pop.classList.add('open'); pop.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  }
  function closeGallery(){if(!pop)return;pop.classList.remove('open');pop.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  document.querySelectorAll('.gitem[data-gimg]').forEach(function(item){item.addEventListener('click',function(){collectGallery(); var idx=gallery.findIndex(function(g){return g.el===item;});openGallery(idx);});});
  document.getElementById('gpClose').addEventListener('click',closeGallery);
  document.getElementById('gpPrev').addEventListener('click',function(){openGallery(current-1);});
  document.getElementById('gpNext').addEventListener('click',function(){openGallery(current+1);});
  pop.addEventListener('click',function(e){if(e.target===pop)closeGallery();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeGallery(); if(pop.classList.contains('open')&&e.key==='ArrowLeft')openGallery(current-1); if(pop.classList.contains('open')&&e.key==='ArrowRight')openGallery(current+1);});


  // Ligging: Street View is de standaardweergave, met een gewone kaart als alternatief.
  var locationViewer=document.querySelector('[data-location-viewer]');
  if(locationViewer){
    var locationToggles=locationViewer.querySelectorAll('[data-location-view]');
    var locationPanels=locationViewer.querySelectorAll('[data-location-panel]');
    locationToggles.forEach(function(btn){
      btn.addEventListener('click',function(){
        var view=this.getAttribute('data-location-view');
        locationToggles.forEach(function(b){var active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active?'true':'false');});
        locationPanels.forEach(function(panel){var active=panel.getAttribute('data-location-panel')===view;panel.classList.toggle('active',active);panel.hidden=!active;});
      });
    });
  }

  var form=document.getElementById('visitForm');
  if(form){form.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(form), name=d.get('name')||'', email=d.get('email')||'', date=d.get('visitDate')||'', msg=d.get('message')||'';
    var subject='Bezoekaanvraag Beverenstraat 22 bus 0303';
    var body='Hallo,%0D%0A%0D%0AIk wil graag een bezoek plannen voor Beverenstraat 22 bus 0303.%0D%0A%0D%0ANaam: '+encodeURIComponent(name)+'%0D%0AE-mail: '+encodeURIComponent(email)+'%0D%0AVoorkeursdatum: '+encodeURIComponent(date)+'%0D%0A%0D%0ABericht:%0D%0A'+encodeURIComponent(msg)+'%0D%0A%0D%0AMet vriendelijke groeten,%0D%0A'+encodeURIComponent(name);
    window.location.href='mailto:info@beverenstraat22.be?subject='+encodeURIComponent(subject)+'&body='+body;
  });}

  var share=document.getElementById('shareBtn');
  if(share){share.addEventListener('click',async function(){
    var data={title:document.title,text:'Bekijk dit appartement in de Beverenstraat 22 bus 0303 in Deerlijk.',url:window.location.href};
    try{if(navigator.share){await navigator.share(data);}else if(navigator.clipboard){await navigator.clipboard.writeText(window.location.href);var old=this.innerHTML;this.innerHTML='<i class="fas fa-check"></i> Link gekopieerd';setTimeout(()=>this.innerHTML=old,2200);}}
    catch(err){}
  });}
})();
