"use client";

import { SpeechTelemetry as ISpeechTelemetry } from "@/types";
import { Mic, Gauge, PauseCircle, AlertCircle, Sparkles } from "lucide-react";

interface SpeechTelemetryProps {
  telemetry: ISpeechTelemetry;
  isRecording: boolean;
}

export function SpeechTelemetry({ telemetry, isRecording }: SpeechTelemetryProps) {
  return (
    <div className="backdrop-blur-xl bg-slate-950/80 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Mic className="w-4 h-4 text-purple-400" /> Speech Analysis Telemetry
        </div>
        <div className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-bold">
          LIVE AUDIO DSP
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Speed (WPM) */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Speech Speed</span>
            <Gauge className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="my-2">
            <span className="text-2xl font-extrabold text-white">{telemetry.speedWpm}</span>
            <span className="text-xs text-slate-400 font-medium ml-1">WPM</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">Optimal (130 - 150 target)</div>
        </div>

        {/* Pauses */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Natural Pauses</span>
            <PauseCircle className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="my-2">
            <span className="text-2xl font-extrabold text-white">{telemetry.pauseCount}</span>
            <span className="text-xs text-slate-400 font-medium ml-1">pauses ({telemetry.pauseDurationSec}s)</span>
          </div>
          <div className="text-[11px] text-slate-400">Paced transition pauses</div>
        </div>

        {/* Fillers */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Filler Words</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-2">
            <span className="text-2xl font-extrabold text-amber-300">{telemetry.totalFillerCount}</span>
            <span className="text-xs text-slate-400 font-medium ml-1">words flagged</span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {telemetry.fillerWords.map((f, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] border border-amber-500/20">
                "{f.word}": {f.count}
              </span>
            ))}
          </div>
        </div>

        {/* Fluency Score */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Fluency Score</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </div>
          <div className="my-2">
            <span className="text-2xl font-extrabold text-white">{telemetry.fluencyScore}</span>
            <span className="text-xs text-slate-400 font-medium ml-1">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: `${telemetry.fluencyScore}%` }} />
          </div>
        </div>

      </div>
    </div>
  );
}
