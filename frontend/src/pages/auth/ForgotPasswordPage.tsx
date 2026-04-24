import { useEffect, useState } from 'react';
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage('');
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Email address is required.');
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
        throw new Error(data.message || 'Failed to process password reset request.');
      }

      setMessage(
        data.message ||
          'If an account with that email exists, a reset link has been sent.'
      );
      setEmail('');
    } catch (error) {
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

        @keyframes panelEnterLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes panelEnterRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .forgot-page-root {
          animation: pageFadeIn 0.5s ease;
        }

        .forgot-card {
          animation: cardEnter 0.65s ease;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .forgot-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 28px 70px rgba(26,18,11,0.14);
        }

        .forgot-left-panel {
          animation: panelEnterLeft 0.8s ease;
        }

        .forgot-right-panel {
          animation: panelEnterRight 0.8s ease;
        }

        .forgot-input {
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }

        .forgot-input:focus {
          border-color: #c8841a;
          box-shadow: 0 0 0 4px rgba(200, 132, 26, 0.12);
          background-color: #fffefd;
        }

        .forgot-button {
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }

        .forgot-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(200, 132, 26, 0.28);
          filter: brightness(1.02);
        }

        .forgot-link:hover {
          opacity: 0.75;
        }

        @media (max-width: 900px) {
          .forgot-card {
            flex-direction: column;
            min-height: auto;
            max-width: 620px;
          }
        }

        @media (max-width: 640px) {
          .forgot-page-root {
            padding: 16px;
          }

          .forgot-card {
            border-radius: 22px;
          }

          .forgot-left-panel {
            padding: 28px 22px;
          }

          .forgot-right-panel {
            padding: 24px 20px;
          }

          .forgot-title {
            font-size: 38px !important;
          }
        }
      `}</style>

      <div className="forgot-page-root" style={pageStyle}>
        <div className="forgot-card" style={{ ...cardStyle, opacity: isVisible ? 1 : 0 }}>
          <div className="forgot-left-panel" style={leftPanelStyle}>
            <div style={badgeStyle}>MD Creative</div>

            <h1 className="forgot-title" style={titleStyle}>
              Reset Password
            </h1>

            <p style={subtitleStyle}>
              Enter your email address and we will send you a secure link to reset
              your password and restore access to your account.
            </p>

            <div style={infoBoxStyle}>
              <div style={infoItemStyle}>Secure reset process</div>
              <div style={infoItemStyle}>Email link for account recovery</div>
              <div style={infoItemStyle}>Quick access back to your account</div>
            </div>
          </div>

          <div className="forgot-right-panel" style={rightPanelStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
              <h2 style={formTitleStyle}>Forgot Password</h2>

              {message ? <div style={successBoxStyle}>{message}</div> : null}
              {errorMessage ? <div style={errorBoxStyle}>{errorMessage}</div> : null}

              <div style={fieldStyle}>
                <label style={labelStyle}>Email Address</label>
                <input
                  className="forgot-input"
                  type="email"
                  placeholder="Enter your email"
                  style={inputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                className="forgot-button"
                type="submit"
                style={buttonStyle}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div style={footerStyle}>
                <span style={footerTextStyle}>Remembered your password?</span>
                <Link to="/signin" className="forgot-link" style={footerLinkStyle}>
                  Sign In
                </Link>
              </div>

              <div style={backWrapperStyle}>
                <Link to="/" className="forgot-link" style={backLinkStyle}>
                  Back to Home
                </Link>
              </div>
            </form>
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
  maxWidth: '980px',
  minHeight: '540px',
  backgroundColor: '#ffffff',
  borderRadius: '28px',
  boxShadow: '0 24px 60px rgba(26,18,11,0.12)',
  display: 'flex',
  overflow: 'hidden',
};

const leftPanelStyle: React.CSSProperties = {
  flex: 0.95,
  background: 'linear-gradient(135deg, #1a120b 0%, #2a1a0f 55%, #1d130d 100%)',
  color: '#ffffff',
  padding: '40px 32px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const rightPanelStyle: React.CSSProperties = {
  flex: 1.15,
  backgroundColor: '#fffdf9',
  padding: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignSelf: 'flex-start',
  padding: '8px 14px',
  borderRadius: '999px',
  backgroundColor: 'rgba(200,132,26,0.16)',
  border: '1px solid rgba(200,132,26,0.28)',
  color: '#f0c27b',
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
};

const subtitleStyle: React.CSSProperties = {
  marginTop: '14px',
  marginBottom: '24px',
  color: 'rgba(255,255,255,0.76)',
  fontSize: '15px',
  lineHeight: 1.8,
  maxWidth: '360px',
};

const infoBoxStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const infoItemStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '14px',
  padding: '12px 14px',
  fontSize: '14px',
  fontWeight: 600,
};

const formStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '460px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const formTitleStyle: React.CSSProperties = {
  margin: 0,
  color: '#1a120b',
  fontSize: '28px',
  fontWeight: 800,
};

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
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

const footerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: '4px',
  fontSize: '14px',
};

const footerTextStyle: React.CSSProperties = {
  color: '#6f6255',
};

const footerLinkStyle: React.CSSProperties = {
  color: '#1a120b',
  textDecoration: 'none',
  fontWeight: 800,
};

const backWrapperStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '4px',
};

const backLinkStyle: React.CSSProperties = {
  color: '#7a6a52',
  textDecoration: 'none',
  fontWeight: 600,
};

const successBoxStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: '14px',
  backgroundColor: '#eefbf3',
  border: '1px solid #bbf7d0',
  color: '#166534',
  fontSize: '13px',
  fontWeight: 700,
};

const errorBoxStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: '14px',
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  color: '#b91c1c',
  fontSize: '13px',
  fontWeight: 700,
};