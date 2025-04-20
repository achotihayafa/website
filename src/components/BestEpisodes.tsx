
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Music2, Youtube, Apple } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BestEpisode {
  title: string;
  description: string;
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
    description: "סיפור היציאה מהארון של צחי - הרגע המכונן שעיצב את המשפחה שלנו מחדש, ושבאופן מסוים הוביל גם להחלטה להקליט את הפודקאסט שלנו..",
    links: {
      spotify: "https://open.spotify.com/episode/7JwXyGiwuNKIDf7K2Ql8h7?si=k8cYKC-SR0KJFhQkfkAg3g",
      youtube: "https://www.youtube.com/watch?v=E_N46UmlvpI",
      apple: "https://podcasts.apple.com/episode/1"
    },
    imageUrl: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_episode/40378400/40378400-1745085957161-162c3719af97d.jpg"
  },
  {
    title: "זהות מגדרית בעולם המודרני",
    description: "דיון עמוק על משמעות המגדר בימינו, סטריאוטיפים חברתיים והדרך לקבלה עצמית.",
    links: {
      spotify: "https://open.spotify.com/episode/2",
      youtube: "https://youtube.com/watch?v=2",
      apple: "https://podcasts.apple.com/episode/2"
    },
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
  },
  {
    title: "אהבה, זוגיות ומה שביניהם",
    description: "שיחה כנה על מערכות יחסים בקהילה הגאה, אתגרים ייחודיים והדרך למציאת אהבה.",
    links: {
      spotify: "https://open.spotify.com/episode/3",
      youtube: "https://youtube.com/watch?v=3",
      apple: "https://podcasts.apple.com/episode/3"
    },
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
  }
];

const BestEpisodes = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-podcast-magenta mb-4">פרקים מומלצים</h2>
          <p className="text-white/80 text-lg">הפרקים האהובים עלינו במיוחד</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestEpisodes.map((episode, index) => (
            <Card key={index} className="bg-podcast-darkgray/30 border-white/10 hover:border-podcast-magenta/50 transition-all duration-300">
              <CardContent className="p-0">
                <AspectRatio ratio={1}>
                  <img 
                    src={episode.imageUrl} 
                    alt={episode.title} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-podcast-yellow">{episode.title}</h3>
                  <p className="text-white/70 mb-6 line-clamp-3">{episode.description}</p>
                  
                  <div className="flex gap-4">
                    {episode.links.spotify && (
                      <a 
                        href={episode.links.spotify} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-podcast-yellow transition-colors"
                        aria-label="האזינו ב-Spotify"
                      >
                        <Music2 size={24} />
                      </a>
                    )}
                    {episode.links.youtube && (
                      <a 
                        href={episode.links.youtube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-podcast-magenta transition-colors"
                        aria-label="האזינו ב-YouTube"
                      >
                        <Youtube size={24} />
                      </a>
                    )}
                    {episode.links.apple && (
                      <a 
                        href={episode.links.apple} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors"
                        aria-label="האזינו ב-Apple Podcasts"
                      >
                        <Apple size={24} />
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
