"use client";
import { useState, useEffect } from "react";
import Speedometer from "./components/ui/gauge";

type Stats = {
  cpu: { load: number; temp: number };
  memory: { usagePercent: number };
  disk: { usagePercent: number };
  network: { rx: number; tx: number };
  system: {os: string; uptime: number; bios: string; platform: string}
};

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) return <p className="text-white">Загрузка...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Мониторинг Raspberry Pi</h1>

      <div className="flex flex-row">
        <Speedometer value={stats.cpu.load ? stats.cpu.load : 10} label="CPU Load" color="#f59e0b" />
        <Speedometer value={stats.memory.usagePercent} label="RAM Usage" color="#10b981" />
        <Speedometer value={stats.disk.usagePercent} label="Disk Usage" color="#ef4444" />
        <Speedometer value={Math.min(stats.network.rx / 10, 100)} label="Network (RX)" color="#3b82f6" />
      </div>

      <div className="mt-6 text-center">
        <p>Температура CPU: {stats.cpu.temp}°C</p>
        <p>Загрузка сети (RX): {stats.network.rx} MB</p>
        <p>Отправлено (TX): {stats.network.tx} MB</p>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-xl font-bold mb-6">Информация о системе</h2>
        <div>
          <p>Система: {stats.system.os}</p>
          <p>Информация о BIOS: {stats.system.bios}</p>
          <p>Платформа: {stats.system.platform}</p>
          <p>Время запуска: {stats.system.uptime}</p>
        </div>

      </div>
    </div>
  );
}
