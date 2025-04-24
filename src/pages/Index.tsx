import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PodcastPlatforms from '@/components/PodcastPlatforms';
import BestEpisodes from '@/components/BestEpisodes';
import LatestEpisodes from '@/components/LatestEpisodes';
import AboutSection from '@/components/AboutSection';
import BTLSection from '@/components/BTLSection';
import Footer from '@/components/Footer';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 100); // wait for DOM
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PodcastPlatforms />
      <BestEpisodes />
      <LatestEpisodes />
      <AboutSection />
      <BTLSection />
      <Footer />
    </div>
  );
};

export default Index;
