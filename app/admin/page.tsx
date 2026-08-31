"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavBar from "@/app/components/NavBar";

const ADMIN_EMAILS = ["simwanzageorge2000@gmail.com"];

type ClearanceStatus = "Submitted" | "Agent assigned" | "At customs" | "Released";

interface ClearanceForm {
  id: string;
  CargoType: string;
  Country: string;
  EntryPoint: string;
  Value: string;
  FullName: string;
  Phone: string;
  ADN?: string;
  Make?: string;
  Model?: string;
  Year?: string;
  Status: ClearanceStatus;
  createdAt?: string;
}

interface TransportForm {
  id: string;
  serviceType?: string;
  pickup: string;
  delivery: string;
  date: string;
  weight?: string;
  cargoType: string;
  units?: string;
  insurance?: string;
  name: string;
  phone: string;
  notes?: string;
  createdAt?: string;
}

interface Car {
  id: string;
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  acceleration: string;
  mpg: string;
  fuel: string;
  image: string[];
  badge: string;
}

const EMPTY_CAR = {
  make: "",
  model: "",
  year: "",
  price: "",
  mileage: "",
  acceleration: "",
  mpg: "",
  fuel: "",
  imageText: "",
  badge: "",
};

const STATUS_OPTIONS: ClearanceStatus[] = [
  "Submitted",
  "Agent assigned",
  "At customs",
  "Released",
];

const statusBadge: Record<ClearanceStatus, string> = {
  Submitted: "bg-[#5c6a7a]/10 text-[#5c6a7a]",
  "Agent assigned": "bg-[#5c6a7a]/10 text-[#5c6a7a]",
  "At customs": "bg-[#d98f2b]/10 text-[#a3690f]",
  Released: "bg-[#2955c8]/10 text-[#2955c8]",
};

const inputCls =
  "bg-white border border-[#e2ddd0] rounded-md px-3 py-2.5 text-sm text-[#10233d] placeholder:text-[#5c6a7a]/60 focus:outline-none focus:border-[#2955c8]/50";

function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [tab, setTab] = useState<"clearance" | "transport" | "cars">(
    "clearance",
  );
  const [clearanceForms, setClearanceForms] = useState<ClearanceForm[]>([]);
  const [transportForms, setTransportForms] = useState<TransportForm[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [carForm, setCarForm] = useState(EMPTY_CAR);
  const [addingCar, setAddingCar] = useState(false);
  const [carAdded, setCarAdded] = useState(false);

  const isAdmin =
    !!session?.user?.email && ADMIN_EMAILS.includes(session.user.email);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (status === "authenticated" && !isAdmin) {
      router.replace("/");
    }
  }, [status, isAdmin, router]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [clearanceRes, transportRes, carsRes] = await Promise.all([
        fetch("/api/admin/clearance"),
        fetch("/api/admin/transport"),
        fetch("/api/admin/cars"),
      ]);
      const clearanceData = await clearanceRes.json();
      const transportData = await transportRes.json();
      const carsData = await carsRes.json();
      if (!clearanceRes.ok) throw new Error(clearanceData.error);
      if (!transportRes.ok) throw new Error(transportData.error);
      if (!carsRes.ok) throw new Error(carsData.error);
      setClearanceForms(clearanceData.forms ?? []);
      setTransportForms(transportData.forms ?? []);
      setCars(carsData.cars ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load submissions.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated" && isAdmin) {
      Promise.resolve().then(() => loadData());
    }
  }, [status, isAdmin, loadData]);

  const handleStatusChange = async (id: string, newStatus: ClearanceStatus) => {
    setClearanceForms((prev) =>
      prev.map((f) => (f.id === id ? { ...f, Status: newStatus } : f)),
    );
    try {
      const res = await fetch(`/api/admin/clearance/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Status: newStatus }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setError("Failed to update status — try again.");
      loadData();
    }
  };

  const handleDeleteClearance = async (id: string) => {
    if (!confirm("Delete this clearance request permanently?")) return;
    setClearanceForms((prev) => prev.filter((f) => f.id !== id));
    try {
      const res = await fetch(`/api/admin/clearance/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
    } catch {
      setError("Failed to delete — try again.");
      loadData();
    }
  };

  const handleDeleteTransport = async (id: string) => {
    if (!confirm("Delete this transport booking permanently?")) return;
    setTransportForms((prev) => prev.filter((f) => f.id !== id));
    try {
      const res = await fetch(`/api/admin/transport/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
    } catch {
      setError("Failed to delete — try again.");
      loadData();
    }
  };

  const updateCarField = (field: keyof typeof EMPTY_CAR, value: string) =>
    setCarForm((prev) => ({ ...prev, [field]: value }));

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingCar(true);
    setError("");
    try {
      const image = carForm.imageText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch("/api/admin/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          make: carForm.make,
          model: carForm.model,
          year: carForm.year,
          price: carForm.price,
          mileage: carForm.mileage,
          acceleration: carForm.acceleration,
          mpg: carForm.mpg,
          fuel: carForm.fuel,
          image,
          badge: carForm.badge,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add car.");

      setCars((prev) => [
        ...prev,
        { id: data.id, ...carForm, image } as unknown as Car,
      ]);
      setCarForm(EMPTY_CAR);
      setCarAdded(true);
      setTimeout(() => setCarAdded(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add car.");
    } finally {
      setAddingCar(false);
    }
  };

  const handleDeleteCar = async (id: string) => {
    if (!confirm("Delete this car listing permanently?")) return;
    setCars((prev) => prev.filter((c) => c.id !== id));
    try {
      const res = await fetch(`/api/admin/cars/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setError("Failed to delete — try again.");
      loadData();
    }
  };

  if (status === "loading" || status === "unauthenticated" || !isAdmin) {
    return (
      <main className="bg-[#f7f4ee] min-h-screen text-[#10233d] font-sans">
        <NavBar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-8 h-8 border-2 border-[#2955c8]/25 border-t-[#2955c8] rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f4ee] text-[#10233d] min-h-screen font-sans">
      <NavBar />

      <section className="px-8 py-10 border-b border-[#e2ddd0]">
        <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-2">
          Admin
        </p>
        <h1 className="text-2xl font-medium mb-1">Submissions</h1>
        <p className="text-sm text-[#5c6a7a]">
          Clearance requests, transport bookings, and vehicle listings.
        </p>
      </section>

      <div className="flex border-b border-[#e2ddd0] px-8">
        {(["clearance", "transport", "cars"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-4 text-xs whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 capitalize ${
              tab === t
                ? "border-[#2955c8] text-[#2955c8]"
                : "border-transparent text-[#5c6a7a] hover:text-[#10233d]"
            }`}
          >
            {t}
            <span className="bg-[#2955c8]/10 text-[#2955c8] rounded-full px-2 py-0.5 text-[9px]">
              {t === "clearance"
                ? clearanceForms.length
                : t === "transport"
                  ? transportForms.length
                  : cars.length}
            </span>
          </button>
        ))}
      </div>

      <div className="px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
            ✕ {error}
          </div>
        )}

        {loading ? (
          <div className="text-sm text-[#5c6a7a] py-10 text-center">
            Loading...
          </div>
        ) : tab === "clearance" ? (
          clearanceForms.length === 0 ? (
            <div className="text-sm text-[#5c6a7a] py-10 text-center">
              No clearance requests yet.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {clearanceForms.map((f) => (
                <div
                  key={f.id}
                  className="bg-white border border-[#e2ddd0] rounded-xl p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-sm font-medium">
                        {f.FullName} · {f.CargoType}
                        {f.CargoType === "Motor vehicle" &&
                          f.Make &&
                          ` — ${f.Year} ${f.Make} ${f.Model}`}
                      </p>
                      <p className="text-[10px] text-[#5c6a7a] mt-0.5">
                        {formatDate(f.createdAt)} · {f.Country} →{" "}
                        {f.EntryPoint}
                      </p>
                    </div>
                    <select
                      value={f.Status}
                      onChange={(e) =>
                        handleStatusChange(
                          f.id,
                          e.target.value as ClearanceStatus,
                        )
                      }
                      className={`text-[10px] font-medium px-2.5 py-1.5 rounded-full border-0 cursor-pointer ${statusBadge[f.Status]}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-[#5c6a7a] mb-3">
                    <span>
                      Phone: <strong className="text-[#10233d]">{f.Phone}</strong>
                    </span>
                    <span>
                      Value: <strong className="text-[#10233d]">${f.Value}</strong>
                    </span>
                    {f.ADN && (
                      <span>
                        Notes: <strong className="text-[#10233d]">{f.ADN}</strong>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteClearance(f.id)}
                    className="text-[11px] text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )
        ) : tab === "transport" ? (
          transportForms.length === 0 ? (
            <div className="text-sm text-[#5c6a7a] py-10 text-center">
              No transport bookings yet.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {transportForms.map((f) => (
                <div
                  key={f.id}
                  className="bg-white border border-[#e2ddd0] rounded-xl p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-sm font-medium">
                        {f.name} · {f.cargoType}
                      </p>
                      <p className="text-[10px] text-[#5c6a7a] mt-0.5">
                        {formatDate(f.createdAt)} · {f.pickup} → {f.delivery}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#5c6a7a]/10 text-[#5c6a7a]">
                      {f.serviceType || "—"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-[#5c6a7a] mb-3">
                    <span>
                      Phone: <strong className="text-[#10233d]">{f.phone}</strong>
                    </span>
                    <span>
                      Pickup date:{" "}
                      <strong className="text-[#10233d]">{f.date}</strong>
                    </span>
                    {f.weight && (
                      <span>
                        Weight:{" "}
                        <strong className="text-[#10233d]">{f.weight} kg</strong>
                      </span>
                    )}
                    {f.units && (
                      <span>
                        Units:{" "}
                        <strong className="text-[#10233d]">{f.units}</strong>
                      </span>
                    )}
                    {f.insurance && (
                      <span>
                        Insurance:{" "}
                        <strong className="text-[#10233d]">{f.insurance}</strong>
                      </span>
                    )}
                  </div>
                  {f.notes && (
                    <p className="text-[11px] text-[#5c6a7a] mb-3">
                      Notes: <span className="text-[#10233d]">{f.notes}</span>
                    </p>
                  )}
                  <button
                    onClick={() => handleDeleteTransport(f.id)}
                    className="text-[11px] text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col gap-8">
            {/* Add car form */}
            <div className="bg-white border border-[#e2ddd0] rounded-xl p-6 max-w-2xl">
              <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-1">
                New listing
              </p>
              <h2 className="text-lg font-medium mb-5">Add a car</h2>

              {carAdded && (
                <div className="mb-5 bg-[#2955c8]/10 border border-[#2955c8]/30 rounded-lg px-4 py-3 text-sm text-[#2955c8]">
                  ✓ Car added to stock.
                </div>
              )}

              <form onSubmit={handleAddCar} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <input
                    placeholder="Make"
                    value={carForm.make}
                    onChange={(e) => updateCarField("make", e.target.value)}
                    required
                    className={inputCls}
                  />
                  <input
                    placeholder="Model"
                    value={carForm.model}
                    onChange={(e) => updateCarField("model", e.target.value)}
                    required
                    className={inputCls}
                  />
                  <input
                    placeholder="Year"
                    value={carForm.year}
                    onChange={(e) => updateCarField("year", e.target.value)}
                    required
                    className={inputCls}
                  />
                  <input
                    placeholder="Price"
                    value={carForm.price}
                    onChange={(e) => updateCarField("price", e.target.value)}
                    required
                    className={inputCls}
                  />
                  <input
                    placeholder="Mileage"
                    value={carForm.mileage}
                    onChange={(e) => updateCarField("mileage", e.target.value)}
                    className={inputCls}
                  />
                  <input
                    placeholder="0–60 (e.g. 6.2s)"
                    value={carForm.acceleration}
                    onChange={(e) =>
                      updateCarField("acceleration", e.target.value)
                    }
                    className={inputCls}
                  />
                  <input
                    placeholder="MPG"
                    value={carForm.mpg}
                    onChange={(e) => updateCarField("mpg", e.target.value)}
                    className={inputCls}
                  />
                  <select
                    value={carForm.fuel}
                    onChange={(e) => updateCarField("fuel", e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Fuel</option>
                    <option>Petrol</option>
                    <option>Diesel</option>
                  </select>
                  <input
                    placeholder="Badge (e.g. New, Certified)"
                    value={carForm.badge}
                    onChange={(e) => updateCarField("badge", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <textarea
                  placeholder="Image URLs, one per line"
                  rows={3}
                  value={carForm.imageText}
                  onChange={(e) => updateCarField("imageText", e.target.value)}
                  className={`${inputCls} resize-none`}
                />
                <button
                  type="submit"
                  disabled={addingCar}
                  className="bg-[#2955c8] text-white text-sm font-medium py-2.5 rounded-md hover:bg-[#1f45a8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-start px-6"
                >
                  {addingCar ? "Adding…" : "Add car"}
                </button>
              </form>
            </div>

            {/* Existing cars list */}
            <div>
              <p className="text-[11px] tracking-[2px] text-[#2955c8] uppercase mb-3">
                Current stock ({cars.length})
              </p>
              {cars.length === 0 ? (
                <div className="text-sm text-[#5c6a7a] py-6 text-center bg-white border border-[#e2ddd0] rounded-xl">
                  No cars listed yet.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {cars.map((c) => (
                    <div
                      key={c.id}
                      className="bg-white border border-[#e2ddd0] rounded-xl p-4 flex items-start justify-between gap-3"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {c.year} {c.make} {c.model}
                        </p>
                        <p className="text-[11px] text-[#5c6a7a] mt-0.5">
                          ${c.price} · {c.fuel || "—"} · {c.image?.length ?? 0}{" "}
                          image(s)
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteCar(c.id)}
                        className="text-[11px] text-red-600 hover:underline shrink-0"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
