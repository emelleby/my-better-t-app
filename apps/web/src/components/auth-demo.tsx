"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function AuthDemo() {
  const { isAuthenticated, user, signIn, signOut, isLoading } = useAuth();
  const router = useRouter();

  const handleSignIn = () => {
    signIn();
    // The redirect will be handled by the home page useEffect
  };

  const handleSignOut = () => {
    signOut();
    // Stay on home page after sign out
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Mock Authentication Demo</h3>

      <div className="space-y-2">
        <p><strong>Status:</strong> {isAuthenticated ? "Authenticated" : "Not authenticated"}</p>

        {user && (
          <div className="space-y-1">
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {user.avatar && <p><strong>Avatar:</strong> {user.avatar}</p>}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {!isAuthenticated ? (
          <Button onClick={handleSignIn}>
            Sign In (Mock)
          </Button>
        ) : (
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        This is a mock authentication system for UI development.
        Authentication state persists across page refreshes.
        {!isAuthenticated && " Click 'Sign In' to be redirected to the dashboard."}
      </p>
    </div>
  );
}