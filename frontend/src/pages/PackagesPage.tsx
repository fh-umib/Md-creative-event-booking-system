import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const packages = [
  {
    name: "Essential Party",
    price: "€180",
    description: "Perfect for smaller celebrations and simple birthday events.",
    features: ["1 Mascot", "Basic Decoration", "2 Activities", "1 Extra"],
  },
  {
    name: "Premium Celebration",
    price: "€320",
    description: "A balanced package for birthdays, engagements, and themed events.",
    features: ["2 Mascots", "Premium Decoration", "4 Activities", "2 Extras"],
    featured: true,
  },
  {
    name: "Luxury Event",
    price: "€520",
    description: "A full-service package for unforgettable premium celebrations.",
    features: ["3 Mascots", "Luxury Decoration", "Photo Booth", "4 Extras"],
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Event Packages
          </p>
          <h1 className="mt-4 text-5xl font-semibold">Flexible packages for every event</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-500">
            Choose a package, then customize it with mascots, activities,
            decorations, and extras.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-[32px] p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ${
                pkg.featured ? "bg-slate-900 text-white" : "bg-white text-slate-900"
              }`}
            >
              {pkg.featured && (
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950">
                  <Sparkles size={16} />
                  Most Popular
                </div>
              )}

              <h2 className="text-3xl font-semibold">{pkg.name}</h2>
              <p
                className={`mt-3 text-lg leading-8 ${
                  pkg.featured ? "text-white/75" : "text-slate-500"
                }`}
              >
                {pkg.description}
              </p>

              <div className="mt-8 text-5xl font-semibold">{pkg.price}</div>

              <div className="mt-8 space-y-4">
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check
                      className={pkg.featured ? "text-amber-400" : "text-amber-500"}
                      size={18}
                    />
                    <span className={pkg.featured ? "text-white/90" : "text-slate-700"}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/booking"
                className={`mt-8 inline-flex w-full justify-center rounded-2xl px-6 py-4 text-lg font-semibold transition ${
                  pkg.featured
                    ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                Choose Package
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}