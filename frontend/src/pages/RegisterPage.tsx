import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />

      <main className="px-6 py-8 md:py-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="grid min-h-[680px] lg:grid-cols-2">
            <div className="flex items-center justify-center px-8 py-10 md:px-12">
              <div className="w-full max-w-md">
                <Link to="/" className="inline-block">
                  <h2 className="text-4xl font-semibold text-slate-900">
                    MD <span className="text-amber-500">Creative</span>
                  </h2>
                </Link>

                <div className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
                    Create Account
                  </p>
                  <h3 className="mt-3 text-4xl font-semibold text-slate-900">
                    Register
                  </h3>
                  <p className="mt-4 max-w-md text-lg leading-8 text-slate-500">
                    Create your account to save bookings, loyalty progress, and reviews.
                  </p>
                </div>

                <form className="mt-8 space-y-4">
                  <Field
                    label="Full name"
                    icon={<User size={18} className="text-slate-400" />}
                    placeholder="Full name"
                  />
                  <Field
                    label="Email address"
                    icon={<Mail size={18} className="text-slate-400" />}
                    placeholder="Email address"
                  />
                  <Field
                    label="Phone number"
                    icon={<Phone size={18} className="text-slate-400" />}
                    placeholder="Phone number"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 transition focus-within:border-amber-500">
                      <Lock size={18} className="text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        className="w-full border-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-slate-400 transition hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-2xl bg-amber-500 px-6 py-4 text-lg font-semibold text-slate-950 transition hover:bg-amber-400"
                  >
                    Create Account
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-amber-600 hover:text-amber-700"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            <div
              className="relative hidden min-h-[680px] lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,23,42,0.35), rgba(15,23,42,0.35)), url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <p className="text-sm uppercase tracking-[0.35em] text-white/80">
                  Let&apos;s celebrate
                </p>
                <h1 className="mt-4 max-w-md text-5xl font-semibold leading-tight">
                  Join us and start planning unforgettable events.
                </h1>
                <p className="mt-4 max-w-md text-lg leading-8 text-white/80">
                  Create your account and keep all your bookings, preferences, and event plans in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Field({
  label,
  icon,
  placeholder,
}: {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 transition focus-within:border-amber-500">
        {icon}
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}