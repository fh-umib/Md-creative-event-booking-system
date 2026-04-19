import { useEffect, useState } from 'react';
import { createPublicBooking } from '../../services/bookingApi';
import { getPublicPackages } from '../../services/packageApi';
import type { PackageItem } from '../../services/packageApi';

type BookingFormState = {
  full_name: string;
  email: string;
  phone: string;
  event_title: string;
  event_type: string;
  event_date: string;
  start_time: string;
  end_time: string;
  venue_name: string;
  venue_address: string;
  guest_count: number;
  special_requests: string;
  package_id: number | '';
};

const initialForm: BookingFormState = {
  full_name: '',
  email: '',
  phone: '',
  event_title: '',
  event_type: '',
  event_date: '',
  start_time: '',
  end_time: '',
  venue_name: '',
  venue_address: '',
  guest_count: 0,
  special_requests: '',
  package_id: '',
};

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
        width: 50, height: 50, borderRadius: '50%',
        background: '#c8841a', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(200,132,26,0.45)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
        transition: 'opacity 0.3s, transform 0.3s',
        pointerEvents: visible ? 'auto' : 'none',
      }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: '#7a6a52', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SuccessScreen({ name, onReset }: { name: string; onReset: () => void }) {
  const firstName = name.split(' ')[0] || 'there';
  return (
    <div style={{ minHeight: '100vh', background: '#faf6f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <style>{`
        @keyframes popIn { 0%{opacity:0;transform:scale(0.6) rotate(-10deg)} 70%{transform:scale(1.1) rotate(2deg)} 100%{opacity:1;transform:scale(1) rotate(0)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes sparkPop { 0%,100%{opacity:0;transform:scale(0) rotate(0deg)} 50%{opacity:1;transform:scale(1) rotate(20deg)} }
        .s-icon  { animation: popIn 0.7s cubic-bezier(.34,1.56,.64,1) both; }
        .s-float { animation: floatBob 3.2s ease-in-out infinite; }
        .s-t1 { animation: fadeSlideUp 0.5s ease both 0.35s; }
        .s-t2 { animation: fadeSlideUp 0.5s ease both 0.5s; }
        .s-t3 { animation: fadeSlideUp 0.5s ease both 0.65s; }
        .s-t4 { animation: fadeSlideUp 0.5s ease both 0.8s; }
        .sp { animation: sparkPop 2s ease-in-out infinite; }
        .s-btn:hover { transform: translateY(-3px) !important; box-shadow: 0 14px 36px rgba(200,132,26,0.45) !important; }
      `}</style>
      <div style={{ maxWidth: 580, width: '100%', textAlign: 'center' }}>
        {/* icon */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 36 }}>
          {[{ t: -12, l: -14, d: '0s' }, { t: -16, r: -10, d: '0.5s' }, { b: 2, l: -20, d: '0.9s' }, { b: -4, r: -18, d: '1.3s' }].map((s, i) => (
            <div key={i} className="sp" style={{ position: 'absolute', ...(s.t !== undefined ? { top: s.t } : { bottom: s.b }), ...(s.l !== undefined ? { left: s.l } : { right: s.r }), animationDelay: s.d }}>
              <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
                <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" fill="#c8841a" />
              </svg>
            </div>
          ))}
          <div className="s-icon s-float" style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg,#fef3d0,#fde09a)', border: '4px solid #c8841a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, boxShadow: '0 16px 48px rgba(200,132,26,0.28)' }}>
            🎉
          </div>
        </div>

        <h1 className="s-t1" style={{ margin: '0 0 8px', fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(34px,6vw,54px)', fontWeight: 700, lineHeight: 1.08, color: '#1a120b' }}>
          Thank you, {firstName}!
        </h1>
        <h2 className="s-t1" style={{ margin: '0 0 22px', fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(24px,4vw,36px)', fontWeight: 600, fontStyle: 'italic', color: '#c8841a', lineHeight: 1.1 }}>
          You chose the best for your celebration.
        </h2>

        <p className="s-t2" style={{ margin: '0 0 36px', fontSize: 17, lineHeight: 1.9, color: '#6b5a45', maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
          We are truly honored to be part of your special moment. Our team will personally review your request and reach out within <strong style={{ color: '#1a120b' }}>24 hours</strong> to start bringing your vision to life. ✨
        </p>

        <div className="s-t3" style={{ background: '#fff', borderRadius: 22, border: '1.5px solid #eddec4', padding: '26px 28px', marginBottom: 28, textAlign: 'left', boxShadow: '0 6px 24px rgba(200,132,26,0.09)' }}>
          <p style={{ margin: '0 0 18px', fontSize: 11, fontWeight: 700, color: '#c8841a', letterSpacing: '0.14em', textTransform: 'uppercase' }}>What happens next</p>
          {[
            { icon: '📞', title: 'Personal call', text: 'We contact you to confirm every detail and understand your vision' },
            { icon: '🎨', title: 'Custom proposal', text: 'Our team prepares a tailored setup made exactly for your event' },
            { icon: '🎊', title: 'Your magic day', text: 'We arrive, transform the space, and make every moment unforgettable' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 2 ? 18 : 0, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 26, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <p style={{ margin: '0 0 3px', fontWeight: 700, fontSize: 15, color: '#1a120b' }}>{s.title}</p>
                <p style={{ margin: 0, fontSize: 14, color: '#7a6a52', lineHeight: 1.6 }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="s-t4 s-btn" onClick={onReset} style={{ height: 54, borderRadius: 14, border: 'none', background: '#c8841a', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', padding: '0 36px', fontFamily: 'inherit', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 6px 20px rgba(200,132,26,0.32)' }}>
          Submit Another Booking
        </button>
      </div>
    </div>
  );
}

export default function BookingPage() {
  const [form, setForm] = useState<BookingFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [error, setError] = useState('');
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  useEffect(() => {
    getPublicPackages().then((d) => setPackages(d.filter((i) => i.is_active))).catch(() => setPackages([]));
  }, []);

  const handleChange = (key: keyof BookingFormState, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true); setError('');
      await createPublicBooking(form);
      setSubmittedName(form.full_name);
      setSubmitted(true);
      setForm(initialForm);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit booking');
    } finally {
      setSubmitting(false);
    }
  };

  const quotes = [
    'Every great celebration starts with a single decision.',
    'Your story deserves to be told in the most beautiful way.',
    'The moments you plan today become memories for a lifetime.',
    'Great events don\'t happen — they\'re crafted with love.',
  ];
  const quote = quotes[Math.floor(Date.now() / 86400000) % quotes.length];

  if (submitted) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=DM+Sans:wght@400;500;700&display=swap');`}</style>
        <SuccessScreen name={submittedName} onReset={() => { setSubmitted(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        <ScrollToTop />
      </>
    );
  }

  const inp: React.CSSProperties = {
    height: 50, borderRadius: 12,
    border: '1.5px solid #e6d9c4',
    padding: '0 16px', fontSize: 15,
    outline: 'none', background: '#fffcf7',
    color: '#1a120b', width: '100%',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const twoCol: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: 16,
  };

  const sectionIcon = (emoji: string) => (
    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#fef3d0', border: '1.5px solid #c8841a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
      {emoji}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;700&display=swap');
        .bp { font-family: 'DM Sans', sans-serif; background: #faf6f0; }
        .bp-serif { font-family: 'Cormorant Garamond', serif; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes bp-spin { to{transform:rotate(360deg)} }
        .a1{animation:fadeUp .5s ease both .05s} .a2{animation:fadeUp .5s ease both .18s}
        .a3{animation:fadeUp .5s ease both .3s}  .a4{animation:fadeUp .5s ease both .42s}
        .bp-inp:focus { border-color:#c8841a !important; background:#fffdf5 !important; box-shadow:0 0 0 3px rgba(200,132,26,.14) !important; }
        .bp-pkg { transition: border-color .2s, transform .2s, box-shadow .2s; cursor: pointer; }
        .bp-pkg:hover { border-color:#c8841a !important; transform:translateY(-3px); box-shadow:0 10px 28px rgba(200,132,26,.18) !important; }
        .bp-pkg-sel { border-color:#c8841a !important; background:#fffbf2 !important; box-shadow:0 6px 24px rgba(200,132,26,.2) !important; }
        .bp-sub { transition: transform .2s, box-shadow .2s; }
        .bp-sub:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 16px 40px rgba(200,132,26,.45) !important; }
        .bp-sub:disabled { opacity:.65; cursor:not-allowed; }
        .ticker { display:inline-flex; animation:marquee 24s linear infinite; }
        @media(max-width:639px) {
          .bp-hgrid { grid-template-columns:1fr !important; }
          .bp-himg  { display:none !important; }
          .bp-pgrid { grid-template-columns:1fr !important; }
        }
        @media(min-width:640px) and (max-width:1023px) {
          .bp-pgrid { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>

      <div className="bp">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div style={{ background: 'linear-gradient(135deg,#1a120b 0%,#2c1a0a 55%,#1a120b 100%)', position: 'relative', overflow: 'hidden' }}>
          {/* diagonal pattern */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(200,132,26,.035) 0,rgba(200,132,26,.035) 1px,transparent 1px,transparent 56px)', pointerEvents: 'none' }} />
          {/* glow */}
          <div style={{ position: 'absolute', top: '50%', left: '55%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,132,26,.14) 0%,transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '60px 22px 54px' : '84px 44px 76px', position: 'relative', zIndex: 1 }}>
            <div className="bp-hgrid" style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 400px', gap: isMobile ? 28 : 56, alignItems: 'center' }}>

              <div>
                <div className="a1" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(200,132,26,.12)', border: '1px solid rgba(200,132,26,.3)', borderRadius: 99, padding: '8px 18px', marginBottom: 26 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8841a' }} />
                  <span style={{ color: '#e8b56a', fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase' }}>Reserve Your Date</span>
                </div>

                <h1 className="bp-serif a2" style={{ margin: '0 0 6px', color: '#fff', fontSize: isMobile ? '42px' : isTablet ? '58px' : '72px', lineHeight: 1.02, fontWeight: 700 }}>
                  Your dream event
                </h1>
                <h1 className="bp-serif a2" style={{ margin: '0 0 26px', fontStyle: 'italic', color: '#c8841a', fontSize: isMobile ? '42px' : isTablet ? '58px' : '72px', lineHeight: 1.02, fontWeight: 600 }}>
                  starts right here.
                </h1>

                <p className="a3" style={{ margin: '0 0 32px', color: 'rgba(255,255,255,.68)', fontSize: isMobile ? '16px' : '18px', lineHeight: 1.9, maxWidth: 540 }}>
                  You deserve a celebration that feels like a dream. Fill in the details below — our team takes care of everything, from the first balloon to the last sparkle.
                </p>

                {/* quote */}
                <div className="a3" style={{ borderLeft: '3px solid #c8841a', paddingLeft: 20, marginBottom: 34 }}>
                  <p className="bp-serif" style={{ margin: 0, color: 'rgba(255,255,255,.78)', fontSize: isMobile ? '17px' : '20px', fontStyle: 'italic', lineHeight: 1.55 }}>
                    "{quote}"
                  </p>
                </div>

                {/* trust pills */}
                <div className="a4" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {['5,000+ Happy Clients', '800+ Events', 'Kosovo #1 Choice'].map((b) => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 99, padding: '7px 16px' }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M6.5 1L7.9 5.1H12.2L8.7 7.6L9.9 11.7L6.5 9.2L3.1 11.7L4.3 7.6L0.8 5.1H5.1Z" fill="#c8841a" />
                      </svg>
                      <span style={{ color: 'rgba(255,255,255,.78)', fontSize: 13, fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* hero image */}
              {!isTablet && (
                <div className="bp-himg" style={{ height: 480, borderRadius: 24, backgroundImage: 'linear-gradient(rgba(26,18,11,.18),rgba(26,18,11,.18)),url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid rgba(200,132,26,.22)', boxShadow: '0 28px 64px rgba(0,0,0,.4)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(26,18,11,.88)', borderRadius: 16, padding: '16px 18px', border: '1px solid rgba(200,132,26,.2)' }}>
                    <p style={{ margin: '0 0 4px', color: '#c8841a', fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Premium Event Planning</p>
                    <p style={{ margin: 0, color: '#fff', fontSize: 15, fontWeight: 600 }}>Let's make your moment unforgettable ✨</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* scrolling ticker */}
          <div style={{ borderTop: '1px solid rgba(200,132,26,.18)', padding: '14px 0', overflow: 'hidden' }}>
            <div className="ticker">
              {[...Array(2)].map((_, ri) => (
                <span key={ri} style={{ display: 'inline-flex' }}>
                  {['Weddings', 'Birthdays', 'Engagements', 'Baby Showers', 'Anniversaries', 'Grand Openings', 'Corporate Events', 'Graduations'].map((t) => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 16, paddingRight: 40 }}>
                      <span style={{ color: '#c8841a', fontSize: 13 }}>✦</span>
                      <span style={{ color: 'rgba(255,255,255,.48)', fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>{t}</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── PACKAGE PICKER ─────────────────────────────────────────── */}
        {packages.length > 0 && (
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '48px 22px 0' : '64px 44px 0' }}>
            <p style={{ margin: '0 0 6px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>Step 1 of 2</p>
            <h2 className="bp-serif" style={{ margin: '0 0 6px', fontSize: isMobile ? '30px' : '40px', fontWeight: 700, color: '#1a120b', lineHeight: 1.1 }}>Choose your package</h2>
            <p style={{ margin: '0 0 26px', color: '#7a6a52', fontSize: 15 }}>Pick the one that fits your celebration — customizable later.</p>

            <div className="bp-pgrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {packages.map((pkg) => {
                const sel = form.package_id === pkg.id;
                return (
                  <div key={pkg.id} className={`bp-pkg${sel ? ' bp-pkg-sel' : ''}`}
                    onClick={() => handleChange('package_id', sel ? '' : pkg.id)}
                    style={{ background: '#fff', borderRadius: 20, border: `1.5px solid ${sel ? '#c8841a' : '#e6d9c4'}`, padding: '22px', position: 'relative', boxShadow: sel ? '0 6px 24px rgba(200,132,26,.2)' : '0 2px 8px rgba(26,18,11,.04)' }}>
                    {sel && (
                      <div style={{ position: 'absolute', top: 14, right: 14, width: 24, height: 24, borderRadius: '50%', background: '#c8841a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 6.5l3.5 3.5L11 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                    <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 800, color: '#1a120b', paddingRight: sel ? 32 : 0 }}>{pkg.title}</h3>
                    <p style={{ margin: '0 0 16px', fontSize: 13, color: '#7a6a52', lineHeight: 1.7 }}>
                      {pkg.description ? pkg.description.slice(0, 85) + (pkg.description.length > 85 ? '…' : '') : 'Premium event package'}
                    </p>
                    <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#c8841a' }}>€{pkg.base_price}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── FORM ──────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '44px 22px 80px' : '56px 44px 96px' }}>
          <p style={{ margin: '0 0 6px', color: '#c8841a', fontSize: 12, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>
            {packages.length > 0 ? 'Step 2 of 2' : 'Let\'s get started'}
          </p>
          <h2 className="bp-serif" style={{ margin: '0 0 6px', fontSize: isMobile ? '30px' : '40px', fontWeight: 700, color: '#1a120b', lineHeight: 1.1 }}>Tell us about your event</h2>
          <p style={{ margin: '0 0 30px', color: '#7a6a52', fontSize: 15 }}>Every detail helps us craft the perfect experience for you.</p>

          {error && (
            <div style={{ background: '#fff1f1', color: '#991b1b', border: '1.5px solid #fecaca', borderRadius: 16, padding: '16px 20px', fontSize: 15, fontWeight: 600, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="10" cy="10" r="9" fill="#ef4444" />
                <path d="M10 6v4M10 14h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ background: '#fff', borderRadius: 26, border: '1.5px solid #e6d9c4', padding: isMobile ? '26px 18px' : '44px', boxShadow: '0 8px 48px rgba(26,18,11,.07)', display: 'flex', flexDirection: 'column', gap: 30 }}>

              {/* Personal */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                  {sectionIcon('👤')}
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#1a120b' }}>Your Details</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={twoCol}>
                    <Field label="Full Name"><input className="bp-inp" style={inp} type="text" value={form.full_name} onChange={(e) => handleChange('full_name', e.target.value)} placeholder="Jane Doe" required /></Field>
                    <Field label="Email Address"><input className="bp-inp" style={inp} type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="jane@email.com" required /></Field>
                  </div>
                  <div style={twoCol}>
                    <Field label="Phone Number"><input className="bp-inp" style={inp} type="text" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+383 44 000 000" /></Field>
                    <Field label="Number of Guests"><input className="bp-inp" style={inp} type="number" value={form.guest_count} onChange={(e) => handleChange('guest_count', Number(e.target.value))} min={1} placeholder="50" /></Field>
                  </div>
                </div>
              </div>

              <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#e6d9c4 30%,#e6d9c4 70%,transparent)' }} />

              {/* Event */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                  {sectionIcon('🎊')}
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#1a120b' }}>Event Information</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={twoCol}>
                    <Field label="Event Title"><input className="bp-inp" style={inp} type="text" value={form.event_title} onChange={(e) => handleChange('event_title', e.target.value)} placeholder="Emma's 5th Birthday" /></Field>
                    <Field label="Event Type"><input className="bp-inp" style={inp} type="text" value={form.event_type} onChange={(e) => handleChange('event_type', e.target.value)} placeholder="Birthday, Wedding, Engagement…" /></Field>
                  </div>
                  <div style={twoCol}>
                    <Field label="Event Date"><input className="bp-inp" style={inp} type="date" value={form.event_date} onChange={(e) => handleChange('event_date', e.target.value)} required /></Field>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <Field label="Start Time"><input className="bp-inp" style={inp} type="time" value={form.start_time} onChange={(e) => handleChange('start_time', e.target.value)} /></Field>
                      <Field label="End Time"><input className="bp-inp" style={inp} type="time" value={form.end_time} onChange={(e) => handleChange('end_time', e.target.value)} /></Field>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#e6d9c4 30%,#e6d9c4 70%,transparent)' }} />

              {/* Venue */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                  {sectionIcon('📍')}
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#1a120b' }}>Venue</span>
                </div>
                <div style={twoCol}>
                  <Field label="Venue Name"><input className="bp-inp" style={inp} type="text" value={form.venue_name} onChange={(e) => handleChange('venue_name', e.target.value)} placeholder="Grand Ballroom" /></Field>
                  <Field label="Venue Address"><input className="bp-inp" style={inp} type="text" value={form.venue_address} onChange={(e) => handleChange('venue_address', e.target.value)} placeholder="Street, City" /></Field>
                </div>
              </div>

              <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#e6d9c4 30%,#e6d9c4 70%,transparent)' }} />

              {/* Vision */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                  {sectionIcon('✨')}
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#1a120b' }}>Your Vision</span>
                </div>
                <Field label="Special Requests & Notes">
                  <textarea className="bp-inp" style={{ ...inp, height: 'auto', minHeight: 120, padding: '14px 16px', resize: 'vertical' }}
                    value={form.special_requests}
                    onChange={(e) => handleChange('special_requests', e.target.value)}
                    placeholder="Tell us your dream — colors, theme, atmosphere, special moments you want captured…" />
                </Field>
              </div>

              {/* Submit */}
              <div>
                <button type="submit" className="bp-sub" disabled={submitting} style={{
                  width: '100%', height: 60, border: 'none', borderRadius: 16,
                  background: 'linear-gradient(135deg,#d4911e 0%,#b87318 100%)',
                  color: '#fff', fontSize: 17, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 8px 28px rgba(200,132,26,.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                }}>
                  {submitting ? (
                    <>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: 'bp-spin .9s linear infinite' }}>
                        <circle cx="10" cy="10" r="8" stroke="rgba(255,255,255,.3)" strokeWidth="2.5" />
                        <path d="M10 2a8 8 0 0 1 8 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                      Submitting your request…
                    </>
                  ) : (
                    <>
                      Send My Booking Request
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10h12M11 5l5 5-5 5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
                <p style={{ margin: '12px 0 0', textAlign: 'center', color: '#a89070', fontSize: 13 }}>
                  🔒 Your information is private. We respond within 24 hours.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ScrollToTop />
    </>
  );

  
}