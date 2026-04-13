document.addEventListener('DOMContentLoaded', () => {
    // --- Dynamic Greeting Based on Time ---
    function updateGreeting() {
        const now = new Date();
        const hour = now.getHours();
        const greetingElement = document.querySelector('.mpc-greeting');
        
        let greeting = '';
        let emoji = '';
        
        if (hour >= 5 && hour < 12) {
            greeting = 'Good morning';
            emoji = '🌅';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'Good afternoon';
            emoji = '☀️';
        } else if (hour >= 17 && hour < 21) {
            greeting = 'Good evening';
            emoji = '🌆';
        } else {
            greeting = 'Good night';
            emoji = '🌙';
        }
        
        if (greetingElement) {
            greetingElement.textContent = `${greeting} ${emoji}`;
        }
    }
    
    // Update greeting on page load
    updateGreeting();
    
    // Update greeting every minute
    setInterval(updateGreeting, 60000);

    // --- Enhanced Social Links ---
    function setupSocialLinks() {
        // WhatsApp links with pre-filled message
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const message = encodeURIComponent("Hello Francis! I'm interested in your services and would like to discuss a potential project.");
                const phone = "254701239379";
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
            });
        });

        // Email links with subject line
        const emailLinks = document.querySelectorAll('a[href^="mailto:frankmutuku758@gmail.com"]:not(.mpc-email)');
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const subject = encodeURIComponent("Inquiry about your services");
                const body = encodeURIComponent("Hello Francis,\n\nI'm interested in learning more about your services. Please let me know how we can work together.\n\nBest regards");
                window.location.href = `mailto:frankmutuku758@gmail.com?subject=${subject}&body=${body}`;
            });
        });

        // CV Download tracking and feedback
        const cvDownloadLinks = document.querySelectorAll('.mpc-btn-cv');
        cvDownloadLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add visual feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading...';
                this.style.pointerEvents = 'none';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.pointerEvents = 'auto';
                    
                    // Show success message
                    showDownloadMessage();
                }, 2000);
                
                // Track download (you can add analytics here)
                console.log('CV Download initiated');
            });
        });
    }

    // Show download success message
    function showDownloadMessage() {
        // Create temporary message
        const message = document.createElement('div');
        message.textContent = 'CV download started! Thank you for your interest.';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(message);
        
        // Remove message after 4 seconds
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 4000);
    }

    // Setup social links
    setupSocialLinks();

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const sideNav = document.getElementById('side-nav');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    function openMobileMenu() {
        sideNav.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        sideNav.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    }
    
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // --- Navigation Scroll Tracking ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.side-nav a');

    const updateActiveNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: "-10% 0px -40% 0px"
    });

    sections.forEach(section => updateActiveNav.observe(section));

    // --- reveal Animations on Scroll ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- Smooth Scrolling for Navigation ---
    navItems.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                closeMobileMenu();
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Form Submission Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const btnEmail = document.getElementById('btn-email');
        const btnWhatsapp = document.getElementById('btn-whatsapp');

        const getFormData = () => {
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            return { name, email, message };
        };

        const validateForm = () => {
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return false;
            }
            return true;
        };

        btnEmail.addEventListener('click', () => {
            if (!validateForm()) return;
            const { name, email, message } = getFormData();
            const subject = encodeURIComponent(`New Inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            const mailtoLink = document.createElement('a');
            mailtoLink.href = `mailto:frankmutuku758@gmail.com?subject=${subject}&body=${body}`;
            document.body.appendChild(mailtoLink);
            mailtoLink.click();
            document.body.removeChild(mailtoLink);
        });

        btnWhatsapp.addEventListener('click', () => {
            if (!validateForm()) return;
            const { name, email, message } = getFormData();
            const text = encodeURIComponent(`Hello, my name is ${name} (${email}).\n\n${message}`);
            const phone = "254701239379"; 
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
        });

        // Prevent default submit if enter is pressed
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }
});
