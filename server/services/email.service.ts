import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendReminderEmail(
  to: string,
  clientName: string,
  date: string,
  time: string
): Promise<boolean> {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .appointment-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Lembrete de Atendimento</h1>
          </div>
          <div class="content">
            <p>Olá <strong>${clientName}</strong>,</p>
            <p>Este é um lembrete amigável sobre seu atendimento agendado:</p>
            
            <div class="appointment-box">
              <p style="margin: 0; font-size: 18px;">
                📅 <strong>Data:</strong> ${date}<br>
                🕐 <strong>Horário:</strong> ${time}
              </p>
            </div>
            
            <p>Por favor, confirme sua presença ou entre em contato caso precise reagendar.</p>
            <p>Aguardamos você!</p>
            
            <div class="footer">
              <p>Este é um email automático. Por favor, não responda.</p>
              <p>NoShow Reducer - Transformando horários vazios em atendimentos confirmados</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: `🔔 Lembrete: Atendimento em ${date}`,
      html,
    });

    console.log(`✅ Email enviado para: ${to}`);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    return false;
  }
}

// Função para testar configuração de email
export async function testEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('✅ Configuração de email válida');
    return true;
  } catch (error) {
    console.error('❌ Erro na configuração de email:', error);
    return false;
  }
}
