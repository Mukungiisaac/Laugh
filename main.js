document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

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
                window.scrollTo({
                    top: targetElement.offsetTop,
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
            // we remove target='_blank' so it doesn't open an empty tab
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
