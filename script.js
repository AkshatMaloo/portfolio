/* ========== CUSTOM CURSOR ========== */
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
});

// Hover effect on clickable elements
const clickables = document.querySelectorAll('a, button, .card');
clickables.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.backgroundColor = 'rgba(0, 119, 255, 0.1)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'transparent';
    });
});

/* ========== LOADING ANIMATION ========== */
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }
});

/* ========== MOBILE MENU ========== */
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
        navLinks.classList.toggle("show");
    }
}

/* ========== SCROLL REVEAL ANIMATION ========== */
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Add extra animation for cards
            if (entry.target.classList.contains('card')) {
                entry.target.style.animation = 'floatIn 0.8s ease forwards';
            }
            
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section, .card, .hero-content, .page-header, .about-grid, .form-wrapper");
    
    sections.forEach(section => {
        section.classList.add('reveal-init');
        revealOnScroll.observe(section);
    });
});

/* ========== PARALLAX EFFECT ========== */
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const heroVisual = document.querySelector('.hero-visual');
    const glowEffect = document.querySelector('.glow-effect');
    
    if (heroVisual) {
        heroVisual.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    if (glowEffect) {
        glowEffect.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    }
});

/* ========== TYPING EFFECT FOR HERO SECTION ========== */
const heroText = document.querySelector('.hero-content h1 span');
if (heroText) {
    const words = ['Problem-Solving', 'Innovation', 'Engineering', 'Development'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            heroText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(typeEffect, 1000);
}

/* ========== SMOOTH SCROLLING ========== */
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

/* ========== CONTACT FORM VALIDATION WITH ANIMATION ========== */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
    
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Shake animation for error
        function shakeForm() {
            contactForm.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                contactForm.style.animation = '';
            }, 500);
        }

        if (!name || !email || !message) {
            showMessage("All fields are required!", "red");
            shakeForm();
            return;
        }

        if (!emailPattern.test(email)) {
            showMessage("Invalid email format!", "red");
            shakeForm();
            return;
        }

        if (message.length < 10) {
            showMessage("Message must be at least 10 characters!", "red");
            shakeForm();
            return;
        }

        // Success animation
        showMessage("Message sent successfully! ✨", "lightgreen");
        contactForm.style.animation = 'success 0.5s ease';
        setTimeout(() => {
            contactForm.style.animation = '';
        }, 500);
        
        contactForm.reset();
    });
}

function showMessage(text, color) {
    const formMessage = document.getElementById("formMessage");
    if (formMessage) {
        formMessage.textContent = text;
        formMessage.style.color = color;
        formMessage.style.animation = 'fadeInUp 0.3s ease';
    }
}

/* ========== ADD SHAKE ANIMATION ========== */
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes success {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    @keyframes floatIn {
        0% {
            opacity: 0;
            transform: translateY(40px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

/* ========== ACTIVE NAVIGATION HIGHLIGHT ========== */
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-links a');
menuItems.forEach(item => {
    if (item.href === currentLocation) {
        item.classList.add('active');
    }
});

/* ========== PROJECT CARD INTERACTION ========== */
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('arrow-link')) {
            const link = card.querySelector('.arrow-link');
            if (link) {
                window.location.href = link.href;
            }
        }
    });
});