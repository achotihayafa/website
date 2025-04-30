import React from 'react';
import {
  SiSpotify,
  SiApplepodcasts,
  SiYoutube,
  SiPodcastaddict,
  SiPocketcasts,
  SiCastbox
} from 'react-icons/si';
import { motion } from 'framer-motion';
import { Headphones, Mic2, Heart, Play } from 'lucide-react';

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
    },
    {
      name: 'CastBox',
      link: 'https://castbox.fm/channel/id6028686',
      icon: <SiCastbox className="h-10 w-10" />
    }
  ];

  return (
    <motion.section
      id="platforms"
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Platform-themed icons in the margins and between sections */}
      <div className="absolute inset-0 -z-10 pointer-events-none w-full h-full overflow-hidden">
        {/* Margins */}
        <Headphones className="absolute top-10 left-0 -translate-x-1/2 w-32 h-32 text-podcast-yellow/15 pointer-events-none z-0" />
        <Mic2 className="absolute bottom-10 right-0 translate-x-1/2 w-40 h-40 text-podcast-magenta/15 pointer-events-none z-0" />
        <Heart className="absolute top-[60%] right-0 translate-x-1/2 w-24 h-24 text-podcast-yellow/10 pointer-events-none z-0" />
        <Play className="absolute top-[50%] left-0 -translate-x-1/2 w-32 h-32 text-podcast-magenta/10 pointer-events-none z-0" />
      </div>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-podcast-magenta/10 to-black z-[-20]"></div>
      {/* Main content */}
      <div className="container px-6 relative z-10">
        <div className="mb-6 text-center">
          <h2
            className="text-4xl md:text-5xl text-podcast-yellow font-bold bg-gradient-to-r inline-block transform scale-x-110 origin-center"
            dir="rtl"
          >
            הפודקאסט שלנו אצלכן באוזניים
          </h2>
        </div>

        <p className="text-center text-lg text-white/80 max-w-2xl mx-auto mb-4">
          האזינו לנו בנסיעה, בטיול עם הכלבה, במיטה מתחת לפוך או בדרך לעבודה. עקבו אחרינו, והצטרפו למסע על רגשות, זהות, משפחה, ומה שביניהם.
        </p>
        <p className="text-center text-lg text-white/80 max-w-2xl mx-auto mb-12">
          "אחותי היפה" מחכה לכם בכל פלטפורמות ההסכתים:
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {platforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 text-center bg-white/5 rounded-xl hover:bg-podcast-yellow/10 transition-all duration-300 w-full h-full"
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
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PodcastPlatforms;
