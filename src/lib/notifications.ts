// Push notification helper   wraps the native browser Notification API
// Works in-browser and when installed as a PWA/Capacitor app

export type NotifPermission = "granted" | "denied" | "default" | "unsupported";

export async function requestNotificationPermission(): Promise<NotifPermission> {
    if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
    if (Notification.permission === "granted") return "granted";
    const result = await Notification.requestPermission();
    return result;
}

export function getNotificationPermission(): NotifPermission {
    if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
    return Notification.permission as NotifPermission;
}

export function sendInstantNotification(title: string, body: string, icon = "/icons/icon-192.png") {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    new Notification(title, { body, icon, badge: icon });
}

// --- Scheduled Notifications via localStorage ---

export interface ScheduledDose {
    id: string;             // unique id
    peptideName: string;
    doseMcg: number;
    scheduledTime: string;  // ISO string
    sent: boolean;
}

const SCHEDULED_KEY = "PeptiDex-scheduled-doses";

export function getScheduledDoses(): ScheduledDose[] {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(SCHEDULED_KEY) || "[]"); } catch { return []; }
}

export function saveScheduledDoses(doses: ScheduledDose[]) {
    localStorage.setItem(SCHEDULED_KEY, JSON.stringify(doses));
}

export function scheduleDose(peptideName: string, doseMcg: number, scheduledTime: Date): string {
    const id = `dose-${Date.now()}`;
    const doses = getScheduledDoses();
    doses.push({ id, peptideName, doseMcg, scheduledTime: scheduledTime.toISOString(), sent: false });
    saveScheduledDoses(doses);
    return id;
}

export function clearScheduledDose(id: string) {
    const doses = getScheduledDoses().filter(d => d.id !== id);
    saveScheduledDoses(doses);
}

// Call this periodically (e.g., on app focus) to fire pending notifications
export function checkAndFireDueNotifications() {
    if (typeof window === "undefined") return;
    if (Notification.permission !== "granted") return;
    const now = new Date();
    const doses = getScheduledDoses();
    const updated = doses.map(dose => {
        if (!dose.sent && new Date(dose.scheduledTime) <= now) {
            sendInstantNotification(
                `?? Time for your ${dose.peptideName}`,
                `Scheduled dose: ${dose.doseMcg}mcg   PeptiDex Protocol Tracker`
            );
            return { ...dose, sent: true };
        }
        return dose;
    });
    saveScheduledDoses(updated);
}
