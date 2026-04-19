import React from 'react';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Client Sign In</h1>
        <p style={subtitleStyle}>
          Sign in to manage your bookings, requests and event details.
        </p>

        <form style={formStyle}>
          <input type="email" placeholder="Email address" style={inputStyle} />
          <input type="password" placeholder="Password" style={inputStyle} />

          <button type="submit" style={buttonStyle}>
            Sign In
          </button>
        </form>

        <div style={footerStyle}>
          <span style={footerTextStyle}>Don’t have an account?</span>
          <span style={createAccountStyle}>Create account</span>
        </div>

        <div style={backWrapperStyle}>
          <Link to="/" style={backLinkStyle}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8fafc, #eef2f7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '460px',
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  padding: '40px 32px',
  boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '32px',
  fontWeight: 800,
  color: '#0b1736',
};

const subtitleStyle: React.CSSProperties = {
  marginTop: '10px',
  marginBottom: '28px',
  color: '#64748b',
  fontSize: '16px',
  lineHeight: 1.6,
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '56px',
  borderRadius: '16px',
  border: '1px solid #dbe2ea',
  padding: '0 16px',
  fontSize: '16px',
  outline: 'none',
  boxSizing: 'border-box',
};

const buttonStyle: React.CSSProperties = {
  height: '56px',
  borderRadius: '16px',
  border: 'none',
  backgroundColor: '#d89a16',
  color: '#0b1736',
  fontSize: '16px',
  fontWeight: 800,
  cursor: 'pointer',
};

const footerStyle: React.CSSProperties = {
  marginTop: '18px',
  display: 'flex',
  gap: '8px',
  justifyContent: 'center',
  color: '#475569',
  fontSize: '15px',
};

const footerTextStyle: React.CSSProperties = {
  color: '#475569',
};

const createAccountStyle: React.CSSProperties = {
  color: '#0b1736',
  fontWeight: 700,
};

const backWrapperStyle: React.CSSProperties = {
  marginTop: '24px',
  textAlign: 'center',
};

const backLinkStyle: React.CSSProperties = {
  color: '#64748b',
  textDecoration: 'none',
  fontWeight: 600,
};