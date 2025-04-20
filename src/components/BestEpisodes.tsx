import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  SiSpotify, 
  SiYoutube, 
  SiApplepodcasts 
} from "react-icons/si";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaPlay, FaPause } from "react-icons/fa";

interface BestEpisode {
  title: string;
  description: string;
  audioLink: string;
  links: {
    spotify?: string;
    youtube?: string;
    apple?: string;
  };
  imageUrl: string;
}

const bestEpisodes: BestEpisode[] = [
  {
    title: "חוסר תקווה, אבל בעצם דיברנו על יציאה מהארון",
    description: "סיפור היציאה מהארון של צחי...",
    audioLink: "https://yourcdn.com/audio/episode1.mp3", // <-- replace with RSS MP3 link
    links: {
      spotify: "https://open.spotify.com/episode/7JwXyGiwuNKIDf7K2Ql8h7?si=k8cYKC-SR0KJFhQkfkAg3g",
      youtube: "https://www.youtube.com/watch?v=E_N46UmlvpI",
      apple: "https://podcasts.apple.com/us/podcast/..."
    },
    imageUrl: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_episode/40378400/40378400-1745085957161-162c3719af97d.jpg"
  },
  {
    title: "גבורה, אבל בעצם דיברנו על איך להציל את עצמי",
    description: "פרק מאזינות מיוחד...",
    audioLink: "https://yourcdn.com/audio/episode2.mp3", // <-- replace with RSS MP3 link
    links: {
      spotify: "https://open.spotify.com/episode/2gxt1hu1Jh3z2HKltTScWP?si=C2oYXGyYSvClgFVeJADXHQ",
      youtube: "https://www.youtube.com/watch?v=-pR_-UlKEh0",
      apple: "https://podcasts.apple.com/us/podcast/..."
    },
    imageUrl: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/40378400/40378400-1728145139144-71eff87bfd383.jpg"
  },
  // Add more episodes...
];

const BestEpisodes = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);

  const togglePlay = (index: number) => {
    const
