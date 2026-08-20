"use client";

import { useState, useEffect, useRef } from 'react';
import { SpeechTelemetry, VideoTelemetry } from '@/types';

export function useSpeechVideoAnalysis(isRecording: boolean) {
  const [speechMetrics, setSpeechMetrics] = useState<SpeechTelemetry>({
    speedWpm: 135,
    pauseCount: 2,
    pauseDurationSec: 1.4,
    fillerWords: [
      { word: 'um', count: 2 },
      { word: 'like', count: 1 },
    ],
    totalFillerCount: 3,
    fluencyScore: 88,
  });

  const [videoMetrics, setVideoMetrics] = useState<VideoTelemetry>({
    eyeContactPct: 92,
    headPoseStability: 'Stable',
    facePresence: true,
    expression: 'Confident',
  });

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        // Dynamic simulated telemetry adjustments during active recording
        setSpeechMetrics((prev) => {
          const deltaWpm = Math.floor(Math.random() * 7) - 3;
          const newWpm = Math.min(Math.max(prev.speedWpm + deltaWpm, 110), 165);
          return {
            ...prev,
            speedWpm: newWpm,
            fluencyScore: newWpm >= 125 && newWpm <= 150 ? 94 : 85,
          };
        });

        setVideoMetrics((prev) => {
          const randomEye = Math.min(Math.max(prev.eyeContactPct + (Math.floor(Math.random() * 5) - 2), 80), 98);
          const expressions: VideoTelemetry['expression'][] = ['Confident', 'Engaged', 'Neutral'];
          const expr = expressions[Math.floor(Math.random() * expressions.length)];
          return {
            ...prev,
            eyeContactPct: randomEye,
            expression: expr,
          };
        });
      }, 1500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  return {
    speechMetrics,
    videoMetrics,
  };
}
