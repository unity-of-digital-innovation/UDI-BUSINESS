import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import AnimatedPageHeader from "../components/AnimatedPageHeader";
import CTABubble from "../components/CTABubble";

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  quote?: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  skills: string[];
}

const Equipe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  // Données de l'équipe
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Thomas Durand",
      role: "CEO & Fondateur",
      bio: "Visionnaire technologique avec plus de 15 ans d'expérience dans le développement de solutions innovantes. Thomas a fondé UDI-BUSINESS avec la vision de transformer la façon dont les entreprises abordent leur transformation digitale.",
      quote:
        "L'innovation est le moteur du progrès. Notre mission est de rendre cette innovation accessible à tous.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      socialLinks: {
        linkedin: "https://linkedin.com/",
        twitter: "https://twitter.com/",
        email: "mailto:thomas@udi-business.com",
      },
      skills: [
        "Vision Stratégique",
        "Leadership",
        "IA & Big Data",
        "Gestion de l'Innovation",
      ],
    },
    {
      id: 2,
      name: "Sophia Chen",
      role: "CTO",
      bio: "Experte en intelligence artificielle et en architecture de systèmes complexes, Sophia dirige toutes les initiatives technologiques d'UDI-BUSINESS, en particulier notre service phare d'automatisation multiplateforme.",
      quote:
        "La technologie doit servir l'humain, pas l'inverse. C'est cette philosophie qui guide chacune de nos solutions.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3",
      socialLinks: {
        linkedin: "https://linkedin.com/",
        github: "https://github.com/",
        email: "mailto:sophia@udi-business.com",
      },
      skills: [
        "IA & Machine Learning",
        "Architecture Système",
        "Automatisation",
        "Développement Cloud",
      ],
    },
    {
      id: 3,
      name: "Marc Lefevre",
      role: "Directeur Commercial",
      bio: "Marc a rejoint UDI-BUSINESS après une carrière réussie dans les ventes B2B pour des entreprises technologiques. Il dirige aujourd'hui notre stratégie commerciale et veille à ce que nos solutions répondent parfaitement aux besoins de nos clients.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      socialLinks: {
        linkedin: "https://linkedin.com/",
        twitter: "https://twitter.com/",
        email: "mailto:marc@udi-business.com",
      },
      skills: [
        "Développement Commercial",
        "Gestion de la Relation Client",
        "Stratégie de Vente",
        "Négociation",
      ],
    },
    {
      id: 4,
      name: "Amina Diallo",
      role: "Responsable Automatisation",
      bio: "En tant que responsable de notre service phare d'automatisation, Amina supervise la conception et le déploiement de solutions d'automatisation sur mesure pour nos clients les plus exigeants. Sa vision unique a façonné notre approche multiplateforme.",
      quote:
        "L'automatisation intelligente est la clé pour libérer le potentiel humain dans chaque organisation.",
      image:
        "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3",
      socialLinks: {
        linkedin: "https://linkedin.com/",
        github: "https://github.com/",
        email: "mailto:amina@udi-business.com",
      },
      skills: [
        "Automatisation des Processus",
        "WhatsApp Business API",
        "LinkedIn Automation",
        "Chatbots IA",
      ],
    },
    {
      id: 5,
      name: "Paul Mercier",
      role: "Lead Developer",
      bio: "Paul est le cerveau technique derrière nos solutions de développement sur mesure. Avec une expertise approfondie en architectures modernes et en DevOps, il garantit que nos solutions sont robustes, évolutives et maintenables.",
      image:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      socialLinks: {
        linkedin: "https://linkedin.com/",
        github: "https://github.com/",
        email: "mailto:paul@udi-business.com",
      },
      skills: [
        "Développement Full-Stack",
        "Architecture Logicielle",
        "DevOps",
        "Cloud Native",
      ],
    },
    {
      id: 6,
      name: "Sarah Bouaziz",
      role: "Data Scientist",
      bio: "Sarah apporte son expertise en science des données et en apprentissage automatique pour transformer les données brutes en insights stratégiques et en fonctionnalités d'IA avancées, au cœur de nos services.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
      socialLinks: {
        linkedin: "https://linkedin.com/",
        github: "https://github.com/",
        twitter: "https://twitter.com/",
      },
      skills: [
        "Machine Learning",
        "NLP",
        "Analyse Prédictive",
        "Vision par Ordinateur",
      ],
    },
  ];

  // Animations avec GSAP
  useEffect(() => {
    // Animation de l'en-tête
    if (headerRef.current) {
      gsap.from(headerRef.current.querySelectorAll(".animate-item"), {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      });
    }

    // Animation des cartes d'équipe
    if (teamRef.current) {
      gsap.from(teamRef.current.querySelectorAll(".team-card"), {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 70%",
        },
      });
    }

    return () => {
      // Nettoyage des ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Variantes d'animation pour Framer Motion
  const cardVariants = {
    hover: {
      y: -15,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const backgroundImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ];

  return (
    <>
      <CTABubble interval={15000} />

      <div ref={containerRef} className="min-h-screen bg-gray-900 text-white">
        <AnimatedPageHeader
          title="Notre équipe"
          subtitle="Les experts derrière UDI-BUSINESS"
          backgroundImages={backgroundImages}
          highlightedWord="équipe"
          height="60vh"
          overlayColor="from-gray-900/90 via-gray-900/80 to-gray-900/95"
          textPosition="center"
          id="equipe-header"
        >
          <div ref={headerRef} className="max-w-3xl mx-auto text-center mt-8">
            <p className="animate-item text-lg text-gray-300 mb-6">
              Découvrez les talents passionnés qui font d'UDI-BUSINESS le leader
              de l'innovation digitale et de l'automatisation multiplateforme.
            </p>
            <div className="animate-item flex justify-center space-x-2">
              <span className="px-3 py-1 bg-[#0080FF]/20 rounded-full text-[#0080FF] text-sm">
                Innovation
              </span>
              <span className="px-3 py-1 bg-[#FFC000]/20 rounded-full text-[#FFC000] text-sm">
                Expertise
              </span>
              <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-400 text-sm">
                Passion
              </span>
            </div>
          </div>
        </AnimatedPageHeader>

        {/* Section principale de l'équipe */}
        <div className="container mx-auto px-4 py-16">
          {/* Vision de l'équipe */}
          <div className="mb-20 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-gradient">
              Notre vision collective
            </h2>
            <div className="relative py-8 px-6 bg-gray-800/50 rounded-xl border border-gray-700/50 shadow-xl">
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="absolute top-4 left-4 text-[#0080FF]/30 text-4xl"
              />
              <p className="text-xl text-gray-300 italic">
                Notre équipe est guidée par une vision commune : façonner
                l'avenir digital des entreprises à travers des solutions
                innovantes, évolutives et centrées sur l'humain. Nous croyons
                que la technologie doit être un facilitateur, jamais une
                barrière.
              </p>
              <FontAwesomeIcon
                icon={faQuoteRight}
                className="absolute bottom-4 right-4 text-[#FFC000]/30 text-4xl"
              />
            </div>
          </div>

          {/* Cartes des membres de l'équipe */}
          <div
            ref={teamRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="team-card rounded-xl overflow-hidden bg-gray-800/60 border border-gray-700/50 shadow-lg transition-all duration-300"
                whileHover="hover"
                variants={cardVariants}
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-2xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-[#FFC000]">{member.role}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-300 mb-6">{member.bio}</p>

                  {member.quote && (
                    <div className="mb-6 p-4 rounded-lg bg-gray-700/30 border-l-4 border-[#0080FF] italic">
                      <p className="text-gray-300">"{member.quote}"</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                      Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4 border-t border-gray-700/50">
                    {member.socialLinks.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#0A66C2] transition-colors"
                      >
                        <FontAwesomeIcon icon={faLinkedin} size="lg" />
                      </a>
                    )}
                    {member.socialLinks.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                      >
                        <FontAwesomeIcon icon={faTwitter} size="lg" />
                      </a>
                    )}
                    {member.socialLinks.email && (
                      <a
                        href={member.socialLinks.email}
                        className="text-gray-400 hover:text-[#FFC000] transition-colors"
                      >
                        <FontAwesomeIcon icon={faEnvelope} size="lg" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bandeau rejoignez-nous */}
          <div className="mt-24 py-16 px-8 rounded-2xl bg-gradient-to-r from-[#0080FF]/20 to-[#FFC000]/20 border border-gray-700/30 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">
                Rejoignez notre équipe!
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Vous êtes passionné(e) par l'innovation et souhaitez contribuer
                à la transformation digitale des entreprises? UDI-BUSINESS
                recherche constamment de nouveaux talents.
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#0080FF] to-[#0080FF]/80 text-white font-semibold hover:shadow-lg hover:shadow-[#0080FF]/20 transition duration-300 transform hover:scale-105"
              >
                Voir nos opportunités
              </a>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-[#0080FF]/20 blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-10 w-40 h-40 rounded-full bg-[#FFC000]/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Equipe;
