import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    // For now, return the specific event you mentioned
    const events = [
      {
        id: 'aiy8g48n',
        title: 'Academy by Inner Circle',
        description: 'BUILD & DEPLOY YOUR AI SIDEKICK IN 3 HOURS - Go from zero to a production-ready AI agent with cron jobs, tool calling, and database connections.',
        date: 'Past Event',
        attendance: '249 Went',
        url: 'https://luma.com/aiy8g48n',
        image: '/api/luma-image/aiy8g48n', // We'll create this endpoint
        status: 'completed'
      }
    ];

    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
}