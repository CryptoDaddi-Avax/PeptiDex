import { CyclePeptideResult } from "./cycle-engine";

/**
 * Returns YYYYMMDDTHHMMSSZ for UTC datestamps (required for DTSTAMP)
 */
function formatIcsUtc(date: Date): string {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/**
 * Returns YYYYMMDDTHHMMSS (Floating Time)
 * This ensures "8:00 AM" remains 8:00 AM regardless of what timezone the user travels to.
 */
function formatIcsFloatingTime(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function generateUID(): string {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36) + "@peptidex.app";
}

/**
 * Compiles a fully RFC 5545 compliant iCalendar string based on the user's cycle parameters.
 */
export function generateCycleIcs(results: CyclePeptideResult[], startDate: Date = new Date()): string {
    const timestamp = formatIcsUtc(new Date());
    let icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//PeptiDex//Cycle Planner V1//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH"
    ];

    results.forEach(result => {
        let rrule = "";
        const freq = result.injectionsPerWeek;
        const totalWeeks = result.cycleWeeks;

        // Map frequency to iCal RRULE
        if (freq >= 7) {
            rrule = `FREQ=DAILY;COUNT=${Math.round(totalWeeks * 7)}`;
        } else if (freq === 1) {
            rrule = `FREQ=WEEKLY;INTERVAL=1;COUNT=${totalWeeks}`;
        } else if (freq === 2) {
            rrule = `FREQ=WEEKLY;BYDAY=MO,TH;COUNT=${totalWeeks * 2}`;
        } else if (freq === 3) {
            rrule = `FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=${totalWeeks * 3}`;
        } else if (freq === 4) {
            rrule = `FREQ=WEEKLY;BYDAY=MO,TU,TH,FR;COUNT=${totalWeeks * 4}`;
        } else if (freq === 5) {
            rrule = `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;COUNT=${totalWeeks * 5}`;
        } else if (freq === 6) {
            rrule = `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR,SA;COUNT=${totalWeeks * 6}`;
        } else {
            // Default Fallback
            rrule = `FREQ=DAILY;COUNT=${Math.round(totalWeeks * 7)}`;
        }

        // Generate start time as Tomorrow at 8:00 AM local time
        const eventStart = new Date(startDate);
        eventStart.setDate(eventStart.getDate() + 1); // Start tomorrow
        eventStart.setHours(8, 0, 0, 0);

        const eventEnd = new Date(eventStart);
        eventEnd.setMinutes(eventEnd.getMinutes() + 15); // Events last 15 minutes to block calendar slightly

        const summary = `💉 Pin ${result.peptideName}`;
        const description = `Dose: ${result.doseMcg}mcg\\nDraw: ${result.syringeUnits} Units\\nRoute: ${result.route}\\n\\nNotes: ${result.cycleNotes || "Follow standard SubQ protocol."}`;

        icsContent.push(
            "BEGIN:VEVENT",
            `UID:${generateUID()}`,
            `DTSTAMP:${timestamp}`,
            `DTSTART:${formatIcsFloatingTime(eventStart)}`,
            `DTEND:${formatIcsFloatingTime(eventEnd)}`,
            `SUMMARY:${summary}`,
            `DESCRIPTION:${description}`,
            `RRULE:${rrule}`,
            "BEGIN:VALARM",
            "TRIGGER:-PT15M", // Creates a push-notification 15 minutes before the event
            "ACTION:DISPLAY",
            "DESCRIPTION:Peptide Injection Reminder",
            "END:VALARM",
            "END:VEVENT"
        );
    });

    icsContent.push("END:VCALENDAR");
    return icsContent.join("\r\n");
}
