import { Award, Star } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const staff = [
  {
    name: "Flutura Hyseni",
    role: "Event Coordinator",
    rating: 4.9,
    reviews: 48,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Rinor Hyseni",
    role: "Mascot Performer",
    rating: 4.8,
    reviews: 52,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Tringa Hyseni",
    role: "Decoration Specialist",
    rating: 4.9,
    reviews: 41,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
  },
];

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Our Team
          </p>
          <h1 className="mt-4 text-5xl font-semibold">Meet the people behind every celebration</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-500">
            Our team combines creativity, professionalism, and experience to deliver memorable events.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {staff.map((member) => (
            <div
              key={member.name}
              className="overflow-hidden rounded-[28px] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <div
                className="h-80 bg-cover bg-center"
                style={{ backgroundImage: `url('${member.image}')` }}
              />
              <div className="p-6">
                <h3 className="text-3xl font-semibold">{member.name}</h3>
                <p className="mt-2 text-lg text-slate-500">{member.role}</p>

                <div className="mt-6 flex items-center justify-between rounded-2xl bg-stone-100 px-4 py-4">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Star size={18} fill="currentColor" />
                    <span className="font-semibold text-slate-900">{member.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Award size={18} className="text-amber-500" />
                    <span>{member.reviews} reviews</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}