// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1500);
});

// Custom Cursor
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

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
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .experience-card');

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
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
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
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Skill items hover effect with random colors
const skillItems = document.querySelectorAll('.skill-item');
const colors = ['#00d4ff', '#ff6b6b', '#4ecdc4', '#ffa726', '#ab47bc', '#26c6da'];

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        item.style.borderColor = randomColor;
        item.querySelector('i').style.color = randomColor;
        item.style.boxShadow = `0 10px 30px ${randomColor}20`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        item.querySelector('i').style.color = 'var(--primary-color)';
        item.style.boxShadow = 'none';
    });
});

// Form submission with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init("T-I7xqUEQTeSCiWgf");
            console.log("EmailJS initialized successfully");
            setTimeout(() => {
                showNotification("Contact form ready", "info");
            }, 2000);
        } catch (error) {
            console.error('EmailJS initialization error:', error);
            showNotification('Contact form configuration error', 'error');
        }
    } else {
        console.error('EmailJS library failed to load');
        showNotification('Contact form is currently unavailable', 'error');
    }
});

// Form submission handler
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-circle-notch fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Show loading notification
    showNotification('Sending message...', 'info');
    
    // Get form values directly from the form element
    const formData = {
        from_name: document.getElementById('name').value,
        reply_to: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_name: 'Ragul Ravi'
    };
    
    // Verify data before sending (debugging)
    console.log('Attempting to send email with:', formData);
    
    // Send the main message to you
    emailjs.send(
        'service_uloqnsr',     // REPLACE: Your EmailJS service ID 
        'template_wqv4cis',    // REPLACE: Your EmailJS template ID for messages to you
        formData
    )
    .then(function(response) {
        console.log('Main message sent successfully!', response.status, response.text);
        
        // Now send auto-reply to the sender
        const autoReplyData = {
            from_name: formData.from_name,
            reply_to: formData.reply_to,
            message: formData.message,
            to_email: formData.reply_to
        };
        
        return emailjs.send(
            'service_uloqnsr',        // Same service ID
            'template_q3qgl9j', // REPLACE: Your auto-reply template ID
            autoReplyData
        );
    })
    .then(function(response) {
        console.log('Auto-reply sent successfully!', response.status, response.text);
        showNotification('Message sent successfully! Check your email for confirmation.', 'success');
        document.querySelector('.contact-form').reset();
        
        // Restore button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    })
    .catch(function(err) {
        console.error('FAILED...', err);
        // Show detailed error to help debugging
        let errorMsg = 'Failed to send message';
        if (err && err.text) {
            errorMsg += ': ' + err.text;
        } else if (err && err.status) {
            errorMsg += ' (Error ' + err.status + ')';
        }
        showNotification(errorMsg, 'error');
        
        // Restore button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Particle background effect
function createParticles() {
    const particleContainer = document.createElement('div');
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
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00d4ff;
            border-radius: 50%;
            opacity: 0.1;
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particleContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #4ecdc4);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Magnetic effect for buttons
const magneticElements = document.querySelectorAll('.btn, .social-link, .project-link');

magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
    });
});

// Text reveal animation on scroll
function revealText() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    
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
    // Set initial states for text elements
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    textElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Trigger initial reveal
    setTimeout(revealText, 100);
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
