import React from 'react';
import { Music, Headphones, Mic2, Heart, Play } from 'lucide-react';
import { AspectRatio } from "./ui/aspect-ratio";

const BTLSection = () => {
  return (
    <section id="btl" className="py-20 relative overflow-hidden">
      {/* Music-themed icons in the margins */}
      <div className="absolute inset-0 -z-10 pointer-events-none w-full h-full overflow-hidden">
        <Headphones className="absolute top-10 left-0 -translate-x-1/2 w-20 h-20 text-podcast-yellow/30 pointer-events-none z-0" />
        <Mic2 className="absolute bottom-10 right-0 translate-x-1/2 w-24 h-24 text-podcast-magenta/30 pointer-events-none z-0" />
        <Heart className="absolute top-[60%] right-0 translate-x-1/2 w-16 h-16 text-podcast-yellow/20 pointer-events-none z-0" />
        <Play className="absolute top-[50%] left-0 -translate-x-1/2 w-20 h-20 text-podcast-magenta/20 pointer-events-none z-0" />
      </div>
      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-podcast-yellow flex items-center justify-center mx-auto mb-4">
            <Music className="text-black font-bold" size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-podcast-yellow">
            בין השורות
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-5 text-center">
          <p className="text-lg text-white/80 mb-4">
            בכל סוף פרק אנחנו בוחרים שיר שמתאר את הרגש המרכזי שעלה בנו – לפעמים שיר ישן שמחזיר אותנו אחורה, ולפעמים משהו חדש שמפתיע את הלב.
            כך נבנה לו בהדרגה פס הקול של הפודקאסט, וגם של החיים עצמם.
          </p>
          <p className="text-lg text-white/80">
            האזינו ל"בין השורות" – הפלייליסט שלנו. מסע מוזיקלי שעובר דרך שמחה, געגוע, פחד, תקווה ואהבה.
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
