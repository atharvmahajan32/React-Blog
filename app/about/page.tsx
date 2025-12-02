import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  // return (
  //   <div className="min-h-screen flex flex-col">
  //     <Header />

  //     {/* Hero Section */}
  //     <section className="relative bg-gradient-to-b from-[#F5F5F0] to-white py-20 md:py-32 overflow-hidden">
  //       {/* Subtle background pattern */}
  //       <div className="absolute inset-0 opacity-[0.03]" style={{
  //         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  //       }} />
        
  //       <div className="container mx-auto px-4 text-center relative">
  //         {/* Decorative logo */}
          
          
  //         <h1 className="animate-fade-in-up font-serif text-4xl md:text-6xl font-bold text-black mb-6 text-balance">
  //           About Atharv&apos;s Weekly Journal
  //         </h1>
  //         <p className="animate-fade-in-up animation-delay-200 font-sans text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
  //           A space for elegant insights on modern living and timeless design
  //         </p>
          
  //         {/* Decorative line */}
  //         <div className="animate-fade-in animation-delay-400 mt-10 flex items-center justify-center gap-4">
  //           <div className="h-px w-16 bg-gradient-to-r from-transparent to-black/30" />
  //           <div className="w-2 h-2 bg-black/30 rotate-45" />
  //           <div className="h-px w-16 bg-gradient-to-l from-transparent to-black/30" />
  //         </div>
  //       </div>
  //     </section>

  //     {/* Main Content */}
  //     <section className="bg-white py-16 md:py-24 flex-1">
  //       <div className="container mx-auto px-4 max-w-3xl">
  //         <div className="space-y-16">
  //           {/* Our Story */}
  //           <div className="animate-fade-in-up group">
  //             <div className="flex items-center gap-4 mb-6">
  //               <span className="text-4xl font-serif text-black/10 font-bold">01</span>
  //               <h2 className="font-serif text-2xl md:text-3xl font-bold text-black">Our Story</h2>
  //             </div>
  //             <div className="pl-0 md:pl-14">
  //               <p className="font-sans text-gray-600 leading-relaxed mb-4 text-lg">
  //                 Atharv&apos;s Weekly Journal was created with a simple yet profound vision: to create a sanctuary for those who appreciate
  //                 the finer things in life. In a world overwhelmed by noise and excess, we believe in the transformative
  //                 power of simplicity.
  //               </p>
  //               <p className="font-sans text-gray-600 leading-relaxed text-lg">
  //                 This journal represents the quiet hours of morning—a time for reflection, intention, and the
  //                 appreciation of beauty in its purest form. It&apos;s in these moments that we find clarity and
  //                 connection to what truly matters.
  //               </p>
  //             </div>
  //           </div>

  //           {/* Our Philosophy */}
  //           <div className="animate-fade-in-up animation-delay-200 group">
  //             <div className="flex items-center gap-4 mb-6">
  //               <span className="text-4xl font-serif text-black/10 font-bold">02</span>
  //               <h2 className="font-serif text-2xl md:text-3xl font-bold text-black">Our Philosophy</h2>
  //             </div>
  //             <div className="pl-0 md:pl-14">
  //               <p className="font-sans text-gray-600 leading-relaxed mb-4 text-lg">
  //                 We embrace the principles of minimalism not as a trend, but as a way of life. Every piece we publish is
  //                 carefully curated to inspire thoughtful living, intentional design choices, and a deeper appreciation
  //                 for quality over quantity.
  //               </p>
  //               <p className="font-sans text-gray-600 leading-relaxed text-lg">
  //                 Our editorial approach combines timeless elegance with contemporary relevance, creating content that
  //                 resonates across generations and transcends fleeting fashions.
  //               </p>
  //             </div>
  //           </div>

  //           {/* What We Cover */}
  //           <div className="animate-fade-in-up animation-delay-400 group">
  //             <div className="flex items-center gap-4 mb-6">
  //               <span className="text-4xl font-serif text-black/10 font-bold">03</span>
  //               <h2 className="font-serif text-2xl md:text-3xl font-bold text-black">What We Cover</h2>
  //             </div>
  //             <div className="pl-0 md:pl-14">
  //               <div className="grid gap-4 md:grid-cols-2">
  //                 <div className="p-6 rounded-xl bg-gradient-to-br from-[#F5F5F0] to-transparent border border-black/5 hover:border-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
  //                   <strong className="text-black font-serif text-lg block mb-2">Design & Architecture</strong>
  //                   <span className="font-sans text-gray-600 text-sm">Exploring spaces that inspire calm and creativity</span>
  //                 </div>
  //                 <div className="p-6 rounded-xl bg-gradient-to-br from-[#F5F5F0] to-transparent border border-black/5 hover:border-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
  //                   <strong className="text-black font-serif text-lg block mb-2">Slow Living</strong>
  //                   <span className="font-sans text-gray-600 text-sm">The art of savoring life&apos;s simple pleasures</span>
  //                 </div>
  //                 <div className="p-6 rounded-xl bg-gradient-to-br from-[#F5F5F0] to-transparent border border-black/5 hover:border-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
  //                   <strong className="text-black font-serif text-lg block mb-2">Artisanal Crafts</strong>
  //                   <span className="font-sans text-gray-600 text-sm">Celebrating makers who honor tradition and quality</span>
  //                 </div>
  //                 <div className="p-6 rounded-xl bg-gradient-to-br from-[#F5F5F0] to-transparent border border-black/5 hover:border-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
  //                   <strong className="text-black font-serif text-lg block mb-2">Mindful Consumption</strong>
  //                   <span className="font-sans text-gray-600 text-sm">Thoughtful approaches to what we bring into our lives</span>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Quote */}
  //           <div className="animate-fade-in-up animation-delay-600 relative py-12">
  //             <div className="absolute left-0 top-0 text-8xl font-serif text-black/5 leading-none">&ldquo;</div>
  //             <blockquote className="relative z-10 text-center">
  //               <p className="font-serif text-2xl md:text-3xl text-black italic mb-4 leading-relaxed">
  //                 Simplicity is the ultimate sophistication.
  //               </p>
  //               <cite className="font-sans text-sm text-gray-500 not-italic tracking-widest uppercase">— Leonardo da Vinci</cite>
  //             </blockquote>
  //             <div className="absolute right-0 bottom-0 text-8xl font-serif text-black/5 leading-none rotate-180">&ldquo;</div>
  //           </div>

  //           {/* Join Us */}
  //           <div className="animate-fade-in-up animation-delay-800 group text-center bg-gradient-to-b from-[#F5F5F0] to-transparent rounded-2xl p-10 md:p-14">
  //             <h2 className="font-serif text-2xl md:text-3xl font-bold text-black mb-6">Join Our Community</h2>
  //             <p className="font-sans text-gray-600 leading-relaxed text-lg max-w-xl mx-auto">
  //               Whether you&apos;re a seasoned minimalist or simply curious about living with more intention, Atharv&apos;s Weekly Journal
  //               welcomes you. We invite you to explore, reflect, and discover the beauty that emerges when we strip away
  //               the unnecessary.
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </section>

  //     <Footer />
  //   </div>
  // )
}
