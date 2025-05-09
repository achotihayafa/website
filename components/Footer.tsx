import React from 'react';
import Link from 'next/link';
import { SiSpotify, SiYoutube, SiApplepodcasts, SiInstagram } from "react-icons/si";

const PODCAST_LINKS = {
  spotify: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw",
  youtube: "https://www.youtube.com/@AchotiHaYafa",
  apple: "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395",
  instagram: "https://www.instagram.com/achotihayafa/"
};

const Footer = () => {
  return (
    <footer className="bg-black/80 text-white py-12">
      <div className="border-t border-white/10 mb-10" />
      <div className="container px-6 max-w-screen-2xl">
        <div className="flex flex-col md:flex-row justify-between gap-14 mb-8">
          
          {/* Menu column */}
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl mb-4 font-display">
              אחותי היפה
            </h3>
            <ul className="space-y-2 pl-0">
              <li><Link href="/#platforms" className="text-gray-300 hover:text-podcast-yellow transition-colors">האזינו עכשיו</Link></li>
              <li><Link href="/#best" className="text-gray-300 hover:text-podcast-yellow transition-colors">פרקים נבחרים</Link></li>
              <li><Link href="/#latest" className="text-gray-300 hover:text-podcast-yellow transition-colors">פרקים אחרונים</Link></li>
              <li><Link href="/episodes" className="text-gray-300 hover:text-podcast-yellow transition-colors">כל הפרקים</Link></li>
              <li><Link href="/#about" className="text-gray-300 hover:text-podcast-yellow transition-colors">מי אנחנו</Link></li>
              <li><Link href="/#btl" className="text-gray-300 hover:text-podcast-yellow transition-colors">בין השורות</Link></li>
            </ul>
          </div>

          {/* Icons/links column */}
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl mb-4 font-display">
              עקבו והאזינו
            </h3>
            <div className="flex flex-col gap-4 items-start sm:items-center sm:flex-row sm:gap-6">
              <a href={PODCAST_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-podcast-yellow transition-colors">
                <SiInstagram size={28} /> <span>Instagram</span>
              </a>
              <a href={PODCAST_LINKS.spotify} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-podcast-yellow transition-colors">
                <SiSpotify size={28} /> <span>Spotify</span>
              </a>
              <a href={PODCAST_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-podcast-yellow transition-colors">
                <SiYoutube size={28} /> <span>YouTube</span>
              </a>
              <a href={PODCAST_LINKS.apple} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-podcast-yellow transition-colors">
                <SiApplepodcasts size={28} /> <span>Apple Podcasts</span>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} אחותי היפה. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
