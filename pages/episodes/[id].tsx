// pages/episodes/[id].tsx

'use client';

import React, { useRef, useState } from "react";
import Head from 'next/head';
import { fetchRssFeed } from "utils/rssParser";
import { FaPlay, FaPause, FaCalendarAlt, FaClock } from "react-icons/fa";
import { SiSpotify, SiYoutube, SiApplepodcasts } from "react-icons/si";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { Card, CardContent } from "../../components/ui/card";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from 'next/link';

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
  randomEpisodes: Episode[];
};

const EpisodeDetailPage = ({ episode, randomEpisodes }: Props) => {
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
      <EpisodeMeta episode={episode} />

      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="pt-20 pb-20">
        {/* Breadcrumbs */}
        <div className="bg-black">
          <nav className="container px-6 py-4 text-sm text-white/70 mt-5">
            <ol className="flex flex-wrap items-left">
              <li className="flex flex-col">
                <Link href="/" className="hover:text-white">
                  דף הבית
                </Link>
              </li>
              <li className="text-white/50 flex flex-col">&nbsp;&nbsp;/&nbsp;&nbsp;</li>
              <li className="flex flex-col">
                <Link href="/episodes" className="hover:text-white">
                  כל הפרקים
                </Link>
              </li>
              <li className="text-white/50 flex flex-col">&nbsp;&nbsp;/&nbsp;&nbsp;</li>
              <li className="text-white flex flex-col">
                {decodeHtml(episode.title)}
              </li>
            </ol>
          </nav>
        </div>

          <div className="container px-6 max-w-6xl mx-auto">
            <div className="flex flex-row-reverse mb-6">
            </div>
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
                <h1 className="text-4xl text-podcast-yellow mb-4">
                    {episode.season && episode.episodeNumber ? (
                    <>
                      <span className="text-white text-3xl">
                      עונה {episode.season}, פרק {episode.episodeNumber}
                      </span>
                      <br />
                      <span className="text-4xl text-podcast-yellow">
                      {decodeHtml(episode.title)}
                      </span>
                    </>
                    ) : (
                    <span className="text-podcast-yellow">{decodeHtml(episode.title)}</span>
                    )}
                </h1>
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
                className="inline-flex items-center gap-3 bg-podcast-yellow text-black text-lg font-bold px-8 py-3 rounded-md hover:bg-white hover:text-black transition-colors duration-300 shadow-lg shadow-podcast-yellow/30"
                aria-label="עקבו אחרינו בספוטיפיי"
              >
                <SiSpotify size={24} />
                זה הזמן לעקוב אחרינו בספוטיפיי
              </a>
            </div>
          </div>
        </section>
        <div className="container px-6 max-w-6xl mx-auto mt-5">
          <h2 className="text-4xl text-podcast-magenta mb-6 text-center">
            פרקים נוספים שאולי תאהבו
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomEpisodes.map((randomEpisode, index) => (
              <Card
                key={index}
                className="relative bg-podcast-darkgray/30 border border-white/30 group transition-all duration-300 overflow-hidden flex flex-col hover:border-podcast-magenta"
              >
                <CardContent className="p-0 relative flex flex-col h-full">
                  <AspectRatio ratio={1} className="overflow-hidden">
                    {randomEpisode.imageUrl && (
                      <Link href={`/episodes/${randomEpisode.id}`} legacyBehavior>
                        <a>
                          <img
                            src={randomEpisode.imageUrl}
                            alt={decodeHtml(randomEpisode.title)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 hover:scale-110"
                            loading="lazy"
                          />
                        </a>
                      </Link>
                    )}
                  </AspectRatio>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="flex items-center gap-1 text-white/70 text-sm">
                          <FaCalendarAlt className="text-podcast-magenta" /> {randomEpisode.date}
                        </span>
                        <span className="flex items-center gap-1 text-white/70 text-sm">
                          <FaClock className="text-podcast-magenta" /> {randomEpisode.duration}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold mb-3 text-podcast-magenta">
                        <Link href={`/episodes/${randomEpisode.id}`} legacyBehavior>
                          <a>{decodeHtml(randomEpisode.title)}</a>
                        </Link>
                      </h3>
                      <p className="text-white/80 mb-6 line-clamp-3">
                        {stripHtml(randomEpisode.description)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      {/* Podcast About Section */}
      <section className="py-16 bg-gradient-to-b from-black via-podcast-magenta/10 to-black mt-16">
        <div className="container px-6 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Podcast Cover */}
            <a
              href="https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw"
              target="_blank"
              rel="noopener noreferrer"
              className="block flex-shrink-0 group"
              title="האזינו בספוטיפיי"
            >
              <img
                src="/cover.jpg"
                alt='עטיפת הפודקאסט "אחותי היפה"'
                className="w-40 h-40 md:w-48 md:h-48 rounded-xl shadow-lg group-hover:scale-105 transition-transform"
              />
            </a>
            {/* Podcast About Text */}
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

// --- Server-side Metadata Rendering ---

import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const episodes = await fetchRssFeed();
  const paths = episodes
    .map((e: Episode) => {
      // Ensure id is always a string and matches the RSS id extraction logic
      let id: unknown = e.id;
      if (typeof id === 'object' && id !== null) {
        const obj = id as Record<string, unknown>;
        if ('_' in obj) id = obj._ as string;
        else if ('$' in obj) id = obj.$ as string;
        else id = String(id);
      }
      return { params: { id: String(id) } };
    })
    .filter(Boolean);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const episodes = await fetchRssFeed();
  let id: unknown = context.params?.id;

  if (typeof id === 'object' && id !== null) {
    const obj = id as Record<string, unknown>;
    if ('_' in obj) id = obj._ as string;
    else if ('$' in obj) id = obj.$ as string;
    else id = String(id);
  }

  const episode = episodes.find((e: Episode) => {
    let eid: unknown = e.id;
    if (typeof eid === 'object' && eid !== null) {
      const obj = eid as Record<string, unknown>;
      if ('_' in obj) eid = obj._ as string;
      else if ('$' in obj) eid = obj.$ as string;
      else eid = String(eid);
    }
    return String(eid) === String(id);
  });

  if (!episode) {
    return { notFound: true };
  }

  // Pick 3 random episodes (excluding current)
  const filtered = episodes.filter((e: Episode) => {
    let eid: unknown = e.id;
    if (typeof eid === 'object' && eid !== null) {
      const obj = eid as Record<string, unknown>;
      if ('_' in obj) eid = obj._ as string;
      else if ('$' in obj) eid = obj.$ as string;
      else eid = String(eid);
    }
    return String(eid) !== String(id);
  });
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  const randomEpisodes = shuffled.slice(0, 3);

  return {
    props: {
      episode,
      randomEpisodes,
    },
  };
};

function EpisodeMeta({ episode }: { episode: Episode }) {
  // These helpers are safe to use here
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://achotihayafa.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Episodes",
        "item": "https://achotihayafa.com/episodes"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": decodeHtml(episode.title),
        "item": `https://achotihayafa.com/episodes/${episode.id}`
      }
    ]
  };

  return (
    <Head>
      <title>{decodeHtml(episode.title)} | אחותי היפה</title>
      <meta name="description" content={stripHtml(episode.description).slice(0, 160)} />
      <meta property="og:title" content={`${decodeHtml(episode.title)} | אחותי היפה – פודקאסט על רגשות, אבל בעצם פודקאסט להטב"קי`} />
      <meta property="og:description" content={stripHtml(episode.description)} />
      <meta property="og:image" content={episode.imageUrl} />
      <meta property="og:image:alt" content={`עטיפת הפרק - ${decodeHtml(episode.title)}`} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://achotihayafa.com/episodes/${episode.id}`} />
      <link rel="canonical" href={`https://achotihayafa.com/episodes/${episode.id}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${decodeHtml(episode.title)} | אחותי היפה – פודקאסט על רגשות, אבל בעצם פודקאסט להטב"קי`} />
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </Head>
  );
}

function decodeHtml(html: string): string {
  if (typeof window !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  } else {
    // Fallback for server-side rendering
    return html.replace(/&amp;/g, "&")
               .replace(/&lt;/g, "<")
               .replace(/&gt;/g, ">")
               .replace(/&quot;/g, '"')
               .replace(/&#039;/g, "'");;
  }
}

// Update the stripHtml function to handle server-side rendering
function stripHtml(html: string): string {
  if (typeof window !== "undefined") {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  } else {
    // Fallback for server-side rendering
    return html.replace(/<[^>]+>/g, '');
  }
}

function formatDescriptionAsHtml(raw: string): string {
  const decoded = decodeHtml(raw).replace(/&nbsp;/g, ' ');

  // Replace <strong>...</strong> with <b> for bold
  const formatted = decoded.replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi, '<b>$1</b>');

  // Remove all tags except <br>, <b>, and </b>
  const sanitized = formatted.replace(/<(?!br\s*\/?>|\/?b>)(\/?[\w-]+)[^>]*>/gi, '');

  // Convert URLs to clickable links
  return sanitized.replace(
    /((?:https?:\/\/[^\s<]+))/g,
    (match) => `<a href="${match}" target="_blank" rel="noopener noreferrer" class="text-podcast-yellow underline break-words">${match}</a>`
  );
}
