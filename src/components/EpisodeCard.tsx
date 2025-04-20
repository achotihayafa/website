
import React, { useState } from 'react';
import { Play, Clock, Pause } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface EpisodeCardProps {
  title: string;
  description: string;
  duration: string;
  date: string;
  spotifyLink: string;
  audioUrl: string;
  imageUrl?: string;
  className?: string;
  featured?: boolean;
}

const EpisodeCard = ({
  title,
  description,
  duration,
  date,
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
          <div className="h-40 overflow-hidden">
            <AspectRatio ratio={1}>
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </AspectRatio ratio>
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
          
          <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
            {title}
          </h3>
          
          <div className="flex items-center text-sm text-white/70 mb-3">
            <span>{date}</span>
            <span className="mx-2">•</span>
            <Clock size={14} className="ml-1" />
            <span>{duration}</span>
          </div>
          
          <p className="text-white/80 mb-6 line-clamp-3">
            {description}
          </p>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={togglePlay}
              className="flex items-center text-podcast-yellow hover:text-white transition-colors font-medium"
            >
              {isPlaying ? (
                <>
                  <Pause size={18} className="ml-1" />
                  הפסק
                </>
              ) : (
                <>
                  <Play size={18} className="ml-1" />
                  האזינו עכשיו
                </>
              )}
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
