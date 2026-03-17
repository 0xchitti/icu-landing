import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    // Fetch live data from Luma
    const eventId = 'aiy8g48n';
    const response = await fetch(`https://luma.com/${eventId}`);
    const html = await response.text();
    
    // Extract data from the page
    let title = 'Academy by Inner Circle'; // fallback
    let description = 'BUILD & DEPLOY YOUR AI SIDEKICK IN 3 HOURS';
    let coverImage = '/api/luma-image/aiy8g48n';
    
    // Extract title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/);
    if (titleMatch && titleMatch[1] && !titleMatch[1].includes('Luma')) {
      title = titleMatch[1].replace(' · Luma', '').trim();
    }
    
    // Extract description from JSON-LD
    const jsonLdMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([^<]*)<\/script>/);
    if (jsonLdMatch) {
      try {
        const data = JSON.parse(jsonLdMatch[1]);
        if (data.description) {
          description = data.description.split('\n')[0]; // First line only
        }
      } catch (e) {
        console.log('Failed to parse JSON-LD:', e);
      }
    }
    
    // Extract cover image URL
    const coverMatch = html.match(/"cover_url":"([^"]*)"/) || 
                       html.match(/property="og:image" content="([^"]*)"/);
    if (coverMatch && coverMatch[1]) {
      coverImage = coverMatch[1];
    }

    const events = [
      {
        id: eventId,
        eventId,
        title,
        description,
        date: 'Past Event',
        attendance: '249 Went',
        url: `https://luma.com/${eventId}`,
        image: coverImage,
        status: 'completed',
        buttonText: 'View Event'
      }
    ];

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json({ events });
    
  } catch (error) {
    console.error('Error fetching events:', error);
    
    // Fallback to static data
    const events = [
      {
        id: 'aiy8g48n',
        eventId: 'aiy8g48n',
        title: 'Academy by Inner Circle',
        description: 'BUILD & DEPLOY YOUR AI SIDEKICK IN 3 HOURS',
        date: 'Past Event',
        attendance: '249 Went',
        url: 'https://luma.com/aiy8g48n',
        image: 'https://images.lumacdn.com/event-covers/ik/496102d9-283d-4592-b8f6-105df9946f6d.png',
        status: 'completed',
        buttonText: 'View Event'
      }
    ];
    
    res.status(200).json({ events });
  }
}