import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRssFeed } from "@/utils/rssParser";
import { Helmet } from "react-helmet-async";
import { FaPlay, FaPause, FaCalendarAlt, FaClock } from "react-icons/fa";
import { SiSpotify, SiYoutube, SiApplepodcasts } from "react-icons/si";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const decodeHtml = (html: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
};

const formatDescriptionAsHtml = (raw: string) => {
  const decoded = decodeHtml(raw)
    .replace(/<(?!br\b)[^>]*>/gi, '')
    .replace(/&nbsp;/g, ' ');

  const linked = decoded.replace(
    /https?:\/\/[^\s<]+/g,
    (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-podcast-yellow underline break-words">${url}</a>`
  );

  return linked;
};

const EpisodeDetail = () => {
  const { id } = useParams();
  const { data: episodes, isLoading } = useQuery({
    queryKey: ['episodes'],
    queryFn: fetchRssFeed
  });

  const episode = episodes?.find(e => e.id === id);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  if (isLoading) {
    return <div className="text-center text-white py-20">טוען פרק...</div>;
  }

  if (!episode) {
    return <div className="text-center text-white py-20">הפרק לא נמצא.</div>;
  }

  return (
    <>
      <Helmet>
        <title>{decodeHtml(episode.title)} | אחותי היפה</title>
        <meta name="description" content={decodeHtml(episode.description).slice(0, 160)} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={decodeHtml(episode.title)} />
        <meta property="og:description" content={decodeHtml(episode.description)} />
        <meta property="og:image" content={episode.imageUrl} />
        <meta property="og:image:alt" content={`עטיפת הפרק - ${decodeHtml(episode.title)}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://achotihayafa.github.io/website/episodes/${episode.id}`} />

        {/* Canonical Link */}
        <link rel="canonical" href={`https://achotihayafa.github.io/website/episodes/${episode.id}`} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={decodeHtml(episode.title)} />
        <meta name="twitter:description" content={decodeHtml(episode.description)} />
        <meta name="twitter:image" content={episode.imageUrl} />

        {/* PodcastEpisode Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PodcastEpisode",
            "name": decodeHtml(episode.title),
            "description": decodeHtml(episode.description),
            "datePublished": episode.date,
            "associatedMedia": {
              "@type": "MediaObject",
              "contentUrl": episode.audioUrl
            },
            "partOfSeries": {
              "@type": "PodcastSeries",
              "name": "אחותי היפה",
              "url": "https://achotihayafa.github.io/"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="pt-32 pb-20">
          <div className="container px-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              
              {/* Right: Image + Play + Platforms */}
              <div className="w-full md:w-1/3">
                <AspectRatio ratio={1} className="overflow-hidden rounded-xl relative">
                  <img
                    src={episode.imageUrl}
                    alt={decodeHtml(episode.title)}
                    className="w-full h-full object-cover"
                  />
                  {episode.audioUrl && (
                    <>
                      <audio ref={(el) => (audioRef.current = el)} src={episode.audioUrl} preload="none" />
                      <button
                        onClick={handlePlay}
                        className="absolute bottom-4 left-4 bg-podcast-yellow rounded-full p-3 text-black hover:bg-black hover:text-podcast-yellow transition-colors z-10"
                        aria-label={playing ? "הפסק פרק" : "הפעל פרק"}
                      >
                        {playing ? <FaPause size={16} /> : <FaPlay size={16} />}
                      </button>
                    </>
                  )}
                </AspectRatio>

                {/* Platforms under the picture */}
                <div className="flex gap-6 justify-center mt-8">
                  <a
                    href="https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-podcast-yellow transition-colors"
                    aria-label="האזינו ב-Spotify"
                  >
                    <SiSpotify size={36} />
                  </a>
                  <a
                    href="https://www.youtube.com/@AchotiHaYafa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-podcast-yellow transition-colors"
                    aria-label="האזינו ב-YouTube"
                  >
                    <SiYoutube size={36} />
                  </a>
                  <a
                    href="https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-podcast-yellow transition-colors"
                    aria-label="האזינו ב-Apple Podcasts"
                  >
                    <SiApplepodcasts size={36} />
                  </a>
                </div>
              </div>

              {/* Left: Text */}
              <div className="w-full md:w-2/3">
                <h1 className="text-4xl font-bold text-podcast-yellow mb-4">{decodeHtml(episode.title)}</h1>

                <div className="flex gap-6 text-white/70 mb-4 text-sm">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt /> {episode.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaClock /> {episode.duration}
                  </span>
                </div>

                <div
                  className="text-white/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatDescriptionAsHtml(episode.description) }}
                />
              </div>
            </div>

            {/* CTA to Spotify */}
            <div className="text-center mt-20 mb-10">
              <p className="text-xl text-white/80 mb-6">
                רוצה לא לפספס את הפרק הבא?
              </p>
              <a
                href="https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-podcast-yellow text-black text-lg font-bold px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300 shadow-lg shadow-podcast-yellow/30"
                aria-label="עקבו אחרינו בספוטיפיי"
              >
                <SiSpotify size={24} />
                זה הזמן לעקוב אחרינו בספוטיפיי
              </a>
            </div>


          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default EpisodeDetail;
