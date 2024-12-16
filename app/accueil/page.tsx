"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import MydataDiscover from "@/PageElements/datadiscover"
import HeaderPage from "@/PageElements/HeaderPage"
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
      <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
      <HeaderPage/>
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
