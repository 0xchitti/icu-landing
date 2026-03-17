export default async function handler(req, res) {
  const { eventId } = req.query;
  
  try {
    // Fetch the Luma event page
    const response = await fetch(`https://luma.com/${eventId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; EventScraper/1.0)'
      }
    });
    const html = await response.text();
    
    // Try multiple patterns to find the event image
    const imagePatterns = [
      /<meta property="og:image" content="([^"]*)"/, // Open Graph
      /<meta name="twitter:image" content="([^"]*)"/, // Twitter Card
      /<img[^>]*class="[^"]*cover[^"]*"[^>]*src="([^"]*)"[^>]*>/, // Cover image
      /<div[^>]*style="[^"]*background-image:[^"]*url\('([^']*)'/, // Background image
      /<img[^>]*src="([^"]*)"[^>]*alt="[^"]*event[^"]*"/i // Event image
    ];
    
    let imageUrl = null;
    for (const pattern of imagePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        imageUrl = match[1];
        break;
      }
    }
    
    if (imageUrl) {
      // Make sure it's a full URL
      if (imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl;
      if (imageUrl.startsWith('/')) imageUrl = 'https://luma.com' + imageUrl;
      
      // Fetch and proxy the image
      const imageResponse = await fetch(imageUrl);
      
      if (imageResponse.ok) {
        const imageBuffer = await imageResponse.arrayBuffer();
        
        res.setHeader('Content-Type', imageResponse.headers.get('content-type') || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.send(Buffer.from(imageBuffer));
        return;
      }
    }
    
    // Fallback - return a 404 to trigger the onerror fallback
    res.status(404).json({ error: 'Image not found' });
    
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
}