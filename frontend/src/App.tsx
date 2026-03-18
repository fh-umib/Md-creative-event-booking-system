import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <section className="page">
      <h1>MD Creative</h1>
      <p>Smart Event & Booking Management System for family entertainment services.</p>
      <div className="actions">
        <Link to="/packages" className="btn">View Packages</Link>
        <Link to="/login" className="btn btn-outline">Login</Link>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section className="page">
      <h1>Packages</h1>
      <p>Browse available event packages, mascots, and entertainment offers.</p>
    </section>
  );
}

function Login() {
  return (
    <section className="page">
      <h1>Login</h1>
      <p>Sign in to manage bookings and events.</p>
    </section>
  );
}

function Register() {
  return (
    <section className="page">
      <h1>Register</h1>
      <p>Create an account to book services and customize your event.</p>
    </section>
  );
}

function Dashboard() {
  return (
    <section className="page">
      <h1>Dashboard</h1>
      <p>Manage bookings, services, staff, and reports.</p>
    </section>
  );
}

function NotFound() {
  return (
    <section className="page">
      <h1>404</h1>
      <p>Page not found.</p>
    </section>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">MD Creative</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/packages">Packages</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
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