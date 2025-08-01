"use client";

import { useAuth, type User } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

// Mock user data for testing
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://github.com/shadcn.png",
  createdAt: new Date("2024-01-01"),
  lastLoginAt: new Date(),
};

export function AuthDemo() {
  const { isAuthenticated, user, signIn, signOut, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Authentication Demo</h3>
      
      <div className="space-y-2">
        <p><strong>Status:</strong> {isAuthenticated ? "Authenticated" : "Not authenticated"}</p>
        
        {user && (
          <div className="space-y-1">
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Last Login:</strong> {user.lastLoginAt.toLocaleString()}</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {!isAuthenticated ? (
          <Button onClick={() => signIn(mockUser)}>
            Sign In
          </Button>
        ) : (
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
}