import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl ${className}`}>
      {children}
    </div>
  );
}
