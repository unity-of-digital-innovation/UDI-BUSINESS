import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faTelegram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faSms, faRobot, faReply, faUser } from '@fortawesome/free-solid-svg-icons';

// Type pour les plateformes supportées
type Platform = 'whatsapp' | 'email' | 'messenger' | 'telegram' | 'sms' | 'linkedin';

// Interface pour la configuration d'une plateforme
interface PlatformConfig {
  name: string;
  icon: any;
  color: string;
  bgColor: string;
  messages: string[];
  responses: string[];
}

// Configuration pour chaque plateforme
const platformConfigs: Record<Platform, PlatformConfig> = {
  whatsapp: {
    name: 'WhatsApp',
    icon: faWhatsapp,
    color: '#25D366',
    bgColor: '#25D366',
    messages: [
      "Bonjour, je souhaite obtenir des informations sur vos services d'automatisation.",
      "Quels sont vos tarifs ?",
      "Est-ce que vous proposez un essai gratuit ?"
    ],
    responses: [
      "Bonjour ! Merci de contacter UDI-BUSINESS. Je suis votre assistant virtuel et je serais ravi de vous aider concernant nos services d'automatisation.",
      "Nos forfaits d'automatisation commencent à 3000€/mois. Je peux vous envoyer notre brochure détaillée par email si vous le souhaitez.",
      "Oui, nous proposons une démo gratuite de 14 jours. Souhaitez-vous que je vous mette en relation avec un de nos experts pour configurer votre essai ?"
    ]
  },
  email: {
    name: 'Email',
    icon: faEnvelope,
    color: '#EA4335',
    bgColor: '#EA4335',
    messages: [
      "Objet: Demande d'information - Automatisation des processus",
      "Bonjour,\nNous cherchons à optimiser notre processus de gestion des commandes. Pouvez-vous nous présenter vos solutions ?\nCordialement,\nMarc Dupont",
      "Pouvez-vous me donner plus de détails sur vos références ?"
    ],
    responses: [
      "Objet: Re: Demande d'information - Automatisation des processus\n\nBonjour Marc,\n\nMerci pour votre intérêt pour nos solutions d'automatisation. Nous serions ravis de vous présenter comment nous pouvons optimiser votre gestion des commandes.",
      "Nos solutions permettent d'automatiser entièrement le cycle de traitement des commandes, de la réception à la facturation, réduisant ainsi les délais de 70% en moyenne.",
      "Bien sûr ! Nous avons travaillé avec plus de 50 entreprises dans votre secteur. Notre client FutureTech a constaté une amélioration de 85% dans le temps de traitement des commandes. Je vous joins notre portfolio complet."
    ]
  },
  messenger: {
    name: 'Messenger',
    icon: faFacebook,
    color: '#0084FF',
    bgColor: '#0084FF',
    messages: [
      "Salut ! J'ai entendu parler de vos services d'IA pour le service client 👋",
      "Est-ce que ça fonctionne pour une petite entreprise comme la mienne ?",
      "Super ! Comment on commence ? 😊"
    ],
    responses: [
      "Bonjour ! Ravi de vous accueillir sur la page de UDI-BUSINESS 👋 Je suis votre assistant virtuel, comment puis-je vous aider aujourd'hui ?",
      "Absolument ! Nos solutions sont parfaitement adaptées aux PME. Nous offrons des forfaits flexibles qui évoluent avec votre entreprise. Quel est votre secteur d'activité ?",
      "C'est très simple ! Nous pouvons commencer par un appel de 30 minutes pour évaluer vos besoins. Ensuite, notre équipe technique configurera votre solution en moins de 48h. Souhaitez-vous planifier cet appel maintenant ?"
    ]
  },
  telegram: {
    name: 'Telegram',
    icon: faTelegram,
    color: '#0088CC',
    bgColor: '#0088CC',
    messages: [
      "Bonjour, j'aimerais savoir si votre solution peut s'intégrer à notre ERP actuel",
      "Nous utilisons SAP Business One",
      "Parfait, pouvons-nous organiser une démo cette semaine ?"
    ],
    responses: [
      "Bonjour ! Bienvenue chez UDI-BUSINESS. Je suis là pour répondre à toutes vos questions sur nos solutions d'intégration.",
      "Excellente nouvelle ! Nous avons une intégration native avec SAP Business One. Notre connecteur permet une synchronisation bidirectionnelle en temps réel, sans aucune perte de données.",
      "Bien sûr ! Je viens de vérifier nos disponibilités. Nous pouvons organiser une démo personnalisée ce jeudi à 14h ou vendredi à 10h. Quelle option vous conviendrait le mieux ?"
    ]
  },
  sms: {
    name: 'SMS',
    icon: faSms,
    color: '#8E8E93',
    bgColor: '#8E8E93',
    messages: [
      "INFO: Comment automatiser les rappels de RDV clients?",
      "Combien ça coûte par mois pour 500 SMS?",
      "OK pour essai. Infos par email svp à info@monentreprise.com"
    ],
    responses: [
      "UDI-BUSINESS: Notre solution SMS automatise vos rappels de RDV avec confirmation client et remplissage auto de votre agenda. Réponse 1 pour plus d'infos.",
      "Pour 500 SMS/mois: 99€ tout compris, intégration avec votre CRM incluse. Essai gratuit de 30 jours disponible. Répondez 2 pour démarrer.",
      "Parfait! Email avec toutes les infos envoyé. Un conseiller vous contactera sous 24h pour configurer votre essai gratuit. Merci de votre confiance!"
    ]
  },
  linkedin: {
    name: 'LinkedIn',
    icon: faLinkedin,
    color: '#0A66C2',
    bgColor: '#0A66C2',
    messages: [
      "Bonjour, j'ai vu votre publication sur l'automatisation des processus RH. Très intéressant !",
      "Notre entreprise cherche justement à réduire le temps consacré au recrutement. Est-ce que votre solution pourrait nous aider ?",
      "Excellent ! Je serais disponible pour un appel mardi ou mercredi prochain."
    ],
    responses: [
      "Bonjour et merci pour votre message ! Ravi que notre publication sur l'automatisation RH ait retenu votre attention.",
      "Absolument ! Notre solution d'automatisation RH permet de réduire de 60% le temps consacré au recrutement. Elle automatise le tri des CV, planifie les entretiens et envoie des communications personnalisées aux candidats. Souhaiteriez-vous en savoir plus ?",
      "Parfait ! Je viens de vous envoyer une invitation pour un appel mardi à 14h. Vous recevrez également un email avec une présentation de notre solution RH. Au plaisir d'échanger avec vous !"
    ]
  }
};

interface AutomationPlatformsDemoProps {
  initialPlatform?: Platform;
  autoRotate?: boolean;
  interval?: number;
  onlyShowMessage?: boolean;
  height?: string;
  width?: string;
  className?: string;
}

const AutomationPlatformsDemo: React.FC<AutomationPlatformsDemoProps> = ({
  initialPlatform = 'whatsapp',
  autoRotate = true,
  interval = 5000,
  onlyShowMessage = false,
  height = 'h-[400px]',
  width = 'w-full max-w-md',
  className = '',
}) => {
  const [currentPlatform, setCurrentPlatform] = useState<Platform>(initialPlatform);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [typing, setTyping] = useState(false);
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Fonction pour changer de plateforme
  const changePlatform = (platform: Platform) => {
    setCurrentPlatform(platform);
    setCurrentMessageIndex(0);
    setShowResponse(false);
    setTyping(false);
  };

  // Effet pour la rotation automatique des plateformes
  useEffect(() => {
    if (autoRotate) {
      rotationIntervalRef.current = setInterval(() => {
        const platforms = Object.keys(platformConfigs) as Platform[];
        const currentIndex = platforms.indexOf(currentPlatform);
        const nextIndex = (currentIndex + 1) % platforms.length;
        changePlatform(platforms[nextIndex]);
      }, interval * 3); // Change platform every 3 message cycles
    }

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, [autoRotate, currentPlatform, interval]);

  // Effet pour l'affichage des messages et réponses
  useEffect(() => {
    const config = platformConfigs[currentPlatform];
    
    // Reset any existing interval
    if (messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current);
    }
    
    // Start a new message cycle
    messageIntervalRef.current = setInterval(() => {
      if (!showResponse) {
        // After showing message, show typing indicator then response
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setShowResponse(true);
        }, 1500); // Typing animation duration
      } else {
        // After showing response, move to next message or reset
        setShowResponse(false);
        setCurrentMessageIndex((prev) => 
          prev < config.messages.length - 1 ? prev + 1 : 0
        );
      }
    }, interval);

    return () => {
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
      }
    };
  }, [currentPlatform, currentMessageIndex, showResponse, interval]);

  const config = platformConfigs[currentPlatform];

  return (
    <div className={`${width} ${className}`}>
      {!onlyShowMessage && (
        <div className="flex space-x-2 mb-4 justify-center">
          {Object.entries(platformConfigs).map(([key, platform]) => (
            <button
              key={key}
              onClick={() => changePlatform(key as Platform)}
              className={`p-2 rounded-full transition-all transform hover:scale-110 ${
                currentPlatform === key 
                  ? 'bg-gray-700 shadow-lg scale-110' 
                  : 'bg-gray-800 opacity-60 hover:opacity-100'
              }`}
            >
              <FontAwesomeIcon 
                icon={platform.icon} 
                className={`text-lg`}
                color={platform.color}
              />
            </button>
          ))}
        </div>
      )}
      
      <div 
        className={`${height} rounded-xl overflow-hidden bg-gray-800 shadow-xl border border-gray-700 relative`}
        style={{ perspective: '1000px' }}
      >
        {/* Platform header */}
        <div 
          className="p-3 flex items-center"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2`} style={{ backgroundColor: config.color }}>
            <FontAwesomeIcon icon={config.icon} className="text-white" />
          </div>
          <div className="font-medium">{config.name} Automatisation</div>
        </div>
        
        {/* Messages container */}
        <div className="p-4 h-[calc(100%-60px)] overflow-y-auto flex flex-col">
          <AnimatePresence mode="wait">
            {/* User message */}
            <motion.div 
              key={`msg-${currentPlatform}-${currentMessageIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex justify-end mb-4"
            >
              <div className="flex items-end">
                <div className="bg-gray-700 p-3 rounded-lg rounded-br-none max-w-[80%] text-sm">
                  <div className="whitespace-pre-line">{config.messages[currentMessageIndex]}</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-600 ml-2 flex-shrink-0 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-white text-xs" />
                </div>
              </div>
            </motion.div>
            
            {/* Typing indicator */}
            {typing && (
              <motion.div 
                key={`typing-${currentPlatform}-${currentMessageIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex mb-4"
              >
                <div className="flex items-end">
                  <div className={`w-6 h-6 rounded-full mr-2 flex-shrink-0 flex items-center justify-center`} 
                    style={{ backgroundColor: config.color }}>
                    <FontAwesomeIcon icon={faRobot} className="text-white text-xs" />
                  </div>
                  <div className={`p-3 rounded-lg rounded-bl-none`} style={{ backgroundColor: `${config.color}30` }}>
                    <div className="flex space-x-1">
                      <span className="typing-dot animate-bounce delay-0"></span>
                      <span className="typing-dot animate-bounce delay-150"></span>
                      <span className="typing-dot animate-bounce delay-300"></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Bot response */}
            {showResponse && (
              <motion.div 
                key={`response-${currentPlatform}-${currentMessageIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex mb-4"
              >
                <div className="flex items-end">
                  <div className={`w-6 h-6 rounded-full mr-2 flex-shrink-0 flex items-center justify-center`} 
                    style={{ backgroundColor: config.color }}>
                    <FontAwesomeIcon icon={faRobot} className="text-white text-xs" />
                  </div>
                  <div className={`p-3 rounded-lg rounded-bl-none max-w-[80%] text-sm`} 
                    style={{ backgroundColor: `${config.color}30` }}>
                    <div className="whitespace-pre-line">{config.responses[currentMessageIndex]}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer with quick reply */}
        <div className="absolute bottom-0 w-full bg-gray-900/90 p-2 border-t border-gray-700">
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="Envoyez un message..." 
              className="bg-gray-800 rounded-full text-sm px-4 py-2 flex-grow mr-2 focus:outline-none"
              disabled
            />
            <button 
              className={`p-2 rounded-full`} 
              style={{ backgroundColor: config.color }}
            >
              <FontAwesomeIcon icon={faReply} className="text-white" />
            </button>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .typing-dot {
          width: 0.5rem;
          height: 0.5rem;
          background-color: white;
          border-radius: 9999px;
          display: inline-block;
        }
        .delay-0 {
          animation-delay: 0ms;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
      `}} />
    </div>
  );
};

export default AutomationPlatformsDemo;