"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

const galleryItems = [
  {
    image: "/images/gallery-1.jpg",
    title: "Modern Flush Panel",
    category: "Contemporary",
  },
  {
    image: "/images/gallery-2.jpg",
    title: "Dark Walnut Classic",
    category: "Traditional",
  },
  {
    image: "/images/gallery-3.jpg",
    title: "Glass Panel Door",
    category: "Modern",
  },
  {
    image: "/images/gallery-4.jpg",
    title: "Classic Moulded Panel",
    category: "Traditional",
  },
  {
    image: "/images/gallery-5.jpg",
    title: "Barn Sliding Door",
    category: "Rustic",
  },
  {
    image: "/images/gallery-6.jpg",
    title: "French Double Doors",
    category: "Classic",
  },
]

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryItems.length)
    }
  }

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + galleryItems.length) % galleryItems.length
      )
    }
  }

  return (
    <section id="gallery" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-accent">
            Our Work
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-5xl text-balance">
            Project gallery
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Browse through our completed installations to see the quality
            and craftsmanship we bring to every project.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <button
              key={item.title}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label={`View ${item.title}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/40" />
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-6 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-sm tracking-wide uppercase text-card/70">
                  {item.category}
                </p>
                <p className="mt-1 font-serif text-xl text-card">
                  {item.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog
        open={selectedIndex !== null}
        onOpenChange={() => closeLightbox()}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl border-none bg-transparent p-0 shadow-none sm:max-w-4xl"
        >
          <DialogTitle className="sr-only">
            {selectedIndex !== null ? galleryItems[selectedIndex].title : "Gallery Image"}
          </DialogTitle>
          {selectedIndex !== null && (
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={galleryItems[selectedIndex].image}
                  alt={galleryItems[selectedIndex].title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-foreground/60 p-6 backdrop-blur-sm">
                <p className="text-sm tracking-wide uppercase text-card/70">
                  {galleryItems[selectedIndex].category}
                </p>
                <p className="mt-1 font-serif text-xl text-card">
                  {galleryItems[selectedIndex].title}
                </p>
              </div>

              <button
                onClick={closeLightbox}
                className="absolute -top-3 -right-3 flex size-10 items-center justify-center rounded-full bg-foreground text-card transition-opacity hover:opacity-80"
                aria-label="Close gallery"
              >
                <X className="size-5" />
              </button>

              <button
                onClick={goPrev}
                className="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-foreground/60 text-card backdrop-blur-sm transition-colors hover:bg-foreground/80"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-foreground/60 text-card backdrop-blur-sm transition-colors hover:bg-foreground/80"
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
