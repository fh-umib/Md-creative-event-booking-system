import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/constants';

type LoginResponse = {
  success?: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: unknown;
  };
  token?: string;
  user?: unknown;
};

function getApiBaseUrl() {
  const cleanBaseUrl = API_BASE_URL.replace(/\/$/, '');

  if (cleanBaseUrl.endsWith('/api')) {
    return cleanBaseUrl;
  }

  return `${cleanBaseUrl}/api`;
}

async function readResponse(response: Response): Promise<LoginResponse> {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text) as LoginResponse;
  } catch {
    throw new Error(
      'Serveri nuk ktheu përgjigje JSON. Kontrollo që API URL të përfundojë me /api.',
    );
  }
}

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

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMessage('Emaili është i detyrueshëm.');
      return;
    }

    if (!password) {
      setErrorMessage('Fjalëkalimi është i detyrueshëm.');
      return;
    }

    try {
      setIsSubmitting(true);

      const apiBaseUrl = getApiBaseUrl();

      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          password,
        }),
      });

      const data = await readResponse(response);

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

      localStorage.setItem('md_auth_token', token);
      localStorage.setItem('md_auth_user', JSON.stringify(user));

      setMessage('U kyçët me sukses. Mirë se vini përsëri!');

      window.setTimeout(() => {
        navigate('/');
      }, 800);
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
            transform: translateY(18px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .signin-page {
          min-height: 100vh;
          padding: 14px;
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

        .signin-shell {
          width: min(100%, 980px);
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(255,255,255,.95);
          border: 1px solid #eadfce;
          box-shadow: 0 18px 46px rgba(26,18,11,.13);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .35s ease, transform .35s ease;
          animation: signinCardEnter .55s ease;
        }

        .signin-shell.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .signin-left {
          position: relative;
          overflow: hidden;
          padding: 34px;
          color: #ffffff;
          background:
            radial-gradient(circle at 18% 18%, rgba(212,145,30,.34), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
        }

        .signin-left::after {
          content: "MD";
          position: absolute;
          right: -18px;
          bottom: -34px;
          font-size: clamp(120px, 18vw, 210px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.09);
          pointer-events: none;
        }

        .signin-logo {
          position: relative;
          z-index: 1;
          width: 54px;
          height: 54px;
          border-radius: 17px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 950;
          box-shadow: 0 14px 30px rgba(212,145,30,.25);
          margin-bottom: 24px;
        }

        .signin-kicker {
          position: relative;
          z-index: 1;
          margin: 0 0 9px;
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
          font-size: clamp(38px, 5.5vw, 62px);
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
          max-width: 430px;
          color: rgba(255,255,255,.72);
          font-size: 14px;
          line-height: 1.75;
        }

        .signin-info-list {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 11px;
          margin-top: 28px;
        }

        .signin-info-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,.82);
          font-size: 13px;
          font-weight: 800;
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
          padding: 34px 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .signin-form {
          width: 100%;
          max-width: 430px;
          display: grid;
          gap: 13px;
        }

        .signin-form-title {
          margin: 0;
          color: #1a120b;
          font-size: clamp(28px, 3vw, 36px);
          line-height: 1.1;
          font-weight: 950;
        }

        .signin-form-text {
          margin: -4px 0 10px;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.5;
        }

        .signin-alert {
          margin: 0;
          padding: 12px 14px;
          border-radius: 13px;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.45;
        }

        .signin-alert.success {
          background: #ecfdf5;
          border: 1px solid #bbf7d0;
          color: #047857;
        }

        .signin-alert.error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }

        .signin-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .signin-label {
          color: #6b5a45;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .signin-input {
          width: 100%;
          height: 46px;
          border-radius: 13px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          padding: 0 13px;
          font-size: 14px;
          font-weight: 650;
          outline: none;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .signin-input::placeholder {
          color: #b8a48e;
        }

        .signin-input:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .signin-forgot {
          display: flex;
          justify-content: flex-end;
          margin-top: -4px;
        }

        .signin-button {
          height: 48px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          font-size: 14px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 12px 26px rgba(200,132,26,.26);
          transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
          margin-top: 2px;
        }

        .signin-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 34px rgba(200,132,26,.34);
        }

        .signin-button:disabled {
          opacity: .68;
          cursor: not-allowed;
        }

        .signin-footer {
          margin: 4px 0 0;
          display: flex;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.6;
        }

        .signin-link {
          color: #9a5d0a;
          font-size: 14px;
          font-weight: 900;
          text-decoration: none;
          transition: opacity .2s ease;
        }

        .signin-link:hover {
          opacity: .75;
          text-decoration: underline;
        }

        .signin-back {
          margin-top: 4px;
          display: flex;
          justify-content: center;
        }

        .signin-note {
          margin: 10px 0 0;
          padding: 12px 14px;
          border-radius: 15px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          color: #8a7558;
          font-size: 12px;
          line-height: 1.5;
          text-align: center;
        }

        @media (max-width: 900px) {
          .signin-page {
            align-items: flex-start;
            padding: 18px;
          }

          .signin-shell {
            grid-template-columns: 1fr;
            max-width: 640px;
          }

          .signin-left {
            padding: 32px;
            min-height: 320px;
          }

          .signin-right {
            padding: 32px 26px;
          }
        }

        @media (max-width: 560px) {
          .signin-page {
            padding: 12px;
          }

          .signin-shell {
            border-radius: 22px;
          }

          .signin-left,
          .signin-right {
            padding: 24px 20px;
          }

          .signin-logo {
            width: 50px;
            height: 50px;
            border-radius: 16px;
            font-size: 18px;
            margin-bottom: 20px;
          }

          .signin-input,
          .signin-button {
            height: 44px;
          }
        }
      `}</style>

      <main className="signin-page">
        <section className={`signin-shell ${isVisible ? 'visible' : ''}`}>
          <div className="signin-left">
            <div className="signin-logo">MD</div>

            <p className="signin-kicker">Mirë se vini</p>

            <h1 className="signin-title">
              Kyçu në <span>MD Creative</span>
            </h1>

            <p className="signin-subtitle">
              Kyçu për të vazhduar me rezervimet, për të ruajtur detajet e eventit
              dhe për ta organizuar festën tuaj në mënyrë më të lehtë.
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
            <form className="signin-form" onSubmit={handleSubmit} noValidate>
              <div>
                <h2 className="signin-form-title">Kyçja në llogari</h2>
                <p className="signin-form-text">
                  Shkruaj emailin dhe fjalëkalimin për të vazhduar.
                </p>
              </div>

              {message && <p className="signin-alert success">{message}</p>}

              {errorMessage && (
                <p className="signin-alert error">{errorMessage}</p>
              )}

              <div className="signin-field">
                <label htmlFor="email" className="signin-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="signin-input"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setErrorMessage('');
                    setMessage('');
                  }}
                  placeholder="email@example.com"
                />
              </div>

              <div className="signin-field">
                <label htmlFor="password" className="signin-label">
                  Fjalëkalimi
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="signin-input"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrorMessage('');
                    setMessage('');
                  }}
                  placeholder="••••••••"
                />
              </div>

              <div className="signin-forgot">
                <Link to="/forgot-password" className="signin-link">
                  Keni harruar fjalëkalimin?
                </Link>
              </div>

              <button className="signin-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Duke u kyçur...' : 'Kyçu'}
              </button>

              <p className="signin-footer">
                Nuk keni llogari?{' '}
                <Link to="/register" className="signin-link">
                  Krijo llogari
                </Link>
              </p>

              <div className="signin-back">
                <Link to="/" className="signin-link">
                  Kthehu në faqen kryesore
                </Link>
              </div>

              <div className="signin-note">
                Pas kyçjes, klienti mund të vazhdojë me rezervimin dhe të menaxhojë
                më lehtë të dhënat e eventit.
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}