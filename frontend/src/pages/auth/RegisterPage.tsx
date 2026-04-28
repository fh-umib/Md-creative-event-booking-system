import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

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
    } else if (!isValidEmail(formData.email)) {
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

      const response = await fetch('http://localhost:5000/api/auth/client-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          phone: formData.phone.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Regjistrimi dështoi.');
      }

      setSuccessMessage(
        data?.message ||
          'Llogaria u krijua me sukses. Kontrolloni emailin për verifikim.',
      );

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
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
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
          font-size: clamp(100px, 17vw, 170px);
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.09);
          pointer-events: none;
        }

        .register-logo {
          position: relative;
          z-index: 1;
          width: 48px;
          height: 48px;
          border-radius: 15px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 950;
          box-shadow: 0 12px 26px rgba(212,145,30,.22);
          margin-bottom: 18px;
        }

        .register-kicker {
          position: relative;
          z-index: 1;
          margin: 0 0 7px;
          color: #d4911e;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .register-title {
          position: relative;
          z-index: 1;
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 5vw, 52px);
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
          margin: 12px 0 0;
          max-width: 420px;
          color: rgba(255,255,255,.70);
          font-size: 13px;
          line-height: 1.55;
        }

        .register-info-list {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 8px;
          margin-top: 20px;
        }

        .register-info-item {
          display: flex;
          align-items: center;
          gap: 9px;
          color: rgba(255,255,255,.78);
          font-size: 12px;
          font-weight: 750;
        }

        .register-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d4911e;
          box-shadow: 0 0 0 4px rgba(212,145,30,.12);
          flex-shrink: 0;
        }

        .register-right {
          padding: 22px 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .register-form {
          width: 100%;
          max-width: 430px;
          display: grid;
          gap: 9px;
        }

        .register-form-title {
          margin: 0;
          color: #1a120b;
          font-size: clamp(23px, 2.6vw, 30px);
          line-height: 1.05;
          font-weight: 950;
        }

        .register-form-text {
          margin: -3px 0 4px;
          color: #7a6a52;
          font-size: 13px;
          line-height: 1.45;
        }

        .register-alert {
          margin: 0;
          padding: 9px 11px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 750;
          line-height: 1.35;
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
          gap: 5px;
        }

        .register-label {
          color: #6b5a45;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .register-input {
          width: 100%;
          height: 38px;
          border-radius: 11px;
          border: 1.5px solid #eadfce;
          background: #fffdf8;
          color: #1a120b;
          padding: 0 12px;
          font-size: 13px;
          outline: none;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .register-input::placeholder {
          color: #b8a48e;
        }

        .register-input:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 3px rgba(200,132,26,.11);
          background: #ffffff;
        }

        .register-input.error {
          border-color: #ef4444;
          background: #fffafa;
        }

        .register-error-text {
          color: #991b1b;
          font-size: 11px;
          font-weight: 750;
          line-height: 1.25;
        }

        .register-rules {
          margin: -1px 0 0;
          padding: 9px 11px;
          border-radius: 13px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          color: #8a7558;
          font-size: 11px;
          line-height: 1.35;
        }

        .register-button {
          height: 40px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          font-size: 13px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 9px 20px rgba(200,132,26,.24);
          transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
        }

        .register-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 13px 28px rgba(200,132,26,.32);
        }

        .register-button:disabled {
          opacity: .68;
          cursor: not-allowed;
        }

        .register-footer {
          margin: 0;
          display: flex;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
          color: #7a6a52;
          font-size: 13px;
          line-height: 1.4;
        }

        .register-link {
          color: #9a5d0a;
          font-size: 13px;
          font-weight: 850;
          text-decoration: none;
          transition: opacity .2s ease;
        }

        .register-link:hover {
          opacity: .75;
          text-decoration: underline;
        }

        .register-back {
          display: flex;
          justify-content: center;
        }

        .register-note {
          margin: 4px 0 0;
          padding: 9px 11px;
          border-radius: 13px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          color: #8a7558;
          font-size: 11px;
          line-height: 1.35;
          text-align: center;
        }

        @media (max-width: 900px) {
          .register-page {
            align-items: flex-start;
          }

          .register-shell {
            grid-template-columns: 1fr;
            max-width: 660px;
          }

          .register-left {
            padding: 24px;
          }

          .register-right {
            padding: 24px;
          }

          .register-info-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin-top: 18px;
          }
        }

        @media (max-width: 560px) {
          .register-page {
            padding: 12px;
            align-items: flex-start;
          }

          .register-shell {
            border-radius: 20px;
          }

          .register-left,
          .register-right {
            padding: 18px;
          }

          .register-logo {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            font-size: 17px;
            margin-bottom: 16px;
          }

          .register-title {
            font-size: 36px;
          }

          .register-subtitle {
            font-size: 12.5px;
          }

          .register-info-list {
            grid-template-columns: 1fr;
          }

          .register-input,
          .register-button {
            height: 38px;
          }

          .register-note {
            display: none;
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
              Krijo llogarinë tënde për të vazhduar me rezervimet dhe për ta organizuar festën
              më lehtë.
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

              {successMessage && <p className="register-alert success">{successMessage}</p>}
              {errors.general && <p className="register-alert error">{errors.general}</p>}

              <div className="register-field">
                <label htmlFor="fullName" className="register-label">
                  Emri i plotë
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Shkruaj emrin e plotë"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`register-input ${errors.fullName ? 'error' : ''}`}
                />

                {errors.fullName && <span className="register-error-text">{errors.fullName}</span>}
              </div>

              <div className="register-field">
                <label htmlFor="email" className="register-label">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Shkruaj emailin"
                  value={formData.email}
                  onChange={handleChange}
                  className={`register-input ${errors.email ? 'error' : ''}`}
                />

                {errors.email && <span className="register-error-text">{errors.email}</span>}
              </div>

              <div className="register-field">
                <label htmlFor="phone" className="register-label">
                  Numri i telefonit
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+383 44 000 000"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`register-input ${errors.phone ? 'error' : ''}`}
                />

                {errors.phone && <span className="register-error-text">{errors.phone}</span>}
              </div>

              <div className="register-field">
                <label htmlFor="password" className="register-label">
                  Fjalëkalimi
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Shkruaj fjalëkalimin"
                  value={formData.password}
                  onChange={handleChange}
                  className={`register-input ${errors.password ? 'error' : ''}`}
                />

                {errors.password && <span className="register-error-text">{errors.password}</span>}
              </div>

              <div className="register-field">
                <label htmlFor="confirmPassword" className="register-label">
                  Konfirmo fjalëkalimin
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Përsërite fjalëkalimin"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`register-input ${errors.confirmPassword ? 'error' : ''}`}
                />

                {errors.confirmPassword && (
                  <span className="register-error-text">{errors.confirmPassword}</span>
                )}
              </div>

              <p className="register-rules">
                Fjalëkalimi: së paku 8 karaktere, shkronjë e madhe, e vogël, numër dhe karakter special.
              </p>

              <button type="submit" className="register-button" disabled={isSubmitting}>
                {isSubmitting ? 'Duke u regjistruar...' : 'Krijo llogari'}
              </button>

              <div className="register-footer">
                <span>Keni llogari?</span>
                <Link to="/signin" className="register-link">
                  Kyçuni
                </Link>
              </div>

              <div className="register-back">
                <Link to="/" className="register-link">
                  Kthehu në faqen kryesore
                </Link>
              </div>

              <p className="register-note">
                Pas regjistrimit mund t’ju kërkohet verifikimi i emailit.
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}