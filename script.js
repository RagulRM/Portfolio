// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const themeToggle = document.getElementById('themeToggle');

// Theme Toggle Functionality
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light theme
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Theme toggle click handler
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add ripple effect
        createThemeRipple(themeToggle);
    });
}

// Create ripple effect for theme toggle
function createThemeRipple(button) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        top: 0;
        left: 0;
        transform: scale(0);
        animation: themeRipple 0.6s ease-out;
        pointer-events: none;
    `;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation if not exists
if (!document.querySelector('#theme-ripple-style')) {
    const style = document.createElement('style');
    style.id = 'theme-ripple-style';
    style.textContent = `
        @keyframes themeRipple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1500);
});

// Custom Cursor - Desktop Only
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Check if device supports hover (desktop)
const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isDesktop && cursor && cursorFollower) {
    // Show cursor elements on desktop
    cursor.style.display = 'block';
    cursorFollower.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
} else {
    // Hide cursor elements on mobile
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
}

// Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

function updateActiveNav() {
    const scrollPos = window.scrollY + 200;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinksArray.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Add scroll animation class to elements
const animateElements = document.querySelectorAll('.section-header, .about-text, .about-visual, .skill-category, .project-card, .contact-info, .contact-form');
animateElements.forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// Typing animation for hero title
const titleLines = document.querySelectorAll('.title-line');
const titleAccent = document.querySelector('.title-accent');

function typeText(element, text, delay = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            element.style.opacity = '1';
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                } else {
                    resolve();
                }
            }
            type();
        }, delay);
    });
}

// Start typing animation after page load
window.addEventListener('load', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await typeText(titleLines[0], 'Associate Software', 0);
    await typeText(titleLines[1], 'Engineer', 200);
    await typeText(titleAccent, 'Security & Automation', 400);
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    
    stats.forEach(stat => {
        const target = parseFloat(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const updateStat = () => {
            if (current < target) {
                current += increment;
                stat.textContent = current.toFixed(1);
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target;
            }
        };
        
        updateStat();
    });
    
    statsAnimated = true;
}

// Trigger stats animation when about section is in view
const aboutSection = document.getElementById('about');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(aboutSection);

// Project cards tilt effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 40;
        const rotateY = (centerX - x) / 40;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.4s ease';
    });
});

// Skill items hover effect with theme-aware colors
const skillItems = document.querySelectorAll('.skill-item');

const getAccentColors = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return isDark 
        ? ['#93C5FD', '#A5B4FC', '#60A5FA', '#818CF8', '#7DD3FC']
        : ['#1D4ED8', '#4F46E5', '#2563EB', '#4338CA', '#0284C7'];
};

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const colors = getAccentColors();
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        item.style.borderColor = randomColor;
        item.querySelector('i').style.color = randomColor;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.borderColor = '';
        item.querySelector('i').style.color = 'var(--primary-color)';
        item.style.boxShadow = '';
    });
});

// Form ready
document.addEventListener('DOMContentLoaded', function() {
    // Contact form initialized silently
});

// Web3Forms submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-circle-notch fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Show loading notification
        showNotification('Sending message...', 'info');
        
        // Prepare form data
        const formData = new FormData(this);
        
        try {
            // Send to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Failed to send message. Please try again or email directly.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    const bgColor = type === 'success' ? 'linear-gradient(135deg, #34d399, #059669)' 
                   : type === 'error' ? 'linear-gradient(135deg, #f472b6, #dc2626)' 
                   : 'linear-gradient(135deg, #60a5fa, #3B5FCC)';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        z-index: 10000;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        font-weight: 500;
        font-size: 0.9rem;
        backdrop-filter: blur(10px);
        max-width: 360px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// Particle background effect
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const size = 1 + Math.random() * 1.5;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: ${0.03 + Math.random() * 0.06};
            animation: float ${10 + Math.random() * 15}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particleContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Magnetic effect removed for cleaner feel

// Text reveal animation on scroll - gentle fade only for non-hero elements
function revealText() {
    const textElements = document.querySelectorAll('.section h2, .section h3, .about-text p, .contact-info > p');
    
    textElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', revealText);

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states for section text elements only (not hero)
    const textElements = document.querySelectorAll('.section h2, .section h3, .about-text p, .contact-info > p');
    textElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });
    
    // Trigger initial reveal
    setTimeout(revealText, 100);
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Easter egg: Konami code
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.filter = 'hue-rotate(180deg)';
            showNotification('🎉 Secret mode activated!', 'success');
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

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
    }
}

// Apply throttling to scroll events for better performance
window.addEventListener('scroll', throttle(() => {
    updateActiveNav();
    revealText();
}, 16)); // ~60fps

// Resume Button Handler
const resumeBtn = document.getElementById('resumeBtn');
if (resumeBtn) {
    // Add context menu listener for download option
    resumeBtn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        // Trigger download
        const link = document.createElement('a');
        link.href = resumeBtn.href;
        link.download = 'Ragul_Ravi_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show notification
        showNotification('Resume download started', 'success');
    });
    
    // Add tooltip on hover
    resumeBtn.setAttribute('title', 'Click to preview • Right-click to download');
}
