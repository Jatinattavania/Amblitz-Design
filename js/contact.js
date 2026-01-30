/* ============================================
   AMBLITZ DESIGN - Contact Form with EmailJS
   ============================================ */

/**
 * EmailJS Configuration
 *
 * To set up EmailJS:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Add an email service (Gmail, Outlook, etc.)
 * 3. Create an email template with these variables:
 *    - {{first_name}}
 *    - {{last_name}}
 *    - {{email}}
 *    - {{message}}
 * 4. Replace the following constants with your actual IDs:
 */

const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID

// Initialize EmailJS
(function () {
    // Check if EmailJS is loaded
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

/* ============================================
   FORM VALIDATION
   ============================================ */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    const errors = [];

    if (!formData.firstName || formData.firstName.trim().length < 2) {
        errors.push('Please enter a valid first name (at least 2 characters)');
    }

    if (!formData.lastName || formData.lastName.trim().length < 2) {
        errors.push('Please enter a valid last name (at least 2 characters)');
    }

    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }

    return errors;
}

/* ============================================
   FORM SUBMISSION HANDLER
   ============================================ */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) {return;}

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Validate form
        const errors = validateForm(formData);

        if (errors.length > 0) {
            showMessage(formMessage, errors.join('<br>'), 'error');
            return;
        }

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';

        try {
            // Check if EmailJS is configured
            if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
                // Demo mode - simulate success
                console.log('Demo Mode - Form Data:', formData);
                await simulateEmailSend();
                showMessage(formMessage, 'Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                // Send email using EmailJS
                const templateParams = {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    message: formData.message,
                    to_name: 'Amblitz Design Team'
                };

                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
                showMessage(formMessage, 'Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
            }
        } catch (error) {
            console.error('Email send failed:', error);
            showMessage(formMessage, 'Sorry, there was an error sending your message. Please try again later.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

/* ============================================
   HELPER FUNCTIONS
   ============================================ */
function showMessage(element, message, type) {
    if (!element) {return;}

    element.innerHTML = message;
    element.className = 'form-message ' + type;
    element.style.display = 'block';

    // Scroll to message
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

function simulateEmailSend() {
    return new Promise(resolve => {
        setTimeout(resolve, 1500);
    });
}

/* ============================================
   REAL-TIME VALIDATION FEEDBACK
   ============================================ */
function initRealTimeValidation() {
    const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            // Remove error state on input
            this.classList.remove('error');
            const errorEl = this.parentElement.querySelector('.field-error');
            if (errorEl) {errorEl.remove();}
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.id) {
        case 'first-name':
        case 'last-name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Please enter at least 2 characters';
            }
            break;
        case 'email':
            if (!validateEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Please enter at least 10 characters';
            }
            break;
    }

    // Show/hide error
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {existingError.remove();}

    if (!isValid && value.length > 0) {
        field.classList.add('error');
        const errorEl = document.createElement('span');
        errorEl.className = 'field-error';
        errorEl.textContent = errorMessage;
        errorEl.style.cssText = 'color: #e74c3c; font-size: 0.8rem; display: block; margin-top: 4px;';
        field.parentElement.appendChild(errorEl);
    } else {
        field.classList.remove('error');
    }

    return isValid;
}

/* ============================================
   INITIALIZE ON DOM READY
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initRealTimeValidation();
});
