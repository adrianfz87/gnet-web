import {
  HeroSkeleton,
  BentoSkeleton,
  PricingSkeleton,
  FaqSkeleton,
  CtaSkeleton,
} from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="w-full">
      <HeroSkeleton />
      <BentoSkeleton />
      <PricingSkeleton />
      <FaqSkeleton />
      <CtaSkeleton />
    </div>
  );
}
