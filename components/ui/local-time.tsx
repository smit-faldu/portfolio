"use client";

import { useEffect, useState } from "react";
import { person } from "@/content/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: person.timezone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * A live read-out of the local clock in Ahmedabad — one small instrument on
 * the masthead. Renders the static timezone label on the server and swaps in
 * the time after mount, so there is nothing for hydration to disagree about.
 */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    // Aligning to the minute avoids a pointless per-second timer.
    const interval = window.setInterval(tick, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums">
      {time ? `${time} ` : ""}
      <span className="text-fg-4">{person.timezoneAbbr}</span>
    </span>
  );
}
