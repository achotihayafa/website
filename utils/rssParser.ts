import { parseStringPromise } from 'xml2js';

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

    // Parse XML using xml2js
    const result = await parseStringPromise(text, { explicitArray: false });

    // Now, result.rss.channel.item is your episodes array (adjust as needed)
    const items = result.rss.channel.item || [];

    const episodes: Episode[] = items.map((item: any, index: number) => {
      const title = item.title;
      const description = item.description;
      const pubDate = item.pubDate;

      // Extract episode ID from <link> (e.g., https://podcasters.spotify.com/pod/show/achoti/episodes/ep-e322n03)
      const link = item.link || "";
      let id = "";
      const match = link.match(/\/episodes\/([^/?#]+)/);
      if (match && match[1]) {
        id = match[1];
      } else if (item.guid) {
        id = typeof item.guid === "string" ? item.guid : (item.guid._ || `episode-${index}`);
      } else {
        id = link.split("/").pop() || `episode-${index}`;
      }

      // Clean description
      const cleanDescription = description
        .replace(/<\/p>\s*<p>/gi, '<br>')                   // Replace paragraph breaks with <br>
        .replace(/<p[^>]*>/gi, '')                          // Remove opening <p> tags
        .replace(/<\/p>/gi, '')                             // Remove closing </p>
        .replace(/<(?!\/?(br|strong)\b)[^>]*>/gi, '')       // Keep <br> and <strong> tags, strip others
        .replace(/\n+/g, '<br />')                          // Convert newlines to <br />
        .replace(/&nbsp;/g, ' ');                           // Normalize spaces

      // Duration
      let duration = item['itunes:duration'] || "";

      // Audio
      const audioUrl = item.enclosure?.$.url || "";

      // Image
      const imageUrl = item['itunes:image']?.$.href || "";

      // Season and Episode
      const season = item['itunes:season'] || "";
      const episodeNumber = item['itunes:episode'] || "";

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

      return {
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
      };
    });


    return episodes;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
};
