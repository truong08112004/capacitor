"use client";

import React from "react";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
      <button
        onClick={isRunning ? onPause : onStart}
        className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 transform active:scale-95 ${
          isRunning
            ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-200"
            : "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-green-200"
        }`}>
        {isRunning ? "Tạm dừng" : "Bắt đầu"}
      </button>

      <button
        onClick={onReset}
        className="flex-1 py-4 px-8 rounded-xl font-semibold text-lg bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-200 transition-all duration-200 transform active:scale-95">
        Đặt lại
      </button>
    </div>
  );
}
