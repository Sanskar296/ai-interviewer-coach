"use client";

import { useState } from "react";
import { User, Briefcase, Building2, BookOpen, Save, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Sanskar Sharma");
  const [email, setEmail] = useState("sanskar@example.com");
  const [targetRole, setTargetRole] = useState("Senior Full Stack Engineer");
  const [targetCompany, setTargetCompany] = useState("Google");
  const [selectedCourse, setSelectedCourse] = useState("System Design Mastery");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Candidate Profile <span className="text-gradient">Settings</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Manage your setup parameters for question generation & interview reports
        </p>
      </div>

      <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-indigo-400" /> Candidate Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-indigo-400" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-cyan-400" /> Target Job Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-purple-400" /> Target Company
              </label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-pink-400" /> Selected Course
              </label>
              <input
                type="text"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {saved ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Profile Parameters Updated Successfully!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all text-xs flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Candidate Parameters
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
