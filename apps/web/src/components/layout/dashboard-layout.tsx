"use client"

import * as React from "react"
import { useEffect } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/navigation"
import { useMockAuth } from "@/contexts/mock-auth-context"
import { Header } from "./index"
import Link from "next/link"

interface DashboardLayoutProps {
    children: React.ReactNode
}



export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { isAuthenticated, isLoading } = useMockAuth()

    // Redirect to home if not authenticated (this will be handled by Clerk later)
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            // Use window.location for immediate redirect
            window.location.href = '/';
        }
    }, [isAuthenticated, isLoading]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
                    <p className="text-muted-foreground mb-4">Please sign in to access the dashboard.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header isDashboard={true} />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}