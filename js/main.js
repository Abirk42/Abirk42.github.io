// ==================== MOBILE MENU TOGGLE ====================
const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

function openMenu() {
    mobileMenu.classList.add('open');
    menuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);

// ==================== SCROLL REVEAL ANIMATION ====================
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => observer.observe(el));

// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-secondary');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-secondary');
        }
    });
});

// ==================== TAG TOOLTIP EDGE DETECTION ====================
document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
        const tooltip = pill.querySelector('.skill-tooltip');
        if (!tooltip) return;
        // Reset any prior repositioning
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.bottom = 'calc(100% + 10px)';
        tooltip.style.top = '';

        const rect = tooltip.getBoundingClientRect();
        // Flip below if overflowing top
        if (rect.top < 8) {
            tooltip.style.bottom = '';
            tooltip.style.top = 'calc(100% + 10px)';
        }
        // Nudge left/right if overflowing sides
        if (rect.left < 8) {
            tooltip.style.left = '0';
            tooltip.style.transform = 'translateX(0)';
        } else if (rect.right > window.innerWidth - 8) {
            tooltip.style.left = 'auto';
            tooltip.style.right = '0';
            tooltip.style.transform = 'translateX(0)';
        }
    });
});
