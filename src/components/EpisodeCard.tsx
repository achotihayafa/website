
import React, { useState } from 'react';
import { Play, Clock, Pause } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface EpisodeCardProps {
  title: string;
  description: string;
  spotifyLink: string;
  audioUrl: string;
  imageUrl?: string;
  className?: string;
  featured?: boolean;
}

const EpisodeCard = ({
  title,
  description,
  spotifyLink,
  audioUrl,
  imageUrl,
  className,
  featured = false
}: EpisodeCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(audioUrl));

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Stop audio when component unmounts
  React.useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg group relative",
        featured ? "border-podcast-yellow border-2" : "",
        className
      )}
    >
      <CardContent className="p-0">
        {imageUrl && (
          <div className="aspect-square overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className={cn(
          "p-6 h-full episode-card-gradient", 
          featured && "bg-gradient-to-br from-podcast-yellow/20 to-white/20"
        )}>
          {featured && (
            <span className="inline-block bg-podcast-yellow text-podcast-darkgray text-xs font-medium px-2 py-1 rounded mb-4">
              פרק מומלץ
            </span>
          )}
          
          <h3 className="text-xl md:text-3xl mb-2 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-white/80 mb-6 line-clamp-3">
            {description}
          </p>
          
          <div className="flex justify-between items-center">
            <button
              onClick={togglePlay}
              className="bg-podcast-yellow rounded-full p-2 text-white hover:bg-black transition-colors"
              aria-label="הפעל פרק"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <a 
              href={spotifyLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-podcast-yellow transition-colors text-sm"
            >
              Spotify
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EpisodeCard;
