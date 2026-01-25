import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchRssFeed } from 'utils/rssParser';

// Helper to slugify (must match your main logic)
function slugifyHebrew(text: string): string {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\u0590-\u05FFa-z0-9-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '').replace(/-+$/, '');
}

function decodeHtml(html: string): string {
  return html.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"').replace(/'/g, "'");
}

export default function Custom404() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const handleRedirect = async () => {
      const path = router.asPath; // e.g., /episodes/3-e3d5h1r
      
      if (path.startsWith('/episodes/')) {
        const potentialId = path.split('/').pop();
        
        if (potentialId) {
          setIsRedirecting(true);
          try {
            const episodes = await fetchRssFeed();
            // Try to find if the URL segment matches an old episode ID
            const match = episodes.find(ep => ep.id === potentialId);
            
            if (match) {
              const newSlug = slugifyHebrew(decodeHtml(match.title));
              router.replace(`/episodes/${newSlug}`);
              return;
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
  }, [router.isReady, router.asPath]);

  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-podcast-yellow mx-auto mb-4"></div>
          <p className="text-xl">מוצאים לכם את הפרק...</p>
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
            <p className="text-xl text-white/70 mt-20 mb-10 max-w-md mx-auto">
              חיפשנו בכל הרגשות, אבל לא מצאנו את מה שחיפשת. אולי הפרק עבר לכתובת חדשה?
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