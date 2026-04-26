import { createFileRoute, Link } from "@tanstack/react-router";
import { GuestAction } from "@/components/wedding/GuestAction";
import { JourneyNav } from "@/components/wedding/JourneyNav";
import { couple } from "@/data/wedding";

export const Route = createFileRoute("/rsvp")({
  head: () => ({
    meta: [
      { title: `RSVP — ${couple.brideFirst} & ${couple.groomFirst}` },
      {
        name: "description",
        content: `Accept your invitation, share your blessings, and find travel details for our wedding in ${couple.destination}.`,
      },
      {
        property: "og:title",
        content: `RSVP — ${couple.brideFirst} & ${couple.groomFirst}`,
      },
      {
        property: "og:description",
        content: `Counting the moments until two souls walk seven vows together.`,
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RsvpPage,
});

function RsvpPage() {
  return (
    <main className="relative min-h-screen overflow-hidden animate-fade-in-soft">
      <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <Link
          to="/family"
          className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-ivory/80 px-4 py-2 font-display text-xs uppercase tracking-[0.25em] text-maroon backdrop-blur-sm transition-colors hover:bg-ivory"
        >
          <span aria-hidden>←</span> Back
        </Link>
      </div>

      <div className="relative">
        <GuestAction />
        <div className="relative z-10 -mt-16 pb-10 sm:-mt-20 sm:pb-12">
          <JourneyNav currentIndex={3} embedded />
        </div>
      </div>
    </main>
  );
}
