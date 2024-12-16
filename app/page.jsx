"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Mydata from "@/PageElements/data"
import HeaderPage from "@/PageElements/HeaderPage"
import { Suspense } from "react"

export default function Page() {
  return (  
  <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <div className="sticky border-b  py-4">
        <HeaderPage/>
        </div>
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
