
import React from 'react';
import { Instagram, Twitter, Heart, Spotify } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-podcast-darkgray text-white py-12">
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4 gradient-text">Feel Good</h3>
            <p className="text-gray-300">
              A podcast exploring emotions through an LGBTQ+ lens. Join us for conversations that inspire, 
              educate, and connect.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#episodes" className="text-gray-300 hover:text-podcast-yellow transition-colors">Episodes</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-podcast-yellow transition-colors">About</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-podcast-yellow transition-colors">Contact</a></li>
              <li><a href="https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-podcast-yellow transition-colors">Spotify</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-podcast-yellow hover:text-podcast-darkgray transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-podcast-yellow hover:text-podcast-darkgray transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-podcast-yellow hover:text-podcast-darkgray transition-colors">
                <Spotify size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Feel Good Podcast. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-podcast-magenta" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
