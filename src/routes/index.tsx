import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RoyalEnvelope } from "@/components/wedding/RoyalEnvelope";
import { SacredWelcome } from "@/components/wedding/SacredWelcome";
import { couple } from "@/data/wedding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${couple.brideFirst} & ${couple.groomFirst} — A Sacred Invitation` },
      {
        name: "description",
        content: `With the blessings of Lord Ganesha, ${couple.brideFull} & ${couple.groomFull} invite you to their wedding in ${couple.destination} on ${couple.weddingDate}.`,
      },
      { property: "og:title", content: `${couple.brideFirst} & ${couple.groomFirst} — Wedding Invitation` },
      {
        property: "og:description",
        content: `Join us for our sacred celebration in ${couple.destination}.`,
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const handleEnvelopeOpen = () => {
    setEnvelopeOpened(true);
  };

  const handleOpen = () => {
    navigate({ to: "/invitation" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {!envelopeOpened ? (
        <div className="animate-fade-in-soft">
          <RoyalEnvelope onOpen={handleEnvelopeOpen} />
        </div>
      ) : (
        <div className="animate-fade-in-soft">
          <SacredWelcome onOpen={handleOpen} />
        </div>
      )}
    </main>
  );
}
