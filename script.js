// Smooth scroll to form section
function scrollToForm() {
    document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
}

// Telegram bot configuration
const TELEGRAM_BOT_TOKEN = '7875277865:AAEqn99cK5cZdeyVUoD9v66dqkuShnifxv8';
const TELEGRAM_CHAT_ID = '5469123339';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

// Form submission handler
document.getElementById('applicationForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        businessName: document.getElementById('businessName').value,
        whatsapp: document.getElementById('whatsapp').value,
        email: document.getElementById('email').value,
        businessType: document.getElementById('businessType').value,
        notes: document.getElementById('notes').value
    };

    // Format message for Telegram
    const message = `
🎯 New Website Application!

👤 Full Name: ${formData.fullName}
🏢 Business Name: ${formData.businessName}
📱 WhatsApp: ${formData.whatsapp}
📧 Email: ${formData.email}
💼 Business Type: ${formData.businessType}
📝 Notes: ${formData.notes}
`;

    try {
        // Send to Telegram
        const response = await fetch(TELEGRAM_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message
            })
        });

        const result = await response.json();
        
        if (response.ok && result.ok) {
            alert('Thank you! Your application has been submitted successfully.');
            this.reset();
        } else {
            throw new Error(result.description || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Sorry, there was an error submitting your application. Please try again later.');
    }
});

// Add floating effect to cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});