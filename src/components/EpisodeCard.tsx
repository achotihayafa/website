
import React from 'react';
import { Play, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface EpisodeCardProps {
  title: string;
  description: string;
  duration: string;
  date: string;
  spotifyLink: string;
  className?: string;
  featured?: boolean;
}

const EpisodeCard = ({
  title,
  description,
  duration,
  date,
  spotifyLink,
  className,
  featured = false
}: EpisodeCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg group relative",
        featured ? "border-podcast-yellow border-2" : "",
        className
      )}
    >
      <CardContent className="p-0">
        <div className={cn(
          "p-6 h-full episode-card-gradient", 
          featured && "bg-gradient-to-br from-podcast-yellow/20 to-podcast-magenta/20"
        )}>
          {featured && (
            <span className="inline-block bg-podcast-yellow text-podcast-darkgray text-xs font-medium px-2 py-1 rounded mb-4">
              Featured Episode
            </span>
          )}
          
          <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
            {title}
          </h3>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span>{date}</span>
            <span className="mx-2">•</span>
            <Clock size={14} className="mr-1" />
            <span>{duration}</span>
          </div>
          
          <p className="text-gray-600 mb-6 line-clamp-3">
            {description}
          </p>
          
          <div className="flex justify-between items-center">
            <a 
              href={spotifyLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-podcast-magenta hover:underline font-medium"
            >
              <Play size={18} className="mr-1" />
              Listen on Spotify
            </a>
          </div>
          
          <div className="absolute inset-0 bg-podcast-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardContent>
    </Card>
  );
};

export default EpisodeCard;
