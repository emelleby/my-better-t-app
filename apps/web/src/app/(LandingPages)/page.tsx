'use client'

// Landing page home

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


      {/* Hero Section */}
      <main className="container mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <section className="space-y-6 sm:space-y-8" aria-labelledby="hero-heading">
            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex pt-2 sm:pt-8 text-center w-full justify-items-start">
                <div className="inline-block rounded-full bg-blue-100 px-3 py-2 sm:px-4 font-medium text-blue-800 text-xs sm:text-sm" role="banner">
                  EU-standardiseret Bærekraftsrapportering
                </div>
              </div>
              <h1 id="hero-heading" className="font-bold text-3xl text-gray-900 leading-tight sm:text-4xl lg:text-5xl">
                Enkel{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  VSME-rapportering
                </span>{' '}
                for Små og Mellomstore Bedrifter
              </h1>
              <p className="text-gray-600 text-base leading-relaxed sm:text-lg">
                Vår platform gjør EU-standardiseret bærekraftsrapportering
                tilgjengelig og enkelt for SMBer. Spar tid, reduser kostnader og
                sikre full overholdelse av de nyeste forskriftene.
              </p>
            </div>

            {/* Status Cards */}
            <section className="space-y-3" aria-label="Platform status overview">
              <div className="flex items-center gap-3 rounded-lg bg-white/80 p-3 sm:p-4 shadow-sm backdrop-blur-sm" role="status" aria-label="Compliance status">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-green-100" aria-hidden="true">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm sm:text-base">
                    Samsvarsstatus
                  </div>
                  <div className="font-medium text-green-600 text-xs sm:text-sm">
                    100% Fullført
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-white/80 p-3 sm:p-4 shadow-sm backdrop-blur-sm" role="status" aria-label="Time saved">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-100" aria-hidden="true">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm sm:text-base">Spart Tid</div>
                  <div className="font-medium text-blue-600 text-xs sm:text-sm">
                    24 timer denne måneden
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4">
              <SignInButton />
            </div>

            {/* Partnership Badge */}
            <div className="flex items-center gap-3 pt-4" role="complementary" aria-label="Compliance certification">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-600" aria-hidden="true">
                <span className="font-bold text-xs sm:text-sm text-white">ESRS</span>
              </div>
              <span className="text-gray-600 text-xs sm:text-sm">I samsvar med ESRS</span>
            </div>
          </section>

          {/* Right Content - Hero Image Placeholder */}
          <aside className="relative order-first lg:order-last" aria-label="Dashboard preview">
            <div className="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] overflow-hidden rounded-2xl bg-white/80 shadow-lg backdrop-blur-sm">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
                <div className="space-y-3 sm:space-y-4 p-6 sm:p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-600" aria-hidden="true">
                    <span className="font-bold text-white text-lg sm:text-xl">VG</span>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      VSME Guru Dashboard
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Professional sustainability reporting platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
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
      className="bg-blue-600 px-6 py-3 sm:px-8 sm:py-4 font-medium text-base sm:text-lg text-white hover:bg-blue-700 min-h-[44px] sm:min-h-[48px] w-full sm:w-auto"
      onClick={handleSignIn}
      size="lg"
    >
      Kom i gang i dag
    </Button>
  )
}
