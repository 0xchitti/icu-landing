// Utility function to generate Luma checkout button HTML
export function generateLumaButton(eventId, buttonText = "Register for Event") {
  return `
    <a href="https://luma.com/${eventId}" 
       class="luma-checkout--button register-btn" 
       data-luma-action="checkout" 
       data-luma-event-id="${eventId}">
      ${buttonText}
    </a>
  `;
}

// Extract event ID from Luma URL
export function extractEventId(lumaUrl) {
  const match = lumaUrl.match(/luma\.com\/([^\/\?]+)/);
  return match ? match[1] : null;
}