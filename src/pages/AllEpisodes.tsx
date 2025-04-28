import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchRssFeed } from '@/utils/rssParser';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SiSpotify, SiYoutube, SiApplepodcasts } from "react-icons/si";
import { FaPlay, FaPause, FaCalendarAlt, FaClock } from "react-icons/fa";
import { Link } from 'react-router-dom';

// Utility to decode HTML entities
function decodeHtml(html: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

// Utility to strip HTML and convert <br> to space
function stripHtmlAndBr(html: string): string {
  const decoded = decodeHtml(html);
  return decoded
    .replace(/<br\s*\/?>/gi, ' ')  // Convert <br> to space
    .replace(/<[^>]+>/g, '')       // Remove all other tags
    .trim();
}

const PODCAST_LINKS = {
  spotify: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw",
  youtube: "https://www.youtube.com/@AchotiHaYafa",
  apple: "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395"
};

const AllEpisodes = () => {
  const { data: episodes, isLoading, error } = useQuery({
    queryKey: ['episodes'],
    queryFn: fetchRssFeed,
  });

  const audioRefs = React.useRef<Array<HTMLAudioElement | null>>([]);
  const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);

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

  const generateJsonLd = () => {
    if (!episodes || episodes.length === 0) return null;

    const podcastData = {
      "@context": "https://schema.org",
      "@type": "PodcastSeries",
      "name": "אחותי היפה",
      "description": "פודקאסט על רגשות אבל בעצם פודקאסט להטב\"קי",
      "url": "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9",
      "image": episodes[0]?.imageUrl,
      "author": {
        "@type": "Person",
        "name": "צחי כהן ויהונתן זיני"
      },
      "webFeed": "https://anchor.fm/s/f1452300/podcast/rss",
      "episode": episodes.map((episode, index) => ({
        "@type": "PodcastEpisode",
        "position": index + 1,
        "name": decodeHtml(episode.title),
        "description": stripHtmlAndBr(episode.description),
        "datePublished": episode.date,
        "duration": episode.duration,
        "url": episode.audioUrl,
        "associatedMedia": {
          "@type": "MediaObject",
          "contentUrl": episode.audioUrl
        }
      }))
    };

    return JSON.stringify(podcastData);
  };

  React.useEffect(() => {
    document.title = 'כל הפרקים - אחותי היפה | פודקאסט על רגשות אבל בעצם פודקאסט להטב\"קי';

    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', "כל פרקי הפודקאסט אחותי היפה - פודקאסט על רגשות אבל בעצם פודקאסט להטב״קי");

    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', "אחותי היפה, פודקאסט, להטב, גאווה, רגשות, צחי כהן, יהונתן כהן");

    let ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (!ogTitleMeta) {
      ogTitleMeta = document.createElement('meta');
      ogTitleMeta.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleMeta);
    }
    ogTitleMeta.setAttribute('content', "כל הפרקים - אחותי היפה");

    let ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (!ogDescMeta) {
      ogDescMeta = document.createElement('meta');
      ogDescMeta.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescMeta);
    }
    ogDescMeta.setAttribute('content', "כל פרקי הפודקאסט אחותי היפה - פודקאסט על רגשות אבל בעצם פודקאסט להטב״קי");

    let ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (!ogTypeMeta) {
      ogTypeMeta = document.createElement('meta');
      ogTypeMeta.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeMeta);
    }
    ogTypeMeta.setAttribute('content', "website");

    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    if (episodes && episodes.length > 0) {
      jsonLdScript.textContent = generateJsonLd();
    }

    return () => {
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script) script.remove();
    };
  }, [episodes]);

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 bg-black">
          <div className="container px-6">
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-podcast-yellow mb-6 text-center">
                כל הפרקים
              </h1>
              <p className="text-white/80 text-lg text-center mb-10">
                האזינו לכל פרקי הפודקאסט אחותי היפה
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <span className="animate-spin text-white text-2xl">⏳</span>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-white text-xl">אירעה שגיאה בטעינת הפרקים. נסו שוב מאוחר יותר.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {episodes?.map((episode, index) => (
                  <Card
                    key={index}
                    className="relative bg-podcast-darkgray/30 border-white/10 hover:border-podcast-yellow/50 transition-all duration-300 overflow-hidden group"
                    style={{ borderRadius: "1rem" }}
                  >
                    <CardContent className="p-0 relative">
                      <AspectRatio ratio={1} className="overflow-hidden">
                        {episode.imageUrl && (
                          <Link to={`/episodes/${episode.id}`}>
                            <img
                              src={episode.imageUrl}
                              alt={decodeHtml(episode.title)}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </Link>
                        )}
                      </AspectRatio>
                      {episode.audioUrl && (
                        <>
                          <audio
                            ref={(el) => (audioRefs.current[index] = el)}
                            src={episode.audioUrl}
                            preload="none"
                          />
                          <button
                            onClick={() => togglePlay(index)}
                            className="absolute bottom-4 left-4 bg-podcast-yellow rounded-full p-3 text-black hover:bg-black hover:text-podcast-yellow transition-colors z-10"
                            aria-label={playingIndex === index ? "הפסק פרק" : "הפעל פרק"}
                          >
                            {playingIndex === index ? <FaPause size={16} /> : <FaPlay size={16} />}
                          </button>
                        </>
                      )}
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <span className="flex items-center gap-1 text-white/70 text-sm">
                            <FaCalendarAlt className="text-podcast-yellow" /> {episode.date}
                          </span>
                          <span className="flex items-center gap-1 text-white/70 text-sm">
                            <FaClock className="text-podcast-yellow" /> {episode.duration}
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold mb-3 text-podcast-yellow">
                          <Link to={`/episodes/${episode.id}`} className="hover:underline">
                            {decodeHtml(episode.title)}
                          </Link>
                        </h3>
                        <p className="text-white/80 mb-6 line-clamp-3">
                          {stripHtmlAndBr(episode.description)}
                        </p>
                        <div className="flex gap-4">
                          <a href={PODCAST_LINKS.spotify} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-podcast-yellow transition-colors" aria-label="האזינו ב-Spotify">
                            <SiSpotify size={24} />
                          </a>
                          <a href={PODCAST_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-podcast-yellow transition-colors" aria-label="האזינו ב-YouTube">
                            <SiYoutube size={24} />
                          </a>
                          <a href={PODCAST_LINKS.apple} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-podcast-yellow transition-colors" aria-label="האזינו ב-Apple Podcasts">
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
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AllEpisodes;
