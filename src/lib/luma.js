export async function fetchLumaEvent(eventId) {
  try {
    const response = await fetch(`https://luma.com/${eventId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ICU-Bot/1.0)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    
    // Extract title
    let title = 'Academy by Inner Circle';
    const titleMatch = html.match(/<title>([^<]*)<\/title>/);
    if (titleMatch && titleMatch[1] && !titleMatch[1].includes('Luma')) {
      title = titleMatch[1].replace(' · Luma', '').trim();
    }
    
    // Extract description
    let description = 'BUILD & DEPLOY YOUR AI SIDEKICK IN 3 HOURS';
    const descMatch = html.match(/property="og:description" content="([^"]*)"/);
    if (descMatch && descMatch[1]) {
      description = descMatch[1].split('\n')[0];
    }
    
    // Extract cover image
    let coverImage = 'https://images.lumacdn.com/event-covers/ik/496102d9-283d-4592-b8f6-105df9946f6d.png';
    const coverMatch = html.match(/"cover_url":"([^"]*)"/) || 
                       html.match(/property="og:image" content="([^"]*)"/);
    if (coverMatch && coverMatch[1]) {
      coverImage = coverMatch[1];
    }
    
    // Extract attendance
    let attendance = '249 Went';
    const attendanceMatch = html.match(/(\d+)\s+(went|going|attendees?)/i);
    if (attendanceMatch) {
      attendance = `${attendanceMatch[1]} ${attendanceMatch[2]}`;
    }
    
    return {
      id: eventId,
      title,
      description,
      coverImage,
      attendance,
      url: `https://luma.com/${eventId}`,
      status: 'completed'
    };
    
  } catch (error) {
    console.error('Failed to fetch Luma event:', error);
    
    // Fallback data
    return {
      id: eventId,
      title: 'Academy by Inner Circle',
      description: 'BUILD & DEPLOY YOUR AI SIDEKICK IN 3 HOURS',
      coverImage: 'https://images.lumacdn.com/event-covers/ik/496102d9-283d-4592-b8f6-105df9946f6d.png',
      attendance: '249 Went',
      url: `https://luma.com/${eventId}`,
      status: 'completed'
    };
  }
}