"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { getPosts, type Post } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { ArrowDown, Sparkles } from "lucide-react"

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchData() {
      try {
        const postsData = await getPosts()
        setPosts(postsData)
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load content",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#F5F5F0] via-[#FAFAF8] to-white py-20 md:py-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-black/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-black/[0.02] rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#E5E5E0] rounded-full mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-black/60" />
              <span className="font-sans text-sm text-black/70">Curated thoughts & insights</span>
            </div>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-black mb-6 tracking-tight animate-fade-in-up">
            Welcome to
            <span className="block mt-2 bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
              Atharv&apos;s Weekly Journal
            </span>
          </h1>
          
          <p className="font-sans text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-1 opacity-0">
            Elegant insights on modern living, timeless design, and the art of intentional living
          </p>
          
          <div className="animate-fade-in-up stagger-2 opacity-0">
            <Button 
              asChild 
              className="group bg-black text-white hover:bg-black/90 rounded-full px-8 py-6 font-sans text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <a href="#posts" className="inline-flex items-center gap-2">
                Explore Posts
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </a>
            </Button>
          </div>
        </div>
        
        {/* Decorative line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
      </section>

      {/* Blog Posts Section */}
      <section id="posts" className="bg-white py-20 flex-1 scroll-mt-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mb-4">Latest Posts</h2>
            <div className="w-20 h-1 bg-black mx-auto rounded-full" />
          </div>
          
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="shimmer rounded-2xl h-48 shadow-sm"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
                >
                  <BlogCard id={post.id} title={post.title} excerpt={post.content} />
                </div>
              ))}
            </div>
          )}

          {posts.length === 0 && !isLoading && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F5F5F0] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-black/40" />
              </div>
              <p className="font-serif text-xl text-gray-600 mb-2">No posts yet</p>
              <p className="font-sans text-gray-500">Check back soon for new content</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
