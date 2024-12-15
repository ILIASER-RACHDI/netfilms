"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
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
import MydataDiscover from "@/my_components/datadiscover"
import { ModeToggle } from "@/my_components/ModeToggle"
import { Suspense } from "react"

export default function Page() {
  return (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
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
       <div>
        <Suspense fallback={<div>Chargement des données...</div>}>
          <MydataDiscover />
        </Suspense>
      </div>

      </SidebarInset>
    </SidebarProvider>
    </ThemeProvider>
  )
}
