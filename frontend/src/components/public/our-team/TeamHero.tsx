import type { StaffStats } from "../../../types/staff";

interface TeamHeroProps {
  stats: StaffStats;
}

export default function TeamHero({ stats }: TeamHeroProps) {
  return (
    <section className="bg-[#1d2a44] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="inline-flex items-center rounded-full border border-[#d89b2b]/40 px-4 py-2 text-sm tracking-[0.2em] uppercase text-[#d89b2b] mb-6">
          The People Behind the Magic
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Meet Our <span className="text-[#d89b2b]">Talented</span>
          <br />
          Team
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white/75 max-w-3xl mx-auto">
          Every unforgettable event starts with exceptional people.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="rounded-full border border-white/15 bg-white/5 px-6 py-5">
            <p className="text-2xl font-bold">{stats.total_members}</p>
            <p className="text-sm uppercase tracking-widest text-white/70 mt-1">
              Team Members
            </p>
          </div>

          <div className="rounded-full border border-white/15 bg-white/5 px-6 py-5">
            <p className="text-2xl font-bold">
              {stats.avg_rating > 0 ? stats.avg_rating : "—"}
            </p>
            <p className="text-sm uppercase tracking-widest text-white/70 mt-1">
              Avg Rating
            </p>
          </div>

          <div className="rounded-full border border-white/15 bg-white/5 px-6 py-5">
            <p className="text-2xl font-bold">{stats.total_reviews}</p>
            <p className="text-sm uppercase tracking-widest text-white/70 mt-1">
              Total Reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}