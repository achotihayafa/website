import React from 'react';
import Head from 'next/head';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PodcastPlatforms from '../components/PodcastPlatforms';
import BestEpisodes from '../components/BestEpisodes';
import LatestEpisodes from '../components/LatestEpisodes';
import AboutSection from '../components/AboutSection';
import BTLSection from '../components/BTLSection';
import Footer from '../components/Footer';

const Index = () => {
  // Animated background on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const bg = document.getElementById('animated-bg');
      if (bg) {
        const scrollY = window.scrollY || 0;
        // Move and rotate the blobs based on scroll position
        bg.style.setProperty('--bg-scroll', `${scrollY}`);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>אחותי היפה | פודקאסט על רגשות, אבל בעצם פודקאסט להטב"קי</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* SEO Meta Tags */}
        <meta name="description" content="פודקאסט להטב בעברית על רגשות, משפחה וזהות מינית – עם האחים הגאים יהונתן וצחי כהן. הצטרפו לשיחות אישיות, מצחיקות ומרגשות על חיים קווירים, משפחה והקהילה הגאה בישראל עם השראה מהחוקרת ברנה בראון." />
        <meta name="keywords" content="פודקאסט רגשי, פודקאסט להטב, פודקאסט על רגשות, צחי כהן, יהונתן כהן, ברנה בראון, פודקאסטים קוויריים, פודקסטים להטבקים, פודקאסט גאה בעברית" />
        <meta name="author" content="אחותי היפה" />
        <link rel="canonical" href="https://achotihayafa.com/" />
        <link rel="icon" href="/favicon.ico" />
        {/* OpenGraph Meta Tags */}
        <meta property="og:title" content='אחותי היפה | פודקאסט על רגשות, אבל בעצם פודקאסט להטב"קי' />
        <meta property="og:description" content="שיחות אינטימיות, מצחיקות ומרגשות על רגשות, שייכות, משפחה וחיים קוויריים – עם האחים הגאים צחי ויהונתן כהן." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://achotihayafa.com/opengraph.png" />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:url" content="https://achotihayafa.com/" />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content='אחותי היפה | פודקאסט על רגשות, אבל בעצם פודקאסט להטב"קי' />
        <meta name="twitter:description" content="שיחות אינטימיות, מצחיקות ומרגשות על רגשות, שייכות, משפחה וחיים קוויריים – עם האחים הגאים צחי ויהונתן כהן." />
        <meta name="twitter:image" content="/opengraph.png" />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org",
            "@type": "PodcastSeries",
            "name": "אחותי היפה",
            "description": "פודקאסט רגשי וקווירי בעברית – שיחות על רגשות, שייכות, משפחה וזהות מינית עם האחים צחי ויהונתן כהן.",
            "url": "https://achotihayafa.com/",
            "image": "https://achotihayafa.com/opengraph.png",
            "inLanguage": "he",
            "isAccessibleForFree": true,
            "author": {
              "@type": "Person",
              "name": "צחי כהן ויהונתן כהן"
            },
            "sameAs": [
              "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw",
              "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395",
              "https://www.youtube.com/@AchotiHaYafa",
              "https://podcastaddict.com/podcast/%D7%90%D7%97%D7%95%D7%AA%D7%99%20%D7%94%D7%99%D7%A4%D7%94/5306867",
              "https://pca.st/zapd6uv9",
              "https://www.instagram.com/achotihayafa"
            ],
            "webFeed": "https://anchor.fm/s/f1452300/podcast/rss",
            "potentialAction": {
              "@type": "ListenAction",
              "target": [
                "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9?si=MjucC2YbRyqI4Iee2HYbHw",
                "https://podcasts.apple.com/us/podcast/אחותי-היפה/id1728358395",
                "https://www.youtube.com/@AchotiHaYafa",
                "https://podcastaddict.com/podcast/%D7%90%D7%97%D7%95%D7%AA%D7%99%20%D7%94%D7%99%D7%A4%D7%94/5306867",
                "https://pca.st/zapd6uv9"
              ]
            }
          }
          `
        }} />
      </Head>
      {/* Animated blurry background */}
      <div
        id="animated-bg"
        className="fixed inset-0 -z-50 pointer-events-none"
        aria-hidden="true"
        style={{
          '--bg-scroll': '0',
        } as React.CSSProperties}
      >
        {/* Magenta blob */}
        <div
          className="absolute top-[10vh] left-[-10vw] sm:w-[22vw] sm:h-[22vw] w-[44vw] h-[44vw] rounded-full bg-podcast-magenta/40 blur-2xl transition-transform duration-300 opacity-70"
          style={{
            transform: `
              translateY(calc(min(0px, var(--bg-scroll,0) * 0.15px)))
              translateX(calc(10px * sin(var(--bg-scroll,0) * 0.01)))
              rotate(calc(var(--bg-scroll,0) * 0.05deg))
            `
          }}
        />
        {/* Yellow blob */}
        <div
          className="absolute bottom-[-10vh] right-[-10vw] sm:w-[18vw] sm:h-[18vw] w-[36vw] h-[36vw] rounded-full bg-podcast-yellow/30 blur-2xl transition-transform duration-300 opacity-70"
          style={{
            transform: `
              translateY(calc(max(0px, var(--bg-scroll,0) * -0.12px)))
              translateX(calc(-12px * cos(var(--bg-scroll,0) * 0.008)))
              rotate(calc(var(--bg-scroll,0) * -0.04deg))
            `
          }}
        />
        {/* Small yellow blob */}
        <div
          className="absolute top-[60vh] left-[50vw] sm:w-[10vw] sm:h-[10vw] w-[20vw] h-[20vw] rounded-full bg-podcast-yellow/10 blur-lg transition-transform duration-300 opacity-80"
          style={{
            transform: `
              translateY(calc(min(0px, var(--bg-scroll,0) * 0.08px)))
              translateX(calc(8px * cos(var(--bg-scroll,0) * 0.012)))
            `
          }}
        />
        {/* Small magenta blob */}
        <div
          className="absolute top-[30vh] right-[30vw] sm:w-[7vw] sm:h-[7vw] w-[14vw] h-[14vw] rounded-full bg-podcast-magenta/10 blur-lg transition-transform duration-300 opacity-80"
          style={{
            transform: `
              translateY(calc(max(0px, var(--bg-scroll,0) * -0.06px)))
              translateX(calc(-7px * sin(var(--bg-scroll,0) * 0.014)))
            `
          }}
        />
      </div>
      <Navbar />
      <HeroSection />
      <PodcastPlatforms />
      <BestEpisodes />
      <LatestEpisodes />
      <AboutSection />
      <BTLSection />
      <Footer />
    </>
  );
};

export default Index;
