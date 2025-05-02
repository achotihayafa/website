import { XMLParser } from "fast-xml-parser";

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  spotifyLink: string;
  audioUrl: string;
  imageUrl: string;
  featured?: boolean;
  season?: string;
  episodeNumber?: string;
}

export const fetchRssFeed = async (): Promise<Episode[]> => {
  try {
    const response = await fetch("https://anchor.fm/s/f1452300/podcast/rss");
    const text = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const items = xmlDoc.querySelectorAll("item");

    const episodes: Episode[] = [];

    items.forEach((item, index) => {
      const title = item.querySelector("title")?.textContent || "";
      const description = item.querySelector("description")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";

      // Extract episode ID from <link>
      const link = item.querySelector("link")?.textContent || "";
      const id = link.split("/").pop() || `episode-${index}`; // fallback to index

      // Clean description
      const cleanDescription = description
        .replace(/<\/p>\s*<p>/gi, '<br>')                   // Replace paragraph breaks with <br>
        .replace(/<p[^>]*>/gi, '')                          // Remove opening <p> tags
        .replace(/<\/p>/gi, '')                             // Remove closing </p>
        .replace(/<(?!\/?(br|strong)\b)[^>]*>/gi, '')       // Keep <br> and <strong> tags, strip others
        .replace(/\n+/g, '<br />')                          // Convert newlines to <br />
        .replace(/&nbsp;/g, ' ');                           // Normalize spaces

      // Duration
      let duration = "";
      const durationElement = item.querySelector("itunes\\:duration") || item.querySelector("*|duration");
      if (durationElement) {
        duration = durationElement.textContent || "";
      }

      // Audio
      const audioUrl = item.querySelector("enclosure")?.getAttribute("url") || "";

      // Image
      const imageElement = item.querySelector("itunes\\:image") || item.querySelector("*|image");
      const imageUrl = imageElement?.getAttribute("href") || "";

      // Season and Episode
      const seasonElement = item.querySelector("itunes\\:season") || item.querySelector("*|season");;
      const episodeNumberElement = item.querySelector("itunes\\:episode") || item.querySelector("*|episode");;

      const season = seasonElement?.textContent || "";
      const episodeNumber = episodeNumberElement?.textContent || "";

      // Format date
      const date = new Date(pubDate);
      const formattedDate = new Intl.DateTimeFormat('he-IL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);

      // Format duration
      let formattedDuration = "0:00";
      if (duration && duration.trim() !== "") {
        if (duration.includes(":") && duration.split(":").length === 3) {
          const [hours, minutes, seconds] = duration.split(":").map(Number);
          formattedDuration = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else if (duration.includes(":") && duration.split(":").length === 2) {
          formattedDuration = duration;
        } else if (!isNaN(parseInt(duration))) {
          const totalSeconds = parseInt(duration);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
      }

      episodes.push({
        id,
        title,
        description: cleanDescription,
        duration: formattedDuration,
        date: formattedDate,
        spotifyLink: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9",
        audioUrl,
        imageUrl,
        featured: index === 0,
        season, // Add season to the episode data
        episodeNumber // Add episode number to the episode data
      });
    });


    return episodes;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
};
