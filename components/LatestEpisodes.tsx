import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { SiSpotify, SiYoutube, SiApplepodcasts } from "react-icons/si";
import { AspectRatio } from "./ui/aspect-ratio";
import { useQuery } from '@tanstack/react-query';
import { fetchRssFeed } from '../utils/rssParser';
import { FaPlay, FaPause } from "react-icons/fa";
import { Clock, Heart, Headphones, Mic2, Play } from 'lucide-react';
import Link from 'next/link';

// Utility to decode HTML entities
function decodeHtml(html: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

// Utility to strip all HTML and replace <br> with space
function stripHtmlAndBr(html: string): string {
  const decoded = decodeHtml(html);
  return decoded
    .replace(/<br\s*\/?>/gi, ' ')  // Replace <br> with space
    .replace(/<[^>]+>/g, '')       // Strip all other HTML tags
    .trim();
}

const PODCAST_LINKS = {
  spotify: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw",
  youtube: "https://www.youtube.com/@AchotiHaYafa",
  apple: "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395"
};

const LatestEpisodes = () => {
  const {
    data: episodes,
    isLoading,
    error
  } = useQuery({
    queryKey: ['episodes'],
    queryFn: fetchRssFeed
  });

  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  
  const togglePlay = (index: number) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;
  
    if (playingIndex === index && !currentAudio.paused) {
      currentAudio.pause();
      setPlayingIndex(null);
    } else {
      // Pause all others
      audioRefs.current.forEach((audio, i) => {
        if (i !== index && audio) audio.pause();
      });
      currentAudio.play();
      setPlayingIndex(index);
    }
  };
  
  // Optional: Cleanup effect if audio is paused on unmount
  useEffect(() => {
    const refsSnapshot = [...audioRefs.current];
    return () => {
      refsSnapshot.forEach(audio => audio?.pause());
    };
  }, []);

  return (
    <section id="latest" className="py-20 relative overflow-hidden">
      {/* Decorative icons in the margins */}
      <div className="absolute inset-0 -z-10 pointer-events-none w-full h-full overflow-hidden">
        <Headphones className="absolute top-10 left-0 w-32 h-32 text-podcast-yellow/15 pointer-events-none z-0" />
        <Heart className="absolute top-[60%] right-10 w-24 h-24 text-podcast-yellow/10 pointer-events-none z-0" />
        <Play className="absolute top-[50%] left-10 w-32 h-32 text-podcast-magenta/10 pointer-events-none z-0" />
      </div>

      <div className="container px-6">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <div className="w-12 h-12 rounded-full bg-podcast-yellow flex items-center justify-center mx-auto mb-4">
            <Clock className="text-black font-bold" size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-podcast-yellow">
            פרקים אחרונים
          </h2>
          <p className="text-white/80 text-lg text-center">האזינו לשיחות חדשות על רגשות, קוויריות, משפחה ומה שביניהם.</p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="animate-spin text-white text-2xl">⏳</span>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-white text-xl">אירעה שגיאה בטעינת הפרקים. נסו שוב מאוחר יותר.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes?.slice(0, 3).map((episode, index) => (
              <Card
                key={index}
                className="relative bg-podcast-darkgray/30 border border-white/30 group transition-all duration-300 overflow-hidden flex flex-col hover:border-podcast-yellow"
                style={{ borderRadius: '1rem' }}
              >
                <CardContent className="p-0 relative flex flex-col h-full">
                  <AspectRatio ratio={1} className="overflow-hidden">
                    {episode.imageUrl && (
                      <img
                        src={episode.imageUrl}
                        alt={`${episode.title} – פרק מתוך הפודקאסט אחותי היפה`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 hover:scale-110"
                        loading="lazy"
                      />
                    )}
                  </AspectRatio>

                  {episode.audioUrl && (
                    <>
                      <audio
                        ref={el => { audioRefs.current[index] = el; }}
                        src={episode.audioUrl}
                        preload="none"
                      />
                      <button
                        onClick={() => togglePlay(index)}
                        className="absolute bottom-4 left-4 bg-podcast-yellow rounded-full p-2 text-black hover:bg-black hover:text-podcast-yellow transition-colors z-10"
                        aria-label={playingIndex === index ? "הפסק פרק" : "הפעל פרק"}
                      >
                        {playingIndex === index ? <FaPause /> : <FaPlay />}
                      </button>
                    </>
                  )}

                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-3xl mb-3 text-podcast-yellow">
                        {decodeHtml(episode.title)}
                      </h3>
                      <p className="text-white/80 mb-6 line-clamp-3">
                        {stripHtmlAndBr(episode.description)}
                      </p>
                    </div>
                    <div className="flex gap-4 mt-auto">
                      <a
                        href={PODCAST_LINKS.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-podcast-yellow transition-colors"
                        aria-label="האזינו ב-Spotify"
                      >
                        <SiSpotify size={24} />
                      </a>
                      <a
                        href={PODCAST_LINKS.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-podcast-yellow transition-colors"
                        aria-label="האזינו ב-YouTube"
                      >
                        <SiYoutube size={24} />
                      </a>
                      <a
                        href={PODCAST_LINKS.apple}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-podcast-yellow transition-colors"
                        aria-label="האזינו ב-Apple Podcasts"
                      >
                        <SiApplepodcasts size={24} />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Button to All Episodes */}
        <div className="flex justify-center rounded-md mt-12 mb-6">
          <Link
            href="/episodes"
            className="bg-podcast-yellow text-black font-bold px-6 py-2 rounded-md hover:bg-white transition-colors duration-300"
          >
            כל הרגשות - כל הפרקים
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestEpisodes;
