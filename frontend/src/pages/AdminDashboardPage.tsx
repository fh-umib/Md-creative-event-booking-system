import { CalendarDays, Image, Package, Star, Users } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const stats = [
  { title: "Total Events", value: "128", icon: CalendarDays },
  { title: "Revenue", value: "€18,400", icon: Package },
  { title: "Top Mascots", value: "Spiderman", icon: Star },
  { title: "Top Staff", value: "Ariana K.", icon: Users },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Admin Dashboard
          </p>
          <h1 className="mt-4 text-5xl font-semibold">Overview of bookings, team, and performance</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="rounded-[28px] bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                <Icon className="text-amber-500" size={24} />
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-400">
                  {stat.title}
                </p>
                <h2 className="mt-3 text-4xl font-semibold">{stat.value}</h2>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <h3 className="text-3xl font-semibold">Recent Reviews</h3>
            <div className="mt-6 space-y-5">
              {["Excellent decoration setup", "Very friendly mascot team", "Great communication"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 px-5 py-4 text-slate-700"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded-[28px] bg-slate-900 p-8 text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
            <div className="flex items-center gap-3">
              <Image className="text-amber-400" />
              <h3 className="text-3xl font-semibold">Event Gallery</h3>
            </div>
            <p className="mt-4 text-white/75 leading-8">
              Featured past events, decoration highlights, mascot appearances, and recent portfolio items.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}