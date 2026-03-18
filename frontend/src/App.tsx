import { Routes, Route } from "react-router-dom";

function Home() {
  return <h1>Home Page</h1>;
}

function Packages() {
  return <h1>Packages Page</h1>;
}

function Login() {
  return <h1>Login Page</h1>;
}

function Register() {
  return <h1>Register Page</h1>;
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}