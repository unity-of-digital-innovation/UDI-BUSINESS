import nodemailer from 'nodemailer';
import { Contact } from '../shared/schema';

// Déclaration pour résoudre le problème de type
declare module 'nodemailer' {
  function getTestMessageUrl(info: any): string | false;
}

// Configuration du transporteur d'email
let transporter: nodemailer.Transporter;
let testAccount: any;

// Initialiser le transporteur d'email avec Ethereal (solution 100% gratuite pour tests et démos)
export const initializeEmailService = async () => {
  try {
    // Créer un compte de test sur Ethereal (pour le développement et la démonstration)
    testAccount = await nodemailer.createTestAccount();
    
    // Créer un transporteur réutilisable en utilisant SMTP d'Ethereal
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true pour 465, false pour les autres ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    
    console.log('✅ Service email initialisé avec Ethereal (gratuit)');
    console.log('📧 Utilisateur de test:', testAccount.user);
    console.log('🔗 URL pour voir les emails: https://ethereal.email/login');
    console.log('🔑 Identifiants:', testAccount.user, testAccount.pass);
    
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation du service email:', error);
    return false;
  }
};

// Envoyer un email
export const sendEmail = async (contact: Contact): Promise<{ success: boolean; previewUrl?: string; error?: string }> => {
  if (!transporter) {
    console.error('Le transporteur d\'email n\'est pas initialisé');
    return { 
      success: false,
      error: 'Service d\'email non initialisé'
    };
  }

  try {
    // Préparer le contenu de l'email
    const mailOptions = {
      from: '"UDI-BUSINESS" <contact@udi-business.com>',
      to: 'titovlucien@gmail.com',
      subject: `Nouveau message de ${contact.name}`,
      text: `
Nom: ${contact.name}
Email: ${contact.email}
Téléphone: ${contact.phone || 'Non fourni'}
Message:
${contact.message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
  <h2 style="color: #0080FF; margin-bottom: 20px;">Nouveau message de contact</h2>
  <p><strong>Nom:</strong> ${contact.name}</p>
  <p><strong>Email:</strong> ${contact.email}</p>
  <p><strong>Téléphone:</strong> ${contact.phone || 'Non fourni'}</p>
  <p><strong>Message:</strong></p>
  <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 10px;">
    ${contact.message.replace(/\n/g, '<br>')}
  </div>
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
    <p>Ce message a été envoyé depuis le formulaire de contact du site UDI-BUSINESS.</p>
  </div>
</div>
      `,
    };

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);

    console.log('📨 Email envoyé:', info.messageId);
    
    // URL pour prévisualiser l'email (unique à Ethereal)
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log('🔍 URL de prévisualisation:', previewUrl);
    }

    return { 
      success: true,
      previewUrl: previewUrl ? String(previewUrl) : undefined
    };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    return { 
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue lors de l\'envoi'
    };
  }
};