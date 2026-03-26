import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />

      <main className="px-6 py-8 md:py-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="grid min-h-[680px] lg:grid-cols-2">
            <div
              className="relative hidden min-h-[680px] lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,23,42,0.38), rgba(15,23,42,0.38)), url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <p className="text-sm uppercase tracking-[0.35em] text-white/80">
                  Welcome back
                </p>
                <h1 className="mt-4 max-w-md text-5xl font-semibold leading-tight">
                  Sign in to manage your events and bookings.
                </h1>
                <p className="mt-4 max-w-md text-lg leading-8 text-white/80">
                  Access your account, review bookings, track event details, and stay
                  updated with every celebration.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center px-8 py-10 md:px-12">
              <div className="w-full max-w-md">
                <Link to="/" className="inline-block">
                  <h2 className="text-4xl font-semibold text-slate-900">
                    MD <span className="text-amber-500">Creative</span>
                  </h2>
                </Link>

                <div className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
                    Account Access
                  </p>
                  <h3 className="mt-3 text-4xl font-semibold text-slate-900">
                    Sign In
                  </h3>
                  <p className="mt-4 max-w-md text-lg leading-8 text-slate-500">
                    Enter your credentials to continue to your dashboard.
                  </p>
                </div>

                <form className="mt-8 space-y-5">

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 transition focus-within:border-amber-500">
                      <Mail size={18} className="text-slate-400" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full border-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 transition focus-within:border-amber-500">
                      <Lock size={18} className="text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300"
                      />
                      Remember me
                    </label>
                    <a
                      href="#"
                      className="font-medium text-amber-600 hover:text-amber-700"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-amber-500 px-6 py-4 text-lg font-semibold text-slate-950 transition hover:bg-amber-400"
                  >
                    Sign In
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-amber-600 hover:text-amber-700"
                  >
                    Create one
                  </Link>
                </p>

                <div className="mt-8 rounded-2xl bg-stone-100 px-5 py-4 text-sm leading-7 text-slate-500">
                  Guest users can still book events without logging in.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}