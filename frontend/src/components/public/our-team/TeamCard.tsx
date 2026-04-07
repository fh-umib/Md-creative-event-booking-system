import type { StaffMember } from "../../../types/staff";

interface TeamCardProps {
  member: StaffMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const imageSrc =
    member.image_url && member.image_url.trim() !== ""
      ? member.image_url
      : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-72 bg-gray-100 overflow-hidden">
        <img
          src={imageSrc}
          alt={member.full_name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#1d2233]">{member.full_name}</h3>
        <p className="text-[#d89b2b] font-semibold mt-2">{member.role}</p>

        <p className="text-gray-600 mt-4 leading-7 min-h-[84px]">
          {member.bio || "Dedicated to creating beautiful and memorable events."}
        </p>

        <div className="mt-5 space-y-2 text-sm text-gray-500">
          {member.email && <p>{member.email}</p>}
          {member.phone && <p>{member.phone}</p>}
        </div>
      </div>
    </div>
  );
}