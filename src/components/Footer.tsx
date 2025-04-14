
import React from 'react';
import { Instagram, Twitter, Heart, Music } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/80 text-white py-12">
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4 gradient-text">Feel Good</h3>
            <p className="text-gray-300">
              פודקאסט החוקר רגשות דרך עדשה להטב"קית. הצטרפו אלינו לשיחות שמעוררות השראה, 
              מחנכות ומחברות.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li><a href="#episodes" className="text-gray-300 hover:text-podcast-yellow transition-colors">פרקים</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-podcast-yellow transition-colors">אודות</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-podcast-yellow transition-colors">צרו קשר</a></li>
              <li><a href="https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-podcast-yellow transition-colors">ספוטיפיי</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">עקבו אחרינו</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-podcast-yellow hover:text-podcast-magenta transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-podcast-yellow hover:text-podcast-magenta transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=WpeRZqDaS5CRs-R3JyGipQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-podcast-yellow hover:text-podcast-magenta transition-colors">
                <Music size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} פודקאסט Feel Good. כל הזכויות שמורות.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            נוצר עם <Heart size={14} className="mx-1 text-podcast-yellow" /> עבור הקהילה
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
