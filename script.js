const tabs = document.querySelectorAll('.tab-button[role="tab"]');
const panels = document.querySelectorAll('.content-panel');
const hero = document.querySelector('.hero');
const profileCard = document.querySelector('.profile-card');
const snowLayer = document.querySelector('.snow-layer');

for (let index = 0; index < 50; index += 1) {
  const flake = document.createElement('span');
  flake.className = 'snowflake';
  flake.style.left = `${Math.random() * 100}%`;
  snowLayer.append(flake);
}

function activateTab(tabName) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isActive = panel.id === `panel-${tabName}`;
    panel.classList.toggle('is-active', isActive);
    panel.hidden = !isActive;
  });

  const target = document.querySelector(`[data-tab-panel="${tabName}"]`);
  if (target) {
    target.querySelectorAll('.project-card, .resume-item').forEach((element) => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

const initialPanel = location.hash ? document.querySelector(location.hash) : null;
if (initialPanel && initialPanel.dataset.tabPanel) {
  activateTab(initialPanel.dataset.tabPanel);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));

  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;

    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + direction + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    activateTab(tabs[nextIndex].dataset.tab);
  });
});

const links = document.querySelectorAll('[data-scroll-to]');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    activateTab(link.dataset.scrollTo);
  });
});

const revealElements = document.querySelectorAll('.project-card, .resume-item');
revealElements.forEach((element) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(10px)';
  element.style.transition = 'opacity 400ms ease, transform 400ms ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => observer.observe(element));

const year = new Date().getFullYear();
const footer = document.querySelector('.footer-note');
footer.textContent = `© ${year} Isadora Torres · Design e desenvolvimento em código.`;

window.addEventListener('resize', () => {
  if (window.innerWidth <= 850) {
    hero.style.display = 'flex';
    profileCard.style.display = 'block';
  } else {
    hero.style.display = 'flex';
    profileCard.style.display = 'block';
  }
});
