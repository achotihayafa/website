
import React from 'react';
import { AppleIcon, YoutubeIcon, RadioIcon, RssIcon, MusicIcon, Headphones } from 'lucide-react';

const PodcastPlatforms = () => {
  const platforms = [
    {
      name: "ספוטיפיי",
      link: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9",
      icon: <MusicIcon className="h-8 w-8" />
    },
    {
      name: "אפל פודקאסט",
      link: "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395",
      icon: <AppleIcon className="h-8 w-8" />
    },
    {
      name: "יוטיוב",
      link: "https://www.youtube.com/@AchotiHaYafa",
      icon: <YoutubeIcon className="h-8 w-8" />
    },
    {
      name: "פודקאסט אדיקט",
      link: "https://podcastaddict.com/podcast/%D7%90%D7%97%D7%95%D7%AA%D7%99%20%D7%94%D7%99%D7%A4%D7%94/5306867",
      icon: <RadioIcon className="h-8 w-8" />
    },
    {
      name: "פוקאט קאסט",
      link: "https://pca.st/zapd6uv9",
      icon: <Headphones className="h-8 w-8" />
    },
    {
      name: "אנקור",
      link: "https://anchor.fm/s/f1452300/podcast/rss",
      icon: <RadioIcon className="h-8 w-8" />
    },
    {
      name: "RSS",
      link: "https://anchor.fm/s/f1452300/podcast/rss",
      icon: <RssIcon className="h-8 w-8" />
    }
  ];

  return (
    <section id="platforms" className="py-16 bg-black/10">
      <div className="container px-6">
        <h2 className="text-4xl md:text-5xl mb-10 text-center">האזינו לנו בפלטפורמות</h2>
        
        <div className="grid grid-cols-4 md:grid-cols-7 gap-8 max-w-3xl mx-auto">
          {platforms.map((platform) => (
            <a 
              key={platform.name} 
              href={platform.link}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-center hover:text-podcast-yellow transition-colors"
              title={platform.name}
            >
              {platform.icon}
              <span className="text-sm">{platform.name}</span>
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
