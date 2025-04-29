// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    loader.classList.add('hidden');
});

// Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add loading spinner
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);

    // Initialize animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Mobile menu toggle
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    document.querySelector('.navbar').appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });

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
                // Close mobile menu after clicking
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });

    // Add float animation to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.classList.add('float');
    }

    // Animate skill bars on scroll
    const skillItems = document.querySelectorAll('.skills-container li');
    skillItems.forEach(item => {
        item.classList.add('hidden');
        observer.observe(item);
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Form submission animation with alert
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = contactForm.querySelector('button');
            button.innerHTML = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                button.innerHTML = 'Message Sent!';
                contactForm.reset();
                // Show alert message
                alert('Thank you for your message! I will get back to you soon.');
                setTimeout(() => {
                    button.innerHTML = 'Send Message';
                }, 2000);
            }, 1500);
        });
    }
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        link.style.backgroundColor = 'transparent';
        link.style.color = 'white';
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.style.backgroundColor = '#F1EFEC';
            link.style.color = '#030303';
        }
    });
});

// Navigation link click handler (moved outside scroll event)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            document.querySelectorAll('.nav-links a').forEach(l => {
                l.classList.remove('active');
                l.style.backgroundColor = 'transparent';
                l.style.color = 'white';
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            this.style.backgroundColor = '#F1EFEC';
            this.style.color = '#030303';
        });
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
    document.body.setAttribute('data-theme', savedTheme);

    // Theme toggle button click handler
    themeToggle.addEventListener('click', toggleTheme);
});