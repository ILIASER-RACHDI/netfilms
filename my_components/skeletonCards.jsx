import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "./skeletonCard";

export function SkeletonCards({ title }) {
  return (
    <div>
    <>
      {title !== "search" ? (
        <div>
          <h2 className="section-title">{title}</h2>
          <div className="skeleton-cards-container">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      ) : (
        <div>
            <h2 className="section-title">MOVIE</h2>
              <section className="panel">
                <div className="serach_results movie">
                  <div className="results">
                      <div className="flex items-center space-x-4">
                            <Skeleton className="h-20 w-16 full" />
                            <div className="space-y-2">
                              <Skeleton className="h-8 w-[400px]" />
                              <Skeleton className="h-12 w-[400px]" />
                        </div>
                      </div>
                  </div>
                </div>
              </section>
              <section className="panel">
                <div className="serach_results movie">
                  <div className="results">
                      <div className="flex items-center space-x-4">
                            <Skeleton className="h-20 w-16 full" />
                            <div className="space-y-2">
                              <Skeleton className="h-8 w-[400px]" />
                              <Skeleton className="h-12 w-[400px]" />
                        </div>
                      </div>
                  </div>
                </div>
              </section>
              <section className="panel">
                <div className="serach_results movie">
                  <div className="results">
                      <div className="flex items-center space-x-4">
                            <Skeleton className="h-20 w-16 full" />
                            <div className="space-y-2">
                              <Skeleton className="h-8 w-[400px]" />
                              <Skeleton className="h-12 w-[400px]" />
                        </div>
                      </div>
                  </div>
                </div>
              </section>
            </div>
      )}
    </>
    </div>);
}
