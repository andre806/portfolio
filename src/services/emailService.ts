
import { ContactForm } from '../models/ContactForm';

interface FeedbackData {
    type: 'bug' | 'suggestion' | 'compliment' | 'other';
    message: string;
    email?: string;
    page?: string;
}

// This function only sends the contact form data to the API route. No Nodemailer or backend code here!
export async function sendContactEmail(formData: ContactForm) {
    // Optionally validate fields on client
    const required = ['name', 'email', 'subject', 'message'];
    for (const field of required) {
        if (!formData[field as keyof ContactForm]?.toString().trim()) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        throw new Error('Invalid email');
    }
    if (formData.message.length > 1000) {
        throw new Error('Message too long (max 1000 characters)');
    }

    // Send to API route
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submission: formData }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || 'Failed to send message');
    }
    return await response.json();
}

// Function to send feedback
export async function sendFeedback(feedbackData: FeedbackData) {
    if (!feedbackData.message.trim()) {
        throw new Error('Message is required');
    }

    // Convert feedback to contact form format
    const contactData: ContactForm = {
        name: 'Feedback User',
        email: feedbackData.email || 'no-reply@feedback.com',
        subject: `Feedback: ${feedbackData.type}`,
        message: feedbackData.message,
        phone: '',
        company: '',
        budget: '',
        timeline: '',
        projectType: '',
        source: 'feedback-form',
        newsletter: false
    };

    // Use the existing sendContactEmail function
    return await sendContactEmail(contactData);
}

// Hook to use email service
export function useEmailService() {
    return {
        sendFeedback,
        sendContactEmail
    };
}