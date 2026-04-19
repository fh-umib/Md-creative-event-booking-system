import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    setIsSubmitting(true);

    const result = await login(email, password);

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || 'Invalid admin email or password.');
      return;
    }

    navigate(from || '/admin/dashboard', { replace: true });
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={badgeStyle}>ADMIN ACCESS</div>

        <h1 style={titleStyle}>Admin Login</h1>
        <p style={subtitleStyle}>
          Sign in to access the MD Creative admin dashboard.
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error ? <p style={errorStyle}>{error}</p> : null}

          <button type="submit" style={buttonStyle} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div style={footerStyle}>
          <Link to="/" style={linkStyle}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f8fafc, #edf2f7)',
  padding: '24px',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '420px',
  backgroundColor: '#ffffff',
  borderRadius: '22px',
  padding: '34px 28px',
  boxShadow: '0 18px 40px rgba(15, 23, 42, 0.10)',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#f7e2a2',
  color: '#091a4d',
  padding: '8px 12px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 800,
  marginBottom: '16px',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '28px',
  fontWeight: 800,
  color: '#091a4d',
};

const subtitleStyle: React.CSSProperties = {
  marginTop: '10px',
  marginBottom: '22px',
  fontSize: '15px',
  lineHeight: 1.6,
  color: '#64748b',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const inputStyle: React.CSSProperties = {
  height: '50px',
  borderRadius: '14px',
  border: '1px solid #dbe2ea',
  padding: '0 14px',
  fontSize: '15px',
  outline: 'none',
};

const buttonStyle: React.CSSProperties = {
  height: '50px',
  border: 'none',
  borderRadius: '14px',
  backgroundColor: '#091a4d',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 800,
  cursor: 'pointer',
};

const errorStyle: React.CSSProperties = {
  margin: 0,
  color: '#dc2626',
  fontSize: '14px',
  fontWeight: 600,
};

const footerStyle: React.CSSProperties = {
  marginTop: '18px',
  textAlign: 'center',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#091a4d',
  fontWeight: 700,
};