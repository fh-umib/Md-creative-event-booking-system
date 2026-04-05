import { useState } from 'react';

interface AdminLoginFormProps {
onSubmit: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
}

export default function AdminLoginForm({ onSubmit }: AdminLoginFormProps) {
const [email, setEmail] = useState('admin@mdcreative.com');
const [password, setPassword] = useState('admin123');
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault();
setError('');
setIsLoading(true);

const result = await onSubmit(email, password);

if (!result.success) {
setError(result.message || 'Login failed.');
}

setIsLoading(false);
}

return (
<form onSubmit={handleSubmit} style={formStyle}>
<div style={fieldStyle}>
<label style={labelStyle}>Admin Email</label>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Enter admin email"
style={inputStyle}
/>
</div>

<div style={fieldStyle}>
<label style={labelStyle}>Password</label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="Enter password"
style={inputStyle}
/>
</div>

{error ? <div style={errorStyle}>{error}</div> : null}

<button type="submit" disabled={isLoading} style={buttonStyle}>
{isLoading ? 'Signing in...' : 'Sign In to Admin'}
</button>
</form>
);
}

const formStyle: React.CSSProperties = {
display: 'grid',
gap: '18px',
};

const fieldStyle: React.CSSProperties = {
display: 'grid',
gap: '8px',
};

const labelStyle: React.CSSProperties = {
color: '#0f172a',
fontWeight: 700,
fontSize: '15px',
};

const inputStyle: React.CSSProperties = {
border: '1px solid #dbe2ea',
borderRadius: '16px',
padding: '15px 16px',
fontSize: '15px',
outline: 'none',
background: '#ffffff',
};

const errorStyle: React.CSSProperties = {
background: '#fff1f2',
border: '1px solid #fecdd3',
color: '#be123c',
padding: '12px 14px',
borderRadius: '14px',
fontWeight: 600,
fontSize: '14px',
};

const buttonStyle: React.CSSProperties = {
border: 'none',
background: '#d99a1d',
color: '#111827',
padding: '15px 18px',
borderRadius: '16px',
fontWeight: 800,
fontSize: '16px',
cursor: 'pointer',
};
