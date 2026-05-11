import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/constants';

type VerifyResponse = {
  success?: boolean;
  message?: string;
  data?: {
    message?: string;
    user?: unknown;
  };
};

type VerifyStatus = 'loading' | 'success' | 'error';

function getApiBaseUrl() {
  const cleanBaseUrl = API_BASE_URL.replace(/\/$/, '');

  if (cleanBaseUrl.endsWith('/api')) {
    return cleanBaseUrl;
  }

  return `${cleanBaseUrl}/api`;
}

async function readResponse(response: Response): Promise<VerifyResponse> {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text) as VerifyResponse;
  } catch {
    throw new Error(
      'Serveri nuk ktheu përgjigje JSON. Kontrollo që API URL të përfundojë me /api.',
    );
  }
}

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<VerifyStatus>('loading');
  const [message, setMessage] = useState('Duke verifikuar llogarinë tuaj...');

  useEffect(() => {
    const token = searchParams.get('token');

    async function verifyEmail() {
      if (!token) {
        setStatus('error');
        setMessage('Tokeni i verifikimit mungon.');
        return;
      }

      try {
        const apiBaseUrl = getApiBaseUrl();

        const response = await fetch(
          `${apiBaseUrl}/auth/verify-email?token=${encodeURIComponent(token)}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          },
        );

        const data = await readResponse(response);

        if (!response.ok) {
          throw new Error(
            data?.message ||
              data?.data?.message ||
              'Verifikimi dështoi. Linku mund të jetë i pavlefshëm ose i përdorur.',
          );
        }

        setStatus('success');
        setMessage(
          data?.data?.message ||
            data?.message ||
            'Llogaria juaj u verifikua me sukses.',
        );
      } catch (error) {
        setStatus('error');
        setMessage(
          error instanceof Error
            ? error.message
            : 'Diçka shkoi gabim gjatë verifikimit.',
        );
      }
    }

    verifyEmail();
  }, [searchParams]);

  const isSuccess = status === 'success';
  const isLoading = status === 'loading';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

        .verify-page {
          min-height: 100vh;
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at 12% 18%, rgba(212,145,30,.18), transparent 30%),
            radial-gradient(circle at 88% 82%, rgba(212,145,30,.14), transparent 28%),
            linear-gradient(135deg, #fffaf2 0%, #ffffff 48%, #f7efe3 100%);
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        .verify-card {
          width: min(100%, 650px);
          overflow: hidden;
          border-radius: 28px;
          background: rgba(255,255,255,.97);
          border: 1px solid #eadfce;
          box-shadow: 0 20px 55px rgba(26,18,11,.14);
          text-align: center;
        }

        .verify-top {
          position: relative;
          overflow: hidden;
          padding: 42px 28px 38px;
          background:
            radial-gradient(circle at 18% 18%, rgba(212,145,30,.34), transparent 32%),
            linear-gradient(135deg, #1a120b 0%, #2b1a0d 58%, #120d07 100%);
        }

        .verify-top::after {
          content: "MD";
          position: absolute;
          right: 20px;
          top: 10px;
          font-size: 105px;
          line-height: 1;
          font-weight: 950;
          color: rgba(212,145,30,.09);
          pointer-events: none;
        }

        .verify-logo {
          position: relative;
          z-index: 1;
          width: 66px;
          height: 66px;
          margin: 0 auto;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          font-size: 24px;
          font-weight: 950;
          box-shadow: 0 14px 30px rgba(212,145,30,.25);
        }

        .verify-body {
          position: relative;
          padding: 44px 38px 42px;
        }

        .verify-pill {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translate(-50%, -50%);
          padding: 8px 18px;
          border-radius: 999px;
          background: #fffaf2;
          border: 1px solid #eadfce;
          color: #9a5d0a;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .verify-title {
          margin: 0;
          color: #1a120b;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 6vw, 64px);
          line-height: .96;
          font-weight: 700;
        }

        .verify-title span {
          color: #d4911e;
          font-style: italic;
        }

        .verify-message {
          max-width: 490px;
          margin: 22px auto 0;
          color: ${isSuccess ? '#047857' : status === 'error' ? '#991b1b' : '#7a6a52'};
          font-size: 15px;
          line-height: 1.7;
          font-weight: 850;
        }

        .verify-actions {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .verify-button {
          min-width: 150px;
          height: 48px;
          padding: 0 20px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 14px;
          font-weight: 950;
          transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
        }

        .verify-button.primary {
          border: none;
          background: linear-gradient(135deg, #d4911e, #b87318);
          color: #ffffff;
          box-shadow: 0 12px 26px rgba(200,132,26,.26);
        }

        .verify-button.secondary {
          border: 1px solid #eadfce;
          background: #fffdf8;
          color: #7a4b08;
        }

        .verify-button:hover {
          transform: translateY(-2px);
          opacity: .9;
        }

        .verify-note {
          max-width: 500px;
          margin: 28px auto 0;
          padding: 14px 16px;
          border-radius: 16px;
          background: #fffaf2;
          border: 1px solid #f3eadc;
          color: #8a7558;
          font-size: 13px;
          line-height: 1.6;
        }

        @media (max-width: 560px) {
          .verify-card {
            border-radius: 22px;
          }

          .verify-top {
            padding: 34px 22px 32px;
          }

          .verify-body {
            padding: 40px 22px 34px;
          }

          .verify-button {
            width: 100%;
          }
        }
      `}</style>

      <main className="verify-page">
        <section className="verify-card">
          <div className="verify-top">
            <div className="verify-logo">MD</div>
          </div>

          <div className="verify-body">
            <div className="verify-pill">
              {isLoading ? 'Duke verifikuar' : isSuccess ? 'Verifikim i suksesshëm' : 'Verifikimi dështoi'}
            </div>

            <h1 className="verify-title">
              {isLoading ? (
                <>
                  Verifikimi <span>po kryhet</span>
                </>
              ) : isSuccess ? (
                <>
                  Llogaria <span>u verifikua</span>
                </>
              ) : (
                <>
                  Verifikimi <span>dështoi</span>
                </>
              )}
            </h1>

            <p className="verify-message">{message}</p>

            <div className="verify-actions">
              {isSuccess ? (
                <Link to="/signin" className="verify-button primary">
                  Vazhdo te kyçja
                </Link>
              ) : (
                <Link to="/register" className="verify-button primary">
                  Kthehu te regjistrimi
                </Link>
              )}

              <Link to="/" className="verify-button secondary">
                Faqja kryesore
              </Link>
            </div>

            <div className="verify-note">
              Verifikimi i emailit ndihmon që llogaria juaj të jetë më e sigurt
              dhe rezervimet të lidhen saktë me të dhënat tuaja.
            </div>
          </div>
        </section>
      </main>
    </>
  );
}