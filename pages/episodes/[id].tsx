'use client';

import React, { useRef, useState } from "react";
import Head from 'next/head';
import { fetchRssFeed } from "utils/rssParser";
// Import the mapping JSON directly
import mappingData from "../../utils/episode-mapping.json"; 
import { FaPlay, FaPause, FaCalendarAlt, FaClock } from "react-icons/fa";
import { SiSpotify, SiYoutube, SiApplepodcasts } from "react-icons/si";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { Card, CardContent } from "../../components/ui/card";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from "next";

// Global constant for absolute URLs
const SITE_URL = "https://achotihayafa.com";

type Episode = {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  imageUrl: string;
  audioUrl: string;
  season?: string;
  episodeNumber?: string;
};

type Props = {
  episode: Episode;
  randomEpisodes: (Episode & { slug: string })[];
  currentSlug: string;
};

/** * --- UTILITIES ---
 */
function decodeHtml(html: string): string {
  if (typeof window !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  } else {
    return html
      .replace(/"/g, '"')
      .replace(/&/g, '&')
      .replace(/'/g, "'")
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/ /g, ' ');
  }
}

function stripHtml(html: string): string {
  if (typeof window !== "undefined") {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  } else {
    return html.replace(/<[^>]+>/g, '');
  }
}

function formatDescriptionAsHtml(raw: string): string {
  const decoded = decodeHtml(raw).replace(/\s+/g, ' ');
  let formatted = decoded
    .replace(/\s*(בין השורות:)\s*/, '<h2 class="text-3xl text-podcast-yellow font-bold">$1</h2>')
    .replace(/\s*(הפניות:)\s*/, '<h2 class="text-3xl text-podcast-yellow font-bold">$1</h2>');
  formatted = formatted.replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi, '<b>$1</b>');
  const sanitized = formatted.replace(/<(?!br\s*\/?>|\/?b>|\/?h2[^>]*>)(\/?[\w-]+)[^>]*>/gi, '');

  return sanitized.replace(
    /((?:https?:\/\/[^\s<]+))/g,
    (match) => `<a href="${match}" target="_blank" rel="noopener noreferrer" class="text-podcast-yellow underline break-words">${match}</a>`
  );
}

// Helper to get slug from title for links
const getSlugByTitle = (title: string): string => {
  const decoded = decodeHtml(title);
  return (mappingData.episodes.find(ep => ep.hebTitle === decoded)?.slug) || encodeURIComponent(decoded);
};

const EpisodeDetailPage = ({ episode, randomEpisodes, currentSlug }: Props) => {
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

  return (
    <>
      <EpisodeMeta episode={episode} slug={currentSlug} />

      <div className="min-h-screen bg-black text-white" dir="rtl">
        <Navbar />

        <section className="pt-20 pb-20">
          <div className="bg-black">
            <nav className="container px-6 py-4 text-sm text-white/70 mt-5" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-left">
                <li><Link href="/" className="hover:text-white">דף הבית</Link></li>
                <li className="text-white/50 px-2">/</li>
                <li><Link href="/episodes" className="hover:text-white">כל הפרקים</Link></li>
                <li className="text-white/50 px-2">/</li>
                <li className="text-white font-bold">{decodeHtml(episode.title)}</li>
              </ol>
            </nav>
          </div>

          <div className="container px-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-1/3">
                <AspectRatio ratio={1} className="overflow-hidden rounded-xl relative">
                  <img
                    src={episode.imageUrl}
                    alt={decodeHtml(episode.title)}
                    className="w-full h-full object-cover"
                    loading="eager"
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
                  <a href="https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw" className="text-white hover:text-podcast-yellow transition-colors" aria-label="Spotify"><SiSpotify size={36} /></a>
                  <a href="https://www.youtube.com/@AchotiHaYafa" className="text-white hover:text-podcast-yellow transition-colors" aria-label="YouTube"><SiYoutube size={36} /></a>
                  <a href="https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395" className="text-white hover:text-podcast-yellow transition-colors" aria-label="Apple Podcasts"><SiApplepodcasts size={36} /></a>
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <header>
                  <h1 className="text-4xl text-podcast-yellow mb-4">
                    {episode.season && episode.episodeNumber ? (
                      <>
                        <span className="text-white text-3xl">עונה {episode.season}, פרק {episode.episodeNumber}</span>
                        <br />
                        <span className="text-4xl text-podcast-yellow">{decodeHtml(episode.title)}</span>
                      </>
                    ) : (
                      <span className="text-podcast-yellow">{decodeHtml(episode.title)}</span>
                    )}
                  </h1>
                  <div className="flex gap-6 text-white/70 mb-4 text-sm">
                    <span className="flex items-center gap-2"><FaCalendarAlt /> {episode.date}</span>
                    <span className="flex items-center gap-2"><FaClock /> {episode.duration}</span>
                  </div>
                </header>
                <div 
                  className="text-white/90 leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatDescriptionAsHtml(episode.description) }} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Suggestions Section */}
        <div className="container px-6 max-w-6xl mx-auto mt-5">
          <h2 className="text-4xl text-podcast-magenta mb-6 text-center">פרקים נוספים שאולי תאהבו</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomEpisodes.map((randomEpisode, index) => (
              <Card key={index} className="relative bg-podcast-darkgray/30 border border-white/30 group transition-all duration-300 overflow-hidden flex flex-col hover:border-podcast-magenta">
                <CardContent className="p-0 relative flex flex-col h-full">
                  <AspectRatio ratio={1} className="overflow-hidden">
                    <Link href={`/episodes/${randomEpisode.slug}`} className="block w-full h-full">
                      <img 
                        src={randomEpisode.imageUrl} 
                        alt={decodeHtml(randomEpisode.title)} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        loading="lazy" 
                      />
                    </Link>
                  </AspectRatio>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="flex items-center gap-1 text-white/70 text-sm">
                        <FaCalendarAlt className="text-podcast-magenta" /> {randomEpisode.date}
                      </span>
                      <span className="flex items-center gap-1 text-white/70 text-sm">
                        <FaClock className="text-podcast-magenta" /> {randomEpisode.duration}
                      </span>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-3xl font-bold mb-3 text-podcast-magenta transition-colors duration-300 group-hover:text-white">
                        <Link href={`/episodes/${randomEpisode.slug}`}>
                          {decodeHtml(randomEpisode.title)}
                        </Link>
                      </h3>
                    </div>

                    <div>
                      <p className="text-white/80 text-sm mb-1 line-clamp-3">
                        {stripHtml(randomEpisode.description)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <section className="py-16 bg-gradient-to-b from-black via-podcast-magenta/10 to-black mt-16">
          <div className="container px-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <a href="https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw" target="_blank" rel="noopener noreferrer" className="block flex-shrink-0 group">
                <img src="/cover.jpg" alt='עטיפת הפודקאסט "אחותי היפה"' className="w-40 h-40 md:w-48 md:h-48 rounded-xl shadow-lg group-hover:scale-105 transition-transform" />
              </a>
              <div className="text-center md:text-right flex-1">
                <h2 className="text-4xl md:text-4xl mb-4 text-podcast-magenta">על הפודקאסט</h2>
                <p className="text-lg text-white/80 mb-2">
                  "אחותי היפה" הוא פודקאסט על רגשות, זהות ולהטב"קיות, דרך שיחות עומק אינטימיות וכנות. בכל פרק אנחנו – צחי ויהונתן כהן, אחים כבר יותר משלושים שנה – בוחרים רגש מתוך הספר "Atlas of the Heart" של ברנה בראון, וצוללים אל תוך זיכרונות, חוויות, וסיפורים אישיים. בין ילדות בבית דתי, דייטים מביכים, וחיפוש אחר משמעות – אנחנו מנסים להבין מה באמת עובר עלינו בפנים. בכל פרק אנחנו מנסות להביא מבט אישי, חד ומרגש על קנאה, גאווה, וכאב. "אחותי היפה" הוא לא רק פודקאסט – הוא הזמנה לפתוח את הלב ולהרגיש.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default EpisodeDetailPage;

/**
 * ENHANCED SEO COMPONENT
 */
function EpisodeMeta({ episode, slug }: { episode: Episode; slug: string }) {
  const decodedTitle = decodeHtml(episode.title);
  const plainDesc = stripHtml(episode.description).slice(0, 160);
  const fullUrl = `${SITE_URL}/episodes/${slug}`;
  const SOCIAL_IMAGE = "https://achotihayafa.com/opengraph.png";

  // Structured Data (JSON-LD) - Syncing with your main PodcastSeries schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": decodedTitle,
    "description": plainDesc,
    "datePublished": episode.date,
    "timeRequired": episode.duration, // Standard schema uses timeRequired for duration
    "url": fullUrl,
    "image": episode.imageUrl || SOCIAL_IMAGE,
    "associatedMedia": {
      "@type": "MediaObject",
      "contentUrl": episode.audioUrl
    },
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": "אחותי היפה",
      "description": "פודקאסט רגשי וקווירי בעברית – שיחות על רגשות, שייכות, משפחה וזהות מינית עם האחים צחי ויהונתן כהן.",
      "url": "https://achotihayafa.com/",
      "image": "https://achotihayafa.com/cover.jpg",
      "inLanguage": "he",
      "author": {
        "@type": "Person",
        "name": "צחי כהן ויהונתן כהן"
      },
      "sameAs": [
        "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw",
        "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395",
        "https://www.youtube.com/@AchotiHaYafa",
        "https://podcastaddict.com/podcast/%D7%90%D7%97%D7%95%D7%AA%D7%99%20%D7%94%D7%99%D7%A4%D7%94/5306867",
        "https://pca.st/zapd6uv9",
        "https://www.instagram.com/achotihayafa"
      ]
    }
  };

  return (
    <Head>
      <title>{`${decodedTitle} | אחותי היפה`}</title>
      <meta name="description" content={plainDesc} />
      
      {/* Facebook / Open Graph */}
      <meta property="og:type" content="video.episode" /> 
      <meta property="og:title" content={`${decodedTitle} | הפודקאסט אחותי היפה`} />
      <meta property="og:description" content={plainDesc} />
      <meta property="og:image" content={episode.imageUrl || SOCIAL_IMAGE} />
      <meta property="og:url" content={fullUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={decodedTitle} />
      <meta name="twitter:description" content={plainDesc} />
      <meta name="twitter:image" content={episode.imageUrl || SOCIAL_IMAGE} />

      <link rel="canonical" href={fullUrl} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mappingData.episodes.map((ep) => ({
    params: { id: ep.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const paramSlug = context.params?.id as string;
  
  const hebTitle = (mappingData.episodes.find(ep => ep.slug === paramSlug)?.hebTitle);

  if (!hebTitle) return { notFound: true };

  const episodes = await fetchRssFeed();
  const episode = episodes.find((e: Episode) => decodeHtml(e.title) === hebTitle);

  if (!episode) return { notFound: true };

  const randomEpisodes = episodes
    .filter((e: Episode) => e.id !== episode.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((e: Episode) => ({
      ...e,
      slug: getSlugByTitle(e.title)
    }));

  return { 
    props: { 
      episode, 
      randomEpisodes,
      currentSlug: paramSlug 
    } 
  };
};
