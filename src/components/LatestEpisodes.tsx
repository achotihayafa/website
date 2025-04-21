
import React, { useRef, useState } from 'react';
import { Loader } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { SiSpotify, SiYoutube, SiApplepodcasts } from "react-icons/si";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQuery } from '@tanstack/react-query';
import { fetchRssFeed } from '@/utils/rssParser';
import { Play, Pause } from "lucide-react";

// Utility to decode HTML entities
function decodeHtml(html: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

// Main podcast page links for platforms:
const PODCAST_LINKS = {
  spotify: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9",
  youtube: "https://www.youtube.com/@AchotiHaYafa",
  apple: "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395",
};

const LatestEpisodes = () => {
  const { data: episodes, isLoading, error } = useQuery({
    queryKey: ['episodes'],
    queryFn: fetchRssFeed,
  });

  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // Handles play/pause actions, ensuring only one episode plays
  const togglePlay = (index: number, audioUrl: string) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;

    if (playingIndex === index && !currentAudio.paused) {
      currentAudio.pause();
      setPlayingIndex(null);
    } else {
      audioRefs.current.forEach((audio, i) => {
        if (i !== index && audio) audio.pause();
      });
      currentAudio.play();
      setPlayingIndex(index);
    }
  };

  // Pause all audios on unmount
  React.useEffect(() => {
    return () => {
      audioRefs.current.forEach(audio => audio && audio.pause());
    };
  }, []);

  return (
    <section id="episodes" className="py-20 bg-black">
      <div className="container px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font text-podcast-yellow mb-4">
            פרקים אחרונים
          </h2>
          <p className="text-white/80 text-lg">
            האזינו לשיחות האחרונות שלנו
          </p>
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
            {episodes?.slice(0, 6).map((episode, index) => (
              <Card
                key={index}
                className="relative bg-podcast-darkgray/30 border-white/10 hover:border-podcast-yellow/50 transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0 relative">
                  <AspectRatio ratio={1} className="overflow-hidden group">
                    {episode.imageUrl && (
                      <img
                        src={episode.imageUrl}
                        alt={decodeHtml(episode.title)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 hover:scale-110"
                        style={{ borderRadius: '1rem' }}
                      />
                    )}
                  </AspectRatio>

                  {/* Audio + Play Button */}
                  {episode.audioUrl && (
                    <>
                      <audio
                        ref={el => (audioRefs.current[index] = el)}
                        src={episode.audioUrl}
                        preload="none"
                      />
                      <button
                        onClick={() => togglePlay(index, episode.audioUrl)}
                        className="absolute bottom-4 left-4 bg-podcast-yellow rounded-full p-2 text-white hover:bg-black transition-colors z-10"
                        aria-label={playingIndex === index ? "הפסק פרק" : "הפעל פרק"}
                      >

                        {playingIndex === index ? <Pause /> : <Play />}
                      </button>
                    </>
                  )}

                  <div className="p-6">
                    <h3 className="text-2xl font mb-3 text-podcast-yellow">{decodeHtml(episode.title)}</h3>
                    <p className="text-white/80 mb-6 line-clamp-3">{decodeHtml(episode.description)}</p>

                    <div className="flex gap-4">
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
      </div>
    </section>
  );
};

export default LatestEpisodes;
