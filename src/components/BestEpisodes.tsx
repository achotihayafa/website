
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Apple, Spotify, Youtube } from "lucide-react";

interface BestEpisode {
  title: string;
  description: string;
  links: {
    spotify?: string;
    youtube?: string;
    apple?: string;
  }
}

const bestEpisodes: BestEpisode[] = [
  {
    title: "מה הסיפור של הקהילה הגאה בישראל",
    description: "שיחה מרתקת על ההיסטוריה והתפתחות הקהילה הגאה בישראל, מה השתנה ומה עוד צריך להשתנות.",
    links: {
      spotify: "https://open.spotify.com/episode/1",
      youtube: "https://youtube.com/watch?v=1",
      apple: "https://podcasts.apple.com/episode/1"
    }
  },
  {
    title: "זהות מגדרית בעולם המודרני",
    description: "דיון עמוק על משמעות המגדר בימינו, סטריאוטיפים חברתיים והדרך לקבלה עצמית.",
    links: {
      spotify: "https://open.spotify.com/episode/2",
      youtube: "https://youtube.com/watch?v=2",
      apple: "https://podcasts.apple.com/episode/2"
    }
  },
  {
    title: "אהבה, זוגיות ומה שביניהם",
    description: "שיחה כנה על מערכות יחסים בקהילה הגאה, אתגרים ייחודיים והדרך למציאת אהבה.",
    links: {
      spotify: "https://open.spotify.com/episode/3",
      youtube: "https://youtube.com/watch?v=3",
      apple: "https://podcasts.apple.com/episode/3"
    }
  },
  {
    title: "להיות הורה גאה",
    description: "סיפורים אישיים על הורות בקהילה הגאה, האתגרים והשמחות שבדרך.",
    links: {
      spotify: "https://open.spotify.com/episode/4",
      youtube: "https://youtube.com/watch?v=4",
      apple: "https://podcasts.apple.com/episode/4"
    }
  },
  {
    title: "יציאה מהארון בגיל מאוחר",
    description: "שיחה מרגשת על התמודדות עם זהות מינית בגיל מבוגר והשינויים בחיים.",
    links: {
      spotify: "https://open.spotify.com/episode/5",
      youtube: "https://youtube.com/watch?v=5",
      apple: "https://podcasts.apple.com/episode/5"
    }
  },
  {
    title: "אקטיביזם וזכויות להט״ב",
    description: "דיון על המאבק לשוויון זכויות, הישגי העבר והאתגרים שעוד לפנינו.",
    links: {
      spotify: "https://open.spotify.com/episode/6",
      youtube: "https://youtube.com/watch?v=6",
      apple: "https://podcasts.apple.com/episode/6"
    }
  }
];

const BestEpisodes = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">פרקים מומלצים</h2>
          <p className="text-white/80 text-lg">הפרקים האהובים עלינו במיוחד</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestEpisodes.map((episode, index) => (
            <Card key={index} className="bg-card/30 backdrop-blur border-white/10 hover:border-podcast-magenta/50 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 gradient-text">{episode.title}</h3>
                <p className="text-white/70 mb-6 line-clamp-3">{episode.description}</p>
                
                <div className="flex gap-4">
                  {episode.links.spotify && (
                    <a 
                      href={episode.links.spotify} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-podcast-yellow transition-colors"
                      aria-label="האזן ב-Spotify"
                    >
                      <Spotify size={24} />
                    </a>
                  )}
                  {episode.links.youtube && (
                    <a 
                      href={episode.links.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-podcast-magenta transition-colors"
                      aria-label="צפה ב-YouTube"
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
                      aria-label="האזן ב-Apple Podcasts"
                    >
                      <Apple size={24} />
                    </a>
                  )}
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
