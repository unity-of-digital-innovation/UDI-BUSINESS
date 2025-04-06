import { useEffect, useRef } from 'react';
import ThreeBackground from './ThreeBackground';
import Logo from './logo';
import gsap from 'gsap';
import { Link } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

const HeroSection = () => {
  const messageRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLDivElement>(null);
  const automationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP complex animations
    const tl = gsap.timeline();
    
    tl.fromTo(
      '#hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      '#hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(
      '#hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(
      '#hero-buttons',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(
      '#hero-logo',
      { opacity: 0, scale: 0.8, rotation: -5 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" },
      "-=1.4"
    )
    .fromTo(
      '#hero-scroll',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power1.inOut" },
      "-=0.4"
    );

    // Chat message animation timeline
    if (messageRef.current && replyRef.current && automationRef.current) {
      const chatTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      
      chatTl.fromTo(messageRef.current, 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(replyRef.current, 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 1 }
      )
      .fromTo(automationRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
        "+=0.5"
      )
      .to([messageRef.current, replyRef.current, automationRef.current], 
        { opacity: 0, duration: 0.5, stagger: 0.1, delay: 2 }
      );
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <ThreeBackground />
      <div className="container mx-auto px-4 relative z-10 mt-16">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 id="hero-title" className="text-4xl md:text-6xl font-bold mb-3 leading-tight">
              <span className="text-gradient">UDI-BUSINESS</span>
            </h1>
            <h2 id="hero-subtitle" className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
              Automatisez votre relation client
            </h2>
            <p id="hero-description" className="text-xl text-gray-300 mb-8 max-w-xl">
              Notre solution phare d'automatisation WhatsApp transforme votre service client. Réponses instantanées, suivi personnalisé et intelligence artificielle au service de vos conversations.
            </p>
            
            <div className="mb-10 bg-[#1c2641]/60 p-5 rounded-xl border border-[#0080FF]/30 shadow-xl">
              <div className="flex flex-col space-y-3">
                <div ref={messageRef} className="self-start bg-gray-700/60 rounded-lg rounded-bl-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-white">Bonjour, je souhaite des informations sur vos services.</p>
                </div>
                <div ref={replyRef} className="self-end bg-[#0080FF]/50 rounded-lg rounded-br-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-white">Bonjour ! Je suis l'assistant virtuel d'UDI-BUSINESS. Comment puis-je vous aider aujourd'hui ?</p>
                </div>
                <div ref={automationRef} className="self-center bg-[#FFC000]/20 rounded-full px-4 py-1 text-sm text-white/80 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faRobot} className="text-[#FFC000]" />
                  <span>Réponse automatisée via WhatsApp</span>
                </div>
              </div>
            </div>
            
            <div id="hero-buttons" className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/ServiceAutomation" 
                className="glowing-btn px-8 py-4 rounded-full bg-gradient-to-r from-[#0080FF] to-[#0080FF]/80 text-white font-semibold text-center hover:shadow-lg hover:shadow-[#0080FF]/20 transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span className="text-sm md:text-base">Découvrir notre service phare</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-full border-2 border-white/20 hover:border-[#FFC000]/50 text-white font-semibold text-center transition duration-300 hover:bg-white/5 text-sm md:text-base"
              >
                Discuter de votre projet
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div id="hero-logo" className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0080FF]/20 to-[#FFC000]/20 rounded-full blur-3xl"></div>
              <Logo size={384} />
              <div className="absolute -right-4 -top-4 bg-[#25D366] text-white p-3 rounded-full shadow-lg animate-bounce-slow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div id="hero-scroll" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <a href="#services" className="flex flex-col items-center space-y-2 text-white/70 hover:text-white transition duration-300">
            <span className="text-sm uppercase tracking-wider">Découvrir</span>
            <div className="animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
