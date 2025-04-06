import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faChartPie, faRobot, faSearchDollar, faComments, faChartLine, faNetworkWired, faDatabase } from '@fortawesome/free-solid-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceAIBigData = () => {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Intelligence Artificielle & <span className="text-gradient">Big Data</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transformez vos données en insights stratégiques grâce à nos solutions d'Intelligence Artificielle et de Big Data. Nous vous aidons à exploiter la puissance de vos données pour prendre des décisions éclairées et créer un avantage concurrentiel.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Solutions IA & Big Data</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Explorez nos services d'Intelligence Artificielle et de Big Data pour transformer vos données en valeur ajoutée.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#0080FF]/40">
              <div className="w-14 h-14 rounded-lg bg-[#0080FF]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faBrain} className="text-2xl text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Machine Learning</h3>
              <p className="text-gray-400">
                Développement d'algorithmes de machine learning adaptés à vos besoins spécifiques pour la prédiction, la classification et la recommandation.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#FFC000]/40">
              <div className="w-14 h-14 rounded-lg bg-[#FFC000]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faChartPie} className="text-2xl text-[#FFC000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Analyse Prédictive</h3>
              <p className="text-gray-400">
                Anticipez les tendances futures et identifiez les opportunités grâce à des modèles statistiques avancés et des algorithmes prédictifs.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#0080FF]/40">
              <div className="w-14 h-14 rounded-lg bg-[#0080FF]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faRobot} className="text-2xl text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Intelligence Artificielle</h3>
              <p className="text-gray-400">
                Intégration de systèmes d'IA dans vos produits et services pour automatiser des tâches complexes et améliorer l'expérience utilisateur.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#FFC000]/40">
              <div className="w-14 h-14 rounded-lg bg-[#FFC000]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faSearchDollar} className="text-2xl text-[#FFC000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Data Mining</h3>
              <p className="text-gray-400">
                Extraction de connaissances précieuses à partir de grands volumes de données pour découvrir des patterns cachés et des insights stratégiques.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#0080FF]/40">
              <div className="w-14 h-14 rounded-lg bg-[#0080FF]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faComments} className="text-2xl text-[#0080FF]" />
              </div>
              <h3 className="text-xl font-bold mb-3">NLP & Chatbots</h3>
              <p className="text-gray-400">
                Développement de solutions de traitement du langage naturel et de chatbots intelligents pour améliorer l'engagement client.
              </p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-[#FFC000]/40">
              <div className="w-14 h-14 rounded-lg bg-[#FFC000]/20 flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-[#FFC000]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Business Intelligence</h3>
              <p className="text-gray-400">
                Création de tableaux de bord interactifs et d'outils de visualisation pour transformer les données en insights actionnables.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-12 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cas d'Usage par Secteur</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Découvrez comment l'IA et le Big Data transforment différents secteurs d'activité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="feature-card space-y-8">
              <div className="bg-gray-700 rounded-xl p-6 hover:bg-gray-650 transition-all duration-300 border border-gray-600">
                <h3 className="text-xl font-bold mb-3 text-[#0080FF]">Banque & Finance</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Détection de fraude en temps réel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Scoring crédit automatisé</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Systèmes de trading algorithmique</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-xl p-6 hover:bg-gray-650 transition-all duration-300 border border-gray-600">
                <h3 className="text-xl font-bold mb-3 text-[#0080FF]">Commerce & Distribution</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Systèmes de recommandation personnalisés</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Optimisation des stocks et de la chaîne logistique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Analyse des comportements d'achat</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-xl p-6 hover:bg-gray-650 transition-all duration-300 border border-gray-600">
                <h3 className="text-xl font-bold mb-3 text-[#0080FF]">Industrie</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Maintenance prédictive des équipements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Optimisation des processus de production</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Contrôle qualité automatisé</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="feature-card space-y-8">
              <div className="bg-gray-700 rounded-xl p-6 hover:bg-gray-650 transition-all duration-300 border border-gray-600">
                <h3 className="text-xl font-bold mb-3 text-[#0080FF]">Santé</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Aide au diagnostic médical</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Recherche pharmaceutique accélérée</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Médecine personnalisée</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-xl p-6 hover:bg-gray-650 transition-all duration-300 border border-gray-600">
                <h3 className="text-xl font-bold mb-3 text-[#0080FF]">Télécommunications</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Prédiction du churn client</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Optimisation du réseau</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Détection d'anomalies sur le réseau</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-xl p-6 hover:bg-gray-650 transition-all duration-300 border border-gray-600">
                <h3 className="text-xl font-bold mb-3 text-[#0080FF]">Énergie</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Optimisation de la consommation énergétique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Prédiction de la demande</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Maintenance prédictive des infrastructures</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technologies Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies & Outils</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Nous utilisons les technologies les plus avancées pour développer des solutions d'IA et de Big Data performantes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="feature-card">
              <h3 className="text-2xl font-bold mb-6 text-gradient">IA & Machine Learning</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras',
                  'NLTK', 'OpenCV', 'Hugging Face', 'SpaCy',
                  'IBM Watson', 'Google AI', 'Amazon SageMaker', 'Azure ML'
                ].map((tech, index) => (
                  <div 
                    key={index}
                    className="bg-gray-800 rounded-lg py-3 px-4 text-center hover:bg-gray-750 transition-all duration-300 border border-gray-700"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="feature-card">
              <h3 className="text-2xl font-bold mb-6 text-gradient">Big Data & Analytics</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Hadoop', 'Spark', 'Kafka', 'Elasticsearch',
                  'MongoDB', 'Cassandra', 'Tableau', 'Power BI',
                  'Airflow', 'Databricks', 'AWS Redshift', 'Google BigQuery'
                ].map((tech, index) => (
                  <div 
                    key={index}
                    className="bg-gray-800 rounded-lg py-3 px-4 text-center hover:bg-gray-750 transition-all duration-300 border border-gray-700"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-12 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Approche Data Science</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Une méthodologie éprouvée pour transformer vos données en valeur ajoutée.
            </p>
          </div>
          
          <div className="relative mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card bg-gray-700 rounded-xl p-8 hover:bg-gray-650 transition-all duration-300 relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border-4 border-[#0080FF]">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mt-4 mb-4 text-center">Collecte & Préparation des Données</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Identification des sources de données</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Extraction et intégration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Nettoyage et structuration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Enrichissement des données</span>
                  </li>
                </ul>
              </div>
              
              <div className="feature-card bg-gray-700 rounded-xl p-8 hover:bg-gray-650 transition-all duration-300 relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border-4 border-[#0080FF]">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mt-4 mb-4 text-center">Analyse & Modélisation</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Exploration et visualisation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Sélection des algorithmes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Entraînement des modèles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Validation et optimisation</span>
                  </li>
                </ul>
              </div>
              
              <div className="feature-card bg-gray-700 rounded-xl p-8 hover:bg-gray-650 transition-all duration-300 relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border-4 border-[#0080FF]">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mt-4 mb-4 text-center">Déploiement & Utilisation</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Intégration aux systèmes existants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Monitoring et maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Formation des utilisateurs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFC000] mr-2">•</span>
                    <span>Amélioration continue</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#0080FF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FFC000]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à exploiter la puissance de vos données ?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Contactez-nous dès aujourd'hui pour discuter de vos projets d'Intelligence Artificielle et de Big Data.
            </p>
            <a 
              href="/#contact" 
              className="inline-flex items-center bg-gradient-to-r from-[#0080FF] to-[#FFC000] px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Demander une consultation
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServiceAIBigData;