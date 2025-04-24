import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRssFeed } from "@/utils/rssParser";
import { Helmet } from "react-helmet";
import { FaPlay, FaPause, FaCalendarAlt, FaClock } from "react-icons/fa";
import React, { useRef, useState } from "react";

const decodeHtml = (html: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
};

const EpisodeDetail = () => {
  const { id } = useParams(); // ep-e2ua8gv
  const { data: episodes, isLoading } = useQuery({
    queryKey: ['episodes'],
    queryFn: fetchRssFeed
  });

  const episode = episodes?.find(e => e.id === id);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  if (isLoading) {
    return <div className="text-center text-white py-20">טוען פרק...</div>;
  }

  if (!episode) {
    return <div className="text-center text-white py-20">הפרק לא נמצא.</div>;
  }

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
      <Helmet>
        <title>{decodeHtml(episode.title)} | אחותי היפה</title>
        <meta name="description" content={decodeHtml(episode.description).slice(0, 160)} />
        <meta property="og:title" content={decodeHtml(episode.title)} />
        <meta property="og:description" content={decodeHtml(episode.description)} />
        <meta property="og:image" content={episode.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://achotihayafa.github.io/website/episodes/${episode.id}`} />
        <link rel="canonical" href={`https://achotihayafa.github.io/website/episodes/${episode.id}`} />
      </Helmet>

      <section className="min-h-screen bg-black text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <img src={episode.imageUrl} alt={decodeHtml(episode.title)} className="w-full rounded-2xl mb-8 shadow-lg" />
          <h1 className="text-4xl font-bold text-podcast-yellow mb-4">{decodeHtml(episode.title)}</h1>

          <div className="flex gap-6 text-white/70 mb-4">
            <span className="flex items-center gap-2">
              <FaCalendarAlt /> {episode.date}
            </span>
            <span className="flex items-center gap-2">
              <FaClock /> {episode.duration}
            </span>
          </div>

          <p className="text-white/90 mb-8 whitespace-pre-wrap">{decodeHtml(episode.description)}</p>

          {episode.audioUrl && (
            <div className="mb-8">
              <audio ref={audioRef} src={episode.audioUrl} controls={false} />
              <button
                onClick={handlePlay}
                className="bg-podcast-yellow text-black px-6 py-2 rounded-full font-bold hover:bg-podcast-yellow/90 transition-colors"
              >
                {playing ? <FaPause className="inline-block mr-2" /> : <FaPlay className="inline-block mr-2" />}
                {playing ? 'הפסק' : 'האזן'}
              </button>
            </div>
          )}

          {episode.spotifyLink && (
            <a
              href={episode.spotifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-podcast-yellow underline"
            >
              האזן לפרק ב-Spotify
            </a>
          )}
        </div>
      </section>
    </>
  );
};

export default EpisodeDetail;
