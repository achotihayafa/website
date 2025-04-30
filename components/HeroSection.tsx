import React, { useState, useEffect } from 'react';
import { Headphones, ArrowDown } from 'lucide-react';
import { SiSpotify } from "react-icons/si";
import { Button } from "../components/ui/button";
import { motion } from 'framer-motion';

const podcastCover = "/cover.jpg";

const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center pt-16 md:pt-24 overflow-hidden">
      {/* Background animated circles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-podcast-magenta/30 via-podcast-yellow/30 to-podcast-magenta/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-podcast-yellow/40 via-podcast-magenta/10 to-white/0 blur-3xl animate-pulse-slow" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-[55%] right-[30%] w-48 h-48 rounded-full bg-gradient-to-br from-podcast-magenta/30 to-podcast-yellow/10 blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 py-8 md:py-32 relative z-10 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        {/* Right Side (Text) */}
        <div className="max-w-3xl mx-auto md:mx-0 flex-1 w-full">
          <h1 className="sr-only">אחותי היפה – פודקאסט על רגשות, אבל בעצם פודקאסט להטב"קי</h1>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl mb-6 text-center md:text-right font-display font-bold transform origin-center inline-block w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-podcast-magenta">פודקאסט על רגשות,</span>
            <span className="block text-podcast-yellow">אבל בעצם פודקאסט להטב"קי</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl text-center md:text-right mx-auto md:mx-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            אחותי היפה הוא פודקאסט קווירי בעברית, שבו אנחנו פותחות את הלב דרך שיחות על רגשות, זהות, מיניות, משפחה ורגשות.
            הצטרפו אלינו מדי שבוע למסע מצחיק ומרגש בין סיפורים וזיכרונות.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="h-11 rounded-md px-8 w-full font-bold md:w-auto text-xl bg-podcast-yellow text-black hover:bg-podcast-yellow/90 shadow-lg shadow-podcast-yellow/20 flex items-center justify-center gap-2 whitespace-nowrap"
              onClick={() =>
                window.open("https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw", "_blank")
              }
            >
              <SiSpotify className="ml-2" size={24} />
              האזינו ב-Spotify
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium border bg-background hover:text-accent-foreground h-11 rounded-md px-8 w-full md:w-auto text-xl text-white border-white hover:bg-white/10"
              onClick={() =>
                document.getElementById('best')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              פרקים נבחרים
            </Button>
          </motion.div>
        </div>

        {/* Left Side (Image) */}
        <motion.div
          className="flex-1 flex justify-center items-center mb-2 md:mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={podcastCover}
            alt="Podcast Cover"
            className="w-48 h-48 md:w-80 md:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white/10 transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      </div>

      {/* Down arrow (only visible on desktop) */}
      {!isScrolled && (
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <a href="./#platforms" aria-label="לכל הפלטפורמות">
            <ArrowDown className="text-white" />
          </a>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
