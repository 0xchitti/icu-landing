import { useState, useEffect } from 'react';
import Head from 'next/head';
import EventCard from '../components/EventCard';

export default function Home() {
  const [lumaEvent, setLumaEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLumaEvent() {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        if (data.events && data.events.length > 0) {
          setLumaEvent(data.events[0]);
        }
      } catch (error) {
        console.error('Failed to fetch Luma event:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchLumaEvent();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchLumaEvent, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Rotating words animation
    const words = ['builders', 'creators', 'designers', 'founders', 'hackers'];
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
    const interval = setInterval(rotateWords, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Inner Circle University</title>
        <meta name="description" content="Cracked builders learn from cracked people." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="container">
        <header>
          <h1>
            Cracked{' '}
            <span className="rotating-word">
              <span className="word active" data-word="builders">builders</span>
              <span className="word" data-word="creators">creators</span>
              <span className="word" data-word="designers">designers</span>
              <span className="word" data-word="founders">founders</span>
              <span className="word" data-word="hackers">hackers</span>
            </span>
            <br />
            learn from
            <br />
            cracked people.
          </h1>
          
          <p className="tagline">Learn from top contributors of Inner Circle.</p>
          
          <div className="subtext">
            Hands-on Workshops
            <span>•</span>
            Virtual
          </div>
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
            {/* Dynamic Luma Event */}
            {loading ? (
              <article className="card">
                <div className="card-image-container">
                  <img src="https://images.unsplash.com/photo-1555421689-3f034debb7a6?q=80&w=2670&auto=format&fit=crop" alt="Loading..." />
                </div>
                <div className="card-content">
                  <div className="card-meta">
                    <span>Loading...</span>
                    <span>Loading...</span>
                  </div>
                  <h3 className="card-title">Loading Event...</h3>
                  <p className="card-desc">Fetching latest event details...</p>
                  <div className="card-footer">
                    <a href="#" className="register-btn">Loading...</a>
                  </div>
                </div>
              </article>
            ) : lumaEvent ? (
              <EventCard event={lumaEvent} />
            ) : (
              <article className="card">
                <div className="card-image-container">
                  <img src="https://images.unsplash.com/photo-1555421689-3f034debb7a6?q=80&w=2670&auto=format&fit=crop" alt="Academy by Inner Circle" />
                </div>
                <div className="card-content">
                  <div className="card-meta">
                    <span>Past Event</span>
                    <span>249 Went</span>
                  </div>
                  <h3 className="card-title">Academy by Inner Circle</h3>
                  <p className="card-desc">BUILD & DEPLOY YOUR AI SIDEKICK IN 3 HOURS</p>
                  <div className="card-footer">
                    <a href="https://luma.com/aiy8g48n" className="register-btn">View Event</a>
                  </div>
                </div>
              </article>
            )}

            {/* Static Events */}
            <article className="card">
              <div className="card-image-container">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" alt="System Design Workshop" />
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span>Oct 12 • 10:00 AM</span>
                  <span>Indiranagar</span>
                </div>
                <h3 className="card-title">Distributed Systems at Scale</h3>
                <p className="card-desc">A deep dive into eventual consistency, sharding strategies, and failure modes with the CTO of Nexus.</p>
                <div className="card-footer">
                  <a href="#" className="register-btn">Register Interest</a>
                </div>
              </div>
            </article>

            <article className="card">
              <div className="card-image-container">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Growth Engineering" />
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span>Oct 24 • 2:00 PM</span>
                  <span>Koramangala</span>
                </div>
                <h3 className="card-title">The Physics of Viral Growth</h3>
                <p className="card-desc">Mathematical modeling of referral loops and retention cohorts. No marketing fluff, just data pipelines.</p>
                <div className="card-footer">
                  <a href="#" className="register-btn">Register Interest</a>
                </div>
              </div>
            </article>

            <article className="card">
              <div className="card-image-container">
                <img src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2670&auto=format&fit=crop" alt="Founder Psychology" />
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span>Nov 05 • 6:00 PM</span>
                  <span>Whitefield</span>
                </div>
                <h3 className="card-title">Founder Psychology & Resilience</h3>
                <p className="card-desc">Navigating the trough of sorrow. An intimate roundtable with serial entrepreneurs who exited.</p>
                <div className="card-footer">
                  <a href="#" className="register-btn">Register Interest</a>
                </div>
              </div>
            </article>

            <article className="card empty-state">
              <div className="empty-content">
                <div>📚</div>
                <span>More sessions in planning</span>
              </div>
            </article>

            <article className="card empty-state">
              <div className="empty-content">
                <div>⚡</div>
                <span>Join the waitlist</span>
              </div>
            </article>
          </div>
        </section>

        <footer>
          <div className="footer-logo">Inner Circle</div>
          <div className="agent-badge">
            <div className="bot-icon">🤖</div>
            <span>Website maintained by AI agents</span>
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
        .rotating-word .word:nth-child(1).active {
          color: #BCFF00;
        }
        .rotating-word .word:nth-child(2).active {
          color: #FF3500;
        }
        .rotating-word .word:nth-child(3).active {
          color: #002AF0;
        }
        .rotating-word .word:nth-child(4).active {
          color: #FF9FC2;
        }
        .rotating-word .word:nth-child(5).active {
          color: #00D4FF;
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
          font-family: var(--font-sans);
          background: var(--bg-color);
          color: var(--text-main);
          line-height: 1.6;
          overflow-x: hidden;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        header {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        h1 {
          font-family: var(--font-serif);
          font-size: 7rem;
          font-weight: 500;
          line-height: 0.85;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
          color: var(--text-main);
        }

        .tagline {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          font-weight: 400;
        }

        .subtext {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.9rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .subtext span {
          color: #333;
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

        .footer-logo {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.25rem;
          color: var(--text-main);
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
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          line-height: 1;
          color: #000;
          font-weight: 700;
          flex-shrink: 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 20px;
          }
          
          h1 {
            font-size: 4rem;
          }
          
          .grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .section-title {
            font-size: 2rem;
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