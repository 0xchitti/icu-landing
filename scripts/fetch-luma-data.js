#!/usr/bin/env node

// Build-time script to fetch Luma data and update index.html
const fs = require('fs');
const https = require('https');

async function fetchLumaData(eventId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'luma.com',
      path: `/${eventId}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ICU-Bot/1.0)'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function extractEventData(html) {
  // Extract title
  let title = 'Academy by Inner Circle'; // fallback
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  if (titleMatch && titleMatch[1] && !titleMatch[1].includes('Luma')) {
    title = titleMatch[1].replace(' · Luma', '').trim();
  }

  // Extract description from og:description
  let description = 'BUILD & DEPLOY YOUR AI SIDEKICK IN 3 HOURS';
  const descMatch = html.match(/property="og:description" content="([^"]*)"/);
  if (descMatch && descMatch[1]) {
    description = descMatch[1].split('\n')[0]; // First line only
  }

  // Extract cover image
  let coverImage = 'https://images.lumacdn.com/event-covers/ik/496102d9-283d-4592-b8f6-105df9946f6d.png';
  const coverMatch = html.match(/"cover_url":"([^"]*)"/) || 
                     html.match(/property="og:image" content="([^"]*)"/);
  if (coverMatch && coverMatch[1]) {
    coverImage = coverMatch[1];
  }

  return { title, description, coverImage };
}

function updateIndexHTML(eventData) {
  let html = fs.readFileSync('index.html', 'utf8');
  
  // Update title
  html = html.replace(
    /<h3 class="card-title">[^<]*<\/h3>/,
    `<h3 class="card-title">${eventData.title}</h3>`
  );
  
  // Update description
  html = html.replace(
    /<div class="card-desc">[^<]*<\/div>/,
    `<div class="card-desc">${eventData.description}</div>`
  );
  
  // Update image
  html = html.replace(
    /src="[^"]*" alt="Academy by Inner Circle"/,
    `src="${eventData.coverImage}" alt="${eventData.title}"`
  );
  
  fs.writeFileSync('index.html', html);
  console.log('✅ Updated index.html with latest Luma data');
  console.log(`Title: ${eventData.title}`);
  console.log(`Description: ${eventData.description}`);
  console.log(`Image: ${eventData.coverImage}`);
}

async function main() {
  try {
    const eventId = 'aiy8g48n';
    console.log(`Fetching data for event: ${eventId}`);
    
    const html = await fetchLumaData(eventId);
    const eventData = extractEventData(html);
    updateIndexHTML(eventData);
    
  } catch (error) {
    console.error('❌ Failed to update event data:', error.message);
    console.log('Using existing static data');
  }
}

main();