import React from 'react';
import { Music, Mic2, Play } from 'lucide-react';
import { AspectRatio } from "./ui/aspect-ratio";

// Helper for animated bar styles
const animatedBar = (delay: number, duration = 2) => ({
  animation: `btl-eq-bounce ${duration}s ease-in-out ${delay}s infinite alternate`,
  transformOrigin: 'bottom center'
} as React.CSSProperties);

const NUM_BARS = 32;
const BAR_WIDTH = 24;
const BAR_GAP = 16;
const BAR_MIN_HEIGHT = 100;
const BAR_MAX_HEIGHT = 220;

function getBarHeight(i: number) {
  // Make the heights wave for visual interest
  const t = i / (NUM_BARS - 1);
  return BAR_MIN_HEIGHT + Math.round((BAR_MAX_HEIGHT - BAR_MIN_HEIGHT) * (0.5 + 0.5 * Math.sin(t * Math.PI * 2)));
}

function getBarX(i: number) {
  return 60 + i * (BAR_WIDTH + BAR_GAP);
}

function getBarFill(i: number) {
  // Use the gradient id for all bars
  return "url(#btl-eq-gradient)";
}

const BTLSection = () => {
  return (
    <section id="btl" className="py-20 relative overflow-x-hidden overflow-y-visible">

      {/* Animated gradient equalizer background */}
      <style>{`
        @keyframes btl-eq-bounce {
          0% { transform: scaleY(1);}
          50% { transform: scaleY(1.4);}
          100% { transform: scaleY(1);}
        }
      `}</style>
      <div className="absolute left-0 bottom-0 w-full h-[320px] -z-10 pointer-events-none flex items-end justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="btl-eq-gradient" x1="60" y1="0" x2={getBarX(NUM_BARS - 1)} y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E10098" />
              <stop offset="100%" stopColor="#FFD600" />
            </linearGradient>
            <filter id="btl-eq-blur" x="0" y="0" width="1440" height="320" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="12" result="blur"/>
            </filter>
          </defs>
          <g filter="url(#btl-eq-blur)">
            {Array.from({ length: NUM_BARS }).map((_, i) => {
              const height = getBarHeight(i);
              const x = getBarX(i);
              const y = 320 - height;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={BAR_WIDTH}
                  height={height}
                  rx="8"
                  fill={getBarFill(i)}
                  opacity="0.35"
                  style={animatedBar(i * 0.15)}
                />
              );
            })}
          </g>
        </svg>
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
