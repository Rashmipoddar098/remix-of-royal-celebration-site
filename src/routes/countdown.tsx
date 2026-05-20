import { createFileRoute, Link } from "@tanstack/react-router";
import { CountdownSection } from "@/components/wedding/CountdownSection";
import { JourneyNav } from "@/components/wedding/JourneyNav";
import { couple } from "@/data/wedding";

export const Route = createFileRoute("/countdown")({
  head: () => ({
    meta: [
      { title: `Countdown — ${couple.brideFirst} & ${couple.groomFirst}` },
      {
        name: "description",
        content: `Counting the moments until we start our forever. Stay tuned for the big day!`,
      },
      {
        property: "og:title",
        content: `Countdown — ${couple.brideFirst} & ${couple.groomFirst}`,
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CountdownPage,
});

function CountdownPage() {
  return (
    <main 
      className="flex flex-col min-h-screen overflow-x-hidden animate-fade-in-soft"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%,color-mix(in oklab,var(--gold) 25%,transparent),transparent 70%)," +
          "radial-gradient(ellipse 60% 40% at 0% 100%,color-mix(in oklab,var(--vermilion) 20%,transparent),transparent 70%)," +
          "radial-gradient(ellipse 60% 40% at 100% 100%,color-mix(in oklab,var(--kesar) 30%,transparent),transparent 70%)," +
          "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
      }}
    >
      <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <Link
          to="/family"
          className="group inline-flex items-center gap-2 sm:gap-3 rounded-full border border-gold/40 bg-gradient-to-r from-maroon/95 to-maroon/80 px-5 py-2.5 sm:px-7 sm:py-3.5 font-display text-sm sm:text-base uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold backdrop-blur-md shadow-[0_4px_15px_rgba(107,33,33,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(107,33,33,0.4)] hover:border-gold/70"
        >
          <span aria-hidden className="text-lg transition-transform duration-300 group-hover:-translate-x-1">←</span> Back
        </Link>
      </div>

      <div className="flex-1 relative flex flex-col justify-center">
        <CountdownSection />
        <div className="relative z-10">
          <JourneyNav currentIndex={3} embedded />
        </div>
      </div>
    </main>
  );
}
