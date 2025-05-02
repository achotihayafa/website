import React, { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useQuery } from '@tanstack/react-query';
import { fetchRssFeed } from 'utils/rssParser';
import { Card, CardContent } from "../../components/ui/card";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { SiSpotify, SiYoutube, SiApplepodcasts } from "react-icons/si";
import { FaPlay, FaPause, FaCalendarAlt, FaClock } from "react-icons/fa";
import Link from 'next/link';

const PODCAST_LINKS = {
  spotify: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw",
  youtube: "https://www.youtube.com/@AchotiHaYafa",
  apple: "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395"
};

const decodeHtmlAndRemoveStrong = (html: string): string => {
  const decoded = html
    .replace(/&quot;/g, '"') // Decode HTML entities
    .replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi, '$1'); // Remove <strong> tags
  return decoded.replace(/<[^>]+>/g, ''); // Remove any remaining HTML tags
};

const AllEpisodes = () => {
  const { data: episodes, isLoading, error } = useQuery({
    queryKey: ['episodes'],
    queryFn: fetchRssFeed
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

  useEffect(() => {
    return () => {
      audioRefs.current.forEach(audio => audio && audio.pause());
    };
  }, []);

  // Breadcrumb JSON-LD for SEO
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
      }
    ]
  };

  return (
    <>
      <Head>
        <title>כל הפרקים - אחותי היפה | פודקאסט על רגשות אבל בעצם פודקאסט להטב"קי</title>
        <meta name="description" content='כל פרקי הפודקאסט "אחותי היפה" – שיחות על רגשות, זהות, משפחה וחיים קוויריים. בהנחיית האחים הגאים צחי ויהונתן כהן. בכל פרק רגש חדש.' />
        <meta name="keywords" content="אחותי היפה, פודקאסט, להטב, גאווה, רגשות, פודקסט קווירי, פודקאסט על רגשות, פודקאסט גאה בעברית, ברנה בראון, צחי כהן, יהונתן כהן" />
        <meta property="og:title" content="כל פרקי הפודקאסט אחותי היפה - פודקאסט על רגשות אבל בעצם פודקאסט להטב״קי" />
        <meta property="og:description" content='כל פרקי הפודקאסט "אחותי היפה" – שיחות על רגשות, זהות, משפחה וחיים קוויריים. בהנחיית האחים הגאים צחי ויהונתן כהן. בכל פרק רגש חדש.' />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/opengraph.png" />
        <meta property="og:image:alt" content="אחותי היפה" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/opengraph.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>

      <div className="min-h-screen">
        <Navbar />

        {/* Breadcrumbs */}
        <section className="pt-20 pb-1">
          <div className="bg-black">
            <nav className="container px-6 py-4 text-sm text-white/70 mt-5">
              <ol className="flex items-center">
                <li>
                  <Link href="/" className="hover:text-white">
                    דף הבית
                  </Link>
                </li>
                <li className="text-white/50">&nbsp;&nbsp;/&nbsp;&nbsp;</li>
                <li className="text-white">כל הפרקים</li>
              </ol>
            </nav>
          </div>
        </section>

        <div className="pt-1 pb-20 bg-black">
          <div className="container px-6">
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-podcast-yellow mb-6 text-center">
                כל הרגשות – כל הפרקים
              </h1>
              <p className="text-white/80 text-lg text-center mb-10">
                שיחות מלב אל לב של האחים הגאים צחי ויהונתן כהן – על אהבה, פחד, שייכות, ויציאה מהארון
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
                    className="relative bg-podcast-darkgray/30 border border-white/30 group transition-all duration-300 overflow-hidden flex flex-col hover:border-podcast-yellow"
                  >
                    <CardContent className="p-0 relative flex flex-col h-full">
                      <AspectRatio ratio={1} className="overflow-hidden">
                        {episode.imageUrl ? (
                          <Link href={`/episodes/${episode.id}`}>
                            <img
                              src={episode.imageUrl}
                              alt={episode.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 hover:scale-110"
                              loading="lazy"
                            />
                          </Link>
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-500">No Image Available</span>
                          </div>
                        )}
                      </AspectRatio>

                      {episode.audioUrl && (
                        <>
                          <audio
                            ref={el => { audioRefs.current[index] = el; }}
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

                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="flex items-center gap-1 text-white/70 text-sm">
                              <FaCalendarAlt className="text-podcast-yellow" /> {episode.date}
                            </span>
                            <span className="flex items-center gap-1 text-white/70 text-sm">
                              <FaClock className="text-podcast-yellow" /> {episode.duration}
                            </span>
                          </div>
                          <h3 className="text-3xl font-bold mb-3 text-podcast-yellow">
                            <Link href={`/episodes/${episode.id}`}>
                              {episode.title}
                            </Link>
                          </h3>
                          <p className="text-white/80 mb-6 line-clamp-3">
                            {decodeHtmlAndRemoveStrong(episode.description)}
                          </p>
                        </div>
                        <div className="flex gap-4 mt-auto">
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
        <Footer />
      </div>
    </>
  );
};

export default AllEpisodes;
