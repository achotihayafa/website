import React from 'react';
import {
  SiSpotify,
  SiApplepodcasts,
  SiYoutube,
  SiPodcastaddict,
  SiPocketcasts
} from 'react-icons/si';
import { motion } from 'framer-motion';

const PodcastPlatforms = () => {
  const platforms = [
    {
      name: 'Spotify',
      link: 'https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9',
      icon: <SiSpotify className="h-10 w-10" />
    },
    {
      name: 'Apple Podcasts',
      link: 'https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395',
      icon: <SiApplepodcasts className="h-10 w-10" />
    },
    {
      name: 'YouTube',
      link: 'https://www.youtube.com/@AchotiHaYafa',
      icon: <SiYoutube className="h-10 w-10" />
    },
    {
      name: 'Podcast Addict',
      link: 'https://podcastaddict.com/podcast/%D7%90%D7%97%D7%95%D7%AA%D7%99%20%D7%94%D7%99%D7%A4%D7%94/5306867',
      icon: <SiPodcastaddict className="h-10 w-10" />
    },
    {
      name: 'Pocket Casts',
      link: 'https://pca.st/zapd6uv9',
      icon: <SiPocketcasts className="h-10 w-10" />
    }
  ];

  return (
    <section id="platforms" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-podcast-magenta/10 to-black"></div>

      {/* Main content */}
      <div className="container px-6 relative z-10">

        <div className="flex justify-center mb-6">
          <h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-podcast-yellow to-white bg-clip-text text-transparent text-center transform scale-x-110 origin-center inline-block"
          >
            האזינו לנו עכשיו בכל הפלטפורמות
          </h2>
        </div>


        <p className="text-center text-lg text-white/80 max-w-2xl mx-auto mb-12">
          הפודקאסט "אחותי היפה" זמין בכל פלטפורמות הפודקאסטים המובילות.
          בואו להאזין לנו ולהצטרף למסע המרגש שלנו.
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {platforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 text-center bg-white/5 rounded-xl hover:bg-podcast-yellow/10 hover:scale-105 transition-all duration-300"
                title={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(252, 254, 20, 0.3)'
                }}
              >
                <div className="text-podcast-yellow mb-2">
                  {platform.icon}
                </div>
                <span className="text-sm font-medium">{platform.name}</span>
              </motion
