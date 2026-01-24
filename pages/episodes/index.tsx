'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchRssFeed } from 'utils/rssParser';
import { Card, CardContent } from "../../components/ui/card";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { SiSpotify, SiYoutube, SiApplepodcasts } from "react-icons/si";
import { FaPlay, FaPause, FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";
import Link from 'next/link';
import { GetStaticProps } from "next";

const PODCAST_LINKS = {
  spotify: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw",
  youtube: "https://www.youtube.com/@AchotiHaYafa",
  apple: "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395"
};

/**
 * UTILS
 */
function slugifyHebrew(text: string): string {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-') 
    .replace(/[^\u0590-\u05FFa-z0-9-]+/g, '') 
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '').replace(/-+$/, '');
}

function decodeHtml(html: string): string {
  if (typeof window !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  }
  return html.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"').replace(/'/g, "'");
}

const stripHtml = (html: string): string => {
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
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

  // 1. Filter Logic
  const filteredEpisodes = useMemo(() => {
    return episodes.filter(ep => {
      const searchTarget = (ep.title + ep.description).toLowerCase();
      return searchTarget.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, episodes]);

  // 2. Grouping Logic (Groups by Season)
  const groupedEpisodes = useMemo(() => {
    const groups: Record<string, Episode[]> = {};
    filteredEpisodes.forEach(ep => {
      const s = ep.season || "כללי";
      if (!groups[s]) groups[s] = [];
      groups[s].push(ep);
    });
    // Sort seasons descending (e.g., Season 2 first)
    return Object.entries(groups).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [filteredEpisodes]);

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

  return (
    <>
      <Head>
        <title>כל הפרקים - אחותי היפה</title>
        <meta name="description" content="חיפוש ודפדוף בכל פרקי הפודקאסט אחותי היפה לפי עונות." />
      </Head>

      <div className="min-h-screen bg-black text-white" dir="rtl">
        <Navbar />

        <main className="pt-24 pb-20 container px-6">
          <header className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-podcast-yellow mb-6">
              כל הרגשות – כל הפרקים
            </h1>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mt-10">
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-podcast-yellow">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="חפשו פרק, רגש או נושא..."
                className="w-full bg-podcast-darkgray/50 border border-white/20 rounded-full py-4 pr-12 pl-6 text-white focus:outline-none focus:border-podcast-yellow transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </header>

          {groupedEpisodes.length > 0 ? (
            groupedEpisodes.map(([season, seasonEpisodes]) => (
              <section key={season} className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-3xl font-bold text-podcast-magenta whitespace-nowrap">
                    {season === "כללי" ? "פרקים מיוחדים" : `עונה ${season}`}
                  </h2>
                  <div className="h-px bg-gradient-to-l from-podcast-magenta/50 to-transparent w-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {seasonEpisodes.map((episode, idx) => {
                    const globalIdx = episodes.indexOf(episode);
                    const slug = slugifyHebrew(decodeHtml(episode.title));

                    return (
                      <Card key={episode.id} className="bg-podcast-darkgray/30 border border-white/10 group hover:border-podcast-yellow transition-all flex flex-col">
                        <CardContent className="p-0 flex flex-col h-full">
                          <AspectRatio ratio={1} className="overflow-hidden relative">
                            <Link href={`/episodes/${slug}`}>
                              <img src={episode.imageUrl} alt={episode.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </Link>
                            {episode.audioUrl && (
                              <button
                                onClick={() => togglePlay(globalIdx)}
                                className="absolute bottom-4 left-4 bg-podcast-yellow rounded-full p-3 text-black hover:scale-110 transition-transform z-10"
                              >
                                {playingIndex === globalIdx ? <FaPause /> : <FaPlay />}
                                <audio ref={el => { audioRefs.current[globalIdx] = el; }} src={episode.audioUrl} preload="none" />
                              </button>
                            )}
                          </AspectRatio>

                          <div className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-between text-xs text-white/50 mb-2 font-mono">
                               <span>עונה {episode.season} | פרק {episode.episodeNumber}</span>
                               <span className="flex items-center gap-1"><FaCalendarAlt /> {episode.date}</span>
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-3 text-podcast-yellow group-hover:text-white transition-colors">
                              <Link href={`/episodes/${slug}`}>{decodeHtml(episode.title)}</Link>
                            </h3>
                            
                            <p className="text-white/70 text-sm line-clamp-3 mb-6">
                              {stripHtml(episode.description)}
                            </p>

                            <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                              <div className="flex gap-3">
                                <a href={PODCAST_LINKS.spotify} className="hover:text-podcast-yellow"><SiSpotify size={20}/></a>
                                <a href={PODCAST_LINKS.youtube} className="hover:text-podcast-yellow"><SiYoutube size={20}/></a>
                              </div>
                              <span className="text-xs text-white/40 flex items-center gap-1"><FaClock /> {episode.duration}</span>
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
              <p className="text-2xl text-white/50">לא מצאנו פרקים שתואמים את החיפוש שלך...</p>
              <button onClick={() => setSearchTerm('')} className="mt-4 text-podcast-yellow underline">נקה חיפוש</button>
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
