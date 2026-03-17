export default async function handler(req, res) {
  const { eventId } = req.query;
  
  try {
    // Fetch the Luma event page
    const response = await fetch(`https://luma.com/${eventId}`);
    const html = await response.text();
    
    // Extract Open Graph image
    const imageMatch = html.match(/<meta property="og:image" content="([^"]*)"/) || 
                       html.match(/<meta name="twitter:image" content="([^"]*)"/) ||
                       html.match(/<img[^>]*src="([^"]*luma[^"]*)"[^>]*>/);
    
    if (imageMatch && imageMatch[1]) {
      const imageUrl = imageMatch[1];
      
      // Fetch and proxy the image
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      
      res.setHeader('Content-Type', imageResponse.headers.get('content-type') || 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      res.send(Buffer.from(imageBuffer));
    } else {
      // Return a placeholder or 404
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
}