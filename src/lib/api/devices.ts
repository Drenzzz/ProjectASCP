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
    const data = await fetchJSON("/devices.json", rawDevicesResponseSchema);
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

    const buildData = await fetchJSON(
        `/updater/${codename}.json`,
        rawUpdaterResponseSchema,
    );
    const firstBuild = buildData?.response?.[0];
    const latestBuild = firstBuild ? rawToBuildEntry(firstBuild) : null;

    return {
        ...device,
        latestBuild,
        changelogUrl: `${API_BASE}/full_changelogs/${codename}.md`,
        instructionUrl: `${API_BASE}/instructions/${codename}.md`,
    };
}
