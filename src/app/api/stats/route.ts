import { NextResponse } from "next/server";
import * as si from "systeminformation";

export async function GET() {
    try {
        const [cpuLoad, temp, mem, disk, network, osInfo] = await Promise.all([
            si.currentLoad(),
            si.cpuTemperature(),
            si.mem(),
            si.fsSize(),
            si.networkStats(),
            si.osInfo(),
        ]);

        return NextResponse.json({
            cpu: {
                load: cpuLoad.currentLoad.toFixed(2),
                temp: temp.main,
            },
            memory: {
                total: (mem.total / 1024 / 1024 / 1024).toFixed(2),
                used: (mem.used / 1024 / 1024 / 1024).toFixed(2),
                usagePercent: ((mem.used / mem.total) * 100).toFixed(2),
            },
            disk: {
                total: (disk[0].size / 1024 / 1024 / 1024).toFixed(2),
                used: (disk[0].used / 1024 / 1024 / 1024).toFixed(2),
                usagePercent: ((disk[0].used / disk[0].size) * 100).toFixed(2),
            },
            network: {
                interface: network[0].iface,
                rx: (network[0].rx_bytes / 1024 / 1024).toFixed(2),
                tx: (network[0].tx_bytes / 1024 / 1024).toFixed(2),
            },
            system: {
                os: osInfo.distro,
                uptime: si.time().uptime,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: `Ошибка получения данных, ${error}` }, { status: 500 });
    }
}
