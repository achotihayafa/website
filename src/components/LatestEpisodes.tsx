
import React, { useState, useEffect } from 'react';
import { Music, Loader } from 'lucide-react';
import EpisodeCard from './EpisodeCard';
import { fetchRssFeed } from '@/utils/rssParser';
import { useQuery } from '@tanstack/react-query';

const LatestEpisodes = () => {
  const { data: episodes, isLoading, error } = useQuery({
    queryKey: ['episodes'],
    queryFn: fetchRssFeed,
  });

  return (
    <section id="episodes" className="py-20 bg-podcast-darkgray/10">
      <div className="container px-6">
        <div className="flex items-center mb-12">
          <div className="w-12 h-12 rounded-full bg-podcast-yellow flex items-center justify-center ml-4">
            <Music className="text-podcast-darkgray" size={24} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">פרקים אחרונים</h2>
            <p className="text-white/80">האזינו לשיחות האחרונות שלנו</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-white" size={40} />
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-white text-xl">אירעה שגיאה בטעינת הפרקים. נסו שוב מאוחר יותר.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes?.map((episode, index) => (
              <EpisodeCard
                key={index}
                title={episode.title}
                description={episode.description}
                duration={episode.duration}
                date={episode.date}
                spotifyLink={episode.spotifyLink}
                featured={episode.featured}
                audioUrl={episode.audioUrl}
                imageUrl={episode.imageUrl}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default LatestEpisodes;
