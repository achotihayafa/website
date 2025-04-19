

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
      
      // Get duration (fixing the namespace selector issue)
      let duration = "";
      const durationElement = item.querySelector("itunes\\:duration") || 
                             item.querySelector("*|duration");
      if (durationElement) {
        duration = durationElement.textContent || "";
      }
      
      const audioUrl = item.querySelector("enclosure")?.getAttribute("url") || "";
      const imageElement = item.querySelector("itunes\\:image") || 
                          item.querySelector("*|image");
      const imageUrl = imageElement?.getAttribute("href") || "";
      
      // Format the date nicely
      const date = new Date(pubDate);
      const formattedDate = new Intl.DateTimeFormat('he-IL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
      
      // Improved duration formatting
      let formattedDuration = "0:00";
      
      if (duration && duration.trim() !== "") {
        console.log("Raw duration:", duration);
        
        // Handle HH:MM:SS format
        if (duration.includes(":") && duration.split(":").length === 3) {
          const [hours, minutes, seconds] = duration.split(":").map(Number);
          formattedDuration = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        // Handle MM:SS format
        else if (duration.includes(":") && duration.split(":").length === 2) {
          formattedDuration = duration;
        }
        // Handle seconds-only format
        else if (!isNaN(parseInt(duration))) {
          const totalSeconds = parseInt(duration);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
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

