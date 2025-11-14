import { useState, useEffect, useRef, useCallback } from "react";
import { Preferences } from "@capacitor/preferences";

interface TimerState {
  time: number;
  isRunning: boolean;
}

interface HistoryItem {
  timestamp: number;
  timeValue: number;
}

const TIMER_STORAGE_KEY = "timer_state";
const HISTORY_STORAGE_KEY = "timer_history";

export function useTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load timer state from storage
  useEffect(() => {
    const loadTimerState = async () => {
      try {
        const { value } = await Preferences.get({ key: TIMER_STORAGE_KEY });
        if (value) {
          const savedState: TimerState = JSON.parse(value);
          setTime(savedState.time);
          setIsRunning(savedState.isRunning);
        }
      } catch (error) {
        console.error("Error loading timer state:", error);
      }
    };

    const loadHistory = async () => {
      try {
        const { value } = await Preferences.get({ key: HISTORY_STORAGE_KEY });
        if (value) {
          const savedHistory: HistoryItem[] = JSON.parse(value);
          setHistory(savedHistory);
        }
      } catch (error) {
        console.error("Error loading history:", error);
      }
    };

    loadTimerState();
    loadHistory();
  }, []);

  // Save timer state to storage
  const saveTimerState = useCallback(
    async (newTime: number, newIsRunning: boolean) => {
      try {
        const state: TimerState = { time: newTime, isRunning: newIsRunning };
        await Preferences.set({
          key: TIMER_STORAGE_KEY,
          value: JSON.stringify(state),
        });
      } catch (error) {
        console.error("Error saving timer state:", error);
      }
    },
    []
  );

  // Save history to storage
  const saveHistory = useCallback(async (newHistory: HistoryItem[]) => {
    try {
      await Preferences.set({
        key: HISTORY_STORAGE_KEY,
        value: JSON.stringify(newHistory),
      });
    } catch (error) {
      console.error("Error saving history:", error);
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          saveTimerState(newTime, true);
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, saveTimerState]);

  const start = useCallback(() => {
    setIsRunning(true);
    saveTimerState(time, true);
  }, [time, saveTimerState]);

  const pause = useCallback(() => {
    setIsRunning(false);
    saveTimerState(time, false);
  }, [time, saveTimerState]);

  const reset = useCallback(() => {
    setIsRunning(false);
    const historyItem: HistoryItem = {
      timestamp: Date.now(),
      timeValue: time,
    };

    const newHistory = [...history, historyItem].slice(-20); // Keep last 20 items
    setHistory(newHistory);
    saveHistory(newHistory);

    setTime(0);
    saveTimerState(0, false);
  }, [time, history, saveTimerState, saveHistory]);

  const formatTime = useCallback((seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  return {
    time,
    isRunning,
    history,
    start,
    pause,
    reset,
    formatTime,
  };
}
