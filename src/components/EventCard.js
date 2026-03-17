import { useEffect } from 'react';

export default function EventCard({ event }) {
  useEffect(() => {
    // Load Luma checkout button script
    const script = document.createElement('script');
    script.id = 'luma-checkout';
    script.src = 'https://embed.lu.ma/checkout-button.js';
    script.async = true;
    
    if (!document.getElementById('luma-checkout')) {
      document.head.appendChild(script);
    }
  }, []);

  return (
    <article className="card">
      <div className="card-image-container">
        <img src={event.coverImage} alt={event.title} />
      </div>
      <div className="card-content">
        <div className="card-meta">
          <span>Past Event</span>
          <span>{event.attendance}</span>
        </div>
        <h3 className="card-title">{event.title}</h3>
        <p className="card-desc">{event.description}</p>
        <div className="card-footer">
          <a 
            href={event.url}
            className="register-btn luma-checkout--button"
            data-luma-action="checkout"
            data-luma-event-id={event.id}
          >
            View Event
          </a>
        </div>
      </div>
    </article>
  );
}