import { NextRequest, NextResponse } from 'next/server';

interface FeedbackData {
    type: 'bug' | 'suggestion' | 'compliment' | 'other';
    message: string;
    email?: string;
    page?: string;
    timestamp: string;
    userAgent?: string;
}

export async function POST(request: NextRequest) {
    try {
        const feedbackData: FeedbackData = await request.json();

        // Validar dados básicos
        if (!feedbackData.type || !feedbackData.message?.trim()) {
            return NextResponse.json(
                { error: 'Tipo e mensagem são obrigatórios' },
                { status: 400 }
            );
        }

        // Validar tamanho da mensagem
        if (feedbackData.message.length > 1000) {
            return NextResponse.json(
                { error: 'Mensagem muito longa (máximo 1000 caracteres)' },
                { status: 400 }
            );
        }

        // Log do feedback
        console.log('Novo feedback recebido:', {
            type: feedbackData.type,
            page: feedbackData.page,
            hasEmail: !!feedbackData.email,
            timestamp: feedbackData.timestamp
        });

        // Em produção, você salvaria no banco de dados
        await saveFeedbackToDB(feedbackData);

        // Notificar em tempo real (Slack, Discord, etc.)
        await notifyNewFeedback(feedbackData);

        // Simular processamento
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json({
            success: true,
            message: 'Feedback recebido com sucesso'
        });

    } catch (error) {
        console.error('Erro na API de feedback:', error);

        return NextResponse.json(
            {
                error: 'Erro interno do servidor',
                message: 'Não foi possível processar o feedback'
            },
            { status: 500 }
        );
    }
}

// Função para salvar feedback no banco (exemplo)
async function saveFeedbackToDB(feedback: FeedbackData) {
    // Implementar com seu ORM/banco preferido
    console.log('Saving feedback to database:', feedback.type);
    // const savedFeedback = await prisma.feedback.create({
    //   data: {
    //     type: feedback.type,
    //     message: feedback.message,
    //     email: feedback.email,
    //     page: feedback.page,
    //     userAgent: feedback.userAgent,
    //     createdAt: new Date(feedback.timestamp)
    //   }
    // });
    // return savedFeedback;
}

// Função para notificar novo feedback
async function notifyNewFeedback(feedback: FeedbackData) {
    // Implementar notificação (Slack, Discord, email, etc.)
    console.log('Notifying new feedback:', feedback.type);
    // const message = `
    //   🎯 Novo Feedback ${feedback.type.toUpperCase()}
    //   📄 Página: ${feedback.page || 'N/A'}
    //   💬 ${feedback.message}
    //   📧 ${feedback.email || 'Anônimo'}
    // `;
    // await sendSlackMessage(message);
}
