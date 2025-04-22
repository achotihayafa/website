
import React from 'react';
import { SiSpotify, SiYoutube, SiApplepodcasts, SiInstagram } from "react-icons/si";

const PODCAST_LINKS = {
  spotify: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9",
  youtube: "https://www.youtube.com/@AchotiHaYafa",
  apple: "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395",
  instagram: "https://www.instagram.com/achotihayafa/"
};

const Footer = () => {
  return (
    <footer className="bg-black/80 text-white py-12">
      <div className="container px-6 max-w-screen-2xl">
        <div className="flex flex-col gap-14 mb-8">
          {/* Menu column */}
          <div>
            <h3
              className="text-3xl mb-4 font-display text-right"
              style={{ 
                transform: 'scaleX(1.2)', 
                transformOrigin: 'right',
                display: 'inline-block', 
                width: 'auto' 
              }}
            >
              אחותי היפה
            </h3>
            <div className="flex flex-col gap-2">
              <a href="#platforms" className="text-gray-300 hover:text-podcast-yellow transition-colors">האזינו עכשיו</a>
              <a href="#best" className="text-gray-300 hover:text-podcast-yellow transition-colors">פרקים מומלצים</a>
              <a href="#latest" className="text-gray-300 hover:text-podcast-yellow transition-colors">פרקים אחרונים</a>
              <a href="/episodes" className="text-gray-300 hover:text-podcast-yellow transition-colors">כל הפרקים</a>
              <a href="#about" className="text-gray-300 hover:text-podcast-yellow transition-colors">אודות</a>
              <a href="#btl" className="text-gray-300 hover:text-podcast-yellow transition-colors">בין השורות</a>
            </div>
          </div>

          {/* Icons/links column */}
          <div>
            <h3
              className="text-3xl mb-4 font-display text-right"
              style={{
                transform: 'scaleX(1.2)',
                transformOrigin: 'right',
                display: 'inline-block',
                width: 'auto',
              }}
            >
              עקבו והאזינו
            </h3>
            <div className="flex flex-col gap-4">
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

        {/* Footer bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} אחותי היפה. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
