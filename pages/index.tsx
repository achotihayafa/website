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
