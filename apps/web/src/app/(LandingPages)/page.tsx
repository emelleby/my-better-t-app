"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Don't render the home page if user is authenticated (they'll be redirected)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header Badge */}
      <div className="pt-8 pb-4 text-center">
        <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          EU-standardiseret Bærekraftsrapportering
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Forenklet{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  VSME-rapportering
                </span>{" "}
                for Små og Mellomstore Bedrifter
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Vår platform gjør EU-standardiseret bærekraftsrapportering tilgjengelig og enkelt for
                SMBer. Spar tid, reduser kostnader og sikre full overholdelse av de nyeste forskriftene.
              </p>
            </div>

            {/* Status Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Samsvarsstatus</div>
                  <div className="text-sm text-green-600 font-medium">100% Fullført</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Spart Tid</div>
                  <div className="text-sm text-blue-600 font-medium">24 timer denne måneden</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <SignInButton />
            </div>

            {/* Partnership Badge */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                <span className="text-white font-bold text-sm">ESRS</span>
              </div>
              <span className="text-sm text-gray-600">I samsvar med ESRS</span>
            </div>
          </div>

          {/* Right Content - Hero Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-white font-bold text-xl">VG</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">VSME Guru Dashboard</h3>
                    <p className="text-sm text-gray-600">Professional sustainability reporting platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignInButton() {
  const { signIn } = useAuth();

  const handleSignIn = () => {
    signIn();
  };

  return (
    <Button
      onClick={handleSignIn}
      size="lg"
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
    >
      Kom i gang i dag
    </Button>
  );
}
