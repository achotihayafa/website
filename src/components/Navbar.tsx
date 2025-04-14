
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
        isScrolled ? 'py-4 bg-podcast-magenta shadow-md' : 'py-6 bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-xl md:text-2xl font-display font-bold gradient-text">Feel Good</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#episodes" className="font-medium text-white hover:text-podcast-yellow transition-colors">פרקים</a>
          <a href="#about" className="font-medium text-white hover:text-podcast-yellow transition-colors">אודות</a>
          <a href="#contact" className="font-medium text-white hover:text-podcast-yellow transition-colors">צרו קשר</a>
          <Button className="bg-podcast-yellow text-black hover:bg-podcast-yellow/90">האזינו עכשיו</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl text-white" 
          onClick={toggleMenu}
          aria-label="פתח תפריט"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav 
        className={cn(
          'fixed inset-0 bg-podcast-magenta pt-24 px-6 flex flex-col items-center space-y-8 md:hidden transition-transform duration-300 ease-in-out',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <a href="#episodes" className="text-xl font-medium text-white" onClick={toggleMenu}>פרקים</a>
        <a href="#about" className="text-xl font-medium text-white" onClick={toggleMenu}>אודות</a>
        <a href="#contact" className="text-xl font-medium text-white" onClick={toggleMenu}>צרו קשר</a>
        <Button className="w-full bg-podcast-yellow text-black hover:bg-podcast-yellow/90">האזינו עכשיו</Button>
      </nav>
    </header>
  );
};

export default Navbar;
