import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const goToSection = (id: string) => {
    router.push(`/#${id}`);
    closeMenu();
  };

  return (
    <header
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled ? 'py-3 md:py-4 bg-podcast-magenta shadow-md' : 'py-5 md:py-7 bg-podcast-magenta'
      )}
      style={{ minHeight: 50 }}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src="/namelogo.png"
            alt="אחותי היפה"
            className="h-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12 flex-nowrap">
          <button onClick={() => goToSection('best')} className="font-medium text-white hover:text-podcast-yellow transition-colors whitespace-nowrap">פרקים נבחרים</button>
          <button onClick={() => goToSection('latest')} className="font-medium text-white hover:text-podcast-yellow transition-colors whitespace-nowrap">פרקים אחרונים</button>
          <button onClick={() => goToSection('about')} className="font-medium text-white hover:text-podcast-yellow transition-colors whitespace-nowrap">מי אנחנו</button>
          <button onClick={() => goToSection('btl')} className="font-medium text-white hover:text-podcast-yellow transition-colors whitespace-nowrap">בין השורות</button>
          <Button
            onClick={() => goToSection('platforms')}
            className="bg-podcast-yellow text-black font-bold hover:bg-podcast-yellow/90 whitespace-nowrap px-7 rounded-md"
          >
            האזינו עכשיו
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={toggleMenu}
          aria-label={menuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={cn(
          'fixed inset-0 bg-podcast-magenta pt-20 px-6 flex flex-col items-center space-y-8 md:hidden transition-transform duration-300 ease-in-out z-50',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <button
          className="absolute top-6 right-6 text-white"
          onClick={closeMenu}
          aria-label="סגירת תפריט"
        >
          <X size={24} />
        </button>

        {/* Logo in Mobile Menu */}
        <button
          onClick={() => {
            router.push('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeMenu();
          }}
          className="mb-4"
          aria-label="דף הבית"
        >
          <img
            src="/namelogo.png"
            alt="אחותי היפה"
            className="h-10"
          />
        </button>

        <button onClick={() => goToSection('best')} className="text-xl font-medium text-white">פרקים נבחרים</button>
        <button onClick={() => goToSection('latest')} className="text-xl font-medium text-white">פרקים אחרונים</button>
        <button onClick={() => goToSection('about')} className="text-xl font-medium text-white">מי אנחנו</button>
        <button onClick={() => goToSection('btl')} className="text-xl font-medium text-white">בין השורות</button>
        <Button
          onClick={() => goToSection('platforms')}
          className="text-xl font-bold bg-podcast-yellow text-black hover:bg-podcast-yellow/90 rounded-md px-10 py-3"
        >
          האזינו עכשיו
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
