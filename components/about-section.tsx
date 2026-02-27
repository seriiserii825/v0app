import Image from "next/image"

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "3,000+", label: "Doors Installed" },
  { value: "50+", label: "Door Models" },
  { value: "100%", label: "Satisfaction" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src="/images/about.jpg"
                alt="Our door craftsmanship workshop"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-lg bg-accent p-8 text-accent-foreground lg:block">
              <p className="font-serif text-4xl">15+</p>
              <p className="mt-1 text-sm tracking-wide">Years of Excellence</p>
            </div>
          </div>

          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-accent">
              Our Story
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-5xl text-balance">
              Crafting doorways to beautiful living
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              For over 15 years, Portale Doors has been the trusted name in
              premium interior doors. We partner with the finest manufacturers
              across Europe and North America to bring you an unmatched
              selection of styles, materials, and finishes.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our team of skilled installers ensures every door is fitted with
              precision, creating seamless transitions between your living
              spaces. From initial consultation to final installation, we
              deliver an experience as refined as our products.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-2xl text-foreground md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
