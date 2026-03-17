import { useState, useEffect } from 'react';
import Head from 'next/head';
import EventCard from '../components/EventCard';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchEvents, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Rotating words animation
    const words = ['builders', 'hackers', 'founders', 'creators'];
    let currentIndex = 0;
    
    function rotateWords() {
      const elements = document.querySelectorAll('.rotating-word .word');
      if (elements.length === 0) return;
      
      elements.forEach(el => el.classList.remove('active'));
      
      const current = document.querySelector(`[data-word="${words[currentIndex]}"]`);
      if (current) {
        current.classList.add('active');
      }
      
      currentIndex = (currentIndex + 1) % words.length;
    }
    
    rotateWords(); // Initial call
    const interval = setInterval(rotateWords, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Inner Circle University</title>
        <meta name="description" content="India's most exclusive AI builders community" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="container">
        <header>
          <div className="crest-wrapper">
            <svg className="crest" viewBox="0 0 24 24">
              <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" />
            </svg>
          </div>
          <h1>Inner Circle University</h1>
          <div className="tagline">
            India's most exclusive AI{' '}
            <span className="rotating-word">
              <span className="word active" data-word="builders">builders</span>
              <span className="word" data-word="hackers">hackers</span>
              <span className="word" data-word="founders">founders</span>
              <span className="word" data-word="creators">creators</span>
            </span>{' '}
            community
          </div>
          <div className="subtext">Invite only</div>
          <a href="#events" className="cta-button">
            View Sessions
          </a>
        </header>

        <section id="events">
          <div className="section-header">
            <div>
              <h2 className="section-title">Upcoming Sessions</h2>
              <div style={{fontFamily: 'var(--font-sans)', color: '#666', fontSize: '0.9rem'}}>
                2026 Semester
              </div>
            </div>
          </div>

          <div className="grid">
            {loading ? (
              <div style={{color: '#666', textAlign: 'center', gridColumn: '1 / -1'}}>
                Loading events...
              </div>
            ) : events.length > 0 ? (
              events.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div style={{color: '#666', textAlign: 'center', gridColumn: '1 / -1'}}>
                No events found
              </div>
            )}
          </div>
        </section>

        <footer>
          <div className="social-links">
            <a href="https://instagram.com/innercircle" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.33 0 8.741 0 12.001c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12.001 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12.001 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        .rotating-word {
          display: inline-block;
          position: relative;
        }
        .rotating-word .word {
          display: inline-block;
          opacity: 0;
          position: absolute;
          left: 0;
          top: 0;
          white-space: nowrap;
          transition: opacity 0.5s ease, transform 0.5s ease;
          transform: translateY(12px);
        }
        .rotating-word .word.active {
          opacity: 1;
          position: relative;
          transform: translateY(0);
        }
        .rotating-word .word.exit {
          opacity: 0;
          position: absolute;
          transform: translateY(-12px);
        }
        :root {
          --bg-color: #0A0A0A;
          --card-bg: #141414;
          --text-main: #E0E0E0;
          --text-muted: #888888;
          --border-color: #262626;
          --accent-hover: #ffffff;
          --font-serif: 'Geist', sans-serif;
          --font-sans: 'Inter', sans-serif;
          --easing: cubic-bezier(0.16, 1, 0.3, 1);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        html {
          font-size: 16px;
        }

        body {
          font-family: var(--font-sans);
          background: var(--bg-color);
          color: var(--text-main);
          line-height: 1.6;
          overflow-x: hidden;
          position: relative;
        }

        body::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        header {
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 100px 0;
        }

        .crest-wrapper {
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeIn 1s var(--easing) 0.2s forwards;
        }

        .crest {
          width: 48px;
          height: 48px;
          stroke: var(--text-main);
          stroke-width: 1.5px;
          fill: none;
        }

        h1 {
          font-family: var(--font-serif);
          font-weight: 500;
          font-size: clamp(3rem, 6vw, 7rem);
          line-height: 0.9;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          color: var(--text-main);
          opacity: 0;
          animation: slideUp 1.2s var(--easing) 0.4s forwards;
        }

        .tagline {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          opacity: 0;
          animation: fadeIn 1s var(--easing) 0.6s forwards;
        }

        .subtext {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #666;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          animation: fadeIn 1s var(--easing) 0.8s forwards;
        }

        .subtext::before, .subtext::after {
          content: "";
          width: 20px;
          height: 1px;
          background: #333;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 32px;
          border: 1px solid var(--text-main);
          border-radius: 100px;
          color: var(--text-main);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.4s var(--easing);
          background: transparent;
          opacity: 0;
          animation: fadeIn 1s var(--easing) 1s forwards;
        }

        .cta-button:hover {
          background: var(--text-main);
          color: var(--bg-color);
          transform: translateY(-2px);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
          padding-top: 4rem;
          border-top: 1px solid var(--border-color);
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 400;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
          gap: 2.5rem;
          padding-bottom: 8rem;
        }

        .card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          padding: 0;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s ease, transform 0.3s var(--easing);
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .card:hover {
          border-color: #444;
          transform: translateY(-4px);
        }

        .card-image-container {
          width: 100%;
          height: 280px;
          overflow: hidden;
          position: relative;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .card-image-container img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          width: auto;
          height: auto;
          transition: opacity 0.4s ease, transform 0.6s ease;
        }

        .card:hover .card-image-container img {
          opacity: 1;
          transform: scale(1.02);
          filter: none;
        }

        .card-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .card-meta span:first-child::after {
          content: "•";
          margin-left: 1rem;
          opacity: 0.5;
        }

        .card-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 1rem;
          color: var(--text-main);
        }

        .card-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.5;
          flex: 1;
          margin-bottom: 2rem;
        }

        .card-footer {
          margin-top: auto;
        }

        .luma-checkout--button {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          color: var(--text-main);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s var(--easing);
          cursor: pointer;
        }

        .luma-checkout--button:hover {
          border-color: var(--text-main);
          background: var(--text-main);
          color: var(--bg-color);
          transform: translateY(-1px);
        }

        footer {
          border-top: 1px solid var(--border-color);
          padding: 4rem 0 2rem;
          text-align: center;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .social-links a {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          border-radius: 50%;
          color: var(--text-muted);
          transition: all 0.3s var(--easing);
          text-decoration: none;
        }

        .social-links a:hover {
          border-color: var(--text-main);
          color: var(--text-main);
          transform: translateY(-2px);
        }

        .social-links svg {
          width: 18px;
          height: 18px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 20px;
          }
          
          .grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          h1 {
            font-size: clamp(2rem, 8vw, 4rem);
          }
          
          .tagline {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}