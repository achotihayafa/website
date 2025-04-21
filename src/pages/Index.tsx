
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PodcastPlatforms from '@/components/PodcastPlatforms';
import BestEpisodes from '@/components/BestEpisodes';
import LatestEpisodes from '@/components/LatestEpisodes';
import AboutSection from '@/components/AboutSection';
import BTLSection from '@/components/BTLSection';
import Footer from '@/components/Footer';

const Index = () => {
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
