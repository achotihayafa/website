import React from 'react';
import { Music } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const BTLSection = () => {
  return (
    <section id="btl" className="py-20 bg-black relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-podcast-yellow flex items-center justify-center mx-auto mb-4">
            <Music className="text-podcast-darkgray" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">בין השורות</h2>
        </div>

        <div className="max-w-3xl mx-auto mb-5 text-center">
          <p className="text-lg text-white/80 mb-4">
            האזינו לפלייליסט "בין השורות" - מסע מוזיקלי שמתכתב עם הפרקים של הפודקאסט.
          </p>
          <p className="text-lg text-white/80">
            בכל סוף פרק אנחנו בוחרות שיר שמתאר את הרגשות שעלו בנו במהלך הפרק ויחד נוצר פס הקול שמלווה אותנו בפרקים ובחיים: רשימה של שירים שנעים בין שמחה, כאב, אהבה וחרטה.
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
