import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/constants';

export default function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage('');
    setErrorMessage('');

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Kyçja dështoi.');
      }

      const token = data?.data?.token || data?.token;
      const user = data?.data?.user || data?.user;

      if (!token || !user) {
        throw new Error('Të dhënat e kyçjes nuk janë kthyer si duhet nga serveri.');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setMessage('U kyçët me sukses. Mirë se vini përsëri!');

      window.setTimeout(() => {
        navigate('/');
      }, 900);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Diçka shkoi gabim. Ju lutem provoni përsëri.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

        @keyframes signinFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes signinCardEnter {
          from {
            opacity: 0;
            transform: translateY(26px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .signin-page {
          min-height: 100vh;
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at 12% 18%, rgba(212,145,30,.18), transparent 30%),
            radial-gradient(circle at 88% 82%, rgba(212,145,30,.14), transparent 28%),
            linear-gradient(135deg, #fffaf2 0%, #ffffff 48%, #f7efe3 100%);
          font-family: 'DM Sans', system-ui, sans-serif;
          animation: signinFadeIn .45s ease;
        }

        .signin-card {
          width: min(100%, 1040px);
          display: grid;
          grid-template-columns: 1.08fr .92fr;
          border-radius: 32px;
          overflow: hidden;
          background: rgba(255,255,255,.95);
          border: 1px solid #eadfce;
          box-shadow: 0 24px 70px rgba(26,18,11,.15);
          opacity: 0;
          animation: signinCardEnter .65s ease;
          transition: opacity .35s ease, transform .25s ease, box-shadow .25s ease;
        }

        .signin-card.visible {
          opacity: 1;
        }

        .signin-left {
          position: relative;
          overflow: hidden;
          padding: 44px;
          color: #ffffff;
          background:
            radial-gradient(circle at 18% 18%, rgba(212,145,30,.34), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
        }

        .signin-left::after {
          content: "MD";
          position: absolute;
          right: -20px;
          bottom: -38px;
          font-size: clamp(120px, 18vw, 210px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.09);
          pointer-events: none;
        }

        .signin-logo {
          position: relative;
          z-index: 1;
          width: 60px;
          height: 60px;
          border-radius: 19px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 950;
          box-shadow: 0 16px 34px rgba(212,145,30,.25);
          margin-bottom: 30px;
        }

        .signin-kicker {
          position: relative;
          z-index: 1;
          margin: 0 0 10px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .signin-title {
          position: relative;
          z-index: 1;
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 6vw, 68px);
          line-height: .95;
          font-weight: 700;
        }

        .signin-title span {
          color: #d4911e;
          font-style: italic;
        }

        .signin-subtitle {
          position: relative;
          z-index: 1;
          margin: 18px 0 0;
          max-width: 470px;
          color: rgba(255,255,255,.70);
          font-size: 14px;
          line-height: 1.8;
        }

        .signin-info-list {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 12px;
          margin-top: 34px;
        }

        .signin-info-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,.78);
          font-size: 13px;
          font-weight: 750;
        }

        .signin-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #d4911e;
          box-shadow: 0 0 0 5px rgba(212,145,30,.12);
          flex-shrink: 0;
        }

        .signin-right {
          padding: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .signin-form {
          width: 100%;
          max-width: 420px;
          display: grid;
          gap: 15px;
        }

        .signin-form-title {
          margin: 0;
          color: #1a120b;
          font-size: clamp(26px, 3vw, 34px);
          line-height: 1.1;
          font-weight: 950;
        }

        .signin-form-text {
          margin: -5px 0 10px;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.55;
        }

        .signin-alert {
          border-radius: 15px;
          padding: 13px 14px;
          font-size: 13px;
          line-height: 1.45;
          font-weight: 850;
        }

        .signin-alert.success {
          color: #047857;
          background: #ecfdf5;
          border: 1px solid #bbf7d0;
        }

        .signin-alert.error {
          color: #991b1b;
          background: #fff1f2;
          border: 1px solid #fecdd3;
        }

        .signin-field {
          display: grid;
          gap: 7px;
        }

        .signin-label {
          color: #6b5132;
          font-size: 11px;
          font-weight: 950;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .signin-input {
          width: 100%;
          min-height: 54px;
          border: 1.5px solid #eadfce;
          border-radius: 15px;
          padding: 0 16px;
          background: #fffdf9;
          color: #1a120b;
          font-size: 14px;
          font-weight: 700;
          outline: none;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .signin-input:focus {
          border-color: #d4911e;
          box-shadow: 0 0 0 4px rgba(212,145,30,.14);
          background: #ffffff;
        }

        .signin-row {
          display: flex;
          justify-content: flex-end;
          margin-top: -4px;
        }

        .signin-link {
          color: #9a5d0a;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
        }

        .signin-link:hover {
          text-decoration: underline;
        }

        .signin-button {
          min-height: 54px;
          border: none;
          border-radius: 15px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          font-size: 15px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 14px 28px rgba(200,132,26,.28);
          transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
        }

        .signin-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 18px 34px rgba(200,132,26,.36);
        }

        .signin-button:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .signin-register {
          text-align: center;
          color: #8a7558;
          font-size: 14px;
          margin: 2px 0 0;
        }

        .signin-register a {
          color: #9a5d0a;
          font-weight: 950;
          text-decoration: none;
        }

        .signin-register a:hover {
          text-decoration: underline;
        }

        .signin-home {
          display: inline-flex;
          justify-content: center;
          color: #9a5d0a;
          font-size: 14px;
          font-weight: 950;
          text-decoration: none;
          margin-top: 4px;
        }

        .signin-home:hover {
          text-decoration: underline;
        }

        .signin-note {
          margin-top: 8px;
          padding: 14px 16px;
          border-radius: 16px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          color: #8a7558;
          font-size: 12px;
          line-height: 1.55;
          text-align: center;
        }

        @media (max-width: 860px) {
          .signin-page {
            padding: 18px;
            align-items: flex-start;
          }

          .signin-card {
            grid-template-columns: 1fr;
            border-radius: 26px;
          }

          .signin-left {
            padding: 34px 26px;
            min-height: 320px;
          }

          .signin-right {
            padding: 32px 24px;
          }
        }

        @media (max-width: 520px) {
          .signin-page {
            padding: 12px;
          }

          .signin-card {
            border-radius: 22px;
          }

          .signin-left {
            padding: 28px 22px;
            min-height: 300px;
          }

          .signin-logo {
            width: 54px;
            height: 54px;
            border-radius: 17px;
            font-size: 20px;
            margin-bottom: 26px;
          }

          .signin-info-list {
            margin-top: 26px;
          }

          .signin-right {
            padding: 28px 20px;
          }

          .signin-input,
          .signin-button {
            min-height: 50px;
          }
        }
      `}</style>

      <main className="signin-page">
        <section className={`signin-card ${isVisible ? 'visible' : ''}`}>
          <div className="signin-left">
            <div className="signin-logo">MD</div>

            <p className="signin-kicker">Mirë se vini</p>

            <h1 className="signin-title">
              Kyçu në <span>MD Creative</span>
            </h1>

            <p className="signin-subtitle">
              Kyçu për të vazhduar me rezervimet, për të ruajtur detajet e eventit dhe për ta
              organizuar festën tuaj në mënyrë më të lehtë.
            </p>

            <div className="signin-info-list">
              <div className="signin-info-item">
                <span className="signin-dot" />
                Qasje e sigurt në llogari
              </div>
              <div className="signin-info-item">
                <span className="signin-dot" />
                Rezervimet në një vend
              </div>
              <div className="signin-info-item">
                <span className="signin-dot" />
                Evente më të organizuara
              </div>
              <div className="signin-info-item">
                <span className="signin-dot" />
                Përvojë më e lehtë për klientë
              </div>
            </div>
          </div>

          <div className="signin-right">
            <form className="signin-form" onSubmit={handleSubmit}>
              <div>
                <h2 className="signin-form-title">Kyçja në llogari</h2>
                <p className="signin-form-text">
                  Shkruaj emailin dhe fjalëkalimin për të vazhduar.
                </p>
              </div>

              {message && <div className="signin-alert success">{message}</div>}
              {errorMessage && <div className="signin-alert error">{errorMessage}</div>}

              <label className="signin-field">
                <span className="signin-label">Email</span>
                <input
                  className="signin-input"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="email@example.com"
                />
              </label>

              <label className="signin-field">
                <span className="signin-label">Fjalëkalimi</span>
                <input
                  className="signin-input"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
              </label>

              <div className="signin-row">
                <Link to="/forgot-password" className="signin-link">
                  Keni harruar fjalëkalimin?
                </Link>
              </div>

              <button className="signin-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Duke u kyçur...' : 'Kyçu'}
              </button>

              <p className="signin-register">
                Nuk keni llogari? <Link to="/register">Krijo llogari</Link>
              </p>

              <Link to="/" className="signin-home">
                Kthehu në faqen kryesore
              </Link>

              <div className="signin-note">
                Pas kyçjes, klienti mund të vazhdojë me rezervimin dhe të menaxhojë më lehtë
                të dhënat e eventit.
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}