// pages/episodes/[id].tsx

'use client';

import React, { useRef, useState } from "react";
import Head from 'next/head'; // Use Next.js Head
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchRssFeed } from "utils/rssParser";
import { FaPlay, FaPause, FaCalendarAlt, FaClock } from "react-icons/fa";
import { SiSpotify, SiYoutube, SiApplepodcasts } from "react-icons/si";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

const decodeHtml = (html: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
};

const formatDescriptionAsHtml = (raw: string) => {
  // Decode HTML entities
  let decoded = decodeHtml(raw).replace(/&nbsp;/g, ' ');

  // Replace <strong>...</strong> with <b> for bold (avoiding <span>)
  decoded = decoded.replace(
    /<strong\b[^>]*>([\s\S]*?)<\/strong>/gi,
    '<b>$1</b>'
  );

  // Remove all tags except <br>, <b>, and </b>
  decoded = decoded.replace(
    /<(?!br\s*\/?>|\/?b>)(\/?[\w-]+)[^>]*>/gi,
    ''
  );

  // Convert links, but only outside of HTML tags
  decoded = decoded.replace(
    /((?:^|[>\s])(?:https?:\/\/[^\s<]+))/g,
    (match, url) => {
      const prefix = url.match(/^[>\s]/) ? url[0] : '';
      const cleanUrl = prefix ? url.slice(1) : url;
      return `${prefix}<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-podcast-yellow underline break-words">${cleanUrl}</a>`;
    }
  );

  return decoded;
};

const EpisodeDetailPage = (props: { notFound?: boolean }) => {
  const router = useRouter();
  const { id } = router.query;

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
    if (typeof window !== "undefined") {
      window.location.href = "/404";
      return null;
    }
    return null;
  }

  if (props.notFound) {
    if (typeof window !== "undefined") {
      // Client-side navigation fallback
      window.location.href = "/404";
    }
    return null;
  }

  return (
    <>
      <Head>
        <title>{decodeHtml(episode.title)} | אחותי היפה</title>
        <meta name="description" content={decodeHtml(episode.description).slice(0, 160)} />
        <meta property="og:title" content={decodeHtml(episode.title)} />
        <meta property="og:description" content={stripHtml(episode.description)} />
        <meta property="og:image" content={episode.imageUrl} />
        <meta property="og:image:alt" content={`עטיפת הפרק - ${decodeHtml(episode.title)}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://achotihayafa.com/episodes/${episode.id}`} />
        <link rel="canonical" href={`https://achotihayafa.com/episodes/${episode.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={decodeHtml(episode.title)} />
        <meta name="twitter:description" content={stripHtml(episode.description)} />
        <meta name="twitter:image" content={episode.imageUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PodcastEpisode",
            "name": decodeHtml(episode.title),
            "description": stripHtml(episode.description),
            "datePublished": episode.date,
            "associatedMedia": {
              "@type": "MediaObject",
              "contentUrl": episode.audioUrl
            },
            "partOfSeries": {
              "@type": "PodcastSeries",
              "name": "אחותי היפה",
              "url": "https://achotihayafa.com/"
            }
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="pt-32 pb-20">
          <div className="container px-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-1/3">
                <AspectRatio ratio={1} className="overflow-hidden rounded-xl relative">
                  <img
                    src={episode.imageUrl}
                    alt={decodeHtml(episode.title)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {episode.audioUrl && (
                    <>
                      <audio ref={audioRef} src={episode.audioUrl} preload="none" />
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

import { NextPageContext } from 'next';

EpisodeDetailPage.getInitialProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query;
  // Import fetchRssFeed dynamically to avoid SSR issues
  const { fetchRssFeed } = await import("../../utils/rssParser");
  const episodes = await fetchRssFeed();
  const episode = episodes?.find(e => e.id === id);
  if (!episode) {
    if (ctx.res) {
      ctx.res.statusCode = 404;
    }
    return { notFound: true };
  }
  return {};
};

export default EpisodeDetailPage;
