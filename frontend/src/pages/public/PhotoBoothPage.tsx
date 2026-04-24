import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Classic Booth',
    subtitle: 'Elegant setup for birthdays and private celebrations',
    price: '€80',
    unit: '/session',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    icon: '📷',
    tag: 'Most Loved',
  },
  {
    title: 'Luxury Mirror Booth',
    subtitle: 'Interactive premium mirror photo experience',
    price: '€120',
    unit: '/session',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    icon: '🪞',
    tag: 'Premium',
  },
  {
    title: 'Wedding Photo Corner',
    subtitle: 'Romantic setup with prints, props and elegant lighting',
    price: '€150',
    unit: '/session',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    icon: '💍',
    tag: 'Wedding Special',
  },
];

const included = [
  { icon: '📷', title: 'Pro Equipment', text: 'State-of-the-art cameras and lighting for flawless results.' },
  { icon: '⚡', title: 'Instant Prints', text: 'Physical prints ready within seconds for your guests.' },
  { icon: '🖼️', title: 'Digital Copies', text: 'All photos delivered digitally for easy sharing on social media.' },
  { icon: '✨', title: 'Custom Backdrops', text: 'Branded or themed props and backdrops to match your event.' },
];

const tags = ['On-site technician', 'Unlimited sessions', 'Social sharing station', 'Custom props'];

// ── Hooks ─────────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return w;
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: 28, right: 24, zIndex: 999,
        width: 48, height: 48, borderRadius: '50%',
        background: '#c8841a', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(200,132,26,.45)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.85)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function PhotoBoothPage() {
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        .pb { font-family: 'DM Sans', sans-serif; background: #faf7f2; }
        .pb-serif { font-family: 'Cormorant Garamond', serif; }

        @keyframes pb-fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pb-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .pb-a1 { animation: pb-fadeUp .55s ease both .05s; }
        .pb-a2 { animation: pb-fadeUp .55s ease both .18s; }
        .pb-a3 { animation: pb-fadeUp .55s ease both .30s; }
        .pb-a4 { animation: pb-fadeUp .55s ease both .42s; }

        .pb-ticker { display: inline-flex; animation: pb-marquee 22s linear infinite; }

        /* service cards */
        .pb-scard { transition: transform .35s ease, box-shadow .35s ease; }
        .pb-scard:hover { transform: translateY(-6px); box-shadow: 0 24px 52px rgba(26,18,11,.14) !important; }
        .pb-scard:hover .pb-scard-img { transform: scale(1.04); }
        .pb-scard-img { transition: transform .5s ease; }
        .pb-scard:hover .pb-scard-overlay { opacity: 1 !important; }
        .pb-scard-overlay { transition: opacity .3s; }

        .pb-book-btn { transition: background .2s, color .2s; }
        .pb-book-btn:hover { background: #c8841a !important; color: #fff !important; border-color: #c8841a !important; }

        /* included cards */
        .pb-icard { transition: transform .3s, box-shadow .3s, background .2s, border-color .2s; }
        .pb-icard:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,.15) !important; background: rgba(255,255,255,.1) !important; border-color: rgba(200,132,26,.4) !important; }
        .pb-icard:hover .pb-icard-icon { background: rgba(200,132,26,.3) !important; }
        .pb-icard-icon { transition: background .2s; }

        /* cta btn */
        .pb-cta-btn { transition: transform .2s, box-shadow .2s; }
        .pb-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(200,132,26,.45) !important; }

        @media (max-width: 639px) {
          .pb-svc-grid { grid-template-columns: 1fr !important; }
          .pb-inc-grid { grid-template-columns: 1fr !important; }
          .pb-cta-btns { flex-direction: column !important; }
          .pb-cta-btns a { text-align: center; }
          .pb-tags      { gap: 8px !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .pb-svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pb-inc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div className="pb">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #1a120b 0%, #2c1a0a 55%, #1a120b 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(200,132,26,.035) 0,rgba(200,132,26,.035) 1px,transparent 1px,transparent 56px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.15) 0%,transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '60px 22px 54px' : '84px 44px 76px', position: 'relative', zIndex: 1, textAlign: 'center' }}>

            <div className="pb-a1" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(200,132,26,.12)', border: '1px solid rgba(200,132,26,.3)', borderRadius: 99, padding: '8px 20px', marginBottom: 28 }}>
              <span style={{ fontSize: 15 }}>📸</span>
              <span style={{ color: '#e8b56a', fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase' }}>Capture Every Moment</span>
            </div>

            <h1 className="pb-serif pb-a2" style={{ margin: '0 0 18px', color: '#fff', fontSize: isMobile ? '44px' : isTablet ? '62px' : '80px', lineHeight: 1.02, fontWeight: 700 }}>
              Photo{' '}
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>Experiences</em>
            </h1>

            <p className="pb-a3" style={{ margin: '0 auto 38px', color: 'rgba(255,255,255,.65)', fontSize: isMobile ? '16px' : '18px', lineHeight: 1.85, maxWidth: 560 }}>
              Professional photo booth services and cutting-edge technology to capture every unforgettable moment at your celebration.
            </p>

            {/* feature pills */}
            <div className="pb-a4" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              {['3 Booth Types', 'Instant Prints', 'Digital Delivery', 'Custom Props'].map((p) => (
                <div key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 99, padding: '8px 16px' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#c8841a' }} />
                  <span style={{ color: 'rgba(255,255,255,.82)', fontSize: 13, fontWeight: 600 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ticker */}
          <div style={{ borderTop: '1px solid rgba(200,132,26,.18)', padding: '13px 0', overflow: 'hidden' }}>
            <div className="pb-ticker">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: 'inline-flex' }}>
                  {['Classic Booth', 'Mirror Booth', 'Wedding Corner', '360° Spin', 'Instant Prints', 'Digital Gallery', 'Custom Backdrop', 'On-Site Tech'].map((t) => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 16, paddingRight: 40 }}>
                      <span style={{ color: '#c8841a', fontSize: 13 }}>✦</span>
                      <span style={{ color: 'rgba(255,255,255,.45)', fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>{t}</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES ─────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '52px 22px 0' : '72px 44px 0' }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 44px' }}>
            <p style={{ margin: '0 0 8px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>Our Stations</p>
            <h2 className="pb-serif" style={{ margin: '0 0 14px', fontSize: isMobile ? '32px' : '48px', fontWeight: 700, color: '#1a120b', lineHeight: 1.08 }}>
              Photo Booth Services
            </h2>
            <p style={{ margin: 0, color: '#7a6a52', fontSize: 16, lineHeight: 1.8 }}>
              Choose the booth that matches your event style and let us capture the magic.
            </p>
          </div>

          <div className="pb-svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {services.map((item) => (
              <article key={item.title} className="pb-scard" style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', border: '1.5px solid #e6d9c4', boxShadow: '0 6px 24px rgba(26,18,11,.06)' }}>

                {/* image */}
                <div style={{ height: 240, overflow: 'hidden', position: 'relative' }}>
                  <div className="pb-scard-img" style={{ position: 'absolute', inset: 0, backgroundImage: `url("${item.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,10,2,.6) 0%, transparent 55%)' }} />
                  <div className="pb-scard-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(200,132,26,.08)', opacity: 0 }} />

                  {/* tag top-left */}
                  <div style={{ position: 'absolute', top: 14, left: 14, background: '#c8841a', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '5px 13px', borderRadius: 99 }}>
                    {item.tag}
                  </div>

                  {/* icon bottom-right */}
                  <div style={{ position: 'absolute', bottom: 14, right: 14, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                    {item.icon}
                  </div>
                </div>

                {/* content */}
                <div style={{ padding: '22px' }}>
                  <h3 className="pb-serif" style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 700, color: '#1a120b', lineHeight: 1.1 }}>{item.title}</h3>
                  <p style={{ margin: '0 0 20px', color: '#7a6a52', fontSize: 14, lineHeight: 1.75, minHeight: 50 }}>{item.subtitle}</p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f0e9dd' }}>
                    <div>
                      <span className="pb-serif" style={{ fontSize: 30, fontWeight: 700, color: '#c8841a', lineHeight: 1 }}>{item.price}</span>
                      <span style={{ fontSize: 13, color: '#9a8878', fontWeight: 500 }}>{item.unit}</span>
                    </div>
                    <Link to="/booking" className="pb-book-btn" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      textDecoration: 'none', background: '#fef3d0', color: '#92640e',
                      padding: '10px 18px', borderRadius: 12,
                      fontSize: 13, fontWeight: 700,
                      border: '1.5px solid #e8d5a0',
                    }}>
                      Book Now
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── WHAT'S INCLUDED ──────────────────────────────────────────── */}
        <div style={{ padding: isMobile ? '52px 22px' : '72px 44px' }}>
          <div style={{
            maxWidth: 1280, margin: '0 auto',
            background: 'linear-gradient(135deg, #1a120b 0%, #2c1a0a 100%)',
            borderRadius: 28, padding: isMobile ? '44px 24px' : '60px 56px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -40, left: 80, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center', marginBottom: 44 }}>
                <p style={{ margin: '0 0 8px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>What's Included</p>
                <h2 className="pb-serif" style={{ margin: 0, fontSize: isMobile ? '30px' : '46px', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                  Every service <em style={{ fontStyle: 'italic', color: '#c8841a' }}>includes.</em>
                </h2>
              </div>

              <div className="pb-inc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 36 }}>
                {included.map((item) => (
                  <div key={item.title} className="pb-icard" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 20, padding: '26px 20px', textAlign: 'center' }}>
                    <div className="pb-icard-icon" style={{ width: 56, height: 56, borderRadius: 16, margin: '0 auto 16px', background: 'rgba(200,132,26,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
                      {item.icon}
                    </div>
                    <h3 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{item.title}</h3>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,.6)', fontSize: 14, lineHeight: 1.75 }}>{item.text}</p>
                  </div>
                ))}
              </div>

              {/* tags */}
              <div className="pb-tags" style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                {tags.map((t) => (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 99, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.78)', fontSize: 13, fontWeight: 600 }}>
                    <span style={{ color: '#c8841a' }}>✦</span>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
        <div style={{ padding: isMobile ? '0 22px 72px' : '0 44px 96px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: 40, height: 1.5, background: '#c8841a', margin: '0 auto 28px' }} />
            <p style={{ margin: '0 0 10px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>Create Lasting Memories</p>
            <h2 className="pb-serif" style={{ margin: '0 0 18px', fontSize: isMobile ? '30px' : '50px', fontWeight: 700, color: '#1a120b', lineHeight: 1.08 }}>
              Add a professional photo experience<br />
              <em style={{ fontStyle: 'italic', color: '#c8841a' }}>to your next event.</em>
            </h2>
            <p style={{ margin: '0 auto 36px', maxWidth: 520, color: '#7a6a52', fontSize: 16, lineHeight: 1.85 }}>
              Perfect for birthdays, weddings, engagements, baby showers and themed celebrations.
            </p>
            <div className="pb-cta-btns" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/booking" className="pb-cta-btn" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                textDecoration: 'none', background: '#c8841a', color: '#fff',
                padding: '15px 30px', borderRadius: 99, fontWeight: 700, fontSize: 15,
                boxShadow: '0 6px 24px rgba(200,132,26,.35)',
              }}>
                Book a Photo Booth
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/packages" style={{
                display: 'inline-flex', alignItems: 'center',
                textDecoration: 'none', background: '#fff', color: '#1a120b',
                padding: '15px 28px', borderRadius: 99, fontWeight: 700, fontSize: 15,
                border: '1.5px solid #e6d9c4',
              }}>
                View Packages
              </Link>
            </div>
          </div>
        </div>

      </div>

      <ScrollToTop />
    </>
  );
}