import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContextValue {
isAuthenticated: boolean;
adminEmail: string | null;
login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ADMIN_EMAIL = 'admin@mdcreative.com';
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }: { children: React.ReactNode }) {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [adminEmail, setAdminEmail] = useState<string | null>(null);

useEffect(() => {
const savedAuth = localStorage.getItem('md_admin_auth');
const savedEmail = localStorage.getItem('md_admin_email');

if (savedAuth === 'true') {
setIsAuthenticated(true);
setAdminEmail(savedEmail || ADMIN_EMAIL);
}
}, []);

const login = async (email: string, password: string) => {
const normalizedEmail = email.trim().toLowerCase();

if (normalizedEmail !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
return {
success: false,
message: 'Incorrect email or password.',
};
}

setIsAuthenticated(true);
setAdminEmail(normalizedEmail);

localStorage.setItem('md_admin_auth', 'true');
localStorage.setItem('md_admin_email', normalizedEmail);

return { success: true };
};

const logout = () => {
setIsAuthenticated(false);
setAdminEmail(null);
localStorage.removeItem('md_admin_auth');
localStorage.removeItem('md_admin_email');
};

const value = useMemo(
() => ({
isAuthenticated,
adminEmail,
login,
logout,
}),
[isAuthenticated, adminEmail]
);

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
const context = useContext(AuthContext);

if (!context) {
throw new Error('useAuth must be used within AuthProvider');
}

return context;
}
