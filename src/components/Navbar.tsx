
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header 
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled ? 'py-4 bg-white shadow-md' : 'py-6 bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-xl md:text-2xl font-display font-bold gradient-text">Feel Good</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#episodes" className="font-medium hover:text-podcast-magenta transition-colors">Episodes</a>
          <a href="#about" className="font-medium hover:text-podcast-magenta transition-colors">About</a>
          <a href="#contact" className="font-medium hover:text-podcast-magenta transition-colors">Contact</a>
          <Button className="bg-podcast-magenta hover:bg-podcast-magenta/90">Listen Now</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav 
        className={cn(
          'fixed inset-0 bg-white pt-24 px-6 flex flex-col items-center space-y-8 md:hidden transition-transform duration-300 ease-in-out',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <a href="#episodes" className="text-xl font-medium" onClick={toggleMenu}>Episodes</a>
        <a href="#about" className="text-xl font-medium" onClick={toggleMenu}>About</a>
        <a href="#contact" className="text-xl font-medium" onClick={toggleMenu}>Contact</a>
        <Button className="w-full bg-podcast-magenta hover:bg-podcast-magenta/90">Listen Now</Button>
      </nav>
    </header>
  );
};

export default Navbar;
