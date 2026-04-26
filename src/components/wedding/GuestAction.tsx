import { useEffect, useState } from "react";
import { contacts, couple, travel } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";

function useCountdown(target: string) {
  const [time, setTime] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function diff(target: string) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms / 3600000) % 24);
  const minutes = Math.floor((ms / 60000) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function GuestAction() {
  const t = useCountdown(couple.countdownTarget);
  const [accepted, setAccepted] = useState(false);

  return (
    <section id="rsvp" className="relative px-4 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Countdown */}
        <div className="text-center">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep">
            The Sacred Day Approaches
          </p>
          <h2 className="mt-3 font-display text-4xl text-maroon sm:text-5xl">Counting the Moments</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-4 gap-3 sm:gap-6">
          {[
            { v: t.days, l: "Days" },
            { v: t.hours, l: "Hours" },
            { v: t.minutes, l: "Minutes" },
            { v: t.seconds, l: "Seconds" },
          ].map((b) => (
            <div
              key={b.l}
              className="ornate-border rounded-sm bg-card py-5 text-center shadow-card"
            >
              <div className="font-display text-3xl text-maroon sm:text-5xl tabular-nums">
                {String(b.v).padStart(2, "0")}
              </div>
              <div className="mt-2 font-serif-elegant text-[10px] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">
                {b.l}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center font-serif-elegant italic text-muted-foreground">
          Until two souls walk seven vows together.
        </p>

        <OrnateDivider />

        {/* RSVP */}
        <div className="mx-auto max-w-xl text-center">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep">RSVP</p>
          <h3 className="mt-3 font-display text-3xl text-maroon sm:text-4xl">
            Will you grace our celebration?
          </h3>

          {!accepted ? (
            <button
              onClick={() => setAccepted(true)}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-royal px-12 py-4 font-display text-sm uppercase tracking-[0.3em] text-ivory shadow-royal transition-transform hover:scale-105"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Accept Invitation
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </button>
          ) : (
            <div className="mt-8 ornate-border inline-flex flex-col items-center rounded-sm bg-card px-10 py-8 shadow-card animate-scale-reveal">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold text-ivory">
                ✓
              </div>
              <p className="mt-4 font-display text-lg text-maroon">Your blessings are received</p>
              <p className="mt-2 font-serif-elegant italic text-muted-foreground">
                We look forward to celebrating with you.
              </p>
            </div>
          )}
        </div>

        <OrnateDivider />

        {/* Contact cards */}
        <div className="text-center">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep">Reach Us</p>
          <h3 className="mt-3 font-display text-3xl text-maroon sm:text-4xl">For Any Assistance</h3>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {contacts.map((c) => (
            <div key={c.name} className="rounded-sm border border-gold/30 bg-card p-6 text-center shadow-card">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-deep">{c.side}</p>
              <p className="mt-3 font-serif-elegant text-lg text-maroon">{c.name}</p>
              <div className="mt-5 flex justify-center gap-3">
                <a
                  href={`tel:${c.phone}`}
                  className="rounded-full border border-maroon/30 px-4 py-2 font-display text-[11px] uppercase tracking-[0.25em] text-maroon transition-colors hover:bg-maroon hover:text-ivory"
                >
                  Call
                </a>
                <a
                  href={`https://wa.me/${c.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gradient-royal px-4 py-2 font-display text-[11px] uppercase tracking-[0.25em] text-ivory shadow-card transition-transform hover:scale-105"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        <OrnateDivider />

        {/* Travel & Stay */}
        <div className="mx-auto max-w-3xl ornate-border rounded-sm bg-card p-8 text-center shadow-card sm:p-10">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep">
            Stay & Travel
          </p>
          <h3 className="mt-3 font-display text-2xl text-maroon sm:text-3xl">A Note for Outstation Guests</h3>
          <div className="mx-auto mt-4 gold-divider w-20" />
          <div className="mt-6 space-y-3 text-left font-serif-elegant text-maroon/85 sm:text-center">
            <p><span className="font-display text-xs uppercase tracking-[0.25em] text-gold-deep">Airport · </span>{travel.airport}</p>
            <p><span className="font-display text-xs uppercase tracking-[0.25em] text-gold-deep">Stay · </span>{travel.stay}</p>
            <p className="italic text-muted-foreground">{travel.note}</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center">
          <div className="mx-auto gold-divider w-32" />
          <p className="mt-6 font-script text-3xl text-vermilion">
            {couple.brideFirst} &amp; {couple.groomFirst}
          </p>
          <p className="mt-2 font-serif-elegant text-sm italic text-muted-foreground">
            {couple.weddingDate} · {couple.destination}
          </p>
        </footer>
      </div>
    </section>
  );
}
