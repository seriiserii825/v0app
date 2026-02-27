import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-door.jpg"
          alt="Elegant interior door in a modern home"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:py-40">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm tracking-[0.3em] uppercase text-secondary/70">
            Premium Interior Doors
          </p>
          <h1 className="font-serif text-4xl leading-tight text-secondary md:text-6xl lg:text-7xl text-balance">
            Exquisite design meets masterful craft
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-secondary/80 md:text-lg">
            Transform every room with doors that speak to your sense of style.
            From contemporary flush panels to timeless classics, expertly
            installed by our craftsmen.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="#collection">
                Explore Collection
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-secondary/30 text-secondary hover:bg-secondary/10 hover:text-secondary"
            >
              <Link href="#contact">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
