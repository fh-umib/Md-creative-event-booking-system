import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/constants';

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

type FormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  general?: string;
};

type RegisterResponse = {
  success?: boolean;
  message?: string;
  data?: {
    user?: unknown;
    verificationEmailSent?: boolean;
    message?: string;
  };
  user?: unknown;
  verificationEmailSent?: boolean;
};

const initialForm: FormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password: string) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

function isValidPhone(phone: string) {
  const cleaned = phone.replace(/\s+/g, '');
  return /^\+?[0-9]{8,15}$/.test(cleaned);
}

function getApiBaseUrl() {
  const cleanBaseUrl = API_BASE_URL.replace(/\/$/, '');

  if (cleanBaseUrl.endsWith('/api')) {
    return cleanBaseUrl;
  }

  return `${cleanBaseUrl}/api`;
}

async function readResponse(response: Response): Promise<RegisterResponse> {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text) as RegisterResponse;
  } catch {
    throw new Error(
      'Serveri nuk ktheu përgjigje JSON. Kontrollo që API URL të përfundojë me /api.',
    );
  }
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
      general: '',
    }));

    setSuccessMessage('');
  }

  function validateForm() {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Emri i plotë është i detyrueshëm.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Emri duhet të ketë së paku 3 karaktere.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Emaili është i detyrueshëm.';
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = 'Shkruani një email të vlefshëm.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Numri i telefonit është i detyrueshëm.';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Shkruani një numër telefoni të vlefshëm.';
    }

    if (!formData.password) {
      newErrors.password = 'Fjalëkalimi është i detyrueshëm.';
    } else if (!isStrongPassword(formData.password)) {
      newErrors.password =
        'Duhet së paku 8 karaktere, shkronjë e madhe, e vogël, numër dhe karakter special.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmoni fjalëkalimin.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Fjalëkalimet nuk përputhen.';
    }

    return newErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage('');
      return;
    }

    try {
      setIsSubmitting(true);
      setSuccessMessage('');
      setErrors({});

      const apiBaseUrl = getApiBaseUrl();

      const response = await fetch(`${apiBaseUrl}/auth/client-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          phone: formData.phone.trim(),
        }),
      });

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(data?.message || 'Regjistrimi dështoi.');
      }

      const verificationEmailSent =
        data?.data?.verificationEmailSent ?? data?.verificationEmailSent;

      const messageFromServer = data?.data?.message || data?.message;

      if (messageFromServer) {
        setSuccessMessage(messageFromServer);
      } else if (verificationEmailSent === false) {
        setSuccessMessage(
          'Llogaria u krijua me sukses. Në versionin online, llogaria është aktivizuar automatikisht.',
        );
      } else {
        setSuccessMessage(
          'Llogaria u krijua me sukses. Kontrolloni emailin për verifikim.',
        );
      }

      setFormData(initialForm);
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : 'Diçka shkoi gabim. Ju lutem provoni përsëri.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

        @keyframes registerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes registerCardEnter {
          from {
            opacity: 0;
            transform: translateY(18px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .register-page {
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
          animation: registerFadeIn .45s ease;
        }

        .register-shell {
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
          animation: registerCardEnter .55s ease;
        }

        .register-shell.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .register-left {
          position: relative;
          overflow: hidden;
          padding: 26px;
          color: #ffffff;
          background:
            radial-gradient(circle at 18% 18%, rgba(212,145,30,.34), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
        }

        .register-left::after {
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

        .register-logo {
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

        .register-kicker {
          position: relative;
          z-index: 1;
          margin: 0 0 9px;
          color: #d4911e;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .register-title {
          position: relative;
          z-index: 1;
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5.5vw, 62px);
          line-height: .95;
          font-weight: 700;
        }

        .register-title span {
          color: #d4911e;
          font-style: italic;
        }

        .register-subtitle {
          position: relative;
          z-index: 1;
          margin: 18px 0 0;
          max-width: 430px;
          color: rgba(255,255,255,.72);
          font-size: 14px;
          line-height: 1.75;
        }

        .register-info-list {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 11px;
          margin-top: 28px;
        }

        .register-info-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,.82);
          font-size: 13px;
          font-weight: 800;
        }

        .register-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #d4911e;
          box-shadow: 0 0 0 5px rgba(212,145,30,.12);
          flex-shrink: 0;
        }

        .register-right {
          padding: 26px 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .register-form {
          width: 100%;
          max-width: 460px;
          display: grid;
          gap: 10px;
        }

        .register-form-title {
          margin: 0;
          color: #1a120b;
          font-size: clamp(28px, 3vw, 36px);
          line-height: 1.1;
          font-weight: 950;
        }

        .register-form-text {
          margin: -4px 0 8px;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.5;
        }

        .register-alert {
          margin: 0;
          padding: 11px 13px;
          border-radius: 13px;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.45;
        }

        .register-alert.success {
          background: #ecfdf5;
          border: 1px solid #bbf7d0;
          color: #047857;
        }

        .register-alert.error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }

        .register-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .register-label {
          color: #6b5a45;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .register-input {
          width: 100%;
          height: 42px;
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

        .register-input::placeholder {
          color: #b8a48e;
        }

        .register-input:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200,132,26,.12);
          background: #ffffff;
        }

        .register-error {
          color: #991b1b;
          font-size: 12px;
          font-weight: 750;
          line-height: 1.35;
        }

        .register-hint {
          padding: 10px 12px;
          border-radius: 13px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          color: #8a7558;
          font-size: 12px;
          line-height: 1.45;
        }

        .register-button {
          height: 46px;
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

        .register-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 34px rgba(200,132,26,.34);
        }

        .register-button:disabled {
          opacity: .68;
          cursor: not-allowed;
        }

        .register-footer {
          margin: 4px 0 0;
          display: flex;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
          color: #7a6a52;
          font-size: 14px;
          line-height: 1.6;
        }

        .register-link {
          color: #9a5d0a;
          font-size: 14px;
          font-weight: 900;
          text-decoration: none;
          transition: opacity .2s ease;
        }

        .register-link:hover {
          opacity: .75;
          text-decoration: underline;
        }

        .register-back {
          margin-top: 4px;
          display: flex;
          justify-content: center;
        }

        .register-note {
          margin: 8px 0 0;
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
          .register-page {
            align-items: flex-start;
            padding: 18px;
          }

          .register-shell {
            grid-template-columns: 1fr;
            max-width: 640px;
          }

          .register-left {
            padding: 32px;
            min-height: 320px;
          }

          .register-right {
            padding: 32px 26px;
          }
        }

        @media (max-width: 560px) {
          .register-page {
            padding: 12px;
          }

          .register-shell {
            border-radius: 22px;
          }

          .register-left,
          .register-right {
            padding: 24px 20px;
          }

          .register-logo {
            width: 50px;
            height: 50px;
            border-radius: 16px;
            font-size: 18px;
            margin-bottom: 20px;
          }

          .register-input,
          .register-button {
            height: 44px;
          }
        }
      `}</style>

      <main className="register-page">
        <section className={`register-shell ${isVisible ? 'visible' : ''}`}>
          <div className="register-left">
            <div className="register-logo">MD</div>

            <p className="register-kicker">Krijo llogari</p>

            <h1 className="register-title">
              Bashkohu me <span>MD Creative</span>
            </h1>

            <p className="register-subtitle">
              Krijo llogarinë tënde për të vazhduar me rezervimet dhe për ta
              organizuar festën më lehtë.
            </p>

            <div className="register-info-list">
              <div className="register-info-item">
                <span className="register-dot" />
                Regjistrim i sigurt
              </div>

              <div className="register-info-item">
                <span className="register-dot" />
                Rezervime më të lehta
              </div>

              <div className="register-info-item">
                <span className="register-dot" />
                Detaje në një vend
              </div>

              <div className="register-info-item">
                <span className="register-dot" />
                Përvojë profesionale
              </div>
            </div>
          </div>

          <div className="register-right">
            <form className="register-form" onSubmit={handleSubmit} noValidate>
              <div>
                <h2 className="register-form-title">Regjistrohu</h2>
                <p className="register-form-text">
                  Plotëso të dhënat për të krijuar llogarinë.
                </p>
              </div>

              {successMessage && (
                <p className="register-alert success">{successMessage}</p>
              )}

              {errors.general && (
                <p className="register-alert error">{errors.general}</p>
              )}

              <div className="register-field">
                <label htmlFor="fullName" className="register-label">
                  Emri i plotë
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="register-input"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Shkruaj emrin e plotë"
                />
                {errors.fullName && (
                  <span className="register-error">{errors.fullName}</span>
                )}
              </div>

              <div className="register-field">
                <label htmlFor="email" className="register-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="register-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <span className="register-error">{errors.email}</span>
                )}
              </div>

              <div className="register-field">
                <label htmlFor="phone" className="register-label">
                  Numri i telefonit
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="register-input"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+383..."
                />
                {errors.phone && (
                  <span className="register-error">{errors.phone}</span>
                )}
              </div>

              <div className="register-field">
                <label htmlFor="password" className="register-label">
                  Fjalëkalimi
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="register-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <span className="register-error">{errors.password}</span>
                )}
              </div>

              <div className="register-field">
                <label htmlFor="confirmPassword" className="register-label">
                  Konfirmo fjalëkalimin
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="register-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <span className="register-error">{errors.confirmPassword}</span>
                )}
              </div>

              <div className="register-hint">
                Fjalëkalimi: së paku 8 karaktere, shkronjë e madhe, e vogël,
                numër dhe karakter special.
              </div>

              <button className="register-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Duke krijuar...' : 'Krijo llogari'}
              </button>

              <p className="register-footer">
                Keni llogari?{' '}
                <Link to="/signin" className="register-link">
                  Kyçuni
                </Link>
              </p>

              <div className="register-back">
                <Link to="/" className="register-link">
                  Kthehu në faqen kryesore
                </Link>
              </div>

              <div className="register-note">
                Në server lokal kërkohet verifikimi i emailit. Në Render,
                llogaria aktivizohet automatikisht për demo.
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}