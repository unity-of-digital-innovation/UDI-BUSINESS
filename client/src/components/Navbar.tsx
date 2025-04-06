import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import Logo from './logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-bold">UDI</span>
          </a>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-white hover:text-[#FFC000] transition duration-300">Accueil</a>
            <a href="#services" className="text-white hover:text-[#FFC000] transition duration-300">Services</a>
            <a href="#projects" className="text-white hover:text-[#FFC000] transition duration-300">Projets</a>
            <a href="#about" className="text-white hover:text-[#FFC000] transition duration-300">À propos</a>
            <a 
              href="#contact" 
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#0080FF] to-[#FFC000] text-white font-medium hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
              Contact
            </a>
          </div>
          
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#home" onClick={closeMobileMenu} className="text-white hover:text-[#FFC000] transition duration-300">Accueil</a>
            <a href="#services" onClick={closeMobileMenu} className="text-white hover:text-[#FFC000] transition duration-300">Services</a>
            <a href="#projects" onClick={closeMobileMenu} className="text-white hover:text-[#FFC000] transition duration-300">Projets</a>
            <a href="#about" onClick={closeMobileMenu} className="text-white hover:text-[#FFC000] transition duration-300">À propos</a>
            <a 
              href="#contact" 
              onClick={closeMobileMenu}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#0080FF] to-[#FFC000] text-white font-medium text-center hover:shadow-lg transition duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
