
import React from 'react';
import { Instagram, Twitter, Heart, Music } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/80 text-white py-12">
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4 gradient-text">אחותי היפה</h3>
            <p className="text-gray-300">
              פודקאסט על רגשות, אבל בעצם פודקאסט להטב"קי
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">תפריט</h3>
            <ul className="space-y-2">
              <li><a href="#episodes" className="text-gray-300 hover:text-podcast-yellow transition-colors">פרקים</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-podcast-yellow transition-colors">אודות</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-podcast-yellow transition-colors">צרו קשר</a></li>
              <li><a href="https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-podcast-yellow transition-colors">ספוטיפיי</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">עקבו אחרינו באינסטגרם</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-podcast-yellow hover:text-podcast-magenta transition-colors">
                <Instagram size={30} />
              </a>
            </div>
          </div>
        </div>
        
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
