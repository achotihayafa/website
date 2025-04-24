import React, { useState, useEffect } from 'react';
import { Headphones, ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
const podcastCover = `${import.meta.env.BASE_URL}cover.jpg`;
const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      // Set state to true if scrolled down, false if at the top
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Animated colorful circles background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-podcast-magenta/30 via-podcast-yellow/30 to-podcast-magenta/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-podcast-yellow/40 via-podcast-magenta/10 to-white/0 blur-3xl animate-pulse-slow" style={{
        animationDelay: '0.8s'
      }}></div>
        <div className="absolute top-[55%] right-[30%] w-48 h-48 rounded-full bg-gradient-to-br from-podcast-magenta/30 to-podcast-yellow/10 blur-2xl animate-pulse-slow" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      {/* Hero content arrangement for image on left */}
      <div className="container mx-auto px-6 py-16 md:py-32 relative z-10 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Right Side (Text & Actions) */}
        <div className="max-w-3xl mx-auto md:mx-0 flex-1 w-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-8 text-center font-display font-bold bg-gradient-to-r from-white via-podcast-yellow to-podcast-magenta bg-clip-text text-transparent transform origin-center inline-block opacity-0 animate-fade-in-delay-1">
            <span className="block text-right">פודקאסט על רגשות,</span>
            <span className="block">אבל בעצם פודקאסט להטב"קי</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 text-white/80 max-w-2xl opacity-0 animate-fade-in-delay-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            הצטרפו אלינו מדי שבוע למסע מצחיק ומרגש בין סיפורים וזיכרונות.
            הפודקאסט יוצר מרחב לדיונים כנים על זהות, מיניות, משפחה וחיים להטב"קים - בדיוק בשביל מי שמחפשים לפתוח את הלב.
          </p>

          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-delay-2">
            <Button size="lg" className="bg-podcast-yellow text-black hover:bg-podcast-yellow/90 shadow-lg shadow-podcast-yellow/20" onClick={() => window.open("https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ", "_blank")}>
              <Headphones className="ml-2" />
              האזינו ב-Spotify
            </Button>

            <Button variant="outline" size="lg" onClick={() => document.getElementById('best')?.scrollIntoView({
            behavior: 'smooth'
          })} className="text-white border-white hover:bg-white/10">
              פרקים מומלצים
            </Button>
          </div>
        </div>
        {/* Left Side (Podcast Cover) */}
        <div className="flex-1 flex justify-center items-center mb-10 md:mb-0">
          <img src={podcastCover} alt="Podcast Cover" className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white/10 transition-transform duration-300 hover:scale-105" />
        </div>
      </div>

      {/* Arrow to platforms */}
      {!isScrolled && <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="./#platforms" aria-label="לכל הפלטפורמות">
            <ArrowDown className="text-white" />
          </a>
        </div>}
    </section>;
};
export default HeroSection;