'use client'

import { CheckCircle, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-primary border-b-2" />
      </div>
    )
  }

  // Don't render the home page if user is authenticated (they'll be redirected)
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header Badge */}
      <div className="pt-8 pb-4 text-center">
        <div className="inline-block rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-800 text-sm">
          EU-standardiseret Bærekraftsrapportering
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-bold text-4xl text-gray-900 leading-tight lg:text-5xl">
                Forenklet{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  VSME-rapportering
                </span>{' '}
                for Små og Mellomstore Bedrifter
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Vår platform gjør EU-standardiseret bærekraftsrapportering
                tilgjengelig og enkelt for SMBer. Spar tid, reduser kostnader og
                sikre full overholdelse av de nyeste forskriftene.
              </p>
            </div>

            {/* Status Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Samsvarsstatus
                  </div>
                  <div className="font-medium text-green-600 text-sm">
                    100% Fullført
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Spart Tid</div>
                  <div className="font-medium text-blue-600 text-sm">
                    24 timer denne måneden
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <SignInButton />
            </div>

            {/* Partnership Badge */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <span className="font-bold text-sm text-white">ESRS</span>
              </div>
              <span className="text-gray-600 text-sm">I samsvar med ESRS</span>
            </div>
          </div>

          {/* Right Content - Hero Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white/80 shadow-lg backdrop-blur-sm">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
                <div className="space-y-4 p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                    <span className="font-bold text-white text-xl">VG</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">
                      VSME Guru Dashboard
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Professional sustainability reporting platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SignInButton() {
  const { signIn } = useAuth()

  const handleSignIn = () => {
    signIn()
  }

  return (
    <Button
      className="bg-blue-600 px-8 py-3 font-medium text-lg text-white hover:bg-blue-700"
      onClick={handleSignIn}
      size="lg"
    >
      Kom i gang i dag
    </Button>
  )
}
