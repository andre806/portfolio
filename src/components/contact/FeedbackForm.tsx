'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendFeedback } from '../../services/emailService';

interface FeedbackFormProps {
    className?: string;
}

interface FeedbackData {
    type: 'bug' | 'suggestion' | 'compliment' | 'other';
    message: string;
    email?: string;
    page?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackData>({
        type: 'suggestion',
        message: '',
        email: '',
        page: typeof window !== 'undefined' ? window.location.pathname : ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const feedbackTypes = [
        { id: 'bug', label: 'Bug/Erro', icon: '🐛', color: 'text-red-600' },
        { id: 'suggestion', label: 'Sugestão', icon: '💡', color: 'text-yellow-600' },
        { id: 'compliment', label: 'Elogio', icon: '👍', color: 'text-green-600' },
        { id: 'other', label: 'Outros', icon: '💬', color: 'text-blue-600' }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!feedback.message.trim()) return;

        setIsSubmitting(true);

        try {
            await sendFeedback(feedback);

            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setIsOpen(false);
                setFeedback({
                    type: 'suggestion',
                    message: '',
                    email: '',
                    page: typeof window !== 'undefined' ? window.location.pathname : ''
                });
            }, 2000);
        } catch (error) {
            console.error('Erro ao enviar feedback:', error);
            // Você pode adicionar um toast de erro aqui
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedType = feedbackTypes.find(type => type.id === feedback.type);

    return (
        <>
            {/* Botão flutuante */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 
          hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg 
          hover:shadow-xl transition-all duration-200 
          ${isOpen ? 'rotate-45' : ''} ${className}`}
                title="Enviar feedback"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </motion.button>

            {/* Modal de feedback */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 flex items-end justify-end p-6"
                    >
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/20 dark:bg-black/40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Form container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md mr-20 mb-20"
                        >
                            {isSubmitted ? (
                                // Mensagem de sucesso
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-6 text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                        className="text-green-600 dark:text-green-400 text-4xl mb-3"
                                    >
                                        ✓
                                    </motion.div>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-lg font-semibold text-slate-900 dark:text-white mb-2"
                                    >
                                        Feedback Enviado!
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-sm text-slate-600 dark:text-slate-400"
                                    >
                                        Obrigado pelo seu feedback. Ele é muito importante para mim!
                                    </motion.p>
                                </motion.div>
                            ) : (
                                // Formulário
                                <form onSubmit={handleSubmit} className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            💭 Feedback
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Tipo de feedback */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Tipo de feedback
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {feedbackTypes.map(type => (
                                                <button
                                                    key={type.id}
                                                    type="button"
                                                    onClick={() => setFeedback(prev => ({ ...prev, type: type.id as FeedbackData['type'] }))}
                                                    className={`p-2 text-xs rounded-lg border transition-all duration-200 
                          ${feedback.type === type.id
                                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                                            : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                                                        }`}
                                                >
                                                    <div className="flex flex-col items-center space-y-1">
                                                        <span className="text-base">{type.icon}</span>
                                                        <span className={feedback.type === type.id ? '' : 'text-slate-600 dark:text-slate-400'}>
                                                            {type.label}
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mensagem */}
                                    <div className="mb-4">
                                        <label htmlFor="feedback-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Sua mensagem
                                        </label>
                                        <textarea
                                            id="feedback-message"
                                            rows={4}
                                            value={feedback.message}
                                            onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 
                      bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-none"
                                            placeholder={`Descreva seu ${selectedType?.label.toLowerCase()}...`}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {/* Email opcional */}
                                    <div className="mb-6">
                                        <label htmlFor="feedback-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Email (opcional)
                                        </label>
                                        <input
                                            type="email"
                                            id="feedback-email"
                                            value={feedback.email}
                                            onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 
                      bg-white dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                                            placeholder="seu@email.com"
                                            disabled={isSubmitting}
                                        />
                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            Para receber uma resposta (opcional)
                                        </p>
                                    </div>

                                    {/* Botões */}
                                    <div className="flex space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                            className="flex-1 px-4 py-2 text-sm border border-slate-300 dark:border-slate-600 
                      text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 
                      rounded-lg transition-colors duration-200"
                                            disabled={isSubmitting}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !feedback.message.trim()}
                                            className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 
                      hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 
                      text-white rounded-lg transition-all duration-200 disabled:cursor-not-allowed
                      flex items-center justify-center space-x-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
                                                    <span>Enviando...</span>
                                                </>
                                            ) : (
                                                <span>Enviar</span>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FeedbackForm;
