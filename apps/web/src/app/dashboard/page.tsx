"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMockAuth } from "@/contexts/mock-auth-context"

export default function DashboardPage() {
    const { user } = useMockAuth()

    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Reports
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            +2 from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Compliance Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">87%</div>
                        <p className="text-xs text-muted-foreground">
                            +5% from last quarter
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Environmental Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground">
                            +3% from last quarter
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Projects
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">
                            2 due this month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Your latest sustainability reporting activities
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Q1 2024 Environmental Report submitted</p>
                                <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Energy usage data updated</p>
                                <p className="text-xs text-muted-foreground">1 day ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Compliance review scheduled</p>
                                <p className="text-xs text-muted-foreground">3 days ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Welcome back, {user?.name || 'User'}!</CardTitle>
                        <CardDescription>
                            Here's what's happening with your sustainability reporting
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                <h4 className="font-medium text-blue-900 dark:text-blue-100">Next Deadline</h4>
                                <p className="text-sm text-blue-700 dark:text-blue-300">Q2 2024 Report due in 15 days</p>
                            </div>
                            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                                <h4 className="font-medium text-green-900 dark:text-green-100">Completed This Month</h4>
                                <p className="text-sm text-green-700 dark:text-green-300">2 reports submitted successfully</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}