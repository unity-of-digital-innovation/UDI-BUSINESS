import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import Logo from './logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setIsServicesMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const toggleServicesMenu = () => {
    setIsServicesMenuOpen(!isServicesMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-bold">UDI-BUSINESS</span>
          </a>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="text-white hover:text-[#FFC000] transition duration-300">Accueil</a>
            
            {/* Service Dropdown */}
            <div className="relative" ref={servicesMenuRef}>
              <button
                className="text-white hover:text-[#FFC000] transition duration-300 flex items-center space-x-1"
                onClick={toggleServicesMenu}
              >
                <span>Services</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${isServicesMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isServicesMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-2 space-y-1">
                    <Link
                      href="/services/developpement-logiciel"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition duration-300"
                      onClick={() => setIsServicesMenuOpen(false)}
                    >
                      Développement Logiciel
                    </Link>
                    <Link
                      href="/services/ia-big-data"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition duration-300"
                      onClick={() => setIsServicesMenuOpen(false)}
                    >
                      IA & Big Data
                    </Link>
                    <Link
                      href="/services/automatisation"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition duration-300"
                      onClick={() => setIsServicesMenuOpen(false)}
                    >
                      Automatisation des Processus
                    </Link>
                    <Link
                      href="/services/conseil-digital"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition duration-300"
                      onClick={() => setIsServicesMenuOpen(false)}
                    >
                      Conseil Digital
                    </Link>
                    <div className="border-t border-gray-700 my-1"></div>
                    <a
                      href="/#services"
                      className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 rounded-md transition duration-300"
                      onClick={() => setIsServicesMenuOpen(false)}
                    >
                      Tous nos services
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/portfolio" className="text-white hover:text-[#FFC000] transition duration-300">Portfolio</Link>
            <a href="/#about" className="text-white hover:text-[#FFC000] transition duration-300">À propos</a>
            <a 
              href="/#contact" 
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
            <a href="/" onClick={closeMobileMenu} className="text-white hover:text-[#FFC000] transition duration-300">Accueil</a>
            
            {/* Services section in mobile menu */}
            <div className="border-b border-gray-800 pb-3">
              <a href="/#services" onClick={closeMobileMenu} className="text-white hover:text-[#FFC000] transition duration-300 font-medium">
                Services
              </a>
              <div className="mt-2 ml-4 flex flex-col space-y-3">
                <Link 
                  href="/services/developpement-logiciel" 
                  onClick={closeMobileMenu} 
                  className="text-gray-300 hover:text-[#FFC000] transition duration-300 text-sm"
                >
                  • Développement Logiciel
                </Link>
                <Link 
                  href="/services/ia-big-data" 
                  onClick={closeMobileMenu} 
                  className="text-gray-300 hover:text-[#FFC000] transition duration-300 text-sm"
                >
                  • IA & Big Data
                </Link>
                <Link 
                  href="/services/automatisation" 
                  onClick={closeMobileMenu} 
                  className="text-gray-300 hover:text-[#FFC000] transition duration-300 text-sm"
                >
                  • Automatisation des Processus
                </Link>
                <Link 
                  href="/services/conseil-digital" 
                  onClick={closeMobileMenu} 
                  className="text-gray-300 hover:text-[#FFC000] transition duration-300 text-sm"
                >
                  • Conseil Digital
                </Link>
              </div>
            </div>
            
            <Link href="/portfolio" onClick={closeMobileMenu} className="text-white hover:text-[#FFC000] transition duration-300">Portfolio</Link>
            <a href="/#about" onClick={closeMobileMenu} className="text-white hover:text-[#FFC000] transition duration-300">À propos</a>
            <a 
              href="/#contact" 
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
