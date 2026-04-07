import type { StaffMember } from "../../../types/staff";
import TeamCard from "./TeamCard";

interface TeamGridProps {
  staff: StaffMember[];
}

export default function TeamGrid({ staff }: TeamGridProps) {
  return (
    <section className="py-20 bg-[#f8f7f4]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.2em] text-[#d89b2b] text-sm font-semibold">
            Our Professionals
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#1d2233]">
            Experts In Every Detail
          </h2>
          <div className="w-20 h-1 bg-[#d89b2b] mx-auto mt-5 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {staff.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}