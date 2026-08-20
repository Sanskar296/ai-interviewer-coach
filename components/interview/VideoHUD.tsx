"use client";

import { VideoTelemetry } from "@/types";
import { Camera, Eye, Smile, Activity, UserCheck, CheckCircle2, AlertTriangle } from "lucide-react";

interface VideoHUDProps {
  telemetry: VideoTelemetry;
  isRecording: boolean;
}

export function VideoHUD({ telemetry, isRecording }: VideoHUDProps) {
  return (
    <div className="backdrop-blur-xl bg-slate-950/80 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      
      {/* Video Feed Simulation Container */}
      <div className="relative w-full aspect-video rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center mb-4">
        
        {/* Background Grid / Camera Simulation */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent pointer-events-none" />

        {/* Live Recording Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 backdrop-blur-md">
          <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? "bg-red-500 animate-ping" : "bg-slate-500"}`} />
          <span className="text-[11px] font-bold text-slate-200">
            {isRecording ? "LIVE AI VIDEO FEED" : "CAMERA READY"}
          </span>
        </div>

        {/* Eye Tracking Box Overlay Simulation */}
        <div className="w-48 h-48 rounded-full border-2 border-dashed border-indigo-500/40 animate-pulse flex items-center justify-center relative">
          <div className="w-32 h-32 rounded-full border border-indigo-400/30 flex items-center justify-center">
            <Camera className="w-10 h-10 text-indigo-400/50" />
          </div>
          {/* Facial Landmark Points */}
          <div className="absolute top-12 left-14 w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400" />
          <div className="absolute top-12 right-14 w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400" />
          <div className="absolute bottom-14 w-4 h-1.5 rounded-full bg-pink-400 shadow-md shadow-pink-400" />
        </div>

        {/* Status Indicator */}
        <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full bg-slate-950/90 border border-slate-800 text-[10px] font-semibold text-emerald-400 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5" /> Face Detected
        </div>
      </div>

      {/* Video Analysis Metrics HUD */}
      <div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-cyan-400" /> Video Analysis Telemetry
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          {/* Eye Contact */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] font-semibold text-slate-400 flex items-center justify-between">
              <span>Eye Contact</span>
              <Eye className="w-3 h-3 text-indigo-400" />
            </div>
            <div className="text-lg font-extrabold text-white mt-1">{telemetry.eyeContactPct}%</div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${telemetry.eyeContactPct}%` }} />
            </div>
          </div>

          {/* Head Pose */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] font-semibold text-slate-400">Head Pose</div>
            <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {telemetry.headPoseStability}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Optimal Orientation</div>
          </div>

          {/* Face Presence */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] font-semibold text-slate-400">Face Presence</div>
            <div className="text-sm font-bold text-cyan-400 mt-1">100% Active</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Center Frame</div>
          </div>

          {/* Expression */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] font-semibold text-slate-400 flex items-center justify-between">
              <span>Expression</span>
              <Smile className="w-3 h-3 text-pink-400" />
            </div>
            <div className="text-sm font-bold text-pink-300 mt-1">{telemetry.expression}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Positive Tone</div>
          </div>

        </div>
      </div>
    </div>
  );
}
