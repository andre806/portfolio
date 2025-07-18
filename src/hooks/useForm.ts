import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { ContactForm, ContactFormErrors } from '../models/ContactForm';

interface UseFormOptions {
    initialValues: Partial<ContactForm>;
    validate?: (values: Partial<ContactForm>) => ContactFormErrors;
    onSubmit: (values: ContactForm) => Promise<void>;
}

export const useForm = ({ initialValues, validate, onSubmit }: UseFormOptions) => {
    const [values, setValues] = useState<Partial<ContactForm>>(initialValues);
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string>('');

    // Atualizar valor de um campo
    const setValue = useCallback((name: keyof ContactForm, value: string | boolean) => {
        setValues(prev => ({ ...prev, [name]: value }));

        // Limpar erro do campo quando o usuário começar a digitar
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [errors]);

    // Handle change para inputs
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setValue(name as keyof ContactForm, checked);
        } else {
            setValue(name as keyof ContactForm, value);
        }
    }, [setValue]);

    // Validar um campo específico
    const validateField = useCallback((name: keyof ContactForm) => {
        if (!validate) return;

        const fieldErrors = validate(values);
        setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));

        return !fieldErrors[name];
    }, [values, validate]);

    // Validar todos os campos
    const validateForm = useCallback(() => {
        if (!validate) return true;

        const formErrors = validate(values);
        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    }, [values, validate]);

    // Reset do formulário
    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setIsSubmitting(false);
        setIsSubmitted(false);
        setSubmitError('');
    }, [initialValues]);

    // Submit do formulário
    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            await onSubmit(values as ContactForm);
            setIsSubmitted(true);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Erro ao enviar formulário');
        } finally {
            setIsSubmitting(false);
        }
    }, [values, validateForm, onSubmit]);

    // Verificar se o formulário é válido
    const isValid = useCallback(() => {
        if (!validate) return true;
        const formErrors = validate(values);
        return Object.keys(formErrors).length === 0;
    }, [values, validate]);

    // Verificar se o formulário foi modificado
    const isDirty = useCallback(() => {
        return JSON.stringify(values) !== JSON.stringify(initialValues);
    }, [values, initialValues]);

    return {
        values,
        errors,
        isSubmitting,
        isSubmitted,
        submitError,
        setValue,
        handleChange,
        validateField,
        validateForm,
        handleSubmit,
        reset,
        isValid: isValid(),
        isDirty: isDirty()
    };
};

// Validador padrão para formulário de contato
export const validateContactForm = (values: Partial<ContactForm>): ContactFormErrors => {
    const errors: ContactFormErrors = {};

    // Nome obrigatório
    if (!values.name?.trim()) {
        errors.name = 'Nome é obrigatório';
    } else if (values.name.trim().length < 2) {
        errors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Email obrigatório e válido
    if (!values.email?.trim()) {
        errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Email inválido';
    }

    // Telefone opcional mas se preenchido deve ser válido
    if (values.phone && !/^[\d\s\-\(\)\+]+$/.test(values.phone)) {
        errors.phone = 'Telefone inválido';
    }

    // Assunto obrigatório
    if (!values.subject?.trim()) {
        errors.subject = 'Assunto é obrigatório';
    } else if (values.subject.trim().length < 5) {
        errors.subject = 'Assunto deve ter pelo menos 5 caracteres';
    }

    // Mensagem obrigatória
    if (!values.message?.trim()) {
        errors.message = 'Mensagem é obrigatória';
    } else if (values.message.trim().length < 10) {
        errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    } else if (values.message.trim().length > 1000) {
        errors.message = 'Mensagem deve ter no máximo 1000 caracteres';
    }

    return errors;
};
