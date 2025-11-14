import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.timer.app",
  appName: "Simple Timer",
  // For Next.js we export a static site to `out` (via `next export`).
  // Capacitor expects a static entrypoint (index.html) in webDir.
  webDir: "out",
  plugins: {
    Preferences: {
      group: "timer_app",
    },
  },
};

export default config;
