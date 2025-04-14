
interface Episode {
  title: string;
  description: string;
  duration: string;
  date: string;
  spotifyLink: string;
  audioUrl: string;
  imageUrl: string;
  featured?: boolean;
}

export const fetchRssFeed = async (): Promise<Episode[]> => {
  try {
    // Fetch the RSS feed
    const response = await fetch("https://anchor.fm/s/f1452300/podcast/rss");
    const text = await response.text();
    
    // Parse the XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const items = xmlDoc.querySelectorAll("item");
    
    // Convert items to episodes
    const episodes: Episode[] = [];
    
    items.forEach((item, index) => {
      const title = item.querySelector("title")?.textContent || "";
      const description = item.querySelector("description")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const duration = item.querySelector("itunes\\:duration")?.textContent || "";
      const audioUrl = item.querySelector("enclosure")?.getAttribute("url") || "";
      const imageElement = item.querySelector("itunes\\:image");
      const imageUrl = imageElement?.getAttribute("href") || "";
      
      // Format the date nicely
      const date = new Date(pubDate);
      const formattedDate = new Intl.DateTimeFormat('he-IL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
      
      // Format duration (mm:ss)
      let formattedDuration = duration;
      if (duration.includes(":")) {
        formattedDuration = duration;
      } else {
        const minutes = Math.floor(parseInt(duration) / 60);
        const seconds = parseInt(duration) % 60;
        formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
      
      episodes.push({
        title,
        description: description.replace(/<[^>]*>/g, ''), // Remove HTML tags
        duration: formattedDuration,
        date: formattedDate,
        spotifyLink: "https://open.spotify.com/show/0ZpvzCEuDeKQhBw74YEmp9",
        audioUrl,
        imageUrl,
        featured: index === 0 // The first episode is featured
      });
    });
    
    return episodes;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
};
