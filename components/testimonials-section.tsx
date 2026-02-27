import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner, Brooklyn",
    quote:
      "Portale transformed our entire apartment. The doors they recommended perfectly matched our mid-century modern aesthetic. Installation was seamless and the team was incredibly professional.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Interior Designer",
    quote:
      "I've worked with Portale on over 20 projects. Their selection is unmatched, and the quality of installation is consistently excellent. My go-to recommendation for every client.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Architect, Manhattan",
    quote:
      "The attention to detail is what sets Portale apart. From precise measurements to flawless finishing, every door they install looks like it was always meant to be there.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-accent">
            Testimonials
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-5xl text-balance">
            What our clients say
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-lg border border-border bg-card p-8"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-accent text-accent"
                  />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6 border-t border-border pt-5">
                <p className="font-serif text-base text-foreground">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
