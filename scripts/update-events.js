// Script to update static HTML with live Luma data
async function updateEvents() {
  try {
    const response = await fetch('/api/events');
    const { events } = await response.json();
    
    if (events && events.length > 0) {
      const event = events[0];
      
      // Update title
      const titleElement = document.querySelector('.card-title');
      if (titleElement) titleElement.textContent = event.title;
      
      // Update description  
      const descElement = document.querySelector('.card-desc');
      if (descElement) descElement.textContent = event.description;
      
      // Update image
      const imgElement = document.querySelector('.card-image-container img');
      if (imgElement) imgElement.src = event.image;
      
      // Update attendance
      const metaElements = document.querySelectorAll('.card-meta span');
      if (metaElements.length > 1) {
        metaElements[1].textContent = event.attendance;
      }
      
      console.log('Events updated from Luma API');
    }
  } catch (error) {
    console.error('Failed to update events:', error);
  }
}

// Auto-update when page loads
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', updateEvents);
}