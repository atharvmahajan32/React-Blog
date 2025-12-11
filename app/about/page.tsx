import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#F5F5F0] to-white py-20 md:py-32 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        <div className="container mx-auto px-4 text-center relative">
          {/* Decorative logo */}
          
          
          <h1 className="animate-fade-in-up font-serif text-4xl md:text-6xl font-bold text-black mb-6 text-balance">
            About Atharv&apos;s Weekly Journal
          </h1>
          <p className="animate-fade-in-up animation-delay-200 font-sans text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A personal space where I document my weekly learnings, projects, and adventures
          </p>
          
          {/* Decorative line */}
          <div className="animate-fade-in animation-delay-400 mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-black/30" />
            <div className="w-2 h-2 bg-black/30 rotate-45" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-black/30" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 md:py-24 flex-1">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-16">
            {/* Why This Journal */}
            <div className="animate-fade-in-up group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-black/10 font-bold">01</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-black">Why This Journal</h2>
              </div>
              <div className="pl-0 md:pl-14">
                <p className="font-sans text-gray-600 leading-relaxed mb-4 text-lg">
                  Hey, I&apos;m Atharv! I started this weekly journal as a way to document my journey - the things I learn,
                  the projects I work on, and the experiences that shape my week. It&apos;s part accountability,
                  part reflection, and part sharing knowledge with anyone who might find it useful.
                </p>
                <p className="font-sans text-gray-600 leading-relaxed text-lg">
                  I believe that writing about what you learn helps solidify that knowledge, and sharing it
                  creates opportunities for connection and growth. This journal is my commitment to continuous
                  learning and staying curious.
                </p>
              </div>
            </div>

            {/* The Format */}
            <div className="animate-fade-in-up animation-delay-200 group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-black/10 font-bold">02</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-black">The Format</h2>
              </div>
              <div className="pl-0 md:pl-14">
                <p className="font-sans text-gray-600 leading-relaxed mb-4 text-lg">
                  Every week, I sit down and reflect on what stood out - whether it&apos;s a new programming concept I finally
                  understood, a book that changed my perspective, or simply an interesting conversation I had.
                </p>
                <p className="font-sans text-gray-600 leading-relaxed text-lg">
                  The posts are casual and honest. Some weeks might be packed with technical deep-dives, while others
                  might be more personal reflections. That&apos;s the beauty of a journal, it captures life as it happens.
                </p>
              </div>
            </div>

            {/* What I Write About */}
            <div className="animate-fade-in-up animation-delay-400 group">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-black/10 font-bold">03</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-black">What I Write About</h2>
              </div>
              <div className="pl-0 md:pl-14">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-[#F5F5F0] to-transparent border border-black/5 hover:border-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <strong className="text-black font-serif text-lg block mb-2">Tech & Coding</strong>
                    <span className="font-sans text-gray-600 text-sm">New languages, frameworks, and projects I&apos;m building</span>
                  </div>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-[#F5F5F0] to-transparent border border-black/5 hover:border-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <strong className="text-black font-serif text-lg block mb-2">Weekly Learnings</strong>
                    <span className="font-sans text-gray-600 text-sm">Concepts, ideas, and skills I picked up along the way</span>
                  </div>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-[#F5F5F0] to-transparent border border-black/5 hover:border-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <strong className="text-black font-serif text-lg block mb-2">Life Updates</strong>
                    <span className="font-sans text-gray-600 text-sm">Adventures, experiences, and personal reflections</span>
                  </div>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-[#F5F5F0] to-transparent border border-black/5 hover:border-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <strong className="text-black font-serif text-lg block mb-2">Resources & Recommendations</strong>
                    <span className="font-sans text-gray-600 text-sm">Books, tools, and content worth checking out</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="animate-fade-in-up animation-delay-600 relative py-12">
              <div className="absolute left-0 top-0 text-8xl font-serif text-black/5 leading-none">&ldquo;</div>
              <blockquote className="relative z-10 text-center">
                <p className="font-serif text-2xl md:text-3xl text-black italic mb-4 leading-relaxed">
                  Most answers already exist; the real skill is knowing where to find them.
                </p>
                <cite className="font-sans text-sm text-gray-500 not-italic tracking-widest uppercase">— Ancient proverb (probably)</cite>
              </blockquote>
              <div className="absolute right-0 bottom-0 text-8xl font-serif text-black/5 leading-none rotate-180">&ldquo;</div>
            </div>

            {/* Connect */}
            <div className="animate-fade-in-up animation-delay-800 group text-center bg-gradient-to-b from-[#F5F5F0] to-transparent rounded-2xl p-10 md:p-14">
              <a 
                href="https://calendly.com/m-atharv063/new-meeting?month=2025-12" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative font-serif text-2xl md:text-3xl font-bold text-black mb-6 inline-block cursor-pointer"
              >
                Let&apos;s Connect
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-black rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
              <p className="font-sans text-gray-600 leading-relaxed text-lg max-w-xl mx-auto mb-4">
                Thanks for being here! Whether you&apos;re following along with my journey
                or simply stumbled upon this corner of the internet, I&apos;m glad you made it.
              </p>
              <p className="font-sans text-gray-600 leading-relaxed text-lg max-w-xl mx-auto">
                Got thoughts on something I wrote? Want to collaborate or just say hello? 
                I&apos;d love to hear from you. The best conversations often start with a simple message.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
