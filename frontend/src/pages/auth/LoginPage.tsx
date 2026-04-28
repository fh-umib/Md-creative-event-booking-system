import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);
      await login(form.email, form.password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Kyçja dështoi. Kontrolloni emailin dhe fjalëkalimin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
          background:
            radial-gradient(circle at 15% 20%, rgba(212,145,30,.18), transparent 30%),
            radial-gradient(circle at 85% 80%, rgba(212,145,30,.14), transparent 28%),
            linear-gradient(135deg, #fffaf2 0%, #ffffff 48%, #f7efe3 100%);
        }

        .login-shell {
          width: min(100%, 980px);
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          border-radius: 30px;
          overflow: hidden;
          background: rgba(255,255,255,.94);
          border: 1px solid #eadfce;
          box-shadow: 0 22px 60px rgba(26,18,11,.14);
        }

        .login-brand {
          position: relative;
          overflow: hidden;
          padding: 42px;
          color: #ffffff;
          background:
            radial-gradient(circle at 18% 18%, rgba(212,145,30,.34), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
        }

        .login-brand::after {
          content: "MD";
          position: absolute;
          right: -18px;
          bottom: -34px;
          font-size: clamp(110px, 18vw, 190px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.09);
          pointer-events: none;
        }

        .login-logo {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 950;
          box-shadow: 0 16px 34px rgba(212,145,30,.24);
          margin-bottom: 28px;
        }

        .login-kicker {
          margin: 0 0 10px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .login-brand-title {
          position: relative;
          z-index: 1;
          margin: 0;
          font-size: clamp(30px, 4vw, 48px);
          line-height: 1.04;
          font-weight: 950;
        }

        .login-brand-title span {
          color: #d4911e;
          font-style: italic;
        }

        .login-brand-text {
          position: relative;
          z-index: 1;
          margin: 14px 0 0;
          max-width: 430px;
          color: rgba(255,255,255,.68);
          font-size: 14px;
          line-height: 1.75;
        }

        .login-brand-list {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 12px;
          margin-top: 34px;
        }

        .login-brand-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,.76);
          font-size: 13px;
          font-weight: 750;
        }

        .login-brand-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #d4911e;
          box-shadow: 0 0 0 5px rgba(212,145,30,.12);
          flex-shrink: 0;
        }

        .login-card {
          padding: 42px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .login-title {
          margin: 0;
          color: #1a120b;
          font-size: clamp(25px, 3vw, 34px);
          line-height: 1.1;
          font-weight: 950;
        }

        .login-text {
          margin: 9px 0 26px;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.6;
        }

        .login-form {
          display: grid;
          gap: 15px;
        }

        .login-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .login-label {
          color: #6b5a45;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .login-input {
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

        .login-input::placeholder {
          color: #b8a48e;
        }

        .login-input:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .login-error {
          margin: 0;
          padding: 12px 14px;
          border-radius: 14px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          font-size: 13px;
          font-weight: 750;
          line-height: 1.45;
        }

        .login-button {
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

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 34px rgba(200,132,26,.34);
        }

        .login-button:disabled {
          opacity: .68;
          cursor: not-allowed;
        }

        .login-register {
          margin: 20px 0 0;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.6;
        }

        .login-register a {
          color: #9a5d0a;
          font-weight: 900;
          text-decoration: none;
        }

        .login-register a:hover {
          text-decoration: underline;
        }

        .login-footnote {
          margin: 22px 0 0;
          padding: 13px 14px;
          border-radius: 16px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          color: #8a7558;
          font-size: 12px;
          line-height: 1.55;
        }

        @media (max-width: 860px) {
          .login-shell {
            grid-template-columns: 1fr;
          }

          .login-brand {
            padding: 32px;
          }

          .login-card {
            padding: 32px;
          }

          .login-brand-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin-top: 26px;
          }
        }

        @media (max-width: 520px) {
          .login-page {
            padding: 16px;
            align-items: flex-start;
          }

          .login-shell {
            border-radius: 22px;
          }

          .login-brand,
          .login-card {
            padding: 24px;
          }

          .login-logo {
            width: 50px;
            height: 50px;
            border-radius: 16px;
            font-size: 19px;
            margin-bottom: 20px;
          }

          .login-brand-list {
            grid-template-columns: 1fr;
          }

          .login-input,
          .login-button {
            height: 45px;
          }
        }
      `}</style>

      <main className="login-page">
        <section className="login-shell">
          <div className="login-brand">
            <div className="login-logo">MD</div>

            <p className="login-kicker">Admin Panel</p>

            <h1 className="login-brand-title">
              MD Creative <span>Management</span>
            </h1>

            <p className="login-brand-text">
              Kyçu për të menaxhuar rezervimet, paketat, maskotat, dekorimet, galerinë dhe përmbajtjen që
              klientët e shohin në faqen publike.
            </p>

            <div className="login-brand-list">
              <div className="login-brand-item">
                <span className="login-brand-dot" />
                Rezervime
              </div>

              <div className="login-brand-item">
                <span className="login-brand-dot" />
                Paketa
              </div>

              <div className="login-brand-item">
                <span className="login-brand-dot" />
                Galeri
              </div>

              <div className="login-brand-item">
                <span className="login-brand-dot" />
                Analitikë
              </div>
            </div>
          </div>

          <div className="login-card">
            <h2 className="login-title">Kyçja në admin</h2>
            <p className="login-text">
              Shkruaj emailin dhe fjalëkalimin për të hyrë në panelin e administrimit.
            </p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-field">
                <label htmlFor="email" className="login-label">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Shkruaj emailin"
                  className="login-input"
                  required
                />
              </div>

              <div className="login-field">
                <label htmlFor="password" className="login-label">
                  Fjalëkalimi
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Shkruaj fjalëkalimin"
                  className="login-input"
                  required
                />
              </div>

              {error && <p className="login-error">{error}</p>}

              <button type="submit" disabled={isSubmitting} className="login-button">
                {isSubmitting ? 'Duke u kyçur...' : 'Kyçu'}
              </button>
            </form>

            <p className="login-register">
              Nuk keni llogari? <Link to="/register">Regjistrohuni</Link>
            </p>

            <p className="login-footnote">
              Qasja në admin panel është e dedikuar vetëm për personat e autorizuar të MD Creative.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}