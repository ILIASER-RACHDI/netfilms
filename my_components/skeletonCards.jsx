import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "./skeletonCard";

export function SkeletonCards({title}) {
  return (
    <div>
    <h2 className="section-title">{title}</h2>
    <div className="skeleton-cards-container">
      
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>

      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>

      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>

      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>

    </div>
    </div>
  );
}
