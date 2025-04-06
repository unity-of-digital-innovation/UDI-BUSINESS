import { useEffect } from 'react';
import ThreeBackground from './ThreeBackground';
import Logo from './logo';
import gsap from 'gsap';

const HeroSection = () => {
  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      '#hero-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );

    gsap.fromTo(
      '#hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7 }
    );

    gsap.fromTo(
      '#hero-buttons',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.9 }
    );

    gsap.fromTo(
      '#hero-logo',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.3 }
    );

    gsap.fromTo(
      '#hero-scroll',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 1.5 }
    );
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <ThreeBackground />
      <div className="container mx-auto px-4 relative z-10 mt-24">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 id="hero-title" className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Unity of Digital Innovation</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                Transformons vos idées en réalité digitale
              </span>
            </h1>
            <p id="hero-description" className="text-xl text-gray-300 mb-8 max-w-xl">
              Nous combinons expertise technique et créativité pour développer des solutions digitales sur mesure qui propulsent votre entreprise vers l'avenir.
            </p>
            <div id="hero-buttons" className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="#services" 
                className="glowing-btn px-8 py-4 rounded-full bg-gradient-to-r from-[#0080FF] to-[#0080FF]/80 text-white font-semibold text-center hover:shadow-lg hover:shadow-[#0080FF]/20 transition duration-300 transform hover:scale-105"
              >
                Nos Services
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-full border-2 border-white/20 hover:border-[#FFC000]/50 text-white font-semibold text-center transition duration-300 hover:bg-white/5"
              >
                Contactez-nous
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div id="hero-logo" className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0080FF]/20 to-[#FFC000]/20 rounded-full blur-3xl"></div>
              <Logo size={384} />
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
