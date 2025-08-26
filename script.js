// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-switch');
const body = document.body;
const form = document.querySelector('.form');
const navbar = document.querySelector('.navbar');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Theme Toggle
themeToggle.addEventListener('change', () => {
    body.classList.toggle('light-mode');
    
    // Save theme preference
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.checked = true;
}

// Enhanced navbar scroll effect
let lastScrollY = window.scrollY;

function updateNavbar() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = body.classList.contains('light-mode') 
            ? 'rgba(248, 250, 252, 0.95)' 
            : 'rgba(10, 10, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(25px) saturate(180%)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = body.classList.contains('light-mode') 
            ? 'rgba(248, 250, 252, 0.85)' 
            : 'rgba(10, 10, 26, 0.85)';
        navbar.style.backdropFilter = 'blur(25px) saturate(180%)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
}
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Enhanced typing animation
const typingText = document.querySelector('.typing-text');
let hasAnimated = false;

function checkTypingAnimation() {
    const heroSection = document.querySelector('.hero');
    const rect = heroSection.getBoundingClientRect();
    
    if (rect.top <= window.innerHeight && rect.bottom >= 0 && !hasAnimated) {
        typingText.style.animation = 'none';
        setTimeout(() => {
            typingText.style.animation = 'typing 4s steps(15) 0.5s 1 normal both, blink 1s infinite 4.5s';
        }, 100);
        hasAnimated = true;
    }
}

window.addEventListener('scroll', checkTypingAnimation);
checkTypingAnimation(); // Check on load

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.skill-card, .project-card, .stat, .contact-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
});

// Enhanced parallax effects
function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const moon = document.querySelector('.moon');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (scrollIndicator) {
        scrollIndicator.style.opacity = Math.max(0, 1 - scrolled / 400);
        scrollIndicator.style.transform = `translateX(-50%) translateY(${scrolled * 0.5}px)`;
    }
    
    if (moon) {
        moon.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.1}deg)`;
    }
    
    // Parallax for particles
    document.querySelectorAll('.particle').forEach((particle, index) => {
        const speed = (index + 1) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Enhanced skill card interactions
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    // Mouse enter effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
        card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.1)';
        
        const orbit = card.querySelector('.skill-orbit');
        if (orbit) {
            orbit.style.opacity = '0.6';
            orbit.style.animationDuration = '2s';
        }
        
        const icon = card.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(10deg)';
        }
    });
    
    // Mouse leave effect
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        
        const orbit = card.querySelector('.skill-orbit');
        if (orbit) {
            orbit.style.opacity = '0';
            orbit.style.animationDuration = '12s';
        }
        
        const icon = card.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = '';
        }
    });
    
    // Mouse move effect for 3D tilt
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;
        
        card.style.transform = `translateY(-15px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Enhanced project card interactions
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-20px) scale(1.02)';
        
        const preview = card.querySelector('.project-preview');
        if (preview) {
            preview.style.transform = 'scale(1.05) rotate(2deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        
        const preview = card.querySelector('.project-preview');
        if (preview) {
            preview.style.transform = '';
        }
    });
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;
        
        card.style.transform = `translateY(-20px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Enhanced contact item interactions
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

// Form handling
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.querySelector('span').textContent;
        
        submitButton.querySelector('span').textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        setTimeout(() => {
            submitButton.querySelector('span').textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            form.reset();
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 2500);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 20px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1);
        z-index: 10000;
        transform: translateX(400px) scale(0.9);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 350px;
        font-weight: 600;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px) scale(0.9)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 6000);
}

// Enhanced Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length &&
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        activateSpaceMode();
        konamiCode = [];
    }
});

function activateSpaceMode() {
    showNotification('🚀 Cosmic mode activated! Welcome to the universe!', 'success');
    
    // Enhanced space mode effects
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${4 + Math.random() * 8}px;
            height: ${4 + Math.random() * 8}px;
            background: radial-gradient(circle, ${['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]}, transparent);
            border-radius: 50%;
            animation: float ${10 + Math.random() * 8}s infinite ease-in-out;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: -${Math.random() * 10}s;
            box-shadow: 0 0 20px currentColor;
            filter: blur(0.5px);
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Enhanced cosmic effects
    document.body.style.filter = 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.4)) saturate(1.2)';
    
    // Add cosmic background overlay
    const cosmicOverlay = document.createElement('div');
    cosmicOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
        pointer-events: none;
        z-index: -1;
        animation: cosmicPulse 4s ease-in-out infinite alternate;
    `;
    document.body.appendChild(cosmicOverlay);
    
    // Reset after 15 seconds
    setTimeout(() => {
        document.body.style.filter = '';
        const extraParticles = document.querySelectorAll('.particles .particle:nth-child(n+6)');
        extraParticles.forEach(particle => particle.remove());
        if (cosmicOverlay.parentNode) {
            cosmicOverlay.parentNode.removeChild(cosmicOverlay);
        }
    }, 15000);
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateNavbar();
    highlightNavigation();
    checkTypingAnimation();
    updateParallax();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Enhanced mouse trail effect
if (window.innerWidth > 768) {
    let mouseTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({ 
            x: e.clientX, 
            y: e.clientY, 
            time: Date.now(),
            id: Math.random()
        });
        
        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
        
        // Create trail elements
        if (Math.random() < 0.3) {
            const trail = document.createElement('div');
            const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            trail.className = 'mouse-trail';
            trail.style.cssText = `
                position: fixed;
                pointer-events: none;
                width: ${2 + Math.random() * 4}px;
                height: ${2 + Math.random() * 4}px;
                background: radial-gradient(circle, ${color}, transparent);
                border-radius: 50%;
                z-index: 9999;
                animation: fadeTrail 1.5s ease-out forwards;
                left: ${e.clientX - 2}px;
                top: ${e.clientY - 2}px;
                box-shadow: 0 0 10px ${color};
            `;
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 1500);
        }
    });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    updateNavbar();
    highlightNavigation();
    checkTypingAnimation();
    updateParallax();
    
    // Staggered loading animation
    const mainElements = document.querySelectorAll('.hero, .about, .skills, .projects, .contact');
    mainElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Console easter egg
    console.log('🚀 Welcome to Aman\'s Space Portfolio!');
    console.log('🌟 Try the Konami code for a cosmic surprise: ↑↑↓↓←→←→BA');
    console.log('✨ Built with passion and stellar attention to detail!');
});

// Resize handler for responsive adjustments
window.addEventListener('resize', throttle(() => {
    updateNavbar();
    updateParallax();
}, 100));

// Enhanced CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeTrail {
        0% { opacity: 1; transform: scale(1) rotate(0deg); }
        100% { opacity: 0; transform: scale(0.3) rotate(180deg); }
    }
    
    @keyframes cosmicPulse {
        0% { opacity: 0.1; transform: scale(1); }
        100% { opacity: 0.3; transform: scale(1.1); }
    }
    
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .animate-in {
        animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .navbar {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);