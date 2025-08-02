"use client"

import { usePathname } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FileQuestion, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
    const pathname = usePathname()
    const isDashboardRoute = pathname?.startsWith('/dashboard')

    const NotFoundContent = () => (
        <div className="flex-1 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <FileQuestion className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-2xl">Page Not Found</CardTitle>
                    <CardDescription>
                        The page you're looking for doesn't exist or has been moved.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground text-center">
                        <p>Requested path: <code className="bg-muted px-1 py-0.5 rounded">{pathname}</code></p>
                    </div>

                    <div className="flex flex-col gap-2">
                        {isDashboardRoute ? (
                            <>
                                <Button asChild className="w-full">
                                    <Link href="/dashboard">
                                        <Home className="mr-2 h-4 w-4" />
                                        Go to Dashboard
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href="/dashboard/projects">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        View Projects
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <Button asChild className="w-full">
                                <Link href="/">
                                    <Home className="mr-2 h-4 w-4" />
                                    Go Home
                                </Link>
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    // If it's a dashboard route, wrap in dashboard layout
    if (isDashboardRoute) {
        return (
            <DashboardLayout>
                <NotFoundContent />
            </DashboardLayout>
        )
    }

    // For non-dashboard routes, use regular layout
    return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
            <NotFoundContent />
        </div>
    )
}