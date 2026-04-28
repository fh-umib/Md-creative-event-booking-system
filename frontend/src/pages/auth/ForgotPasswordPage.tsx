import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
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

    if (!email.trim()) {
      setErrorMessage('Ju lutem shkruani emailin tuaj.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Kërkesa për rikthimin e fjalëkalimit dështoi.');
      }

      setMessage(
        data?.message ||
          'Nëse ekziston një llogari me këtë email, linku për ndryshimin e fjalëkalimit është dërguar.',
      );

      setEmail('');
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

        @keyframes forgotFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes forgotCardEnter {
          from {
            opacity: 0;
            transform: translateY(26px) scale(.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .forgot-page {
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
          animation: forgotFadeIn .45s ease;
        }

        .forgot-shell {
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
          animation: forgotCardEnter .65s ease;
        }

        .forgot-shell.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .forgot-left {
          position: relative;
          overflow: hidden;
          padding: 44px;
          color: #ffffff;
          background:
            radial-gradient(circle at 18% 18%, rgba(212,145,30,.34), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
        }

        .forgot-left::after {
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

        .forgot-logo {
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

        .forgot-kicker {
          position: relative;
          z-index: 1;
          margin: 0 0 10px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .forgot-title {
          position: relative;
          z-index: 1;
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 6vw, 68px);
          line-height: .95;
          font-weight: 700;
        }

        .forgot-title span {
          color: #d4911e;
          font-style: italic;
        }

        .forgot-subtitle {
          position: relative;
          z-index: 1;
          margin: 18px 0 0;
          max-width: 470px;
          color: rgba(255,255,255,.70);
          font-size: 14px;
          line-height: 1.8;
        }

        .forgot-info-list {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 12px;
          margin-top: 34px;
        }

        .forgot-info-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,.78);
          font-size: 13px;
          font-weight: 750;
        }

        .forgot-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #d4911e;
          box-shadow: 0 0 0 5px rgba(212,145,30,.12);
          flex-shrink: 0;
        }

        .forgot-right {
          padding: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .forgot-form {
          width: 100%;
          max-width: 420px;
          display: grid;
          gap: 15px;
        }

        .forgot-form-title {
          margin: 0;
          color: #1a120b;
          font-size: clamp(26px, 3vw, 34px);
          line-height: 1.1;
          font-weight: 950;
        }

        .forgot-form-text {
          margin: -5px 0 10px;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.65;
        }

        .forgot-alert {
          margin: 0;
          padding: 12px 14px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 750;
          line-height: 1.45;
        }

        .forgot-alert.success {
          background: #ecfdf5;
          border: 1px solid #bbf7d0;
          color: #047857;
        }

        .forgot-alert.error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }

        .forgot-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .forgot-label {
          color: #6b5a45;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .forgot-input {
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

        .forgot-input::placeholder {
          color: #b8a48e;
        }

        .forgot-input:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .forgot-button {
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

        .forgot-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 34px rgba(200,132,26,.34);
        }

        .forgot-button:disabled {
          opacity: .68;
          cursor: not-allowed;
        }

        .forgot-footer {
          margin: 8px 0 0;
          display: flex;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.6;
        }

        .forgot-link {
          color: #9a5d0a;
          font-size: 14px;
          font-weight: 850;
          text-decoration: none;
          transition: opacity .2s ease;
        }

        .forgot-link:hover {
          opacity: .75;
          text-decoration: underline;
        }

        .forgot-back {
          margin-top: 4px;
          display: flex;
          justify-content: center;
        }

        .forgot-note {
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
          .forgot-shell {
            grid-template-columns: 1fr;
            max-width: 640px;
          }

          .forgot-left {
            padding: 34px;
          }

          .forgot-right {
            padding: 34px;
          }

          .forgot-info-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin-top: 28px;
          }
        }

        @media (max-width: 560px) {
          .forgot-page {
            padding: 16px;
            align-items: flex-start;
          }

          .forgot-shell {
            border-radius: 24px;
          }

          .forgot-left,
          .forgot-right {
            padding: 24px;
          }

          .forgot-logo {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            font-size: 19px;
            margin-bottom: 22px;
          }

          .forgot-info-list {
            grid-template-columns: 1fr;
          }

          .forgot-input,
          .forgot-button {
            height: 45px;
          }
        }
      `}</style>

      <main className="forgot-page">
        <section className={`forgot-shell ${isVisible ? 'visible' : ''}`}>
          <div className="forgot-left">
            <div className="forgot-logo">MD</div>

            <p className="forgot-kicker">Rikthimi i llogarisë</p>

            <h1 className="forgot-title">
              Harruat <span>fjalëkalimin?</span>
            </h1>

            <p className="forgot-subtitle">
              Shkruani emailin tuaj dhe ne do t’ju dërgojmë një link të sigurt për ta ndryshuar
              fjalëkalimin dhe për t’u kthyer përsëri në llogarinë tuaj.
            </p>

            <div className="forgot-info-list">
              <div className="forgot-info-item">
                <span className="forgot-dot" />
                Proces i sigurt
              </div>

              <div className="forgot-info-item">
                <span className="forgot-dot" />
                Link në email
              </div>

              <div className="forgot-info-item">
                <span className="forgot-dot" />
                Qasje e shpejtë
              </div>

              <div className="forgot-info-item">
                <span className="forgot-dot" />
                Llogari e mbrojtur
              </div>
            </div>
          </div>

          <div className="forgot-right">
            <form className="forgot-form" onSubmit={handleSubmit}>
              <div>
                <h2 className="forgot-form-title">Rikthe fjalëkalimin</h2>
                <p className="forgot-form-text">
                  Shkruaj emailin që ke përdorur gjatë regjistrimit. Nëse llogaria ekziston,
                  do të pranosh udhëzimet për ndryshimin e fjalëkalimit.
                </p>
              </div>

              {message && <p className="forgot-alert success">{message}</p>}
              {errorMessage && <p className="forgot-alert error">{errorMessage}</p>}

              <div className="forgot-field">
                <label htmlFor="email" className="forgot-label">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Shkruaj emailin"
                  className="forgot-input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <button type="submit" className="forgot-button" disabled={isSubmitting}>
                {isSubmitting ? 'Duke u dërguar...' : 'Dërgo linkun'}
              </button>

              <div className="forgot-footer">
                <span>E kujtuat fjalëkalimin?</span>
                <Link to="/signin" className="forgot-link">
                  Kyçuni
                </Link>
              </div>

              <div className="forgot-back">
                <Link to="/" className="forgot-link">
                  Kthehu në faqen kryesore
                </Link>
              </div>

              <p className="forgot-note">
                Për siguri, linku i ndryshimit të fjalëkalimit duhet të përdoret vetëm nga pronari i emailit.
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}