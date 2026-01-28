'use client';

import React, { useRef, useState, useMemo } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchRssFeed } from 'utils/rssParser';
import { Card, CardContent } from "../../components/ui/card";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { FaPlay, FaPause, FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";
import Link from 'next/link';
import { GetStaticProps } from "next";

import mappingData from "../../utils/episode-mapping.json"; 

const SITE_URL = "https://achotihayafa.com";
const SOCIAL_IMAGE = "https://achotihayafa.com/opengraph.png";

/**
 * --- UTILITIES ---
 */
function decodeHtml(html: string): string {
  if (typeof window !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  }
  return html.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"').replace(/'/g, "'");
}

function stripHtml(html: string): string {
  return html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/ /g, ' ');
}

const getSlugByTitle = (title: string): string => {
  const decoded = decodeHtml(title);
  return (mappingData.titleToSlug as Record<string, string>)[decoded] || encodeURIComponent(decoded);
};

type Episode = {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  audioUrl: string;
  imageUrl: string;
  season?: string;
  episodeNumber?: string;
};

const AllEpisodes = ({ episodes }: { episodes: Episode[] }) => {
  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEpisodes = useMemo(() => {
    return episodes.filter(ep => {
      const searchTarget = (ep.title + ep.description).toLowerCase();
      return searchTarget.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, episodes]);

  const groupedEpisodes = useMemo(() => {
    const groups: Record<string, Episode[]> = {};
    filteredEpisodes.forEach(ep => {
      const s = ep.season || "כללי";
      if (!groups[s]) groups[s] = [];
      groups[s].push(ep);
    });
    return Object.entries(groups).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [filteredEpisodes]);

  const allSeasons = useMemo(() => {
    const seasons = new Set<string>();
    episodes.forEach(ep => { seasons.add(ep.season || "כללי"); });
    return Array.from(seasons).sort((a, b) => Number(b) - Number(a));
  }, [episodes]);

  const togglePlay = (index: number) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;
    if (playingIndex === index && !currentAudio.paused) {
      currentAudio.pause();
      setPlayingIndex(null);
    } else {
      audioRefs.current.forEach((audio, i) => { if (i !== index && audio) audio.pause(); });
      currentAudio.play();
      setPlayingIndex(index);
    }
  };

  const canonicalUrl = `${SITE_URL}/episodes`;

  // Integrated the specific Schema provided
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "name": "אחותי היפה",
    "description": "פודקאסט רגשי וקווירי בעברית – שיחות על רגשות, שייכות, משפחה וזהות מינית עם האחים צחי ויהונתן כהן.",
    "url": "https://achotihayafa.com/",
    "image": "https://achotihayafa.com/cover.jpg",
    "inLanguage": "he",
    "isAccessibleForFree": true,
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
    ],
    "webFeed": "https://anchor.fm/s/f1452300/podcast/rss",
    "potentialAction": {
      "@type": "ListenAction",
      "target": [
        "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw",
        "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395",
        "https://www.youtube.com/@AchotiHaYafa",
        "https://podcastaddict.com/podcast/%D7%90%D7%97%D7%95%D7%AA%D7%99%20%D7%94%D7%99%D7%A4%D7%94/5306867",
        "https://pca.st/zapd6uv9"
      ]
    }
  };

  return (
    <>
      <Head>
        <title>ארכיון הפרקים המלא | אחותי היפה - פודקאסט להט״ב ורגשות</title>
        <meta name="description" content="כל פרקי הפודקאסט 'אחותי היפה' במקום אחד. חיפוש חופשי לפי רגשות, עונות ונושאים: גאווה, זהות, זוגיות, ומשפחה. האזינו עכשיו לשיחות של צחי ויהונתן כהן." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="אחותי היפה - ארכיון הפרקים המלא" />
        <meta property="og:description" content="חיפוש ודפדוף בכל פרקי הפודקאסט אחותי היפה לפי עונות ונושאים." />
        <meta property="og:image" content={SOCIAL_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="אחותי היפה - ארכיון הפרקים" />
        <meta name="twitter:description" content="האזינו לכל הפרקים של אחותי היפה - פודקאסט על רגשות וזהות." />
        <meta name="twitter:image" content={SOCIAL_IMAGE} />

        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-black text-white" dir="rtl">
        <Navbar />

        <main className="pt-32 pb-20 container px-6">
          <header className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-podcast-yellow mb-6">
              ארכיון הפרקים המלא של אחותי היפה
            </h1>
            
            <div className="relative max-w-2xl mx-auto mt-10">
              <label htmlFor="episode-search" className="sr-only">חפשו פרק, רגש או נושא</label>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-podcast-yellow">
                <FaSearch aria-hidden="true" />
              </div>
              <input
                id="episode-search"
                type="text"
                placeholder="חפשו פרק, רגש או נושא..."
                className="w-full bg-podcast-darkgray/50 border border-white/20 rounded-full py-4 pr-12 pl-6 text-white focus:outline-none focus:border-podcast-yellow transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {searchTerm === '' && (
              <nav className="flex flex-wrap justify-center gap-2 mt-8" aria-label="ניווט מהיר בין עונות">
                {allSeasons.map(season => (
                  <a key={season} href={`#season-${season}`} className="px-4 py-2 bg-podcast-darkgray/50 border border-white/20 rounded-full text-white hover:bg-podcast-yellow hover:text-black transition-all">
                    {season === "כללי" ? "פרקים מיוחדים" : `עונה ${season}`}
                  </a>
                ))}
              </nav>
            )}

            {searchTerm === '' && (
              <section className="mt-16 bg-podcast-darkgray/20 border border-white/10 rounded-lg p-8 max-w-5xl mx-auto text-right">
                <p className="text-lg text-white/90 leading-relaxed mb-8">
                  ברוכים הבאים למאגר השיחות המלא של <strong>"אחותי היפה"</strong> – הפודקאסט שבו רגשות וזהות נפגשים. כאן תוכלו למצוא את כל הפרקים שבהם האחים הגאים צחי ויהונתן כהן צוללים לעומק החוויה הלהטב"קית בישראל.
                </p>
                <h2 className="text-3xl font-bold text-podcast-yellow mb-4">חפשו פרקים לפי נושאים, רגשות או עונות</h2>
                <p className="text-base text-white/80 leading-relaxed mb-8">
                  בין אם אלו סיפורים על התבגרות להטב"קית, על התמודדות עם דחייה, או פשוט שיחה כנה על מה שקורה לנו בפנים – כל הפרקים מחכים כאן.
                </p>
                <h2 className="text-3xl font-bold text-podcast-yellow mb-4">מה תמצאו בארכיון?</h2>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-podcast-yellow" aria-hidden="true">•</span>
                    <p className="text-base"><strong>שיחות על רגשות</strong>: פרקים ממוקדים על נושאים כמו בושה, אומץ וקנאה בהשראת ברנה בראון.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-podcast-yellow" aria-hidden="true">•</span>
                    <p className="text-base"><strong>זהות להטב"קית</strong>: מבט עמוק על החיים בקהילה הגאה בישראל.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-podcast-yellow" aria-hidden="true">•</span>
                    <p className="text-base"><strong>סיפורים משפחתיים</strong>: מערכת היחסים המיוחדת בין אחים גאים והדינמיקה המשפחתית.</p>
                  </li>
                </ul>
              </section>
            )}
          </header>

          {groupedEpisodes.length > 0 ? (
            groupedEpisodes.map(([season, seasonEpisodes]) => (
              <section key={season} id={`season-${season}`} className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-3xl font-bold text-podcast-magenta whitespace-nowrap">
                    {season === "כללי" ? "פרקים מיוחדים" : `עונה ${season}`}
                  </h2>
                  <div className="h-px bg-gradient-to-l from-podcast-magenta/50 to-transparent w-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {seasonEpisodes.map((episode) => {
                    const globalIdx = episodes.indexOf(episode);
                    const slug = getSlugByTitle(episode.title);

                    return (
                      <Card key={episode.id} className="bg-podcast-darkgray/30 border border-white/10 group hover:border-podcast-yellow transition-all flex flex-col overflow-hidden">
                        <CardContent className="p-0 flex flex-col h-full">
                          <AspectRatio ratio={1} className="overflow-hidden relative">
                            <Link href={`/episodes/${slug}`}>
                              <img 
                                src={episode.imageUrl} 
                                alt={`עטיפת פרק: ${decodeHtml(episode.title)}`} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                loading="lazy"
                              />
                            </Link>
                            {episode.audioUrl && (
                              <button 
                                onClick={() => togglePlay(globalIdx)} 
                                className="absolute bottom-4 left-4 bg-podcast-yellow rounded-full p-3 text-black z-10 hover:scale-110 transition-transform shadow-lg"
                                aria-label={playingIndex === globalIdx ? "הפסק נגינה" : "הפעל נגינה"}
                              >
                                {playingIndex === globalIdx ? <FaPause /> : <FaPlay />}
                                <audio ref={el => { audioRefs.current[globalIdx] = el; }} src={episode.audioUrl} preload="none" />
                              </button>
                            )}
                          </AspectRatio>

                          <div className="p-6 flex flex-col flex-grow text-right">
                            <div className="text-xs text-white/50 mb-2 font-assistant">
                              {episode.season ? `עונה ${episode.season} | פרק ${episode.episodeNumber}` : ''}
                            </div>
                            
                            <div className="flex-grow">
                              <h3 className="text-3xl font-bold mb-3 text-podcast-yellow group-hover:text-white transition-colors">
                                <Link href={`/episodes/${slug}`}>{decodeHtml(episode.title)}</Link>
                              </h3>
                            </div>
                            
                            <p className="text-white/70 text-sm line-clamp-3 mb-6">
                              {stripHtml(decodeHtml(episode.description))}
                            </p>

                            <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5 text-xs text-white/70">
                              <span className="flex items-center gap-1">
                                <FaCalendarAlt className="text-podcast-yellow" aria-hidden="true" /> {episode.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaClock className="text-podcast-yellow" aria-hidden="true" /> {episode.duration}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-white/50 mb-4">לא מצאנו פרקים שתואמים את החיפוש...</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="text-podcast-yellow hover:underline"
              >
               ניקוי החיפוש והצגת כל הפרקים
              </button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AllEpisodes;

export const getStaticProps: GetStaticProps = async () => {
  const episodes = await fetchRssFeed();
  return { props: { episodes } };
};