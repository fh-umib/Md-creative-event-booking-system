import { Music, Palette, PartyPopper, Sparkles } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const activities = [
  {
    title: "Face Painting",
    description: "Colorful designs and fun character-inspired looks for kids.",
    icon: Palette,
  },
  {
    title: "Games Host",
    description: "Interactive games and guided entertainment for every age group.",
    icon: PartyPopper,
  },
  {
    title: "Music & DJ",
    description: "Energetic music and celebration atmosphere for memorable events.",
    icon: Music,
  },
  {
    title: "Special Effects",
    description: "Confetti, smoke, and extra visual highlights for premium events.",
    icon: Sparkles,
  },
];

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Activities & Entertainment
          </p>
          <h1 className="mt-4 text-5xl font-semibold">Fun experiences for unforgettable events</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-500">
            Explore entertainment options that keep your guests engaged and excited.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.title}
                className="rounded-[28px] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                <Icon className="text-amber-500" size={28} />
                <h2 className="mt-5 text-3xl font-semibold">{activity.title}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-500">
                  {activity.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}