"use client";

import React from "react";

interface TimerDisplayProps {
  time: string;
  className?: string;
}

export function TimerDisplay({ time, className = "" }: TimerDisplayProps) {
  return (
    <div
      className={`font-mono text-6xl md:text-8xl font-bold text-center ${className}`}>
      {time}
    </div>
  );
}
