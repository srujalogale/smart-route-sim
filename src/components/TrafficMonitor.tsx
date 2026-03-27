import { useEffect, useState } from "react";

export default function TrafficMonitor() {
  const [count, setCount] = useState<number>(0);

  // Fetch vehicle count every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/count");
        const data = await res.json();
        setCount(data.vehicle_count);
      } catch (err) {
        console.error("Error fetching vehicle count:", err);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold text-gray-800">🚗 Live Traffic Monitor</h1>

      {/* Live Video Feed */}
      <img
        src="http://127.0.0.1:5000/video_feed"
        alt="Live Traffic"
        className="rounded-xl shadow-lg w-[640px] h-[360px] border"
      />

      {/* Vehicle Count */}
      <div className="text-lg font-semibold text-blue-700">
        Vehicle Count: <span className="text-3xl">{count}</span>
      </div>
    </div>
  );
}
