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
    <div className="relative min-h-screen flex flex-col bg-background transition-colors duration-300">
      {/* Modern layered background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-gray-300 opacity-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300" />
        <div className="absolute top-[-8rem] left-[-8rem] w-[32rem] h-[32rem] bg-white opacity-30 rounded-full blur-3xl dark:bg-gray-800 dark:opacity-40" />
        <div className="absolute bottom-[-10rem] right-[-10rem] w-[36rem] h-[36rem] bg-gray-200 opacity-40 rounded-full blur-3xl dark:bg-gray-900 dark:opacity-50" />
        <div className="absolute top-1/3 left-1/2 w-[28rem] h-[16rem] bg-gray-100 opacity-20 rounded-full blur-2xl dark:bg-gray-700 dark:opacity-30" />
        <div className="absolute bottom-0 left-1/4 w-[18rem] h-[10rem] bg-white opacity-20 rounded-full blur-2xl dark:bg-gray-800 dark:opacity-30" />
      </div>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 md:px-10 lg:px-40">
        <div className="w-full max-w-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-800 mt-10 ring-1 ring-black/5 dark:ring-white/10">
          <a
            href="/browse-cars"
            className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/70 dark:bg-gray-800/80 backdrop-blur border border-gray-300 dark:border-gray-700 shadow hover:bg-gray-100 dark:hover:bg-gray-900 transition text-gray-800 dark:text-gray-200 font-semibold text-base"
          >
            <Home className="w-5 h-5 mr-1" /> Back to Home
          </a>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 w-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid dark:border-blue-400 dark:border-t-white border-t-white/80 border-b-transparent"></div>
              <div className="mt-6 text-lg text-gray-700 dark:text-gray-200 font-semibold">Loading car...</div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-lg text-red-500">{error}</div>
          ) : car ? (
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1 flex flex-col gap-3">
                <h1 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 dark:from-blue-300 dark:via-purple-200 dark:to-pink-300 drop-shadow-lg select-none">{car.name}</h1>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">{car.description}</p>
                <div className="flex flex-wrap gap-3 mb-2">
                  <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200 dark:border-blue-700/60">{car.availability}</span>
                  <span className="bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full text-xs font-bold border border-gray-300/60 dark:border-gray-700/60">${car.price?.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Added: {car.createdAt ? new Date(car.createdAt).toLocaleDateString() : ''}</div>
              </div>
              <div className="flex-1 flex flex-col gap-3 items-center">
                {car.images && car.images.length > 0 ? (
                  <div className="w-full flex flex-wrap gap-2 justify-center">
                    {car.images.map((img: string, idx: number) => (
                      <div key={idx} className="relative w-40 h-40 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                        <Image src={img} alt={`${car.name} photo ${idx+1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-40 flex items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-900 rounded-2xl">No Images</div>
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
