document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    e.preventDefault(); // Prevent default only if target exists for smooth scroll
                    const headerOffset = document.getElementById('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Close mobile menu if open
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.getElementById('header').offsetHeight;

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        // Clear active class from all links first
        navLinks.forEach(link => link.classList.remove('active'));

        let currentSectionId = null;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 70; // Adjusted offset

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });

        if (currentSectionId) {
            const activeNavLink = document.querySelector('.nav-links a[href="#' + currentSectionId + '"]');
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }
        } else if (scrollY < sections[0].offsetTop - headerHeight - 70) {
            // If above all sections, highlight home/hero
            const heroLink = document.querySelector('.nav-links a[href="#hero"]');
            if (heroLink) heroLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', navHighlighter);
    navHighlighter(); // Call on load to highlight correctly

    // Update footer year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Basic Contact Form Handling (prevents default, logs to console)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            console.log("Form submitted (Demo - Data logged to console):");
            for (let [key, value] of formData.entries()) {
                console.log(key + ': ' + value);
            }
            alert('Thank you for your message!');
            this.reset();
        });
    }
});