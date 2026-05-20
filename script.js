// =============================================
// LP KRISHNA ENTERPRISES — Script v3
// =============================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  navbar.style.background = scrolled
    ? 'rgba(4, 10, 3, 0.99)'
    : 'rgba(8, 18, 6, 0.97)';
  navbar.style.boxShadow = scrolled ? '0 6px 40px rgba(0,0,0,0.5)' : '0 4px 30px rgba(0,0,0,0.4)';
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) cur = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${cur}`);
  });
});

// Scroll reveal for benefit cards
const bcObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = parseInt(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.bc-reveal').forEach(el => bcObserver.observe(el));

// Scroll reveal for other elements
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

// Add fade animations to section elements
document.querySelectorAll('.product-card, .gallery-item, .testimonial-card, .pillar, .india-stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(25px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

// Counter animation for hero stats
const animateCounter = (el, target, suffix = '') => {
  let start = 0;
  const step = target / 50;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 30);
};

// Trigger counters when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    setTimeout(() => {
      const nums = document.querySelectorAll('.stat-num');
      if (nums[0]) animateCounter(nums[0], 10, '+');
      if (nums[1]) animateCounter(nums[1], 6, '');
      if (nums[2]) { nums[2].textContent = '100%'; }
    }, 800);
    heroObserver.disconnect();
  }
}, { threshold: 0.5 });
const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);

// Parallax on ground layer
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const ground = document.querySelector('.ground');
  if (ground) ground.style.transform = `translateY(${scrollY * 0.08}px)`;
  const sun = document.querySelector('.sun-orb');
  if (sun) sun.style.transform = `translateY(${scrollY * 0.04}px)`;
});

// Product card interactive pulse
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const mascot = card.querySelector('.product-mascot');
    if (mascot) {
      mascot.style.animation = 'none';
      setTimeout(() => { mascot.style.animation = ''; }, 60);
    }
  });
});

// Form submit handler
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = e.target.querySelectorAll('input, select, textarea');
    const naam = fields[0].value;
    const mobile = fields[1].value;
    const gaon = fields[2].value;
    const pashu = fields[3].value;
    const utpad = fields[4].value;
    const kilo = fields[5].value;
    const sankhya = fields[6].value;
    const sandesh = fields[7].value;

    const msg = `🐄 *नया ऑर्डर — LP Krishna Enterprises*

👤 नाम: ${naam}
📞 मोबाइल: ${mobile}
📍 गाँव/शहर: ${gaon}
🐄 पशु: ${pashu}
🛒 उत्पाद: ${utpad}
⚖️ मात्रा: ${kilo} किग्रा
🔢 पशु संख्या: ${sankhya}
💬 संदेश: ${sandesh || 'कोई संदेश नहीं'}`;

    const url = `https://wa.me/917891477000?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Staggered gallery hover effects
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.05}s`;
});

// Add "Moo" sounds visually on animal click
document.querySelector('.animal-runway')?.addEventListener('click', (e) => {
  const critter = e.target.closest('.critter');
  if (critter) {
    const bubble = critter.querySelector('.speech');
    if (bubble) {
      bubble.style.opacity = '1';
      bubble.style.transform = 'scale(1.2)';
      setTimeout(() => {
        bubble.style.opacity = '';
        bubble.style.transform = '';
      }, 1500);
    }
  }
});

console.log('🐄 LP Krishna Enterprises | माखन गोल्ड पशु आहार | Loaded ✅');
