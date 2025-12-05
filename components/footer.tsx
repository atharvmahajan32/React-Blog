import { ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#EEEEE8] to-[#F5F5F0] border-t border-[#E5E5E0] py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Back to Portfolio Link */}
          <a 
            href="https://athrv.me" 
            className="group inline-flex items-center gap-2 font-sans text-sm text-black/70 hover:text-black transition-colors duration-300"
          >
            Go back to portfolio
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>

          {/* Copyright */}
          <div className="font-sans text-sm text-black/50">
            © {new Date().getFullYear()} Atharv&apos;s Weekly Journal.
          </div>
        </div>
      </div>
    </footer>
  )
}
