
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
    description: "סיפור היציאה מהארון של צחי - הרגע המכונן שעיצב את המשפחה שלנו מחדש, ושבאופן מסוים הוביל גם להחלטה להקליט את הפודקאסט שלנו.",
    links: {
      spotify: "https://open.spotify.com/episode/7JwXyGiwuNKIDf7K2Ql8h7?si=k8cYKC-SR0KJFhQkfkAg3g",
      youtube: "https://www.youtube.com/watch?v=E_N46UmlvpI",
      apple: "https://podcasts.apple.com/us/podcast/%D7%97%D7%95%D7%A1%D7%A8-%D7%AA%D7%A7%D7%95%D7%95%D7%94-%D7%90%D7%91%D7%9C-%D7%91%D7%A2%D7%A6%D7%9D-%D7%93%D7%99%D7%91%D7%A8%D7%A0%D7%95-%D7%A2%D7%9C-%D7%99%D7%A6%D7%99%D7%90%D7%94-%D7%9E%D7%94%D7%90%D7%A8%D7%95%D7%9F/id1728358395?i=1000703704686"
    },
    imageUrl: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_episode/40378400/40378400-1745085957161-162c3719af97d.jpg"
  },
  {
    title: "גבורה, אבל בעצם דיברנו על איך להציל את עצמי",
    description: "פרק מאזינות מיוחד - חמש מאזינות סיפרו את סיפור הגבורה האישי שלהן.",
    links: {
      spotify: "https://open.spotify.com/episode/2gxt1hu1Jh3z2HKltTScWP?si=C2oYXGyYSvClgFVeJADXHQ",
      youtube: "https://www.youtube.com/watch?v=-pR_-UlKEh0",
      apple: "https://podcasts.apple.com/us/podcast/%D7%92%D7%91%D7%95%D7%A8%D7%94-%D7%90%D7%91%D7%9C-%D7%91%D7%A2%D7%A6%D7%9D-%D7%93%D7%99%D7%91%D7%A8%D7%A0%D7%95-%D7%A2%D7%9C-%D7%90%D7%99%D7%9A-%D7%9C%D7%94%D7%A6%D7%99%D7%9C-%D7%90%D7%AA-%D7%A2%D7%A6%D7%9E%D7%99/id1728358395?i=1000681635168"
    },
    imageUrl: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/40378400/40378400-1728145139144-71eff87bfd383.jpg"
  },
  {
    title: "אבל, אבל בעצם דיברנו על האבל הפרטי שלנו",
    description: "סיפור הקשר שלנו עם בן דודה שלנו, אביתר, שנהרג בצוק איתן. על הדיסוננס בין האבל הפרטי לאבל הציבורי, ואיך המוות שלו השפיע על כל אחד מבני המשפחה.",
    links: {
      spotify: "https://open.spotify.com/episode/0S4JmDWDphqIgvEaxPzsmN?si=nzRNqNMHShCp4_QNgzqMOA",
      youtube: "https://www.youtube.com/watch?v=ZMeVAO3qccM",
      apple: "https://podcasts.apple.com/us/podcast/%D7%90%D7%91%D7%9C-%D7%90%D7%91%D7%9C-%D7%91%D7%A2%D7%A6%D7%9D-%D7%93%D7%99%D7%91%D7%A8%D7%A0%D7%95-%D7%A2%D7%9C-%D7%94%D7%90%D7%91%D7%9C-%D7%94%D7%A4%D7%A8%D7%98%D7%99-%D7%A9%D7%9C%D7%A0%D7%95/id1728358395?i=1000654893822"
    },
    imageUrl: "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/40378400/40378400-1728145139144-71eff87bfd383.jpg"
  }
];

const BestEpisodes = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-podcast-magenta mb-4">פרקים מומלצים</h2>
          <p className="text-white/80 text-lg">האזינו לפרקים שאהובים עלינו במיוחד</p>
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
