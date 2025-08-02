"use client"

import * as React from "react"
import {
    AudioWaveform,
    Bot,
    Command,
    Frame,
    FolderOpen,
    GalleryVerticalEnd,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain, NavProjects, NavUser, TeamSwitcher } from "@/components"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useMockAuth } from "@/contexts/mock-auth-context"

// VSME Guru specific data
const data = {
    user: {
        name: "John Doe",
        email: "john.doe@vsme-guru.com",
        avatar: "https://github.com/shadcn.png",
    },
    teams: [
        {
            name: "VSME Guru",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Sustainability Corp",
            logo: AudioWaveform,
            plan: "Pro",
        },
        {
            name: "Green Solutions",
            logo: Command,
            plan: "Starter",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/dashboard",
                },
            ],
        },
        {
            title: "Projects",
            url: "/dashboard/projects",
            icon: FolderOpen,
            items: [
                {
                    title: "All Projects",
                    url: "/dashboard/projects",
                },
            ],
        },
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings2,
            items: [
                {
                    title: "Account Settings",
                    url: "/dashboard/settings",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Current Projects",
            url: "/dashboard/projects",
            icon: Frame,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useMockAuth()

    // Use mock auth user data if available, otherwise fallback to default
    const userData = user ? {
        name: user.name,
        email: user.email,
        avatar: user.avatar || "https://github.com/shadcn.png",
    } : data.user

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={userData} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}