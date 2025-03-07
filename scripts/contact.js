export function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <span class="btn-icon">⏳</span>';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // Show success message
                form.innerHTML = `
                    <div class="success-message">
                        <h3>Thank you! 🎉</h3>
                        <p>Your message has been sent successfully.</p>
                    </div>
                `;
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            alert('Oops! There was a problem sending your message. Please try again.');
        }
    });
}