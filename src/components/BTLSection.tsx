
import React from 'react';
import { Music, Headphones } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const BTLSection = () => {
  return (
    <section id="btl" className="py-20 bg-black relative overflow-hidden">
      {/* Decorative background completely removed */}
      <div className="container px-6 relative z-10">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-podcast-yellow flex items-center justify-center ml-4">
            <Music className="text-podcast-darkgray" size={24} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl">BTL - Between The Lines</h2>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-white/80 mb-4">
            פרויקט מוזיקלי חדש שמאחד את שתי האהבות הגדולות שלנו - מוזיקה ושיחות עומק על רגשות. בפרויקט זה אנחנו יוצרים פלייליסטים שמתכתבים עם הנושאים של הפרקים שלנו.
          </p>
          <p className="text-lg text-white/80">
            האזינו לפלייליסט BTL הראשון - מסע מוזיקלי שמתכתב עם הפרקים הראשונים של הפודקאסט, נע בין שמחה, כאב, אהבה וחרטה, ומשלב בין שירים ישראלים, להיטים בינלאומיים וגילויים חדשים.
          </p>
          
          <div className="flex items-center justify-center mt-8 mb-12">
            <div className="w-10 h-10 rounded-full bg-podcast-yellow flex items-center justify-center ml-3">
              <Headphones size={18} />
            </div>
            <span className="text-lg font-medium text-podcast-yellow">BTL // Between The Lines</span>
          </div>
        </div>
        
        <div className="w-full max-w-3xl mx-auto">
          <AspectRatio ratio={4/3} className="bg-podcast-darkgray/20 rounded-lg overflow-hidden">
            <iframe 
              src="https://open.spotify.com/embed/playlist/0iOGSgO1T9lSHQlVfhoHc9?utm_source=generator&theme=0" 
              width="100%" 
              height="100%"
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="rounded-lg"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default BTLSection;
