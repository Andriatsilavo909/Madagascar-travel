import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendStatusEmail(to: string, name: string, status: 'confirme' | 'refuse') {
  const subject = status === 'confirme' 
    ? '✅ Votre demande de voyage a été acceptée' 
    : '❌ Votre demande de voyage a été refusée';
    
  const message = status === 'confirme'
    ? `Bonjour ${name},<br/><br/>Nous sommes heureux de vous informer que votre demande de voyage à Madagascar a été acceptée. Notre équipe vous contactera très prochainement pour organiser votre séjour.<br/><br/>Cordialement,<br/>L’équipe Madagascar Travel.`
    : `Bonjour ${name},<br/><br/>Nous sommes au regret de vous informer que votre demande de voyage à Madagascar n'a pas pu être acceptée pour le moment. N'hésitez pas à nous contacter pour plus d'informations.<br/><br/>Cordialement,<br/>L’équipe Madagascar Travel.`;

  try {
    await resend.emails.send({
      from: 'Madagascar Travel <onboarding@resend.dev>', // À remplacer par votre domaine vérifié plus tard
      to: [to],
      subject,
      html: message,
    });
  } catch (error) {
    console.error("Erreur envoi email :", error);
  }
}