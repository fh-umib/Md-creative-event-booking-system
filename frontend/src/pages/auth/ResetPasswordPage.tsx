import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage('');
    setErrorMessage('');

    if (!token) {
      setErrorMessage('Reset token is missing or invalid.');
      setStatus('error');
      return;
    }

    if (!password) {
      setErrorMessage('New password is required.');
      setStatus('error');
      return;
    }

    if (!isStrongPassword(password)) {
      setErrorMessage(
        'Password must be at least 8 characters and include uppercase, lowercase, number and special character.'
      );
      setStatus('error');
      return;
    }

    if (!confirmPassword) {
      setErrorMessage('Please confirm your new password.');
      setStatus('error');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setStatus('error');
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
        throw new Error(data.message || 'Password reset failed.');
      }

      setStatus('success');
      setMessage(
        data.message || 'Your password has been reset successfully.'
      );

      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/signin');
      }, 1800);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes pageFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(26px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .reset-page-root { animation: pageFadeIn 0.5s ease; }
        .reset-card {
          animation: cardEnter 0.65s ease;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .reset-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 28px 70px rgba(26,18,11,0.14);
        }

        .reset-input {
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }

        .reset-input:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200, 132, 26, 0.12);
          background-color: #fffefd;
        }

        .reset-button {
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }

        .reset-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(200, 132, 26, 0.28);
          filter: brightness(1.02);
        }

        @media (max-width: 640px) {
          .reset-page-root { padding: 16px; }
          .reset-card { border-radius: 22px !important; padding: 28px 22px !important; }
          .reset-title { font-size: 36px !important; }
        }
      `}</style>

      <div className="reset-page-root" style={pageStyle}>
        <div className="reset-card" style={{ ...cardStyle, opacity: isVisible ? 1 : 0 }}>
          <div style={badgeStyle}>MD Creative</div>

          <h1 className="reset-title" style={titleStyle}>
            Create a New Password
          </h1>

          <p style={subtitleStyle}>
            Choose a strong new password to restore access to your account securely.
          </p>

          {message ? <div style={successBoxStyle}>{message}</div> : null}
          {errorMessage ? <div style={errorBoxStyle}>{errorMessage}</div> : null}

          {status !== 'success' ? (
            <form style={formStyle} onSubmit={handleSubmit}>
              <div style={fieldStyle}>
                <label style={labelStyle}>New Password</label>
                <input
                  className="reset-input"
                  type="password"
                  placeholder="Enter your new password"
                  style={inputStyle}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Confirm New Password</label>
                <input
                  className="reset-input"
                  type="password"
                  placeholder="Repeat your new password"
                  style={inputStyle}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                className="reset-button"
                type="submit"
                style={buttonStyle}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Reset Password'}
              </button>
            </form>
          ) : null}

          <div style={backWrapperStyle}>
            <Link to="/signin" style={backLinkStyle}>
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #faf7f2 0%, #f6efe5 50%, #fffaf2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  boxSizing: 'border-box',
  fontFamily: "'DM Sans', sans-serif",
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '560px',
  backgroundColor: '#ffffff',
  borderRadius: '28px',
  boxShadow: '0 24px 60px rgba(26,18,11,0.12)',
  padding: '40px 32px',
  textAlign: 'center',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  padding: '8px 14px',
  borderRadius: '999px',
  backgroundColor: 'rgba(200,132,26,0.16)',
  border: '1px solid rgba(200,132,26,0.28)',
  color: '#b7791f',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '18px',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '48px',
  lineHeight: 1,
  fontWeight: 700,
  color: '#1a120b',
};

const subtitleStyle: React.CSSProperties = {
  marginTop: '14px',
  marginBottom: '24px',
  color: '#5e5146',
  fontSize: '15px',
  lineHeight: 1.8,
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  marginTop: '8px',
};

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  textAlign: 'left',
};

const labelStyle: React.CSSProperties = {
  color: '#3d3024',
  fontSize: '13px',
  fontWeight: 700,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '52px',
  borderRadius: '14px',
  border: '1px solid #e7d8c4',
  backgroundColor: '#fffaf4',
  padding: '0 14px',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  color: '#1f1a17',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '8px',
  height: '52px',
  borderRadius: '14px',
  border: 'none',
  background: 'linear-gradient(135deg, #d7a04a 0%, #c8841a 100%)',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 800,
  cursor: 'pointer',
};

const successBoxStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: '14px',
  backgroundColor: '#eefbf3',
  border: '1px solid #bbf7d0',
  color: '#166534',
  fontSize: '13px',
  fontWeight: 700,
  marginTop: '18px',
};

const errorBoxStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: '14px',
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  color: '#b91c1c',
  fontSize: '13px',
  fontWeight: 700,
  marginTop: '18px',
};

const backWrapperStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '18px',
};

const backLinkStyle: React.CSSProperties = {
  color: '#7a6a52',
  textDecoration: 'none',
  fontWeight: 600,
};