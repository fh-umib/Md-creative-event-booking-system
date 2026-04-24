import { useEffect, useState } from 'react';
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setSuccessMessage('');
  }

  function validateForm() {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!isStrongPassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters and include uppercase, lowercase, number and special character.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage('');
      return;
    }

    try {
      setIsSubmitting(true);

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
        throw new Error(data.message || 'Registration failed.');
      }

      setSuccessMessage(
        data.message || 'Account created successfully. Please check your email.'
      );
      setFormData(initialForm);
    } catch (error) {
      setSuccessMessage('');
      setErrors({
        email:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      });
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
          from { opacity: 0; transform: translateY(26px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes panelEnterLeft {
          from { opacity: 0; transform: translateX(-22px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes panelEnterRight {
          from { opacity: 0; transform: translateX(22px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .register-page-root { animation: pageFadeIn 0.5s ease; }
        .register-card { animation: cardEnter 0.65s ease; transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .register-card:hover { transform: translateY(-2px); box-shadow: 0 28px 70px rgba(26,18,11,0.14); }
        .register-left-panel { animation: panelEnterLeft 0.8s ease; }
        .register-right-panel { animation: panelEnterRight 0.8s ease; }
        .register-input { transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease; }
        .register-input:focus { border-color: #c8841a; box-shadow: 0 0 0 4px rgba(200, 132, 26, 0.12); background-color: #fffefd; }
        .register-button { transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; }
        .register-button:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(200, 132, 26, 0.28); filter: brightness(1.02); }
        .register-link:hover { opacity: 0.75; }

        @media (max-width: 900px) {
          .register-card { flex-direction: column; min-height: auto; max-width: 620px; }
        }

        @media (max-width: 640px) {
          .register-page-root { padding: 16px; }
          .register-card { border-radius: 22px; }
          .register-left-panel { padding: 28px 22px; }
          .register-right-panel { padding: 24px 20px; }
          .register-field-row { flex-direction: column; gap: 14px; }
          .register-title { font-size: 38px !important; }
        }
      `}</style>

      <div className="register-page-root" style={pageStyle}>
        <div className="register-card" style={{ ...cardStyle, opacity: isVisible ? 1 : 0 }}>
          <div className="register-left-panel" style={leftPanelStyle}>
            <div style={badgeStyle}>MD Creative</div>
            <h1 className="register-title" style={titleStyle}>Create Account</h1>
            <p style={subtitleStyle}>
              Register to manage your bookings, requests and event details in one elegant place.
            </p>

            <div style={infoBoxStyle}>
              <div style={infoItemStyle}>Secure account creation</div>
              <div style={infoItemStyle}>Easy access to your bookings</div>
              <div style={infoItemStyle}>Beautiful celebrations, all in one place</div>
            </div>
          </div>

          <div className="register-right-panel" style={rightPanelStyle}>
            <form style={formStyle} onSubmit={handleSubmit} noValidate>
              <h2 style={formTitleStyle}>Register</h2>

              {successMessage ? <div style={successBoxStyle}>{successMessage}</div> : null}

              <div style={fieldStyle}>
                <label style={labelStyle}>Full Name</label>
                <input
                  className="register-input"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={{ ...inputStyle, ...(errors.fullName ? inputErrorStyle : {}) }}
                />
                {errors.fullName ? <span style={errorTextStyle}>{errors.fullName}</span> : null}
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Email Address</label>
                <input
                  className="register-input"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ ...inputStyle, ...(errors.email ? inputErrorStyle : {}) }}
                />
                {errors.email ? <span style={errorTextStyle}>{errors.email}</span> : null}
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Phone Number</label>
                <input
                  className="register-input"
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ ...inputStyle, ...(errors.phone ? inputErrorStyle : {}) }}
                />
                {errors.phone ? <span style={errorTextStyle}>{errors.phone}</span> : null}
              </div>

              <div className="register-field-row" style={fieldRowStyle}>
                <div style={fieldHalfStyle}>
                  <label style={labelStyle}>Password</label>
                  <input
                    className="register-input"
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ ...inputStyle, ...(errors.password ? inputErrorStyle : {}) }}
                  />
                  {errors.password ? <span style={errorTextStyle}>{errors.password}</span> : null}
                </div>

                <div style={fieldHalfStyle}>
                  <label style={labelStyle}>Confirm Password</label>
                  <input
                    className="register-input"
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{ ...inputStyle, ...(errors.confirmPassword ? inputErrorStyle : {}) }}
                  />
                  {errors.confirmPassword ? (
                    <span style={errorTextStyle}>{errors.confirmPassword}</span>
                  ) : null}
                </div>
              </div>

              <button className="register-button" type="submit" style={buttonStyle} disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Account'}
              </button>

              <div style={footerStyle}>
                <span style={footerTextStyle}>Already have an account?</span>
                <Link to="/signin" className="register-link" style={footerLinkStyle}>
                  Sign In
                </Link>
              </div>

              <div style={backWrapperStyle}>
                <Link to="/" className="register-link" style={backLinkStyle}>
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
  maxWidth: '320px',
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

const fieldRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
};

const fieldHalfStyle: React.CSSProperties = {
  flex: 1,
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
  height: '50px',
  borderRadius: '14px',
  border: '1px solid #e7d8c4',
  backgroundColor: '#fffaf4',
  padding: '0 14px',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  color: '#1f1a17',
};

const inputErrorStyle: React.CSSProperties = {
  border: '1px solid #dc2626',
};

const errorTextStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#dc2626',
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

const buttonStyle: React.CSSProperties = {
  marginTop: '4px',
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