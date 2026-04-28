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
      setError('Emaili dhe fjalëkalimi janë të detyrueshëm.');
      return;
    }

    setIsSubmitting(true);

    const result = await login(email.trim(), password);

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || 'Emaili ose fjalëkalimi i adminit nuk është i saktë.');
      return;
    }

    navigate(from || '/admin/dashboard', { replace: true });
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={logoWrapStyle}>
          <div style={logoStyle}>MD</div>

          <div>
            <h2 style={brandTitleStyle}>MD Creative</h2>
            <p style={brandSubStyle}>Paneli i administrimit</p>
          </div>
        </div>

        <div style={badgeStyle}>HYRJE PËR ADMIN</div>

        <h1 style={titleStyle}>Kyçu si Admin</h1>

        <p style={subtitleStyle}>
          Hyni me emailin dhe fjalëkalimin tuaj për të menaxhuar rezervimet,
          dekorimet, maskotat, paketat dhe përmbajtjen e MD Creative.
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="email"
            placeholder="Emaili i adminit"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Fjalëkalimi i adminit"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            autoComplete="current-password"
          />

          {error ? <p style={errorStyle}>{error}</p> : null}

          <button type="submit" style={buttonStyle} disabled={isSubmitting}>
            {isSubmitting ? 'Duke u kyçur...' : 'Hyr në Panel'}
          </button>
        </form>

        <div style={footerStyle}>
          <Link to="/" style={linkStyle}>
            Kthehu në faqen kryesore
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
  background:
    'radial-gradient(circle at top, rgba(200,132,26,0.18), transparent 34%), linear-gradient(135deg, #1a120b 0%, #2c1a0a 55%, #120c07 100%)',
  padding: '24px',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '440px',
  backgroundColor: '#fffaf3',
  borderRadius: '26px',
  padding: '34px 30px',
  boxShadow: '0 22px 60px rgba(0, 0, 0, 0.24)',
  border: '1px solid rgba(200,132,26,0.22)',
};

const logoWrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '22px',
};

const logoStyle: React.CSSProperties = {
  width: '52px',
  height: '52px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #d4911e 0%, #b87318 100%)',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: 900,
  boxShadow: '0 8px 22px rgba(200,132,26,0.35)',
};

const brandTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '20px',
  fontWeight: 900,
  color: '#1a120b',
};

const brandSubStyle: React.CSSProperties = {
  margin: '4px 0 0',
  fontSize: '11px',
  fontWeight: 900,
  color: '#c8841a',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#fef3d0',
  color: '#92640e',
  padding: '8px 13px',
  borderRadius: '999px',
  fontSize: '11px',
  fontWeight: 900,
  letterSpacing: '0.12em',
  marginBottom: '16px',
  border: '1px solid #e8d5a0',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '32px',
  fontWeight: 900,
  color: '#1a120b',
};

const subtitleStyle: React.CSSProperties = {
  marginTop: '10px',
  marginBottom: '24px',
  fontSize: '15px',
  lineHeight: 1.7,
  color: '#7a6a52',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const inputStyle: React.CSSProperties = {
  height: '52px',
  borderRadius: '15px',
  border: '1.5px solid #e6d9c4',
  backgroundColor: '#ffffff',
  padding: '0 15px',
  fontSize: '15px',
  outline: 'none',
  color: '#1a120b',
};

const buttonStyle: React.CSSProperties = {
  height: '52px',
  border: 'none',
  borderRadius: '15px',
  background: 'linear-gradient(135deg, #d4911e 0%, #c8841a 100%)',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 900,
  cursor: 'pointer',
  boxShadow: '0 10px 24px rgba(200,132,26,0.35)',
};

const errorStyle: React.CSSProperties = {
  margin: 0,
  color: '#b91c1c',
  backgroundColor: '#fee2e2',
  border: '1px solid #fecaca',
  borderRadius: '12px',
  padding: '10px 12px',
  fontSize: '13px',
  fontWeight: 700,
  lineHeight: 1.5,
};

const footerStyle: React.CSSProperties = {
  marginTop: '20px',
  textAlign: 'center',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#92640e',
  fontWeight: 800,
  fontSize: '14px',
};