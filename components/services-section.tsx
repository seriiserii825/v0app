import { Ruler, Truck, Wrench, Palette, Shield, HeadphonesIcon } from "lucide-react"

const services = [
  {
    icon: Ruler,
    title: "Free Measurement",
    description:
      "Our experts visit your space to take precise measurements, ensuring a perfect fit for every door.",
  },
  {
    icon: Palette,
    title: "Design Consultation",
    description:
      "Work with our design team to select the ideal style, material, and finish that complements your interior.",
  },
  {
    icon: Truck,
    title: "Delivery & Logistics",
    description:
      "We handle all transportation with care, delivering your doors on schedule and in pristine condition.",
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description:
      "Our certified installers bring years of experience, guaranteeing flawless fitting and alignment.",
  },
  {
    icon: Shield,
    title: "5-Year Warranty",
    description:
      "Every door comes with a comprehensive warranty covering materials, finish, and installation workmanship.",
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    description:
      "From maintenance tips to adjustments, our support team is always available to keep your doors perfect.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-accent">
            What We Offer
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-5xl text-balance">
            A complete door experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            From the first sketch to the final turn of the handle, we manage
            every detail so you can simply enjoy the transformation.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-lg border border-border bg-card p-8 transition-all hover:border-accent/30 hover:shadow-lg"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <service.icon className="size-6" />
              </div>
              <h3 className="mt-5 font-serif text-xl text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
