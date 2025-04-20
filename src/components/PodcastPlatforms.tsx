import React from 'react';
import { FaSpotify, SiApplepodcasts, FaYoutube, SiPodcastaddict, SiPocketcasts } from 'react-icons/fa';

const PodcastPlatforms = () => {
  const platforms = [
    {
      name: "Spotify",
      link: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9",
      icon: <FaSpotify className="h-8 w-8" />
    },
    {
      name: "Apple Podcasts",
      link: "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395",
      icon: <SiApplepodcasts className="h-8 w-8" />
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com/@AchotiHaYafa",
      icon: <FaYoutube className="h-8 w-8" />
    },
    {
      name: "Podcast Addict",
      link: "https://podcastaddict.com/podcast/%D7%90%D7%97%D7%95%D7%AA%D7%99%20%D7%94%D7%99%D7%A4%D7%94/5306867",
      icon: <SiPodcastaddict className="h-8 w-8" />
    },
    {
      name: "Pocket Casts",
      link: "https://pca.st/zapd6uv9",
      icon: <SiPocketcasts className="h-8 w-8" />
    }
  ];

  return (
    <section id="platforms" className="py-16 bg-black/10">
      <div className="container px-6">
        <h2 className="text-4xl md:text-5xl mb-10 text-center">האזינו לנו</h2>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
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
      </div>
    </section>
  );
};

export default PodcastPlatforms;
