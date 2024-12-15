"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Mydata from "@/my_components/data"
import HeaderPage from "@/my_components/HeaderPage"
import { Suspense } from "react"

export default function Page() {
  return (  
  <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
              <HeaderPage/>
                </header>
        <div>        
          <div>
          <Suspense>
          <Mydata/> 
          </Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
