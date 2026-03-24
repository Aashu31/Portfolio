/* ============================================================
   AASHU SINGH — PORTFOLIO JS
   ============================================================ */

// ============ CUSTOM CURSOR ============
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    trail.style.transform = 'translate(-50%,-50%) scale(1.4)';
    trail.style.borderColor = 'var(--accent3)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    trail.style.transform = 'translate(-50%,-50%) scale(1)';
    trail.style.borderColor = 'var(--accent)';
  });
});

// ============ NAV SCROLL ============
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ============ INTERSECTION OBSERVER ============
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
};

// Generic fade-up elements
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);
fadeEls.forEach(el => fadeObserver.observe(el));

// Skill cards with stagger
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
        // Animate skill bars
        const bar = entry.target.querySelector('.skill-bar-fill');
        const width = entry.target.querySelector('.skill-bar').getAttribute('data-width');
        if (bar && width) bar.style.width = width + '%';
      }, delay);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
skillCards.forEach(card => skillObserver.observe(card));

// Project cards
const projectCards = document.querySelectorAll('.project-card');
const projObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 120);
      projObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
projectCards.forEach(card => projObserver.observe(card));

// ============ COUNTER ANIMATION ============
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-count'));
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

// ============ CONTACT FORM ============
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = new FormData(form);

  status.innerText = "Sending...";
  
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      status.innerText = "✅ Message sent successfully!";
      form.reset();
    } else {
      status.innerText = "❌ Failed to send. Try again.";
    }
  } catch (error) {
    status.innerText = "⚠️ Network error.";
  }
});

// ============ SMOOTH ACTIVE NAV ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// ============ HERO PARALLAX ============
const heroGrid = document.querySelector('.hero-grid-bg');
window.addEventListener('scroll', () => {
  if (heroGrid) {
    heroGrid.style.transform = `translateY(${window.scrollY * 0.15}px)`;
  }
});

// ============ GLITCH TITLE EFFECT on hover ============
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.style.textShadow = `
      2px 2px 0 var(--accent3),
      -2px -2px 0 var(--accent2)
    `;
    setTimeout(() => {
      heroName.style.textShadow = 'none';
    }, 200);
  });
}

// ============ TYPING EFFECT for hero subtitle ============
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = '';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      subtitle.textContent += text[i++];
      setTimeout(type, 40);
    }
  };
  setTimeout(type, 600);
}

// ============ DYNAMIC YEAR ============
const yearEl = document.querySelector('.footer-year');
if (yearEl) {
  yearEl.textContent = `© ${new Date().getFullYear()} — All Rights Reserved`;
}

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});
// ============ CV ONLINE/OFFLINE DETECTION ============
const cvViewBtn = document.getElementById('cv-view-btn');
const cvDownloadBtn = document.getElementById('cv-download-btn');

function handleCVButtons() {
  if (!navigator.onLine) {
    // Offline: hide view button, show only download
    if (cvViewBtn) {
      cvViewBtn.style.display = 'none';
    }
    if (cvDownloadBtn) {
      cvDownloadBtn.textContent = '⬇ Download CV (Offline Mode)';
    }
  } else {
    if (cvViewBtn) cvViewBtn.style.display = '';
    if (cvDownloadBtn) cvDownloadBtn.innerHTML = '⬇ Download CV';
  }
}

handleCVButtons();
window.addEventListener('online', handleCVButtons);
window.addEventListener('offline', handleCVButtons);
// Certification animation
const certCards = document.querySelectorAll('.cert-card');

const certObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      certObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

certCards.forEach(card => certObserver.observe(card));