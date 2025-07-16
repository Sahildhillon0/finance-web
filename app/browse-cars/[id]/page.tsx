"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CarDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/cars/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Car not found");
        return res.json();
      })
      .then(data => {
        setCar(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || "Failed to load car");
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 md:px-10 lg:px-40">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mt-6">
          <a
            href="/"
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
          >
            <Home className="w-5 h-5 mr-1" /> Back to Home
          </a>
          {loading ? (
            <div className="text-center py-12 text-lg text-muted-foreground">Loading...</div>
          ) : error ? (
            <div className="text-center py-12 text-lg text-red-500">{error}</div>
          ) : car ? (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 flex flex-col gap-3">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
                <p className="text-gray-700 mb-2">{car.description}</p>
                <div className="flex flex-wrap gap-3 mb-2">
                  <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">{car.availability}</span>
                  <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-xs font-bold border border-gray-300">${car.price?.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500 mb-2">Added: {car.createdAt ? new Date(car.createdAt).toLocaleDateString() : ''}</div>
              </div>
              <div className="flex-1 flex flex-col gap-3 items-center">
                {car.images && car.images.length > 0 ? (
                  <div className="w-full flex flex-wrap gap-2 justify-center">
                    {car.images.map((img: string, idx: number) => (
                      <div key={idx} className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
                        <Image src={img} alt={`${car.name} photo ${idx+1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-40 flex items-center justify-center text-gray-400 bg-gray-100 rounded-lg">No Images</div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
