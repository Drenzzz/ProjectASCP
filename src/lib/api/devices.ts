import { API_BASE, fetchJSON } from "./client";
import {
    rawDevicesResponseSchema,
    rawToDevice,
    type Device,
    type DeviceWithBuild,
} from "@/lib/schema/device";
import {
    rawUpdaterResponseSchema,
    rawToBuildEntry,
} from "@/lib/schema/updater";

let devicesCache: Map<string, Device> | null = null;

export async function getAllDevices(): Promise<Device[]> {
    const data = await fetchJSON("/device/devices.json", rawDevicesResponseSchema);
    if (!data) return [];
    return data.devices.map(rawToDevice);
}

async function getDevicesMap(): Promise<Map<string, Device>> {
    if (devicesCache) return devicesCache;
    const devices = await getAllDevices();
    const map = new Map<string, Device>();
    for (const device of devices) {
        map.set(device.codename.toLowerCase(), device);
    }
    devicesCache = map;
    return map;
}

export function resetDevicesCache(): void {
    devicesCache = null;
}

export async function getDeviceByCodename(codename: string): Promise<DeviceWithBuild | null> {
    const map = await getDevicesMap();
    const device = map.get(codename.toLowerCase());
    if (!device) return null;

    const [fullBuildData, incrementalBuildData] = await Promise.all([
        fetchJSON(`/device/${codename}/updater/full.json`, rawUpdaterResponseSchema),
        fetchJSON(`/device/${codename}/updater/incremental.json`, rawUpdaterResponseSchema),
    ]);

    const latestBuild = fullBuildData?.response?.[0] ? rawToBuildEntry(fullBuildData.response[0]) : null;
    const incrementalBuild = incrementalBuildData?.response?.[0] ? rawToBuildEntry(incrementalBuildData.response[0]) : null;

    return {
        ...device,
        latestBuild,
        incrementalBuild,
        downloadCount: 0,
        changelogUrl: `${API_BASE}/device/${codename}/changelogs/his_changelog.md`,
        instructionUrl: `${API_BASE}/device/${codename}/instruction.md`,
    };
}
