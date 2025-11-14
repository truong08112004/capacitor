"use client";

import React from "react";

interface HistoryItem {
  timestamp: number;
  timeValue: number;
}

interface HistoryListProps {
  history: HistoryItem[];
  formatTime: (seconds: number) => string;
}

export function HistoryList({ history, formatTime }: HistoryListProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (history.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p className="text-lg">Chưa có lịch sử nào</p>
        <p className="text-sm mt-2">Các lần đặt lại timer sẽ xuất hiện ở đây</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold mb-4 text-center">
        📋 Lịch sử đặt lại
      </h3>
      <div className="max-h-96 overflow-y-auto">
        {history
          .slice()
          .reverse()
          .map((item, index) => (
            <div
              key={item.timestamp}
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex flex-col">
                <span className="font-mono text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {formatTime(item.timeValue)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(item.timestamp)}
                </span>
              </div>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                #{history.length - index}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
