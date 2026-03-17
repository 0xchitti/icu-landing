import { fetchLumaEvent } from '../../lib/luma';

export default async function handler(req, res) {
  try {
    // Fetch live data from Luma
    const event = await fetchLumaEvent('aiy8g48n');
    
    // Cache for 5 minutes to avoid hitting Luma too frequently
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    
    res.status(200).json({ 
      events: [event],
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in /api/events:', error);
    res.status(500).json({ 
      error: 'Failed to fetch events',
      events: []
    });
  }
}