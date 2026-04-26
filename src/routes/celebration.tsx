import { createFileRoute, Link } from "@tanstack/react-router";
import { CelebrationJourney } from "@/components/wedding/CelebrationJourney";
import { JourneyNav } from "@/components/wedding/JourneyNav";
import { couple } from "@/data/wedding";

export const Route = createFileRoute("/celebration")({
  head: () => ({
    meta: [
      { title: `Celebration Journey — ${couple.brideFirst} & ${couple.groomFirst}` },
      {
        name: "description",
        content: `Six sacred chapters — engagement, haldi, mehendi, sangeet, wedding & reception in ${couple.destination}.`,
      },
      {
        property: "og:title",
        content: `Celebration Journey — ${couple.brideFirst} & ${couple.groomFirst}`,
      },
      {
        property: "og:description",
        content: `Every ritual a verse in our story — explore the celebrations.`,
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CelebrationPage,
});

function CelebrationPage() {
  return (
    <main className="relative min-h-screen overflow-hidden animate-fade-in-soft">
      <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <Link
          to="/invitation"
          className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-ivory/80 px-4 py-2 font-display text-xs uppercase tracking-[0.25em] text-maroon backdrop-blur-sm transition-colors hover:bg-ivory"
        >
          <span aria-hidden>←</span> Back
        </Link>
      </div>

      <div className="relative">
        <CelebrationJourney />
        <div className="relative z-10 -mt-16 pb-10 sm:-mt-20 sm:pb-12">
          <JourneyNav currentIndex={1} embedded />
        </div>
      </div>
    </main>
  );
}
