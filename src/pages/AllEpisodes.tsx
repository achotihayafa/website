
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRssFeed } from '@/utils/rssParser';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SiSpotify, SiYoutube, SiApplepodcasts } from "react-icons/si";
import { CalendarDays, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Platform main links for reuse
const PODCAST_LINKS = {
  spotify: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9",
  youtube: "https://www.youtube.com/@AchotiHaYafa",
  apple: "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395",
};

// Utility to decode HTML entities
function decodeHtml(html: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

const AllEpisodes = () => {
  const { data: episodes, isLoading, error } = useQuery({
    queryKey: ['episodes'],
    queryFn: fetchRssFeed,
  });

  // Create JSON-LD schema for the podcast
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "name": "אחותי היפה",
    "description": "פודקאסט על רגשות אבל בעצם פודקאסט להטב״קי",
    "url": "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9",
    "author": {
      "@type": "Person",
      "name": "צחי הלוי ויהונתן גת"
    },
    "episodes": episodes?.map(episode => ({
      "@type": "PodcastEpisode",
      "name": decodeHtml(episode.title),
      "description": decodeHtml(episode.description),
      "datePublished": episode.date,
      "duration": episode.duration,
      "url": episode.audioUrl
    }))
  };

  return (
    <>
      <Helmet>
        <title>כל הפרקים | אחותי היפה - פודקאסט על רגשות אבל בעצם פודקאסט להטב״קי</title>
        <meta name="description" content="האזינו לכל הפרקים של הפודקאסט אחותי היפה - שיחות על זהות מגדרית, מיניות, אהבה וחיים בקהילה הגאה" />
        <meta property="og:title" content="כל הפרקים | אחותי היפה" />
        <meta property="og:description" content="האזינו לכל הפרקים של הפודקאסט אחותי היפה - שיחות על זהות מגדרית, מיניות, אהבה וחיים בקהילה הגאה" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-b from-black to-podcast-magenta pt-32">
        <div className="container px-6 py-20">
          <div className="flex items-center gap-4 mb-12">
            <FileText className="text-podcast-yellow" size={32} />
            <h1 className="text-4xl md:text-5xl text-white">כל הפרקים</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodes?.map((episode, index) => (
                <Card
                  key={index}
                  className="bg-podcast-darkgray/30 border-white/10 hover:border-podcast-yellow/50 transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <AspectRatio ratio={1}>
                      {episode.imageUrl && (
                        <img
                          src={episode.imageUrl}
                          alt={decodeHtml(episode.title)}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </AspectRatio>
                    <div className="p-6">
                      <h2 className="text-2xl text-podcast-yellow mb-3">{decodeHtml(episode.title)}</h2>
                      <p className="text-white/80 mb-4 line-clamp-3">{decodeHtml(episode.description)}</p>
                      
                      {/* Episode metadata */}
                      <div className="flex flex-wrap gap-4 mb-6 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <CalendarDays size={16} />
                          <span>{episode.date}</span>
                        </div>
                        {episode.duration && (
                          <div className="flex items-center gap-1">
                            <FileText size={16} />
                            <span>{episode.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* Platform links */}
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
      </main>

      <Footer />
    </>
  );
};

export default AllEpisodes;
