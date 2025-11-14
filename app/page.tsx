"use client";

import React, { useState } from "react";
import { TimerDisplay } from "./components/TimerDisplay";
import { TimerControls } from "./components/TimerControls";
import { HistoryList } from "./components/HistoryList";
import { useTimer } from "./hooks/useTimer";

export default function TimerApp() {
  const { time, isRunning, history, start, pause, reset, formatTime } =
    useTimer();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Simple Timer
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Quản lý thời gian đơn giản và hiệu quả
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
              <button
                onClick={() => setShowHistory(false)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  !showHistory
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}>
                Timer
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  showHistory
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}>
                Lịch sử ({history.length})
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            {!showHistory ? (
              /* Timer Screen */
              <div className="text-center space-y-8">
                {/* Status Indicator */}
                <div className="flex justify-center items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      isRunning ? "bg-green-500 animate-pulse" : "bg-gray-300"
                    }`}
                  />
                  <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                    {isRunning ? "Đang chạy" : "Đã dừng"}
                  </span>
                </div>

                {/* Timer Display */}
                <TimerDisplay
                  time={formatTime(time)}
                  className="text-gray-800 dark:text-white"
                />

                {/* Current Time Info */}
                <div className="text-center space-y-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    Thời gian hiện tại: {time} giây
                  </p>
                </div>

                {/* Controls */}
                <div className="flex justify-center">
                  <TimerControls
                    isRunning={isRunning}
                    onStart={start}
                    onPause={pause}
                    onReset={reset}
                  />
                </div>

                {/* Quick Stats */}
                {history.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lần đặt lại gần nhất
                      </p>
                      <p className="font-mono font-semibold text-lg text-blue-600 dark:text-blue-400">
                        {formatTime(history[history.length - 1].timeValue)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tổng số lần đặt lại
                      </p>
                      <p className="font-semibold text-lg text-green-600 dark:text-green-400">
                        {history.length}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Thời gian dài nhất
                      </p>
                      <p className="font-mono font-semibold text-lg text-purple-600 dark:text-purple-400">
                        {formatTime(
                          Math.max(...history.map((h) => h.timeValue))
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* History Screen */
              <HistoryList history={history} formatTime={formatTime} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
