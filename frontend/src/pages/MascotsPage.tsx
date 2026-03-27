import { CheckCircle2, Filter, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

type MascotItem = {
  id: number;
  name: string;
  character: string;
  price: number;
  availability: "Available" | "Booked Soon";
  image: string;
};

const mascots: MascotItem[] = [
  {
    id: 1,
    name: "Spiderman",
    character: "Superhero",
    price: 90,
    availability: "Available",
    image:
      "https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Elsa",
    character: "Princess",
    price: 85,
    availability: "Available",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Batman",
    character: "Superhero",
    price: 95,
    availability: "Booked Soon",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Anna",
    character: "Princess",
    price: 80,
    availability: "Available",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Captain America",
    character: "Superhero",
    price: 100,
    availability: "Booked Soon",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Mickey Mouse",
    character: "Classic",
    price: 88,
    availability: "Available",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
  },
];

export default function MascotPage() {
  const [filter, setFilter] = useState<"All" | "Available" | "Booked Soon">("All");

  const filteredMascots = useMemo(() => {
    if (filter === "All") return mascots;
    return mascots.filter((item) => item.availability === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Mascot Characters
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight">
            Choose the perfect mascot for your celebration
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-500">
            Browse our available mascots, compare prices, and pick the characters
            that match your event theme.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-700">
            <Filter className="text-amber-500" size={20} />
            <span className="font-medium">Filter by availability</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {["All", "Available", "Booked Soon"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setFilter(item as "All" | "Available" | "Booked Soon")
                }
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredMascots.map((mascot) => (
            <div
              key={mascot.id}
              className="overflow-hidden rounded-[28px] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <div
                className="h-72 bg-cover bg-center"
                style={{ backgroundImage: `url('${mascot.image}')` }}
              />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-semibold text-slate-900">
                      {mascot.name}
                    </h3>
                    <p className="mt-2 text-lg text-slate-500">
                      {mascot.character}
                    </p>
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      mascot.availability === "Available"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {mascot.availability}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                      Starting price
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">
                      €{mascot.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-stone-100 px-4 py-3 text-sm text-slate-600">
                  Multiple mascots can be selected during booking.
                </div>

                <Link
                  to="/booking"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-5 py-4 text-lg font-semibold text-slate-950 transition hover:bg-amber-400"
                >
                  <CheckCircle2 size={20} />
                  Book this mascot
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}