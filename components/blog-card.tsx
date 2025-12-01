import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
}

export function BlogCard({ id, title, excerpt }: BlogCardProps) {
  return (
    <article className="group bg-white border border-[#E5E5E0] rounded-2xl p-8 hover-lift transition-all duration-300 hover:border-black/20">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1 min-w-0">
          <h2 className="font-serif text-2xl font-bold text-black mb-3 group-hover:text-black/80 transition-colors duration-300">
            {title}
          </h2>
          <p className="font-sans text-gray-600 leading-relaxed line-clamp-3">{excerpt}</p>
        </div>
        <Button 
          asChild 
          className="group/btn bg-black text-white hover:bg-black/90 rounded-full px-6 py-5 font-sans shrink-0 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Link href={`/post/${id}`} className="inline-flex items-center gap-2">
            Read More
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </div>
      
      {/* Decorative accent line */}
      <div className="mt-6 h-px bg-gradient-to-r from-black/10 via-black/5 to-transparent group-hover:from-black/20 group-hover:via-black/10 transition-all duration-300" />
    </article>
  )
}
