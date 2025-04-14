
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LatestEpisodes from '@/components/LatestEpisodes';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <LatestEpisodes />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
