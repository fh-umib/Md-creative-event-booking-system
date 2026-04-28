import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type VerifyState = 'loading' | 'success' | 'info' | 'error';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<VerifyState>('loading');
  const [message, setMessage] = useState('Po e verifikojmë emailin tuaj...');
  const token = searchParams.get('token');

  useEffect(() => {
    async function verifyEmail() {
      if (!token) {
        setStatus('error');
        setMessage('Linku i verifikimit mungon ose nuk është i plotë.');
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/verify-email?token=${encodeURIComponent(token)}`,
        );

        const data = await response.json();
        const backendMessage = data?.message || 'Verifikimi i emailit dështoi.';

        if (!response.ok) {
          const normalized = backendMessage.toLowerCase();

          if (
            normalized.includes('already been used') ||
            normalized.includes('invalid verification token') ||
            normalized.includes('invalid or has already been used')
          ) {
            setStatus('info');
            setMessage(
              'Faleminderit. Ky link është përdorur më herët dhe llogaria juaj mund të jetë verifikuar tashmë.',
            );
            return;
          }

          if (normalized.includes('expired')) {
            setStatus('error');
            setMessage(
              'Ky link verifikimi ka skaduar. Ju lutem regjistrohuni përsëri ose kërkoni një email të ri verifikimi.',
            );
            return;
          }

          throw new Error(backendMessage);
        }

        setStatus('success');
        setMessage(
          'Emaili juaj u verifikua me sukses. Tani mund të kyçeni në llogarinë tuaj.',
        );
      } catch (error) {
        setStatus('error');
        setMessage(
          error instanceof Error
            ? error.message
            : 'Diçka shkoi gabim gjatë verifikimit. Ju lutem provoni përsëri.',
        );
      }
    }

    verifyEmail();
  }, [token]);

  const statusTitle: Record<VerifyState, string> = {
    loading: 'Duke u verifikuar',
    success: 'Emaili u verifikua',
    info: 'Llogaria mund të jetë verifikuar',
    error: 'Verifikimi dështoi',
  };

  const statusLabel: Record<VerifyState, string> = {
    loading: 'Ju lutem prisni pak...',
    success: 'Llogaria është gati',
    info: 'Njoftim',
    error: 'Kërkohet veprim',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

        @keyframes verifyFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes verifyCardEnter {
          from {
            opacity: 0;
            transform: translateY(26px) scale(.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes verifySpin {
          to {
            transform: rotate(360deg);
          }
        }

        .verify-page {
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
          animation: verifyFadeIn .45s ease;
        }

        .verify-card {
          width: min(100%, 620px);
          position: relative;
          overflow: hidden;
          border-radius: 32px;
          background: rgba(255,255,255,.96);
          border: 1px solid #eadfce;
          box-shadow: 0 24px 70px rgba(26,18,11,.15);
          padding: 42px;
          text-align: center;
          animation: verifyCardEnter .62s ease;
        }

        .verify-card::before {
          content: "";
          position: absolute;
          inset: 0;
          height: 150px;
          background:
            radial-gradient(circle at 18% 20%, rgba(212,145,30,.25), transparent 36%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
          pointer-events: none;
        }

        .verify-card::after {
          content: "MD";
          position: absolute;
          right: -12px;
          top: 24px;
          font-size: 120px;
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.08);
          pointer-events: none;
        }

        .verify-content {
          position: relative;
          z-index: 1;
        }

        .verify-logo {
          width: 64px;
          height: 64px;
          margin: 0 auto 26px;
          border-radius: 20px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
          font-weight: 950;
          box-shadow: 0 16px 34px rgba(212,145,30,.25);
        }

        .verify-status-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 8px 14px;
          border-radius: 999px;
          background: #fff7e8;
          border: 1px solid #f1d5a3;
          color: #9a5d0a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .verify-title {
          margin: 0;
          color: #1a120b;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 6vw, 58px);
          line-height: .98;
          font-weight: 700;
        }

        .verify-title span {
          color: #d4911e;
          font-style: italic;
        }

        .verify-message {
          margin: 18px auto 0;
          max-width: 480px;
          font-size: 15px;
          line-height: 1.75;
          font-weight: 650;
        }

        .verify-message.loading {
          color: #6b5a45;
        }

        .verify-message.success {
          color: #047857;
        }

        .verify-message.info {
          color: #9a5d0a;
        }

        .verify-message.error {
          color: #991b1b;
        }

        .verify-loader {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 4px solid #f1dfc5;
          border-top-color: #c8841a;
          margin: 26px auto 0;
          animation: verifySpin .8s linear infinite;
        }

        .verify-action {
          margin-top: 28px;
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .verify-button {
          min-height: 46px;
          border-radius: 15px;
          padding: 13px 18px;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 950;
          box-shadow: 0 12px 26px rgba(200,132,26,.26);
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .verify-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 34px rgba(200,132,26,.34);
        }

        .verify-secondary {
          min-height: 46px;
          border-radius: 15px;
          padding: 13px 18px;
          background: #fffaf2;
          border: 1.5px solid #eadfce;
          color: #7a4f12;
          text-decoration: none;
          font-size: 14px;
          font-weight: 900;
          transition: transform .2s ease, background .2s ease;
        }

        .verify-secondary:hover {
          transform: translateY(-2px);
          background: #fff7e8;
        }

        .verify-note {
          margin: 24px auto 0;
          max-width: 470px;
          padding: 13px 14px;
          border-radius: 16px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          color: #8a7558;
          font-size: 12px;
          line-height: 1.55;
        }

        @media (max-width: 560px) {
          .verify-page {
            padding: 16px;
            align-items: flex-start;
          }

          .verify-card {
            padding: 30px 22px;
            border-radius: 24px;
          }

          .verify-card::before {
            height: 130px;
          }

          .verify-logo {
            width: 56px;
            height: 56px;
            border-radius: 17px;
            font-size: 20px;
            margin-bottom: 24px;
          }

          .verify-action {
            flex-direction: column;
          }

          .verify-button,
          .verify-secondary {
            width: 100%;
          }
        }
      `}</style>

      <main className="verify-page">
        <section className="verify-card">
          <div className="verify-content">
            <div className="verify-logo">MD</div>

            <div className="verify-status-pill">{statusLabel[status]}</div>

            <h1 className="verify-title">
              {statusTitle[status].split(' ')[0]}{' '}
              <span>{statusTitle[status].split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className={`verify-message ${status}`}>{message}</p>

            {status === 'loading' && <div className="verify-loader" />}

            {status !== 'loading' && (
              <div className="verify-action">
                {(status === 'success' || status === 'info') && (
                  <Link to="/signin" className="verify-button">
                    Vazhdo te kyçja
                  </Link>
                )}

                {status === 'error' && (
                  <Link to="/register" className="verify-button">
                    Kthehu te regjistrimi
                  </Link>
                )}

                <Link to="/" className="verify-secondary">
                  Faqja kryesore
                </Link>
              </div>
            )}

            <p className="verify-note">
              Verifikimi i emailit ndihmon që llogaria juaj të jetë më e sigurt dhe rezervimet të lidhen
              saktë me të dhënat tuaja.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}