
import React from 'react';
import { Button } from "@/components/ui/button";
import { AppleIcon, YoutubeIcon, RadioIcon, RssIcon, MusicIcon, Headphones } from 'lucide-react';

const PodcastPlatforms = () => {
  const platforms = [
    {
      name: "ספוטיפיי",
      link: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ",
      icon: <MusicIcon className="h-5 w-5" /> // Using MusicIcon instead of Spotify
    },
    {
      name: "אפל פודקאסט",
      link: "#", // Replace with actual link
      icon: <AppleIcon className="h-5 w-5" />
    },
    {
      name: "יוטיוב",
      link: "#", // Replace with actual link
      icon: <YoutubeIcon className="h-5 w-5" />
    },
    {
      name: "גוגל פודקאסט",
      link: "#", // Replace with actual link
      icon: <RadioIcon className="h-5 w-5" />
    },
    {
      name: "קסטבוקס",
      link: "#", // Replace with actual link
      icon: <Headphones className="h-5 w-5" />
    },
    {
      name: "פוקאט קאסט",
      link: "#", // Replace with actual link
      icon: <Headphones className="h-5 w-5" />
    },
    {
      name: "אנקור",
      link: "https://anchor.fm/s/f1452300/podcast/rss",
      icon: <RadioIcon className="h-5 w-5" />
    },
    {
      name: "Apple Music",
      link: "#", // Replace with actual link
      icon: <MusicIcon className="h-5 w-5" />
    },
    {
      name: "iHeart",
      link: "#", // Replace with actual link
      icon: <Headphones className="h-5 w-5" />
    },
    {
      name: "RSS",
      link: "https://anchor.fm/s/f1452300/podcast/rss",
      icon: <RssIcon className="h-5 w-5" />
    }
  ];

  return (
    <section id="platforms" className="py-16 bg-black/10">
      <div className="container px-6">
        <h2 className="text-4xl md:text-5xl mb-10 text-center">האזינו לנו בפלטפורמות</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {platforms.map((platform) => (
            <a 
              key={platform.name} 
              href={platform.link}
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <Button 
                variant="outline" 
                className="w-full h-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border-podcast-yellow/30 hover:border-podcast-yellow transition-all py-6 flex flex-col gap-3"
              >
                {platform.icon}
                <span>{platform.name}</span>
              </Button>
            </a>
          ))}
        </div>
        
        <div className="mt-8 text-center text-white/70">
          <p>חסרה פלטפורמה שאתם משתמשים בה? ספרו לנו ונוסיף אותה!</p>
        </div>
      </div>
    </section>
  );
};

export default PodcastPlatforms;
