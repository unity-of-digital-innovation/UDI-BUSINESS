import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useScrollAnimation = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: targetElement,
                offsetY: 80 // Account for fixed header
              },
              ease: 'power3.inOut'
            });
          }
        }
      }
    };

    // Progress bar animation
    const updateProgressBar = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      const progressBar = document.querySelector('.progress-bar');
      
      if (progressBar) {
        (progressBar as HTMLElement).style.width = `${scrolled}%`;
      }
    };

    // ScrollTrigger batch for common animations
    ScrollTrigger.batch('.animate-on-scroll', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out'
        });
      },
      once: true
    });

    // Add event listeners
    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('scroll', updateProgressBar);

    // Initial call to update progress bar
    updateProgressBar();

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', updateProgressBar);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
