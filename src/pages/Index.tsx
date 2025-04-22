
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PodcastPlatforms from '@/components/PodcastPlatforms';
import BestEpisodes from '@/components/BestEpisodes';
import LatestEpisodes from '@/components/LatestEpisodes';
import AboutSection from '@/components/AboutSection';
import BTLSection from '@/components/BTLSection';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SectionDivider variant="yellow" />
      <PodcastPlatforms />
      <SectionDivider variant="magenta" />
      <BestEpisodes />
      <SectionDivider />
      <LatestEpisodes />
      <SectionDivider variant="yellow" />
      <AboutSection />
      <SectionDivider variant="magenta" />
      <BTLSection />
      <Footer />
    </div>
  );
};

export default Index;
