(function(){
  // Header scroll state
  const header = document.getElementById('siteHeader');
  if(header){
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if(menuBtn && menu){
    menuBtn.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  // Loop diagram: click a step to spotlight it (homepage only)
  const loopWrap = document.getElementById('loopWrap');
  if(loopWrap){
    const loopNodes = loopWrap.querySelectorAll('.loop-node');
    loopNodes.forEach(node => {
      node.querySelector('.dot').addEventListener('click', () => {
        loopNodes.forEach(n => {
          const active = n === node;
          n.classList.toggle('is-active', active);
          n.querySelector('.dot').setAttribute('aria-pressed', String(active));
        });
      });
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15});
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
})();
