import { Breadcrumb, BreadcrumbList } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import CommandDialogDemo from './command'
import { ModeToggle } from './ModeToggle'

export default function HeaderPage() {
  return (
    <div className="flex items-center px-4"> 
    <SidebarTrigger className="-ml-1" />
    <Separator orientation="vertical" className="mr-4 h-4" />
    <div className="flex w-full items-center justify-end gap-4">
    <CommandDialogDemo />
    <ModeToggle  />
    </div>
  </div>
  )
}
