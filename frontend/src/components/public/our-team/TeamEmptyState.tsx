export default function TeamEmptyState() {
  return (
    <section className="py-20 bg-[#f8f7f4]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="uppercase tracking-[0.2em] text-[#d89b2b] text-sm font-semibold">
          Our Professionals
        </p>

        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#1d2233]">
          Experts In Every Detail
        </h2>

        <div className="w-20 h-1 bg-[#d89b2b] mx-auto mt-5 rounded-full" />

        <div className="mt-20">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-4xl text-gray-400">
            👥
          </div>

          <h3 className="mt-8 text-3xl font-bold text-[#1d2233]">
            Team Coming Soon
          </h3>

          <p className="mt-4 text-lg text-gray-500">
            Our team profiles are being prepared. Check back soon.
          </p>
        </div>
      </div>
    </section>
  );
}