import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Error 404
          </p>
          <h1 className="mt-4 text-6xl font-semibold">Page not found</h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-slate-500">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-2xl bg-slate-900 px-6 py-4 text-lg font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}