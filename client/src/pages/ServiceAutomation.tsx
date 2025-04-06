import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faRobot, faChartLine, faFileAlt, faHandshake, faLightbulb, faCloudUploadAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceAutomation = () => {
  useScrollAnimation();
  
  useEffect(() => {
    // Animation for the header
    gsap.fromTo(
      '#service-header h1',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '#service-header',
          start: 'top 80%',
        },
      }
    );
    
    gsap.fromTo(
      '#service-header p',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: '#service-header',
          start: 'top 80%',
        },
      }
    );
    
    // Animation for features
    gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        id="service-header" 
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0080FF]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFC000]/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Automatisation des <span className="text-gradient">Processus d'Entreprise</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Optimisez votre efficacité opérationnelle et réduisez les coûts grâce à nos solutions d'automatisation. Nous transformons vos processus manuels en flux de travail automatisés pour libérer le potentiel de votre entreprise.
            </p>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Avantages de l'Automatisation</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Découvrez comment l'automatisation des processus peut transformer votre entreprise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="feature-card bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <div className="w-16 h-16 rounded-full bg-[#0080FF]/20 flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Productivité Accrue</h3>
              <p className="text-gray-400">
                Réduction de 40% à 75% du temps consacré aux tâches administratives répétitives.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <div className="w-16 h-16 rounded-full bg-[#FFC000]/20 flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faTasks} className="text-2xl text-[#FFC000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Réduction des Erreurs</h3>
              <p className="text-gray-400">
                Diminution significative des erreurs humaines et amélioration de la qualité des données.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <div className="w-16 h-16 rounded-full bg-[#0080FF]/20 flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faLightbulb} className="text-2xl text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation Facilitée</h3>
              <p className="text-gray-400">
                Plus de temps pour le personnel de se concentrer sur des tâches à valeur ajoutée et l'innovation.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <div className="w-16 h-16 rounded-full bg-[#FFC000]/20 flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faHandshake} className="text-2xl text-[#FFC000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">ROI Rapide</h3>
              <p className="text-gray-400">
                Retour sur investissement en moins de 12 mois pour la majorité des projets d'automatisation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-12 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Solutions d'Automatisation</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Des solutions sur mesure pour automatiser vos processus métiers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-r from-[#0080FF] to-[#0080FF]/70 h-3"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={faRobot} className="text-2xl text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold mb-4">RPA</h3>
                <p className="text-gray-400 mb-6">
                  Automatisation Robotisée des Processus pour remplacer les tâches manuelles répétitives par des robots logiciels.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Automatisation du traitement des documents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Extraction et saisie de données</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Réconciliation de données entre systèmes</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="feature-card bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-r from-[#FFC000] to-[#FFC000]/70 h-3"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-[#FFC000]/10 flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={faFileAlt} className="text-2xl text-[#FFC000]" />
                </div>
                <h3 className="text-xl font-bold mb-4">BPM & Workflows</h3>
                <p className="text-gray-400 mb-6">
                  Gestion et optimisation des processus métier pour améliorer l'efficacité opérationnelle.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#0080FF] mr-2">•</span>
                    <span>Modélisation et optimisation des processus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0080FF] mr-2">•</span>
                    <span>Automatisation des flux de travail</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0080FF] mr-2">•</span>
                    <span>Suivi et reporting des KPIs</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="feature-card bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-r from-[#0080FF] to-[#0080FF]/70 h-3"></div>
              <div className="p-8">
                <div className="w-14 h-14 rounded-lg bg-[#0080FF]/10 flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="text-2xl text-[#0080FF]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Intégration Système</h3>
                <p className="text-gray-400 mb-6">
                  Connectez vos applications et systèmes pour un flux de données transparent et efficace.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Développement d'APIs et de middleware</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Intégration ERP, CRM et autres systèmes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Migration et synchronisation de données</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Domaines d'Application</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              L'automatisation peut être appliquée à de nombreux départements et processus de l'entreprise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-[#0080FF]/20 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faCogs} className="text-[#0080FF]" />
                </span>
                Finance & Comptabilité
              </h3>
              <ul className="space-y-3 text-gray-300 ml-12">
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Traitement automatisé des factures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Réconciliation bancaire</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Reporting financier</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Gestion des notes de frais</span>
                </li>
              </ul>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-[#FFC000]/20 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faHandshake} className="text-[#FFC000]" />
                </span>
                Ressources Humaines
              </h3>
              <ul className="space-y-3 text-gray-300 ml-12">
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Onboarding des nouveaux employés</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Gestion des congés et absences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Traitement de la paie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Analyse des CV et présélection</span>
                </li>
              </ul>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-[#0080FF]/20 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faFileAlt} className="text-[#0080FF]" />
                </span>
                Service Client
              </h3>
              <ul className="space-y-3 text-gray-300 ml-12">
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Chatbots et assistants virtuels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Traitement automatisé des demandes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Gestion des tickets et escalades</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFC000] mr-2">•</span>
                  <span>Analyse des sentiments clients</span>
                </li>
              </ul>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-[#FFC000]/20 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faTasks} className="text-[#FFC000]" />
                </span>
                Achats & Supply Chain
              </h3>
              <ul className="space-y-3 text-gray-300 ml-12">
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Gestion automatisée des commandes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Suivi des livraisons</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Gestion des stocks et inventaires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0080FF] mr-2">•</span>
                  <span>Prévision de la demande</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technologies Section */}
      <section className="py-12 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Partenaires Technologiques</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Nous travaillons avec les meilleurs outils et plateformes d'automatisation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-12">
            {[
              'UiPath', 'Automation Anywhere', 'BluePrism', 'Microsoft Power Automate',
              'Zapier', 'IFTTT', 'Nintex', 'Pega', 'Appian', 'Camunda',
              'MuleSoft', 'IBM RPA', 'WorkFusion'
            ].map((tech, index) => (
              <div 
                key={index}
                className="feature-card bg-gray-700 rounded-xl p-6 flex items-center justify-center text-center hover:bg-gray-650 transition-all duration-300"
              >
                <span className="font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Methodology Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Méthodologie</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Une approche structurée pour garantir le succès de vos projets d'automatisation.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0080FF] to-[#FFC000] transform -translate-x-1/2"></div>
            
            {[
              {
                title: "Évaluation et Découverte",
                description: "Identification des processus à fort potentiel d'automatisation et analyse ROI.",
                icon: faLightbulb
              },
              {
                title: "Conception et Planification",
                description: "Conception détaillée de la solution et planification de la mise en œuvre.",
                icon: faTasks
              },
              {
                title: "Développement et Test",
                description: "Développement de la solution d'automatisation et tests rigoureux.",
                icon: faCogs
              },
              {
                title: "Déploiement et Formation",
                description: "Mise en production et formation des utilisateurs finaux.",
                icon: faCloudUploadAlt
              },
              {
                title: "Support et Optimisation",
                description: "Support continu et amélioration itérative des processus automatisés.",
                icon: faChartLine
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="md:w-1/2 p-4">
                  <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 md:mr-8 md:ml-0">
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center z-10 border-4 border-gray-700">
                    <FontAwesomeIcon icon={step.icon} className="text-2xl text-[#FFC000]" />
                  </div>
                </div>
                
                <div className="md:w-1/2 p-4 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#0080FF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FFC000]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à automatiser vos processus ?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Contactez-nous dès aujourd'hui pour une évaluation gratuite de votre potentiel d'automatisation et un calcul de ROI personnalisé.
            </p>
            <a 
              href="/#contact" 
              className="inline-flex items-center bg-gradient-to-r from-[#0080FF] to-[#FFC000] px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Demander une évaluation gratuite
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServiceAutomation;