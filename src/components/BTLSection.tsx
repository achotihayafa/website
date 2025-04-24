
import React from 'react';
import { Music } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const BTLSection = () => {
  return (
    <section id="btl" className="py-20 bg-black relative overflow-hidden">
      {/* Sound Wave Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full h-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#gradient-wave)"
            d="M0,256L48,245.3C96,235,192,213,288,176C384,139,480,85,576,69.3C672,53,768,75,864,96C960,117,1056,139,1152,144C1248,149,1344,139,1392,134.7L1440,128V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0V256Z"
          ></path>
          <defs>
            <linearGradient id="gradient-wave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#fcfe14", stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: "#d52a78", stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-podcast-yellow flex items-center justify-center mx-auto mb-4">
            <Music className="text-black font-bold" size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-podcast-yellow transform scale-x-110">
            בין השורות
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-5 text-center">
          <p className="text-lg text-white/80 mb-4">
          בכל סוף פרק אנחנו בוחרות שיר שמתאר את הרגשות שעלו בנו במהלך הפרק ויחד נוצר פס הקול שמלווה אותנו בפרקים ובחיים: רשימה של שירים שנעים בין שמחה, כאב, אהבה וחרטה.
          </p>
          <p className="text-lg text-white/80">
          האזינו לפלייליסט "בין השורות" - מסע מוזיקלי שמתכתב עם הפרקים של הפודקאסט.
          </p>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <AspectRatio ratio={4 / 3} className="bg-podcast-darkgray/20 rounded-lg overflow-hidden">
            <iframe 
              src="https://open.spotify.com/embed/playlist/0iOGSgO1T9lSHQlVfhoHc9?utm_source=generator&theme=0" 
              width="100%" 
              height="100%"
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="rounded-lg"
              title="בין השורות פלייליסט"
            ></iframe>
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default BTLSection;
