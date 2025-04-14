
import React from 'react';
import { Headphones, ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="hero-shape"></div>
      
      <div className="container mx-auto px-6 py-16 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          <div className="flex items-center mb-6 opacity-0 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-podcast-magenta flex items-center justify-center text-white mr-3">
              <Headphones size={20} />
            </div>
            <span className="text-lg font-medium">The Feel Good Podcast</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 opacity-0 animate-fade-in-delay-1">
            Explore emotions through an <span className="gradient-text">LGBTQ+ lens</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-2xl opacity-0 animate-fade-in-delay-2">
            Join us each week as we navigate the beautiful complexity of emotions and identities. 
            A safe space for stories, insights, and meaningful conversations.
          </p>
          
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-delay-2">
            <Button 
              size="lg" 
              className="bg-podcast-magenta hover:bg-podcast-magenta/90"
              onClick={() => window.open("https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ", "_blank")}
            >
              <Headphones className="mr-2" />
              Listen on Spotify
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('episodes')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Episodes
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#episodes" aria-label="Scroll to episodes">
          <ArrowDown className="text-podcast-magenta" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
