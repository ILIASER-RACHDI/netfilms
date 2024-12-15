import CardV4Tight from "@/my_components/searchCard";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import CommandDialogDemo from "@/my_components/command"
import { ModeToggle } from "@/my_components/ModeToggle"

export default async function SearchPage({ params }) {
  const searchTerm = params.searchTerm;
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  const movieRes = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
  );
  const movieData = await movieRes.json();
  const movies = movieData.results || [];

  const showsRes = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
  );
  const showsData = await showsRes.json();
  const shows = showsData.results || [];
    return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                  <ModeToggle />
                  <CommandDialogDemo/>  
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="section-container">
                <div>
                    <h2 className="section-title">MOVIE</h2>
                    
                    <div className="white_column dark:bg-zinc-900 ">
                        <section className="panel">
                            <div className='serach_results movie'>
                                <div className="results ">
                                    {movies.map((result) => (
                                        <CardV4Tight key={result.id} result={result} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
              </div>

              <div>
                    <h2 className="section-title">TV SHOWS</h2>
                    
                    <div >  
                    <div className="white_column dark:bg-zinc-900 ">
                        <section className="panel">
                            <div className='serach_results movie'>
                                <div className="results">
                                    {shows.map((result) => (
                                        <CardV4Tight key={result.id} result={result} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                    </div>
              </div>
              </div>
          </SidebarInset>
        </SidebarProvider>
    );
}