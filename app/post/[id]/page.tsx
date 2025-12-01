"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getPostById, type Post } from "@/lib/api"
import { ArrowLeft, Calendar, Clock, Share2, BookOpen } from "lucide-react"
import Link from "next/link"

export default function PostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const postId = params.id as string
        if (!postId) {
          setError("Invalid post ID")
          return
        }
        const data = await getPostById(postId)
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  // Calculate reading time
  const readingTime = post ? Math.ceil(post.content.split(/\s+/).length / 200) : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-white via-white to-[#F5F5F0]">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <div className="animate-fade-in">
              <Button 
                variant="ghost" 
                asChild 
                className="group mb-8 text-black/70 hover:text-black hover:bg-[#F5F5F0] -ml-4 rounded-full transition-all duration-300"
              >
                <Link href="/home#posts" className="inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to Posts
                </Link>
              </Button>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                <div className="shimmer h-12 rounded-2xl w-3/4" />
                <div className="shimmer h-5 rounded-xl w-1/3" />
                <div className="h-px bg-black/10 my-8" />
                <div className="space-y-4">
                  <div className="shimmer h-5 rounded-xl" />
                  <div className="shimmer h-5 rounded-xl" />
                  <div className="shimmer h-5 rounded-xl w-5/6" />
                  <div className="shimmer h-5 rounded-xl w-4/5" />
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F5F5F0] flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-black/40" />
                </div>
                <p className="font-serif text-xl text-gray-600 mb-2">{error}</p>
                <p className="font-sans text-gray-500 mb-6">The post you&apos;re looking for doesn&apos;t exist</p>
                <Button 
                  onClick={() => router.push("/home")} 
                  className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Return Home
                </Button>
              </div>
            ) : post ? (
              <article className="animate-fade-in-up">
                {/* Post Header */}
                <header className="mb-10">
                  {/* Post Title */}
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight tracking-tight">
                    {post.title}
                  </h1>

                  {/* Post Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-gray-500">
                    {post.created_at && (
                      <div className="flex items-center gap-2 font-sans text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    )}
                    <div className="flex items-center gap-2 font-sans text-sm">
                      <Clock className="w-4 h-4" />
                      {readingTime} min read
                    </div>
                    <button 
                      onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                      className="flex items-center gap-2 font-sans text-sm hover:text-black transition-colors duration-300 group"
                    >
                      <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      Share
                    </button>
                  </div>
                </header>

                {/* Decorative Divider */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex-1 h-px bg-gradient-to-r from-black/20 to-transparent" />
                  <div className="w-2 h-2 rounded-full bg-black/20" />
                  <div className="flex-1 h-px bg-gradient-to-l from-black/20 to-transparent" />
                </div>

                {/* Post Content */}
                <div className="font-sans text-gray-700 leading-relaxed text-lg md:text-xl whitespace-pre-wrap selection:bg-black/10">
                  {post.content.split('\n\n').map((paragraph, index) => (
                    <p 
                      key={index} 
                      className="mb-6 animate-fade-in-up opacity-0"
                      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* End of Article */}
                <div className="mt-16 pt-8 border-t border-[#E5E5E0]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-serif text-xl">
                        AM
                      </div>
                      <div>
                        <p className="font-sans font-semibold text-black">AM Journal</p>
                        <p className="font-sans text-sm text-gray-500">Elegant insights on modern living</p>
                      </div>
                    </div>
                    <Button 
                      asChild 
                      variant="outline"
                      className="rounded-full border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <Link href="/home#posts">More Posts</Link>
                    </Button>
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
