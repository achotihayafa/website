import React, { useRef, useState } from 'react';
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
  links: {
    spotify?: string;
    youtube?: string;
    apple?: string;
    file?: string; // Add direct audio file link if available
  };
  imageUrl: string;
}

const bestEpisodes: BestEpisode[] = [
  {
    title: "חוסר תקווה, אבל בעצם דיברנו על יציאה מהארון",
    description: "סיפור היציאה מהארון של צחי - הרגע המכונן שעיצב את המשפחה שלנו מחדש, ושבאופן מסוים הוביל גם להחלטה להקליט את הפודקאסט שלנו.",
    links: {
      file: "https://anchor.fm/s/f1452300/podcast/play/101238073/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-3-13%2F398331935-44100-2-268f9ea872e3.m4a", 
      spotify: "https://open.spotify.com/episode/7JwXyGiwuNKIDf7K2Ql8h7?si=k8cYKC-SR0KJFhQkfkAg3g",
      youtube: "https://www.youtube.com/watch?v=E_N46UmlvpI",
      apple: "https://podcasts.apple.com/us/podcast/.../id1728358395?i=1000703704686"
    },
    imageUrl: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_episode/40378400/40378400-1745085957161-162c3719af97d.jpg"
  },
  {
    title: "גבורה, אבל בעצם דיברנו על איך להציל את עצמי",
    description: "פרק מאזינות מיוחד - חמש מאזינות סיפרו את סיפור הגבורה האישי שלהן.",
    links: {
      file: "https://anchor.fm/s/f1452300/episodes/ep-e31g1rt/a-bbc123.mp3",
      spotify: "https://open.spotify.com/episode/2gxt1hu1Jh3z2HKltTScWP?si=C2oYXGyYSvClgFVeJADXHQ",
      youtube: "https://www.youtube.com/watch?v=-pR_-UlKEh0",
      apple: "https://podcasts.apple.com/us/podcast/.../id1728358395?i=1000681635168"
    },
    imageUrl: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/40378400/40378400-1728145139144-71eff87bfd383.jpg"
  },
  {
    title: "אבל, אבל בעצם דיברנו על האבל הפרטי שלנו",
    description: "סיפור הקשר שלנו עם בן דודה שלנו, אביתר, שנהרג בצוק איתן. על הדיסוננס בין האבל הפרטי לאבל הציבורי, ואיך המוות שלו השפיע על כל אחד מבני המשפחה.",
    links: {
      file: "https://anchor.fm/s/f1452300/episodes/ep-e31g1ru/a-ccc123.mp3",
      spotify: "https://open.spotify.com/episode/0S4JmDWDphqIgvEaxPzsmN?si=nzRNqNMHShCp4_QNgzqMOA",
      youtube: "https://www.youtube.com/watch?v=ZMeVAO3qccM",
      apple: "https://podcasts.apple.com/us/podcast/.../id1728358395?i=1000654893822"
    },
    imageUrl: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/40378400/40378400-1728145139144-71eff87bfd383.jpg"
  }
];

const BestEpisodes = () => {
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

  return (
    <section id="best" className="py-20 bg-black">
      <div className="container px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font text-podcast-magenta mb-4">פרקים מומלצים</h2>
          <p className="text-white/80 text-lg">האזינו לפרקים שאהובים עלינו במיוחד</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestEpisodes.map((episode, index) => (
            <Card key={index} className="relative bg-podcast-darkgray/30 border-white/10 hover:border-podcast-magenta/50 transition-all duration-300">
              <CardContent className="p-0">
                <AspectRatio ratio={1}>
                  <img 
                    src={episode.imageUrl} 
                    alt={episode.title} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>

                {/* Audio + Play Button */}
                {episode.links.file && (
                  <>
                    <audio
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={episode.links.file}
                    />
                    <button
                      onClick={() => togglePlay(index)}
                      className="absolute bottom-4 left-4 bg-black/70 rounded-full p-2 text-white hover:bg-podcast-magenta transition-colors"
                      aria-label="הפעל פרק"
                    >
                      {playingIndex === index ? <FaPause /> : <FaPlay />}
                    </button>
                  </>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font mb-3 text-podcast-yellow">{episode.title}</h3>
                  <p className="text-white/80 mb-6 line-clamp-3">{episode.description}</p>
                  
                  <div className="flex gap-4">
                    {episode.links.spotify && (
                      <a 
                        href={episode.links.spotify} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-podcast-magenta transition-colors"
                        aria-label="האזינו ב-Spotify"
                      >
                        <SiSpotify size={24} />
                      </a>
                    )}
                    {episode.links.youtube && (
                      <a 
                        href={episode.links.youtube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-podcast-magenta transition-colors"
                        aria-label="האזינו ב-YouTube"
                      >
                        <SiYoutube size={24} />
                      </a>
                    )}
                    {episode.links.apple && (
                      <a 
                        href={episode.links.apple} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-podcast-magenta transition-colors"
                        aria-label="האזינו ב-Apple Podcasts"
                      >
                        <SiApplepodcasts size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestEpisodes;
