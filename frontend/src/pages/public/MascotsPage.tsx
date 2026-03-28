import { CheckCircle2, Filter, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  createMascot,
  deleteMascot,
  getMascots,
  updateMascot,
  type Mascot,
} from "../../services/mascots/mascotService";

type AvailabilityFilter = "All" | "Available" | "Booked Soon";

type FormState = {
  name: string;
  characterName: string;
  theme: string;
  description: string;
  price: string;
  durationMinutes: string;
  minAge: string;
  maxAge: string;
  isAvailable: boolean;
  image: string;
};

const initialFormState: FormState = {
  name: "",
  characterName: "",
  theme: "",
  description: "",
  price: "",
  durationMinutes: "60",
  minAge: "",
  maxAge: "",
  isAvailable: true,
  image: "",
};

export default function MascotsPage() {
  const [mascots, setMascots] = useState<Mascot[]>([]);
  const [filter, setFilter] = useState<AvailabilityFilter>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>(initialFormState);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadMascots = async () => {
    try {
      setLoading(true);
      const data = await getMascots();
      setMascots(data);
      setError("");
    } catch (err) {
      setError("Failed to load mascots.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMascots();
  }, []);

  const filteredMascots = useMemo(() => {
    if (filter === "All") return mascots;
    if (filter === "Available") {
      return mascots.filter((item) => item.isAvailable);
    }
    return mascots.filter((item) => !item.isAvailable);
  }, [filter, mascots]);

  const resetForm = () => {
    setForm(initialFormState);
    setEditingId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name,
        characterName: form.characterName,
        theme: form.theme || null,
        description: form.description,
        price: Number(form.price),
        durationMinutes: Number(form.durationMinutes),
        minAge: form.minAge ? Number(form.minAge) : null,
        maxAge: form.maxAge ? Number(form.maxAge) : null,
        isAvailable: form.isAvailable,
        image: form.image,
      };

      if (editingId !== null) {
        await updateMascot(editingId, payload);
      } else {
        await createMascot(payload);
      }

      await loadMascots();
      resetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    }
  };

  const handleEdit = (mascot: Mascot) => {
    setEditingId(mascot.id);
    setForm({
      name: mascot.name,
      characterName: mascot.characterName,
      theme: mascot.theme || "",
      description: mascot.description || "",
      price: String(mascot.price),
      durationMinutes: String(mascot.durationMinutes),
      minAge: mascot.minAge ? String(mascot.minAge) : "",
      maxAge: mascot.maxAge ? String(mascot.maxAge) : "",
      isAvailable: mascot.isAvailable,
      image: mascot.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this mascot?");
    if (!confirmed) return;

    try {
      await deleteMascot(id);
      await loadMascots();
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Navbar />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Mascot Characters
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight">
            Manage and explore mascot characters
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-500">
            View mascot records from the backend, add new mascots, update existing ones,
            and delete records through a complete CRUD flow.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-[28px] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
                  {editingId !== null ? "Update Mascot" : "Create Mascot"}
                </p>
                <h2 className="mt-3 text-3xl font-semibold">
                  {editingId !== null ? "Edit selected mascot" : "Add a new mascot"}
                </h2>
              </div>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <X size={16} />
                  Cancel
                </button>
              )}
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <InputField label="Name" name="name" value={form.name} onChange={handleChange} />
              <InputField
                label="Character Name"
                name="characterName"
                value={form.characterName}
                onChange={handleChange}
              />
              <InputField label="Theme" name="theme" value={form.theme} onChange={handleChange} />
              <InputField
                label="Price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
              <InputField
                label="Duration Minutes"
                name="durationMinutes"
                type="number"
                value={form.durationMinutes}
                onChange={handleChange}
              />
              <InputField
                label="Min Age"
                name="minAge"
                type="number"
                value={form.minAge}
                onChange={handleChange}
              />
              <InputField
                label="Max Age"
                name="maxAge"
                type="number"
                value={form.maxAge}
                onChange={handleChange}
              />
              <InputField
                label="Image URL"
                name="image"
                value={form.image}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-900 outline-none focus:border-amber-500"
              />
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 text-slate-700">
              <input
                type="checkbox"
                name="isAvailable"
                checked={form.isAvailable}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Available for booking
            </label>

            <button
              type="submit"
              className="w-full rounded-2xl bg-amber-500 px-6 py-4 text-lg font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              {editingId !== null ? "Update Mascot" : "Create Mascot"}
            </button>
          </form>

          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-slate-700">
                <Filter className="text-amber-500" size={20} />
                <span className="font-medium">Filter by availability</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {["All", "Available", "Booked Soon"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item as AvailabilityFilter)}
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

            {loading ? (
              <div className="rounded-[28px] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                Loading mascots...
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
                {filteredMascots.map((mascot) => (
                  <div
                    key={mascot.id}
                    className="overflow-hidden rounded-[28px] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
                  >
                    <div
                      className="h-72 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${
                          mascot.image ||
                          "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
                        }')`,
                      }}
                    />
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-3xl font-semibold text-slate-900">
                            {mascot.name}
                          </h3>
                          <p className="mt-2 text-lg text-slate-500">
                            {mascot.characterName}
                          </p>
                        </div>
                        <div
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            mascot.isAvailable
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {mascot.isAvailable ? "Available" : "Booked Soon"}
                        </div>
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-slate-600">
                        <p><span className="font-semibold">Theme:</span> {mascot.theme || "N/A"}</p>
                        <p><span className="font-semibold">Duration:</span> {mascot.durationMinutes} min</p>
                        <p><span className="font-semibold">Age Range:</span> {mascot.minAge ?? "-"} - {mascot.maxAge ?? "-"}</p>
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
                      </div>

                      <div className="mt-6 rounded-2xl bg-stone-100 px-4 py-3 text-sm text-slate-600">
                        {mascot.description || "No description available."}
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <Link
                          to="/booking"
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                        >
                          <CheckCircle2 size={18} />
                          Book
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleEdit(mascot)}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          <Pencil size={18} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(mascot.id)}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {!filteredMascots.length && (
                  <div className="rounded-[28px] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                    No mascots found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function InputField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <input
        {...props}
        className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-900 outline-none focus:border-amber-500"
      />
    </div>
  );
}