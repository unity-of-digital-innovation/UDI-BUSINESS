import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#cta-section',
        start: 'top 80%',
      },
    });

    tl.fromTo(
      '#cta-content',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    tl.fromTo(
      '#cta-buttons a',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 },
      '-=0.4'
    );
  }, []);

  return (
    <section id="cta-section" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0080FF]/20 to-[#FFC000]/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gray-900/90 backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-2xl border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div id="cta-content" className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prêt à concrétiser votre <span className="text-gradient">projet digital</span> ?
              </h2>
              <p className="text-xl text-gray-300">
                Parlons de vos objectifs et voyons comment nous pouvons vous aider à les atteindre.
              </p>
            </div>
            <div id="cta-buttons" className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0080FF] to-[#FFC000] text-white font-semibold text-center shadow-lg shadow-[#0080FF]/20 hover:shadow-[#FFC000]/30 transition duration-300 transform hover:scale-105"
              >
                Contactez-nous
              </a>
              <a 
                href="#services" 
                className="px-8 py-4 rounded-full border-2 border-white/20 hover:border-[#FFC000]/50 text-white font-semibold text-center transition duration-300 hover:bg-white/5"
              >
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
