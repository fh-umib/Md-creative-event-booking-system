import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type VerifyState = 'loading' | 'success' | 'info' | 'error';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<VerifyState>('loading');
  const [message, setMessage] = useState('We are verifying your email...');
  const token = searchParams.get('token');

  useEffect(() => {
    async function verifyEmail() {
      if (!token) {
        setStatus('error');
        setMessage('The verification link is missing or incomplete.');
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/verify-email?token=${encodeURIComponent(token)}`
        );

        const data = await response.json();
        const backendMessage = data.message || 'Email verification failed.';

        if (!response.ok) {
          const normalized = backendMessage.toLowerCase();

          if (
            normalized.includes('already been used') ||
            normalized.includes('invalid verification token') ||
            normalized.includes('invalid or has already been used')
          ) {
            setStatus('info');
            setMessage(
              'Thank you. This verification link has already been used, and your account may already be verified.'
            );
            return;
          }

          if (normalized.includes('expired')) {
            setStatus('error');
            setMessage(
              'This verification link has expired. Please register again or request a new verification email.'
            );
            return;
          }

          throw new Error(backendMessage);
        }

        setStatus('success');
        setMessage(
          'Thank you! Your email has been verified successfully. You can now sign in to your account.'
        );
      } catch (error) {
        setStatus('error');
        setMessage(
          error instanceof Error
            ? error.message
            : 'Something went wrong during verification.'
        );
      }
    }

    verifyEmail();
  }, [token]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes fadeInPage {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes liftCard {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .verify-page-root {
          animation: fadeInPage 0.45s ease;
        }

        .verify-card {
          animation: liftCard 0.6s ease;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .verify-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 28px 70px rgba(26,18,11,0.14);
        }

        .verify-button {
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }

        .verify-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(200, 132, 26, 0.28);
          filter: brightness(1.02);
        }

        @media (max-width: 640px) {
          .verify-page-root {
            padding: 16px;
          }

          .verify-card {
            padding: 32px 22px !important;
            border-radius: 22px !important;
          }

          .verify-title {
            font-size: 36px !important;
          }

          .verify-text {
            font-size: 16px !important;
          }
        }
      `}</style>

      <div className="verify-page-root" style={pageStyle}>
        <div className="verify-card" style={cardStyle}>
          <div style={badgeStyle}>MD Creative</div>

          <h1 className="verify-title" style={titleStyle}>
            Email Verification
          </h1>

          <p className="verify-text" style={getMessageStyle(status)}>
            {message}
          </p>

          {status === 'loading' ? (
            <div style={loadingStyle}>Please wait a moment...</div>
          ) : null}

          {status === 'success' ? (
            <Link to="/signin" className="verify-button" style={buttonStyle}>
              Go to Sign In
            </Link>
          ) : null}

          {status === 'info' ? (
            <Link to="/signin" className="verify-button" style={buttonStyle}>
              Continue to Sign In
            </Link>
          ) : null}

          {status === 'error' ? (
            <Link to="/register" className="verify-button" style={buttonStyle}>
              Back to Register
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}

function getMessageStyle(status: VerifyState): React.CSSProperties {
  const baseStyle: React.CSSProperties = {
    margin: 0,
    marginBottom: '22px',
    fontSize: '18px',
    lineHeight: 1.7,
  };

  if (status === 'success') {
    return {
      ...baseStyle,
      color: '#166534',
      fontWeight: 600,
    };
  }

  if (status === 'info') {
    return {
      ...baseStyle,
      color: '#7a5a12',
      fontWeight: 600,
    };
  }

  if (status === 'error') {
    return {
      ...baseStyle,
      color: '#b91c1c',
      fontWeight: 600,
    };
  }

  return {
    ...baseStyle,
    color: '#4b3c2f',
    fontWeight: 500,
  };
}

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #faf7f2 0%, #f6efe5 50%, #fffaf2 100%)',
  padding: '24px',
  boxSizing: 'border-box',
  fontFamily: "'DM Sans', sans-serif",
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '580px',
  background: '#ffffff',
  borderRadius: '28px',
  padding: '42px 34px',
  textAlign: 'center',
  boxShadow: '0 24px 60px rgba(26,18,11,0.12)',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignSelf: 'center',
  padding: '8px 14px',
  borderRadius: '999px',
  backgroundColor: 'rgba(200,132,26,0.12)',
  border: '1px solid rgba(200,132,26,0.24)',
  color: '#b7791f',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '18px',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  marginBottom: '16px',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '48px',
  color: '#1a120b',
  lineHeight: 1,
  fontWeight: 700,
};

const loadingStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#7a6a52',
};

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  marginTop: '10px',
  padding: '13px 22px',
  borderRadius: '14px',
  background: 'linear-gradient(135deg, #d7a04a 0%, #c8841a 100%)',
  color: '#ffffff',
  textDecoration: 'none',
  fontWeight: 800,
};