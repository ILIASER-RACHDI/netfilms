"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  Film,
  GalleryVerticalEnd,
  PieChart,
  Settings,
  Tv,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Movies",
      url: "#",
      icon: Film,
      items: [
        { title: "Now Playing", url: "/?categorie=movies&type=now-playing" },
        { title: "Popular", url: "/?categorie=movies&type=popular" },
        { title: "Top Rated", url: "/?categorie=movies&type=top-rated" },
      ],
    },
    {
      title: "TV Shows",
      url: "#",
      icon: Tv,
      items: [
        { title: "On the Air", url: "/?categorie=shows&type=on-the-air" },
        { title: "Popular", url: "/?categorie=shows&type=popular" },
        { title: "Top Rated", url: "/?categorie=shows&type=top-rated" },
      ],
    },
  ],
  projects: [
    {
      name: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      name: "Favorite",
      url: "/favoris",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar  collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
