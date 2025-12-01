"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { submitWhyForm } from "@/lib/api"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  const [name, setName] = useState("")
  const [why, setWhy] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !why.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await submitWhyForm(name, why)

      if (response.admin && response.token) {
        login(response.token)
        toast({
          title: "Welcome, Admin",
          description: "Redirecting to dashboard...",
        })
        router.push("/admin")
      } else {
        toast({
          title: "Welcome",
          description: "Redirecting to home page...",
        })
        router.push("/home")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F0] via-[#FAFAF8] to-[#F5F5F0] flex flex-col overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-black/[0.02] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-black/[0.02] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/[0.01] rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative py-12 text-center animate-fade-in">
        <div className="relative inline-block">
          <Image src="/favicon.png" alt="AM Journal" width={80} height={80} className="mx-auto" />
          <div className="absolute -top-2 -right-2 animate-float">
            <Sparkles className="w-5 h-5 text-black/30" />
          </div>
        </div>
        <div className="mt-4 w-16 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent mx-auto" />
      </header>

      {/* Main Content */}
      <main className="relative flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl font-bold text-black mb-4 tracking-tight">
              Welcome to the
              <span className="block text-3xl mt-1 bg-gradient-to-r from-black/80 via-black to-black/80 bg-clip-text text-transparent">
                AM Journal
              </span>
            </h2>
            <p className="font-sans text-gray-500 text-lg">Tell us a bit about yourself to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-fade-in-up stagger-1 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <Label htmlFor="name" className="font-sans text-sm text-black/70 font-medium">
                Your Name
              </Label>
              <div className={`relative transition-all duration-300 ${isFocused === 'name' ? 'scale-[1.02]' : ''}`}>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsFocused('name')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Enter your name"
                  className="bg-white/80 backdrop-blur-sm border-[#E5E5E0] focus:border-black focus:ring-2 focus:ring-black/10 rounded-xl py-6 px-4 transition-all duration-300 shadow-sm focus:shadow-md"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2 animate-fade-in-up stagger-2 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <Label htmlFor="why" className="font-sans text-sm text-black/70 font-medium">
                Why are you here?
              </Label>
              <div className={`relative transition-all duration-300 ${isFocused === 'why' ? 'scale-[1.02]' : ''}`}>
                <Textarea
                  id="why"
                  value={why}
                  onChange={(e) => setWhy(e.target.value)}
                  onFocus={() => setIsFocused('why')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Tell us what brings you to AM Journal..."
                  rows={4}
                  className="bg-white/80 backdrop-blur-sm border-[#E5E5E0] focus:border-black focus:ring-2 focus:ring-black/10 rounded-xl py-4 px-4 resize-none transition-all duration-300 shadow-sm focus:shadow-md"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4 animate-fade-in-up stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <Button
                type="submit"
                className="group flex-1 bg-black text-white hover:bg-black/90 rounded-full py-6 font-sans shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                disabled={isLoading}
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </Button>
              <Button
                type="button"
                onClick={() => router.push("/home")}
                className="flex-1 bg-white/80 backdrop-blur-sm text-black border border-[#E5E5E0] hover:bg-white hover:border-black/30 rounded-full py-6 font-sans shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                disabled={isLoading}
              >
                Skip
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-8 text-center animate-fade-in">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto mb-4" />
        <p className="font-sans text-sm text-gray-400">© {new Date().getFullYear()} AM Journal. All rights reserved.</p>
      </footer>
    </div>
  )
}
