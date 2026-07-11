/* ================= Toggle Navbar ================= */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
};

/* ================= Active Link on Scroll ================= */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                let target = document.querySelector('header nav a[href*=' + id + ']');
                if (target) target.classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    navbar.classList.remove('active');
};

/* ================= Scroll Reveal ================= */
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .contact form, .exp-card, .edu-card, .cert-card', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* ================= Typed Text ================= */
const typed = new Typed('.multiple-text', {
    strings: ['Full-Stack Developer', 'CS Student', 'Problem Solver', 'Python Developer', 'React Developer', 'Cloud Engineer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* ================= Contact Form (Formsubmit.co) ================= */
const contactForm = document.getElementById('contact-form');
const submitBtn  = document.getElementById('contact-submit');
const notification = document.getElementById('form-notification');

function showNotification(message, type) {
    notification.textContent = message;
    notification.className = 'form-notification ' + type;
    notification.style.display = 'block';
    setTimeout(() => { notification.style.display = 'none'; }, 5000);
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    submitBtn.value    = 'Sending...';
    submitBtn.disabled = true;

    try {
        const res = await fetch('https://formsubmit.co/ajax/sudarshanpatil9594@gmail.com', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body   : JSON.stringify({ name, email, message })
        });
        const data = await res.json();
        if (data.success === 'true' || data.success === true) {
            showNotification('✅ Message sent! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showNotification('❌ Something went wrong. Please try again.', 'error');
        }
    } catch (err) {
        showNotification('❌ Network error. Please try again later.', 'error');
    }

    submitBtn.value    = 'Send Message';
    submitBtn.disabled = false;
});