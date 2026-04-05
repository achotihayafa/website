'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchRssFeed } from 'utils/rssParser';
// Import the official mapping
import mappingData from "../utils/episode-mapping.json";

/**
 * --- UTILITIES ---
 */
function decodeHtml(html: string): string {
  if (typeof window !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  }
  return html.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"').replace(/'/g, "'");
}

export default function Custom404() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const handleRedirect = async () => {
      const path = router.asPath;
      
      if (path.startsWith('/episodes/')) {
        // Extract the last segment and decode it (converts %D7... back to Hebrew characters)
        const rawSegment = path.split('/').pop()?.split('?')[0] || "";
        const decodedSegment = decodeURIComponent(rawSegment);
        
        if (decodedSegment) {
          setIsRedirecting(true);
          try {
            // 1. Check if the segment is already an official Hebrew title in our mapping
            // This handles cases like: /episodes/שייכות-אבל-בעצם...
            const officialSlugFromTitle = mappingData.episodes.find(ep => ep.hebTitle === decodedSegment)?.slug;
            
            if (officialSlugFromTitle) {
              router.replace(`/episodes/${officialSlugFromTitle}`);
              return;
            }

            // 2. If not a title, check if it's an old RSS ID
            const episodes = await fetchRssFeed();
            const matchById = episodes.find(ep => ep.id === decodedSegment);
            
            if (matchById) {
              const decodedTitle = decodeHtml(matchById.title);
              const officialSlugFromId = mappingData.episodes.find(ep => ep.hebTitle === decodedTitle)?.slug;

              if (officialSlugFromId) {
                router.replace(`/episodes/${officialSlugFromId}`);
                return;
              }
            }
          } catch (err) {
            console.error("Redirect lookup failed", err);
          }
          setIsRedirecting(false);
        }
      }
    };

    if (router.isReady) {
      handleRedirect();
    }
  }, [router.isReady, router.asPath, router]);

  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-podcast-yellow mx-auto mb-4"></div>
          <p className="text-xl font-bold">מעבירים אתכם לפרק הנכון...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-grow flex items-center justify-center container px-6 py-20 mt-20">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-podcast-magenta opacity-20">404</h1>
          <div className="relative -mt-20">
            <h2 className="text-4xl font-bold mb-6 text-podcast-yellow">הדף הזה לא קיים</h2>
            <p className="text-xl text-white/70 mb-10 max-w-md mx-auto">
              חיפשנו בכל הרגשות, אבל לא מצאנו את מה שחיפשת.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/episodes" className="bg-podcast-yellow text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">
                לכל הפרקים
              </Link>
              <Link href="/" className="border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                לדף הבית
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}