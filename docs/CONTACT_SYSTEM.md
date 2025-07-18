# 📧 Sistema de Contato - Formulário Funcional

Este módulo implementa um sistema completo de contato com formulário funcional, validação em tempo real, feedback do usuário e integração com APIs.

## 🎯 Funcionalidades Implementadas

### ✅ Formulário Principal (`ContactForm`)
- **Validação em tempo real** com feedback visual
- **Campos completos**: nome, email, telefone, empresa, tipo de projeto, orçamento, prazo, assunto, mensagem
- **Seletores dinâmicos** para tipo de projeto, orçamento e prazo
- **Estados visuais** para loading, sucesso e erro
- **Acessibilidade** completa (ARIA labels, focus management)
- **Responsive design** para todos os dispositivos
- **Contador de caracteres** para mensagem (limite 1000)
- **Auto-save** e persistência de dados durante digitação

### ✅ Sistema de Feedback (`FeedbackForm`)
- **Botão flutuante** disponível em todas as páginas
- **Categorização** de feedback (bug, sugestão, elogio, outros)
- **Modal responsivo** com animações
- **Email opcional** para resposta
- **Captura automática** da página atual
- **Design não-intrusivo** mas sempre acessível

### ✅ Validação Robusta
- **Validação client-side** em tempo real
- **Validação server-side** nas APIs
- **Sanitização** de dados de entrada
- **Rate limiting** para evitar spam
- **Proteção** contra ataques maliciosos

### ✅ APIs Backend (`/api/contact` e `/api/feedback`)
- **Endpoints RESTful** seguindo padrões Next.js 13+
- **Logging estruturado** para auditoria
- **Error handling** robusto
- **Preparado para integração** com serviços externos

## 🔧 Configuração e Personalização

### 1. Configuração de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Email Service Configuration
NEXT_PUBLIC_EMAIL_API_ENDPOINT=https://api.seudominio.com/contact
NEXT_PUBLIC_EMAIL_API_KEY=sua_chave_api_aqui
NEXT_PUBLIC_EMAIL_TEMPLATE_ID=template_id_do_email
NEXT_PUBLIC_FROM_EMAIL=noreply@seudominio.com
NEXT_PUBLIC_FROM_NAME=Seu Nome

# Opcional: Integrações externas
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
NODEMAILER_SMTP_HOST=smtp.gmail.com
NODEMAILER_SMTP_USER=seu@email.com
NODEMAILER_SMTP_PASS=sua_senha_app
```

### 2. Integração com Serviços de Email

#### SendGrid
```typescript
// services/sendgrid.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendContactEmail = async (submission: ContactFormSubmission) => {
  const msg = {
    to: 'seu@email.com',
    from: process.env.NEXT_PUBLIC_FROM_EMAIL!,
    subject: `Nova mensagem de ${submission.name}`,
    html: generateEmailTemplate(submission)
  };
  
  await sgMail.send(msg);
};
```

#### Nodemailer
```typescript
// services/nodemailer.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.NODEMAILER_SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_SMTP_USER,
    pass: process.env.NODEMAILER_SMTP_PASS
  }
});

export const sendContactEmail = async (submission: ContactFormSubmission) => {
  await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_FROM_EMAIL,
    to: 'seu@email.com',
    subject: `Nova mensagem de ${submission.name}`,
    html: generateEmailTemplate(submission)
  });
};
```

### 3. Integração com Banco de Dados

#### Prisma (PostgreSQL/MySQL)
```typescript
// prisma/schema.prisma
model Contact {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String?
  company     String?
  subject     String
  message     String
  projectType String?
  budget      String?
  timeline    String?
  source      String?
  newsletter  Boolean  @default(false)
  status      String   @default("pending")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("contacts")
}

model Feedback {
  id        String   @id @default(cuid())
  type      String
  message   String
  email     String?
  page      String?
  userAgent String?
  createdAt DateTime @default(now())
  
  @@map("feedbacks")
}
```

#### MongoDB com Mongoose
```typescript
// models/Contact.ts
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  projectType: String,
  budget: String,
  timeline: String,
  source: String,
  newsletter: { type: Boolean, default: false },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
```

### 4. Notificações em Tempo Real

#### Slack Integration
```typescript
// services/slack.ts
export const notifyNewContact = async (submission: ContactFormSubmission) => {
  const message = {
    text: `🎯 Nova mensagem de contato!`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Nova mensagem de contato!*\n\n*Nome:* ${submission.name}\n*Email:* ${submission.email}\n*Assunto:* ${submission.subject}\n*Projeto:* ${submission.projectType || 'N/A'}\n*Orçamento:* ${submission.budget || 'N/A'}`
        }
      }
    ]
  };

  await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
};
```

#### Discord Webhook
```typescript
// services/discord.ts
export const notifyDiscord = async (submission: ContactFormSubmission) => {
  const embed = {
    title: "💌 Nova Mensagem de Contato",
    color: 0x0099ff,
    fields: [
      { name: "Nome", value: submission.name, inline: true },
      { name: "Email", value: submission.email, inline: true },
      { name: "Assunto", value: submission.subject },
      { name: "Mensagem", value: submission.message.substring(0, 200) + "..." }
    ],
    timestamp: new Date().toISOString()
  };

  await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] })
  });
};
```

## 🎨 Personalização Visual

### 1. Cores e Tema
```css
/* Personalize as cores no tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        }
      }
    }
  }
}
```

### 2. Animações Customizadas
```css
/* globals.css */
@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-in-up {
  animation: slideInUp 0.3s ease-out;
}
```

### 3. Layouts Alternativos
```tsx
// Versão lateral
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  <div>
    <ContactInfo />
  </div>
  <div>
    <ContactForm />
  </div>
</div>

// Versão step-by-step
<ContactFormWizard 
  steps={['info', 'project', 'message']}
  onComplete={handleSubmit}
/>
```

## 📊 Analytics e Monitoramento

### 1. Google Analytics
```typescript
// utils/analytics.ts
export const trackContactFormSubmission = (data: ContactForm) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact_form_submit', {
      event_category: 'engagement',
      event_label: data.projectType,
      value: 1
    });
  }
};
```

### 2. Métricas Customizadas
```typescript
// hooks/useContactAnalytics.ts
export const useContactAnalytics = () => {
  const trackFieldFocus = (fieldName: string) => {
    // Track field focus events
  };

  const trackFormAbandonment = (completionPercentage: number) => {
    // Track form abandonment
  };

  const trackConversionFunnel = (step: string) => {
    // Track conversion funnel
  };

  return { trackFieldFocus, trackFormAbandonment, trackConversionFunnel };
};
```

## 🔒 Segurança e Validação

### 1. Rate Limiting
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter } from './lib/rate-limiter';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/contact')) {
    const isAllowed = await rateLimiter.check(request.ip);
    
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }
  }
}
```

### 2. Sanitização de Dados
```typescript
// utils/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input.trim());
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
```

## 🚀 Deploy e Produção

### 1. Variáveis de Ambiente
```bash
# Vercel
vercel env add SENDGRID_API_KEY
vercel env add SLACK_WEBHOOK_URL

# Netlify
netlify env:set SENDGRID_API_KEY sua_chave

# Railway
railway variables set SENDGRID_API_KEY=sua_chave
```

### 2. Monitoramento
```typescript
// lib/monitoring.ts
import * as Sentry from '@sentry/nextjs';

export const logContactSubmission = (submission: ContactFormSubmission) => {
  Sentry.addBreadcrumb({
    message: 'Contact form submitted',
    category: 'contact',
    level: 'info',
    data: {
      submissionId: submission.id,
      projectType: submission.projectType
    }
  });
};
```

## 📱 Mobile e PWA

### 1. Campos Otimizados
```tsx
<input
  type="email"
  inputMode="email"
  autoComplete="email"
  autoCapitalize="none"
  spellCheck="false"
/>

<input
  type="tel"
  inputMode="tel"
  autoComplete="tel"
  pattern="[0-9\s\-\(\)\+]*"
/>
```

### 2. Gestos Touch
```tsx
// Suporte a swipe para fechar modal
const { ref } = useSwipeable({
  onSwipedDown: () => setIsOpen(false),
  preventDefaultTouchmoveEvent: true,
  trackTouch: true
});
```

## 🧪 Testes

### 1. Testes de Componente
```typescript
// __tests__/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../ContactForm';

describe('ContactForm', () => {
  it('validates required fields', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByText('Enviar Mensagem');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    });
  });
});
```

### 2. Testes de API
```typescript
// __tests__/api/contact.test.ts
import { POST } from '../../app/api/contact/route';

describe('/api/contact', () => {
  it('processes valid contact form', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        submission: {
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message'
        }
      })
    });

    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
```

## 📈 Próximas Melhorias

- [ ] **Auto-complete inteligente** com base em contatos anteriores
- [ ] **Upload de arquivos** para projetos complexos
- [ ] **Agendamento integrado** com Calendly/Google Calendar
- [ ] **Chat em tempo real** com WebSocket
- [ ] **Multi-idioma** com internacionalização
- [ ] **A/B testing** para otimização de conversão
- [ ] **CRM integration** (HubSpot, Pipedrive, etc.)
- [ ] **Assinatura digital** para contratos
- [ ] **Video calls** integradas
- [ ] **Pagamentos** via Stripe para consultorias

---

## 🎉 Resultado Final

✅ **Formulário de contato completamente funcional**
✅ **Sistema de feedback não-intrusivo**
✅ **APIs robustas e escaláveis**
✅ **Validação completa client/server-side**
✅ **Design responsivo e acessível**
✅ **Preparado para produção**

O sistema está pronto para receber contatos reais e pode ser facilmente integrado com qualquer serviço de email ou CRM de sua escolha!
