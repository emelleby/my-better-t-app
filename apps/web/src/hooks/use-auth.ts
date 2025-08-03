'use client'

import { useMockAuth } from '@/contexts/mock-auth-context'

// This hook abstracts the authentication interface
// In the final implementation, this would use Clerk's useUser and useAuth hooks
export function useAuth() {
  const mockAuth = useMockAuth()

  return {
    isAuthenticated: mockAuth.isAuthenticated,
    user: mockAuth.user,
    isLoading: mockAuth.isLoading,
    signIn: mockAuth.signIn,
    signOut: mockAuth.signOut,
  }
}
