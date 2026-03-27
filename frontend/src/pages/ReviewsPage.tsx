import { Quote, Star } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const reviews = [
  {
    name: "Ariana M.",
    rating: 5,
    text: "Everything was organized beautifully. The mascot and decorations were amazing.",
  },
  {
    name: "Luan K.",
    rating: 5,
    text: "Very professional team. Communication was excellent and the children loved the activities.",
  },
  {
    name: "Diona R.",
    rating: 4,
    text: "Great service and very friendly staff. The event looked fantastic.",
  },
  {
    name: "Blerim H.",
    rating: 5,
    text: "Our booking experience was smooth and the final event exceeded expectations.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Client Reviews
          </p>
          <h1 className="mt-4 text-5xl font-semibold">What our clients say</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-500">
            Genuine feedback from families and clients who trusted us with their celebrations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <StatCard title="Average Rating" value="4.9/5" />
          <StatCard title="Total Reviews" value="200+" />
          <StatCard title="Recommended" value="96%" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-[28px] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <Quote className="text-amber-500" size={28} />
              <div className="mt-5 flex gap-1 text-amber-500">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="mt-6 text-xl leading-9 text-slate-600">{review.text}</p>
              <p className="mt-6 text-lg font-semibold text-slate-900">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[28px] bg-white p-8 text-center shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{title}</p>
      <h3 className="mt-4 text-5xl font-semibold text-slate-900">{value}</h3>
    </div>
  );
}