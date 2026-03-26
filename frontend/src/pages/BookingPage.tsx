import {
  CalendarDays,
  Check,
  Mail,
  MapPin,
  PartyPopper,
  Phone,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

type EventType = "Wedding" | "Engagement" | "Birthday";

const mascotOptions = [
  "Spiderman",
  "Elsa",
  "Anna",
  "Mickey Mouse",
  "Captain America",
  "Batman",
];

const activityOptions = [
  "Face Painting",
  "Balloon Art",
  "Games Host",
  "Music & DJ",
  "Bounce House",
  "Photo Booth",
];

const extraOptions = [
  "Candy Table",
  "Smoke Effects",
  "Confetti Show",
  "Welcome Sign",
  "Kids Corner",
  "Custom Cake Table",
];

const decorationThemes: Record<EventType, string[]> = {
  Wedding: ["Elegant", "Classic", "Luxury"],
  Engagement: ["Romantic", "Modern", "Minimal"],
  Birthday: [
    "Princess",
    "Barbie",
    "Frozen",
    "Pink",
    "Spiderman",
    "Superheroes",
    "Cars",
    "Blue",
  ],
};

export default function BookingPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "Birthday" as EventType,
    eventDate: "",
    location: "",
    decorationTheme: "",
  });

  const [selectedMascots, setSelectedMascots] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const availableThemes = useMemo(
    () => decorationThemes[formData.eventType] || [],
    [formData.eventType]
  );

  const toggleSelection = (
    value: string,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === "eventType" ? { decorationTheme: "" } : {}),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Event Booking
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight text-slate-900">
            Plan your perfect celebration with us
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-500">
            Choose your event type, mascots, decorations, activities, and extras.
            Fill out the form below and we’ll help bring your event to life.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-[32px] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
          >
            <SectionTitle
              title="Client Information"
              description="Enter your contact details so we can confirm your booking."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                icon={<User size={18} className="text-slate-400" />}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                icon={<Mail size={18} className="text-slate-400" />}
              />
              <InputField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+383 4X XXX XXX"
                icon={<Phone size={18} className="text-slate-400" />}
              />
              <InputField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Event location"
                icon={<MapPin size={18} className="text-slate-400" />}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <SelectField
                label="Event Type"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                options={["Wedding", "Engagement", "Birthday"]}
              />
              <InputField
                label="Event Date"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={handleChange}
                icon={<CalendarDays size={18} className="text-slate-400" />}
              />
            </div>

            <SectionTitle
              title="Decoration Theme"
              description="Themes change dynamically based on the selected event type."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {availableThemes.map((theme) => {
                const active = formData.decorationTheme === theme;
                return (
                  <button
                    key={theme}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, decorationTheme: theme }))
                    }
                    className={`rounded-2xl border px-5 py-4 text-left transition ${
                      active
                        ? "border-amber-500 bg-amber-50 text-slate-900"
                        : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{theme}</span>
                      {active && <Check size={18} className="text-amber-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <SelectionSection
              title="Select Mascots"
              description="Choose one or multiple mascots for the event."
              items={mascotOptions}
              selected={selectedMascots}
              onToggle={(value) => toggleSelection(value, setSelectedMascots)}
            />

            <SelectionSection
              title="Select Activities"
              description="Add entertainment and activities to your package."
              items={activityOptions}
              selected={selectedActivities}
              onToggle={(value) => toggleSelection(value, setSelectedActivities)}
            />

            <SelectionSection
              title="Select Extras"
              description="Enhance your celebration with extra services."
              items={extraOptions}
              selected={selectedExtras}
              onToggle={(value) => toggleSelection(value, setSelectedExtras)}
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-amber-500 px-6 py-4 text-lg font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Submit Booking
            </button>

            {submitted && (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-5 text-emerald-800">
                <p className="text-lg font-semibold">
                  Thank you for choosing our company.
                </p>
                <p className="mt-2 leading-8">
                  We appreciate your trust and look forward to making your event unforgettable.
                </p>
              </div>
            )}
          </form>

          <aside className="space-y-6">
            <div className="rounded-[32px] bg-slate-900 p-8 text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
                Booking Summary
              </p>
              <h2 className="mt-4 text-3xl font-semibold">Your selections</h2>

              <div className="mt-8 space-y-5 text-white/85">
                <SummaryRow label="Name" value={formData.fullName || "Not set"} />
                <SummaryRow label="Email" value={formData.email || "Not set"} />
                <SummaryRow label="Phone" value={formData.phone || "Not set"} />
                <SummaryRow label="Event Type" value={formData.eventType} />
                <SummaryRow label="Date" value={formData.eventDate || "Not set"} />
                <SummaryRow label="Location" value={formData.location || "Not set"} />
                <SummaryRow
                  label="Theme"
                  value={formData.decorationTheme || "Not selected"}
                />
                <SummaryRow
                  label="Mascots"
                  value={selectedMascots.length ? selectedMascots.join(", ") : "None"}
                />
                <SummaryRow
                  label="Activities"
                  value={selectedActivities.length ? selectedActivities.join(", ") : "None"}
                />
                <SummaryRow
                  label="Extras"
                  value={selectedExtras.length ? selectedExtras.join(", ") : "None"}
                />
              </div>
            </div>

            <div className="rounded-[32px] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-3">
                <PartyPopper className="text-amber-500" />
                <h3 className="text-2xl font-semibold text-slate-900">
                  Peak Season Notice
                </h3>
              </div>
              <p className="mt-4 text-lg leading-8 text-slate-500">
                June, July, August, and September are peak season months. Please
                book at least 1 week in advance.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-lg leading-8 text-slate-500">{description}</p>
    </div>
  );
}

function InputField({
  label,
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 transition focus-within:border-amber-500">
        {icon}
        <input
          {...props}
          className="w-full border-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <select
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none focus:border-amber-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function SelectionSection({
  title,
  description,
  items,
  selected,
  onToggle,
}: {
  title: string;
  description: string;
  items: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <SectionTitle title={title} description={description} />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const active = selected.includes(item);

          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggle(item)}
              className={`rounded-2xl border px-5 py-4 text-left transition ${
                active
                  ? "border-amber-500 bg-amber-50 text-slate-900"
                  : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{item}</span>
                {active && <Check size={18} className="text-amber-600" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-white/10 pb-3">
      <p className="text-sm uppercase tracking-[0.2em] text-white/50">{label}</p>
      <p className="mt-2 text-base leading-7 text-white">{value}</p>
    </div>
  );
}