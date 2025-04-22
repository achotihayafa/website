import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { SiSpotify, SiYoutube, SiApplepodcasts } from "react-icons/si";
import { Mic } from 'lucide-react'; 
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQuery } from '@tanstack/react-query';
import { fetchRssFeed } from '@/utils/rssParser';
import { FaPlay, FaPause } from "react-icons/fa";

// Utility to decode HTML entities
function decodeHtml(html: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
}

// Platform main links
const PODCAST_LINKS = {
  spotify: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9",
  youtube: "https://www.youtube.com/@AchotiHaYafa",
  apple: "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395",
};

const LatestEpisodes = () => {
  const { data: episodes, isLoading, error } = useQuery({
    queryKey: ['episodes'],
    queryFn: fetchRssFeed,
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

  return (
    <section id="latest" className="py-20 bg-black text-center">
      <div className="container px-6">
        <div className="mb-12 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-podcast-yellow flex items-center justify-center mb-4">
            <Mic className="text-podcast-black" size={28} />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-podcast-yellow mb-4">
            פרקים אחרונים
          </h2>
          <p className="text-white/80 text-lg">
            האזינו לשיחות האחרונות שלנו
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="animate-spin text-white text-2xl">⏳</span>
