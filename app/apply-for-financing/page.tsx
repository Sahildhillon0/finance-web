// Modern Apply for Financing Page
import AdminContactCard from "../../components/AdminContactCard";
import QueryForm from "../../components/QueryForm";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ApplyForFinancing() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#181d22] via-[#232f3e] to-[#1e293b] flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col gap-8 border border-white/10">
        <Link href="/" className="inline-flex items-center gap-2 self-start mb-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 transition font-semibold text-sm shadow-md">
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-100 drop-shadow mb-2">Apply for Financing</h1>
        <p className="text-center text-blue-200 mb-6">Contact our admin directly or send us your query below. We'll get back to you as soon as possible!</p>
        <div className="mb-4"><AdminContactCard /></div>
        <div className="border-t border-white/10 pt-8 mt-4">
          <QueryForm />
        </div>
      </div>
    </section>
  )
}
