import { SkeletonCard } from "@/PageElements/skeletonCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import "@/styles/components/pagewrapper.css"
import "@/styles/pages/discover.css"
export function SkeletonCards({ title }) {
  return (
    <div>
    <>
      {title !== "discover" ? (
        <div>
          <h2 className="section-title">{title}</h2>
          <div className="skeleton-cards-container">
            <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        </div>
      ) : (
        <div>
        <div className="section-container">
          <h2 className="section-title">Movies</h2>
          <ScrollArea className="scroll-area">
            <div className="scroll-content">
                <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
            </div>
            <ScrollBar className="scrollbar" orientation="horizontal" />
          </ScrollArea>
        </div>

          <div className="section-container">
          <h2 className="section-title">Shows</h2>
          <ScrollArea className="scroll-area">
            <div className="scroll-content">
                <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
            </div>
            <ScrollBar className="scrollbar" orientation="horizontal" />
          </ScrollArea>
          </div>
      
          </div>
        
      )}
    </>
    </div>);
}
