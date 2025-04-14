
import React from 'react';
import { Music } from 'lucide-react';
import EpisodeCard from './EpisodeCard';

const LatestEpisodes = () => {
  const episodes = [
    {
      title: "Finding Joy in Uncertainty: Navigating Life's Transitions",
      description: "In this episode, we discuss how embracing uncertainty can lead to unexpected joy and growth. Our guests share their personal journeys through major life transitions and how they found peace in the unknown.",
      duration: "42 min",
      date: "April 10, 2025",
      spotifyLink: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ",
      featured: true
    },
    {
      title: "Identity & Belonging: Creating Your Own Community",
      description: "We explore the powerful feeling of finding your people and creating spaces where you truly belong. From chosen families to online communities, we look at what makes us feel at home.",
      duration: "38 min",
      date: "April 3, 2025",
      spotifyLink: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ"
    },
    {
      title: "The Healing Power of Vulnerability",
      description: "Can showing our true selves help us heal? We dive into the science and personal stories behind emotional vulnerability and how it can transform our relationships and mental health.",
      duration: "45 min",
      date: "March 27, 2025",
      spotifyLink: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ"
    },
    {
      title: "Pride & Prejudice: Navigating Family Dynamics",
      description: "Family relationships can be complex, especially when navigating different beliefs and values. Our guests share their experiences and strategies for maintaining connections while staying true to themselves.",
      duration: "51 min",
      date: "March 20, 2025",
      spotifyLink: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ"
    },
    {
      title: "The Science of Happiness: What Really Works?",
      description: "We examine the latest research on happiness and wellbeing, separating fact from fiction. Which practices actually contribute to lasting joy, and which are just passing trends?",
      duration: "36 min",
      date: "March 13, 2025",
      spotifyLink: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ"
    }
  ];

  return (
    <section id="episodes" className="py-20 bg-podcast-lightgray">
      <div className="container px-6">
        <div className="flex items-center mb-12">
          <div className="w-12 h-12 rounded-full bg-podcast-yellow flex items-center justify-center mr-4">
            <Music className="text-podcast-darkgray" size={24} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Latest Episodes</h2>
            <p className="text-gray-600">Tune in to our recent conversations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode, index) => (
            <EpisodeCard
              key={index}
              title={episode.title}
              description={episode.description}
              duration={episode.duration}
              date={episode.date}
              spotifyLink={episode.spotifyLink}
              featured={episode.featured}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="#1ED760"/>
              <path d="M16.5 10.915C14.032 9.367 10.376 9.126 8.004 9.764C7.595 9.874 7.168 9.636 7.059 9.227C6.949 8.818 7.187 8.392 7.596 8.282C10.328 7.549 14.399 7.834 17.245 9.619C17.608 9.827 17.729 10.295 17.521 10.658C17.314 11.021 16.845 11.142 16.482 10.934L16.5 10.915ZM16.408 13.131C16.224 13.435 15.836 13.534 15.532 13.35C13.441 12.066 10.664 11.631 8.324 12.331C7.984 12.432 7.626 12.236 7.525 11.896C7.424 11.556 7.621 11.198 7.961 11.097C10.684 10.285 13.822 10.775 16.218 12.255C16.522 12.439 16.621 12.827 16.437 13.131H16.408ZM15.279 15.257C15.133 15.499 14.825 15.579 14.583 15.433C12.745 14.321 10.687 14.019 7.86 14.573C7.585 14.628 7.323 14.453 7.268 14.178C7.213 13.903 7.388 13.641 7.663 13.586C10.759 12.979 13.062 13.332 15.119 14.578C15.36 14.724 15.425 15.016 15.279 15.257Z" fill="white"/>
            </svg>
            View all episodes on Spotify
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestEpisodes;
