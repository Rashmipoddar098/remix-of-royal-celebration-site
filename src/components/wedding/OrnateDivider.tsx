import mandala from "@/assets/divider-mandala.png";

interface Props {
  className?: string;
}

export function OrnateDivider({ className = "" }: Props) {
  return (
    <div className={`flex items-center justify-center py-6 sm:py-8 ${className}`}>
      <img
        src={mandala}
        alt=""
        aria-hidden="true"
        width={1536}
        height={512}
        loading="lazy"
        className="h-12 w-auto max-w-[80%] opacity-80 sm:h-16"
      />
    </div>
  );
}
