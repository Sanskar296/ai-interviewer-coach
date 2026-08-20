"use client";

import { WeakArea } from "@/types";
import { ShieldAlert, AlertTriangle, ArrowRight, Zap } from "lucide-react";

interface WeakAreasRadarProps {
  weakAreas: WeakArea[];
}

export function WeakAreasRadar({ weakAreas }: WeakAreasRadarProps) {
  return (
    <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" /> Weak Areas & Gaps Identified
          </h3>
          <p className="text-xs text-slate-400">Speech telemetry, video tracking & technical depth flags</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          {weakAreas.length} Areas Flagged
        </span>
      </div>

      <div className="space-y-4">
        {weakAreas.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs mt-0.5 shrink-0 ${
                item.severity === 'High'
                  ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                  : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
              }`}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{item.area}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.impactDescription}</p>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="text-[11px] font-bold text-slate-300">{item.metricObserved}</div>
              <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded inline-block mt-1 ${
                item.severity === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {item.severity} Priority
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
