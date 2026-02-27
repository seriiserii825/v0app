"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

const slides = [
  {
    image: "/images/slider-1.jpg",
    title: "Expert Installation",
    description:
      "Our master craftsmen ensure every door is perfectly fitted, aligned, and finished to the highest standard.",
  },
  {
    image: "/images/slider-2.jpg",
    title: "Curated Showroom",
    description:
      "Visit our showroom to explore over 50 styles of premium interior doors in person, from modern to classical.",
  },
  {
    image: "/images/slider-3.jpg",
    title: "Premium Hardware",
    description:
      "Complement your doors with our selection of designer handles, hinges, and locks in exquisite finishes.",
  },
]

export function CollectionSlider() {
  return (
    <section id="collection" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-accent">
            Our Collection
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-5xl text-balance">
            Doors that define spaces
          </h2>
        </div>

        <div className="mt-16 px-12">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide.title} className="md:basis-1/1">
                  <div className="grid gap-8 lg:grid-cols-2 items-center">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-serif text-2xl text-foreground md:text-4xl">
                        {slide.title}
                      </h3>
                      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                        {slide.description}
                      </p>
                      <div className="mt-8 flex gap-6">
                        <div>
                          <p className="font-serif text-3xl text-foreground">50+</p>
                          <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                            Models Available
                          </p>
                        </div>
                        <div>
                          <p className="font-serif text-3xl text-foreground">12</p>
                          <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                            Finish Options
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent" />
            <CarouselNext className="border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
