import { ArrowRight, Award, CalendarClock, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const serviceCards = [
  {
    title: "Decorations",
    description:
      "Elegant setups for weddings, birthdays, engagements, anniversaries, and grand openings.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    link: "/decorations",
  },
  {
    title: "Mascot Characters",
    description:
      "Over 50 unique mascot characters to bring joy and excitement to every celebration.",
    image:
      "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=1200&q=80",
    link: "/mascots",
  },
  {
    title: "Activities & Entertainment",
    description:
      "Face painting, bounce houses, ball houses, and music — exclusive attractions in Kosovo.",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
    link: "/activities",
  },
  {
    title: "Photo Experiences",
    description:
      "360° Photo Booth and Photo Box stations to capture every unforgettable moment.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    link: "/gallery",
  },
];

const stats = [
  { icon: Users, value: "5,000+", label: "Happy Clients" },
  { icon: Star, value: "200+", label: "5-Star Reviews" },
  { icon: Award, value: "800+", label: "Events Delivered" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <section
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(15,23,42,0.72), rgba(15,23,42,0.30), rgba(245,245,244,0.92)), url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-24 text-center md:pt-28">
          <p className="text-sm uppercase tracking-[0.3em] text-white/80">
            Premium event services in Kosovo
          </p>

          <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-semibold leading-tight text-white md:text-7xl">
            Creating Extraordinary Events & Celebrations
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-white/80">
            From elegant decorations to captivating entertainment — we craft bespoke
            experiences that make every occasion truly memorable.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/packages"
              className="inline-flex items-center gap-3 rounded-xl bg-amber-500 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Explore Our Packages
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/booking"
              className="rounded-xl border border-white/40 bg-white/10 px-8 py-4 text-lg font-medium text-white backdrop-blur transition hover:bg-white/20"
            >
              Book an Event
            </Link>
          </div>
        </div>

        <div className="mx-auto -mt-10 max-w-5xl px-6 pb-12">
          <div className="grid gap-6 rounded-3xl bg-white p-10 shadow-xl md:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="mx-auto mb-5 text-amber-500" size={28} />
                  <h3 className="text-5xl font-semibold text-slate-900">{stat.value}</h3>
                  <p className="mt-3 text-xl text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          What We Offer
        </p>
        <h2 className="mt-4 text-5xl font-semibold text-slate-900">Our Services</h2>
        <p className="mx-auto mt-6 max-w-3xl text-2xl leading-10 text-slate-500">
          Select a category to explore our full range of professional event services.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {serviceCards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div
                className="h-[420px] w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(15,23,42,0.78), rgba(15,23,42,0.18)), url('${card.image}')`,
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-8 text-left text-white">
                <h3 className="text-5xl font-semibold">{card.title}</h3>
                <p className="mt-4 max-w-xl text-xl leading-8 text-white/85">
                  {card.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-2xl font-semibold text-amber-400">
                  Explore <ArrowRight size={20} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-100 px-6 py-16 text-center">
        <CalendarClock className="mx-auto text-amber-500" size={34} />
        <h3 className="mt-5 text-4xl font-semibold text-slate-900">Peak Season Notice</h3>
        <p className="mx-auto mt-5 max-w-3xl text-2xl leading-10 text-slate-500">
          June, July, August, and September are peak season months. Please book at
          least 1 week in advance to secure your preferred date.
        </p>
      </section>

      <section className="px-6 py-24 text-center">
        <h2 className="mx-auto max-w-4xl text-6xl font-semibold leading-tight text-slate-900">
          Ready to Create Something Extraordinary?
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-2xl leading-10 text-slate-500">
          Let us bring your vision to life. Choose a package, customize your services,
          and leave the rest to us.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/booking"
            className="inline-flex items-center gap-3 rounded-xl bg-amber-500 px-8 py-4 text-xl font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Start Planning Your Event
            <ArrowRight size={20} />
          </Link>

          <a
            href="tel:+38344111222"
            className="rounded-xl border border-slate-300 bg-white px-8 py-4 text-xl font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Call Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}