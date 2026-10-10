// DOM Element
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const navLinksItems = document.querySelectorAll('.nav-links li');
const themeToggle = document.querySelector('.theme-toggle');
const moonIcon = document.querySelector('.fa-moon');
const sunIcon = document.querySelector('.fa-sun');
const contactForm = document.getElementById('contact-form');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
});

// Mobile Navigation
const closeMobileMenu = () => {
    navLinks.classList.remove('nav-active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('no-scroll');
};

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('no-scroll', isOpen);
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            closeMobileMenu();
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('nav-active')) {
        closeMobileMenu();
        hamburger.focus();
    }
});

window.matchMedia('(min-width: 993px)').addEventListener('change', (event) => {
    if (event.matches) closeMobileMenu();
});

// Theme toggle functionality
if (themeToggle) themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    // Toggle icons
    if (document.body.classList.contains('light-theme')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }

    // Save theme preference to localStorage
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    // Add animations with delay for elements
    const animateElements = () => {
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-animate');
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(section);
        });
    };

    animateElements();
});

// Handle contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple form validation
        if (!name || !email || !subject || !message) {
            alert('Please fill out all fields');
            return;
        }

        // Here you would normally send the form data to a server
        // For this demo, we'll just show a success message

        const formData = {
            name,
            email,
            subject,
            message
        };

        console.log('Form submitted:', formData);

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you for your message, ${name}! I'll get back to you soon.</p>
        `;

        // Replace form with success message
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
    });
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if href is just "#"

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Type out the hero name once on page load.
const heroName = document.querySelector('.hero-name-text');
if (heroName && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const name = heroName.textContent;
    const characterDelay = 110;
    const repeatInterval = 10000;

    const playNameTyping = () => {
        heroName.textContent = '';
        heroName.classList.remove('typing-complete');
        let characterIndex = 0;

        const typeNextCharacter = () => {
            heroName.textContent = name.slice(0, characterIndex + 1);
            characterIndex += 1;

            if (characterIndex < name.length) {
                setTimeout(typeNextCharacter, characterDelay);
            } else {
                heroName.classList.add('typing-complete');
                setTimeout(playNameTyping, repeatInterval - name.length * characterDelay);
            }
        };

        typeNextCharacter();
    };

    setTimeout(playNameTyping, 350);
}

// Add typing effect to the binary in hero section
const binaryElement = document.querySelector('.binary');
if (binaryElement) {
    const originalText = binaryElement.innerText;
    const cycleDuration = 5000;
    const characterDelay = cycleDuration / originalText.length;

    const playBinaryAnimation = () => {
        let index = 0;
    binaryElement.innerText = '';

        const typeNextCharacter = () => {
            binaryElement.innerText = originalText.slice(0, index + 1);
            index += 1;

            if (index < originalText.length) {
                setTimeout(typeNextCharacter, characterDelay);
            } else {
                setTimeout(playBinaryAnimation, characterDelay);
            }
        };

        typeNextCharacter();
    };

    playBinaryAnimation();
}

// Open an animated certification preview from each certification card.
const certificationDialog = document.querySelector('.certification-dialog');
if (certificationDialog) {
    const previewTitle = certificationDialog.querySelector('#certification-preview-title');
    const certificationDocument = certificationDialog.querySelector('.certification-document');
    const certificationDownload = certificationDialog.querySelector('.certification-download');
    const closeCertificationDialog = certificationDialog.querySelector('.certification-dialog-close');

    document.querySelectorAll('.certification-card').forEach((card) => {
        card.addEventListener('click', () => {
            previewTitle.textContent = card.querySelector('h3').textContent;
            const certificateUrl = card.dataset.certificate;
            certificationDocument.src = certificateUrl;
            certificationDownload.href = certificateUrl;
            certificationDialog.showModal();
        });
    });

    closeCertificationDialog.addEventListener('click', () => {
        certificationDialog.close();
        certificationDocument.removeAttribute('src');
    });
    certificationDialog.addEventListener('click', (event) => {
        if (event.target === certificationDialog) {
            certificationDialog.close();
            certificationDocument.removeAttribute('src');
        }
    });
    certificationDialog.addEventListener('close', () => certificationDocument.removeAttribute('src'));
}
