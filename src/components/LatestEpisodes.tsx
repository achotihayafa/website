
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LatestEpisodes = () => {
  return (
    <section id="episodes" className="py-20 bg-podcast-darkgray/10">
      <div className="container px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-podcast-magenta">האזינו לפרקים שלנו</h2>
          <p className="text-white/80">כל הפרקים באתר אחד</p>
        </div>
        
        <div className="w-full max-w-4xl mx-auto">
          <AspectRatio ratio={16/9} className="bg-podcast-darkgray/20">
            <iframe 
              src="https://open.spotify.com/embed/show/0ZpvzCEuDeKQhBw74YEmp9?utm_source=generator" 
              width="100%" 
              height="100%"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="border-0"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default LatestEpisodes;
