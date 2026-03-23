  // Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animateCursor() {
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll('a,button,.prop-card,.listing-card,.search-tab').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width='18px'; cursor.style.height='18px'; ring.style.width='54px'; ring.style.height='54px'; });
    el.addEventListener('mouseleave', () => { cursor.style.width='10px'; cursor.style.height='10px'; ring.style.width='36px'; ring.style.height='36px'; });
  });

  // Sticky nav
  window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
  });

  // Search tabs
  function setTab(el) {
    document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  // Favorite toggle
  function toggleFav(el) {
    el.textContent = el.textContent === '🤍' ? '❤️' : '🤍';
    el.style.background = el.textContent === '❤️' ? 'var(--gold)' : '';
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }});
  }, { threshold: 0.15 });
  reveals.forEach(r => observer.observe(r));

  // Count-up animation
  function animateCountUp(el, target) {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (el.closest('.stat-item').querySelector('.stat-label').textContent.includes('%') ? '%' : '+');
      if (current >= target) clearInterval(timer);
    }, 25);
  }
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const nums = e.target.querySelectorAll('.stat-number');
        nums.forEach(n => animateCountUp(n, parseInt(n.dataset.target)));
        statObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('#stats .stats-grid').forEach(s => statObserver.observe(s));

  // Newsletter
  function handleSubscribe(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = 'Subscribed ✓';
    btn.style.background = '#2d6a4f';
    e.target.querySelector('input').value = '';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
  }

  // Mobile menu
  function openMobileMenu() {
    document.getElementById('mobileMenu').classList.add('open');
    document.getElementById('overlayBg').classList.add('show');
  }
  function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('overlayBg').classList.remove('show');
  }
