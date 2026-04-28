import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

type ResetState = 'idle' | 'success' | 'error';

function isStrongPassword(password: string) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState<ResetState>('idle');
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
    setStatus('idle');

    if (!token) {
      setStatus('error');
      setErrorMessage('Linku për ndryshimin e fjalëkalimit mungon ose nuk është i vlefshëm.');
      return;
    }

    if (!password.trim()) {
      setStatus('error');
      setErrorMessage('Ju lutem shkruani fjalëkalimin e ri.');
      return;
    }

    if (!isStrongPassword(password)) {
      setStatus('error');
      setErrorMessage(
        'Fjalëkalimi duhet të ketë së paku 8 karaktere, një shkronjë të madhe, një shkronjë të vogël, një numër dhe një karakter special.',
      );
      return;
    }

    if (!confirmPassword.trim()) {
      setStatus('error');
      setErrorMessage('Ju lutem konfirmoni fjalëkalimin e ri.');
      return;
    }

    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Fjalëkalimet nuk përputhen.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Ndryshimi i fjalëkalimit dështoi.');
      }

      setStatus('success');
      setMessage(data?.message || 'Fjalëkalimi u ndryshua me sukses. Tani mund të kyçeni përsëri.');

      setPassword('');
      setConfirmPassword('');

      window.setTimeout(() => {
        navigate('/signin');
      }, 1800);
    } catch (error) {
      setStatus('error');
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

        @keyframes resetFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes resetCardEnter {
          from {
            opacity: 0;
            transform: translateY(26px) scale(.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .reset-page {
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
          animation: resetFadeIn .45s ease;
        }

        .reset-shell {
          width: min(100%, 1040px);
          display: grid;
          grid-template-columns: 1.08fr .92fr;
          border-radius: 32px;
          overflow: hidden;
          background: rgba(255,255,255,.95);
          border: 1px solid #eadfce;
          box-shadow: 0 24px 70px rgba(26,18,11,.15);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .35s ease, transform .35s ease;
          animation: resetCardEnter .65s ease;
        }

        .reset-shell.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reset-left {
          position: relative;
          overflow: hidden;
          padding: 44px;
          color: #ffffff;
          background:
            radial-gradient(circle at 18% 18%, rgba(212,145,30,.34), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
        }

        .reset-left::after {
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

        .reset-logo {
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

        .reset-kicker {
          position: relative;
          z-index: 1;
          margin: 0 0 10px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .reset-title {
          position: relative;
          z-index: 1;
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 6vw, 68px);
          line-height: .95;
          font-weight: 700;
        }

        .reset-title span {
          color: #d4911e;
          font-style: italic;
        }

        .reset-subtitle {
          position: relative;
          z-index: 1;
          margin: 18px 0 0;
          max-width: 470px;
          color: rgba(255,255,255,.70);
          font-size: 14px;
          line-height: 1.8;
        }

        .reset-info-list {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 12px;
          margin-top: 34px;
        }

        .reset-info-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,.78);
          font-size: 13px;
          font-weight: 750;
        }

        .reset-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #d4911e;
          box-shadow: 0 0 0 5px rgba(212,145,30,.12);
          flex-shrink: 0;
        }

        .reset-right {
          padding: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .reset-form {
          width: 100%;
          max-width: 420px;
          display: grid;
          gap: 15px;
        }

        .reset-form-title {
          margin: 0;
          color: #1a120b;
          font-size: clamp(26px, 3vw, 34px);
          line-height: 1.1;
          font-weight: 950;
        }

        .reset-form-text {
          margin: -5px 0 10px;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.65;
        }

        .reset-alert {
          margin: 0;
          padding: 12px 14px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 750;
          line-height: 1.45;
        }

        .reset-alert.success {
          background: #ecfdf5;
          border: 1px solid #bbf7d0;
          color: #047857;
        }

        .reset-alert.error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }

        .reset-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .reset-label {
          color: #6b5a45;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .reset-input {
          width: 100%;
          height: 46px;
          border-radius: 14px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          padding: 0 14px;
          font-size: 14px;
          outline: none;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .reset-input::placeholder {
          color: #b8a48e;
        }

        .reset-input:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .reset-rules {
          margin: -4px 0 0;
          padding: 12px 14px;
          border-radius: 16px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          color: #8a7558;
          font-size: 12px;
          line-height: 1.6;
        }

        .reset-button {
          height: 48px;
          border: none;
          border-radius: 15px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          font-size: 14px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 12px 26px rgba(200,132,26,.26);
          transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
        }

        .reset-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 34px rgba(200,132,26,.34);
        }

        .reset-button:disabled {
          opacity: .68;
          cursor: not-allowed;
        }

        .reset-footer {
          margin: 8px 0 0;
          display: flex;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.6;
        }

        .reset-link {
          color: #9a5d0a;
          font-size: 14px;
          font-weight: 850;
          text-decoration: none;
          transition: opacity .2s ease;
        }

        .reset-link:hover {
          opacity: .75;
          text-decoration: underline;
        }

        .reset-note {
          margin: 10px 0 0;
          padding: 13px 14px;
          border-radius: 16px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          color: #8a7558;
          font-size: 12px;
          line-height: 1.55;
          text-align: center;
        }

        @media (max-width: 900px) {
          .reset-shell {
            grid-template-columns: 1fr;
            max-width: 640px;
          }

          .reset-left {
            padding: 34px;
          }

          .reset-right {
            padding: 34px;
          }

          .reset-info-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin-top: 28px;
          }
        }

        @media (max-width: 560px) {
          .reset-page {
            padding: 16px;
            align-items: flex-start;
          }

          .reset-shell {
            border-radius: 24px;
          }

          .reset-left,
          .reset-right {
            padding: 24px;
          }

          .reset-logo {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            font-size: 19px;
            margin-bottom: 22px;
          }

          .reset-info-list {
            grid-template-columns: 1fr;
          }

          .reset-input,
          .reset-button {
            height: 45px;
          }
        }
      `}</style>

      <main className="reset-page">
        <section className={`reset-shell ${isVisible ? 'visible' : ''}`}>
          <div className="reset-left">
            <div className="reset-logo">MD</div>

            <p className="reset-kicker">Siguria e llogarisë</p>

            <h1 className="reset-title">
              Vendos <span>fjalëkalim të ri</span>
            </h1>

            <p className="reset-subtitle">
              Krijo një fjalëkalim të fortë për ta rikthyer qasjen në llogarinë tënde dhe për ta mbajtur
              të sigurt profilin tënd në MD Creative.
            </p>

            <div className="reset-info-list">
              <div className="reset-info-item">
                <span className="reset-dot" />
                Fjalëkalim më i sigurt
              </div>

              <div className="reset-info-item">
                <span className="reset-dot" />
                Qasje e mbrojtur
              </div>

              <div className="reset-info-item">
                <span className="reset-dot" />
                Verifikim me link
              </div>

              <div className="reset-info-item">
                <span className="reset-dot" />
                Rikthim i shpejtë
              </div>
            </div>
          </div>

          <div className="reset-right">
            <form className="reset-form" onSubmit={handleSubmit}>
              <div>
                <h2 className="reset-form-title">Ndrysho fjalëkalimin</h2>
                <p className="reset-form-text">
                  Shkruaj fjalëkalimin e ri dhe përsërite për konfirmim.
                </p>
              </div>

              {message && <p className="reset-alert success">{message}</p>}
              {errorMessage && <p className="reset-alert error">{errorMessage}</p>}

              {status !== 'success' && (
                <>
                  <div className="reset-field">
                    <label htmlFor="password" className="reset-label">
                      Fjalëkalimi i ri
                    </label>

                    <input
                      id="password"
                      type="password"
                      placeholder="Shkruaj fjalëkalimin e ri"
                      className="reset-input"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>

                  <div className="reset-field">
                    <label htmlFor="confirmPassword" className="reset-label">
                      Konfirmo fjalëkalimin
                    </label>

                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Përsërite fjalëkalimin e ri"
                      className="reset-input"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      required
                    />
                  </div>

                  <p className="reset-rules">
                    Fjalëkalimi duhet të ketë së paku 8 karaktere, shkronjë të madhe, shkronjë të vogël,
                    numër dhe karakter special.
                  </p>

                  <button type="submit" className="reset-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Duke u ndryshuar...' : 'Ndrysho fjalëkalimin'}
                  </button>
                </>
              )}

              <div className="reset-footer">
                <span>E kujtuat fjalëkalimin?</span>
                <Link to="/signin" className="reset-link">
                  Kyçuni
                </Link>
              </div>

              <p className="reset-note">
                Pas ndryshimit të fjalëkalimit do të ridrejtoheni automatikisht te faqja e kyçjes.
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}