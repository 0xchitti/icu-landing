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
          <div className="crest-wrapper">
            <svg height="24" viewBox="0 0 879 158" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="2.508" width="37.619" height="77.746" fill="white"/>
              <rect x="37.619" y="80.254" width="37.619" height="77.746" fill="white"/>
              <circle cx="179.318" cy="79" r="62.071" stroke="white" strokeWidth="33.857"/>
              <path d="M284.397 78.508L282.792 76.808V14.116L284.397 12.416H290.44L292.139 14.116V76.808L290.44 78.508H284.397ZM305.051 78.508L303.446 76.808V14.116L305.145 12.416H317.23L318.93 13.738L329.41 69.161H334.036V14.116L335.642 12.511H341.779L343.384 14.116V76.808L341.684 78.508H323.084V78.319L321.385 77.092L312.793 32.055V76.808L311.188 78.508H305.051ZM356.316 78.508L354.711 76.808V14.116L356.41 12.416H368.496L370.195 13.738L380.675 69.161H385.302V14.116L386.907 12.511H393.044L394.649 14.116V76.808L392.949 78.508H374.349V78.319L372.65 77.092L364.058 32.055V76.808L362.453 78.508H356.316ZM435.245 78.508C417.023 78.508 402.199 63.684 402.199 45.462C402.199 27.24 417.023 12.416 435.245 12.416C453.467 12.416 468.291 27.24 468.291 45.462C468.291 46.501 468.291 47.539 468.196 48.578L466.497 50.089H412.113C414.19 61.041 423.915 69.066 435.245 69.066C443.837 69.066 451.768 64.44 455.922 56.886L457.433 56.037H464.136L465.647 58.397C460.454 70.577 448.558 78.508 435.245 78.508ZM412.113 40.647H458.377C456.205 29.789 446.575 21.858 435.245 21.858C424.009 21.858 414.379 29.789 412.113 40.647ZM477.471 78.508L475.866 76.808V14.116L477.471 12.416H489.84C503.719 12.416 515.049 23.746 515.049 37.626C515.049 47.35 509.384 56.226 500.603 60.38L510.611 70.294V72.654L506.268 76.997H503.908L489.745 62.74H485.213V76.808L483.608 78.508H477.471ZM485.213 53.393H489.651H489.84C498.621 53.393 505.702 46.312 505.702 37.626C505.702 28.845 498.621 21.858 489.84 21.858H489.651H485.213V53.393ZM570.784 78.508C552.562 78.508 537.738 63.684 537.738 45.462C537.738 27.24 552.562 12.416 570.784 12.416C586.552 12.416 600.242 23.652 603.263 39.136L601.658 41.119H595.427L593.822 39.797C591.178 29.222 581.737 21.858 570.784 21.858C557.755 21.858 547.18 32.433 547.18 45.462C547.18 58.492 557.755 69.066 570.784 69.066C581.737 69.066 591.178 61.702 593.822 51.127L595.427 49.805H601.658L603.263 51.788C600.242 67.272 586.552 78.508 570.784 78.508ZM612.457 78.508L610.852 76.808V14.116L612.457 12.416H618.5L620.199 14.116V76.808L618.5 78.508H612.457ZM633.111 78.508L631.506 76.808V14.116L633.111 12.416H645.479C659.359 12.416 670.689 23.746 670.689 37.626C670.689 47.35 665.024 56.226 656.243 60.38L666.251 70.294V72.654L661.908 76.997H659.547L645.385 62.74H640.853V76.808L639.248 78.508H633.111ZM640.853 53.393H645.291H645.479C654.26 53.393 661.341 46.312 661.341 37.626C661.341 28.845 654.26 21.858 645.479 21.858H645.291H640.853V53.393ZM707.522 78.508C689.3 78.508 674.476 63.684 674.476 45.462C674.476 27.24 689.3 12.416 707.522 12.416C723.29 12.416 736.98 23.652 740.001 39.136L738.396 41.119H732.165L730.56 39.797C727.916 29.222 718.474 21.858 707.522 21.858C694.493 21.858 683.918 32.433 683.918 45.462C683.918 58.492 694.493 69.066 707.522 69.066C718.474 69.066 727.916 61.702 730.56 51.127L732.165 49.805H738.396L740.001 51.788C736.98 67.272 723.29 78.508 707.522 78.508ZM749.195 78.508L747.59 76.808V14.116L749.195 12.416H755.332L756.937 14.116V69.066H785.168L786.773 70.766V76.808L785.168 78.508H749.195ZM823.606 78.508C805.384 78.508 790.561 63.684 790.561 45.462C790.561 27.24 805.384 12.416 823.606 12.416C841.829 12.416 856.652 27.24 856.652 45.462C856.652 46.501 856.652 47.539 856.558 48.578L854.858 50.089H800.474C802.551 61.041 812.276 69.066 823.606 69.066C832.198 69.066 840.129 64.44 844.284 56.886L845.794 56.037H852.498L854.008 58.397C848.816 70.577 836.919 78.508 823.606 78.508ZM800.474 40.647H846.738C844.567 29.789 834.936 21.858 823.606 21.858C812.371 21.858 802.74 29.789 800.474 40.647ZM280.715 154.508L279.015 152.808V116.647L309.323 88.888L310.362 88.416H316.499L318.104 90.116V152.808L316.499 154.508H310.362L308.756 152.808V138.646H288.363V152.808L286.757 154.508H280.715ZM288.363 129.204H308.756V102.107L288.363 120.801V129.204ZM358.716 154.508C340.494 154.508 325.67 139.684 325.67 121.462C325.67 103.24 340.494 88.416 358.716 88.416C374.484 88.416 388.174 99.652 391.195 115.136L389.59 117.119H383.359L381.754 115.797C379.11 105.222 369.668 97.858 358.716 97.858C345.687 97.858 335.112 108.433 335.112 121.462C335.112 134.492 345.687 145.066 358.716 145.066C369.668 145.066 379.11 137.702 381.754 127.127L383.359 125.805H389.59L391.195 127.788C388.174 143.272 374.484 154.508 358.716 154.508ZM396.707 154.508L395.007 152.808V116.647L425.315 88.888L426.354 88.416H432.491L434.096 90.116V152.808L432.491 154.508H426.354L424.749 152.808V138.646H404.355V152.808L402.749 154.508H396.707ZM404.355 129.204H424.749V102.107L404.355 120.801V129.204ZM447.044 154.508L445.439 152.808V90.116L447.044 88.416H465.266C483.489 88.416 498.218 103.24 498.218 121.462C498.218 139.684 483.489 154.508 465.266 154.508H447.044ZM454.786 145.066H465.266C478.296 145.066 488.871 134.492 488.871 121.462C488.871 108.433 478.296 97.858 465.266 97.858H454.786V145.066ZM535.009 154.508C516.787 154.508 501.963 139.684 501.963 121.462C501.963 103.24 516.787 88.416 535.009 88.416C553.232 88.416 568.055 103.24 568.055 121.462C568.055 122.501 568.055 123.539 567.961 124.578L566.261 126.088H511.877C513.954 137.041 523.679 145.066 535.009 145.066C543.601 145.066 551.532 140.44 555.686 132.886L557.197 132.037H563.901L565.411 134.397C560.218 146.577 548.322 154.508 535.009 154.508ZM511.877 116.647H558.141C555.97 105.789 546.339 97.858 535.009 97.858C523.774 97.858 514.143 105.789 511.877 116.647ZM577.33 154.508L575.63 152.808V90.116L577.33 88.416H589.51L591.115 89.738L601.595 145.161H607.638L618.118 89.738L619.817 88.416H631.903L633.602 90.116V152.808L631.903 154.508H625.86L624.16 152.808V108.149L615.663 153.092L613.963 154.508H595.269L593.57 153.092L585.072 108.055V152.808L583.373 154.508H577.33ZM664.512 154.508L662.812 152.808V116.741L641.191 95.12V94.648V92.76L645.534 88.416H647.894L667.533 108.055L687.172 88.416H689.626L693.875 92.76V95.12L672.254 116.741V152.808L670.649 154.508H664.512Z" fill="white"/>
            </svg>
          </div>
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

            {/* Coming Soon Card */}
            <article className="card empty-state">
              <div className="empty-content">
                <div>🔥</div>
                <span>More sessions coming soon</span>
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
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 60px 0 40px;
        }

        .crest-wrapper {
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeIn 1s var(--easing) 0.2s forwards;
        }

        h1 {
          font-family: var(--font-serif);
          font-size: 6rem;
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
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: 2rem;
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
          border-radius: 8px;
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
          height: 380px;
          overflow: hidden;
          position: relative;
          background: #1a1a1a;
          border-radius: 8px 8px 0 0;
        }

        .card-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.9;
          transition: opacity 0.4s ease, transform 0.6s ease;
          filter: grayscale(70%);
        }

        .card:hover .card-image-container img {
          opacity: 1;
          transform: scale(1.02);
          filter: grayscale(0%);
        }

        .card-content {
          padding: 1rem 1.5rem 1.5rem;
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
          margin-bottom: 0.75rem;
          border-bottom: 1px solid #222;
          padding-bottom: 0.5rem;
        }

        .card-title {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
          font-weight: 400;
          line-height: 1.2;
        }

        .card-desc {
          font-size: 0.85rem;
          color: #888;
          line-height: 1.4;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .card-footer {
          margin-top: auto;
        }

        .register-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 20px;
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
          min-height: 300px;
        }
        
        .empty-content {
          text-align: center;
          color: #444;
        }

        .empty-content div:first-child {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .empty-content span {
          display: block;
          margin-top: 1rem;
          font-family: var(--font-serif);
          font-size: 1.1rem;
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
          
          header {
            min-height: 60vh;
            padding: 40px 0 20px;
          }
          
          h1 {
            font-size: 3.5rem;
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