// Vibrant Apply for Finance Page
import AdminContactCard from "../../components/AdminContactCard";
import QueryForm from "../../components/QueryForm";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AppyForFinance() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fffbe7] via-[#ffe6e6] to-[#e3f6fc] flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-3xl p-8 md:p-12 flex flex-col gap-8 border-4 border-pink-200">
        <Link href="/" className="inline-flex items-center gap-2 self-start mb-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 text-gray-900 hover:from-pink-600 hover:to-cyan-500 transition font-bold text-sm shadow-lg">
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-pink-600 drop-shadow mb-2 tracking-tight">Appy for Finance</h1>
        <p className="text-center text-cyan-600 mb-6 font-medium">Contact our admin directly or send us your query below. We'll get back to you as soon as possible!</p>
        <div className="mb-4"><AdminContactCard /></div>
        <div className="border-t-4 border-yellow-200 pt-8 mt-4">
          <QueryForm />
        </div>
      </div>
    </section>
  )
}
