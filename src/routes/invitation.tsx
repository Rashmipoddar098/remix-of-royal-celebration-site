import { createFileRoute, Link } from "@tanstack/react-router";
import { InvitationReveal } from "@/components/wedding/InvitationReveal";
import { JourneyNav } from "@/components/wedding/JourneyNav";
import { couple } from "@/data/wedding";

export const Route = createFileRoute("/invitation")({
  head: () => ({
    meta: [
      { title: `Invitation — ${couple.brideFirst} & ${couple.groomFirst}` },
      {
        name: "description",
        content: `Wedding invitation of ${couple.brideFull} & ${couple.groomFull} in ${couple.destination} on ${couple.weddingDate}.`,
      },
      {
        property: "og:title",
        content: `Invitation — ${couple.brideFirst} & ${couple.groomFirst}`,
      },
      {
        property: "og:description",
        content: `Begin our sacred journey — wedding in ${couple.destination}.`,
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: InvitationPage,
});

function InvitationPage() {
  return (
    <main className="relative min-h-screen overflow-hidden animate-fade-in-soft">
      <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-ivory/80 px-4 py-2 font-display text-xs uppercase tracking-[0.25em] text-maroon backdrop-blur-sm transition-colors hover:bg-ivory"
        >
          <span aria-hidden>←</span> Home
        </Link>
      </div>

      <div className="relative">
        <InvitationReveal />
        <div className="relative z-10 -mt-16 pb-10 sm:-mt-20 sm:pb-12">
          <JourneyNav currentIndex={0} embedded />
        </div>
      </div>
    </main>
  );
}
