import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
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

const eventTypes = [
  'Ditëlindje',
  'Dasmë',
  'Fejesë',
  'Baby Shower',
  'Kanagjegj / Bride to Be',
  'Syneti',
  'Event familjar',
  'Event biznesi',
  'Event shkollor',
  'Tjetër',
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="booking-field">
      <label className="booking-label">{label}</label>
      {children}
    </div>
  );
}

function CardTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="booking-card-title">
      <div className="booking-card-icon">{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}

function SuccessScreen({ username, onReset }: { username: string; onReset: () => void }) {
  const displayName = username.trim() || 'klient';

  return (
    <main className="booking-success-page">
      <section className="booking-success-card">
        <div className="booking-success-icon">🎉</div>

        <p className="booking-success-kicker">Rezervimi u dërgua</p>

        <h1>Faleminderit, {displayName}!</h1>

        <p>
          Kërkesa juaj u pranua me sukses. Ekipi i MD Creative do t’ju kontaktojë brenda 24 orëve.
        </p>

        <div className="booking-success-steps">
          <div>
            <strong>📞 Kontakt</strong>
            <span>Konfirmojmë detajet kryesore.</span>
          </div>

          <div>
            <strong>🎨 Propozim</strong>
            <span>Përgatisim ofertën sipas eventit.</span>
          </div>

          <div>
            <strong>🎊 Realizim</strong>
            <span>Kujdesemi për festën tuaj.</span>
          </div>
        </div>

        <button type="button" onClick={onReset}>
          Dërgo një rezervim tjetër
        </button>
      </section>
    </main>
  );
}

export default function BookingPage() {
  const [form, setForm] = useState<BookingFormState>(initialForm);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedUsername, setSubmittedUsername] = useState('');
  const [error, setError] = useState('');

  const width = useWindowWidth();
  const isMobile = width < 720;

  useEffect(() => {
    getPublicPackages()
      .then((data) => setPackages(data.filter((item) => item.is_active)))
      .catch(() => setPackages([]));
  }, []);

  const handleChange = (key: keyof BookingFormState, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError('');

      await createPublicBooking(form);

      setSubmittedUsername(form.full_name);
      setSubmitted(true);
      setForm(initialForm);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rezervimi nuk mund të dërgohet.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <BookingStyles />
        <SuccessScreen
          username={submittedUsername}
          onReset={() => {
            setSubmitted(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </>
    );
  }

  return (
    <>
      <BookingStyles />

      <main className="booking-page">
        <section className="booking-hero">
          <div className="booking-hero-text">
            <p className="booking-kicker">Rezervo datën</p>

            <h1>
              Eventi juaj <span>fillon këtu.</span>
            </h1>

            <p>Plotësoni detajet kryesore dhe ne kujdesemi për pjesën tjetër.</p>

            <div className="booking-badges">
              <span>5k+ klientë</span>
              <span>800+ evente</span>
              <span>MD Creative</span>
            </div>
          </div>

          {!isMobile && (
            <div className="booking-hero-image">
              <img
                src="/images/gallery/decoration-girl2.png"
                alt="Dekor eventesh MD Creative"
                onError={(event) => {
                  event.currentTarget.src = '/images/gallery/baby-shower2.png';
                }}
              />

              <div className="booking-hero-image-text">
                <small>Evente me stil</small>
                <strong>Detaje që mbahen mend ✨</strong>
              </div>
            </div>
          )}
        </section>

        <section className="booking-form-wrapper">
          {error && <div className="booking-error">{error}</div>}

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="booking-card">
              <CardTitle icon="👤" title="Të dhënat tuaja" />

              <div className="booking-two-grid">
                <Field label="Username">
                  <input
                    className="booking-input"
                    type="text"
                    value={form.full_name}
                    onChange={(event) => handleChange('full_name', event.target.value)}
                    placeholder="Zgjidhni username"
                    required
                  />
                </Field>

                <Field label="Email">
                  <input
                    className="booking-input"
                    type="email"
                    value={form.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </Field>

                <Field label="Telefoni">
                  <input
                    className="booking-input"
                    type="text"
                    value={form.phone}
                    onChange={(event) => handleChange('phone', event.target.value)}
                    placeholder="+383 44 000 000"
                  />
                </Field>

                <Field label="Mysafirë">
                  <input
                    className="booking-input"
                    type="number"
                    value={form.guest_count}
                    onChange={(event) => handleChange('guest_count', Number(event.target.value))}
                    min={1}
                    placeholder="50"
                  />
                </Field>
              </div>
            </div>

            <div className="booking-card">
              <CardTitle icon="🎊" title="Informata për eventin" />

              <div className="booking-two-grid">
                <Field label="Titulli">
                  <input
                    className="booking-input"
                    type="text"
                    value={form.event_title}
                    onChange={(event) => handleChange('event_title', event.target.value)}
                    placeholder="Ditëlindja e fëmijës"
                  />
                </Field>

                <Field label="Lloji">
                  <select
                    className="booking-input"
                    value={form.event_type}
                    onChange={(event) => handleChange('event_type', event.target.value)}
                  >
                    <option value="">Zgjidh llojin</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Data">
                  <input
                    className="booking-input"
                    type="date"
                    value={form.event_date}
                    onChange={(event) => handleChange('event_date', event.target.value)}
                    required
                  />
                </Field>

                <div className="booking-time-grid">
                  <Field label="Fillimi">
                    <input
                      className="booking-input"
                      type="time"
                      value={form.start_time}
                      onChange={(event) => handleChange('start_time', event.target.value)}
                    />
                  </Field>

                  <Field label="Fundi">
                    <input
                      className="booking-input"
                      type="time"
                      value={form.end_time}
                      onChange={(event) => handleChange('end_time', event.target.value)}
                    />
                  </Field>
                </div>
              </div>
            </div>

            <div className="booking-card">
              <CardTitle icon="📍" title="Lokacioni" />

              <div className="booking-location-grid">
                <Field label="Emri i lokacionit">
                  <input
                    className="booking-input"
                    type="text"
                    value={form.venue_name}
                    onChange={(event) => handleChange('venue_name', event.target.value)}
                    placeholder="Emri i sallës ose vendit"
                  />
                </Field>

                <Field label="Adresa">
                  <input
                    className="booking-input"
                    type="text"
                    value={form.venue_address}
                    onChange={(event) => handleChange('venue_address', event.target.value)}
                    placeholder="Rruga, qyteti"
                  />
                </Field>

                <Field label="Paketa">
                  <select
                    className="booking-input"
                    value={form.package_id}
                    onChange={(event) =>
                      handleChange(
                        'package_id',
                        event.target.value ? Number(event.target.value) : '',
                      )
                    }
                  >
                    <option value="">Zgjidh paketën</option>

                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.title} {pkg.base_price ? `- €${pkg.base_price}` : ''}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            <div className="booking-card">
              <CardTitle icon="✨" title="Kërkesat tuaja" />

              <Field label="Shënime speciale">
                <textarea
                  className="booking-input booking-textarea"
                  value={form.special_requests}
                  onChange={(event) => handleChange('special_requests', event.target.value)}
                  placeholder="Ngjyra, tema, dekorime, maskota..."
                />
              </Field>
            </div>

            <button type="submit" className="booking-submit" disabled={submitting}>
              {submitting ? 'Duke dërguar...' : 'Dërgo kërkesën për rezervim'}
              {!submitting && <span>→</span>}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

function BookingStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

      * {
        box-sizing: border-box;
      }

      .booking-page {
        min-height: 100vh;
        background:
          radial-gradient(circle at 10% 10%, rgba(212,145,30,.12), transparent 30%),
          linear-gradient(135deg, #fffaf2 0%, #ffffff 48%, #f7efe3 100%);
        font-family: 'DM Sans', system-ui, sans-serif;
        color: #1a120b;
        padding: 14px 22px 24px;
      }

      .booking-hero {
        width: min(100%, 1100px);
        margin: 0 auto 12px;
        min-height: 132px;
        display: grid;
        grid-template-columns: 1fr 240px;
        gap: 18px;
        align-items: center;
        border-radius: 24px;
        border: 1px solid #eadfce;
        background:
          radial-gradient(circle at 10% 16%, rgba(212,145,30,.25), transparent 30%),
          linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
        padding: 16px 20px;
        overflow: hidden;
        box-shadow: 0 14px 38px rgba(26,18,11,.14);
        position: relative;
      }

      .booking-hero::after {
        content: "MD";
        position: absolute;
        right: 220px;
        bottom: -42px;
        font-size: 128px;
        line-height: 1;
        font-weight: 950;
        color: rgba(212,145,30,.055);
        pointer-events: none;
      }

      .booking-hero-text {
        position: relative;
        z-index: 1;
      }

      .booking-kicker {
        margin: 0 0 5px;
        color: #d4911e;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: .16em;
        text-transform: uppercase;
      }

      .booking-hero h1 {
        margin: 0;
        color: #ffffff;
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(32px, 4vw, 46px);
        line-height: .96;
        font-weight: 700;
        max-width: 620px;
      }

      .booking-hero h1 span {
        color: #d4911e;
        font-style: italic;
      }

      .booking-hero-text > p {
        margin: 7px 0 0;
        max-width: 560px;
        color: rgba(255,255,255,.70);
        font-size: 12px;
        line-height: 1.4;
      }

      .booking-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin-top: 10px;
      }

      .booking-badges span {
        min-height: 23px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 4px 10px;
        background: rgba(255,255,255,.06);
        border: 1px solid rgba(255,255,255,.1);
        color: rgba(255,255,255,.78);
        font-size: 10.5px;
        font-weight: 700;
      }

      .booking-hero-image {
        height: 102px;
        border-radius: 17px;
        overflow: hidden;
        border: 1px solid rgba(212,145,30,.3);
        box-shadow: 0 12px 30px rgba(0,0,0,.28);
        position: relative;
      }

      .booking-hero-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .booking-hero-image-text {
        position: absolute;
        left: 9px;
        right: 9px;
        bottom: 9px;
        border-radius: 12px;
        background: rgba(26,18,11,.87);
        border: 1px solid rgba(212,145,30,.22);
        padding: 7px 9px;
      }

      .booking-hero-image-text small {
        display: block;
        margin-bottom: 2px;
        color: #d4911e;
        font-size: 8px;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
      }

      .booking-hero-image-text strong {
        display: block;
        color: #ffffff;
        font-size: 10.5px;
        line-height: 1.2;
      }

      .booking-form-wrapper {
        width: min(100%, 1100px);
        margin: 0 auto;
      }

      .booking-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        padding: 14px;
        border-radius: 24px;
        background: rgba(255,255,255,.95);
        border: 1px solid #eadfce;
        box-shadow: 0 14px 40px rgba(26,18,11,.08);
      }

      .booking-card {
        border-radius: 18px;
        background: #fffdf8;
        border: 1px solid #eadfce;
        padding: 14px;
        min-width: 0;
      }

      .booking-card-title {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 11px;
      }

      .booking-card-title h3 {
        margin: 0;
        color: #1a120b;
        font-size: 14px;
        font-weight: 900;
      }

      .booking-card-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff3d8;
        border: 1.5px solid #d4911e;
        font-size: 13px;
        flex-shrink: 0;
      }

      .booking-two-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }

      .booking-time-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .booking-location-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .booking-field {
        display: flex;
        flex-direction: column;
        gap: 5px;
        min-width: 0;
      }

      .booking-label {
        color: #7a6a52;
        font-size: 9.5px;
        font-weight: 900;
        letter-spacing: .10em;
        text-transform: uppercase;
      }

      .booking-input {
        width: 100%;
        height: 35px;
        border-radius: 10px;
        border: 1.5px solid #eadfce;
        background: #ffffff;
        color: #1a120b;
        padding: 0 11px;
        font-size: 12.5px;
        font-family: inherit;
        outline: none;
        transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
      }

      .booking-input::placeholder {
        color: #b8a48e;
      }

      .booking-input:focus {
        border-color: #c8841a;
        box-shadow: 0 0 0 3px rgba(200,132,26,.12);
        background: #fffdf8;
      }

      .booking-textarea {
        height: 104px;
        min-height: 104px;
        padding: 11px;
        resize: vertical;
        line-height: 1.45;
      }

      .booking-submit {
        grid-column: 1 / -1;
        height: 43px;
        border: none;
        border-radius: 14px;
        background: linear-gradient(135deg, #d4911e, #b87318);
        color: #ffffff;
        font-size: 13.5px;
        font-weight: 950;
        cursor: pointer;
        font-family: inherit;
        box-shadow: 0 9px 24px rgba(200,132,26,.28);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
      }

      .booking-submit:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 14px 32px rgba(200,132,26,.38);
      }

      .booking-submit:disabled {
        opacity: .68;
        cursor: not-allowed;
      }

      .booking-error {
        margin-bottom: 12px;
        padding: 12px 14px;
        border-radius: 14px;
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: #991b1b;
        font-size: 13px;
        font-weight: 750;
      }

      .booking-success-page {
        min-height: 100vh;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background:
          radial-gradient(circle at 12% 18%, rgba(212,145,30,.18), transparent 30%),
          linear-gradient(135deg, #fffaf2 0%, #ffffff 48%, #f7efe3 100%);
        font-family: 'DM Sans', system-ui, sans-serif;
      }

      .booking-success-card {
        width: min(100%, 590px);
        text-align: center;
        border-radius: 26px;
        border: 1px solid #eadfce;
        background: rgba(255,255,255,.96);
        padding: 30px;
        box-shadow: 0 22px 60px rgba(26,18,11,.14);
      }

      .booking-success-icon {
        width: 76px;
        height: 76px;
        margin: 0 auto 16px;
        border-radius: 50%;
        background: #fff3d8;
        border: 3px solid #d4911e;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 34px;
      }

      .booking-success-kicker {
        margin: 0 0 8px;
        color: #d4911e;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: .16em;
        text-transform: uppercase;
      }

      .booking-success-card h1 {
        margin: 0;
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(34px, 5vw, 50px);
        color: #1a120b;
        line-height: 1;
      }

      .booking-success-card > p:not(.booking-success-kicker) {
        margin: 14px auto 20px;
        color: #6b5a45;
        font-size: 14px;
        line-height: 1.65;
        max-width: 490px;
      }

      .booking-success-steps {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 9px;
        margin-bottom: 22px;
      }

      .booking-success-steps div {
        border-radius: 15px;
        border: 1px solid #eadfce;
        background: #fffaf2;
        padding: 12px;
        text-align: left;
      }

      .booking-success-steps strong {
        display: block;
        color: #1a120b;
        font-size: 12.5px;
        margin-bottom: 5px;
      }

      .booking-success-steps span {
        display: block;
        color: #7a6a52;
        font-size: 11.5px;
        line-height: 1.4;
      }

      .booking-success-card button {
        height: 44px;
        border: none;
        border-radius: 13px;
        background: linear-gradient(135deg, #d4911e, #b87318);
        color: #ffffff;
        padding: 0 22px;
        font-size: 13.5px;
        font-weight: 900;
        cursor: pointer;
        font-family: inherit;
        box-shadow: 0 10px 26px rgba(200,132,26,.28);
      }

      @media (max-width: 1020px) {
        .booking-page {
          padding: 18px 14px 26px;
        }

        .booking-hero {
          grid-template-columns: 1fr;
        }

        .booking-hero::after {
          right: -20px;
          bottom: -30px;
          font-size: 120px;
        }

        .booking-form {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 720px) {
        .booking-page {
          padding: 14px 10px 22px;
        }

        .booking-hero {
          padding: 18px;
          border-radius: 22px;
          min-height: auto;
        }

        .booking-hero h1 {
          font-size: 34px;
        }

        .booking-hero-text > p {
          font-size: 12px;
        }

        .booking-badges {
          gap: 6px;
        }

        .booking-badges span {
          font-size: 10.5px;
        }

        .booking-form {
          padding: 11px;
          border-radius: 22px;
        }

        .booking-card {
          padding: 14px;
          border-radius: 16px;
        }

        .booking-two-grid,
        .booking-time-grid {
          grid-template-columns: 1fr;
        }

        .booking-input {
          height: 38px;
        }

        .booking-textarea {
          height: 88px;
          min-height: 88px;
        }

        .booking-submit {
          height: 45px;
        }

        .booking-success-card {
          padding: 24px 17px;
        }

        .booking-success-steps {
          grid-template-columns: 1fr;
        }
      }

      @media (max-height: 760px) and (min-width: 1021px) {
        .booking-page {
          padding-top: 10px;
          padding-bottom: 14px;
        }

        .booking-hero {
          min-height: 118px;
          padding: 13px 18px;
          margin-bottom: 10px;
        }

        .booking-hero h1 {
          font-size: 36px;
        }

        .booking-hero-text > p {
          font-size: 11.5px;
          line-height: 1.32;
        }

        .booking-badges {
          margin-top: 7px;
        }

        .booking-badges span {
          min-height: 21px;
          font-size: 10px;
          padding: 4px 8px;
        }

        .booking-hero-image {
          height: 88px;
        }

        .booking-form {
          padding: 12px;
          gap: 10px;
        }

        .booking-card {
          padding: 12px;
        }

        .booking-card-title {
          margin-bottom: 9px;
        }

        .booking-input {
          height: 32px;
        }

        .booking-textarea {
          height: 88px;
          min-height: 88px;
        }

        .booking-submit {
          height: 40px;
        }
      }
    `}</style>
  );
}