import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const categories = [
  {
    title: "Wedding Themes",
    items: ["Elegant", "Classic", "Luxury"],
  },
  {
    title: "Engagement Themes",
    items: ["Romantic", "Modern", "Minimal"],
  },
  {
    title: "Birthday Themes",
    items: ["Princess", "Barbie", "Frozen", "Pink", "Spiderman", "Superheroes", "Cars", "Blue"],
  },
];

export default function DecorationsPage() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Decorations
          </p>
          <h1 className="mt-4 text-5xl font-semibold">Themes that match every celebration</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-500">
            Browse decoration themes by event type and build the perfect visual style for your event.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 space-y-8">
        {categories.map((category) => (
          <div
            key={category.title}
            className="rounded-[28px] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
          >
            <h2 className="text-3xl font-semibold">{category.title}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {category.items.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 px-5 py-4 font-medium text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}