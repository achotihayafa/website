import React, { useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { SiSpotify, SiYoutube, SiApplepodcasts, SiInstagram } from "react-icons/si";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQuery } from '@tanstack/react-query';
import { fetchRssFeed } from '@/utils/rssParser';
import { FaPlay, FaPause } from "react-icons/fa";

// Utility to decode HTML entities
function decodeHtml(html: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

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

  const togglePlay = (index: number) => {
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

  React.useEffect(() => {
    return () => {
      audioRefs.current.forEach(audio => audio && audio.pause());
    };
  }, []);

  return (
    <section id="latest" className="py-20 bg-black">
      <div className="container px-6">
        <div className="mb-12 flex justify-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-podcast-yellow mb-4 text-center"
            style={{
              transform: 'scaleX(1.2)',
              transformOrigin: 'center',
            }}
          >
            פרקים אחרונים
          </h2>
        </div>
        <p className="text-white/80 text-lg text-center mb-10">
          האזינו לשיחות האחרונות שלנו
        </p>

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
            {episodes?.slice(0, 6).map((episode, index) => (
              <Card
                key={index}
                className="relative bg-podcast-darkgray/30 border-white/10 hover:border-podcast-yellow/50 transition-all duration-300 overflow-hidden"
                style={{ borderRadius: '1rem' }}
              >
                <CardContent className="p-0 relative">
                  <AspectRatio ratio={1} className="overflow-hidden">
                    {episode.imageUrl && (
                      <img
                        src={episode.imageUrl}
                        alt={decodeHtml(episode.title)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 hover:scale-110"
                      />
                    )}
                  </AspectRatio>
                  {episode.audioUrl && (
                    <>
                      <audio
                        ref={el => (audioRefs.current[index] = el)}
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
                  <div className="p-6">
                    <h3
                      className="text-3xl font-bold mb-3 text-podcast-yellow"
                      style={{
                        transform: 'scaleX(1.2)',
                        transformOrigin: 'center',
                      }}
                    >
                      {decodeHtml(episode.title)}
                    </h3>
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
