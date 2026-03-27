import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const chartCards = [
  "Bookings per month",
  "Popular services",
  "Popular mascots",
  "Revenue overview",
  "Peak seasons",
  "Guest vs registered users",
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Analytics
          </p>
          <h1 className="mt-4 text-5xl font-semibold">Business insights and event trends</h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-500">
            Track bookings, services, revenue, and demand across seasons.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {chartCards.map((title) => (
            <div
              key={title}
              className="rounded-[28px] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <h3 className="text-2xl font-semibold">{title}</h3>
              <div className="mt-6 flex h-64 items-center justify-center rounded-2xl bg-stone-100 text-slate-400">
                Chart placeholder
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}