/* ==========================================================================
   Portfolio Interactivity and Libraries Integration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true,
            offset: 100,
            disable: 'mobile' // Disable scroll animations on mobile for better performance
        });
    }

    // Initialize Typed.js for terminal-style typing in Hero
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Graduate Software Engineer.',
                'Artificial Intelligence Intern.',
                'Full Stack Developer.',
                'Problem Solver.'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true,
            cursorChar: '_',
            smartBackspace: true
        });
    }

    // Dom Elements
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contact-form');
    const toastContainer = document.getElementById('toast-container');

    /* ==========================================================================
       Sticky Header and Active Navigation Highlight on Scroll
       ========================================================================== */
    window.addEventListener('scroll', () => {
        // Sticky Header Class Toggle
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Active Link Highlight
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Offset for header height
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       Mobile Responsive Navigation Menu Toggle
       ========================================================================== */
    const toggleMenu = () => {
        menuToggle.classList.toggle('open');
        navLinksContainer.classList.toggle('open');
        // Prevent body scrolling when mobile menu is open
        document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : 'auto';
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside of the mobile menu
    document.addEventListener('click', (e) => {
        if (navLinksContainer.classList.contains('open') && 
            !navLinksContainer.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    /* ==========================================================================
       Interactive Project Filtering
       ========================================================================== */
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add fade-out transition
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        // Force reflow
                        card.offsetHeight;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    /* ==========================================================================
       Contact Form Submission Handler & Toasts
       ========================================================================== */
    const showToast = (title, message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i data-lucide="check"></i>
            </div>
            <div class="toast-content">
                <h5>${title}</h5>
                <p>${message}</p>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Re-run lucide to render icon in dynamically added HTML
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Auto remove toast after 4 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px) scale(0.9)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Simple validation check
            if (!name || !email || !subject || !message) {
                showToast('Validation Error', 'Please fill in all the required fields.', 'error');
                return;
            }

            // Disable submit button during simulation
            const submitBtn = document.getElementById('form-submit-btn');
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending... <i data-lucide="loader" class="icon-sm spin"></i>`;
            if (typeof lucide !== 'undefined') { lucide.createIcons(); }

            // Simulate server network latency (1.5 seconds)
            setTimeout(() => {
                // Reset submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                if (typeof lucide !== 'undefined') { lucide.createIcons(); }

                // Show Success Message toast
                showToast(
                    'Message Sent!',
                    `Thanks ${name}, I will get back to you as soon as possible.`
                );

                // Reset form inputs
                contactForm.reset();
            }, 1500);
        });
    }
});

// Simple spinner animation CSS added programmatically for loading button state
const style = document.createElement('style');
style.textContent = `
    .spin {
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
