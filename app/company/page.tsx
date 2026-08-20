"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Search, Filter, Sparkles, ChevronDown, ChevronUp, BookOpen, ArrowUpRight, Award } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

interface Company {
  id: string;
  name: string;
  logo_text: string;
  color: string;
  open_roles: number;
  difficulty: string;
  focus_areas: string[];
}

interface Question {
  id: string;
  company: string;
  role: string;
  category: string;
  question: string;
  difficulty: string;
  frequency: string;
  sample_answer: string;
  recruiter_tips: string[];
}

export default function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [selectedCompany, selectedCategory]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch companies
      const compData = await api.getCompanies();
      if (compData && compData.companies) {
        setCompanies(compData.companies as any);
      }

      // Fetch questions
      const compParam = selectedCompany !== "all" ? selectedCompany : undefined;
      const qData = await api.getCompanyQuestions(compParam);
      if (qData && qData.questions) {
        setQuestions(qData.questions as any);
      }
    } catch (err) {
      console.error("Error fetching company prep data:", err);
      // Fallback offline dataset
      setCompanies([
        { id: "google", name: "Google", logo_text: "G", color: "from-red-500 to-yellow-500", open_roles: 42, difficulty: "Hard", focus_areas: ["Data Structures", "System Scale"] },
        { id: "amazon", name: "Amazon", logo_text: "A", color: "from-amber-500 to-orange-500", open_roles: 58, difficulty: "Medium-Hard", focus_areas: ["Leadership Principles"] },
        { id: "meta", name: "Meta", logo_text: "M", color: "from-blue-500 to-cyan-500", open_roles: 35, difficulty: "Hard", focus_areas: ["Product Architecture"] }
      ]);
      setQuestions([
        {
          id: "cq-1",
          company: "google",
          role: "Senior Software Engineer",
          category: "System Design",
          question: "Design Google Docs real-time collaborative editor infrastructure handling concurrent edits from thousands of users.",
          difficulty: "Hard",
          frequency: "High (Asked 120+ times)",
          sample_answer: "Use Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs) for concurrency resolution.",
          recruiter_tips: ["Focus on conflict resolution algorithms early in the interview."]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = questions.filter(q => 
    searchQuery === "" || 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] px-4 py-10 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col gap-8"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" /> Target Tech Giants
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Company-Specific <span className="text-gradient">Interview Prep</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Train with authentic questions asked in recent Google, Meta, Amazon, Microsoft, and Netflix technical rounds.
          </p>
        </div>

        {/* Company Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <button
            onClick={() => setSelectedCompany("all")}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedCompany === "all"
                ? "bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/40 text-white"
                : "glass-panel border-white/10 hover:border-white/20 text-gray-400"
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-lg mb-2">
              🌐
            </div>
            <div className="font-bold text-sm text-white">All Tech</div>
            <div className="text-xs text-gray-400">All Question Banks</div>
          </button>

          {companies.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setSelectedCompany(comp.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedCompany === comp.id
                  ? "bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/40 text-white"
                  : "glass-panel border-white/10 hover:border-white/20 text-gray-400"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${comp.color} flex items-center justify-center font-bold text-white text-base mb-2 shadow-lg`}>
                {comp.logo_text}
              </div>
              <div className="font-bold text-sm text-white">{comp.name}</div>
              <div className="text-xs text-gray-400">{comp.open_roles} Open Roles</div>
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 md:p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {["All", "System Design", "Leadership Principles", "Coding & Algorithms", "Frontend System Design"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search question keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Question Cards Grid */}
        <div className="space-y-4">
          {loading ? (
            <div className="glass-panel p-12 rounded-3xl text-center text-gray-400">
              Loading tailored company question banks...
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl text-center text-gray-400">
              No matching interview questions found. Try adjusting your search or category filter.
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const isExpanded = expandedId === q.id;
              return (
                <motion.div
                  key={q.id}
                  layout
                  className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-indigo-500/40 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase">
                        {q.company}
                      </span>
                      <span className="text-xs font-semibold text-gray-400">• {q.role}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                        {q.frequency}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        q.difficulty === "Hard" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                    "{q.question}"
                  </h3>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      {isExpanded ? "Hide Recruiter Tips & Answer" : "View Sample Answer & Recruiter Tips"}
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <Link
                      href="/arena"
                      className="px-4 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-500/20"
                    >
                      Practice in Arena <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 pt-6 border-t border-white/10 space-y-4"
                    >
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                          Suggested Sample Answer Strategy
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed font-sans">
                          {q.sample_answer}
                        </p>
                      </div>

                      {q.recruiter_tips && q.recruiter_tips.length > 0 && (
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> Inside Recruiter Tips
                          </div>
                          <ul className="text-xs text-gray-300 space-y-1">
                            {q.recruiter_tips.map((tip, idx) => (
                              <li key={idx}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}
