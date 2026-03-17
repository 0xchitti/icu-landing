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
              <div className="card empty-state">
                <div className="empty-content">
                  <div>⏳</div>
                  <span>Loading sessions...</span>
                </div>
              </div>
            ) : events.length > 0 ? (
              events.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="card empty-state">
                <div className="empty-content">
                  <div>📚</div>
                  <span>No sessions scheduled yet</span>
                </div>
              </div>
            )}

            {/* Placeholder cards to maintain grid */}
            <div className="card empty-state">
              <div className="empty-content">
                <div>🚀</div>
                <span>More sessions coming soon</span>
              </div>
            </div>

            <div className="card empty-state">
              <div className="empty-content">
                <div>⚡</div>
                <span>Stay tuned for updates</span>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div>
            <div className="agent-badge">
              <div className="bot-icon"></div>
              <span>Website maintained by AI agents</span>
            </div>
          </div>
          <div className="footer-social">
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

        body {
          background-color: var(--bg-color);
          color: var(--text-main);
          font-family: var(--font-sans);
          overflow-x: hidden;
          width: 100vw;
          min-height: 100vh;
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
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 2rem;
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
          height: 240px;
          overflow: hidden;
          position: relative;
          background: #1a1a1a;
        }

        .card-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
          transition: opacity 0.4s ease, transform 0.6s ease;
          filter: grayscale(100%);
        }

        .card:hover .card-image-container img {
          opacity: 1;
          transform: scale(1.05);
          filter: grayscale(0%);
        }

        .card-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #666;
          margin-bottom: 1rem;
          border-bottom: 1px solid #222;
          padding-bottom: 1rem;
        }

        .card-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
          font-weight: 400;
          line-height: 1.1;
        }

        .card-desc {
          font-size: 0.9rem;
          color: #888;
          line-height: 1.5;
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .card-footer {
          margin-top: auto;
        }

        .register-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
          border: 1px solid #333;
          border-radius: 100px;
          color: var(--text-main);
          text-decoration: none;
          font-size: 0.8rem;
          transition: all 0.3s ease;
        }

        .card:hover .register-btn {
          border-color: var(--text-main);
          background: var(--text-main);
          color: var(--bg-color);
        }

        .card.empty-state {
          background: transparent;
          border: 1px dashed #333;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }
        
        .empty-content {
          text-align: center;
          color: #444;
        }

        .empty-content div:first-child {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-content span {
          display: block;
          margin-top: 1rem;
          font-family: var(--font-serif);
          font-size: 1.25rem;
        }

        footer {
          border-top: 1px solid var(--border-color);
          padding: 3rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
          color: #555;
        }

        .footer-social {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-social a {
          color: #555;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
        }

        .footer-social a:hover {
          color: var(--text-main);
        }

        .footer-social svg {
          width: 20px;
          height: 20px;
        }

        /* Agent badge */
        .agent-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px solid #222;
          border-radius: 100px;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
          font-size: 0.8rem;
          color: #666;
          transition: all 0.4s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .agent-badge::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 100px;
          padding: 1px;
          background: linear-gradient(135deg, #BCFF00, #FF3500, #002AF0, #FF9FC2);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .agent-badge:hover::before {
          opacity: 1;
        }

        .agent-badge:hover {
          color: #aaa;
          border-color: transparent;
        }

        .agent-badge .bot-icon {
          width: 16px;
          height: 16px;
          background: #BCFF00;
          border-radius: 4px;
          position: relative;
          flex-shrink: 0;
        }

        .agent-badge .bot-icon::before {
          content: "🤖";
          position: absolute;
          font-size: 10px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: grayscale(1) brightness(0);
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

          footer {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}